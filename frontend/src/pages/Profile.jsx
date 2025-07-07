import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button, Spin, Alert } from "antd";
import { useUser } from "../context/UserContext";
import { MailOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";

const ProfileDetails = () => {
  const { user, loading, error, logout } = useUser();

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
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#FFF7ED] flex items-center justify-center"
      >
        <Spin size="large" tip="Loading your profile..." />
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#FFF7ED] flex items-center justify-center px-4"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="max-w-md w-full"
        >
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            action={
              <Button
                size="small"
                onClick={() => window.location.reload()}
                className="mt-2"
              >
                Try Again
              </Button>
            }
          />
        </motion.div>
      </motion.div>
    );
  }

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#FFF7ED] flex items-center justify-center px-4"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center"
        >
          <p className="text-lg mb-4">You need to login to view this page</p>
          <Link to="/login">
            <Button
              type="primary"
              className="bg-[#A37B73] hover:bg-[#D5A496] border-none"
            >
              Go to Login
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FFF7ED] py-12 px-4 sm:px-6 flex items-center justify-center"
    >
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#A37B73] p-6 text-center"
          >
            <motion.div
              className="w-20 h-20 mx-auto rounded-full bg-white flex items-center justify-center mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <UserOutlined className="text-3xl text-[#A37B73]" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white">{user.fullName}</h2>
            <p className="text-[#f5e6e3]">{user.email}</p>
          </motion.div>

          {/* Profile Details */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="p-6 space-y-6"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-start">
                <div className="bg-[#f5e6e3] p-2 rounded-full mr-4">
                  <UserOutlined className="text-[#A37B73]" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Full Name</p>
                  <p className="font-medium text-gray-900">{user.fullName}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#f5e6e3] p-2 rounded-full mr-4">
                  <MailOutlined className="text-[#A37B73]" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email Address</p>
                  <p className="font-medium text-gray-900">{user.email}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 pt-4"
            >
              <Link to="/" className="flex-1">
                <Button
                  block
                  className="border-[#A37B73] text-[#A37B73] hover:bg-[#fef2f0] hover:border-[#D5A496]"
                >
                  Back to Home
                </Button>
              </Link>
              <Button
                onClick={logout}
                danger
                block
                className="flex-1 hover:bg-red-500 hover:border-red-500"
              >
                Logout
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileDetails;