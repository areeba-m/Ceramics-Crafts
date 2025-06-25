import React from "react";
import { Carousel } from "antd";
import { motion } from "framer-motion";

// Clay product images with titles
const images = [
  {
    id: 1,
    url: "https://imgs.search.brave.com/aBc8LjoDuKh-ofFHfAqIVYmv0MAtwzRJlS-RSZgtCqs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzcxLzhi/LzMxLzcxOGIzMWFk/MjFjMDU1OGI4NzBi/YmE1NjI0ZjA5NTZh/LmpwZw",
    title: "Elegant Clay Vase",
  },
  {
    id: 2,
    url: "https://imgs.search.brave.com/72RA6ezUExgpeBsR9Ug2-kTZ2bQbtvYfdvkUDrZyeiE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMy8w/NS8zMC8xNy8zOS9j/bGF5LXBvdC04MDI5/Mjc2XzY0MC5qcGc",
    title: "Rustic Clay Pot Set",
  },
  {
    id: 3,
    url: "https://imgs.search.brave.com/c_Gd74Lz7G5CIdah--QF6Hnfy4LtPy9lItwJxFv_q94/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzE2Lzc0LzY2/LzM2MF9GXzUxNjc0/NjY3NF9nelVLOWpY/QUd6ZGRDMVZuMzQ2/elI5a1VuWVBpVDdL/eS5qcGc",
    title: "Handcrafted Wall Art",
  },
  {
    id: 4,
    url: "https://imgs.search.brave.com/OF9sw4fIEW6JGwj03wUBi-Er8tXTR9S0u0qGQhOgvzE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dGhld2lyZWN1dHRl/ci5jb20vd3AtY29u/dGVudC9tZWRpYS8y/MDI0LzA5L2JlZHNp/ZGVsYW1wcy0yMDQ4/cHgtMDQ2NjkuanBn/P2F1dG89d2VicCZx/dWFsaXR5PTc1Jndp/ZHRoPTEwMjQ",
    title: "Clay Lamp for Living Room",
  },
];

// Animation variants
const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  },
  exit: { opacity: 0, scale: 0.95 }
};

const titleVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const HeroCarousel = () => (
  <motion.div 
    className="w-full mx-auto px-10 py-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <Carousel autoplay effect="fade" className="rounded-2xl overflow-hidden">
      {images.map((item) => (
        <div key={item.id} className="relative">
          <motion.img
            src={item.url}
            alt={item.title}
            className="w-full h-[90vh] object-cover"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={imageVariants}
          />
          <motion.div 
            className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center py-4"
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            <h2 className="text-2xl md:text-4xl font-semibold">{item.title}</h2>
          </motion.div>
        </div>
      ))}
    </Carousel>
  </motion.div>
);

export default HeroCarousel;