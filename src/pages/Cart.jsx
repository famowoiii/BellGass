import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdShoppingCartCheckout } from "react-icons/md";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";

function Cart({
  cartItem,
  countItems,
  addCountHandler,
  removeCountHandler,
  calculateTotal,
  removeFromCart,
  addToCart,
}) {
  const [refillValue, setRefillValue] = useState(null);

  const cartValue = calculateTotal();

  const checkRefillValue = (selectedProduct) => {
    const newItemRefillValue = selectedProduct.itemTypes[0].refill;
    if (refillValue !== null && refillValue !== newItemRefillValue) {
      return false;
    }
    return true;
  };

  const handleAddToCart = (selectedProduct, index) => {
    const newItemRefillValue = selectedProduct.itemTypes[0].refill;
    if (cartItem.length === 0) {
      setRefillValue(newItemRefillValue);
    }

    if (!checkRefillValue(selectedProduct)) {
      alert(
        "You can only add products with the same refill property to the cart."
      );
      return;
    }

    addToCart(selectedProduct);
    setRefillValue(newItemRefillValue);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-center gap-6">
        {cartItem.length === 0 ? (
          <div className="text-center text-gray-600">Your cart is empty.</div>
        ) : (
          cartItem.map((selectedProduct, index) => {
            const imageUrl = `http://bellgas.com.au/${selectedProduct.itemTypes[0].url}`;
            console.log("Image URL:", imageUrl); // Debug: log image URL

            return (
              <div
                key={`${selectedProduct.id}-${index}`}
                className="bg-white rounded-lg shadow-md overflow-hidden flex items-center p-4"
              >
                <img
                  src={imageUrl}
                  alt={selectedProduct.name}
                  className="w-1/6 h-auto object-cover mr-4"
                  onError={(e) => {
                    console.error("Error loading image:", imageUrl);
                    e.target.src = "/path/to/default-image.jpg"; // Fallback image
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Type: {selectedProduct.itemTypes[0].type}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <button
                        onClick={() => removeCountHandler(index)}
                        className="text-red hover:text-red-700"
                      >
                        <IoIosRemoveCircle size={20} />
                      </button>
                      <span className="mx-2">{countItems[index]}</span>
                      <button
                        onClick={() => addCountHandler(index)}
                        className="text-green-500 hover:text-green-700"
                      >
                        <IoIosAddCircle size={20} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-red hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {cartItem.length > 0 && (
        <div className="flex justify-between items-center mt-8">
          <div className="text-xl font-semibold">
            Total: ${cartValue.toFixed(2)}
          </div>
          {checkRefillValue(cartItem[0]) && (
            <Link
              to="/checkout"
              className="bg-red text-white py-2 px-6 rounded-md hover:bg-red transition duration-200 flex items-center"
            >
              <MdShoppingCartCheckout size={24} className="mr-2" />
              Checkout
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
