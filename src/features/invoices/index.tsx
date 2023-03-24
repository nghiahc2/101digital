import React, { useRef, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  notification,
  Row,
  Space,
  Typography,
} from "antd";
import {
  ReloadOutlined,
  SearchOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { searchInvoice, SearchInvoiceParam } from "../../apis/invoice";
import { formatDate } from "../../utils";
import DataTable, { DataType } from "./dataTable";
import { Link } from "react-router-dom";
import useBreakpoint, { DEVICE } from "../../hooks/useBreakpoint";

const { Title } = Typography;

interface Props {}

const InvoiceList: React.FC<Props> = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<DataType[]>();
  const mountedRef = useRef(true);
  const [pagination, setPagination] = useState<any>({
    total: 0,
    current: 0,
    pageSize: 0,
  });
  const [searchParams, setSearchParams] = useState<SearchInvoiceParam>({});
  const breakpoint = useBreakpoint();

  React.useEffect(() => {
    if (mountedRef.current) {
      mountedRef.current = false;
      getInvoices({}, { pageNum: 1, pageSize: 10 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInvoices = async (values: any, page: any) => {
    try {
      const params = {
        ...searchParams,
        ...values,
        ...page,
      };

      setIsLoading(true);
      const response = await searchInvoice(params);
      const { data, paging } = response?.data || {};
      if (data) {
        setData(data);
        setPagination({
          current: paging?.pageNumber,
          pageSize: paging?.pageSize,
          total: paging?.totalRecords,
        });
        setSearchParams(params);
      }
    } catch (e: any) {
      setData([]);
      setPagination({
        current: 0,
        pageSize: 0,
        total: 0,
      });
      setSearchParams({});
      notification.error({
        message: e?.response?.data?.errors?.[0]?.message,
        description: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (values: any) => {
    getInvoices(
      {
        ...values,
        fromDate: values.fromDate
          ? formatDate(values.fromDate, "YYYY-MM-DD")
          : "",
        toDate: values.toDate ? formatDate(values.toDate, "YYYY-MM-DD") : "",
      },
      {}
    );
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
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
          <Breadcrumb.Item>Invoice List</Breadcrumb.Item>
        </Breadcrumb>
        <Title level={4} style={{ marginTop: 10, marginBottom: 0 }}>
          Invoice List
        </Title>
      </Card>
      <Card
        title="Search Criteria"
        style={{ marginTop: 10 }}
        bodyStyle={{
          padding: breakpoint === DEVICE.DESKTOP ? "12px 24px" : "12px",
        }}
        headStyle={{
          padding: breakpoint === DEVICE.DESKTOP ? "0px 24px" : "0 12px",
        }}
      >
        <Form
          name="search_criteria"
          form={form}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
              <Form.Item label="Keyword" name="keyword">
                <Input disabled={isLoading} placeholder="e.g. INV123456" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
              <Form.Item label="Invoice Date From" name="fromDate">
                <DatePicker disabled={isLoading} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
              <Form.Item label="Invoice Date To" name="toDate">
                <DatePicker disabled={isLoading} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="end" gutter={20}>
            <Col>
              <Form.Item style={{ margin: 0 }}>
                <Button
                  disabled={isLoading}
                  style={{ height: 40, width: 120 }}
                  icon={<ReloadOutlined />}
                  onClick={() => form.resetFields()}
                >
                  Clear
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
                  icon={<SearchOutlined />}
                >
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card
        style={{ marginTop: 10, marginBottom: 10 }}
        bodyStyle={{
          padding: breakpoint === DEVICE.DESKTOP ? "12px 24px" : "12px",
        }}
      >
        <DataTable
          data={data}
          pagination={pagination}
          isLoading={isLoading}
          search={getInvoices}
        />
      </Card>
    </Space>
  );
};

export default InvoiceList;
