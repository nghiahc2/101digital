import React, { useState } from "react";
import { Button, Col, Collapse, Form, Input, InputNumber, Row } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import CustomFields from "../customFields";
import Extensions from "../extensions";
import { useCreateInvoice } from "../../../../../components/invoice";
import PanelHeader from "../../../../../components/base/panelHeader";

const { Panel } = Collapse;

const Items: React.FC = () => {
  const [itemIds, setItemIds] = useState<Array<number>>([0]);
  const { isLoading, form, itemCustomFields, itemExtensionFields } =
    useCreateInvoice();
  return (
    <>
      {itemIds.length > 0 ? (
        itemIds.map((it, idx) => (
          <Collapse
            key={idx}
            defaultActiveKey={`items.${it}`}
            style={
              idx === itemIds.length - 1
                ? { marginBottom: 0 }
                : { marginBottom: 20 }
            }
          >
            <Panel
              collapsible="icon"
              header={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "bold",
                  }}
                >
                  <span>{`Item ${idx + 1}`}</span>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Button
                      shape="circle"
                      onClick={() => {
                        setItemIds(
                          [...itemIds].filter((value) => value !== it)
                        );
                        form.setFieldsValue({
                          [`items.${it}.itemReference`]: "",
                          [`items.${it}.description`]: "",
                          [`items.${it}.quantity`]: "",
                          [`items.${it}.rate`]: "",
                          [`items.${it}.itemName`]: "",
                          [`items.${it}.itemUOM`]: "",
                        });
                        form.setFieldsValue(itemCustomFields);
                        form.setFieldsValue(itemExtensionFields);
                      }}
                    >
                      <DeleteOutlined />
                    </Button>
                    {idx === itemIds.length - 1 && (
                      <Button
                        shape="circle"
                        onClick={() => {
                          setItemIds([
                            ...itemIds,
                            itemIds.length > 0
                              ? itemIds[itemIds.length - 1] + 1
                              : 0,
                          ]);
                        }}
                      >
                        <PlusOutlined />
                      </Button>
                    )}
                  </div>
                </div>
              }
              key={`items.${it}`}
            >
              <Row gutter={12}>
                <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                  <Form.Item
                    label="Item Reference"
                    name={`items.${it}.itemReference`}
                  >
                    <Input disabled={isLoading} placeholder="Item Reference" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                  <Form.Item
                    label="Description"
                    name={`items.${it}.description`}
                  >
                    <Input disabled={isLoading} placeholder="Description" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                  <Form.Item label="Quantity" name={`items.${it}.quantity`}>
                    <InputNumber
                      disabled={isLoading}
                      placeholder="Quantity"
                      min={0}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                  <Form.Item label="Rate" name={`items.${it}.rate`}>
                    <InputNumber
                      disabled={isLoading}
                      placeholder="Rate"
                      min={0}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={12}>
                <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                  <Form.Item label="Item Name" name={`items.${it}.itemName`}>
                    <Input disabled={isLoading} placeholder="Item Name" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                  <Form.Item label="Item UOM" name={`items.${it}.itemUOM`}>
                    <Input disabled={isLoading} placeholder="Item UOM" />
                  </Form.Item>
                </Col>
              </Row>
              <Collapse
                defaultActiveKey={[
                  `items.${it}.customFiels`,
                  `items.${it}.extensions`,
                ]}
              >
                <Panel
                  header={
                    <PanelHeader
                      text="Custom Fields"
                      style={{ fontSize: 14 }}
                    />
                  }
                  key={`items.${it}.customFiels`}
                >
                  <CustomFields idPrefix={`items.${it}`} />
                </Panel>
                <Panel
                  header={
                    <PanelHeader text="Extensions" style={{ fontSize: 14 }} />
                  }
                  key={`items.${it}.extensions`}
                >
                  <Extensions idPrefix={`items.${it}`} />
                </Panel>
              </Collapse>
            </Panel>
          </Collapse>
        ))
      ) : (
        <Button
          shape="circle"
          onClick={() => {
            setItemIds([
              ...itemIds,
              itemIds.length > 0 ? itemIds[itemIds.length - 1] + 1 : 0,
            ]);
          }}
        >
          <PlusOutlined />
        </Button>
      )}
    </>
  );
};

export default Items;
