import React from "react";
import { FileTextOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  onNavigate?: () => void;
}
const items: MenuProps["items"] = [
  {
    label: "Invoices",
    key: "/",
    icon: <FileTextOutlined />,
    children: [
      {
        label: "Invoice List",
        key: "/invoices",
      },
      {
        label: "Create Invoice",
        key: "/invoices/create",
      },
    ],
  },
];

const SideBar: React.FC<Props> = ({ onNavigate = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const onClick: MenuProps["onClick"] = (e) => {
    onNavigate();
    navigate(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[location.pathname]}
      defaultOpenKeys={["/"]}
      mode="inline"
      items={items}
    />
  );
};

export default SideBar;
