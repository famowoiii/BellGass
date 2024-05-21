import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Footer from "./components/Footer";
import Registration from "./pages/Registration";
import Details from "./pages/Details";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import Refill from "./pages/Refill";
import Dashboard from "./admin/Dashboard";
import Profile from "./pages/Profile";
import OrderStatus from "./pages/OrderStatus";

function App() {
  const [cartItem, setCartItem] = useState([]);
  const [countItems, setCountItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Membuat array baru yang berisi jumlah barang yang sama dengan panjang array cartItem
    const newCountItems = Array(cartItem.length).fill(0);
    // Mengisi nilai quantity pada setiap barang yang ada di keranjang
    cartItem.forEach((item, index) => {
      newCountItems[index] = item.quantity;
    });
    // Mengatur state countItems dengan array baru yang telah dibuat
    setCountItems(newCountItems);
  }, [cartItem]);

  const addCountHandler = (index) => {
    const newCountItems = [...countItems];
    newCountItems[index] += 1;

    const updatedCartItem = [...cartItem];
    updatedCartItem[index].quantity += 1;

    setCountItems(newCountItems);
    setCartItem(updatedCartItem);
  };

  const removeCountHandler = (index) => {
    if (countItems[index] > 0) {
      const newCountItems = [...countItems];
      newCountItems[index] -= 1;

      const updatedCartItem = [...cartItem];
      updatedCartItem[index].quantity -= 1;

      setCountItems(newCountItems);
      setCartItem(updatedCartItem);
    } else {
      console.log("The chosen item is 0");
    }
  };

  const calculateTotal = () => {
    let total = 0;
    cartItem.forEach((product, index) => {
      total += product.price * countItems[index];
    });
    return total;
  };

  const addToCart = (productToAdd) => {
    const existingProductIndex = cartItem.findIndex(
      (item) => item.id === productToAdd.id && item.type === productToAdd.type
    );

    if (existingProductIndex !== -1) {
      const updatedCartItem = [...cartItem];
      updatedCartItem[existingProductIndex].quantity += 1;
      setCartItem(updatedCartItem);

      const newCountItems = [...countItems];
      newCountItems[existingProductIndex] += 1;
      setCountItems(newCountItems);
    } else {
      // Tambahkan quantity: 1 saat menambah item baru ke dalam keranjang
      setCartItem([...cartItem, { ...productToAdd, quantity: 1 }]);
      setCountItems([...countItems, 1]);
    }
  };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItem];
    newCartItems.splice(index, 1);
    setCartItem(newCartItems);

    // Menghapus jumlah item terkait dari countItems
    const newCountItems = [...countItems];
    newCountItems.splice(index, 1);
    setCountItems(newCountItems);
  };

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-w-screen bg-white min-h-screen">
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/products" element={<Products addToCart={addToCart} />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/login" element={<Registration />} />
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
        <Route path="/profile" element={<Profile />} />
        <Route path="/refill" element={<Refill addToCart={addToCart} />} />
        <Route
          path="/checkout"
          element={
            <CheckOut
              countItems={countItems}
              cartItem={cartItem}
              calculateTotal={calculateTotal}
            />
          }
        />
        <Route path="/admin/*" element={<Dashboard />} />
        <Route path="/orderstatus" element={<OrderStatus />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
