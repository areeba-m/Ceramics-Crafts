import React, { useState, useEffect } from "react";
import { Card, Row, Col, Slider, Checkbox, Select, Spin } from "antd";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchedProducts } from "../redux/reducers/productReducers";

const { Meta } = Card;
const { Option } = Select;

// Animation variants
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
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const filterVariants = {
  hidden: { x: -20, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Products = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchedProducts());
  }, [dispatch]);

  // Extract unique filter options from products
  const materials = [...new Set(products.map(p => p.material).filter(Boolean))];
  const sizes = [...new Set(products.map(p => p.size).filter(Boolean))];

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    return (
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      (selectedMaterials.length === 0 || selectedMaterials.includes(product.material)) &&
      (selectedSizes.length === 0 || selectedSizes.includes(product.size))
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Error loading products: {error}</p>
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-[#A37B73] font-extrabold text-3xl md:text-5xl text-center mb-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Our Products
      </motion.h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Section */}
        <motion.div
          className="w-full lg:w-1/4 p-6 rounded-lg shadow"
          style={{ backgroundColor: "#F7E7CE" }}
          variants={filterVariants}
          initial="hidden"
          animate="show"
        >
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          <motion.div className="mb-6" variants={filterVariants}>
            <h3 className="font-medium mb-2">Price Range</h3>
            <Slider
              range
              min={0}
              max={100}
              defaultValue={[0, 100]}
              value={priceRange}
              onChange={setPriceRange}
              tooltip={{ formatter: (value) => `$${value}` }}
            />
            <div className="flex justify-between mt-2">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </motion.div>

          <motion.div className="mb-6" variants={filterVariants}>
            <h3 className="font-medium mb-2">Material</h3>
            <Checkbox.Group
              options={materials}
              value={selectedMaterials}
              onChange={setSelectedMaterials}
              className="flex flex-col gap-2"
            />
          </motion.div>

          <motion.div className="mb-6" variants={filterVariants}>
            <h3 className="font-medium mb-2">Size (inches)</h3>
            <Select
              mode="multiple"
              placeholder="Select sizes"
              value={selectedSizes}
              onChange={setSelectedSizes}
              className="w-full"
            >
              {sizes.map(size => (
                <Option key={size} value={size}>
                  {size}"
                </Option>
              ))}
            </Select>
          </motion.div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="w-full lg:w-3/4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <Row gutter={[16, 24]}>
            {filteredProducts.map((product) => (
              <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                <motion.div variants={itemVariants}>
                  <Link to={`/product-detail/${product.id}`}>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        hoverable
                        style={{ backgroundColor: "#FFE4C4" }}
                        cover={
                          <motion.img
                            alt={product.name}
                            src={product.imageUrl}
                            className="h-48 w-full object-cover"
                            whileHover={{ scale: 1.05 }}
                          />
                        }
                      >
                        <Meta
                          title={product.name}
                          description={
                            <>
                              <div className="text-lg font-semibold text-[#A37B73]">
                                ${product.price.toFixed(2)}
                              </div>
                              <div className="text-sm text-gray-500">
                                {product.material} • {product.size}"
                              </div>
                            </>
                          }
                        />
                      </Card>
                    </motion.div>
                  </Link>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Products;