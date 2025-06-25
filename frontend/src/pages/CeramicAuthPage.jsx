import React, { useState, useEffect } from "react";
import { Form, Input, Button, Divider, Tabs, message } from "antd";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import ceramicImage from "../assets/CeramicCraft.png"; // Replace with your image path
import { useNavigate } from "react-router-dom";
import axios from "axios";
const { TabPane } = Tabs;

const CeramicAuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [isMobile, setIsMobile] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onSubmit = async (data) => {
    if (activeTab === "signup") {
      // Handle signup logic
      console.log("Signup data:", data);
      message.success("Account created successfully!");
    } else {
      // Handle login logic
      setLoginError(null);
      const User = {
        email: data.email,
        password: data.password,
      };
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/user/login`,
          User,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log(response);

        if (response.status === 201) {
          localStorage.setItem("token", response?.data?.token);
          navigate("/");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            setLoginError("Invalid email or password combination");
          } else if (error.response.status === 404) {
            setLoginError("Account not found - please check your email");
          } else {
            setLoginError("Login failed - please try again");
          }
        } else {
          setLoginError("Network error - please check your connection");
        }
      }
      // console.log("Login data:", data);
      // message.success("Logged in successfully!");
    }
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    reset({
      name: "",
      email: "",
      phone: "",
      password: "",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-stone-100 p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={`w-full max-w-6xl flex ${
          isMobile ? "flex-col" : "flex-row"
        } bg-white rounded-2xl shadow-lg overflow-hidden`}
      >
        {/* Product Showcase Section */}
        {!isMobile && (
          <motion.div
            className="w-1/2 bg-amber-100 relative flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-amber-200/30 to-stone-100/30 z-10"></div>
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={ceramicImage}
                alt="CeramicCrafts Products"
                className="max-w-full max-h-full object-contain"
                style={{
                  filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))",
                  transform: "scale(0.9)",
                }}
              />
            </div>
            <motion.div
              className="absolute bottom-8 left-8 right-8 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className="text-stone-600">
                Discover our unique collection of artisanal clay wall hangings
                and décor pieces, each crafted with care and tradition.
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Auth Form Section */}
        <motion.div
          className={`${
            isMobile ? "w-full" : "w-1/2"
          } bg-white bg-opacity-80 backdrop-blur-sm p-8`}
          variants={itemVariants}
        >
          {/* Logo/Header */}
          <motion.div className="text-center py-4" variants={itemVariants}>
            <h1 className="text-3xl font-serif text-stone-800 font-medium">
              CeramicCrafts
            </h1>
            <p className="text-stone-500 mt-1">
              Handcrafted clay wall hangings & décor
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={itemVariants}>
            <Tabs
              activeKey={activeTab}
              onChange={handleTabChange}
              centered
              className="mb-6"
            >
              <TabPane tab="Login" key="login" />
              <TabPane tab="Sign Up" key="signup" />
            </Tabs>
          </motion.div>

          {loginError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center"
            >
              {loginError}
            </motion.div>
          )}

          {/* Form */}
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Name Field (Signup only) */}
                  {activeTab === "signup" && (
                    <Form.Item
                      label="Full Name"
                      validateStatus={errors.name ? "error" : ""}
                      help={errors.name?.message}
                      className="mb-4"
                      labelCol={{ span: 24 }}
                    >
                      <Controller
                        name="name"
                        control={control}
                        rules={{
                          required: "Name is required",
                          minLength: {
                            value: 3,
                            message: "Name must be at least 3 characters",
                          },
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            prefix={<UserOutlined className="text-stone-400" />}
                            placeholder="John Doe"
                            className="py-2 h-10 rounded-lg hover:border-amber-300 focus:border-amber-400"
                          />
                        )}
                      />
                    </Form.Item>
                  )}

                  {/* Email Field */}
                  <Form.Item
                    label="Email"
                    validateStatus={errors.email ? "error" : ""}
                    help={errors.email?.message}
                    className="mb-4"
                    labelCol={{ span: 24 }}
                  >
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          prefix={<MailOutlined className="text-stone-400" />}
                          placeholder="your@email.com"
                          className="py-2 h-10 rounded-lg hover:border-amber-300 focus:border-amber-400"
                        />
                      )}
                    />
                  </Form.Item>

                  {/* Phone Field (Signup only) */}
                  {activeTab === "signup" && (
                    <Form.Item
                      label="Phone Number"
                      validateStatus={errors.phone ? "error" : ""}
                      help={errors.phone?.message}
                      className="mb-4"
                      labelCol={{ span: 24 }}
                    >
                      <Controller
                        name="phone"
                        control={control}
                        rules={{
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]{10,15}$/,
                            message: "Invalid phone number",
                          },
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            prefix={
                              <PhoneOutlined className="text-stone-400" />
                            }
                            placeholder="1234567890"
                            className="py-2 h-10 rounded-lg hover:border-amber-300 focus:border-amber-400"
                          />
                        )}
                      />
                    </Form.Item>
                  )}

                  {/* Password Field */}
                  <Form.Item
                    label="Password"
                    validateStatus={errors.password ? "error" : ""}
                    help={errors.password?.message}
                    className="mb-4"
                    labelCol={{ span: 24 }}
                  >
                    <Controller
                      name="password"
                      control={control}
                      rules={{
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      }}
                      render={({ field }) => (
                        <Input.Password
                          {...field}
                          prefix={<LockOutlined className="text-stone-400" />}
                          placeholder="••••••••"
                          className="py-2 h-10 rounded-lg hover:border-amber-300 focus:border-amber-400"
                        />
                      )}
                    />
                  </Form.Item>
                </motion.div>
              </AnimatePresence>

              {activeTab === "login" && (
                <motion.div
                  className="flex justify-end mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <a
                    href="#"
                    className="text-sm text-amber-600 hover:text-amber-700"
                  >
                    Forgot password?
                  </a>
                </motion.div>
              )}

              <Form.Item>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    className="h-10 rounded-lg bg-amber-600 hover:bg-amber-700 border-none text-white font-medium"
                  >
                    {activeTab === "login" ? "Log In" : "Create Account"}
                  </Button>
                </motion.div>
              </Form.Item>
            </form>
          </motion.div>

          <motion.div
            className="text-center mt-6 text-stone-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {activeTab === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              onClick={() =>
                handleTabChange(activeTab === "login" ? "signup" : "login")
              }
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              {activeTab === "login" ? "Sign up" : "Log in"}
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CeramicAuthPage;
