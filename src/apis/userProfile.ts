import { axiosInstance } from "../helpers/httpUtility";

const getUserProfile = async () => {
  return await axiosInstance.get("membership-service/1.2.0/users/me");
};

export { getUserProfile };
