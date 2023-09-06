import { Button } from "@/components/ui/button";
import { useFetchAllScriptsQuery } from "@/slices/scriptApiSlice";
import { useFetchAllUsersQuery } from "@/slices/userApiSlice";
import { formatDate } from "@/utils/format-date";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { FileTextIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const RecentUploads = ({ allScripts, isLoading }: any) => {
  const navigate = useNavigate();
  console.log("all", allScripts);
  return (
    <div className="space-y-8">
      {isLoading ? (
        <>Loading..</>
      ) : (
        <>
          {allScripts.slice(0, 5).map((s) => (
            <div className="flex items-center" key={s?._id}>
              <Avatar
                className="rounded-full border flex items-center justify-center"
                style={{
                  borderRadius: "50%",
                  height: "40px",
                  width: "40px",
                }}
              >
                <FileTextIcon />
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{s?.title}</p>
                <p
                  className="text-sm text-muted-foreground cursor-pointer"
                  onClick={() => navigate(`/user/${s?.userUid}`)}
                >
                  {" "}
                  uploaded by {s?.userName}
                </p>
              </div>
              <div className="ml-auto font-medium">
                <Button
                  variant="outline"
                  onClick={() => window.open(s.scriptUrl, "_next")}
                >
                  View
                </Button>
              </div>
            </div>
          ))}
        </>
      )}

      <Button className="w-full" onClick={() => navigate("/users")}>
        View More
      </Button>
    </div>
  );
};
