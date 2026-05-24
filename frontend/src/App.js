import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Update from "./pages/Update";
import Items from "./pages/Items";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/item" element={<Items />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;