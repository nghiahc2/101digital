import React, { useMemo } from "react";
import { Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import dayjs from "dayjs";
import { formatDate } from "../../../utils";
import { FilterValue } from "antd/es/table/interface";
import useBreakpoint, { DEVICE } from "../../../hooks/useBreakpoint";

interface Pagination {
  total: number;
  current: number;
  pageSize: number;
}

interface Props {
  data: DataType[] | undefined;
  pagination: Pagination;
  isLoading: boolean;
  search: (values: any, page: any) => void;
}

export interface DataType {
  invoiceNumber: string;
  referenceNo: string;
  description: string;
  type: string;
  currency: string;
  invoiceDate: string;
  createdAt: string;
  status: any;
  totalAmount: number;
}

const DataTable: React.FC<Props> = ({
  data,
  pagination,
  isLoading,
  search,
}) => {
  const breakpoint = useBreakpoint();
  const columns: ColumnsType<DataType> = useMemo(
    () => [
      {
        title: "Invoice Number",
        dataIndex: "invoiceNumber",
        key: "invoice_number",
        fixed: "left",
        render: (value: string) => (
          <div style={{ width: breakpoint === DEVICE.DESKTOP ? 180 : 100 }}>
            {value}
          </div>
        ),
      },
      {
        title: "Reference No",
        dataIndex: "referenceNo",
        key: "reference_no",
        responsive: ["lg"],
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        render: (value: string) => <div style={{ width: 180 }}>{value}</div>,
        responsive: ["lg"],
      },
      {
        title: "Currency",
        dataIndex: "currency",
        key: "currency",
        responsive: ["lg"],
      },
      {
        title: "Invoice Date",
        dataIndex: "invoiceDate",
        key: "invoice_date",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (value: any) => value[0]?.key,
        filters: [
          {
            text: "Due",
            value: "Due",
          },
          {
            text: "Overdue",
            value: "Overdue",
          },
          {
            text: "Paid",
            value: "Paid",
          },
        ],
        filterMultiple: false,
      },
      {
        title: "Total Amount",
        dataIndex: "totalAmount",
        key: "total_amount",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "created_date",
        render: (value: any) => formatDate(dayjs(value)),
        sorter: true,
      },
    ],
    [breakpoint]
  );

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: any
  ) => {
    let sortParams = { sortBy: "", ordering: "" };
    if (sorter?.order) {
      sortParams = {
        sortBy: sorter.columnKey.toUpperCase(),
        ordering: sorter.order === "ascend" ? "ASCENDING" : "DESCENDING",
      };
    }
    const values = {
      ...filters,
      ...sortParams,
    };
    const page = { pageNum: pagination.current, pageSize: pagination.pageSize };
    search(values, page);
  };
  return (
    <Table
      columns={columns}
      dataSource={isLoading ? [] : data}
      loading={isLoading}
      rowKey={(record) => `${record.invoiceNumber}`}
      pagination={pagination}
      scroll={{ x: true }}
      onChange={handleTableChange}
    />
  );
};
export default DataTable;
