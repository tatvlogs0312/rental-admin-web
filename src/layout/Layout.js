import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Menu from "../menu/AppMenu";
import "./layout.css";
import { useAuth } from "../auth/Auth";

function Layout() {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="app--layout">
      <div className="app--menu">
        <Menu />
      </div>
      <div className="app--main">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
