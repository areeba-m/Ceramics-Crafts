import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import CeramicAuthPage from "./pages/CeramicAuthPage";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Checkout from "./pages/CheckOut";
import OrderConfirmation from "./pages/OrderConfirmation";
import Profile from "./pages/Profile";

const App = () => {
  const locomotiveScroll = new LocomotiveScroll();
  const location = useLocation()

  const hideFooterRoutes = ["/", "/profile"]
  return (
    <>
      <Routes>
        <Route path="/login" element={<CeramicAuthPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product-detail/:id" element={<ProductDetail/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
      {!hideFooterRoutes.includes(location.pathname) &&  <Footer />}
 
    </>
  );
};

export default App;
