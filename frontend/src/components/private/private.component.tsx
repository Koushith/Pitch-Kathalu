import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const Private = ({ children }: any) => {
  const { isAuthendicated } = useSelector((state) => state.auth);
  console.log("user info from pvt", isAuthendicated);
  console.log(isAuthendicated);

  return isAuthendicated ? <>{children}</> : <Navigate to={"/auth"} replace />;
};
