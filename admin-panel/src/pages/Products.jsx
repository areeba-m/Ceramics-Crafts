// src/pages/Products.jsx
import { useState } from 'react';
import { Button, Row, Col, Typography, Input, Space } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import ProductTable from '../components/Products/ProductTable';
import ProductForm from '../components/Products/ProductForm';
import Sidebar from '../components/Dashboard/Sidebar';
import Header from '../components/Dashboard/Header';

const { Title } = Typography;

const Products = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormVisible(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsFormVisible(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 overflow-hidden">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className="p-6">
          <Row justify="space-between" align="middle" className="mb-6">
            <Col>
              <Title level={3}>Product Management</Title>
            </Col>
            <Col>
              <Space>
                <Input
                  placeholder="Search products..."
                  prefix={<SearchOutlined />}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-64"
                />
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />} 
                    onClick={handleAddProduct}
                  >
                    Add Product
                  </Button>
                </motion.div>
              </Space>
            </Col>
          </Row>
          
          <ProductTable 
            searchText={searchText} 
            onEdit={handleEditProduct} 
          />
          
          <ProductForm 
            visible={isFormVisible} 
            onClose={() => setIsFormVisible(false)} 
            product={editingProduct}
          />
        </main>
      </div>
    </div>
  );
};

export default Products;