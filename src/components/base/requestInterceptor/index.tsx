import React from "react";
import { useNavigate } from "react-router-dom";
import { _setupInterceptors } from "../../../helpers/httpUtility";
import { useAuth } from "../../auth";

const RequestInterceptor: React.FC = () => {
  let navigate = useNavigate();
  const [ran, setRan] = React.useState(false);
  const { setUser } = useAuth();
  React.useEffect(() => {
    if (!ran) {
      _setupInterceptors(navigate, setUser);
      setRan(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};

export default RequestInterceptor;
