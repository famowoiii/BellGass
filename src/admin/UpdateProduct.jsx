import React from "react";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
  const { id } = useParams();
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const updateProduct = async (e) => {
    e.preventdefault();
    const formData = new FormData();
    formData.append("price", price);
    formData.append("quantity", quantity);
    try {
      const url = "isi dengan  url dan id";
      await axios.patch(url, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      Navigate("/crudproduct");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={updateProduct}>
          <div>
            <input
              type="number"
              value={price}
              id="price"
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Change the item's price"
            />
          </div>
          <div>
            <input
              type="number"
              value={quantity}
              id="price"
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Change the item's stock"
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
