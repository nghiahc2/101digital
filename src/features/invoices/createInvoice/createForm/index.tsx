import { Button, Col, Collapse, Form, notification, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { SaveOutlined } from "@ant-design/icons";
import { useCreateInvoice } from "../../../../components/invoice";
import { unflattenObject } from "../../../../utils";
import Bank from "./bank";
import BasicInformation from "./basicInformation";
import Customer from "./customers";
import CustomFields from "./customFields";
import Documents from "./documents";
import Extensions from "./extensions";
import Items from "./items";
import PanelHeader from "../../../../components/base/panelHeader";
import { createInvoice } from "../../../../apis/invoice";

const { Panel } = Collapse;

const CreateForm: React.FC = () => {
  const { form, isLoading } = useCreateInvoice();
  const navigate = useNavigate();
  const { setIsLoading } = useCreateInvoice();

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      const payload = {
        invoices: [
          unflattenObject({
            ...values,
            invoiceDate: values.invoiceDate.format("YYYY-MM-DD"),
            dueDate: values.dueDate.format("YYYY-MM-DD"),
          }),
        ],
      };
      const response = await createInvoice(payload);
      if (response?.data) {
        notification.success({
          message: "Create Invoice successfully!",
          description: "",
        });
        navigate("/invoices");
      }
    } catch (e: any) {
      notification.error({
        message: "Something went wrong!",
        description: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      //initialValues={data}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Collapse defaultActiveKey={["basic"]}>
        <Panel header={<PanelHeader text="Basic Information" />} key="basic">
          <BasicInformation />
        </Panel>
        <Panel header={<PanelHeader text="Bank" />} key="bank">
          <Bank />
        </Panel>
        <Panel header={<PanelHeader text="Customer" />} key="customer">
          <Customer />
        </Panel>
        <Panel header={<PanelHeader text="Documents" />} key="documents">
          <Documents />
        </Panel>
        <Panel header={<PanelHeader text="Custom Fields" />} key="customFields">
          <CustomFields />
        </Panel>
        <Panel header={<PanelHeader text="Extensions" />} key="extensions">
          <Extensions />
        </Panel>
        <Panel header={<PanelHeader text="Items" />} key="items">
          <Items />
        </Panel>
      </Collapse>
      <Row justify="end" gutter={20} style={{ marginTop: 20 }}>
        <Col>
          <Form.Item style={{ margin: 0 }}>
            <Button
              disabled={isLoading}
              style={{ height: 40, width: 120 }}
              onClick={() => navigate("/invoices")}
            >
              Cancel
            </Button>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item style={{ margin: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isLoading}
              loading={isLoading}
              style={{ height: 40, width: 120 }}
              icon={<SaveOutlined />}
            >
              Create
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateForm;
