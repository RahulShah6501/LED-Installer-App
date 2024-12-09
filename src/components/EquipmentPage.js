import React from "react";
import { Table } from "antd";

const EquipmentPage = ({ equipment }) => {
  const columns = [
    {
      title: "Screen MFR",
      dataIndex: "Screen MFR",
      key: "screenMFR",
    },
    {
      title: "Make",
      dataIndex: "Make",
      key: "make",
    },
    {
      title: "Screen Size",
      dataIndex: "Screen Size",
      key: "screenSize",
    },
    {
      title: "Height",
      dataIndex: "Height",
      key: "height",
    },
    {
      title: "Width",
      dataIndex: "Width",
      key: "width",
    },
    {
      title: "Depth",
      dataIndex: "Depth",
      key: "depth",
    },
    {
      title: "Weight (LBS)",
      dataIndex: "Weight (LBS)",
      key: "weight",
    },
  ];

  return (
    <div style={{ padding: "20px", background: "#fff" }}>
      <h1>Equipment</h1>
      <Table dataSource={equipment} columns={columns} rowKey="Screen MFR" />
    </div>
  );
};

export default EquipmentPage;
