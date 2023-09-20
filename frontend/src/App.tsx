import { useEffect, useState } from "react";
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

    @media screen and (max-width: 1300px) {
      margin: 0;
    }
  }
`;

function App() {
  // const user = useSelector((state) => state.auth.userInfo);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      } else {
        // Handle the case when the user is not authenticated (optional)
      }
    });

    // Clean up the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [navigate]);

  return (
    <AppContainer>
      <div className="top-nav">
        <TopBar />
      </div>

      <div className="main">
        {pathname !== "/auth" && (
          <div className={`sidebar hidden sm:block md:block`}>
            <SideBar />
          </div>
        )}
        <div className="main-content ">
          <Outlet />
        </div>
      </div>
      <Toaster />
    </AppContainer>
  );
}

export default App;
