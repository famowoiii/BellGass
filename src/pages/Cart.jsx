// Cart.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdShoppingCartCheckout } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";

function Cart({
  cartItem,
  countItems,
  addCountHandler,
  removeCountHandler,
  calculateTotal,
  removeFromCart,
}) {
  const [cartValue, setCartValue] = useState(0);

  return (
    <div className="mx-8 lg:mx-32 my-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {cartItem.length === 0 && (
          <div>Cart is empty, Please Select the Products!</div>
        )}
        {cartItem.map((selectedProduct, index) => (
          <div
            key={selectedProduct.id}
            className="bg-gray-300 drop-shadow-xl rounded-xl border-red hover:bg-gray-400 duration-200 p-3 flex flex-col justify-center"
          >
            <div className="text-center">{selectedProduct.author}</div>
            <img
              src={selectedProduct.download_url}
              alt=""
              className="mx-auto my-4"
            />
            <div className="flex flex-col items-center">
              <div className="flex flex-row gap-2">
                <button onClick={() => removeCountHandler(index)}>
                  <AiFillMinusCircle size={24} />
                </button>
                <div>{countItems[index]}</div>
                <button onClick={() => addCountHandler(index)}>
                  <IoIosAddCircle size={24} />
                </button>
              </div>
              <button
                className="bg-red px-3 py-2 rounded-lg"
                onClick={() => removeFromCart(index)}
              >
                Remove the item
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="my-6">
        {cartItem.length > 0 && (
          <Link
            to="/checkout"
            className="bg-red px-7 py-2 rounded-xl duration-200 flex flex-row hover:scale-105 w-fit font-signika drop-shadow-md hover:text-white"
          >
            <MdShoppingCartCheckout size={24} /> | Checkout Items
          </Link>
        )}
        <div className="div">Total: {calculateTotal()}</div>
      </div>
    </div>
  );
}

export default Cart;
