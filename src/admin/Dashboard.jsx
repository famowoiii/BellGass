import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import ProductDashboard from "./CRUD";
import OrderConfirmation from "./UserService";
import OrderList from "./OrderList";

function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showAllNotificationsModal, setShowAllNotificationsModal] =
    useState(false);

  // Fungsi untuk mendapatkan notifikasi dari API
  const fetchNotifications = () => {
    // Di sini Anda bisa melakukan pemanggilan API untuk mendapatkan notifikasi
    // Misalnya, menggunakan fetch atau Axios
    // Contoh sederhana untuk dummy data:
    const fakeNotifications = [
      {
        id: 1,
        message:
          "Alamat: Jl. Mawar No. 10, Kota Bandung, Kategori Barang: Elektronik, Jumlah: 2",
        read: false,
      },
      {
        id: 2,
        message:
          "Alamat: Jl. Kenanga No. 5, Kota Surabaya, Kategori Barang: Pakaian, Jumlah: 5",
        read: false,
      },
      {
        id: 3,
        message:
          "Alamat: Jl. Anggrek No. 3, Kota Jakarta, Kategori Barang: Makanan, Jumlah: 10",
        read: false,
      },
    ];
    setNotifications(fakeNotifications);
  };

  // Panggil fungsi fetchNotifications saat komponen dimuat
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Fungsi untuk menampilkan atau menyembunyikan modal notifikasi
  const handleToggleNotificationModal = () => {
    setShowNotificationModal(!showNotificationModal);
    // Setelah menampilkan modal notifikasi, tandai notifikasi sebagai "read"
    if (!showNotificationModal) {
      markAllNotificationsAsRead();
    }
  };

  // Fungsi untuk menandai notifikasi sebagai "read"
  const markAllNotificationsAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
  };

  // Fungsi untuk menandai notifikasi sebagai "read" dan menutup modal
  const handleReadAllNotifications = () => {
    setShowAllNotificationsModal(false);
    setShowNotificationModal(false); // Menutup modal notifikasi pertama juga
    markAllNotificationsAsRead();
  };

  // Cek jika ada notifikasi yang belum dibaca saat komponen dimuat
  useEffect(() => {
    const hasUnreadNotifications = notifications.some(
      (notification) => !notification.read
    );
    setShowNotificationModal(hasUnreadNotifications);
  }, [notifications]);

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
        <div className="fixed top-0 right-0 m-4 bg-white p-4 shadow-md rounded-lg z-10">
          <h2 className="text-lg font-semibold mb-2">New Order</h2>
          <div className="flex justify-between">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setShowAllNotificationsModal(true)}
            >
              All Orders
            </button>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={handleToggleNotificationModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Modal Notifikasi All Orders */}
      {showAllNotificationsModal && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20"></div>
          <div className="fixed top-1/4 left-1/4 w-1/2 bg-white z-30 p-8 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">All Orders</h2>
            <ul className="space-y-2">
              {notifications.map((notification) => (
                <li key={notification.id} className="mb-2">
                  {notification.message}
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={handleReadAllNotifications}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
      {/* Floating Notifikasi */}
      <div className="fixed bottom-4 right-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleToggleNotificationModal}
        >
          <FaBell />
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
