import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useCreateInvoice } from "../../../../../components/invoice";
import useBreakpoint, { DEVICE } from "../../../../../hooks/useBreakpoint";

interface Props {
  idPrefix?: string;
}

const CustomFields: React.FC<Props> = ({ idPrefix = "" }) => {
  const [customFieldIds, setCustomFieldIds] = useState<Array<number>>([]);
  const { isLoading, form, setItemCustomFields } = useCreateInvoice();
  const breakpoint = useBreakpoint();

  useEffect(() => {
    const getFieldNames = () => {
      let result: { [key: string]: string } = {};
      customFieldIds.forEach((it) => {
        const prefix = getPrefix(it);
        result = { ...result, [`${prefix}.key`]: "", [`${prefix}.value`]: "" };
      });
      return result;
    };
    if (idPrefix) {
      setItemCustomFields(getFieldNames());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customFieldIds?.length]);

  const getPrefix = (id: number) =>
    idPrefix ? `${idPrefix}.customFields.${id}` : `customFields.${id}`;

  return (
    <>
      {customFieldIds?.length > 0 ? (
        <>
          {breakpoint === DEVICE.DESKTOP && (
            <Row gutter={12} style={{ marginBottom: 18 }}>
              <Col span={6}>
                <span>Key</span>
              </Col>
              <Col span={14}>
                <span>Value</span>
              </Col>
            </Row>
          )}
          {customFieldIds.map((it, idx) => {
            const prefix = getPrefix(it);
            return (
              <Row gutter={12} key={idx}>
                <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                  <Form.Item name={`${prefix}.key`}>
                    <Input disabled={isLoading} placeholder="Key" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={14} xl={14}>
                  <Form.Item name={`${prefix}.value`}>
                    <Input disabled={isLoading} placeholder="Value" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                  <Form.Item>
                    <Button
                      shape="circle"
                      onClick={() => {
                        setCustomFieldIds(
                          [...customFieldIds].filter((value) => value !== it)
                        );
                        form.setFieldsValue({
                          [`${prefix}.key`]: "",
                          [`${prefix}.value`]: "",
                        });
                      }}
                    >
                      <DeleteOutlined />
                    </Button>
                    {idx === customFieldIds.length - 1 && (
                      <Button
                        shape="circle"
                        onClick={() => {
                          setCustomFieldIds([
                            ...customFieldIds,
                            customFieldIds[customFieldIds.length - 1] + 1,
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
            );
          })}
        </>
      ) : (
        <Button
          shape="circle"
          onClick={() => {
            setCustomFieldIds([0]);
          }}
        >
          <PlusOutlined />
        </Button>
      )}
    </>
  );
};

export default CustomFields;
