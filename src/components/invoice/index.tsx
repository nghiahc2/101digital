import { Form } from "antd";
import React, { useState } from "react";

interface CreateInvoiceContextType {
  isLoading: boolean;
  setIsLoading: (data: any) => void;
  form: any;
  itemCustomFields: {
    [key: string]: string;
  };
  setItemCustomFields: (data: any) => void;
  itemExtensionFields: {
    [key: string]: string;
  };
  setItemExtensionFields: (data: any) => void;
}

const CreateInvoiceContext = React.createContext<CreateInvoiceContextType>(
  null!
);

const CreateInvoiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [itemCustomFields, setItemCustomFields] = useState<{
    [key: string]: string;
  }>({});
  const [itemExtensionFields, setItemExtensionFields] = useState<{
    [key: string]: string;
  }>({});
  const value = {
    isLoading,
    setIsLoading,
    form,
    itemCustomFields,
    setItemCustomFields,
    itemExtensionFields,
    setItemExtensionFields,
  };

  return (
    <CreateInvoiceContext.Provider value={value}>
      {children}
    </CreateInvoiceContext.Provider>
  );
};

const useCreateInvoice = () => {
  return React.useContext(CreateInvoiceContext);
};

export { CreateInvoiceProvider, useCreateInvoice };
