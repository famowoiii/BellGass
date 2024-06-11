import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";
import { io } from "socket.io-client";

function OrderConfirmation() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const fetchOrdersAndUsers = async () => {
      setLoading(true);
      try {
        const auth_token = localStorage.getItem("auth_token");
        const authToken = JSON.parse(auth_token);
        const token = authToken.token;

        const ordersResponse = await axios.get(
          "http://localhost:3010/admin/order",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(ordersResponse.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersAndUsers();
  }, []);

  useEffect(() => {
    const newSocket = io("http://localhost:3010", {
      reconnection: true,
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to the server.");
    });

    newSocket.on("notifyAdmin", (message) => {
      console.log("New notification for Admin:", message);
    });

    newSocket.on("newOrder", () => {
      console.log("New order notification received.");
      fetchOrdersAndUsers();
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server.");
    });

    newSocket.on("error", (error) => {
      console.error("Error:", error);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const fetchOrdersAndUsers = async () => {
    setLoading(true);
    try {
      const auth_token = localStorage.getItem("auth_token");
      const authToken = JSON.parse(auth_token);
      const token = authToken.token;

      const ordersResponse = await axios.get(
        "http://localhost:3010/admin/order",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(ordersResponse.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
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

      const updatedOrders = orders.map((order) =>
        order.id === orderId
          ? { ...order, status: status ? "accepted" : "rejected" }
          : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

  const handleDeliverOrder = async (orderId, deliveredStatus) => {
    try {
      const auth_token = localStorage.getItem("auth_token");
      const authToken = JSON.parse(auth_token);
      const token = authToken.token;

      await axios.put(
        `http://localhost:3010/admin/order`,
        {
          id: orderId,
          delivered: deliveredStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, delivered: deliveredStatus } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error updating delivery status:", error);
    }
  };

  const calculateTotalPrice = (orderItems) => {
    return orderItems.reduce(
      (total, item) => total + item.quantity * item.itemType.price,
      0
    );
  };

  const handleNotificationOk = () => {
    fetchOrdersAndUsers();
    window.location = "/admin";
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
                Confirmation
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Delivery Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
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
                  {order.status === "accepted" ? (
                    <span className="flex items-center">
                      <FaCheck className="text-green-500 mr-1" />
                      Accepted
                    </span>
                  ) : order.status === "rejected" ? (
                    <span className="flex items-center">
                      <FaTimes className="text-red mr-1" />
                      Rejected
                    </span>
                  ) : (
                    <div className="flex items-center">
                      <button
                        onClick={() => handleConfirmOrder(order.id, true)}
                        className="bg-green-500 text-white py-1 px-2 rounded-full mr-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleConfirmOrder(order.id, false)}
                        className="bg-red text-white py-1 px-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {order.delivered ? <FaCheck /> : <FaTimes />}
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
