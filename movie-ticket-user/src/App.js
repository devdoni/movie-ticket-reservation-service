import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import "./assets/styles/reset.css";
import Register from "./pages/Register";
import Header from "./components/Header";
import Nav from "./components/Nav";
import React from "react";
import Footer from "./components/Footer";

function App() {
  return (
      <>

          <Header/>
          <Nav/>

          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
          </Routes>

          <Footer/>
      </>
  );
}

export default App;
