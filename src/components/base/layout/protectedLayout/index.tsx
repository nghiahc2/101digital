import { Layout } from "antd";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useBreakpoint, { DEVICE } from "../../../../hooks/useBreakpoint";
import { useAuth } from "../../../auth";
import LoadingIndicator from "../../loadingIndicator";
import SideBar from "../../sideBar";

const { Sider, Content } = Layout;

interface Props {
  children?: React.ReactNode;
}
const ProtectedLayout: React.FC<Props> = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  const breakpoint = useBreakpoint();

  if (auth.isLoadingUser) {
    return <LoadingIndicator />;
  }

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <Layout
      style={{
        height: "100%",
        minHeight: "calc(100vh - 60px)",
      }}
    >
      {breakpoint === DEVICE.DESKTOP && (
        <Sider width={280} theme="light">
          <SideBar />
        </Sider>
      )}
      <Content
        style={{ padding: breakpoint === DEVICE.DESKTOP ? "0 24px" : "0 10px" }}
      >
        {children ? children : <Outlet />}
      </Content>
    </Layout>
  );
};

export default ProtectedLayout;
