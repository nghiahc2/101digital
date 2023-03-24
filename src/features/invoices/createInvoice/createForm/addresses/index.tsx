import React, { useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useCreateInvoice } from "../../../../../components/invoice";
import useBreakpoint, { DEVICE } from "../../../../../hooks/useBreakpoint";

const Addresses: React.FC = () => {
  const [addressIds, setAddressIds] = useState<Array<number>>([]);
  const { isLoading, form } = useCreateInvoice();
  const breakpoint = useBreakpoint();

  return (
    <>
      {addressIds?.length > 0 ? (
        <>
          {breakpoint === DEVICE.DESKTOP && (
            <Row gutter={12} style={{ marginBottom: 18 }}>
              <Col span={4}>
                <span>Premise</span>
              </Col>
              <Col span={4}>
                <span>Country Code</span>
              </Col>
              <Col span={4}>
                <span>Postcode</span>
              </Col>
              <Col span={4}>
                <span>County</span>
              </Col>
              <Col span={4}>
                <span>City</span>
              </Col>
            </Row>
          )}

          {addressIds.map((it, idx) => (
            <Row gutter={12} key={idx}>
              <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                <Form.Item name={`customer.addresses.${it}.premise`}>
                  <Input disabled={isLoading} placeholder="Premise" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                <Form.Item name={`customer.addresses.${it}.countryCode`}>
                  <Input disabled={isLoading} placeholder="Country Code" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                <Form.Item name={`customer.addresses.${it}.postcode`}>
                  <Input disabled={isLoading} placeholder="Postcode" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                <Form.Item name={`customer.addresses.${it}.county`}>
                  <Input disabled={isLoading} placeholder="County" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                <Form.Item name={`customer.addresses.${it}.city`}>
                  <Input disabled={isLoading} placeholder="City" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                <Form.Item>
                  <Button
                    shape="circle"
                    onClick={() => {
                      setAddressIds(
                        [...addressIds].filter((value) => value !== it)
                      );
                      form.setFieldsValue({
                        [`customer.addresses.${it}.premise`]: "",
                        [`customer.addresses.${it}.countryCode`]: "",
                        [`customer.addresses.${it}.postcode`]: "",
                        [`customer.addresses.${it}.county`]: "",
                        [`customer.addresses.${it}.city`]: "",
                      });
                    }}
                  >
                    <DeleteOutlined />
                  </Button>
                  {idx === addressIds.length - 1 && (
                    <Button
                      shape="circle"
                      onClick={() => {
                        setAddressIds([
                          ...addressIds,
                          addressIds[addressIds.length - 1] + 1,
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
            setAddressIds([0]);
          }}
        >
          <PlusOutlined />
        </Button>
      )}
    </>
  );
};

export default Addresses;
