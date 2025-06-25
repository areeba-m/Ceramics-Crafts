import React, { useState } from "react";
import { Card, Row, Col, Slider, Checkbox, Select, Pagination, Spin } from "antd";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchedProducts } from "../redux/reducers/productReducers";
import { useEffect } from "react";

const { Meta } = Card;
const { Option } = Select;

const products = [
  {
    id: 1,
    name: "Ceramic Vase",
    price: 45.99,
    image:
      "https://imgs.search.brave.com/lZDnRMsBhL_Qs1GGoLano_ubiazw4AzHnUgVDJ9KIYM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc3F1YXJlc3Bh/Y2UtY2RuLmNvbS9j/b250ZW50L3YxLzYz/YWQyOTMwMGZkZjY4/MjRhNGIzYmM2ZS9k/YzhiNmM5Yi0yMGYz/LTQzMzMtYTUyMS1m/NDE1YTIyZWQwOWMv/SU1HXzAxOTguanBl/Zw",
    size: "Medium",
    color: "Blue",
    type: "Home Decor",
  },
  {
    id: 2,
    name: "Handcrafted Bowl",
    price: 32.5,
    image:
      "https://imgs.search.brave.com/VcfhU9oSGmxhFYAPIwzJ_HmB5Ccp4Rn8Ectqd9zHXl4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzE3MzYwNjUzL2Mv/MTkyMy8xOTIzLzc4/LzY5My9pbC9kNjBj/OWUvNTcxOTYzOTQ5/NC9pbF82MDB4NjAw/LjU3MTk2Mzk0OTRf/ZHE3dC5qcGc",
    size: "Small",
    color: "White",
    type: "Tableware",
  },
  {
    id: 3,
    name: "Ceramic Vase",
    price: 45.99,
    image:
      "https://imgs.search.brave.com/lZDnRMsBhL_Qs1GGoLano_ubiazw4AzHnUgVDJ9KIYM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc3F1YXJlc3Bh/Y2UtY2RuLmNvbS9j/b250ZW50L3YxLzYz/YWQyOTMwMGZkZjY4/MjRhNGIzYmM2ZS9k/YzhiNmM5Yi0yMGYz/LTQzMzMtYTUyMS1m/NDE1YTIyZWQwOWMv/SU1HXzAxOTguanBl/Zw",
    size: "Medium",
    color: "Blue",
    type: "Home Decor",
  },
  {
    id: 4,
    name: "Handcrafted Bowl",
    price: 32.5,
    image:
      "https://imgs.search.brave.com/VcfhU9oSGmxhFYAPIwzJ_HmB5Ccp4Rn8Ectqd9zHXl4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzE3MzYwNjUzL2Mv/MTkyMy8xOTIzLzc4/LzY5My9pbC9kNjBj/OWUvNTcxOTYzOTQ5/NC9pbF82MDB4NjAw/LjU3MTk2Mzk0OTRf/ZHE3dC5qcGc",
    size: "Small",
    color: "White",
    type: "Tableware",
  },
];

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
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  console.log(items)

  useEffect(() => {
    dispatch(fetchedProducts());
  }, [dispatch]);

//    const productsToDisplay = items.length > 0 ? items : [];
   const productsToDisplay = products;
   console.log("productsToDisplay", productsToDisplay)


  const filteredProducts = productsToDisplay.filter((product) => {
    return (
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      (selectedSizes.length === 0 || selectedSizes.includes(product.size)) &&
      (selectedColors.length === 0 || selectedColors.includes(product.color)) &&
      (selectedTypes.length === 0 || selectedTypes.includes(product.type))
    );
  });
  console.log("fillterproducts", filteredProducts)

  // const sizes = [...new Set(productsToDisplay.map((p) => p.size).filter(Boolean))];
  // const colors = [...new Set(productsToDisplay.map((p) => p.color).filter(Boolean))];
  // const types = [...new Set(productsToDisplay.map((p) => p.type).filter(Boolean))];

  
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
      className="container mx-auto px-10 py-8"
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
            <h3 className="font-medium mb-2">Size</h3>
            <Checkbox.Group
              // options={sizes}
              value={selectedSizes}
              onChange={setSelectedSizes}
              className="flex flex-col gap-2"
            />
          </motion.div>

          <motion.div className="mb-6" variants={filterVariants}>
            <h3 className="font-medium mb-2">Color</h3>
            <Select
              mode="multiple"
              placeholder="Select colors"
              value={selectedColors}
              onChange={setSelectedColors}
              className="w-full"
            >
              {/* {colors.map((color) => (
                <Option key={color} value={color}>
                  {color}
                </Option>
              ))} */}
            </Select>
          </motion.div>

          <motion.div className="mb-6" variants={filterVariants}>
            <h3 className="font-medium mb-2">Product Type</h3>
            <Select
              mode="multiple"
              placeholder="Select types"
              value={selectedTypes}
              onChange={setSelectedTypes}
              className="w-full"
            >
              {/* {types.map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))} */}
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
            {productsToDisplay.map((product) => (
              <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                <motion.div variants={itemVariants}>
                  <Link to={`/product-detail/${product._id}`}>
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
                            src={product.images}
                            // object-contain
                            className="h-48 object-cover"
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
                                {/* type */}
                                {product.brand}
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



