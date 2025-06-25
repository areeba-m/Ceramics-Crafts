import React from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Cart = () => {
  const dummyCartItems = [
    {
      id: "1",
      name: "Stylish Ring",
      image: "https://via.placeholder.com/100",
      price: 50,
      color: "Gold",
      size: "M",
      engravingText: "Love U 💍",
    },
    {
      id: "2",
      name: "Elegant Necklace",
      image: "https://via.placeholder.com/100",
      price: 80,
      color: "Silver",
      size: "L",
      engravingText: "",
    },
  ];
  const navigate = useNavigate();

  if (dummyCartItems.length > 0) {
    navigate("/checkout");
  } else {
    alert("Your cart is empty.");
  }

  const totalPrice = dummyCartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-5xl mx-auto px-4 py-10"
    >
      {/* Home Button */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-10"
      >
        {/* Back to Home Button - only visible on lg and up */}
        <Link to="/" className="hidden lg:block">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-[#A37B73] hover:text-white bg-[#FFF7ED] border border-[#f5d7c4] hover:bg-[#A37B73] transition-colors px-4 py-2 rounded-full shadow-sm"
          >
            <ArrowLeftOutlined />
            <span className="font-medium">Home</span>
          </motion.div>
        </Link>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#A37B73] text-center lg:text-right w-full">
          Cart
        </h1>
      </motion.div>

      {dummyCartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center text-gray-500"
        >
          Your cart is empty.
        </motion.div>
      ) : (
        <>
          <div className="space-y-6">
            {dummyCartItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="flex flex-col sm:flex-row items-center bg-[#FFF7ED] p-4 rounded-lg shadow-sm border border-[#f5d7c4]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md mr-4"
                />
                <div className="flex-1 w-full sm:w-auto">
                  <h2 className="text-lg font-semibold text-[#A37B73]">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-600">Color: {item.color}</p>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  {item.engravingText && (
                    <p className="text-sm text-gray-600 italic">
                      Engraving: “{item.engravingText}”
                    </p>
                  )}
                </div>
                <div className="mt-4 sm:mt-0 text-right">
                  <div className="text-xl font-semibold text-[#A37B73]">
                    ${item.price.toFixed(2)}
                  </div>
                  <Button danger size="small" className="mt-2">
                    Remove
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Total & Checkout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <h3 className="text-2xl font-bold text-[#A37B73]">
              Total: ${totalPrice.toFixed(2)}
            </h3>
            <div className="flex gap-4">
              <Button danger>Clear Cart</Button>
              <Link
                to="/checkout"
                className="inline-block bg-amber-600 border border-amber-600 text-white px-1 py-1 rounded-md hover:bg-amber-700 hover:border-amber-700 transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default Cart;
