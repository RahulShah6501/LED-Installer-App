import React, { useRef } from "react";
import { Layout, Button, Form, Input, Select, Typography, Card } from "antd";
import { exportToPDF } from '../utils/pdfUtils'; // Ensure this utility is implemented properly
import html2canvas from "html2canvas";
import DrawingCanvas from "./DrawingCanvas";

const { Content } = Layout;
const { Text } = Typography;
const { Option } = Select;

const Dashboard = ({ equipment, projectData, setProjectData }) => {
  const canvasRef = useRef(null); // Reference to the drawing canvas

  // Handle the form field changes
  const handleChange = (field, value) => {
    setProjectData({ ...projectData, [field]: value });
  };

  const captureDiagram = async () => {
    // Capture the diagram canvas and return as base64 image
    if (canvasRef.current) {
      const canvasElement = canvasRef.current;
      const canvasImage = await html2canvas(canvasElement, { useCORS: true });
      return canvasImage.toDataURL(); // Return base64 image
    } else {
      console.error("Canvas is not available.");
      return null;
    }
  };

  const handleSaveProjectDetails = async () => {
    // Capture the canvas image
    const diagramImage = await captureDiagram();
    
    if (diagramImage) {
      // Call the exportToPDF function with project data and the captured image
      exportToPDF(projectData, diagramImage);
    } else {
      console.error("Failed to capture the diagram.");
    }
  };

  return (
    <Content style={{ padding: "24px", minHeight: 280 }}>
      <Card title="Project Configuration" bordered={false} style={{ marginBottom: 24 }}>
        <Form layout="vertical" style={{ maxWidth: "600px" }}>
          <Form.Item label="Project Title">
            <Input
              value={projectData.projectTitle}
              onChange={(e) => handleChange('projectTitle', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Designer Name">
            <Input
              value={projectData.designerName}
              onChange={(e) => handleChange('designerName', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Department">
            <Input
              value={projectData.department}
              onChange={(e) => handleChange('department', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Screen MFR">
            <Select
              value={projectData.screenMFR}
              onChange={(value) => handleChange('screenMFR', value)}
              style={{ width: "100%" }}
            >
              {equipment.map((item) => (
                <Option key={item["Screen MFR"]} value={item["Screen MFR"]}>
                  {item["Screen MFR"]}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Date">
            <Input
              type="date"
              value={projectData.date}
              onChange={(e) => handleChange('date', e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" block onClick={handleSaveProjectDetails}>
              Save Project Details and Download PDF
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Project Diagram" bordered={false} style={{ marginBottom: 24 }}>
        {projectData.screenMFR ? (
          <DrawingCanvas selectedModel={projectData.screenMFR} ref={canvasRef} />
        ) : (
          <Text>Select a Screen MFR to view the diagram</Text>
        )}
      </Card>
    </Content>
  );
};

export default Dashboard;
