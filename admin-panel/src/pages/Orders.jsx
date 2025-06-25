// src/pages/Orders.jsx
import { useState } from 'react';
import { Button, Row, Col, Typography, Input, Select, DatePicker, Card } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import OrderTable from '../components/Orders/OrderTable';
import OrderDetails from '../components/Orders/OrderDetails';
import Sidebar from '../components/Dashboard/Sidebar';
import Header from '../components/Dashboard/Header';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Orders = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 overflow-hidden">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className="p-6">
          <Row justify="space-between" align="middle" className="mb-6">
            <Col>
              <Title level={3}>Order Management</Title>
            </Col>
          </Row>
          
          <Card className="mb-6">
            <Row gutter={16} align="middle">
              <Col xs={24} sm={12} md={6}>
                <Input
                  placeholder="Search orders..."
                  prefix={<SearchOutlined />}
                  onChange={(e) => setSearchText(e.target.value)}
                  allowClear
                />
              </Col>
              <Col xs={24} sm={12} md={4}>
                <Select
                  placeholder="Status"
                  className="w-full"
                  onChange={setStatusFilter}
                  value={statusFilter}
                >
                  <Option value="all">All Status</Option>
                  <Option value="pending">Pending</Option>
                  <Option value="processing">Processing</Option>
                  <Option value="completed">Completed</Option>
                  <Option value="cancelled">Cancelled</Option>
                </Select>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <RangePicker 
                  className="w-full" 
                  onChange={setDateRange} 
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button 
                    icon={<FilterOutlined />} 
                    block
                  >
                    Apply Filters
                  </Button>
                </motion.div>
              </Col>
            </Row>
          </Card>
          
          <OrderTable 
            searchText={searchText}
            statusFilter={statusFilter}
            dateRange={dateRange}
            onSelectOrder={setSelectedOrder}
          />
          
          {selectedOrder && (
            <OrderDetails 
              order={selectedOrder} 
              onClose={() => setSelectedOrder(null)} 
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Orders;