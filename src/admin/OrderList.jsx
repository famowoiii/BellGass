import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";

function AcceptedOrders() {
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAcceptedOrders = async () => {
      setLoading(true);
      try {
        const auth_token = localStorage.getItem("auth_token");
        const authToken = JSON.parse(auth_token);
        const token = authToken.token;

        const ordersResponse = await axios.get(
          `http://110.173.135.202/api/admin/order`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const acceptedOrdersData = ordersResponse.data.data.filter(
          (order) => order.status === "accepted"
        );
        setAcceptedOrders(acceptedOrdersData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedOrders();
  }, []);

  const calculateTotalPrice = (orderItems) => {
    return orderItems.reduce(
      (total, item) => total + item.quantity * item.itemType.price,
      0
    );
  };

  return (
    <div className="container">
      <h2 className="text-xl font-semibold mb-4">Accepted Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Total Price
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Order Status
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Delivery Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {acceptedOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-no-wrap">{order.id}</td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {order.user.fullname} <br /> ({order.user.phone})
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {order.address.address}, {order.address.city},{" "}
                  {order.address.zipCode}, {order.address.country}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {order.orderItems.map((item) => (
                    <div key={item.id}>
                      {item.itemType.type} - ${item.itemType.price} (Refill:{" "}
                      {item.itemType.refill ? "Yes" : "No"}) x {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  ${calculateTotalPrice(order.orderItems)}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">{order.status}</td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {order.delivered ? (
                    <span className="flex items-center">
                      <FaCheck className="text-green-500 mr-1" />
                      Delivered
                    </span>
                  ) : (
                    <span className="text-red">Not Delivered</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AcceptedOrders;
