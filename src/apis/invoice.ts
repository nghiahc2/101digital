import { buildUrlParameter } from "../utils";
import { axiosInstance } from "../helpers/httpUtility";

export interface SearchInvoiceParam {
  pageNum?: number;
  pageSize?: number;
  fromDate?: string;
  toDate?: string;
  sortBy?: string;
  ordering?: string;
  status?: string;
  keyword?: string;
}
const searchInvoice = async (searchParam: SearchInvoiceParam) => {
  const querystring = buildUrlParameter(searchParam as Record<string, string>);
  return await axiosInstance.get(
    `invoice-service/1.0.0/invoices?${querystring}`
  );
};

const createInvoice = async (payload: any) => {
  const headers = {
    "Content-Type": "application/json",
    //"Operation-Mode": "SYNC", - CORS issue
  };
  return await axiosInstance.post(`invoice-service/2.0.0/invoices`, payload, {
    headers,
  });
};

export { searchInvoice, createInvoice };
