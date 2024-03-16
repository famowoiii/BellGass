import React from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";
import { useState } from "react";

function Login({ registerHandler }) {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = ""; // Masukkan URL untuk endpoint login
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/home";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div
      className={`text-lg max-w-xs  bg-backdrop-blur-sm bg-white/70 border-2 flex justify-center flex-col border-red rounded-xl 
         p-4`}
    >
      <h1 className="text-xl font-bold mb-4">Sign in!</h1>
      <div className="mb-4">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-2">
            <FaRegUser className="mr-2" />
            <input
              onChange={handleChange}
              required
              value={data.username}
              name="username" // tambahkan name attribute
              type="text"
              placeholder="Username"
              className="bg-transparent placeholder-black text-black w-full"
            />
          </div>

          <div className="flex items-center">
            <RiLockPasswordLine className="mr-2" />
            <input
              type="password"
              onChange={handleChange}
              required
              value={data.password}
              name="password" // tambahkan name attribute
              placeholder="Password"
              className="bg-transparent placeholder-black text-black w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-red text-center hover:scale-105 hover:text-white duration-200 rounded-xl px-2 p-1"
          >
            Login
          </button>
        </form>
      </div>
      <button onClick={() => registerHandler()}>
        Dont have any account yet?
      </button>
    </div>
  );
}

export default Login;
