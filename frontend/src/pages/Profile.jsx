import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "antd";

const ProfileDetails = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FFF7ED] flex items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-[#A37B73]">
          Profile Information
        </h2>

        <div className="space-y-4 text-sm sm:text-base">
          <div>
            <p className="text-gray-600">Name</p>
            <p className="font-semibold text-gray-900">Huzaifa Ahmed</p>
          </div>

          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-semibold text-gray-900">huzaifa@email.com</p>
          </div>

          <div>
            <p className="text-gray-600">Phone Number</p>
            <p className="font-semibold text-gray-900">+92 300 1234567</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
          <Link to="/" className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto border-[#A37B73] text-[#A37B73] hover:bg-[#fef2f0]"
            >
              Back to Home
            </Button>
          </Link>

          <Link to="/login" className="w-full sm:w-auto">
            <Button
              danger
              className="w-full sm:w-auto"
            >
              Logout
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileDetails;
