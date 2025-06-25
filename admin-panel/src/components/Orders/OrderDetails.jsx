// src/components/Orders/OrderDetails.jsx
import { Modal, Descriptions, Tag, Divider, List, Button } from 'antd';
import { motion } from 'framer-motion';
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined,
  PrinterOutlined,
  MailOutlined 
} from '@ant-design/icons';
import dayjs from 'dayjs';

const statusIcons = {
  completed: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
  cancelled: <CloseCircleOutlined style={{ color: '#f5222d' }} />,
};

const statusColors = {
  pending: 'gold',
  processing: 'blue',
  completed: 'green',
  cancelled: 'red',
};

const OrderDetails = ({ order, onClose }) => {
  const customizationDetails = [
    { label: 'Color', value: 'Sky Blue' },
    { label: 'Size', value: 'Medium (12cm)' },
    { label: 'Engraving Text', value: 'Family Forever' },
    { label: 'Font Style', value: 'Script' },
    { label: 'Special Instructions', value: 'Please wrap as gift' },
  ];

  const items = [
    { name: 'Custom Ceramic Mug', price: 24.99, quantity: 2 },
    { name: 'Personalized Plate', price: 32.50, quantity: 1 },
  ];

  return (
    <Modal
      title={`Order Details - ${order.id}`}
      visible={!!order}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Customer">{order.customer}</Descriptions.Item>
        <Descriptions.Item label="Order Date">
          {dayjs(order.date).format('MMMM D, YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={statusColors[order.status]}>
            {statusIcons[order.status]} {order.status.toUpperCase()}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Total Amount">
          ${order.amount.toFixed(2)}
        </Descriptions.Item>
        <Descriptions.Item label="Payment Method">
          Credit Card (VISA ****4242)
        </Descriptions.Item>
        <Descriptions.Item label="Shipping Method">
          Standard Shipping
        </Descriptions.Item>
      </Descriptions>
      
      <Divider orientation="left">Customization Details</Divider>
      <Descriptions bordered column={1}>
        {customizationDetails.map((detail, index) => (
          <Descriptions.Item key={index} label={detail.label}>
            {detail.value || '-'}
          </Descriptions.Item>
        ))}
      </Descriptions>
      
      <Divider orientation="left">Order Items</Divider>
      <List
        itemLayout="horizontal"
        dataSource={items}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.name}
              description={`Quantity: ${item.quantity} | Price: $${item.price.toFixed(2)}`}
            />
            <div>${(item.price * item.quantity).toFixed(2)}</div>
          </List.Item>
        )}
      />
      
      <div className="flex justify-end mt-6 space-x-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button icon={<PrinterOutlined />}>Print Invoice</Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button icon={<MailOutlined />} type="primary">
            Send Confirmation
          </Button>
        </motion.div>
      </div>
    </Modal>
  );
};

export default OrderDetails;