import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Card, Typography } from "antd";
import { CreateInvoiceProvider } from "../../../components/invoice";
import CreateForm from "./createForm";
import useBreakpoint, { DEVICE } from "../../../hooks/useBreakpoint";
import { Link } from "react-router-dom";

const { Title } = Typography;

interface Props {}

const CreateInvoice: React.FC<Props> = () => {
  const breakpoint = useBreakpoint();

  return (
    <div>
      <Card
        style={{ marginTop: 10 }}
        bodyStyle={{
          padding: breakpoint === DEVICE.DESKTOP ? "12px 24px" : "12px",
        }}
      >
        <Breadcrumb>
          <Breadcrumb.Item>
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/invoices">Invoices</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Create Invoice</Breadcrumb.Item>
        </Breadcrumb>
        <Title level={4} style={{ marginTop: 10, marginBottom: 0 }}>
          Create Invoice
        </Title>
      </Card>
      <Card
        style={{ marginTop: 10, marginBottom: 10 }}
        bodyStyle={{
          padding: breakpoint === DEVICE.DESKTOP ? "12px 24px" : "12px",
        }}
      >
        <CreateInvoiceProvider>
          <CreateForm />
        </CreateInvoiceProvider>
      </Card>
    </div>
  );
};

export default CreateInvoice;
