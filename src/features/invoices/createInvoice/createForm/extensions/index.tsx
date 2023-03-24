import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useCreateInvoice } from "../../../../../components/invoice";
import useBreakpoint, { DEVICE } from "../../../../../hooks/useBreakpoint";

interface Props {
  idPrefix?: string;
}

const Extensions: React.FC<Props> = ({ idPrefix = "" }) => {
  const [extensionIds, setExtensionIds] = useState<Array<number>>([]);
  const { isLoading, form, setItemExtensionFields } = useCreateInvoice();
  const breakpoint = useBreakpoint();

  useEffect(() => {
    const getFieldNames = () => {
      let result: { [key: string]: string } = {};
      extensionIds.forEach((it) => {
        const prefix = getPrefix(it);
        result = {
          ...result,
          [`${prefix}.addDeduct`]: "",
          [`${prefix}.type`]: "",
          [`${prefix}.value`]: "",
          [`${prefix}.name`]: "",
        };
      });
      return result;
    };
    if (idPrefix) {
      setItemExtensionFields(getFieldNames());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extensionIds?.length]);

  const getPrefix = (id: number) =>
    idPrefix ? `${idPrefix}.extensions.${id}` : `extensions.${id}`;

  return (
    <>
      {extensionIds.length > 0 ? (
        <>
          {breakpoint === DEVICE.DESKTOP && (
            <Row gutter={12} style={{ marginBottom: 18 }}>
              <Col span={5}>
                <span>Add Deduct</span>
              </Col>
              <Col span={5}>
                <span>Type</span>
              </Col>
              <Col span={5}>
                <span>Value</span>
              </Col>
              <Col span={5}>
                <span>Name</span>
              </Col>
            </Row>
          )}
          {extensionIds.map((it, idx) => {
            const prefix = getPrefix(it);
            return (
              <Row gutter={12} key={idx}>
                <Col xs={24} sm={24} md={24} lg={5} xl={5}>
                  <Form.Item name={`${prefix}.addDeduct`}>
                    <Select
                      style={{ width: "100%" }}
                      options={[
                        { value: "ADD", label: "ADD" },
                        { value: "DEDUCT", label: "DEDUCT" },
                      ]}
                      placeholder="Add Deduct"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={5} xl={5}>
                  <Form.Item name={`${prefix}.type`}>
                    <Select
                      style={{ width: "100%" }}
                      options={[
                        { value: "PERCENTAGE", label: "PERCENTAGE" },
                        { value: "FIXED_VALUE", label: "FIXED_VALUE" },
                      ]}
                      placeholder="Type"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={5} xl={5}>
                  <Form.Item name={`${prefix}.value`}>
                    <Input disabled={isLoading} placeholder="Value" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={5} xl={5}>
                  <Form.Item name={`${prefix}.name`}>
                    <Input disabled={isLoading} placeholder="Name" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                  <Form.Item>
                    <Button
                      shape="circle"
                      onClick={() => {
                        setExtensionIds(
                          [...extensionIds].filter((value) => value !== it)
                        );
                        form.setFieldsValue({
                          [`${prefix}.addDeduct`]: "",
                          [`${prefix}.type`]: "",
                          [`${prefix}.value`]: "",
                          [`${prefix}.name`]: "",
                        });
                      }}
                    >
                      <DeleteOutlined />
                    </Button>
                    {idx === extensionIds.length - 1 && (
                      <Button
                        shape="circle"
                        onClick={() => {
                          setExtensionIds([
                            ...extensionIds,
                            extensionIds[extensionIds.length - 1] + 1,
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
            setExtensionIds([0]);
          }}
        >
          <PlusOutlined />
        </Button>
      )}
    </>
  );
};

export default Extensions;
