import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import MyPokemonList from "./pages/Captures/MyPokemonList"; // Import halaman My Pokemon List

function AppRoutes() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:name" element={<Details />} />
          <Route path="/my-pokemon-list" element={<MyPokemonList />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRoutes;
