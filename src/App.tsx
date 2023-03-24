import React, { useRef } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useAuth } from "./components/auth";
import DefaultLayout from "./components/base/layout/defaultLayout";
import Login from "./features/login";
import InvoiceList from "./features/invoices";
import { fetchUserData } from "./utils";
import ProtectedLayout from "./components/base/layout/protectedLayout";
import Home from "./features/home";
import CreateInvoice from "./features/invoices/createInvoice";

const App: React.FC = () => {
  const auth = useAuth();
  const mountedRef = useRef(true);

  React.useEffect(() => {
    if (!auth.user && mountedRef.current) {
      mountedRef.current = false;
      fetchUserData()
        .then((data) => auth.setUser(data))
        .catch((e) => {})
        .finally(() => auth.setIsLoadingUser(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Home />}></Route>
        <Route path="invoices" element={<ProtectedLayout />}>
          <Route index element={<InvoiceList />} />
          <Route path="create" element={<CreateInvoice />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
