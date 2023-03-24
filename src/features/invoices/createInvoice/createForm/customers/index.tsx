import React from "react";
import { Col, Collapse, Form, Input, Row } from "antd";
import Addresses from "../addresses";
import { useCreateInvoice } from "../../../../../components/invoice";
import PanelHeader from "../../../../../components/base/panelHeader";

const { Panel } = Collapse;

const Customer: React.FC = () => {
  const { isLoading } = useCreateInvoice();
  return (
    <>
      <Row gutter={12}>
        <Col xs={24} sm={6} md={6} lg={6} xl={6}>
          <Form.Item label="First Name" name="customer.firstName">
            <Input disabled={isLoading} placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={6} md={6} lg={6} xl={6}>
          <Form.Item label="Last Name" name="customer.lastName">
            <Input disabled={isLoading} placeholder="Last Name" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={6} md={6} lg={6} xl={6}>
          <Form.Item label="Email" name="customer.contact.email">
            <Input disabled={isLoading} placeholder="Email" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={6} md={6} lg={6} xl={6}>
          <Form.Item label="Mobile Number" name="customer.contact.mobileNumber">
            <Input disabled={isLoading} placeholder="Mobile Number" />
          </Form.Item>
        </Col>
      </Row>
      <Collapse defaultActiveKey={[`customer.addresses`]}>
        <Panel
          header={<PanelHeader text="Addresses" style={{ fontSize: 14 }} />}
          key={`customer.addresses`}
        >
          <Addresses />
        </Panel>
      </Collapse>
    </>
  );
};

export default Customer;
