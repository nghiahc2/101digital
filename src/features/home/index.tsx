import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const Home: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/invoices");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div />;
};
export default Home;
