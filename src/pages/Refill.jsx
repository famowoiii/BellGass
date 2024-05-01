import React, { useState } from "react";
import useFetch from "../hooks/Fetch";

function Products({ setCartItem, cartItem, addToCart }) {
  const { data, loading } = useFetch(
    "https://picsum.photos/v2/list?page=1&limit=1" // Mengambil 6 gambar sekaligus
  );

  const [selectedType, setSelectedType] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleTypeChange = (event) => {
    setSelectedType(parseInt(event.target.value));
  };

  const handleAddToCart = (item) => {
    addToCart({ ...item, type: selectedType });
    setShowModal(true);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Shop Our Products</h2>
      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="text-center">Loading... please wait</div>
        ) : (
          data.map((item) => (
            <div key={item.id} className="bg-white rounded-lg p-6 shadow-md">
              <img
                src={item.download_url}
                alt=""
                className="w-full h-64 object-cover mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{item.author}</h3>
              <p className="text-gray-700 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <div className="flex items-center">
                <select
                  value={selectedType}
                  onChange={handleTypeChange}
                  className="border rounded-md py-1 px-2 mr-2"
                >
                  <option value={1}>Type 1</option>
                  <option value={2}>Type 2</option>
                  <option value={3}>Type 3</option>
                </select>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-red text-white py-1 px-4 rounded-md hover:bg-red transition duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-8">
            <p className="text-lg font-semibold mb-4">Item added to cart!</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-red text-white py-2 px-4 rounded-md hover:bg-red transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
