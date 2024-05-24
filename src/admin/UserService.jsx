import React, { useState, useEffect } from "react";
import axios from "axios";

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
    const user = users.find((user) => user.id === userId); // Use === instead of ==
    return user ? user.fullname : "Unknown User"; // Add a default value if user is not found
  };

  return (
    <div className="container">
      <h2>Order Confirmation</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{getUserName(order.userId)}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderConfirmation;
