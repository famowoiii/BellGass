import React from "react";
import useFetch from "../hooks/Fetch";
import tuseState from "react";

function OrderStatus() {
  const url = "--"; // INI NANTI DI ISI URL ENDPOINT GET ORDER STATUS
  const { data, loading, error } = useFetch(url);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div>
        {loading && <p className="text-red">Loading, please wait...</p>}
      </div>
      {error && <p className="text-red">Error: {error}</p>}
      {data && (
        <div>
          <h2 className="text-red">Order Status</h2>
          <p className="text-red">Status: {data.status}</p>
          {/* Tambahkan elemen HTML lainnya untuk menampilkan informasi status pesanan */}
        </div>
      )}
    </div>
  );
}

export default OrderStatus;
