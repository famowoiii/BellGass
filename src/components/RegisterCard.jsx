import React from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

function RegisterCard({ toLogin }) {
  return (
    <div
      className={`text-lg  max-w-xs  bg-backdrop-blur-sm bg-white/70 border-2 flex justify-center flex-col border-red rounded-xl p-4`}
    >
      <h1 className="text-xl font-bold mb-4">Register Your Account Now!</h1>
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <FaRegUser className="mr-2" />
          <input
            type="text"
            placeholder="Username"
            className="bg-transparent placeholder-black text-black w-full"
          />
        </div>
        <div className="flex items-center mb-2">
          <MdOutlineEmail className="mr-2" />
          <input
            type="email"
            placeholder="Email"
            className="bg-transparent placeholder-black text-black w-full"
          />
        </div>
        <div className="flex items-center">
          <RiLockPasswordLine className="mr-2" />
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent placeholder-black text-black w-full"
          />
        </div>
      </div>
      <button className="bg-red text-center hover:scale-105 hover:text-white duration-200 rounded-xl px-2 p-1">
        Sign up
      </button>
      <button onClick={() => toLogin()}>Login!</button>
    </div>
  );
}

export default RegisterCard;
