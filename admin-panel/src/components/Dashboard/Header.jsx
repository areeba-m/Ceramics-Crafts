// src/components/Dashboard/Header.jsx
import { Layout, Button, theme, Badge, Avatar, Dropdown, Space } from 'antd';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined,
  BellOutlined,
  MailOutlined,
  UserOutlined,
  DownOutlined 
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const { Header } = Layout;

const AppHeader = ({ collapsed, setCollapsed }) => {
  const { user } = useAuth();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [
    {
      key: 'logout',
      label: 'Logout',
      danger: true,
    },
  ];

  return (
    <Header
      style={{ background: colorBgContainer }}
      className="flex items-center justify-between p-0 pr-6 shadow-sm sticky top-0 z-10"
    >
      <div className="flex items-center">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="w-16 h-16"
        />
      </div>
      
      <Space size="large">
        
        <Dropdown menu={{ items }} trigger={['click']}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <Space className="cursor-pointer">
              <Avatar icon={<UserOutlined />} />
              <span className="font-medium">{user?.name || 'Admin'}</span>
              <DownOutlined />
            </Space>
          </motion.div>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default AppHeader;