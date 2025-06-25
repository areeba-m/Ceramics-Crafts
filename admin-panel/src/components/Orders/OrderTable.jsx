// src/components/Orders/OrderTable.jsx
import { Table, Tag, Space, Button, Badge } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const statusColors = {
  pending: 'gold',
  processing: 'blue',
  completed: 'green',
  cancelled: 'red',
};

const OrderTable = ({ searchText, statusFilter, dateRange, onSelectOrder }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        const mockOrders = [
          {
            id: 'ORD-1001',
            customer: 'John Smith',
            date: '2023-05-15',
            amount: 124.95,
            status: 'completed',
            items: 3,
          },
          {
            id: 'ORD-1002',
            customer: 'Sarah Johnson',
            date: '2023-05-16',
            amount: 78.50,
            status: 'processing',
            items: 2,
          },
          {
            id: 'ORD-1003',
            customer: 'Michael Brown',
            date: '2023-05-17',
            amount: 45.00,
            status: 'pending',
            items: 1,
          },
          {
            id: 'ORD-1004',
            customer: 'Emily Davis',
            date: '2023-05-18',
            amount: 92.75,
            status: 'completed',
            items: 4,
          },
          {
            id: 'ORD-1005',
            customer: 'Robert Wilson',
            date: '2023-05-19',
            amount: 210.30,
            status: 'cancelled',
            items: 5,
          },
        ];
        setOrders(mockOrders);
        setLoading(false);
      }, 500);
    } catch (error) {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchText.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || order.status === statusFilter;
    
    const matchesDate = !dateRange || (
      dayjs(order.date).isAfter(dateRange[0]) && 
      dayjs(order.date).isBefore(dateRange[1])
    );
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      sorter: (a, b) => a.customer.localeCompare(b.customer),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => dayjs(date).format('MMM D, YYYY'),
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `$${amount.toFixed(2)}`,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      sorter: (a, b) => a.items - b.items,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusColors[status]}>
          {status.toUpperCase()}
        </Tag>
      ),
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <motion.div whileHover={{ scale: 1.1 }}>
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => onSelectOrder(record)}
          />
        </motion.div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={filteredOrders}
      rowKey="id"
      loading={loading}
      scroll={{ x: true }}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default OrderTable;