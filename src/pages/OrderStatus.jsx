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
          const response = await axios.get("http://localhost:3010/admin/item", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData(response.data);
        } catch (error) {
          console.error("Error fetching products:", error.message);
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
        <div>
          <h2 className="text-red">Order Status</h2>
          <p className="text-red">Status: {data.status}</p>
          {/* Tambahkan elemen HTML lainnya untuk menampilkan informasi status pesanan */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default OrderStatus;
