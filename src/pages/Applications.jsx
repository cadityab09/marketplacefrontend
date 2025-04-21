import React from "react";
import { Card, List, Typography, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const applications = [
  {
    name: "Franchisee A",
    location: "Pune",
    email: "a@example.com",
    status: "Pending",
  },
  {
    name: "Franchisee B",
    location: "Mumbai",
    email: "b@example.com",
    status: "Pending",
  },
  {
    name: "Franchisee C",
    location: "Delhi",
    email: "c@example.com",
    status: "Approved",
  },
];

const Applications = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <Card className="shadow-lg rounded-lg mb-6">
          <Title level={3}>New Franchise Applications</Title>
          <Paragraph>
            Below are the pending applications from potential franchisees. You can approve or reject applications.
          </Paragraph>
        </Card>

        <List
          itemLayout="horizontal"
          dataSource={applications}
          renderItem={(application) => (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
                >
                  Approve
                </Button>,
                <Button type="default">Reject</Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<UserOutlined style={{ fontSize: "2rem" }} />}
                title={application.name}
                description={`Location: ${application.location} | Email: ${application.email}`}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Applications;
