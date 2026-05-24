import React from "react";

import axios from "axios";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';

function Dashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState("");



  // ================= CHECK SESSION =================

  useEffect(() => {

    axios.get(
      "http://localhost:5000/session",

      {
        withCredentials: true
      }

    )

    .then((res) => {

      if (res.data.message === "No Session") {

        navigate("/");

      }

      else {

        setUser(res.data.user);

      }

    });

  }, []);




  // ================= LOGOUT =================

  const Logout = () => {

    axios.get(
      "http://localhost:5000/logout",

      {
        withCredentials: true
      }

    )

    .then((res) => {

      alert(res.data.message);

      navigate("/");

    });

  };




  return (

    <div className="bg-gray-100 min-h-screen">

      {/* ================= NAVBAR ================= */}

      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">

        <h1 className="text-2xl">
          SRMS
        </h1>

        <ul className="flex gap-5">

          <li className="cursor-pointer px-4 py-2 bg-blue-500  rounded-lg">
            Dashboard
          </li>

          <Link to={'/item'}> <button className="cursor-pointer bg-green-500 px-5 py-2  rounded-lg">
            Items
          </button></Link>

          <li className="cursor-pointer bg-yellow-500 px-5 py-2  rounded-lg">
            #
          </li>

          <li className="cursor-pointer bg-lime-400 px-5 py-2 rounded-lg">
            #
          </li>

          <li className="cursor-pointer bg-red-500 px-5 py-2 rounded-lg">
            #
          </li>

        </ul>

        <button
          onClick={Logout}
          className="bg-red-500 px-5 py-2 rounded"
        >
          Logout
        </button>

      </div>




      {/* ================= CONTENT ================= */}

      <div className="p-5">

        <h1 className="text-3xl mb-5">
          Dashboard
        </h1>



        {/* ================= USER CARD ================= */}
<div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-md w-[350px]">

  <h2 className="text-3xl font-bold mb-2">
    Welcome ✋
  </h2>

  <p className="text-xl">
    {user.username}
  </p>

</div>


        {/* ================= CARDS ================= */}

        <div className="grid grid-cols-4 gap-5 mt-5">




         



        


        </div>

      </div>

    </div>

  );

}

export default Dashboard;