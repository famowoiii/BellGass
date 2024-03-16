import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Footer from "./components/Footer";
import Registration from "./pages/Registration";
import Details from "./pages/Details";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import AddProduct from "./admin/AddProduct";
import UpdateProduct from "./admin/UpdateProduct";
import CrudProduct from "./admin/CrudProduct";
import Refill from "./pages/Refill";

function App() {
  const [cartItem, setCartItem] = useState([]);
  const [countItems, setCountItems] = useState([]);

  // Menggunakan useEffect untuk mengupdate countItems ketika cartItem berubah
  useEffect(() => {
    setCountItems(Array(cartItem.length).fill(0));
  }, [cartItem]);

  const addCountHandler = (index) => {
    const newCountItems = [...countItems];
    newCountItems[index] += 1;
    setCountItems(newCountItems);
  };

  const removeCountHandler = (index) => {
    if (countItems[index] > 0) {
      const newCountItems = [...countItems];
      newCountItems[index] -= 1;
      setCountItems(newCountItems);
    } else {
      console.log("the chosen item is 0");
    }
  };

  const calculateTotal = () => {
    let total = 0;
    cartItem.forEach((product, index) => {
      total += product.id * countItems[index];
    });
    return total;
  };

  const addToCart = (products) => {
    const exist = cartItem.find((x) => x.id === products.id);

    if (exist) {
      alert("this product is already added");
    } else {
      setCartItem([...cartItem, { ...products, quantity: 1 }]);
    }
    console.log(cartItem);
  };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItem];
    newCartItems.splice(index, 1); // Hapus item dari array berdasarkan indeks
    setCartItem(newCartItems); // Perbarui state cartItem
  };

  // Penutupan kurung kurawal untuk fungsi App
  return (
    <>
      <div className="min-w-screem bg-white min-h-lvh">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route
            path="/products"
            element={<Products addToCart={addToCart} />}
          />
          <Route path="/aboutus" element={<About />} />
          <Route path="/login" element={<Registration />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItem={cartItem}
                countItems={countItems}
                addCountHandler={addCountHandler}
                removeCountHandler={removeCountHandler}
                calculateTotal={calculateTotal}
                removeFromCart={removeFromCart}
              />
            }
          />
          <Route path="/updateproduct/:id" element={<UpdateProduct />} />
          <Route
            path="/refill"
            element={
              <Refill
                setCartItem={setCartItem}
                cartItem={cartItem}
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <CheckOut
                countItems={countItems}
                cartItem={cartItem}
                calculateTotal={calculateTotal}
              />
            } // Pindahkan prop cartItem ke dalam element
          />
          <Route path="/crudproduct" element={<CrudProduct />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
