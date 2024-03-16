import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Delivery() {
  const [recipientName, setRecipientName] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const navigateTo = useNavigate();
  const addAddress = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("RecipientName", recipientName);
    formData.append("HouseNumber", houseNumber);
    formData.append("City", city);
    formData.append("State", state);
    formData.append("PostalCode", postalCode);
    try {
      const url = "";
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigateTo("/payment");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 bg-white">
      <form onSubmit={addAddress}>
        <input
          value={recipientName}
          onChange={(e) => {
            setRecipientName(e.target.value);
          }}
          type="text"
          required
          placeholder="Recipient's Name"
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          value={houseNumber}
          onChange={(e) => {
            setHouseNumber(e.target.value);
          }}
          type="text"
          required
          placeholder="House Number"
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          type="text"
          required
          placeholder="City"
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          value={state}
          onChange={(e) => {
            setState(e.target.value);
          }}
          type="text"
          required
          placeholder="State"
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          value={postalCode}
          onChange={(e) => {
            setPostalCode(e.target.value);
          }}
          type="text"
          required
          placeholder="Postal Code"
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <button
          type="submit"
          className="bg-red text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Delivery;
