import React from "react";
import { Card, Row, Col, Typography, Button, Tag, Space } from "antd";
import { DownloadOutlined, FileDoneOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

// Sample data for marketing materials
const marketingMaterials = [
  {
    title: "Franchisee Marketing Kit",
    description: "Complete marketing materials including brochures, flyers, templates, and promotional content.",
    file: "Franchisee_Marketing_Kit.zip",
    category: "Full Kit",
    status: "Available",
  },
  {
    title: "Brand Guidelines",
    description: "Official brand guidelines for maintaining brand consistency across franchisees.",
    file: "Brand_Guidelines.pdf",
    category: "Documentation",
    status: "Available",
  },
  {
    title: "Promotional Banners",
    description: "High-quality banners for online and offline promotions.",
    file: "Promotional_Banners.zip",
    category: "Graphics",
    status: "Available",
  },
  {
    title: "Franchisee Training Videos",
    description: "Training videos for new franchisees to understand brand values and operations.",
    file: "Training_Videos.mp4",
    category: "Video Content",
    status: "Coming Soon",
  },
];

const MarketingMaterials = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <Card className="shadow-lg rounded-lg mb-6">
          <Title level={3}>Marketing Materials</Title>
          <Text>
            Here is the collection of marketing materials available for download. Share these resources with your franchise network.
          </Text>
        </Card>

        {/* Marketing Materials List */}
        <Row gutter={[24, 24]}>
          {marketingMaterials.map((item) => (
            <Col xs={24} sm={12} lg={8} key={item.title}>
              <Card
                bordered={false}
                hoverable
                className="shadow-md hover:shadow-xl transition-all duration-300 rounded-lg"
                title={item.title}
                extra={
                  item.status === "Available" ? (
                    <Button
                      type="primary"
                      icon={<DownloadOutlined />}
                      href={`/downloads/${item.file}`}
                      target="_blank"
                    >
                      Download
                    </Button>
                  ) : (
                    <Tag color="orange">{item.status}</Tag>
                  )
                }
              >
                <Space direction="vertical" size="small" style={{ width: "100%" }}>
                  <Text strong>Category:</Text> {item.category}
                  <Text strong>Description:</Text> {item.description}
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default MarketingMaterials;
