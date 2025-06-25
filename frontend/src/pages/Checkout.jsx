import { motion } from "framer-motion";
import { Link, Links } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Checkout = () => {
  return (
    <>
      {/* Top Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2 ml-2 mb-6 sm:mb-10 px-4 sm:px-6 lg:px-0"
      >
        <Link to="/cart" className="hidden sm:block">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-[#A37B73] hover:text-white bg-[#FFF7ED] border border-[#f5d7c4] hover:bg-[#A37B73] transition-colors px-4 py-2 rounded-full shadow-sm"
          >
            <ArrowLeftOutlined />
            <span className="font-medium">Cart</span>
          </motion.div>
        </Link>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-2 gap-10"
      >
        {/* Shipping Form */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-[#A37B73]">Shipping Information</h2>
          <form className="space-y-4">
            {["Full Name", "Address", "City", "Postal Code", "Phone Number"].map((placeholder, i) => (
              <input
                key={i}
                type="text"
                placeholder={placeholder}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A37B73] text-sm sm:text-base"
              />
            ))}

            <Link
            to="/order-confirmation"
              type="button"
              className="w-full mt-4 px-4 bg-[#A37B73] text-white py-2 rounded-md hover:bg-[#8e635e] transition text-sm sm:text-base"
            >
              Place Order
            </Link>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-[#A37B73]">Order Summary</h2>
          <div className="space-y-4">
            {[
              { name: "Sample Product", qty: 2, price: 39.98 },
              { name: "Another Product", qty: 1, price: 24.99 },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between border-b pb-2">
                <div>
                  <p className="font-medium text-sm sm:text-base">{item.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500">Qty: {item.qty}</p>
                </div>
                <p className="font-semibold text-sm sm:text-base">${item.price.toFixed(2)}</p>
              </div>
            ))}

            <div className="flex justify-between pt-4 border-t mt-4 text-base sm:text-lg font-semibold">
              <p>Total</p>
              <p>$64.97</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Checkout;
