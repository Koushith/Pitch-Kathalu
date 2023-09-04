import React, { useEffect } from "react";
import { PostCard } from "@/components/post-card/post-card.component";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchProfileByIdQuery } from "@/slices/usersApiSlice";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useSelector } from "react-redux";
import { useFetchOnePostQuery } from "@/slices/postApiSlice";
import { useLocation } from "react-router-dom";

export const ProfileScreen = () => {
  const { uid, mongoUserId } = useSelector((state) => state?.auth.userInfo);
  const { pathname } = useLocation();
  const { isError, isLoading, data } = useFetchProfileByIdQuery(uid);
  const { displayName, avatar, email } = data?.data || {};

  const {
    data: Data,
    isLoading: isPostLoading,
    refetch,
  } = useFetchOnePostQuery(mongoUserId);

  useEffect(() => {
    // Refetch data here
    refetch();
  }, []); // Depend on uid, mongoUserId, and location

  return (
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
        <div className="bg-background  md:w-full lg:w-2/3">
          <Card className="bg-background">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
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
                <Button variant="outline" className="ml-auto">
                  <Pencil1Icon className="mr-4 h-4 w-4 text-muted-foreground" />
                  Edit
                </Button>
              </div>
              <div>
                <p className="text-lg font-large leading-none">{displayName}</p>
                <p className="text-sm text-muted-foreground mt-2">{email}</p>
              </div>
            </CardContent>
          </Card>
          <div className="mt-10">
            <h2 className="font-semibold leading-none tracking-tight mb-4">
              Verified Posts 🚀
            </h2>

            {isPostLoading ? (
              <>
                {new Array(5).fill(5).map((_, index) => (
                  <div className="flex items-center space-x-4" key={index}>
                    <Skeleton className="h-12 w-12 " />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))}
              </>
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
  );
};
