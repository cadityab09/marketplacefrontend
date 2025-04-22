import React from "react";
import { Card, Row, Col, Typography, Tag, Space } from "antd";

const { Title, Text } = Typography;

const performanceData = [
  {
    name: "Franchisee A",
    location: "Pune",
    lastMonthIncome: "₹1,25,000",
    sales: 300,
    performance: "Good",
  },
  {
    name: "Franchisee B",
    location: "Mumbai",
    lastMonthIncome: "₹78,500",
    sales: 150,
    performance: "Average",
  },
  {
    name: "Franchisee C",
    location: "Delhi",
    lastMonthIncome: "₹1,42,200",
    sales: 350,
    performance: "Excellent",
  },
];

const PerformanceReports = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <Card className="shadow-lg rounded-lg mb-6">
          <Title level={3}>Performance Reports</Title>
          <Text>
            Below are the performance details of each franchisee. You can analyze their sales and income for the last month.
          </Text>
        </Card>

        {/* Performance Report Cards */}
        <Row gutter={[24, 24]}>
          {performanceData.map((item, idx) => (
            <Col xs={24} sm={12} lg={8} xl={6} key={idx}>
              <Card
                bordered={false}
                className="shadow-md hover:shadow-xl transition-all duration-300 rounded-lg"
                title={
                  <Space direction="horizontal" size="middle">
                    <Text strong style={{ fontSize: 16 }}>
                      {item.name}
                    </Text>
                    <Tag
                      color={
                        item.performance === "Excellent"
                          ? "green"
                          : item.performance === "Good"
                          ? "blue"
                          : "orange"
                      }
                    >
                      {item.performance}
                    </Tag>
                  </Space>
                }
              >
                <Space direction="vertical" size="small" style={{ width: "100%" }}>
                  <Text strong>Location:</Text> {item.location}
                  <Text strong>Last Month Income:</Text> {item.lastMonthIncome}
                  <Text strong>Sales:</Text> {item.sales}
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default PerformanceReports;
