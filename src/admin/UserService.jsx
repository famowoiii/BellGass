import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";

function OrderConfirmation() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrdersAndUsers = async () => {
      setLoading(true);
      try {
        const auth_token = localStorage.getItem("auth_token");
        const authToken = JSON.parse(auth_token);
        const token = authToken.token;

        const [ordersResponse, usersResponse] = await Promise.all([
          axios.get("http://localhost:3010/admin/order", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("http://localhost:3010/admin/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        setOrders(ordersResponse.data.data);
        setUsers(usersResponse.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersAndUsers();
  }, []);

  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.fullname : "Unknown User";
  };

  const handleConfirmOrder = async (orderId, status) => {
    try {
      const auth_token = localStorage.getItem("auth_token");
      const authToken = JSON.parse(auth_token);
      const token = authToken.token;

      await axios.put(
        `http://localhost:3010/admin/order`,
        {
          id: orderId,
          status: status ? "accepted" : "rejected",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the orders state after confirmation
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, confirmed: status } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-xl font-semibold mb-4">Order Confirmation</h2>
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
                Order Status
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Confirmation
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-no-wrap">{order.id}</td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {getUserName(order.userId)}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">{order.status}</td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {order.confirmed ? (
                    <span className="flex items-center">
                      <FaCheck className="text-green-500 mr-1" />
                      Confirmed
                    </span>
                  ) : (
                    <div className="flex items-center">
                      <button
                        onClick={() => handleConfirmOrder(order.id, true)}
                        className="bg-green-500 text-white py-1 px-2 rounded-full mr-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleConfirmOrder(order.id, false)}
                        className="bg-red text-white py-1 px-2 rounded-full hover:bg-red focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <FaTimes />
                      </button>
                    </div>
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

export default OrderConfirmation;
