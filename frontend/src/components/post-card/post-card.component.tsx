import {
  ChevronDownIcon,
  CircleIcon,
  Link1Icon,
  PlusIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PostCard = (props: any) => {
  const { data } = props;

  return (
    <Card className="bg-background">
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle> {data?.instagramAccountName} ✅</CardTitle>
          <CardDescription className="truncate" style={{ maxWidth: "150px" }}>
            {data?.postUrl}
          </CardDescription>
        </div>

        <Button variant="secondary" className="px-3 shadow-none">
          <Link1Icon
            className="mr-2 h-4 w-4"
            onClick={() =>
              window.open(
                `${data?.postUrl}`,
                "_blank",
                "rel=noopener noreferrer"
              )
            }
          />
          View
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <ThumbsUp className="mr-1 h-3 w-3" />
            {data?.likes ? `${data?.likes}` : "0"}
          </div>

          <div>Uploaded on {data?.postDate}</div>
        </div>
      </CardContent>
    </Card>
  );
};
