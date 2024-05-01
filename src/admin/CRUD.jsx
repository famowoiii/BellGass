import React, { useState } from "react";
import { FaTrashAlt, FaEdit, FaSave, FaTimes, FaPlus } from "react-icons/fa";

function ProductForm({ onAddProduct }) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "refill", // Default category: refill
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = () => {
    onAddProduct(newProduct);
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "refill", // Reset category to default: refill
    });
  };

  return (
    <div className="mb-8 flex flex-row">
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={handleInputChange}
        className="border rounded py-2 px-4 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="description"
        placeholder="Product Description"
        value={newProduct.description}
        onChange={handleInputChange}
        className="border rounded py-2 px-4 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="price"
        placeholder="Product Price"
        value={newProduct.price}
        onChange={handleInputChange}
        className="border rounded py-2 px-4 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="stock"
        placeholder="Product Stock"
        value={newProduct.stock}
        onChange={handleInputChange}
        className="border rounded py-2 px-4 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        name="category"
        value={newProduct.category}
        onChange={handleInputChange}
        className="border rounded py-2 px-4 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="refill">Refill</option>
        <option value="pickup">Pickup</option>
      </select>
      <button
        onClick={handleAddProduct}
        className="bg-blue-500 text-white py-2 px-4  justify-center flex-row flex  rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <FaPlus className="mr-1" /> Add Product
      </button>
    </div>
  );
}

function ProductDashboard() {
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Product 1",
      description: "Description of Product 1",
      price: 10,
      stock: 5,
      category: "refill",
      editing: false,
      editedName: "Product 1",
      editedDescription: "Description of Product 1",
      editedPrice: 10,
      editedStock: 5,
    },
    {
      id: "2",
      name: "Product 2",
      description: "Description of Product 2",
      price: 20,
      stock: 10,
      category: "pickup",
      editing: false,
      editedName: "Product 2",
      editedDescription: "Description of Product 2",
      editedPrice: 20,
      editedStock: 10,
    },
    {
      id: "3",
      name: "Product 3",
      description: "Description of Product 3",
      price: 30,
      stock: 15,
      category: "refill",
      editing: false,
      editedName: "Product 3",
      editedDescription: "Description of Product 3",
      editedPrice: 30,
      editedStock: 15,
    },
  ]);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEdit = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, editing: true }
          : { ...product, editing: false }
      )
    );
  };

  const handleSave = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? {
              ...product,
              name: product.editedName,
              description: product.editedDescription,
              price: product.editedPrice,
              stock: product.editedStock,
              editing: false,
            }
          : product
      )
    );
  };

  const handleCancel = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? {
              ...product,
              editedName: product.name,
              editedDescription: product.description,
              editedPrice: product.price,
              editedStock: product.stock,
              editing: false,
            }
          : product
      )
    );
  };

  const handleChange = (id, e) => {
    const { name, value } = e.target;
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, [`edited${name}`]: value } : product
      )
    );
  };

  const handleAddProduct = (newProduct) => {
    const id = (Math.random() * 100).toString(); // Generate a unique ID
    setProducts([
      ...products,
      {
        id,
        ...newProduct,
        editing: false,
        editedName: newProduct.name,
        editedDescription: newProduct.description,
        editedPrice: newProduct.price,
        editedStock: newProduct.stock,
      },
    ]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Dashboard</h1>
      <ProductForm onAddProduct={handleAddProduct} />
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <li key={product.id} className="border rounded p-4">
            {product.editing ? (
              <div>
                <input
                  type="text"
                  name="Name"
                  value={product.editedName}
                  onChange={(e) => handleChange(product.id, e)}
                  className="border rounded py-2 px-4 mb-2 w-full"
                />
                <input
                  type="text"
                  name="Description"
                  value={product.editedDescription}
                  onChange={(e) => handleChange(product.id, e)}
                  className="border rounded py-2 px-4 mb-2 w-full"
                />
                <input
                  type="number"
                  name="Price"
                  value={product.editedPrice}
                  onChange={(e) => handleChange(product.id, e)}
                  className="border rounded py-2 px-4 mb-2 w-full"
                />
                <input
                  type="number"
                  name="Stock"
                  value={product.editedStock}
                  onChange={(e) => handleChange(product.id, e)}
                  className="border rounded py-2 px-4 mb-2 w-full"
                />
                <button
                  onClick={() => handleSave(product.id)}
                  className="bg-green-500 text-white py-2 px-4 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <FaSave className="mr-1" /> Save
                </button>
                <button
                  onClick={() => handleCancel(product.id)}
                  className="bg-gray-500 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <FaTimes className="mr-1" /> Cancel
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-gray-800 font-bold">${product.price}</p>
                <p className="text-gray-600">Stock: {product.stock}</p>
                <p className="text-gray-600">Category: {product.category}</p>
                <div className="flex mt-4">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex items-center bg-red text-white py-2 px-4 mr-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <FaTrashAlt className="mr-1" /> Delete
                  </button>
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="flex items-center bg-yellow-500 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductDashboard;
