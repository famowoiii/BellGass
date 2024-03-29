// Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosLogIn, IoIosClose } from "react-icons/io";

function Navbar() {
  const [phoneIsOpen, setPhoneIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPhoneIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const togglePhoneMenu = () => {
    setPhoneIsOpen(!phoneIsOpen);
  };

  const closeDropdown = () => {
    setPhoneIsOpen(false);
  };

  return (
    <div className="bg-white min-w-full h-16 gap-4 md:gap-24 items-center font-semibold relative mb-0 border-b-4 border-red">
      <div className="flex flex-row justify-between p-3 pt-5 pb-10">
        <div className="flex flex-col">
          <div>BELL GASS</div>
        </div>
        <ul className="list-none border-solid flex justify-between border-sky-500 gap-6 px-2 md:flex hidden">
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
            className="md:hidden w-full absolute z-50 bg-white  left-0 drop-shadow-2xl rounded-lg"
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
                to="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={closeDropdown}
              >
                Login
              </Link>
            </li>
          </ul>
        )}
        <ul className="flex gap-4 md:flex hidden">
          <li>
            <Link to="/cart" className="hover:text-red duration-200">
              <FaShoppingCart size={25} />
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-red duration-200">
              <IoIosLogIn size={25} />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
