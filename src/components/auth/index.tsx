import React from "react";
import { notification } from "antd";
import { login, LoginPayload } from "../../apis/auth";
import { setLocalStorageItem } from "../../helpers";

interface AuthContextType {
  user: any;
  setUser: (data: any) => void;
  signin: (data: LoginPayload, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
  isLogging: boolean;
  isLoadingUser: boolean;
  setIsLoadingUser: (data: any) => void;
}

const AuthContext = React.createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<any>(null);
  const [isLogging, setIsLogging] = React.useState<boolean>(false);
  const [isLoadingUser, setIsLoadingUser] = React.useState<boolean>(true);

  const signin = async (data: LoginPayload, callback: VoidFunction) => {
    try {
      setIsLogging(true);
      const response: any = await login(data);
      if (response?.data) {
        setLocalStorageItem("access-token", response.data.access_token);
        callback();
      }
    } catch (e: any) {
      notification.error({
        message: e.response.data.error_description,
        description: "",
      });
    } finally {
      setIsLogging(false);
    }
  };

  const signout = (callback: VoidFunction) => {};

  const value = {
    user,
    setUser,
    signin,
    signout,
    isLogging,
    isLoadingUser,
    setIsLoadingUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return React.useContext(AuthContext);
};

export { AuthProvider, useAuth };
