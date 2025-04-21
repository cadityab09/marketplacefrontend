import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Add this line
import { Card, Col, Row, Typography, Button } from "antd";
import {
  UserAddOutlined,
  TeamOutlined,
  BarChartOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const FranchisorDashboard = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-6 shadow-lg">
          <Title level={2}>Welcome, Franchisor Krushna 👋</Title>
          <Paragraph>
            Here's your dashboard overview. You can manage franchisees, view applications, monitor performance reports, and more.
          </Paragraph>
        </Card>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12} lg={8}>
            <Card
              title="Manage Franchisees"
              bordered={false}
              className="shadow-md hover:shadow-xl transition"
              actions={[
                <Button
                  type="link"
                  key="1"
                  onClick={() => navigate("/franchiseeslist")}
                >
                  View List
                </Button>,
              ]}
            >
              <TeamOutlined style={{ fontSize: "2rem", color: "#1890ff" }} />
              <p className="mt-2 text-gray-600">
                View, approve, or remove franchisees under your brand.
              </p>
            </Card>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Card
              title="New Applications"
              bordered={false}
              className="shadow-md hover:shadow-xl transition"
              actions={[
                <Button type="link" key="2">
                  Review Now
                </Button>,
              ]}
            >
              <UserAddOutlined style={{ fontSize: "2rem", color: "#52c41a" }} />
              <p className="mt-2 text-gray-600">
                Check out pending applications from potential franchisees.
              </p>
            </Card>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Card
              title="Performance Reports"
              bordered={false}
              className="shadow-md hover:shadow-xl transition"
              actions={[
                <Button type="link" key="3">
                  View Reports
                </Button>,
              ]}
            >
              <BarChartOutlined style={{ fontSize: "2rem", color: "#faad14" }} />
              <p className="mt-2 text-gray-600">
                Analyze franchisee performance and business metrics.
              </p>
            </Card>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Card
              title="Marketing Materials"
              bordered={false}
              className="shadow-md hover:shadow-xl transition"
              actions={[
                <Button type="link" key="4">
                  Download
                </Button>,
              ]}
            >
              <FileTextOutlined style={{ fontSize: "2rem", color: "#722ed1" }} />
              <p className="mt-2 text-gray-600">
                Share updated marketing kits with your franchise network.
              </p>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FranchisorDashboard;
