// src/components/Products/ProductTable.jsx
import { Table, Tag, Space, Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const ProductTable = ({ searchText, onEdit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        const mockProducts = [
          {
            id: '1',
            name: 'Handmade Ceramic Mug',
            category: 'Mugs',
            price: 24.99,
            stock: 45,
            status: 'active',
          },
          {
            id: '2',
            name: 'Custom Engraved Plate',
            category: 'Plates',
            price: 32.50,
            stock: 12,
            status: 'active',
          },
          {
            id: '3',
            name: 'Ceramic Flower Vase',
            category: 'Vases',
            price: 45.00,
            stock: 0,
            status: 'out_of_stock',
          },
          {
            id: '4',
            name: 'Personalized Bowl Set',
            category: 'Bowls',
            price: 38.75,
            stock: 8,
            status: 'active',
          },
        ];
        setProducts(mockProducts);
        setLoading(false);
      }, 500);
    } catch (error) {
      message.error('Failed to fetch products');
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    // Simulate delete
    setProducts(products.filter(product => product.id !== id));
    message.success('Product deleted successfully');
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase()) ||
    product.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price.toFixed(2)}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'green';
        if (status === 'out_of_stock') color = 'red';
        return <Tag color={color}>{status.replace('_', ' ').toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => onEdit(record)}
            />
          </motion.div>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button type="text" danger icon={<DeleteOutlined />} />
            </motion.div>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={filteredProducts}
      rowKey="id"
      loading={loading}
      scroll={{ x: true }}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default ProductTable;