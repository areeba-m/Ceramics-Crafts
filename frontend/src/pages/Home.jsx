import React from "react";
import NavBar from "../components/NavBar";
import HeroCarousel from "../components/HeroCarousel";
import Products from "../components/Products";
import WallHanging from "../components/WallHanging";
import CustomizedProduct from "../components/CustomizedProduct";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="pt-28">
        <section id="home">
          <HeroCarousel />
        </section>
        <section id="products" className="py-20">
          <Products />
        </section>
        <section id="wall-hangings" className="py-20">
          <WallHanging />
        </section>
        <section id="custom" className="py-20">
          <CustomizedProduct />
        </section>
        
      </div>
    </div>
  );
};

export default Home;
