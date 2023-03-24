import React from "react";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/auth";
import { LoginPayload } from "../../apis/auth";
import { fetchUserData } from "../../utils";
import useBreakpoint, { DEVICE } from "../../hooks/useBreakpoint";

const { Title } = Typography;

interface Props {}

const Login: React.FC<Props> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const from = location.state?.from?.pathname || "/";
  const isLoading = auth.isLogging || auth.isLoadingUser;
  const breakpoint = useBreakpoint();

  React.useEffect(() => {
    if (auth.user) {
      navigate(from, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  const handleSubmit = (values: LoginPayload) => {
    auth.signin(values, () => {
      auth.setIsLoadingUser(true);
      fetchUserData()
        .then((data) => auth.setUser(data))
        .catch((e) => {})
        .finally(() => auth.setIsLoadingUser(false));
    });
  };

  return (
    <Row justify="center" align="middle">
      <Col xs={24} sm={24} md={24} lg={8} xl={8}>
        <Card
          style={{
            width: breakpoint === DEVICE.DESKTOP ? 450 : "100%",
            height:
              breakpoint === DEVICE.DESKTOP ? "initial" : "calc(100vh - 60px)",
            marginTop: breakpoint === DEVICE.DESKTOP ? 50 : 0,
            textAlign: "center",
          }}
        >
          <Title level={3} style={{ textAlign: "left" }}>
            Welcome User!
          </Title>
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 800 }}
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input disabled={isLoading} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password disabled={isLoading} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isLoading}
                loading={isLoading}
                style={{ height: 40, width: "100%" }}
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
