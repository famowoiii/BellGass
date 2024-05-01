import React, { useState } from "react";
import useFetch from "../hooks/Fetch";

function Products({ setCartItem, cartItem, addToCart }) {
  const { data, loading } = useFetch(
    "https://picsum.photos/v2/list?page=3&limit=1"
  );

  const [selectedType, setSelectedType] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleAddToCart = (item) => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setModalMessage("You Need to Sign In");
      setShowModal(true);
    } else {
      addToCart({ ...item, type: selectedType });
      setModalMessage("Item Added to Cart!");
      setShowModal(true);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Shop Our Products</h2>
      <div className="grid grid-cols-1 gap-6 ">
        {loading ? (
          <div className="text-center">Loading... please wait</div>
        ) : (
          data.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg p-6 shadow-md flex flex-col md:flex-row gap-10"
            >
              <div>
                <img
                  src={item.download_url}
                  alt=""
                  className="w-full h-64 object-cover mb-4"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{item.author}</h3>
                <p className="text-gray-700 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleTypeChange(1)}
                      className={`border rounded-md py-1 px-2 focus:outline-none ${
                        selectedType === 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      Type 1
                    </button>
                    <button
                      onClick={() => handleTypeChange(2)}
                      className={`border rounded-md py-1 px-2 focus:outline-none ${
                        selectedType === 2
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      Type 2
                    </button>
                    <button
                      onClick={() => handleTypeChange(3)}
                      className={`border rounded-md py-1 px-2 focus:outline-none ${
                        selectedType === 3
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      Type 3
                    </button>
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-red text-white py-2 px-4 rounded-md hover:bg-red transition duration-200 ml-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-8">
            <p className="text-lg font-semibold mb-4">{modalMessage}</p>
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
