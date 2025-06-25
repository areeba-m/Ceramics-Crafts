// src/components/Auth/LoginForm.jsx
import { Button, Form, Input, Checkbox } from 'antd';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
  const { login } = useAuth();

  const onFinish = (values) => {
    login(values);
  };

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
      className="w-full"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Sign In
          </Button>
        </Form.Item>
      </motion.div>
    </Form>
  );
};

export default LoginForm;