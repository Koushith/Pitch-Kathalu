import { PostCard } from "@/components/post-card/post-card.component";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { PopoverContent } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { useFetchOnePostQuery } from "@/slices/postApiSlice";
import { useFetchProfileByIdQuery } from "@/slices/usersApiSlice";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "cmdk";
import { ChevronDownIcon, Command, MessageSquareIcon } from "lucide-react";
import { useParams } from "react-router-dom";

export const UserDetailScreen = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const { data, isLoading } = useFetchProfileByIdQuery(id);
  console.log("user-normal", data);
  const { displayName, avatar, email } = data?.data || {};
  const { data: Data, isLoading: isPostLoading } = useFetchOnePostQuery(
    data?.data?._id
  );
  console.log("info----", Data);

  console.log(
    "Data?.post.instagramPosts?.length",
    Data?.post.instagramPosts.filter((d) => d.isVerified === true).length === 0
  );

  return (
    <>
      <div>
        {isLoading ? (
          <div>
            {new Array(5).fill(5).map((_, index) => (
              <div className="flex items-center space-x-4" key={index}>
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-background md:w-full lg:w-2/3">
            <Card className="bg-background">
              <CardHeader>
                <CardTitle>User Info</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <Avatar
                      className="rounded-full"
                      style={{
                        borderRadius: "50%",
                        height: "80px",
                        width: "80px",
                      }}
                    >
                      <AvatarImage
                        src={avatar}
                        className="aspect-square h-full w-full"
                        style={{
                          borderRadius: "50%",
                          height: "80px",
                          width: "80px",
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
                  </div>
                  <Button
                    variant="outline"
                    className="ml-auto"
                    onClick={() => {
                      toast({
                        title: "Coming Soon..",
                      });
                    }}
                  >
                    <MessageSquareIcon className="mr-4 h-4 w-4 text-muted-foreground" />
                    Chat
                  </Button>
                </div>
                <div>
                  <p className="text-lg font-large leading-none">
                    {displayName}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">{email}</p>
                </div>
              </CardContent>
            </Card>
            <div className="mt-10">
              <h2 className="font-semibold leading-none tracking-tight mb-4">
                Verified Posts 🚀
              </h2>
              {isPostLoading ? (
                <>Loading...</>
              ) : (
                <>
                  {Data?.post.instagramPosts?.filter((p) => p.isVerified)
                    .length === 0 ? (
                    <p>No verified posts available.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Data?.post.instagramPosts
                        ?.filter((p) => p.isVerified)
                        .map((p) => (
                          <PostCard data={p} key={p._id} />
                        ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
