import React from "react";
import { Col, DatePicker, Form, Input, Row } from "antd";
import { useCreateInvoice } from "../../../../../components/invoice";

const BasicInformation: React.FC = () => {
  const { isLoading } = useCreateInvoice();
  return (
    <>
      <Row gutter={12}>
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <Form.Item
            label="Invoice Number"
            name="invoiceNumber"
            rules={[
              {
                required: true,
                message: "Please input invoice number!",
              },
            ]}
          >
            <Input disabled={isLoading} placeholder="Invoice Number" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <Form.Item label="Invoice Reference" name="invoiceReference">
            <Input disabled={isLoading} placeholder="Invoice Reference" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <Form.Item label="Description" name="description">
            <Input disabled={isLoading} placeholder="Description" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <Form.Item
            label="Currency"
            name="currency"
            rules={[
              {
                required: true,
                message: "Please input currency!",
              },
            ]}
          >
            <Input disabled={isLoading} placeholder="Currency" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <Form.Item
            label="Invoice Date"
            name="invoiceDate"
            rules={[
              {
                required: true,
                message: "Please input invoice date!",
              },
            ]}
          >
            <DatePicker
              disabled={isLoading}
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <Form.Item
            label="Due Date"
            name="dueDate"
            rules={[
              {
                required: true,
                message: "Please input due date!",
              },
            ]}
          >
            <DatePicker
              disabled={isLoading}
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default BasicInformation;
