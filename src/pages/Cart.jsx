import React, { useState, useEffect } from "react";
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
}) {
  const [cartValue, setCartValue] = useState(0);

  useEffect(() => {
    // Memperbarui total keranjang setiap kali ada perubahan pada cartItem
    setCartValue(calculateTotal());
  }, [cartItem, calculateTotal]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-center gap-6">
        {cartItem.length === 0 ? (
          <div className="text-center text-gray-600">Your cart is empty.</div>
        ) : (
          cartItem.map((selectedProduct, index) => (
            <div
              key={selectedProduct.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex items-center p-4"
            >
              <img
                src={selectedProduct.download_url}
                alt={selectedProduct.author}
                className="w-1/6 h-auto object-cover mr-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">
                  {selectedProduct.author}
                </h3>
                <p className="text-gray-600 mb-4">
                  Type: {selectedProduct.type}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      onClick={() => removeCountHandler(index)}
                      className="text-red hover:text-red"
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
                    className="text-red hover:text-red"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {cartItem.length > 0 && (
        <div className="flex justify-between items-center mt-8">
          <div className="text-xl font-semibold">
            Total: ${cartValue.toFixed(2)}
          </div>
          <Link
            to="/checkout"
            className="bg-red text-white py-2 px-6 rounded-md hover:bg-red transition duration-200 flex items-center"
          >
            <MdShoppingCartCheckout size={24} className="mr-2" />
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
