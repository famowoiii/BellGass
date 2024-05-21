import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

function ProductForm({ onAddProduct }) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    type: "2kg",
    price: 0,
    stock: 0,
    refill: false,
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  const handleAddProduct = async () => {
    const auth_token = localStorage.getItem("auth_token");
    const authToken = JSON.parse(auth_token);
    const token = authToken.token;

    if (!token) {
      console.error("auth_token tidak ditemukan");
      return;
    }

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("category", newProduct.category);
    formData.append("type", newProduct.type);
    formData.append("price", newProduct.price);
    formData.append("stock", newProduct.stock);
    formData.append("refill", newProduct.refill);
    if (newProduct.image) {
      formData.append("image", newProduct.image);
    }

    try {
      const response = await axios.post(
        "http://localhost:3010/admin/item",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onAddProduct(response.data);
      setNewProduct({
        name: "",
        description: "",
        category: "",
        type: "2kg",
        price: 0,
        stock: 0,
        refill: false,
        image: null,
      });
    } catch (error) {
      console.error("Error adding product:", error.message);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      }
    }
  };

  return (
    <form className="mb-8 p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="w-full border rounded py-2 px-4"
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            className="w-full border rounded py-2 px-4"
          />
        </div>
        <div>
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            className="w-full border rounded py-2 px-4"
          />
        </div>
        <div>
          <label className="block text-gray-700">Type</label>
          <select
            name="type"
            value={newProduct.type}
            onChange={handleInputChange}
            className="w-full border rounded py-2 px-4"
          >
            <option value="1kg">1kg</option>
            <option value="2kg">2kg</option>
            <option value="3kg">3kg</option>
            <option value="4kg">4kg</option>
            <option value="9kg">9kg</option>
            <option value="18kg">18kg</option>
            <option value="45kg">45kg</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="w-full border rounded py-2 px-4"
          />
        </div>
        <div>
          <label className="block text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            className="w-full border rounded py-2 px-4"
          />
        </div>
        <div>
          <label className="block text-gray-700">Refill</label>
          <select
            name="refill"
            value={newProduct.refill}
            onChange={handleInputChange}
            className="w-full border rounded py-2 px-4"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full border rounded py-2 px-4"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={handleAddProduct}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        <FaPlus className="mr-1" /> Add Product
      </button>
    </form>
  );
}

// Other imports...

function ProductDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const auth_token = localStorage.getItem("auth_token");
    const authToken = JSON.parse(auth_token);
    const token = authToken.token;

    axios
      .get("http://localhost:3010/admin/item", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error.message);
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);
          console.error("Error response headers:", error.response.headers);
        }
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Product Dashboard</h1>
      <ProductForm
        onAddProduct={(newProduct) => setProducts([...products, newProduct])}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="p-4 bg-white rounded shadow-md">
              <p className="text-gray-700 mb-2">{product.description}</p>

              {product.itemTypes &&
                product.itemTypes.map((itemType) => (
                  <div key={itemType.id} className="mb-4">
                    <p className="text-gray-700 mb-2">Type: {itemType.type}</p>
                    <p className="text-gray-700 mb-2">
                      Price: {itemType.price}
                    </p>
                    <p className="text-gray-700 mb-2">
                      Stock: {itemType.stock}
                    </p>
                    <p className="text-gray-700 mb-2">
                      Refill: {itemType.refill ? "Yes" : "No"}
                    </p>
                    {itemType.url && (
                      <img
                        key={itemType.url} // Add unique key here
                        src={`http://localhost:3010/${itemType.url}`}
                        alt={product.name}
                        className="w-full h-48 object-cover mb-2"
                      />
                    )}
                  </div>
                ))}
            </div>
          ))
        ) : (
          <p key="no-products">No products available.</p> // Add a key here
        )}
      </div>
    </div>
  );
}

export default ProductDashboard;
