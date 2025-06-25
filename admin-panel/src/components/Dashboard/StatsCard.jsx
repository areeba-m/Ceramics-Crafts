// src/components/Dashboard/StatsCard.jsx
import { Card, Typography } from 'antd';
import { motion } from 'framer-motion';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Text } = Typography;

const StatsCard = ({ title, value, change, isIncrease }) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <Text type="secondary" className="text-sm">{title}</Text>
          <div className="text-2xl font-semibold mt-1">{value}</div>
        </div>
        <div className={`flex items-center ${isIncrease ? 'text-green-500' : 'text-red-500'}`}>
          {isIncrease ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          <span className="ml-1">{change}</span>
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;