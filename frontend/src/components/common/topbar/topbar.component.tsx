import { Button } from "@/components/ui/button";

import { signupWithGoogle } from "@/utils";
import { ButtonIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavbarContainer } from "./topbar.styles";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/theme";
import { LogOutIcon, Moon, Settings, Sun, User2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useLoginMutation,
  useFetchProfileByIdQuery,
} from "@/slices/userApiSlice";
import { setCredientials, logout } from "@/slices/userSlice";

export const TopBar = () => {
  const [login, { isLoading }] = useLoginMutation();
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthendicated, userInfo } = useSelector((state) => state.auth);
  const { data, isLoading: isUserIdLoading } = useFetchProfileByIdQuery(
    userInfo?.uid
  );

  const fetchMongoId = () => {
    console.log("mongo---", data?.data?._id);
    dispatch(setCredientials({ hello: "hello" }));
    console.log("is data there?", data?.data?._id);
    const mongoId = data?.data?._id;
    dispatch(setCredientials({ mongoUserId: mongoId }));
  };

  useEffect(() => {
    if (data) {
      fetchMongoId();
    }
  }, [data]);

  //const mongoId = data?.data?._id;
  const loginHandler = async () => {
    let { user } = await signupWithGoogle();

    dispatch(setCredientials({ ...user }));
    const { displayName, email, photoURL, uid } = user;
    // here - it replaces whole -overrides

    const res = await login({ displayName, email, photoURL, uid }).unwrap();
    console.log("res---", res);
  };

  const logoutHandler = () => {
    dispatch(logout(""));
  };

  return (
    <div className="border-b ">
      <div
        className="flex items-center justify-between p-4 mt-0 mb-0 ml-auto mr-auto "
        style={{ maxWidth: "1600px" }}
      >
        <h1>Meme Lord 😹</h1>
        <div className="flex">
          <div className="hidden md:block">
            {" "}
            {/* Hide on mobile */}
            {isAuthendicated ? (
              <Button
                className="bg-red-500 hover:bg-red-600"
                onClick={logoutHandler}
              >
                Logout
              </Button>
            ) : (
              <Button
                className="bg-green-500 hover:bg-green-600"
                onClick={loginHandler}
              >
                Sign up
              </Button>
            )}
          </div>

          {/* mobile */}
          <div className=" flex items-center justify-center lg:hidden sm:block">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline" size="icon">
                  <HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <HamburgerMenuIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Hamburger</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/")}>
                  Home
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/users")}>
                  Users
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="ml-2">
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
