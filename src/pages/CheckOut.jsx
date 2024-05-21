import React, { useState, useEffect } from "react";
import axios from "axios";

function CheckOut({ cartItem, countItems, calculateTotal }) {
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("");
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

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleDeliveryOptionChange = (e) => {
    setDeliveryOption(e.target.value);
  };

  const handlePayment = () => {
    if (hasMixedRefillItems) {
      alert(
        "Your cart contains both refill and non-refill items. Please remove one type to proceed."
      );
      return;
    }

    if (deliveryOption === "" || address === "") {
      alert("Please fill in the address and select a delivery option.");
      return;
    }

    setShowModal(true);

    const orderData = {
      address: address,
      deliveryOption: deliveryOption,
      cartItems: cartItem,
      total: calculateTotal(),
    };

    axios
      .post("URL_pesanan_API", orderData)
      .then((response) => {
        console.log("Order successfully placed:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-full md:mx-32 bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
        {/* Left column - Selected products */}
        <div className="w-full md:w-1/2 p-4 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
          {cartItem.map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex items-center mb-4">
              <img
                src={item.itemTypes[0]?.url || "default_image_url.jpg"}
                alt=""
                className="w-16 h-auto mr-4"
              />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  Quantity: {countItems[index]}
                </p>
                <p className="text-sm text-gray-600">${item.price}</p>
              </div>
            </div>
          ))}
          <hr className="my-4" />
          <div className="text-center mb-4">
            Total Price: $
            <span className="font-semibold text-red">{calculateTotal()}</span>
          </div>
        </div>
        {/* Right column - Address and delivery/pickup option */}
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-semibold mb-4">Delivery Information</h2>
          {hasMixedRefillItems ? (
            <div className="mb-4 text-red">
              Your cart contains both refill and non-refill items. Please remove
              one type to proceed.
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label htmlFor="address" className="block mb-2">
                  Delivery Address:
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={handleAddressChange}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-red-500"
                  placeholder="Enter your delivery address"
                  disabled={hasMixedRefillItems}
                />
              </div>
              {isDeliveryAvailable && (
                <div className="mb-4">
                  <label className="block mb-2">Delivery Option:</label>
                  <select
                    value={deliveryOption}
                    onChange={handleDeliveryOptionChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-red-500"
                    disabled={hasMixedRefillItems}
                  >
                    <option value="">Select an option</option>
                    <option value="delivery">Delivery</option>
                    <option value="pickup">Pick Up</option>
                  </select>
                </div>
              )}
              {!isDeliveryAvailable && (
                <div className="mb-4 text-red">
                  Sorry, delivery is not available for items with refill
                  service.
                </div>
              )}
            </>
          )}
          <button
            onClick={handlePayment}
            className="bg-slate-400 text-black rounded-lg px-5 py-2 w-full hover:bg-red hover:text-white border-2 transition duration-200"
            disabled={hasMixedRefillItems}
          >
            Proceed to Payment
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="relative bg-white p-8 w-96 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">
              Waiting for admin confirmation
            </h2>
            <p className="text-gray-700 mb-4">
              Your order has been sent for processing. Please wait for
              confirmation from the admin.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-red text-white px-4 py-2 rounded-lg hover:bg-red-600"
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
