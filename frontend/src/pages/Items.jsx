import React from "react";

import axios from "axios";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

function Items() {

  const [items, setItems] = useState([]);

  const [itemName, setItemName] = useState("");
  const [Specification, setSpecification] = useState("");
  const [UnitMeasure, setUnitMeasure] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [UnityPrice, setUnityPrice] = useState("");
  const [TotalQuantity, setTotalQuantity] = useState("");

  const [message, setMessage] = useState("");



  // ================= LOAD ITEMS =================

  useEffect(() => {

    LoadItems();

  }, []);




  const LoadItems = () => {

    axios.get("http://localhost:5000/items")

    .then((res) => {

      setItems(res.data);

    });

  };




  // ================= ADD ITEM =================

  const AddItem = () => {

    axios.post(

      "http://localhost:5000/add_item",

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

      LoadItems();

      setItemName("");
      setSpecification("");
      setUnitMeasure("");
      setQuantity("");
      setUnityPrice("");
      setTotalQuantity("");

    });

  };




  // ================= DELETE ITEM =================

  const DeleteItem = (id) => {

    axios.delete(`http://localhost:5000/delete_item/${id}`)

    .then((res) => {

      setMessage(res.data.message);

      LoadItems();

    });

  };




  return (

    <div className="p-5">

      {/* ================= FORM ================= */}

      <div className="bg-white p-5 rounded shadow">

        <h1 className="text-2xl mb-5">
          Add Item
        </h1>



        <div className="grid grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="border p-2 rounded"
          />



          <input
            type="text"
            placeholder="Specification"
            value={Specification}
            onChange={(e) => setSpecification(e.target.value)}
            className="border p-2 rounded"
          />



          <input
            type="text"
            placeholder="Unit Measure"
            value={UnitMeasure}
            onChange={(e) => setUnitMeasure(e.target.value)}
            className="border p-2 rounded"
          />



          <input
            type="number"
            placeholder="Quantity"
            value={Quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border p-2 rounded"
          />



          <input
            type="number"
            placeholder="Unity Price"
            value={UnityPrice}
            onChange={(e) => setUnityPrice(e.target.value)}
            className="border p-2 rounded"
          />



          <input
            type="number"
            placeholder="Total Quantity"
            value={TotalQuantity}
            onChange={(e) => setTotalQuantity(e.target.value)}
            className="border p-2 rounded"
          />

        </div>



        <button
          onClick={AddItem}
          className="bg-blue-500 text-white px-5 py-2 rounded mt-5"
        >
          Add Item
        </button>



        <h3 className="text-green-500 mt-4">
          {message}
        </h3>

      </div>




      {/* ================= TABLE ================= */}

      <div className="bg-white p-5 rounded shadow mt-8">

        <table className="w-full border">

          <thead>

            <tr className="bg-gray-200">

              <th className="border p-2">ID</th>
              <th className="border p-2">Item</th>
              <th className="border p-2">Specification</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Action</th>

            </tr>

          </thead>



          <tbody>

            {
              items.map((item) => (

                <tr key={item.item_id}>

                  <td className="border p-2">
                    {item.item_id}
                  </td>

                  <td className="border p-2">
                    {item.itemName}
                  </td>

                  <td className="border p-2">
                    {item.Specification}
                  </td>

                  <td className="border p-2">
                    {item.Quantity}
                  </td>

                  <td className="border p-2">
                    {item.UnityPrice}
                  </td>

                  <td className="border p-2">

                    <Link
                      to={`/update/${item.item_id}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </Link>



                    <button
                      onClick={() => DeleteItem(item.item_id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Items;