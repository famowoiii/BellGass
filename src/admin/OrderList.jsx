import React, { useState, useEffect } from "react";

function OrderList() {
  const [finishedOrders, setFinishedOrders] = useState([]);

  // Fungsi untuk mengambil data pesanan yang memiliki status "finished"
  const fetchFinishedOrders = async () => {
    try {
      // Dummy JSON data
      const dummyData = [
        {
          id: "00001",
          customerName: "Christine Brooks",
          address: "089 Kutch Green Apt. 448",
          date: "23 Mar 2024",
          type: "Fuel",
          status: "finished",
        },
        {
          id: "00002",
          customerName: "John Doe",
          address: "456 Elm St",
          date: "24 Mar 2024",
          type: "Food",
          status: "pending",
        },
        {
          id: "00003",
          customerName: "Alice Smith",
          address: "789 Oak Ave",
          date: "25 Mar 2024",
          type: "Electronics",
          status: "finished",
        },
      ];

      // Filter data untuk mendapatkan pesanan dengan status "finished"
      const filteredOrders = dummyData.filter(
        (order) => order.status === "finished"
      );

      // Set state finishedOrders dengan data yang telah difilter
      setFinishedOrders(filteredOrders);
    } catch (error) {
      console.error("Error fetching finished orders:", error);
    }
  };

  // Panggil fungsi fetchFinishedOrders saat komponen dimuat
  useEffect(() => {
    fetchFinishedOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Finished Orders</h2>
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
          {finishedOrders.map((order) => (
            <tr key={order.id} className="border-b border-gray-200">
              <td className="py-2 px-4">{order.id}</td>
              <td className="py-2 px-4">{order.customerName}</td>
              <td className="py-2 px-4">{order.address}</td>
              <td className="py-2 px-4">{order.date}</td>
              <td className="py-2 px-4">{order.type}</td>
              <td className="py-2 px-4">
                <span
                  className={`inline-block px-3 py-1 rounded ${
                    order.status === "finished" ? "bg-green-500 text-white" : ""
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
