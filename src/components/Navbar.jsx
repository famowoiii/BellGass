import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { IoIosLogIn, IoIosClose } from "react-icons/io";
import { CiLogout } from "react-icons/ci";

function Navbar() {
  const [phoneIsOpen, setPhoneIsOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Fungsi untuk memeriksa keberadaan token dari local storage atau sesi
    const checkUserLoggedIn = () => {
      const token = localStorage.getItem("auth_token"); // Ganti dengan nama yang sesuai
      setIsUserLoggedIn(!!token); // Set isUserLoggedIn ke true jika token ada, false jika tidak
    };

    // Panggil fungsi untuk memeriksa status login setiap kali komponen dimuat ulang
    checkUserLoggedIn();
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setPhoneIsOpen(false);
    }
  };

  const togglePhoneMenu = () => {
    setPhoneIsOpen(!phoneIsOpen);
  };

  const closeDropdown = () => {
    setPhoneIsOpen(false);
  };

  const handleLogout = () => {
    // Hapus token autentikasi dari penyimpanan lokal
    localStorage.removeItem("auth_token"); // Ganti dengan nama yang sesuai
    // Set isUserLoggedIn menjadi false
    setIsUserLoggedIn(false);
    // Arahkan pengguna ke halaman login
    window.location.href = "/login";
  };

  return (
    <div className="bg-white min-w-full h-16 gap-4 md:gap-24 items-center font-semibold relative mb-0 border-b-4 border-red">
      <div className="flex flex-row justify-between p-3 pt-4 pb-11">
        <div className="flex flex-row items-center">
          <img
            src="./logofix.png"
            alt="Logo"
            className="h-auto w-9 md:w-9 mr-1  "
          />
          <p className="text-lg font-bold">BELLGAS</p>
        </div>

        <ul className="list-none border-solid flex justify-between gap-6 px-2 md:flex hidden">
          <li>
            <Link to="/" className="hover:text-red duration-200">
              Home Page
            </Link>
          </li>
          <li>
            <Link to="/aboutus" className="hover:text-red duration-200">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-red duration-200">
              Products
            </Link>
          </li>
          {isUserLoggedIn && <></>}
        </ul>
        <div className="flex gap-4 md:hidden">
          <button
            onClick={togglePhoneMenu}
            className="focus:outline-none hover:text-red"
          >
            {phoneIsOpen ? (
              <IoIosClose className="h-6 w-6" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    phoneIsOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-7 6h7"
                  }
                />
              </svg>
            )}
          </button>
        </div>
        {phoneIsOpen && (
          <ul
            ref={dropdownRef}
            className="md:hidden w-full absolute z-50 bg-white gap-3 left-0 drop-shadow-2xl rounded-lg"
          >
            <li>
              <Link
                to="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={closeDropdown}
              >
                Home Page
              </Link>
            </li>
            <li>
              <Link
                to="/aboutus"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={closeDropdown}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={closeDropdown}
              >
                Products
              </Link>
            </li>
            {isUserLoggedIn ? ( // Tampilkan tautan Cart dan Logout jika pengguna sudah masuk
              <>
                <li>
                  <Link
                    to="/cart"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={closeDropdown}
                  >
                    Cart
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orderstatus"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={closeDropdown}
                  >
                    Order Status
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    onClick={closeDropdown}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              // Jika pengguna belum masuk, tampilkan tautan Login
              <li>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={closeDropdown}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        )}
        <ul className="flex gap-6 md:flex hidden">
          {isUserLoggedIn ? (
            // Jika pengguna sudah masuk
            <>
              <li>
                <Link to="/cart" className="hover:text-red duration-200">
                  <FaShoppingCart size={25} />
                </Link>
              </li>
              <li>
                <Link to="/orderstatus" className="hover:text-red duration-200">
                  Order
                </Link>
              </li>

              <li>
                <Link to="/profile" className="hover:text-red duration-200">
                  <FaUser size={25} />
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="ml-2 px-2 py-1 rounded-md bg-red text-black hover:bg-red duration-200"
                >
                  <CiLogout size={25} />
                </button>
              </li>
            </>
          ) : (
            // Jika pengguna belum masuk
            <li>
              <Link to="/login" className="hover:text-red duration-200">
                <IoIosLogIn size={25} />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
