import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { RecentSignups } from "./recent-signup.component";
import { RecentUploads } from "./recent-uploads";
import { useFetchAllScriptsQuery } from "@/slices/scriptApiSlice";
import { useFetchAllUsersQuery } from "@/slices/userApiSlice";

export const DashboardScreen = () => {
  const { data, isLoading } = useFetchAllScriptsQuery("", {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: users,
    isLoading: isUserLoading,
    refetch: refetchUsers,
  } = useFetchAllUsersQuery("", {
    refetchOnMountOrArgChange: true,
  });

  console.log("users, ", users);

  return (
    <>
      <h1 className="mb-4 font-semibold leading-none tracking-tight">
        Hello Koushith 👋
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3  max-w-screen-lg">
        <Card className="bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Earnings
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="10" y1="18" x2="8" y2="18" />
              <line x1="10" y1="6" x2="8" y2="6" />
              <line x1="10" y1="12" x2="8" y2="12" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(data?.allScripts.length * 200).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </div>
            {/* <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card className="bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">All Users</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users?.data?.length}</div>
            {/* <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card className="bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">All Scripts</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.allScripts?.length}</div>
            {/* <p className="text-xs text-muted-foreground">
              +19% from last month
            </p> */}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 max-w-screen-lg mt-4 bg-background">
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Recently uploaded Scripts</CardTitle>
            <CardDescription>
              Showing 5 of {data?.allScripts?.length} scripts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentUploads
              allScripts={data?.allScripts}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>

        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Recent Signups</CardTitle>
            <CardDescription>
              Showing 6 of {users?.data?.length} users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSignups users={users?.data} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};
