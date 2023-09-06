import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";

export const RecentSignups = ({ users }: any) => {
  const navigate = useNavigate();
  return (
    <div className="space-y-8">
      {users?.slice(-5).map((u) => (
        <div
          className="flex items-center cursor-pointer"
          key={u?._id}
          onClick={() => navigate(`/user/${u?.uid}`)}
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={u?.avatar} className="rounded" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{u?.displayName}</p>
            <p className="text-sm text-muted-foreground">{u?.email}</p>
          </div>
          {/* <div className="ml-auto font-medium">+$1,999.00</div> */}
        </div>
      ))}
    </div>
  );
};
