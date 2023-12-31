import App from '@/App'
import { Private } from '@/components'
import {
  AllUploadsScreen,
  AuthScreen,
  DashboardScreen,
  HomeScreen,
  LandingPage,
  LikedScriptsScreens,
  ProfileScreen,
  ScriptDetailsScreen,
  UploadScriptScreen,
  UserDetailsScreen,
  UsersScreen,
} from '@/screens'
import { createBrowserRouter } from 'react-router-dom'

export const routerConfig = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <Private>
            <HomeScreen />
          </Private>
        ), // Wrap with Private component
      },
      {
        path: '/dashboard',
        element: (
          <Private>
            <DashboardScreen />
          </Private>
        ), // Wrap with Private component
      },
      {
        path: '/auth',
        element: <AuthScreen />, // Wrap with Private component
      },
      {
        path: '/welcome',
        element: <LandingPage />,
      },

      {
        path: '/profile',
        element: (
          <Private>
            <ProfileScreen />
          </Private>
        ),
      },
      {
        path: '/uploads',
        element: (
          <Private>
            <AllUploadsScreen />
          </Private>
        ),
      },
      {
        path: '/upload-script',
        element: (
          <Private>
            <UploadScriptScreen />
          </Private>
        ),
      },
      {
        path: '/users',
        element: (
          <Private>
            <UsersScreen />
          </Private>
        ),
      },
      {
        path: '/user/:id',
        element: (
          <Private>
            <UserDetailsScreen />
          </Private>
        ),
      },
      {
        path: '/view-script/:scriptId',
        element: (
          <Private>
            <ScriptDetailsScreen />
          </Private>
        ),
      },
      {
        path: '/liked-scripts',
        element: (
          <Private>
            <LikedScriptsScreens />
          </Private>
        ),
      },
    ],
  },
  {
    path: '/welcome',
    element: <LandingPage />,
  },
])
