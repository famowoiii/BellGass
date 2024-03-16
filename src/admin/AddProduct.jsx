import React from "react";
import { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState("");
  const [quantity, setQuantity] = useState(0);

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("price", price);
    formData.append("file", file);
    formData.append("quantity", quantity);
    try {
      const url = "";
      await axios.post(url, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mt-5 mb-5">
      <div className="w-1/2 bg-white rounded-lg shadow-md p-8">
        <form onSubmit={saveProduct}>
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-gray-700 font-bold mb-2"
            >
              Product Name
            </label>
            <input
              id="productName"
              type="text"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Product Name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="desc"
              className="block text-gray-700 font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="desc"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Product Description"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 font-bold mb-2"
            >
              Price ($AUS)
            </label>
            <input
              id="price"
              type="number"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Product Price"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-gray-700 font-bold mb-2"
            >
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Product Quantity"
            />
          </div>

          <button
            type="submit"
            className="bg-red hover:bg-red hover:text-white font-bold duration-200 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
