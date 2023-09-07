import { useSelector } from "react-redux";

export const useIsAdmin = () => {
  const { userInfo } = useSelector((state) => state?.auth);
  return userInfo?.isAdmin;
};
