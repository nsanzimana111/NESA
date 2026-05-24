import React from "react";

import axios from "axios";

import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

function Update() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [itemName, setItemName] = useState("");
  const [Specification, setSpecification] = useState("");
  const [UnitMeasure, setUnitMeasure] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [UnityPrice, setUnityPrice] = useState("");
  const [TotalQuantity, setTotalQuantity] = useState("");

  const [message, setMessage] = useState("");



  // ================= LOAD SINGLE ITEM =================

  useEffect(() => {

    axios.get("http://localhost:5000/items")

    .then((res) => {

      const item = res.data.find((data) => data.item_id == id);

      setItemName(item.itemName);
      setSpecification(item.Specification);
      setUnitMeasure(item.UnitMeasure);
      setQuantity(item.Quantity);
      setUnityPrice(item.UnityPrice);
      setTotalQuantity(item.TotalQuantity);

    });

  }, []);




  // ================= UPDATE ITEM =================

  const UpdateItem = () => {

    axios.put(

      `http://localhost:5000/update_item/${id}`,

      {
        itemName,
        Specification,
        UnitMeasure,
        Quantity,
        UnityPrice,
        TotalQuantity
      }

    )

    .then((res) => {

      setMessage(res.data.message);

      navigate("/item");

    });

  };




  return (

    <div className="p-5">

      <div className="bg-white p-5 rounded shadow">

        <h1 className="text-2xl mb-5">
          Update Item
        </h1>



        <div className="grid grid-cols-3 gap-4">

          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="border p-2 rounded"
          />



          <input
            type="text"
            value={Specification}
            onChange={(e) => setSpecification(e.target.value)}
            className="border p-2 rounded"
          />



          <input
            type="text"
            value={UnitMeasure}
            onChange={(e) => setUnitMeasure(e.target.value)}
            className="border p-2 rounded"
          />



          <input
            type="number"
            value={Quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border p-2 rounded"
          />



          <input
            type="number"
            value={UnityPrice}
            onChange={(e) => setUnityPrice(e.target.value)}
            className="border p-2 rounded"
          />



          <input
            type="number"
            value={TotalQuantity}
            onChange={(e) => setTotalQuantity(e.target.value)}
            className="border p-2 rounded"
          />

        </div>



        <button
          onClick={UpdateItem}
          className="bg-yellow-500 text-white px-5 py-2 rounded mt-5"
        >
          Update Item
        </button>



        <h3 className="text-green-500 mt-4">
          {message}
        </h3>

      </div>

    </div>

  );

}

export default Update;