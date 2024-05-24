import React, { useEffect, useState } from "react";
import axios from "axios";

function OrderStatus() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      const auth_token = localStorage.getItem("auth_token");
      if (auth_token) {
        const authToken = JSON.parse(auth_token);
        const token = authToken.token;

        try {
          const response = await axios.get("http://localhost:3010/user/order", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // Sort the data by createdAt in descending order
          const sortedData = response.data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setData(sortedData);
        } catch (error) {
          console.error("Error fetching orders:", error.message);
          if (error.response) {
            console.error("Error response data:", error.response.data);
            console.error("Error response status:", error.response.status);
            console.error("Error response headers:", error.response.headers);
          }
        }
      }
    };

    fetchOrderStatus();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {data ? (
        <div className="space-y-4">
          {data.map((order) => (
            <div key={order.id} className="border p-4 rounded-md shadow-sm">
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Delivered:</strong> {order.delivered ? "Yes" : "No"}
              </p>
              <p>
                <strong>Confirmed:</strong> {order.confirmed ? "Yes" : "No"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default OrderStatus;
