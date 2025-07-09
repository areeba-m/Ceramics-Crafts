import React, { useState } from "react";
import { Button, Form, Input, Slider, Radio, Checkbox, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const { TextArea } = Input;

const CustomizedProduct = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [selectedShape, setSelectedShape] = useState("vase");
  const [selectedColor, setSelectedColor] = useState("#D8BFAA");
  const [imageFile, setImageFile] = useState(null);

  const colorOptions = [
    { name: "Clay Beige", value: "#D8BFAA" },
    { name: "Warm Terracotta", value: "#A37B73" },
    { name: "Soft Sand", value: "#E4C7A0" },
    { name: "Muted Sage", value: "#8AA3A0" },
  ];

  const shapeOptions = [
    { value: "vase", label: "Vase" },
    { value: "bowl", label: "Bowl" },
    { value: "plate", label: "Plate" },
    { value: "sculpture", label: "Sculpture" },
  ];

  const textureOptions = ["Smooth", "Textured", "Patterned", "Hand-carved"];

  const handleFinish = async (values) => {
    setLoading(true);

    try {
      const formValues = form.getFieldsValue(true);
      const selectedColorObj = colorOptions.find((c) => c.value === selectedColor);

      const productData = {
        shape: selectedShape,
        color: selectedColorObj?.name || selectedColor,
        texture: formValues.texture || "Smooth",
        size: Number(formValues.size) || 8,
        specialFeature: Array.isArray(formValues.features) 
          ? formValues.features.join(", ") 
          : "",
        instruction: formValues.instructions || "No special instructions",
        email: formValues.email,
      };

      const formData = new FormData();
      formData.append(
        "product",
        new Blob([JSON.stringify(productData)], {
          type: "application/json",
        })
      );

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/products/customized`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.message === "Successfully added a product.") {
        toast.success("Your custom order has been placed!");
        setCurrentStep(4);
      }
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error(error.response?.data?.message || "Failed to submit order");
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        toast.error("You can only upload image files!");
        return false;
      }
      setImageFile(file);
      return false;
    },
    showUploadList: false,
    accept: "image/*",
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-[#5F5F5F]">
              Choose Your Design
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {shapeOptions.map((shape) => (
                <motion.div
                  key={shape.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer text-center transition-all ${
                      selectedShape === shape.value
                        ? "border-[#A37B73] bg-[#F7E7CE]"
                        : "border-gray-200 hover:border-[#D5A496]"
                    }`}
                    onClick={() => setSelectedShape(shape.value)}
                  >
                    <div
                      className="h-24 w-full mb-2"
                      style={{
                        backgroundColor: selectedColor,
                        borderRadius: shape.value === "plate" ? "50%" : "4px",
                      }}
                    />
                    <span className="font-medium">{shape.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Select Color</h3>
              <div className="flex flex-wrap gap-4">
                {colorOptions.map((color) => (
                  <motion.div
                    key={color.value}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div
                      className={`w-12 h-12 rounded-full cursor-pointer border-2 ${
                        selectedColor === color.value
                          ? "border-[#A37B73] ring-2 ring-offset-2 ring-[#A37B73]"
                          : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedColor(color.value)}
                      title={color.name}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="primary"
                onClick={nextStep}
                className="bg-[#A37B73] hover:bg-[#8A6D5B]"
              >
                Next: Add Details
              </Button>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-[#5F5F5F]">
              Customize Details
            </h2>

            <Form 
              form={form} 
              layout="vertical" 
              className="max-w-2xl mx-auto"
              initialValues={{
                texture: "Smooth", // Default value for texture
                features: [], // Default empty array for features
                size: 8 // Default size
              }}
            >
              <Form.Item
                label="Size (inches)"
                name="size"
                rules={[
                  { required: true, message: "Please select size!" },
                  {
                    type: "number",
                    min: 1,
                    message: "Size must be at least 1",
                  },
                ]}
              >
                <Slider
                  min={4}
                  max={20}
                  marks={{ 4: '4"', 12: '12"', 20: '20"' }}
                />
              </Form.Item>

              <Form.Item
                label="Texture"
                name="texture"
                rules={[{ required: true, message: "Please select texture!" }]}
              >
                <Radio.Group>
                  <div className="grid grid-cols-2 gap-4">
                    {textureOptions.map((texture) => (
                      <Radio key={texture} value={texture}>
                        {texture}
                      </Radio>
                    ))}
                  </div>
                </Radio.Group>
              </Form.Item>

              <Form.Item 
                label="Special Features" 
                name="features"
              >
                <Checkbox.Group>
                  <div className="grid grid-cols-2 gap-4">
                    <Checkbox value="glossy">Glossy Finish</Checkbox>
                    <Checkbox value="handles">Handles</Checkbox>
                    <Checkbox value="lid">With Lid</Checkbox>
                    <Checkbox value="personalized">Personalized Text</Checkbox>
                  </div>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item
                label="Reference Image (Optional)"
                name="referenceImage"
                extra="Upload an image for inspiration"
              >
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />}>
                    {imageFile ? imageFile.name : "Click to Upload"}
                  </Button>
                </Upload>
                {imageFile && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4"
                  >
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Reference preview"
                      className="max-h-40 rounded border border-gray-200"
                    />
                  </motion.div>
                )}
              </Form.Item>

              <div className="flex justify-between mt-8">
                <Button onClick={prevStep}>Back</Button>
                <Button
                  type="primary"
                  onClick={nextStep}
                  className="bg-[#A37B73] hover:bg-[#8A6D5B]"
                >
                  Next: Review Order
                </Button>
              </div>
            </Form>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-[#5F5F5F]">
              Review Your Order
            </h2>

            <div className="bg-[#F7E7CE] p-6 rounded-lg mb-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium mb-4">Product Preview</h3>
                  <div className="w-full h-64 flex items-center justify-center rounded border border-[#D8BFAA]">
                    <div
                      className="w-32 h-48 transition-all"
                      style={{
                        backgroundColor: selectedColor,
                        borderRadius: selectedShape === "plate" ? "50%" : "8px",
                        transform:
                          selectedShape === "bowl" ? "scale(1.2)" : "scale(1)",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-4">Order Details</h3>
                  <div className="space-y-3">
                    <p>
                      <span className="font-semibold">Shape:</span>{" "}
                      {shapeOptions.find((s) => s.value === selectedShape)?.label}
                    </p>
                    <p>
                      <span className="font-semibold">Color:</span>{" "}
                      {colorOptions.find((c) => c.value === selectedColor)?.name}
                    </p>
                    <p>
                      <span className="font-semibold">Size:</span>{" "}
                      {form.getFieldValue("size")} inches
                    </p>
                    <p>
                      <span className="font-semibold">Texture:</span>{" "}
                      {form.getFieldValue("texture")}
                    </p>
                    {form.getFieldValue("features")?.length > 0 && (
                      <p>
                        <span className="font-semibold">Features:</span>{" "}
                        {form.getFieldValue("features").join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Form form={form} onFinish={handleFinish} layout="vertical">
              <Form.Item
                label="Special Instructions"
                name="instructions"
                rules={[{ max: 500, message: "Maximum 500 characters" }]}
              >
                <TextArea
                  rows={4}
                  placeholder="Any special notes for our artisans..."
                />
              </Form.Item>

              <Form.Item
                label="Your Contact Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input type="email" />
              </Form.Item>

              <div className="flex justify-between">
                <Button onClick={prevStep}>Back</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-[#A37B73] hover:bg-[#8A6D5B]"
                  loading={loading}
                >
                  Place Order
                </Button>
              </div>
            </Form>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 1.5 }}
            >
              <svg
                className="w-24 h-24 mx-auto text-[#A37B73] mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <h2 className="text-3xl font-bold text-[#A37B73] mb-4">
              Order Confirmed!
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your custom order. Our artisans will begin working
              on your{" "}
              {selectedShape &&
                shapeOptions.find((s) => s.value === selectedShape)?.label}{" "}
              shortly.
            </p>
            <Button
              type="primary"
              onClick={() => {
                setCurrentStep(1);
                form.resetFields();
                setImageFile(null);
              }}
              className="bg-[#A37B73] hover:bg-[#8A6D5B]"
            >
              Create Another Design
            </Button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-10 py-8 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[#A37B73] font-extrabold text-3xl md:text-5xl text-center mb-8 md:mb-16"
      >
        Customize Your Product
      </motion.h1>

      {currentStep < 4 && (
        <div className="w-full max-w-4xl mx-auto mb-8">
          <div className="flex items-center">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= step
                      ? "bg-[#A37B73] text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      currentStep > step ? "bg-[#A37B73]" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Design</span>
            <span>Details</span>
            <span>Review</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default CustomizedProduct;