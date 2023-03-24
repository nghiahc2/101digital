import axios from "axios";

export interface LoginPayload {
  username: string;
  password: string;
}

const login = async (data: LoginPayload) => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const payload = {
    client_id: "oO8BMTesSg9Vl3_jAyKpbOd2fIEa",
    client_secret: "0Exp4dwqmpON_ezyhfm0o_Xkowka",
    grant_type: "password",
    scope: "openid",
    ...data,
  };

  return await axios.post(
    "https://sandbox.101digital.io/token?tenantDomain=carbon.super",
    payload,
    {
      headers,
    }
  );
};

export { login };
