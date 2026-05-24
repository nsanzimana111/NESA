import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Items() {

  const navigate = useNavigate();

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

    axios.post("http://localhost:5000/add_item", {
      itemName,
      Specification,
      UnitMeasure,
      Quantity,
      UnityPrice,
      TotalQuantity
    })

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



  // ================= LOGOUT =================

  const Logout = () => {

    axios.get("http://localhost:5000/logout", {
      withCredentials: true
    })

      .then((res) => {

        alert(res.data.message);
        navigate("/");

      });

  };



  return (

    <div className="bg-gray-100 min-h-screen">



      {/* ================= NAVBAR ================= */}

      <div className="bg-blue-600 text-white p-4 flex items-center relative">



        {/* LEFT LOGO */}
        <h1 className="text-2xl font-bold">
          SRMS
        </h1>



        {/* CENTER MENU */}
        <div className="absolute left-1/2 transform -translate-x-1/2">

          <ul className="flex gap-4">

            <Link to="/dashboard">
              <li className="px-4 py-2 bg-blue-500 rounded-lg cursor-pointer">
                Dashboard
              </li>
            </Link>

            <Link to="/items">
              <li className="px-4 py-2 bg-green-500 rounded-lg cursor-pointer">
                Items
              </li>
            </Link>

            <li className="px-4 py-2 bg-yellow-500 rounded-lg cursor-pointer">
              #
            </li>

            <li className="px-4 py-2 bg-lime-400 rounded-lg cursor-pointer">
              #
            </li>

            <li className="px-4 py-2 bg-red-500 rounded-lg cursor-pointer">
              #
            </li>

          </ul>

        </div>



        {/* RIGHT LOGOUT */}
        <div className="ml-auto">

          <button
            onClick={Logout}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Logout
          </button>

        </div>

      </div>



      {/* ================= CONTENT ================= */}

      <div className="p-5">

        <h1 className="text-3xl mb-5">
          Items Page
        </h1>



        {/* FORM */}
        <div className="bg-white p-6 rounded shadow">

          <div className="grid grid-cols-3 gap-4">

            <input className="border p-2 rounded"
              placeholder="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />

            <input className="border p-2 rounded"
              placeholder="Specification"
              value={Specification}
              onChange={(e) => setSpecification(e.target.value)}
            />

            <input className="border p-2 rounded"
              placeholder="Unit Measure"
              value={UnitMeasure}
              onChange={(e) => setUnitMeasure(e.target.value)}
            />

            <input className="border p-2 rounded"
              placeholder="Quantity"
              value={Quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <input className="border p-2 rounded"
              placeholder="Price"
              value={UnityPrice}
              onChange={(e) => setUnityPrice(e.target.value)}
            />

            <input className="border p-2 rounded"
              placeholder="Total"
              value={TotalQuantity}
              onChange={(e) => setTotalQuantity(e.target.value)}
            />

          </div>



          <button
            onClick={AddItem}
            className="bg-blue-600 text-white px-5 py-2 rounded mt-4"
          >
            Add Item
          </button>



          <p className="text-green-600 mt-3">
            {message}
          </p>

        </div>



        {/* TABLE */}
        <div className="bg-white p-6 rounded shadow mt-6">

          <table className="w-full">

            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">ID</th>
                <th className="p-2">Item</th>
                <th className="p-2">Spec</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Price</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>

            <tbody>

              {items.map((item) => (

                <tr key={item.item_id} className="text-center">

                  <td className="p-2">{item.item_id}</td>
                  <td className="p-2">{item.itemName}</td>
                  <td className="p-2">{item.Specification}</td>
                  <td className="p-2">{item.Quantity}</td>
                  <td className="p-2">{item.UnityPrice}</td>

                  <td className="p-2">

                    <button className="bg-yellow-500 px-3 py-1 rounded text-white mr-2">
                      Edit
                    </button>

                    <button
                      onClick={() => DeleteItem(item.item_id)}
                      className="bg-red-500 px-3 py-1 rounded text-white"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default Items;