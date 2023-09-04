import App from "@/App";
import { Private } from "@/components";
import { AuthScreen, HomeScreen, ProfileScreen } from "@/screens";
import { createBrowserRouter } from "react-router-dom";

export const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Private>
            <HomeScreen />
          </Private>
        ), // Wrap with Private component
      },
      {
        path: "/auth",
        element: <AuthScreen />, // Wrap with Private component
      },

      {
        path: "/profile",
        element: (
          <Private>
            <ProfileScreen />
          </Private>
        ), // Wrap with Private component
      },
    ],
  },
]);
