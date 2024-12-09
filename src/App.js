import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { Routes, Route, Link } from "react-router-dom"; // Updated for React Router v6
import axios from 'axios';
import Dashboard from './components/Dashboard'; // Assuming Dashboard is in the components folder
import EquipmentPage from "./components/EquipmentPage"; // Assuming EquipmentPage is in the components folder

const { Header, Content, Sider } = Layout;

const App = () => {
  const [equipment, setEquipment] = useState([]);
  const [projectData, setProjectData] = useState({
    projectTitle: "",
    designerName: "",
    department: "",
    screenMFR: "",
    date: "",
  });

  // Fetch equipment data on mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/equipment")
      .then((response) => {
        setEquipment(response.data);
      })
      .catch((error) => console.error("Error fetching equipment data:", error));
  }, []);

  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ padding: 0, background: "#001529" }}>
        <div style={{ color: "white", fontSize: "20px", padding: "0 20px" }}>
          LED Installation Dashboard
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu mode="inline" defaultSelectedKeys={["dashboard"]} style={{ height: "100%", borderRight: 0 }}>
            <Menu.Item key="dashboard">
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="equipment">
              <Link to="/equipment">Equipment</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content style={{ padding: "20px", minHeight: 280 }}>
            <Routes>
              <Route path="/" element={<Dashboard equipment={equipment} projectData={projectData} setProjectData={setProjectData} />} />
              <Route path="/equipment" element={<EquipmentPage equipment={equipment} />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
