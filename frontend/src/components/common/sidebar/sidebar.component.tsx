import { Link, useLocation } from "react-router-dom";
import { SideBarContainer } from "./sidebar.styles";
import { HomeIcon, User2, Settings, UploadIcon } from "lucide-react";
import { DashboardIcon } from "@radix-ui/react-icons";
import { useIsAdmin } from "@/hooks";

export const SideBar = () => {
  const location = useLocation();
  const isAdmin = useIsAdmin();
  return (
    <SideBarContainer>
      <ul>
        {isAdmin && (
          <li
            className={`inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${
              location.pathname === "/dashboard"
                ? "bg-secondary"
                : "hover:bg-secondary/80"
            } h-9 px-4 py-2 w-full justify-start`}
          >
            <DashboardIcon className="h-[1.2rem] w-[1.2rem]" />{" "}
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}
        <li
          className={`inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${
            location.pathname === "/" ? "bg-secondary" : "hover:bg-secondary/80"
          } h-9 px-4 py-2 w-full justify-start`}
        >
          <HomeIcon className="h-[1.2rem] w-[1.2rem]" />{" "}
          <Link to="/">Home</Link>
        </li>
        {isAdmin && (
          <li
            className={`inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${
              location.pathname === "/uploads" ? "bg-accent" : "hover:bg-accent"
            } h-9 px-4 py-2 w-full justify-start`}
          >
            <UploadIcon className="h-[1.2rem] w-[1.2rem]" />{" "}
            <Link to="/uploads">All Uploads</Link>
          </li>
        )}
        {isAdmin && (
          <li
            className={`inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${
              location.pathname === "/users" ? "bg-accent" : "hover:bg-accent"
            } h-9 px-4 py-2 w-full justify-start`}
          >
            <User2 className="h-[1.2rem] w-[1.2rem]" />{" "}
            <Link to="/users">All Users</Link>
          </li>
        )}
        <li
          className={`inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${
            location.pathname === "/profile" ? "bg-accent" : "hover:bg-accent"
          } h-9 px-4 py-2 w-full justify-start`}
        >
          <Settings className="h-[1.2rem] w-[1.2rem]" />{" "}
          <Link to="/profile">Profile</Link>
        </li>{" "}
      </ul>
    </SideBarContainer>
  );
};
