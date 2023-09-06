import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export const RecentSignups = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage
            src={
              "https://lh3.googleusercontent.com/a/AAcHTtcgfe8WLnWKUE-xDln7UQ5ZeX3oKemcFVUxdZsRsmFpfxkG=s96-c"
            }
            className="rounded"
            alt="Avatar"
          />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Koushith Amin</p>
          <p className="text-sm text-muted-foreground">koushith97@gmail.com</p>
        </div>
        {/* <div className="ml-auto font-medium">+$1,999.00</div> */}
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage
            src={
              "https://lh3.googleusercontent.com/a/AAcHTteiIAUttHTS41L-g8_40jLfktbxU2rveLUlg5Wr8BCong=s96-c"
            }
            className="rounded"
            alt="Avatar"
          />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Koushith Amin97</p>
          <p className="text-sm text-muted-foreground">
            koushithamin97@gmail.com
          </p>
        </div>
        {/* <div className="ml-auto font-medium">+$1,999.00</div> */}
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Jackson Lee</p>
          <p className="text-sm text-muted-foreground">jackson.lee@gmail.com</p>
        </div>
        {/* <div className="ml-auto font-medium">+$39.00</div> */}
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
          <p className="text-sm text-muted-foreground">
            isabella.nguyen@gmail.com
          </p>
        </div>
        {/* <div className="ml-auto font-medium">+$299.00</div> */}
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">William Kim</p>
          <p className="text-sm text-muted-foreground">will@gmail.com</p>
        </div>
        {/* <div className="ml-auto font-medium">+$99.00</div> */}
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sofia Davis</p>
          <p className="text-sm text-muted-foreground">sofia.davis@gmail.com</p>
        </div>
        {/* <div className="ml-auto font-medium">+$39.00</div> */}
      </div>
    </div>
  );
};
