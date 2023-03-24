import React, { useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useCreateInvoice } from "../../../../../components/invoice";
import useBreakpoint, { DEVICE } from "../../../../../hooks/useBreakpoint";

const Documents: React.FC = () => {
  const [documentIds, setDocumentIds] = useState<Array<number>>([]);
  const { isLoading, form } = useCreateInvoice();
  const breakpoint = useBreakpoint();

  return (
    <>
      {documentIds?.length > 0 ? (
        <>
          {breakpoint === DEVICE.DESKTOP && (
            <Row gutter={12} style={{ marginBottom: 18 }}>
              <Col span={6}>
                <span>Document Name</span>
              </Col>
              <Col span={18}>
                <span>Document Url</span>
              </Col>
            </Row>
          )}
          {documentIds.map((it, idx) => (
            <Row gutter={12} key={idx}>
              <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                <Form.Item name={`documents.${it}.documentName`}>
                  <Input disabled={isLoading} placeholder="Document Name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={14} xl={14}>
                <Form.Item name={`documents.${it}.documentUrl`}>
                  <Input disabled={isLoading} placeholder="Document Url" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                <Form.Item>
                  <Button
                    shape="circle"
                    onClick={() => {
                      setDocumentIds(
                        [...documentIds].filter((value) => value !== it)
                      );
                      form.setFieldsValue({
                        [`documents.${it}.documentName`]: "",
                        [`documents.${it}.documentUrl`]: "",
                      });
                    }}
                  >
                    <DeleteOutlined />
                  </Button>
                  {idx === documentIds.length - 1 && (
                    <Button
                      shape="circle"
                      onClick={() => {
                        setDocumentIds([
                          ...documentIds,
                          documentIds[documentIds.length - 1] + 1,
                        ]);
                      }}
                      style={{ marginLeft: 10 }}
                    >
                      <PlusOutlined />
                    </Button>
                  )}
                </Form.Item>
              </Col>
            </Row>
          ))}
        </>
      ) : (
        <Button
          shape="circle"
          onClick={() => {
            setDocumentIds([0]);
          }}
        >
          <PlusOutlined />
        </Button>
      )}
    </>
  );
};

export default Documents;
