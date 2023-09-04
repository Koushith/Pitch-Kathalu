import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchAllUsersQuery } from "@/slices/usersApiSlice";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "cmdk";
import { ChevronDownIcon, Command } from "lucide-react";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

export const UsersScreen = () => {
  const { data, isLoading } = useFetchAllUsersQuery("");
  const navigate = useNavigate();

  const navigateToDetails = (userId: string) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="flex ">
      <Card className="bg-background  w-full lg:w-1/2 ">
        <CardHeader>
          <CardTitle>All OG Memers</CardTitle>
          <CardDescription>
            Search, collab and much more - coming soon
          </CardDescription>
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
            {data.data.map(
              (user: {
                _id: Key;
                avatar: string;
                displayName: string;
                email: string;
                uid: string;
              }) => (
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
                        <p className="text-sm text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <>
                      <>
                        <Button
                          variant="outline"
                          className="ml-auto"
                          onClick={() => navigateToDetails(user.uid)}
                        >
                          View{" "}
                          {/* <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" /> */}
                        </Button>
                      </>
                    </>
                  </div>
                </CardContent>
              )
            )}
          </div>
        )}
      </Card>
    </div>
  );
};
