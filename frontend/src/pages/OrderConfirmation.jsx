import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";

const OrderConfirmation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-[#FFF7ED] px-4"
    >
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg text-center space-y-6">
        <CheckCircleOutlined className="text-[#A37B73] text-5xl" />
        <h1 className="text-3xl font-bold text-[#A37B73]">Thank You!</h1>
        <p className="text-gray-600 text-lg">
          Your order has been placed successfully.
        </p>

        {/* Order Summary */}
        <div className="bg-gray-50 border p-4 rounded-md text-left space-y-2">
          <h2 className="font-semibold text-[#A37B73]">Order Summary</h2>
          <div className="flex justify-between text-sm text-gray-700">
            <p>Order ID:</p>
            <p>#123456</p>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <p>Total Amount:</p>
            <p>$64.97</p>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <p>Shipping To:</p>
            <p>John Doe, 123 Street, City</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 pt-4 flex-wrap">
          <Link
            to="/"
            className="bg-[#A37B73] hover:bg-[#8e635e] text-white px-6 py-2 rounded-md transition"
          >
            Back to Home
          </Link>
          {/* <Link
            to="/orders"
            className="border border-[#A37B73] text-[#A37B73] hover:bg-[#A37B73] hover:text-white px-6 py-2 rounded-md transition"
          >
            View Orders
          </Link> */}
        </div>
      </div>
    </motion.div>
  );
};

export default OrderConfirmation;
