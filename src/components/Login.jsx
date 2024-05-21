import React from "react";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";

function Login({ registerHandler }) {
  const [data, setData] = React.useState({ username: "", password: "" });
  const [error, setError] = React.useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3010/auth/login"; // Masukkan URL untuk endpoint login
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("auth_token", JSON.stringify(res.data));

      window.location = "/";
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
    <div className="max-w-md mx-auto py-12 px-6 bg-white rounded-xl shadow-md overflow-hidden">
      <h1 className="text-3xl font-bold text-center mb-6">Sign in!</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="flex items-center border-b border-gray-300 py-2">
            <FaRegUser className="w-6 h-6 mr-3" />
            <input
              onChange={handleChange}
              required
              value={data.username}
              name="username"
              type="text"
              autoComplete="current-password"
              placeholder="Username"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center border-b border-gray-300 py-2">
            <RiLockPasswordLine className="w-6 h-6 mr-3" />
            <input
              type="password"
              onChange={handleChange}
              required
              autoComplete="current-password"
              value={data.password}
              name="password"
              placeholder="Password"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-red hover:bg-red text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </form>
      <div className="text-center mt-4">
        <button
          onClick={() => registerHandler()}
          className="text-red hover:text-red"
        >
          Don't have an account yet? Register here!
        </button>
      </div>
    </div>
  );
}

export default Login;
