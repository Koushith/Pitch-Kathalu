import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useCreatePostMutation,
  useFetchAllPostQuery,
} from "@/slices/postApiSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HomeContainer } from "./home.styles";
import { AllMemers } from "@/components";
import { Loader2 } from "lucide-react";

export const HomeScreen = () => {
  const { isError, isLoading, data, refetch } = useFetchAllPostQuery("Post");
  const { mongoUserId } = useSelector((state) => state?.auth.userInfo);
  const [isPostCreated, setIsPostCreated] = useState(false);
  console.log("mongoUserId-----", mongoUserId);

  const [postUrl, setPostUrl] = useState("");

  const [createPost] = useCreatePostMutation();
  const navigate = useNavigate();
  const submitHandler = async () => {
    //TODO: - submit only after reclaim verification
    //FIXME: - fix verification bug

    try {
      setIsPostCreated(true);
      const res = await createPost({
        user: mongoUserId,
        instagramPosts: [
          {
            postUrl,
            proof: "punchline", //TODO: fix this- allow only if proof is valid
            isVerified: false,
            //TODO: remove this hardcoded value.
            originalPublishDate: "2023-08-19T00:00:00Z",
          },
        ],
      }).unwrap();
      if (res) {
        setIsPostCreated(false);
        refetch();

        navigate("/verify", {
          state: {
            callbackId: res?.callbackId,
            reclaimUrl: res?.reclaimUrl,
          },
          replace: true,
        });
      }
    } catch (error) {
      console.log("somwthing went wronhg- error", error);
    } finally {
      //
      setIsPostCreated(false);
    }
  };

  return (
    <HomeContainer className="flex gap-20 items-start justify-start lg:w-1/2 ">
      <div className="left ">
        <h1 className="font-semibold leading-none tracking-tight">
          What's Poppin??
        </h1>
        <div className="mt-4">
          <Input
            type="text"
            placeholder="Enter the post URL"
            name="postUrl"
            value={postUrl}
            onChange={(e) => setPostUrl(e.target.value)}
          />
          <Button
            variant={"default"}
            size={"lg"}
            onClick={submitHandler}
            className="mt-4"
          >
            {isPostCreated && (
              <Loader2 className="h-[1.2rem] w-[1.2rem] mr-2 animate-spin" />
            )}
            {isPostCreated ? "Verifing" : "Verify"}
          </Button>

          {/* <div className="mt-8">
            <h1 className="font-semibold leading-none tracking-tight">
              Trending Verified Memes🔥
            </h1>
            <div className="mt-4">
              {isLoading ? (
                <>loading....</>
              ) : (
                <>
                  {data?.posts?.map((post) => (
                    <div key={post._id}>
                      <p className="font-medium leading-none tracking-tight mt-10">
                        {post.displayName}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2  gap-4 mt-4 post-cards ">
                        {post.instagramPosts.map((p) => (
                          <>
                            <PostCard data={p} key={p._id} />
                          </>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div> */}

          <AllMemers />
        </div>
      </div>

      <div className="right ">
        {/* <Card className="bg-background sm:w-full  md:w-full leader-board">
          <CardHeader>
            <CardTitle>Leader Board 🚀</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar
                  className="bg-muted flex items-center rounded-full"
                  style={{
                    borderRadius: "50%",
                    height: "40px",
                    width: "40px",
                  }}
                >
                  <AvatarImage
                    // src={user?.avatar}
                    className="aspect-square h-full w-full"
                  />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">koushith</p>
                  <p className="text-sm text-muted-foreground">5 Posts</p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardContent className="grid gap-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar
                  className="bg-muted flex items-center rounded-full"
                  style={{
                    borderRadius: "50%",
                    height: "40px",
                    width: "40px",
                  }}
                >
                  <AvatarImage
                    // src={user?.avatar}
                    className="aspect-square h-full w-full"
                  />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">koushith</p>
                  <p className="text-sm text-muted-foreground">5 Posts</p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardContent className="grid gap-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar
                  className="bg-muted flex items-center rounded-full"
                  style={{
                    borderRadius: "50%",
                    height: "40px",
                    width: "40px",
                  }}
                >
                  <AvatarImage
                    // src={user?.avatar}
                    className="aspect-square h-full w-full"
                  />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">koushith</p>
                  <p className="text-sm text-muted-foreground">5 Posts</p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardContent className="grid gap-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar
                  className="bg-muted flex items-center rounded-full"
                  style={{
                    borderRadius: "50%",
                    height: "40px",
                    width: "40px",
                  }}
                >
                  <AvatarImage
                    // src={user?.avatar}
                    className="aspect-square h-full w-full"
                  />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">koushith</p>
                  <p className="text-sm text-muted-foreground">5 Posts</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </HomeContainer>
  );
};
