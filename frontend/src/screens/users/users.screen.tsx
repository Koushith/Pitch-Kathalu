import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { RecentSignups } from "../dashboard/recent-signup.component";
import { useFetchAllUsersQuery } from "@/slices/userApiSlice";

export const UsersScreen = () => {
  const {
    data: users,
    isLoading: isUserLoading,
    refetch: refetchUsers,
  } = useFetchAllUsersQuery("", {
    refetchOnMountOrArgChange: true,
  });
  return (
    <Card className="bg-background max-w-screen-lg">
      <CardHeader>
        <CardTitle>All Users</CardTitle>
        <CardDescription>
          Showing 6 of {users?.data?.length} users
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RecentSignups users={users?.data} />
      </CardContent>
    </Card>
  );
};
