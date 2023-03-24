import React, { useState } from "react";
import { Button, Drawer, Dropdown, Layout, MenuProps, Space } from "antd";
import { Outlet, Link } from "react-router-dom";
import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import { Logo } from "../../../../assets";
import { useAuth } from "../../../auth";
import useBreakpoint, { DEVICE } from "../../../../hooks/useBreakpoint";
import SideBar from "../../sideBar";

const { Header, Content } = Layout;

interface Props {}

const DefaultLayout: React.FC<Props> = () => {
  const auth = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const breakpoint = useBreakpoint();
  const items: MenuProps["items"] =
    breakpoint === DEVICE.DESKTOP
      ? [
          {
            key: "1",
            label: "Sign out",
          },
        ]
      : [
          {
            key: "1",
            label: auth?.user?.email,
            style: { fontWeight: "bold" },
            disabled: true,
          },
          { type: "divider" },
          {
            key: "2",
            label: "Sign out",
          },
        ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {};

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Layout>
      <Header
        className="header"
        style={{
          borderBottom: "1px solid rgba(153, 153, 153, 0.1)",
          paddingLeft: breakpoint === DEVICE.DESKTOP ? 50 : 0,
          paddingRight: breakpoint === DEVICE.DESKTOP ? 30 : 0,
          height: 60,
          position: "sticky",
          top: 0,
          zIndex: 999,
          display: "flex",
          justifyContent:
            breakpoint === DEVICE.MOBILE && (!auth.user || auth.isLoadingUser)
              ? "center"
              : "space-between",
        }}
      >
        {breakpoint === DEVICE.MOBILE && auth.user && (
          <>
            <Button
              style={{
                height: "100%",
                backgroundColor: "transparent",
                border: "none",
              }}
              onClick={() => setOpen(!open)}
            >
              <MenuOutlined style={{ fontSize: 30, color: "#fff" }} />
            </Button>
            <Drawer
              title={<Logo />}
              open={open}
              placement="left"
              headerStyle={{ padding: 0, height: 60 }}
              bodyStyle={{ padding: 0 }}
              width={300}
              closeIcon={false}
              onClose={() => setOpen(false)}
            >
              <SideBar onNavigate={() => setOpen(false)} />
            </Drawer>
          </>
        )}
        <Link to="/">
          <Logo />
        </Link>
        {auth.user ? (
          <Dropdown
            menu={menuProps}
            overlayStyle={{
              width: 300,
            }}
          >
            <Button
              type="link"
              style={{
                height: 60,
                width: breakpoint === DEVICE.MOBILE ? 60 : "initial",
                float: "right",
              }}
            >
              <Space
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  color: "#999999",
                }}
              >
                {breakpoint === DEVICE.DESKTOP && auth.user.email}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        ) : (
          <div />
        )}
      </Header>
      <Content
        style={{
          padding: "0",
          height: "100%",
          minHeight: "calc(100vh - 60px)",
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default DefaultLayout;
