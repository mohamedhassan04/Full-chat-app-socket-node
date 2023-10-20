import React from "react";
import "./styles.css";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const MainContainer = () => {
  return (
    <div className="main-container">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default MainContainer;
