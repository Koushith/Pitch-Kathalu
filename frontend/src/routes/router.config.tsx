import App from "@/App";
import { Private } from "@/components";
import {
  AuthScreen,
  HomeScreen,
  ManageScreen,
  NotificationScreen,
  ProfileScreen,
  UserDetailScreen,
  UsersScreen,
  VerificationScreen,
} from "@/screens";
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
        path: "/manage",
        element: (
          <Private>
            <ManageScreen />
          </Private>
        ), // Wrap with Private component
      },
      {
        path: "/notifications",
        element: (
          <Private>
            <NotificationScreen />
          </Private>
        ), // Wrap with Private component
      },
      {
        path: "/users",
        element: (
          <Private>
            <UsersScreen />
          </Private>
        ), // Wrap with Private component
      },
      {
        path: "/user/:id",
        element: (
          <Private>
            <UserDetailScreen />
          </Private>
        ), // Wrap with Private component
      },
      {
        path: "/profile",
        element: (
          <Private>
            <ProfileScreen />
          </Private>
        ), // Wrap with Private component
      },
      {
        path: "/verify",
        element: (
          <Private>
            <VerificationScreen />
          </Private>
        ),
      },
    ],
  },
]);
