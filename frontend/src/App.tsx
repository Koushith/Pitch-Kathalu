import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import {
  Outlet,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { SideBar, TopBar } from "./components";
import { styled } from "styled-components";
import { Toaster } from "./components/ui/toaster";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils";
import { useSelector } from "react-redux";

const AppContainer = styled.div`
  .main {
    display: flex;
    gap: 2rem;
    padding: 1rem;
    /* Set padding to 0 for the "/welcome" route */

    ${({ isWelcomeRoute }) => isWelcomeRoute && "padding: 0;"}
    .sidebar {
      @media screen and (max-width: 1100px) {
        display: none; /* Hide .main on mobile and tablet views */
      }
    }
  }

  .main-content {
    width: 100%;
    margin-top: 1rem;
    margin-left: 100px;
    ${({ isWelcomeRoute }) => isWelcomeRoute && "margin-top: 0;"}
    ${({ isWelcomeRoute }) => isWelcomeRoute && "margin-left: 0;"}
    @media screen and (max-width: 1300px) {
      margin: 0;
    }
  }
`;

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Determine if the current route is "/welcome"
  const isWelcomeRoute = pathname === "/welcome";
  const isAuthRoute = pathname === "/auth";

  // Other code...

  return (
    <AppContainer isWelcomeRoute={isWelcomeRoute}>
      {/* Render the top navigation bar only if the route is not "/welcome" */}
      {!isWelcomeRoute && (
        <div className="top-nav">
          <TopBar />
        </div>
      )}

      <div className="main">
        {/* Render the sidebar only if the route is not "/welcome" */}
        {!isWelcomeRoute && !isAuthRoute && (
          <div className={`sidebar hidden sm:block md:block`}>
            <SideBar />
          </div>
        )}

        <div className="main-content">
          <Outlet />
        </div>
      </div>
      <Toaster />
    </AppContainer>
  );
}

export default App;
