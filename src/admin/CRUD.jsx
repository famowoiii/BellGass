import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

// Function to validate if a string is a valid GUID
const isValidGUID = (str) => {
  const regexGuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return regexGuid.test(str);
};

function ProductForm({
  onAddProduct,
  selectedProduct,
  onProductChange,
  products,
}) {
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

  const [newProductType, setNewProductType] = useState({
    type: "",
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

  const handleTypeInputChange = (e) => {
    const { name, value } = e.target;
    setNewProductType({ ...newProductType, [name]: value });
  };

  const handleFileTypeChange = (e) => {
    setNewProductType({ ...newProductType, image: e.target.files[0] });
  };

  const handleAddProductType = async () => {
    const auth_token = localStorage.getItem("auth_token");
    const authToken = JSON.parse(auth_token);
    const token = authToken.token;

    if (!token) {
      console.error("auth_token tidak ditemukan");
      return;
    }

    if (!isValidGUID(selectedProduct)) {
      console.error("Invalid GUID for selectedProduct");
      return;
    }

    const formData = new FormData();
    formData.append("id", selectedProduct);
    formData.append("type", JSON.stringify(newProductType.type));
    formData.append("price", newProductType.price);
    formData.append("stock", newProductType.stock);
    formData.append("refill", newProductType.refill);
    if (newProductType.image) {
      formData.append("image", newProductType.image);
    }

    try {
      await axios.post("http://localhost:3010/admin/item/type", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setNewProductType({
        type: "",
        price: 0,
        stock: 0,
        refill: false,
        image: null,
      });
    } catch (error) {
      console.error("Error adding product type:", error.message);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      }
    }
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
    <div>
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
              <option value="1 kg">1kg</option>
              <option value="2 kg">2kg</option>
              <option value="3 kg">3kg</option>
              <option value="4 kg">4kg</option>
              <option value="9 kg">9kg</option>
              <option value="18 kg">18kg</option>
              <option value="45 kg">45kg</option>
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

      <form className="mb-8 p-3 bg-white rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Add New Product Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Select Product</label>
            <select
              value={selectedProduct}
              onChange={(e) => onProductChange(e.target.value)}
              className="w-full border rounded py-2 px-4"
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            Type
            <select
              name="type"
              value={newProductType.type}
              onChange={handleTypeInputChange}
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
              value={newProductType.price}
              onChange={handleTypeInputChange}
              className="w-full border rounded py-2 px-4"
            />
          </div>
          <div>
            <label className="block text-gray-700">Stock</label>
            <input
              type="number"
              name="stock"
              value={newProductType.stock}
              onChange={handleTypeInputChange}
              className="w-full border rounded py-2 px-4"
            />
          </div>
          <div>
            <label className="block text-gray-700">Refill</label>
            <select
              name="refill"
              value={newProductType.refill}
              onChange={handleTypeInputChange}
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
              onChange={handleFileTypeChange}
              className="w-full border rounded py-2 px-4"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleAddProductType}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          <FaPlus className="mr-1" /> Add Product Type
        </button>
      </form>
    </div>
  );
}

function ProductDashboard() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");

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

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Product Dashboard</h1>
      <ProductForm
        onAddProduct={handleAddProduct}
        selectedProduct={selectedProduct}
        onProductChange={setSelectedProduct}
        products={products}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.length > 0 &&
          products.map((product) => (
            <div key={product.id} className="p-4 bg-white rounded shadow-md">
              <p className="text-gray-700 mb-2">Product Name: {product.name}</p>
              <p className="text-gray-700 mb-2">
                Product Description: {product.description}
              </p>

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
                        src={`http://localhost:3010/${itemType.url}`}
                        alt={product.name}
                        className="w-full h-48 object-cover mb-2"
                      />
                    )}
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProductDashboard;
