import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import ProductDashboard from "./CRUD";
import OrderConfirmation from "./UserService";
import OrderList from "./OrderList";
import io from "socket.io-client";

const socket = io("http://localhost:3010", {
  reconnection: true,
});

function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server.");
    });

    socket.on("notifyAdmin", (message) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { id: new Date().getTime(), message, read: false },
      ]);
      setShowNotificationModal(true);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server.");
    });

    socket.on("error", (error) => {
      console.error("Error:", error);
    });

    return () => {
      socket.off("connect");
      socket.off("notifyAdmin");
      socket.off("disconnect");
      socket.off("error");
    };
  }, []);

  const handleToggleNotificationModal = () => {
    setShowNotificationModal(!showNotificationModal);
    markAllNotificationsAsRead();
  };

  const markAllNotificationsAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
  };

  return (
    <div className="relative flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-1/5 p-4 min-h-screen h-fit">
        <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setSelectedComponent(<ProductDashboard />)}
            >
              CRUD
            </button>
          </li>
          <li>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setSelectedComponent(<OrderConfirmation />)}
            >
              Confirmation
            </button>
          </li>
          <li>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setSelectedComponent(<OrderList orders={[]} />)}
            >
              Finished Orders
            </button>
          </li>
        </ul>
      </div>
      {/* Konten */}
      <div className="flex-1 bg-gray-100 p-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          {selectedComponent}
        </div>
      </div>
      {/* Floating Modal Notifikasi */}
      {showNotificationModal && (
        <div className="fixed top-1/4 right-1/4 m-4 bg-white p-4 shadow-xl rounded-lg z-10">
          <h2 className="text-lg font-semibold mb-2">
            You Have Unread Message of New Orders, Please Confirm the orders!!
          </h2>
          <div className="flex justify-between">
            <button
              className="bg-red text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleToggleNotificationModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Floating Notifikasi */}
      <div className="fixed bottom-4 right-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleToggleNotificationModal}
        >
          <FaBell />
        </button>
        {/* Tambahkan icon notifikasi di sini */}
        <div className="absolute top-0 right-0 -mt-1 -mr-1">
          {notifications.filter((notification) => !notification.read).length >
            0 && (
            <div className="bg-red text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
              {
                notifications.filter((notification) => !notification.read)
                  .length
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
