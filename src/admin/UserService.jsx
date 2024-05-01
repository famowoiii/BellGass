import React, { useState, useEffect } from "react";

function OrderConfirmation() {
  const [orders, setOrders] = useState([]);

  // Fungsi untuk mendapatkan data pesanan dari database
  const getOrderData = () => {
    // Simulasi pemanggilan API atau akses ke database
    const fakeOrderData = [
      {
        id: "00001",
        name: "Christine Brooks",
        address: "089 Kutch Green Apt. 448",
        date: "23 Mar 2024",
        type: "Fuel",
        status: "Accept",
      },
      {
        id: "00002",
        name: "John Doe",
        address: "456 Elm St",
        date: "24 Mar 2024",
        type: "Food",
        status: "Processed",
      },
      {
        id: "00003",
        name: "Alice Smith",
        address: "789 Oak Ave",
        date: "25 Mar 2024",
        type: "Electronics",
        status: "Accept",
      },
    ];
    setOrders(fakeOrderData);
  };

  // Panggil fungsi getOrderData saat komponen dimuat dan setiap 5 menit
  useEffect(() => {
    getOrderData(); // Panggil fungsi saat komponen dimuat

    const intervalId = setInterval(() => {
      getOrderData(); // Panggil fungsi setiap 5 menit
    }, 300000); // 5 menit dalam milidetik (300000 ms)

    // Membersihkan interval saat komponen dibongkar
    return () => clearInterval(intervalId);
  }, []);

  const handleStatusChange = (orderId, currentStatus) => {
    if (currentStatus === "Finished") return; // Jika status sudah "Finished", tidak melakukan perubahan

    // Dapatkan pesanan yang sesuai dengan ID
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        // Ubah status pesanan sesuai urutan: Accept -> Processed -> Finished
        if (order.status === "Accept") {
          return { ...order, status: "Processed" };
        } else if (order.status === "Processed") {
          return { ...order, status: "Finished" };
        } else {
          return order; // Tidak ada perubahan jika status sudah "Finished"
        }
      }
      return order;
    });

    // Update state dengan pesanan yang diperbarui
    setOrders(updatedOrders);
  };

  // Mengelompokkan pesanan berdasarkan status
  const groupedOrders = orders.reduce((acc, order) => {
    if (order.status !== "Finished") {
      acc[order.status] = [...(acc[order.status] || []), order];
    }
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Order Confirmation</h2>
      {Object.entries(groupedOrders).map(([status, orders]) => (
        <div key={status} className="mb-8">
          <h3 className="text-xl font-semibold mb-2">{status}</h3>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left py-2 px-4">Order ID</th>
                <th className="text-left py-2 px-4">Customer Name</th>
                <th className="text-left py-2 px-4">Address</th>
                <th className="text-left py-2 px-4">Date</th>
                <th className="text-left py-2 px-4">Type</th>
                <th className="text-left py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-200">
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.name}</td>
                  <td className="py-2 px-4">{order.address}</td>
                  <td className="py-2 px-4">{order.date}</td>
                  <td className="py-2 px-4">{order.type}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleStatusChange(order.id, order.status)}
                      className={`px-3 py-1 rounded ${
                        order.status === "Accept"
                          ? "bg-blue-500 text-white"
                          : order.status === "Processed"
                          ? "bg-yellow-500 text-black"
                          : "bg-green-500 text-white"
                      }`}
                      disabled={order.status === "Finished"} // Menonaktifkan tombol jika status sudah "Finished"
                    >
                      {order.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default OrderConfirmation;
