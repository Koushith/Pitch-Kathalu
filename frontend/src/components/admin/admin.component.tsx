import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const Admin = ({ children }: any) => {
  const { userInfo } = useSelector((state) => state?.auth);

  console.log("user info---", userInfo?.isAdmin);

  return userInfo?.isAdmin && <>{children}</>;
};
