import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import "./assets/styles/reset.css";
import Register from "./pages/Register";
import Header from "./components/Header";
import Nav from "./components/Nav";
import React, {useEffect, useState} from "react";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import {authenticateUser} from "./utils/api";

function App() {

    const [isLoggined, setIsLoggined] = useState(false);

    useEffect(() => {
        // 앱 로드 시 로그인 상태 확인
        authenticateUser()
            .then(res => {
                console.log(res.data);
                setIsLoggined(true);
            })
            .catch(() => {
                setIsLoggined(false);
            })
    }, []);
  return (
      <>

          <Header isLoggined={isLoggined} setIsLoggined={setIsLoggined} />
          <Nav/>

          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login setIsLoggined={setIsLoggined} />} />
          </Routes>

          <Footer/>
      </>
  );
}

export default App;
