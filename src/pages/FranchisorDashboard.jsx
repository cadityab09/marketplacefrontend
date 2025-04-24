import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row, Typography, Button } from "antd";
import {
  UserAddOutlined,
  TeamOutlined,
  BarChartOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const FranchisorDashboard = () => {
  const navigate = useNavigate();

  const dashboardCards = [
    {
      title: "Manage Franchisees",
      description: "View, approve, or remove franchisees under your brand.",
      icon: <TeamOutlined style={{ fontSize: "2rem", color: "#1890ff" }} />,
      buttonText: "View List",
      route: "/franchiseeslist",
    },
    {
      title: "New Applications",
      description: "Check out pending applications from potential franchisees.",
      icon: <UserAddOutlined style={{ fontSize: "2rem", color: "#52c41a" }} />,
      buttonText: "Add Application",
      route: "/applications",
    },
    // {
    //   title: "Performance Reports",
    //   description: "Analyze franchisee performance and business metrics.",
    //   icon: <BarChartOutlined style={{ fontSize: "2rem", color: "#faad14" }} />,
    //   buttonText: "View Reports",
    //   route: "/reports",  // Link to the performance reports page
    // },
    // {
    //   title: "Marketing Materials",
    //   description: "Share updated marketing kits with your franchise network.",
    //   icon: <FileTextOutlined style={{ fontSize: "2rem", color: "#722ed1" }} />,
    //   buttonText: "Download",
    //   route: "/materials",
    // },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Card */}
        <Card className="mb-6 shadow-lg rounded-lg">
          <Title level={2}>Welcome, Franchisor Krushna 👋</Title>
          <Paragraph>
            Here's your dashboard overview. You can manage franchisees, view applications, monitor performance reports, and more.
          </Paragraph>
        </Card>

        {/* Grid Cards */}
        <Row gutter={[24, 24]}>
          {dashboardCards.map((card, idx) => (
            <Col xs={24} sm={12} lg={8} xl={6} key={idx}>
              <Card
                title={card.title}
                bordered={false}
                className="shadow-md hover:shadow-xl transition-all duration-300 rounded-lg"
                actions={[
                  <Button
                    type="link"
                    key="action"
                    onClick={() => navigate(card.route)}
                  >
                    {card.buttonText}
                  </Button>,
                ]}
              >
                {card.icon}
                <p className="mt-3 text-gray-600">{card.description}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default FranchisorDashboard;
