import React from "react";
import { Button, InputNumber } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } =
    useCart();
  const navigate = useNavigate();

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

      {cartItems.length === 0 ? (
        <motion.div className="text-center py-10">
          <p className="text-lg text-gray-500 mb-4">Your cart is empty</p>
          <Link to="/" className="text-[#A37B73] hover:underline">
            Continue Shopping
          </Link>
        </motion.div>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <motion.div
                key={`${item.id}-${item.color}-${item.size}`}
                className="flex flex-col sm:flex-row items-center bg-[#FFF7ED] p-4 rounded-lg shadow-sm border border-[#f5d7c4]"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md mr-4"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-[#A37B73]">
                    {item.name}
                  </h2>
                  {item.material && <p>Material: {item.material}</p>}
                  {item.size && <p>Size: {item.size}</p>}
                </div>
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) => {
                      if (value < 1) {
                        updateQuantity(item.id, 1); // Prevent 0 or below
                      } else {
                        updateQuantity(item.id, value); // ✅ Allow increment
                      }
                    }}
                  />
                  <div className="text-right min-w-[100px]">
                    <div className="text-xl font-semibold text-[#A37B73]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <Button
                      danger
                      size="small"
                      onClick={() =>
                        removeFromCart(item.id, item.color, item.size)
                      }
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Total & Checkout - keep your existing code but use real values */}
          <div className="mt-10">
            <div className=" text-xl font-bold mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center gap-3">
                  <span>Subtotal:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>

                <div className="mt-4 text-right">
                  <Button danger onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block w-full text-center bg-[#A37B73] text-white py-2 rounded hover:bg-[#8e635e] transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Cart;
