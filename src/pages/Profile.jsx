import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AiOutlineMail,
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineHome,
  AiOutlinePhone,
} from "react-icons/ai";

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const auth_token = localStorage.getItem("auth_token");
    const authToken = JSON.parse(auth_token);
    const token = authToken.token;
    const checktoken = (authToken) => {
      if (auth_token) {
        setUserData(token);
      } else {
        return "no found token";
      }
    };

    checktoken();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
          {userData ? (
            <>
              <div className="mb-4 flex items-center">
                <AiOutlineMail className="mr-2" />
                <label className="block mb-1">Email:</label>
                <p>{userData.email}</p>
              </div>
              <div className="mb-4 flex items-center">
                <AiOutlineUser className="mr-2" />
                <label className="block mb-1">Username:</label>
                <p>{userData.username}</p>
              </div>
            </>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
