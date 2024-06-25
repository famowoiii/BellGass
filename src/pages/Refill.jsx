import React, { useState, useEffect } from "react";
import axios from "axios";

function Refill({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [selectedType, setSelectedType] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3010/guest/item");
        console.log("API response:", response.data.data); // Log data from API
        const refillProducts = response.data.data.filter((item) =>
          item.itemTypes.some((type) => type.refill === true)
        );
        console.log("Filtered refill products:", refillProducts); // Log filtered data
        setProducts(refillProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTypeChange = (itemId, type) => {
    setSelectedType((prev) => ({ ...prev, [itemId]: type }));
  };

  const handleAddToCart = (item) => {
    const selectedItemType = selectedType[item.id];
    if (!selectedItemType) {
      setModalMessage("Please select a type");
      setShowModal(true);
      return;
    }
    const type = item.itemTypes.find((type) => type.type === selectedItemType);
    addToCart({
      ...item,
      type: selectedItemType,
      price: type.price,
      quantity: 0,
    });
    setModalMessage("Item Added to Cart!");
    setShowModal(true);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Refill Products</h2>
      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="text-center">Loading... please wait</div>
        ) : (
          products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg p-6 shadow-md flex flex-col md:flex-row gap-10"
            >
              <img
                src={`http://localhost:3010/${item.itemTypes[0].url}`}
                alt={item.name}
                className="w-1/6 h-auto object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-700 mb-4">{item.description}</p>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex gap-3 flex-wrap">
                    {item.itemTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => handleTypeChange(item.id, type.type)}
                        className={`border rounded-md py-1 px-2 gap-2 focus:outline-none ${
                          selectedType[item.id] === type.type
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {type.type}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-red text-white py-2 px-4 mt-3 rounded-md hover:bg-red-700 transition duration-200 ml-2"
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
              className="bg-red text-white py-2 px-4 mt-2 rounded-md hover:bg-red-700 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Refill;
