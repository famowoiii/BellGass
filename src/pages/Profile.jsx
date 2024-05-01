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
    // Fungsi untuk mengambil data pengguna dari API
    const fetchUserData = async () => {
      try {
        const response = await axios.get("URL_pengguna_API"); // Ganti URL_pengguna_API dengan URL yang sesuai
        setUserData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Panggil fungsi fetchUserData saat komponen dimuat
    fetchUserData();
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
              <div className="mb-4 flex items-center">
                <AiOutlineLock className="mr-2" />
                <label className="block mb-1">Password:</label>
                <p>{userData.password}</p>
              </div>
              <div className="mb-4 flex items-center">
                <AiOutlineHome className="mr-2" />
                <label className="block mb-1">Address:</label>
                <p>{userData.address}</p>
              </div>
              <div className="mb-4 flex items-center">
                <AiOutlinePhone className="mr-2" />
                <label className="block mb-1">Phone:</label>
                <p>{userData.phone}</p>
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
