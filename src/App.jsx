import { useState } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Editor_page from "./Components/Editor_page.jsx";
import LandingPage from "./Components/landing.jsx";
import Login from "./Components/login.jsx";
import Register from "./Components/register.jsx";
import { Toaster } from "react-hot-toast";
import { MyContext } from "./Components/context/context.jsx";

function App() {

  return (
    <>
      <MyContext>
        <div className="bg-gray-900 h-full">
          <div>
            <Toaster position="top-right"></Toaster>
          </div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/editor/:roomId" element={<Editor_page />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
        </MyContext>
    </>
  );
}

export default App;
