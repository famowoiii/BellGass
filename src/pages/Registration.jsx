import React from "react";
import RegisterCard from "../components/RegisterCard";
import Login from "../components/Login";
import { useState } from "react";

function Registration() {
  const [regIsTrue, setReqIsTrue] = useState(false);
  const [toLoginIsTrue, setToLoginIsTrue] = useState(false);
  const toLogin = () => {
    setToLoginIsTrue(!toLoginIsTrue);
    setReqIsTrue(false);
  };
  const registerHandler = () => {
    setReqIsTrue(!regIsTrue);
    setToLoginIsTrue(toLoginIsTrue);
  };
  return (
    <div className="h-screen">
      <div className="  flex justify-center bg-white bg-cover bg-fixed h-full align-middle  items-center ">
        {regIsTrue && <RegisterCard toLogin={toLogin} />}
        {!regIsTrue && (
          <Login registerHandler={registerHandler} regIsTrue={regIsTrue} />
        )}
      </div>
    </div>
  );
}

export default Registration;
