// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { motion } from 'framer-motion';
import { useScroll } from 'framer-motion';
// import { useLocomotiveScroll } from 'react-locomotive-scroll';
import Header from '../components/Dashboard/Header';
import Sidebar from '../components/Dashboard/Sidebar';
import StatsCard from '../components/Dashboard/StatsCard';

const { Title } = Typography;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const { scroll } = useLocomotiveScroll();

  // useEffect(() => {
  //   if (scroll) {
  //     scroll.update();
  //   }
  // }, [scroll, collapsed]);

  const stats = [
    { title: 'Total Orders', value: 1245, change: '+12%', isIncrease: true },
    { title: 'Pending Orders', value: 32, change: '-3%', isIncrease: false },
    { title: 'Completed Orders', value: 1150, change: '+8%', isIncrease: true },
    { title: 'Total Revenue', value: '$48,256', change: '+18%', isIncrease: true },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50" data-scroll-container>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 overflow-hidden">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className="p-6" data-scroll-section>
          <Title level={3} className="mb-6">Dashboard Overview</Title>
          
          <Row gutter={[16, 16]} className="mb-6">
            {stats.map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <StatsCard {...stat} />
                </motion.div>
              </Col>
            ))}
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Card title="Recent Orders" className="h-full">
                {/* Order chart/table would go here */}
                <div className="h-64 flex items-center justify-center text-gray-400">
                  Orders Chart Placeholder
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card title="Top Products" className="h-full">
                {/* Products chart would go here */}
                <div className="h-64 flex items-center justify-center text-gray-400">
                  Products Chart Placeholder
                </div>
              </Card>
            </Col>
          </Row>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;