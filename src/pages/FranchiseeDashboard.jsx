import React, { useState, useEffect } from 'react';
import {
  Layout,
  Menu,
  Card,
  Statistic,
  Row,
  Col,
  Button,
  Table,
  Tag,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Modal,
  Popconfirm,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, DatabaseOutlined, LogoutOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Sider, Content } = Layout;

const FranchiseeDashboard = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([
    { key: 1, item: 'Bread Loaf', quantity: 50, expiry: '2025-05-20' },
    { key: 2, item: 'Tomatoes', quantity: 0, expiry: '2025-04-10' },
    { key: 3, item: 'Cheese Slices', quantity: 20, expiry: '2025-05-01' },
    { key: 4, item: 'Lettuce', quantity: 5, expiry: '2025-04-01' },
    { key: 5, item: 'Chicken Breast', quantity: 15, expiry: '2025-06-01' },
  ]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedItem, setSelectedItem] = useState(null); // Track selected item for editing
  const [selectedMenu, setSelectedMenu] = useState('dashboard'); // Track selected menu

  const updateInventoryStatus = (list) =>
    list.map(item => {
      const isExpired = new Date(item.expiry) < new Date();
      const status = isExpired
        ? 'Expired'
        : item.quantity === 0
        ? 'Out of Stock'
        : 'Available';
      return { ...item, status };
    });

  useEffect(() => {
    const updated = updateInventoryStatus(inventory);
    setInventory(updated);
  }, [inventory]);

  const handleAddNewItem = (values) => {
    const { item, quantity, expiry } = values;
    const exists = inventory.find(i => i.item.toLowerCase() === item.toLowerCase());
    if (exists) return; // No message here for item exists

    const newItem = {
      key: inventory.length + 1,
      item,
      quantity,
      expiry: expiry.format('YYYY-MM-DD'),
    };

    const updated = updateInventoryStatus([...inventory, newItem]);
    setInventory(updated);
    setIsAddModalVisible(false);
    form.resetFields();
  };

  const handleEditItem = (values) => {
    const { quantity, expiry } = values;
    if (!selectedItem) return;

    const updatedInventory = inventory.map(i =>
      i.key === selectedItem.key
        ? {
            ...i,
            quantity: i.quantity + quantity, // Adding to the existing quantity
            expiry: expiry ? expiry.format('YYYY-MM-DD') : i.expiry, // Update expiry if provided
            status: updateInventoryStatus([i])[0].status, // Update status based on quantity and expiry
          }
        : i
    );

    setInventory(updatedInventory);
    setIsEditModalVisible(false);
    setSelectedItem(null); // Clear the selected item
  };

  const handleDeleteItem = (key) => {
    const filtered = inventory.filter(i => i.key !== key);
    setInventory(filtered);
  };

  const inventoryColumns = [
    { title: 'Item', dataIndex: 'item', key: 'item' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        const color = status === 'Available' ? 'green' : status === 'Out of Stock' ? 'red' : 'orange';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    { title: 'Expiry', dataIndex: 'expiry', key: 'expiry' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button size="small" onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Popconfirm title="Delete this item?" onConfirm={() => handleDeleteItem(record.key)}>
            <Button danger size="small">Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleEdit = (record) => {
    setSelectedItem(record);
    setIsEditModalVisible(true);
  };

  const handleMenuClick = (e) => {
    setSelectedMenu(e.key);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'dashboard':
        return (
          <div>
            <Row gutter={[16, 16]}>
              <Col md={6}><Card><Statistic title="Total Sales" value={35000} prefix="$" /></Card></Col>
              <Col md={6}><Card><Statistic title="In Stock" value={inventory.filter(i => i.status === 'Available').length} valueStyle={{ color: '#1890ff' }} /></Card></Col>
              <Col md={6}><Card><Statistic title="Out of Stock" value={inventory.filter(i => i.status === 'Out of Stock').length} valueStyle={{ color: '#cf1322' }} /></Card></Col>
              <Col md={6}><Card><Statistic title="Expired" value={inventory.filter(i => i.status === 'Expired').length} valueStyle={{ color: '#fa8c16' }} /></Card></Col>
            </Row>
          </div>
        );
      case 'inventory':
        return (
          <div>
            <div className="mt-10 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Inventory</h2>
              <Button type="primary" onClick={() => setIsAddModalVisible(true)}>+ Add Item</Button>
            </div>
            <Table dataSource={inventory} columns={inventoryColumns} pagination={false} className="mt-4" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider width={250} className="site-layout-background">
        <Menu mode="inline" theme="dark" onClick={handleMenuClick}>
          <Menu.Item key="dashboard" icon={<AppstoreAddOutlined />}>Dashboard</Menu.Item>
          <Menu.Item key="inventory" icon={<DatabaseOutlined />}>Inventory</Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={() => navigate('/')}>Logout</Menu.Item>
        </Menu>
      </Sider>

      {/* Content */}
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content style={{ padding: 24, margin: 0, minHeight: 280, backgroundColor: '#fff' }}>
          {renderContent()}
        </Content>
      </Layout>

      {/* Add Item Modal */}
      <Modal
        title="Add New Item"
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleAddNewItem}>
          <Form.Item name="item" label="Item Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="expiry" label="Expiry Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>Add Item</Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Item Modal */}
      <Modal
        title="Edit Item"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleEditItem}>
          <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="expiry" label="Expiry Date">
            <DatePicker style={{ width: '100%' }} defaultValue={moment(selectedItem?.expiry)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>Update Item</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default FranchiseeDashboard;
