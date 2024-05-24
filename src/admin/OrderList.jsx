import React, { useState, useEffect } from "react";
import axios from "axios";

function OrderList() {
  const [finishedOrders, setFinishedOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [addressUsers, setAddressUsers] = useState([]);

  useEffect(() => {
    const fetchOrdersAndUsers = async () => {
      const auth_token = localStorage.getItem("auth_token");
      const authToken = JSON.parse(auth_token);
      const token = authToken.token;

      try {
        // Fetch orders
        const ordersResponse = await axios.get(
          "http://localhost:3010/admin/order",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const finishedOrdersData = ordersResponse.data.data.filter(
          (order) => order.status === "accepted"
        );
        setFinishedOrders(finishedOrdersData);

        // Fetch users
        const usersResponse = await axios.get(
          "http://localhost:3010/admin/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(usersResponse.data.data);

        // Fetch addresses
        const addressesResponse = await axios.get(
          "http://localhost:3010/admin/address",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAddressUsers(addressesResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);
          console.error("Error response headers:", error.response.headers);
        }
      }
    };

    fetchOrdersAndUsers();
  }, []);

  const alignUser = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.fullname : "Unknown User";
  };

  const alignAddress = (addressId) => {
    const userAddress = addressUsers.find(
      (address) => address.id === addressId
    );
    return userAddress
      ? `${userAddress.address}, ${userAddress.city}, ${userAddress.zipCode}`
      : "Unknown Address";
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Finished Orders</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-left py-2 px-4">Order ID</th>
            <th className="text-left py-2 px-4">User</th>
            <th className="text-left py-2 px-4">Address</th>
            <th className="text-left py-2 px-4">Date</th>
            <th className="text-left py-2 px-4">Type</th>
            <th className="text-left py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {finishedOrders.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No orders accepted yet!
              </td>
            </tr>
          ) : (
            finishedOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-200">
                <td className="py-2 px-4">{order.id}</td>
                <td className="py-2 px-4">{alignUser(order.userId)}</td>
                <td className="py-2 px-4">{alignAddress(order.addressId)}</td>
                <td className="py-2 px-4">{order.createdAt}</td>
                <td className="py-2 px-4">{order.type}</td>
                <td className="py-2 px-4">
                  <span
                    className={`inline-block px-3 py-1 rounded ${
                      order.status === "finished"
                        ? "bg-green-500 text-white"
                        : ""
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
