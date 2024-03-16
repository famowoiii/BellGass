import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function CrudProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const url = ""; // Pastikan URL yang sesuai
    try {
      const response = await axios.get(url);
      setProduct(response.data); // Pastikan data yang diterima adalah array
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (productId) => {
    const url = ""; // Pastikan URL yang sesuai
    try {
      await axios.delete(`${url}/${productId}`); // Pastikan URL yang sesuai
      getProduct();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-red-500 min-h-screen p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4">
          {product.map((e) => (
            <div key={e.id} className="bg-white p-4 rounded-lg">
              <img src={e.img} alt="" className="mb-2" />
              <div className="text-red-500 font-bold mb-2">{e.desc}</div>
              <div className="mb-2">{e.quantity}</div>
              <div className="mb-2">{e.price}</div>
              <div>
                <button
                  onClick={() => deleteProduct(e.id)}
                  className="bg-white text-red-500 px-4 py-2 rounded-lg mr-2 border border-red-500 hover:bg-red-500 hover:text-white transition duration-300"
                >
                  Delete Product
                </button>
                <Link
                  to={`/updateproduct/${e.id}`}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-red-500 border border-red-500 transition duration-300"
                >
                  Update Product
                </Link>
              </div>
            </div>
          ))}
        </div>
        <Link
          to="/addproduct"
          className="bg-white text-red-500 px-4 py-2 rounded-lg mt-4 inline-block hover:bg-red-500 hover:text-white border border-red-500 transition duration-300"
        >
          Add Product
        </Link>
      </div>
    </div>
  );
}

export default CrudProduct;
