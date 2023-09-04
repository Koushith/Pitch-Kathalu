import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupWithGoogle } from "@/utils";
import { useLoginMutation } from "@/slices/usersApiSlice";
import { setCredientials } from "@/slices/authSlice";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ChromeIcon } from "lucide-react";

export const AuthScreen = () => {
  const { isAuthendicated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthendicated) {
      navigate("/");
    }
  }, [isAuthendicated]);

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const loginHandler = async () => {
    let { user } = await signupWithGoogle();

    dispatch(setCredientials({ ...user }));
    const { displayName, email, photoURL, uid } = user;

    const res = await login({ displayName, email, photoURL, uid }).unwrap();
    console.log("res---", res);
  };

  return (
    <div className="flex items-center justify-center mt-10">
      {" "}
      {/* Updated: Added h-screen */}
      <div className="w-full max-w-sm">
        {" "}
        {/* Updated: Added max-w-sm */}
        <Card className="bg-background">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign in to MemeLord</CardTitle>
            <CardDescription>
              Enter your email below to sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" />
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={loginHandler}>
              <ChromeIcon className="mr-2 h-4 w-4" />
              Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
