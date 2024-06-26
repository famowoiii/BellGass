import React from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail, MdPhone } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai"; // Importing an alternative icon for the address field

function RegisterCard({ toLogin }) {
  const [fullname, setFullname] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeat_password, setRepeatPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      // Replace API URL with the appropriate registration URL
      const response = await fetch(`http://110.173.135.202/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          username,
          email,
          password,
          repeat_password,
          phone,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        // Registration successful
        console.log("Registration successful:", data);
        toLogin(); // Navigate to login page
      } else {
        // Registration failed
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const confirmMessage = (password, repeatPassword) => {
    if (password !== repeatPassword) {
      return "Password doesn't match, please fill it again!";
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-6 bg-white rounded-xl shadow-md overflow-hidden">
      <h1 className="text-3xl font-bold text-center mb-6">
        Register Your Account Now!
      </h1>
      <div className="mb-4">
        <div className="flex items-center border-b border-gray-300 py-2">
          <FaRegUser className="w-6 h-6 mr-3" />
          <input
            type="text"
            placeholder="Full Name"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="flex items-center border-b border-gray-300 py-2">
          <FaRegUser className="w-6 h-6 mr-3" />
          <input
            type="text"
            placeholder="Username"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex items-center border-b border-gray-300 py-2">
          <MdOutlineEmail className="w-6 h-6 mr-3" />
          <input
            type="email"
            placeholder="Email"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex items-center border-b border-gray-300 py-2">
          <MdPhone className="w-6 h-6 mr-3" />
          <input
            type="number"
            placeholder="Phone Number"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex items-center border-b border-gray-300 py-2">
          <RiLockPasswordLine className="w-6 h-6 mr-3" />
          <input
            type="password"
            placeholder="Password"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center border-b border-gray-300 py-2">
          <RiLockPasswordLine className="w-6 h-6 mr-3" />
          <input
            type="password"
            placeholder="Repeat Password"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            value={repeat_password}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
      </div>
      {error && <div className="text-red mb-4">{error}</div>}
      <div className="text-red">
        {confirmMessage(password, repeat_password)}
      </div>

      <div className="flex justify-center">
        <button
          className="bg-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </div>
      <div className="text-center mt-4">
        <button onClick={() => toLogin()} className="text-red hover:text-black">
          Already have an account? Login here!
        </button>
      </div>
    </div>
  );
}

export default RegisterCard;
