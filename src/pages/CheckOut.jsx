import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CheckOut({ cartItem, countItems, calculateTotal }) {
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("");
  const [isDeliveryAvailable, setIsDeliveryAvailable] = useState(true);
  const [hasMixedRefillItems, setHasMixedRefillItems] = useState(false);
  const [latestAddressId, setLatestAddressId] = useState(null);

  useEffect(() => {
    const refillItems = cartItem.filter((item) =>
      item.itemTypes.some((type) => type.refill)
    );
    if (refillItems.length > 1) {
      setHasMixedRefillItems(true);
    } else {
      setHasMixedRefillItems(false);
    }

    setIsDeliveryAvailable(
      !refillItems.some((item) => item.itemTypes[0].refill === true)
    );
  }, [cartItem]);

  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  const handleZipCodeChange = (e) => setZipCode(e.target.value);
  const handleCountryChange = (e) => setCountry(e.target.value);
  const handleDeliveryOptionChange = (e) => setDeliveryOption(e.target.value);

  const handleSetAddress = async () => {
    if (!address || !city || !zipCode || !country) {
      alert("Please fill in all the address fields.");
      return;
    }

    try {
      const auth_token = localStorage.getItem("auth_token");
      const authToken = JSON.parse(auth_token);
      const token = authToken.token;

      const addressData = {
        address,
        city,
        zipCode,
        country,
      };

      await axios.post(
        `${process.env.REACT_APP_API_URL}/user/address`,
        addressData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const addressResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/address`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const latestAddress = addressResponse.data.data[0];
      setLatestAddressId(latestAddress.id);
      alert("Address set successfully");
    } catch (error) {
      console.error(
        "Error setting address:",
        error.response?.data || error.message
      );
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  const handlePayment = async () => {
    // Mengecek apakah terdapat campuran item yang memiliki properti refill yang berbeda
    const refillTypes = cartItem.map(
      (item) => item.itemTypes.find((type) => type.refill)?.refill
    );

    // Menyaring refillTypes agar hanya menyisakan nilai yang tidak null/undefined
    const uniqueRefillTypes = [...new Set(refillTypes.filter(Boolean))];

    // Jika terdapat lebih dari satu nilai yang berbeda dalam uniqueRefillTypes
    if (uniqueRefillTypes.length > 1) {
      alert(
        "Your cart contains both refill and non-refill items. Please remove one type to proceed."
      );
      return;
    }

    // Jika tidak ada masalah dengan jenis refill, lanjutkan dengan proses pembayaran
    if (!latestAddressId || !deliveryOption) {
      alert("Please set the address and select a delivery option.");
      return;
    }

    try {
      const auth_token = localStorage.getItem("auth_token");
      const authToken = JSON.parse(auth_token);
      const token = authToken.token;

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
        `${process.env.REACT_APP_API_URL}/user/order`,
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

  const handleClose = () => {
    setShowModal(false);
    window.location = "/orderstatus";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {hasMixedRefillItems && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Warning:</strong>
          <span className="block sm:inline">
            {" "}
            Your cart contains both refill and non-refill items. Please remove
            one type to proceed.
          </span>
        </div>
      )}
      <div className="max-w-full md:mx-32 bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
        {!hasMixedRefillItems && (
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
              <label
                className="block text-gray-700 text-sm font
-bold mb-2"
              >
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
            <button
              onClick={handleSetAddress}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
            >
              Set Address
            </button>
            <div className="mb-4 text-red">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Delivery Option
              </label>
              <select
                value={deliveryOption}
                onChange={handleDeliveryOptionChange}
                disabled={hasMixedRefillItems}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select an option</option>
                <option value="pickup">Pickup</option>
                <option value="delivery" disabled={!isDeliveryAvailable}>
                  Delivery
                </option>
              </select>
              {!isDeliveryAvailable && (
                <p className="text-xs text-red-600 italic">
                  Sorry, Refill item is only available for Pick Up service!
                </p>
              )}
            </div>
          </div>
        )}
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
            <span className="font-bold">Total:</span>
            <span className="font-bold">{calculateTotal()}</span>
          </div>
          <button
            onClick={handlePayment}
            disabled={!address || !city || !zipCode || !country}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md text-center">
            <h2 className="text-2xl mb-4">Order Successful</h2>
            <p className="mb-4">
              Your order has been placed successfully. Please wait for the
              admin's confirmation.
            </p>
            <Link
              to="/orderstatus"
              onClick={handleClose}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Close
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckOut;
