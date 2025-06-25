// src/components/Products/ProductForm.jsx
import { Modal, Form, Input, InputNumber, Select, message, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const { Option } = Select;

const ProductForm = ({ visible, onClose, product }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        ...product,
        price: product.price.toString(),
      });
    } else {
      form.resetFields();
    }
  }, [product, form]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      // Simulate API call
      setTimeout(() => {
        message.success(
          product 
            ? 'Product updated successfully' 
            : 'Product added successfully'
        );
        setLoading(false);
        onClose();
      }, 800);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={product ? 'Edit Product' : 'Add New Product'}
      visible={visible}
      onOk={handleSubmit}
      onCancel={onClose}
      confirmLoading={loading}
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          status: 'active',
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Product Name"
              rules={[{ required: true, message: 'Please enter product name' }]}
            >
              <Input placeholder="e.g., Handmade Ceramic Mug" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please select category' }]}
            >
              <Select placeholder="Select category">
                <Option value="Mugs">Mugs</Option>
                <Option value="Plates">Plates</Option>
                <Option value="Bowls">Bowls</Option>
                <Option value="Vases">Vases</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="price"
              label="Price ($)"
              rules={[
                { required: true, message: 'Please enter price' },
                { pattern: /^\d+(\.\d{1,2})?$/, message: 'Please enter valid price' }
              ]}
            >
              <InputNumber 
                min={0} 
                step={0.01} 
                className="w-full" 
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="stock"
              label="Stock Quantity"
              rules={[{ required: true, message: 'Please enter stock quantity' }]}
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          </Col>
        </Row>
        
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter description' }]}
        >
          <Input.TextArea rows={4} placeholder="Product description..." />
        </Form.Item>
        
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please select status' }]}
        >
          <Select>
            <Option value="active">Active</Option>
            <Option value="out_of_stock">Out of Stock</Option>
            <Option value="draft">Draft</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductForm;