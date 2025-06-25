// src/pages/Login.jsx
import { motion } from 'framer-motion';
import { Card, Typography, Space } from 'antd';
import LoginForm from '../components/Auth/LoginForm';
// import logo from '../assets/images/ceramic-crafts-logo.png';
import logo from "../assets/logo.png"

const { Title } = Typography;

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg">
          <Space direction="vertical" size="large" className="w-full text-center">
            <img 
            src={logo}
             alt="CeramicCrafts" className="h-16 mx-auto" />
            <Title level={3} className="!mb-0">Admin Panel</Title>
            <LoginForm />
          </Space>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;