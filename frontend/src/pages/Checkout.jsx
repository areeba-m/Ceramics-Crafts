import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const Checkout = () => {
  const { cartItems, clearCart, cartTotal } = useCart();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      
      // Prepare order data in the required format
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity
        })),
        userId: parseInt(localStorage.getItem("userId")),
        name: values.fullName,
        address: values.address,
        city: values.city,
        phoneNumber: values.phoneNumber
      };

      const response = await axios.post(
        `${import.meta.env.VITE_ORDERS_URL}/api/orders/placeOrder`,
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      if (response.status === 200) {
        toast.success("Order placed successfully!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        clearCart();
        navigate("/order-confirmation");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      console.error("Order placement error:", error.response?.data?.data);
      toast.error(error.response?.data?.message || "Failed to place order", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

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
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-[#A37B73]">
            Shipping Information
          </h2>
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            className="space-y-4"
          >
            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[
                { required: true, message: "Please enter your full name" }
              ]}
            >
              <Input placeholder="Full Name" />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              rules={[
                { required: true, message: "Please enter your address" }
              ]}
            >
              <Input.TextArea placeholder="Address" rows={3} />
            </Form.Item>

            <Form.Item
              name="city"
              label="City"
              rules={[
                { required: true, message: "Please enter your city" }
              ]}
            >
              <Input placeholder="City" />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter your phone number" }
              ]}
            >
              <Input placeholder="Phone Number" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full mt-4 px-4 bg-[#A37B73] text-white py-2 rounded-md hover:bg-[#8e635e] transition text-sm sm:text-base"
              >
                Place Order
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-[#A37B73]">
            Order Summary
          </h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.quantity}`}
                className="flex justify-between border-b pb-2"
              >
                <div>
                  <p className="font-medium text-sm sm:text-base">
                    {item.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-sm sm:text-base">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            <div className="flex justify-between pt-4 border-t mt-4 text-base sm:text-lg font-semibold">
              <p>Total</p>
              <p>${cartTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Checkout;