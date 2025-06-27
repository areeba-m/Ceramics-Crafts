//React & Routing
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

//Libraries
import LocomotiveScroll from "locomotive-scroll";
import { ToastContainer } from "react-toastify";

//Pages
import Home from "./pages/Home";
import CeramicAuthPage from "./pages/CeramicAuthPage";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/CheckOut";
import OrderConfirmation from "./pages/OrderConfirmation";
import Profile from "./pages/Profile";
import NotFound from "./pages/Notfound";

//Protected Routes
import ProtectedWrapper from "./ProtectedWrapper/ProtectedWrapper";

//Shared Components
import Footer from "./components/Footer";


const App = () => {
  const locomotiveScroll = new LocomotiveScroll();
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/login" element={<CeramicAuthPage />} />
        <Route
          path="/"
          element={
            <ProtectedWrapper>
              <Home />
            </ProtectedWrapper>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedWrapper>
              <Profile />
            </ProtectedWrapper>
          }
        />
        <Route
          path="/product-detail/:id"
          element={
            <ProtectedWrapper>
              <ProductDetail />
            </ProtectedWrapper>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedWrapper>
              <Cart />
            </ProtectedWrapper>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedWrapper>
              <Checkout />
            </ProtectedWrapper>
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <ProtectedWrapper>
              <OrderConfirmation />
            </ProtectedWrapper>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition="Bounce"
      />
       {location.pathname === "/" && <Footer />}
    </>
  );
};

export default App;
