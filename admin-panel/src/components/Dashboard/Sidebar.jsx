// src/components/Dashboard/Sidebar.jsx
import { Menu, Layout, theme } from 'antd';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  DashboardOutlined, 
  ShoppingCartOutlined, 
  ShoppingOutlined, 
  UserOutlined, 
  PieChartOutlined,
  LogoutOutlined 
} from '@ant-design/icons';
import logo from "../../assets/logo.png"
import { useAuth } from '../../context/AuthContext';

const { Sider } = Layout;

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <NavLink to="/">Dashboard</NavLink>,
    },
    {
      key: 'products',
      icon: <ShoppingOutlined />,
      label: <NavLink to="/products">Products</NavLink>,
    },
    {
      key: 'orders',
      icon: <ShoppingCartOutlined />,
      label: <NavLink to="/orders">Orders</NavLink>,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onBreakpoint={(broken) => setCollapsed(broken)}
        width={250}
        style={{ background: colorBgContainer }}
        className="h-screen fixed left-0 top-0 shadow-lg z-10"
      >
        <div className="flex items-center justify-center h-16 p-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <img 
              src={logo} 
              alt="CeramicCrafts" 
              className="h-8 mr-2" 
            />
            {!collapsed && (
              <span className="text-lg font-semibold whitespace-nowrap">
                CeramicCrafts
              </span>
            )}
          </motion.div>
        </div>
        
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname.split('/')[1] || 'dashboard']}
          items={items}
          className="border-r-0"
        />
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="absolute bottom-0 w-full p-4"
        >
          <button
            onClick={logout}
            className="w-full flex items-center justify-center space-x-2 text-red-500 hover:text-red-700"
          >
            <LogoutOutlined />
            {!collapsed && <span>Logout</span>}
          </button>
        </motion.div>
      </Sider>
    </motion.div>
  );
};

export default Sidebar;