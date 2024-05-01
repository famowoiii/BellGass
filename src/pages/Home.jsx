import React from "react";
import useFetch from "../hooks/Fetch";
import { Link } from "react-router-dom";
import { IoIosArrowDropdownCircle, IoIosArrowDropup } from "react-icons/io";

function Home() {
  const { data, loading } = useFetch(
    "https://picsum.photos/v2/list?page=1&limit=10"
  );
  const [isProductsOpen, setProductsOpen] = React.useState(false);

  const toggleProducts = () => {
    setProductsOpen(!isProductsOpen);
  };

  return (
    <div>
      <div className="bg-cover  bg-center h-pepek w-full bg-homebg shadow-xl mb-3 flex justify-center items-center ">
        <div className="text-white w-full h-full bg-white font-signika lg:text-6xl phone:text-4xl backdrop-blur-sm bg-white/10 flex items-center justify-center">
          Welcome to Bell Gass
        </div>
      </div>
      <div className="px-4 md:px-32 grid grid-cols-1 md:grid-cols-2 pt-7 md:h-screen items-center gap-6">
        <div className="text-black text-4xl font-bold md:text-left">
          The Ultimate Choice for Gas Bottles:
          <p className="text-red text-lg">
            Fast, Convenient, and Quality Assured
          </p>
          <div className="flex items-center  text-lg font-medium">
            <Link
              to="/products"
              className="bg-red text-xl hover:bg-white  px-4 py-2 rounded-lg mt-3 mr-2 transition duration-200 ease-in-out transform hover:scale-105 hover:text-red  border-2 border-red"
            >
              Shop Now!
            </Link>
            <span className="text-xl">or</span>
            <Link
              to="/refill"
              className="bg-red text-xl px-4 py-2 hover:bg-white  rounded-lg mt-3 ml-2 transition duration-200 ease-in-out transform hover:scale-105 hover:text-red  border-2 border-red"
            >
              Refill
            </Link>
          </div>
        </div>
        <div className="py-12 md:text-left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, Lorem
          ipsum dolor sit, amet consectetur adipisicing elit. Aliquid suscipit
          sed quaerat expedita maxime sequi? Voluptate iste harum laudantium
          sapiene esse adipisci facilis inventore, aut nisi, possimus vel
          corrupti architecto veritatis provident repudiandae, quasi accusantium
          ducimus. Distinctio at maxime adipisci assumenda nam, praesentium
          nobis. Veniam iste debitis laborum incidunt sit accusamus excepturi
          eum nemo culpa adipisci accusantium saepe corrupti optio odit enim
          dolorum vitae, inventore reiciendis, rerum reprehenderit voluptas
          vero. Illum quos animi, molestiae ipsam quis laudantium fuga ab
          consectetur natus ut, blanditiis incidunt sit assumenda atque
          voluptatum, maxime qui iste debitis? Sunt, exercitationem. Amet quia
          omnis impedit laboriosam voluptatem. placeat voluptatem?
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
              {data.map((item) => (
                <Link
                  to={`details/${item.id}`}
                  key={item.id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
                >
                  <img
                    src={item.download_url}
                    alt={item.author}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{item.author}</h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
