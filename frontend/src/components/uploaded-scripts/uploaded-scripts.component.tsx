import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/utils/format-date";
import { Avatar } from "@radix-ui/react-avatar";
import { FileTextIcon } from "lucide-react";

export const UploadedScripts = ({ allScripts, isScriptsLoading }: any) => {
  return (
    <div className="flex ">
      <Card className="bg-background  w-full  ">
        <CardHeader>
          <CardTitle> Submitted Scripts 🚀</CardTitle>
        </CardHeader>

        {isScriptsLoading ? (
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
          <>
            {allScripts?.scripts.map((s) => (
              <div key={s._id}>
                <CardContent className="grid gap-6 ">
                  <div className="flex items-center border-b pb-4 p-2 justify-between space-x-4 ">
                    <div className="flex items-center space-x-4">
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
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {s.logline}
                        </p>
                        <p className="text-sm mt-1 text-muted-foreground">
                          uploaded on {formatDate(s.uploadDate, "dd-mm-yy")}
                          /2023
                        </p>
                      </div>
                    </div>
                    <>
                      <>
                        <Button
                          variant="outline"
                          className="ml-auto"
                          //TODO: add script details page
                          onClick={() => window.open(s?.scriptUrl, "_blank")}
                        >
                          View{" "}
                          {/* <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" /> */}
                        </Button>
                      </>
                    </>
                  </div>
                </CardContent>
              </div>
            ))}
          </>
        )}
      </Card>
    </div>
  );
};
