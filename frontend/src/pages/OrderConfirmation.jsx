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

        <div className="flex justify-center gap-4 pt-4 flex-wrap">
          <Link
            to="/"
            className="bg-[#A37B73] hover:bg-[#8e635e] text-white px-6 py-2 rounded-md transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderConfirmation;
