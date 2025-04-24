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
  Modal,
  Popconfirm,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  UserOutlined,
  DatabaseOutlined,
  LogoutOutlined,
  AppstoreAddOutlined,
} from '@ant-design/icons';

const { Sider, Content } = Layout;

const FranchiseeDashboard = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([
    { key: 1, item: 'Bread Loaf', quantity: 50 },
    { key: 2, item: 'Tomatoes', quantity: 0 },
    { key: 3, item: 'Cheese Slices', quantity: 20 },
    { key: 4, item: 'Lettuce', quantity: 5 },
    { key: 5, item: 'Chicken Breast', quantity: 15 },
  ]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [orderForm] = Form.useForm();
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const [selectedOrderItem, setSelectedOrderItem] = useState(null);

  const updateInventoryStatus = (list) =>
    list.map((item) => {
      const status = item.quantity === 0 ? 'Out of Stock' : 'Available';
      return { ...item, status };
    });

  useEffect(() => {
    const updated = updateInventoryStatus(inventory);
    setInventory(updated);
  }, []);

  const handleAddNewItem = (values) => {
    const { item, quantity } = values;
    const exists = inventory.find((i) => i.item.toLowerCase() === item.toLowerCase());
    if (exists) return;

    const newItem = {
      key: inventory.length + 1,
      item,
      quantity,
    };

    const updated = updateInventoryStatus([...inventory, newItem]);
    setInventory(updated);
    setIsAddModalVisible(false);
    form.resetFields();
  };

  const handleEditItem = (values) => {
    const { quantity } = values;
    if (!selectedItem) return;

    const updatedInventory = inventory.map((i) =>
      i.key === selectedItem.key
        ? {
            ...i,
            quantity: i.quantity + quantity,
          }
        : i
    );

    const updated = updateInventoryStatus(updatedInventory);
    setInventory(updated);
    setIsEditModalVisible(false);
    setSelectedItem(null);
  };

  const handleDeleteItem = (key) => {
    const filtered = inventory.filter((i) => i.key !== key);
    setInventory(filtered);
  };

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
          <Row gutter={[16, 16]}>
            <Col md={8}><Card><Statistic title="Total Sales" value={35000} prefix="$" /></Card></Col>
            <Col md={8}><Card><Statistic title="In Stock" value={inventory.filter(i => i.status === 'Available').length} valueStyle={{ color: '#1890ff' }} /></Card></Col>
            <Col md={8}><Card><Statistic title="Out of Stock" value={inventory.filter(i => i.status === 'Out of Stock').length} valueStyle={{ color: '#cf1322' }} /></Card></Col>
          </Row>
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

      case 'customer':
        const availableItems = inventory.filter(i => i.quantity > 0);

        const handleItemChange = (itemName) => {
          const item = availableItems.find(i => i.item === itemName);
          setSelectedOrderItem(item);
        };

        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Customer Order</h2>
            <Form
              layout="vertical"
              form={orderForm}
              onFinish={(values) => {
                const { item, quantity } = values;
                const updatedInventory = inventory.map((i) =>
                  i.item === item
                    ? { ...i, quantity: i.quantity - quantity }
                    : i
                );

                const updated = updateInventoryStatus(updatedInventory);
                setInventory(updated);
                orderForm.resetFields();
                setSelectedOrderItem(null);
                console.log('Order Submitted:', values);
              }}
            >
              <Form.Item name="customerName" label="Customer Name">
                <Input />
              </Form.Item>

              <Form.Item name="item" label="Select Item">
                <select style={{ width: '100%', padding: '8px' }} onChange={(e) => handleItemChange(e.target.value)}>
                  <option value="">-- Select an item --</option>
                  {availableItems.map((i) => (
                    <option key={i.key} value={i.item}>{i.item} (In stock: {i.quantity})</option>
                  ))}
                </select>
              </Form.Item>

              {selectedOrderItem && (
                <Form.Item name="quantity" label={`Quantity (Max: ${selectedOrderItem.quantity})`}>
                  <InputNumber min={1} max={selectedOrderItem.quantity} style={{ width: '100%' }} />
                </Form.Item>
              )}

              <Form.Item name="price" label="Price ($)">
                <InputNumber min={0.01} step={0.01} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>Submit Order</Button>
              </Form.Item>
            </Form>
          </div>
        );

      default:
        return null;
    }
  };

  const inventoryColumns = [
    { title: 'Item', dataIndex: 'item', key: 'item' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        const color = status === 'Available' ? 'green' : 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button size="small" onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>Edit</Button>
          <Popconfirm title="Delete this item?" onConfirm={() => handleDeleteItem(record.key)}>
            <Button danger size="small">Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} className="site-layout-background">
        <Menu mode="inline" theme="dark" onClick={handleMenuClick} selectedKeys={[selectedMenu]}>
          <Menu.Item key="dashboard" icon={<AppstoreAddOutlined />}>Dashboard</Menu.Item>
          <Menu.Item key="inventory" icon={<DatabaseOutlined />}>Inventory</Menu.Item>
          <Menu.Item key="customer" icon={<UserOutlined />}>Customer</Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={() => navigate('/')}>Logout</Menu.Item>
        </Menu>
      </Sider>

      <Layout style={{ padding: '0 24px 24px' }}>
        <Content style={{ padding: 24, margin: 0, minHeight: 280, backgroundColor: '#fff' }}>
          {renderContent()}
        </Content>
      </Layout>

      <Modal title="Add New Item" open={isAddModalVisible} onCancel={() => setIsAddModalVisible(false)} footer={null}>
        <Form layout="vertical" form={form} onFinish={handleAddNewItem}>
          <Form.Item name="item" label="Item Name" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}><InputNumber min={1} style={{ width: '100%' }} /></Form.Item>
          <Form.Item><Button type="primary" htmlType="submit" block>Add Item</Button></Form.Item>
        </Form>
      </Modal>

      <Modal title="Edit Item" open={isEditModalVisible} onCancel={() => setIsEditModalVisible(false)} footer={null}>
        <Form layout="vertical" form={form} onFinish={handleEditItem}>
          <Form.Item name="quantity" label="Add Quantity" rules={[{ required: true }]}><InputNumber min={1} style={{ width: '100%' }} /></Form.Item>
          <Form.Item><Button type="primary" htmlType="submit" block>Update Item</Button></Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default FranchiseeDashboard;
