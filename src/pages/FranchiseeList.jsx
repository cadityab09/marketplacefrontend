import React, { useState } from "react";
import {
  Card,
  List,
  Typography,
  Collapse,
  Button,
  Input,
  Select,
  Tag,
  Space,
} from "antd";

const { Title, Text } = Typography;
const { Panel } = Collapse;
const { Option } = Select;

// Sample franchisee data
const initialFranchisees = [
  {
    name: "Franchisee A",
    owner: "Rahul Deshmukh",
    location: "Pune",
    email: "a@example.com",
    status: "Active",
    lastMonthIncome: "₹1,25,000",
  },
  {
    name: "Franchisee B",
    owner: "Priya Mehta",
    location: "Mumbai",
    email: "b@example.com",
    status: "Inactive",
    lastMonthIncome: "₹78,500",
  },
  {
    name: "Franchisee C",
    owner: "Suresh Kumar",
    location: "Delhi",
    email: "c@example.com",
    status: "Active",
    lastMonthIncome: "₹1,42,200",
  },
];

const FranchiseeList = () => {
  const [activeKeys, setActiveKeys] = useState([]);
  const [searchField, setSearchField] = useState("owner");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCollapseChange = (keys) => setActiveKeys(keys);
  const handleFieldChange = (value) => setSearchField(value);
  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());

  const filteredFranchisees = initialFranchisees.filter((item) =>
    item[searchField].toLowerCase().includes(searchTerm)
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Card className="max-w-5xl mx-auto shadow-lg rounded-lg">
        <Title level={3} style={{ marginBottom: "1.5rem" }}>
          🧾 Franchisee List
        </Title>

        {/* Search bar */}
        <Space className="mb-6" direction="horizontal" size="middle" wrap>
          <Select
            defaultValue="owner"
            style={{ width: 180 }}
            onChange={handleFieldChange}
          >
            <Option value="owner">Search by Owner</Option>
            <Option value="location">Search by Location</Option>
            <Option value="email">Search by Email</Option>
          </Select>

          <Input
            placeholder="Type to search..."
            allowClear
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: 280 }}
          />
        </Space>

        {/* List of Franchisees */}
        <List
          itemLayout="vertical"
          dataSource={filteredFranchisees}
          renderItem={(item, index) => (
            <List.Item key={item.email}>
              <Card
                type="inner"
                style={{
                  borderRadius: 12,
                  marginBottom: 16,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                }}
                title={
                  <Space direction="horizontal" size="large">
                    <Text strong style={{ fontSize: 16 }}>{item.name}</Text>
                    <Tag color={item.status === "Active" ? "green" : "volcano"}>
                      {item.status}
                    </Tag>
                  </Space>
                }
              >
                <Space direction="vertical" size="small">
                  <Text><strong>Owner:</strong> {item.owner}</Text>
                  <Text><strong>Location:</strong> {item.location}</Text>
                  <Text><strong>Email:</strong> {item.email}</Text>
                  <Text><strong>Last Month Income:</strong> {item.lastMonthIncome}</Text>
                </Space>

                <Collapse
                  activeKey={activeKeys}
                  onChange={handleCollapseChange}
                  bordered={false}
                  className="mt-4"
                >
                  <Panel header="View Details" key={index}>
                    <Text>📈 More business insights and performance data will appear here.</Text>
                    <div className="mt-3">
                      <Button
                        type="primary"
                        onClick={() =>
                          alert(`Toggling status for ${item.name}`)
                        }
                      >
                        Toggle Status
                      </Button>
                    </div>
                  </Panel>
                </Collapse>
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default FranchiseeList;
