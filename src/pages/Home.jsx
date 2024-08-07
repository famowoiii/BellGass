import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoIosArrowDropdownCircle, IoIosArrowDropup } from "react-icons/io";

function Home() {
  const [products, setProducts] = useState([]);
  const [isProductsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://110.173.135.202/api/guest/item`
        );
        const data = response.data.data;
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchData();
  }, []);

  const toggleProducts = () => {
    setProductsOpen(!isProductsOpen);
  };

  return (
    <div>
      <div className="bg-cover bg-center h-96 w-full bg-homebg shadow-xl mb-3 flex justify-center items-center">
        <div className="text-white w-full h-full font-signika lg:text-6xl phone:text-4xl backdrop-blur-sm bg-white/10 flex items-center justify-center">
          Welcome to Bell Gass
        </div>
      </div>
      <div className="px-4 md:px-32 grid grid-cols-1 md:grid-cols-2 pt-7 md:h-screen items-center gap-6">
        <div className="text-black text-4xl font-bold md:text-left">
          The Ultimate Choice for Gas Bottles:
          <p className="text-red text-lg">
            Fast, Convenient, and Quality Assured
          </p>
          <div className="flex items-center text-lg font-medium">
            <Link
              to="/products"
              className="bg-red text-xl hover:bg-white px-4 py-2 rounded-lg mt-3 mr-2 transition duration-200 ease-in-out transform hover:scale-105 hover:text-red border-2 border-red"
            >
              Shop Now!
            </Link>
            <span className="text-xl">or</span>
            <Link
              to="/refill"
              className="bg-red text-xl px-4 py-2 hover:bg-white rounded-lg mt-3 ml-2 transition duration-200 ease-in-out transform hover:scale-105 hover:text-red border-2 border-red"
            >
              Refill
            </Link>
          </div>
        </div>
        <div className="py-12 md:text-left">
          Bell Gass is a trusted gas bottle store providing high-quality
          products in Australia, especially in New South Wales, Bellingen. We
          offer delivery services with fast and responsive customer support to
          ensure your needs are met efficiently and reliably.
        </div>
      </div>
      <div className="flex justify-center py-5 pb-8">
        <div className="flex-col text-center justify-items-center">
          <div className="text-red text-3xl font-signika">Get Our Products</div>
          <button
            onClick={toggleProducts}
            className="text-red hover:text-black duration-200 ease-in-out transform hover:scale-105"
            style={{ margin: "auto" }}
          >
            {isProductsOpen ? (
              <IoIosArrowDropup size={40} />
            ) : (
              <IoIosArrowDropdownCircle size={40} />
            )}
          </button>
          {isProductsOpen && (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 px-4 md:px-10 py-6">
              {products.map((product) =>
                product.itemTypes.map((itemType) => (
                  <Link
                    key={itemType.id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
                  >
                    <img
                      src={`http://110.173.135.202/api/${itemType.url}`}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">
                        Name: {product.name}
                      </h3>
                      <p>Type: {itemType.type}</p>
                      <p>Price: ${itemType.price}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
