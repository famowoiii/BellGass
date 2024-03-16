import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Details() {
  const { id } = useParams();
  const [imageInfo, setImageInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://picsum.photos/id/${id}/info`);
        const imageData = response.data;
        setImageInfo(imageData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-2 mx-32 justify-center my-10 gap-5">
          <div className="bg-gray-300 rounded-lg p-4 text-center">
            <img
              src={imageInfo.download_url}
              alt=""
              className="my-4 rounded-lg"
            />
            <Link
              to="/products"
              className="bg-red text-xl px-4 py-2 rounded-lg mt-3 transition duration-200 ease-in-out transform hover:scale-105 hover:text-white"
            >
              Shop Now!
            </Link>
          </div>
          <div>
            <div>Author: {imageInfo.author}</div>
            <div>ID: {imageInfo.id}</div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
              deleniti vitae quam velit, est aspernatur suscipit adipisci amet
              quasi, deserunt, laboriosam sed tenetur repudiandae numquam aut.
              Non laudantium voluptatum fugit consequuntur libero?
              Necessitatibus hic animi, nam libero accusantium nostrum minima.
            </div>
          </div>

          {/* Tambahkan properti lain yang ingin Anda tampilkan */}
        </div>
      )}
    </div>
  );
}

export default Details;
