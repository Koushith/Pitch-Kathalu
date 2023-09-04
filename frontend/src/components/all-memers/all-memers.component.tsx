import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useFetchAllUsersQuery,
  useFetchLeaderboardQuery,
} from "@/slices/usersApiSlice";

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { BadgeCheckIcon, ThumbsUp } from "lucide-react";
import { Key } from "react";
import { useNavigate } from "react-router-dom";

export const AllMemers = () => {
  // const { data, isLoading } = useFetchAllUsersQuery("");
  const { data, isLoading } = useFetchLeaderboardQuery("");
  const navigate = useNavigate();
  console.log("all memers", data);
  const navigateToDetails = (userId: string) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="flex ">
      <Card className="bg-background  w-full mt-4 ">
        <CardHeader>
          <CardTitle>Leader Board 🚀</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        {isLoading ? (
          <>
            {new Array(5).fill(5).map((i) => (
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </>
        ) : (
          <div>
            {data.map((user) => (
              <>
                <CardContent className="grid gap-6" key={user._id}>
                  <div className="flex items-center justify-between space-x-4 ">
                    <div className="flex items-center space-x-4">
                      <Avatar
                        className=" rounded-full"
                        style={{
                          borderRadius: "50%",
                          height: "40px",
                          width: "40px",
                        }}
                      >
                        <AvatarImage
                          src={user?.avatar}
                          className="aspect-square h-full w-full"
                          style={{
                            borderRadius: "50%",
                            height: "40px",
                            width: "40px",
                          }}
                        />
                        <AvatarFallback
                          style={{
                            borderRadius: "50%",
                            height: "40px",
                            width: "40px",
                          }}
                        >
                          OM
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {user?.displayName}
                        </p>
                        <div className="flex space-x-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center">
                            <BadgeCheckIcon className="mr-1 h-3 w-3" />
                            {user?.count ? `${user?.count}` : "0"}
                          </div>

                          <div className="flex items-center">
                            Score - {user?.score}
                          </div>
                        </div>
                      </div>
                    </div>
                    <>
                      <>
                        <Button
                          variant="outline"
                          className="ml-auto"
                          onClick={() => navigateToDetails(user?.userId)}
                        >
                          View{" "}
                          {/* <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" /> */}
                        </Button>
                      </>
                    </>
                  </div>
                </CardContent>
              </>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
