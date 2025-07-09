import React, { useState } from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import logo from "../assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Products", id: "products" },
    { name: "Wall Hangings", id: "wall-hangings" },
    { name: "Custom Pieces", id: "custom" },
  ];

  const additionalLinks = [
    { name: "Profile", path: "/profile" },
    { name: "Cart", path: "/cart" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const mobileMenuVariants = {
    hidden: { y: -20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
      },
    },
    exit: { y: -20, opacity: 0 },
  };

  return (
    <motion.div
      className="fixed w-full top-5 px-4 sm:px-9 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <motion.div
        className="bg-[#E6E1DB] rounded-3xl w-full px-6 py-1 sm:px-10 flex items-center justify-between"
        whileHover={{ scale: 1.01 }}
      >
        <ScrollLink
          to="home"
          smooth={true}
          duration={500}
          offset={-100}
          className="cursor-pointer"
        >
          <motion.img
            width={96}
            height={80}
            src={logo}
            alt="Logo"
            className="w-16 sm:w-24"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
        </ScrollLink>

        {/* Desktop Navigation */}
        <motion.div className="hidden md:block">
          <motion.ul
            className="flex items-center gap-4 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {navItems.map((item, index) => (
              <motion.li key={index} variants={itemVariants}>
                <ScrollLink
                  to={item.id}
                  smooth={true}
                  duration={500}
                  offset={-100}
                  className="text-sm sm:text-[14px] cursor-pointer text-[#A37B73] hover:text-[#D5A496] font-semibold transition-colors"
                  activeClass="text-[#D5A496]"
                >
                  {item.name}
                </ScrollLink>
              </motion.li>
            ))}
            <motion.li variants={itemVariants}>
              <Link
                to="/profile"
                className="text-sm sm:text-[14px] cursor-pointer text-[#A37B73] hover:text-[#D5A496] font-semibold transition-colors"
                activeClass="text-[#D5A496]"
              >
                Profile
              </Link>
            </motion.li>
            <motion.li variants={itemVariants}>
              <Link
                to="/cart"
                className="text-sm sm:text-[14px] cursor-pointer text-[#A37B73] hover:text-[#D5A496] font-semibold transition-colors"
                activeClass="text-[#D5A496]"
              >
                Cart
              </Link>
            </motion.li>
          </motion.ul>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-[#A37B73] p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </motion.button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-[#E6E1DB] rounded-b-2xl mt-1 px-6 py-4 shadow-lg"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <motion.ul
              className="flex flex-col gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {navItems.map((item, index) => (
                <motion.li key={index} variants={itemVariants}>
                  <ScrollLink
                    to={item.id}
                    smooth={true}
                    duration={500}
                    offset={-100}
                    className="block text-[#A37B73] hover:text-[#D5A496] font-semibold py-2 border-b border-[#D5A496] last:border-0 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </ScrollLink>
                </motion.li>
              ))}
              {additionalLinks.map((link, index) => (
                <motion.li key={`additional-${index}`} variants={itemVariants}>
                  <Link
                    to={link.path}
                    className="block text-[#A37B73] hover:text-[#D5A496] font-semibold py-2 border-b border-[#D5A496] last:border-0 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NavBar;