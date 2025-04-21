// src/components/FranchiseeList.jsx

import React, { useState } from "react";
import { Card, List, Typography, Collapse, Button } from "antd";

const { Title } = Typography;
const { Panel } = Collapse;

const franchisees = [
  {
    name: "Franchisee A",
    location: "Pune",
    email: "a@example.com",
    status: "Active"
  },
  {
    name: "Franchisee B",
    location: "Mumbai",
    email: "b@example.com",
    status: "Inactive"
  },
  {
    name: "Franchisee C",
    location: "Delhi",
    email: "c@example.com",
    status: "Active"
  },
];

const FranchiseeList = () => {
  const [activeKeys, setActiveKeys] = useState([]); // State to manage open/collapse

  const handleCollapseChange = (keys) => {
    setActiveKeys(keys);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <Title level={3}>Franchisee List</Title>
        
        {/* Franchisee List */}
        <List
          itemLayout="vertical"
          dataSource={franchisees}
          renderItem={(item, index) => (
            <List.Item key={item.email}>
              <Card type="inner" title={item.name}>
                <p><strong>Location:</strong> {item.location}</p>
                <p><strong>Email:</strong> {item.email}</p>
                <p><strong>Status:</strong> {item.status}</p>

                {/* Toggle Details using Collapse */}
                <Collapse
                  activeKey={activeKeys}
                  onChange={handleCollapseChange}
                  bordered={false}
                >
                  <Panel header="View Details" key={index}>
                    <div>
                      <p><strong>Additional Details:</strong> More info about {item.name}.</p>
                      {/* Example button to toggle franchisee status */}
                      <Button type="primary" onClick={() => alert(`Toggling ${item.name}`)}>
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
