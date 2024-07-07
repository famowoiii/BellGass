import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

function OrderStatus() {
  const [data, setData] = useState(null);
  const [notifications, setNotifications] = useState([]); // Initialize as an empty array
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem("auth_token"));
    const token = authToken ? authToken.token : "";
    const userID = authToken.id;

    const newSocket = io(`http://110.173.135.202:3010`, {
      reconnection: true,
      auth: {
        token,
      },
    });
    setSocket(newSocket);

    newSocket.on("notifyUser", (message) => {
      console.log("New notification For User:", message);
      setNotifications((prev) => {
        if (!Array.isArray(prev)) {
          console.error("Previous notifications state is not an array", prev);
          return [];
        }
        return [...prev, message];
      });
      fetchOrderStatus(); // Call fetchOrderStatus after receiving a notification
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

  useEffect(() => {
    fetchOrderStatus();
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const auth_token = localStorage.getItem("auth_token");
    if (!auth_token) {
      console.error("No auth token found");
      return;
    }

    const authToken = JSON.parse(auth_token);
    const token = authToken.token;

    try {
      const response = await axios.get(
        `http://110.173.135.202/api/user/notify`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!Array.isArray(response.data)) {
        console.error("Fetched notifications is not an array", response.data);
        setNotifications([]);
      } else {
        setNotifications(response.data);
      }
      console.log("Fetched notifications:", response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error.message);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      }
    }
  };

  const fetchOrderStatus = async () => {
    const auth_token = localStorage.getItem("auth_token");
    if (!auth_token) {
      console.error("No auth token found");
      return;
    }

    const authToken = JSON.parse(auth_token);
    const token = authToken.token;

    try {
      const response = await axios.get(
        `http://110.173.135.202/api/user/order`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const sortedData = response.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setData(sortedData);
      console.log("Fetched order status:", sortedData);
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      }
    }
  };

  const handlePayment = async (orderId) => {
    const auth_token = localStorage.getItem("auth_token");
    if (!auth_token) {
      console.error("No auth token found");
      return;
    }

    const authToken = JSON.parse(auth_token);
    const token = authToken.token;

    try {
      const response = await axios.post(
        `http://110.173.135.202/api/user/order/checkout`,
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const paymentLink = response.data.data.paymentLink;
      console.log(`Redirecting to payment for order ${orderId}`);
      window.location.href = paymentLink; // Redirect to the payment URL
    } catch (error) {
      console.error("Error initiating payment:", error.message);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">Order Status</h2>
      {notifications.length > 0 && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
          <p className="font-bold">Notifications</p>
          {notifications.map((notification, index) => (
            <p key={index}>{notification.message}</p>
          ))}
        </div>
      )}
      {data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg shadow-md p-6 bg-white"
            >
              <div className="mb-4">
                <p className="text-lg font-semibold mb-2">
                  Order ID: {order.id}
                </p>
                <p
                  className={`text-sm mb-1 ${
                    order.status === "accepted"
                      ? "text-green-600"
                      : order.status === "rejected"
                      ? "text-red"
                      : ""
                  }`}
                >
                  Status: {order.status}
                </p>
                <p className="text-sm mb-1">
                  Delivered: {order.delivered ? "Yes" : "No"}
                </p>

                <p className="text-sm mb-1">
                  Created At: {new Date(order.createdAt).toLocaleString()}
                </p>
                <p className="text-sm mb-1">
                  Updated At: {new Date(order.updatedAt).toLocaleString()}
                </p>
              </div>
              {order.status === "accepted" && (
                <button
                  className="mt-4 w-full py-2 sm:text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                  onClick={() => handlePayment(order.id)} // Pass the order.id to handlePayment
                >
                  Proceed to Payment{" "}
                  <span className="font-semibold">(Checkout)</span>
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
  );
}

export default OrderStatus;
