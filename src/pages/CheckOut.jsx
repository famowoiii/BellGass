// CheckOut.jsx
import React from "react";

function CheckOut({ cartItem, countItems, calculateTotal }) {
  return (
    <div className="mx-8 lg:mx-32 my-10">
      <div className="max-w-xs lg:max-w-96  hover:bg-gray-200 duration-200 border-2 border-rose-100 drop-shadow-lg hover:border-red p-2 rounded-lg">
        {cartItem.map((item, index) => (
          <div key={item.id} className="mb-4">
            <img src={item.download_url} alt="" className="w-full h-auto" />
            <div className="text-center">Quantity: {countItems[index]}</div>
          </div>
        ))}
        <div className="text-center">Total Price: {calculateTotal()}</div>
      </div>
      <div className="my-5 flex justify-center">
        <button className="bg-red rounded-lg px-5 py-2 mr-2">Pick Up</button>
        <button className="bg-red rounded-lg px-5 py-2 ml-2">Delivery</button>
      </div>
    </div>
  );
}

export default CheckOut;
