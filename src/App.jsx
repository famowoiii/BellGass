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
import ProductDashboard from "./admin/CRUD";
import Dashboard from "./admin/Dashboard";
import OrderConfirmation from "./admin/UserService";
import Profile from "./pages/Profile";

function App() {
  const [cartItem, setCartItem] = useState([]);
  const [countItems, setCountItems] = useState([]);
  const location = useLocation();

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

  const addToCart = (productToAdd) => {
    const existingProductIndex = cartItem.findIndex(
      (item) => item.id === productToAdd.id
    );

    if (existingProductIndex !== -1) {
      // Produk dengan ID yang sama sudah ada di keranjang
      // Cek apakah produk dengan tipe yang sama sudah ada
      const existingProductWithSameTypeIndex = cartItem.findIndex(
        (item) => item.id === productToAdd.id && item.type === productToAdd.type
      );

      if (existingProductWithSameTypeIndex !== -1) {
        // Produk dengan tipe yang sama sudah ada di keranjang, tambahkan kuantitasnya
        const updatedCartItem = [...cartItem];
        updatedCartItem[existingProductWithSameTypeIndex].quantity += 1;
        setCartItem(updatedCartItem);
      } else {
        // Produk dengan tipe yang berbeda, tambahkan produk baru dengan tipe yang berbeda
        setCartItem([...cartItem, { ...productToAdd, quantity: 1 }]);
      }
    } else {
      // Produk belum ada di keranjang, tambahkan produk baru
      setCartItem([...cartItem, { ...productToAdd, quantity: 1 }]);
    }
  };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItem];
    newCartItems.splice(index, 1); // Hapus item dari array berdasarkan indeks
    setCartItem(newCartItems); // Perbarui state cartItem
  };

  // Fungsi untuk mengecek apakah pengguna berada di rute admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <div className="min-w-screen bg-white min-h-screen">
        {/* Menampilkan navbar jika bukan rute admin */}
        {!isAdminRoute && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route
            path="/products"
            element={<Products addToCart={addToCart} />}
          />
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
            }
          />
          <Route path="/admin/*" element={<Dashboard />} />
        </Routes>
        {/* Menampilkan footer jika bukan rute admin */}
        {!isAdminRoute && <Footer />}
      </div>
    </>
  );
}

export default App;
