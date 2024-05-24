import React, { useState, useEffect } from "react";
import axios from "axios";

function CheckOut({ cartItem, countItems, calculateTotal }) {
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("");
  const [isDeliveryAvailable, setIsDeliveryAvailable] = useState(true);
  const [hasMixedRefillItems, setHasMixedRefillItems] = useState(false);

  useEffect(() => {
    const hasRefillItem = cartItem.some((item) =>
      item.itemTypes.some((type) => type.refill === true)
    );
    setIsDeliveryAvailable(!hasRefillItem);

    const refillValues = cartItem.map((item) => item.itemTypes[0].refill);
    const hasMixedItems = new Set(refillValues).size > 1;
    setHasMixedRefillItems(hasMixedItems);
  }, [cartItem]);

  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  const handleZipCodeChange = (e) => setZipCode(e.target.value);
  const handleCountryChange = (e) => setCountry(e.target.value);
  const handleDeliveryOptionChange = (e) => setDeliveryOption(e.target.value);

  const handlePayment = async () => {
    if (hasMixedRefillItems) {
      alert(
        "Your cart contains both refill and non-refill items. Please remove one type to proceed."
      );
      return;
    }

    if (!address || !city || !zipCode || !country || !deliveryOption) {
      alert(
        "Please fill in all the address fields and select a delivery option."
      );
      return;
    }

    try {
      const auth_token = localStorage.getItem("auth_token");
      const authToken = JSON.parse(auth_token);
      const token = authToken.token;

      const addressResponse = await axios.get(
        "http://localhost:3010/user/address",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const latestAddress = addressResponse.data.data[0]; // Ambil alamat pertama dari array
      const latestAddressId = latestAddress.id;
      console.log("Latest Address ID:", latestAddressId);

      const orderItems = cartItem.map((item, index) => ({
        itemTypeId: item.itemTypes[0].id,
        quantity: countItems[index],
      }));

      const orderData = {
        addressId: latestAddressId,
        delivered: deliveryOption === "delivery",
        orderItems,
      };

      const orderResponse = await axios.post(
        "http://localhost:3010/user/order",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Order successfully placed:", orderResponse.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-full md:mx-32 bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={handleCityChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Zip Code
            </label>
            <input
              type="text"
              value={zipCode}
              onChange={handleZipCodeChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Country
            </label>
            <input
              type="text"
              value={country}
              onChange={handleCountryChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Delivery Option
            </label>
            <select
              value={deliveryOption}
              onChange={handleDeliveryOptionChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select an option</option>
              <option value="pickup">Pickup</option>
              <option value="delivery" disabled={!isDeliveryAvailable}>
                Delivery
              </option>
            </select>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <ul className="mb-4">
            {cartItem.map((item, index) => (
              <li key={index} className="flex justify-between mb-2">
                <span>{item.name}</span>
                <span>{countItems[index]}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mb-4">
            <span>Total:</span>
            <span>{calculateTotal()}</span>
          </div>
          <button
            onClick={handlePayment}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md text-center">
            <h2 className="text-2xl mb-4">Order Successful</h2>
            <p>Your order has been placed successfully.</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckOut;
