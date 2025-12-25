import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Card from "./components/Card";
import Productdetails from "./components/Productdetails";
import LoginUser from "./pages/LoginUser";
import RegisteUser from "./pages/RegisteUser";
import Footer from "./components/Footer";
import Protected from "./components/Protected";
import Notfound from "./components/Notfound";
import NewProduct from "./components/NewProduct";
import Admin from "./components/Admin";
import Home from "./components/Home";
import Forgetpassword from "./components/Forgetpassword";
import ResetPassword from "./components/ResetPassword";
const App = () => {
  const [cardItems, setCardItems] = useState([]);
  const [viewSlider, setViewSlider] = useState("");
  const [newPro, setNewPro] = useState("");
  const [authData, setAuthData] = useState(null);

  return (
    <Router>
      <Navbar
        cardItems={cardItems}
        viewSlider={viewSlider}
        setViewSlider={setViewSlider}
        setNewPro={setNewPro}
        authData={authData}
        setAuthData={setAuthData}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Home viewSlider={viewSlider} />
            </Protected>
          }
        />
        <Route
          path="/newproduct"
          element={
            <Protected role="admin">
              <NewProduct />
            </Protected>
          }
        />
        <Route
          path="/product/:id"
          element={
            <Productdetails cardItems={cardItems} setCardItems={setCardItems} />
          }
        />
        <Route
          path="/Card"
          element={
            <Card
              cardItems={cardItems}
              authData={authData}
              setCardItems={setCardItems}
            />
          }
        />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<RegisteUser />} />
        <Route path="/forgotpassword" element={<Forgetpassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
