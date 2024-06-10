import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Reviews from "./pages/Reviews";
import ProductViewPage from "./pages/ProductViewPage";
import MyAccount from "./pages/MyAccount";
import Wishlist from "./pages/Wishlist";
import MyOrders from "./pages/MyOrders";
import MyAddress from "./pages/MyAddress";
import SignUp from "./pages/SignUp";
import OrderBooking from "./pages/OrderBooking";
import ResultPage from "./pages/ResultPage";
import CategoryResult from "./pages/CategoryResult";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import ForgetPassword from "./components/ForgetPassword";
import Test from "./components/Test";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/home/:custId" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Reviews" element={<Reviews />} />
          <Route path="/Productpage/:prodId" element={<ProductViewPage />} />
          <Route path="/MyAccount" element={<MyAccount />} />
          <Route path="/Address" element={<MyAddress/>} />
          <Route path="/Order" element={<MyOrders/>} />
          <Route path="/Wishlist" element={<Wishlist/>} />
          <Route path="/" element={<SignUp/>}/>
          <Route path="/booking" element={<OrderBooking/>}/>
          <Route path='/result' element={<ResultPage/>}/>
          <Route path="/categoryResult/:category/:subCategory" element={<CategoryResult/>}/>
          <Route path="/success" element={<Success/>}/>
          <Route path="/cancel" element={<Cancel/>}/>
          <Route path='/FGP' element={<ForgetPassword/>}/>   
          <Route path="test" element={<Test/>}/>    
           </Routes>
      </Router>
    </>
  );
}

export default App;
