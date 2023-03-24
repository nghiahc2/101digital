import React from "react";
import { Col, Form, Input, Row } from "antd";
import { useCreateInvoice } from "../../../../../components/invoice";

const Bank: React.FC = () => {
  const { isLoading } = useCreateInvoice();
  return (
    <>
      <Row gutter={12}>
        <Col xs={24} sm={6} md={6} lg={6} xl={6}>
          <Form.Item label="Bank ID" name="bankAccount.bankId">
            <Input disabled={isLoading} placeholder="Bank ID" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={6} md={6} lg={6} xl={6}>
          <Form.Item label="Sort Code" name="bankAccount.sortCode">
            <Input disabled={isLoading} placeholder="Sort Code" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={6} md={6} lg={6} xl={6}>
          <Form.Item label="Account Number" name="bankAccount.accountNumber">
            <Input disabled={isLoading} placeholder="Account Number" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={6} md={6} lg={6} xl={6}>
          <Form.Item label="Account Name" name="bankAccount.accountName">
            <Input disabled={isLoading} placeholder="Account Name" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default Bank;
