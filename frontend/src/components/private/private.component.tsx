import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const Private = ({ children }: any) => {
  const { isAuthendicated, userInfo } = useSelector((state) => state.auth);
  console.log("user info from pvt", isAuthendicated);

  return isAuthendicated ? <>{children}</> : <Navigate to={"/auth"} replace />;
};
