import { useFetchProfileByIdQuery } from "@/slices/userApiSlice";
import { useSelector } from "react-redux";

export const ProfileScreen = () => {
  const user = useSelector((state) => state.auth.userInfo);
  console.log(user.uid);
  const uid = user.uid;

  const { data, isLoading } = useFetchProfileByIdQuery(uid, {
    refetchOnMountOrArgChange: true,
  });

  console.log("user-infooooo??????---", data, isLoading);
  return <>Profile</>;
};
