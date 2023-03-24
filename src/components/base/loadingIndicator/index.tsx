import { Space, Spin } from "antd";
import React from "react";

const LoadingIndicator: React.FC = () => {
  return (
    <Space
      style={{
        width: "100%",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Spin size="large" />
    </Space>
  );
};

export default LoadingIndicator;
