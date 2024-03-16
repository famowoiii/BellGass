import React, { useEffect } from "react";
useEffect;
import { useState } from "react";
import useFetch from "../hooks/Fetch";

function Refill({ setCartItem, cartItem, addToCart }) {
  const { data, loading } = useFetch(
    "https://picsum.photos/v2/list?page=1&limit=10"
  );
  return (
    <div>
      <div className="flex justify-center text-center text-3xl font-semibold font-signika mt-10">
        Refill Pages
      </div>
      <div className="grid lg:grid-cols-3 phone:grid-cols-1 lg:mx-32 phone:mx-20 my-10 gap-5">
        {data.map((items) => (
          <div
            key={items.id}
            className=" bg-gray-300 rounded-xl flex flex-col   justify-center drop-shadow-2xl p-4 "
          >
            {loading ? (
              <div>"Loading.... please wait"</div>
            ) : (
              <>
                <img
                  src={items.download_url}
                  alt=""
                  className="drop-shadow-xl rounded-lg"
                />
                <div>{items.author}</div>
                <button
                  onClick={() => addToCart(items)}
                  className={`bg-red p-1 px-2 rounded-md hover:text-white duration-200 `}
                >
                  add to chart
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Refill;
