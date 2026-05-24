import React from "react";

import axios from "axios";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");



  // ================= LOGIN =================

  const LoginUser = () => {

    axios.post(

      "http://localhost:5000/login",

      {
        username,
        password
      },

      {
        withCredentials: true
      }

    )

    .then((res) => {

      setMessage(res.data.message);

      if (res.data.message === "Login Success") {

        navigate("/dashboard");

      }

    });

  };




  return (

    <div className="bg-gray-100 h-screen flex justify-center items-center">

      <div className="bg-white p-8 rounded w-[350px]">

        <h1 className="text-3xl text-center mb-5">
          Login
        </h1>



        <input
          type="text"
          placeholder="Enter Username"
          className="border w-full p-2 mb-4 rounded"
          onChange={(e) => setUsername(e.target.value)}
        />



        <input
          type="password"
          placeholder="Enter Password"
          className="border w-full p-2 mb-4 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />



        <button
          onClick={LoginUser}
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Login
        </button>



        <h3 className="text-center text-red-500 mt-4">
          {message}
        </h3>

      </div>

    </div>

  );

}

export default Login;