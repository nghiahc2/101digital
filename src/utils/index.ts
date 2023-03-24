import { Dayjs } from "dayjs";
import pick from "lodash-es/pick";
import { getUserProfile } from "../apis/userProfile";
import { removeLocalStorageItem, setLocalStorageItem } from "../helpers";

const fetchUserData = async () => {
  removeLocalStorageItem("org-token");
  const userResponse = await getUserProfile();
  if (userResponse?.data?.data) {
    setLocalStorageItem(
      "org-token",
      userResponse?.data?.data?.memberships?.[0]?.token
    );
    return pick(userResponse?.data?.data, [
      "userName",
      "email",
      "firstName",
      "lastName",
    ]);
  }
};

const formatDate = (
  value: Dayjs,
  dateFormat: string = "YYYY-MM-DD HH:mm:ss"
) => {
  return value.format(dateFormat);
};

const buildUrlParameter = (searchParam: Record<string, string>) => {
  const params = new URLSearchParams(searchParam);
  let keysForDel: Array<string> = [];
  params.forEach((value, key) => {
    if (value === "" || value === "null" || value === "undefined") {
      keysForDel.push(key);
    }
  });
  keysForDel.forEach((key) => {
    params.delete(key);
  });
  return params.toString();
};

const unflattenObject = (data: any) => {
  let result = {};
  for (let i in data) {
    let keys = i.split(".");
    keys.reduce((acc: any, value, index) => {
      return (
        acc[value] ||
        (acc[value] = isNaN(Number(keys[index + 1]))
          ? keys.length - 1 === index
            ? data[i]
            : {}
          : [])
      );
    }, result);
  }

  return result;
};

export { fetchUserData, formatDate, buildUrlParameter, unflattenObject };
