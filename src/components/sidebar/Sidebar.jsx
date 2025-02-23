import React from "react";
import Frame from "../../assets/frame.svg";
import GitIcon from "../../assets/gitIcon.svg";
import Logo from "../../assets/logo.svg";
import Menu from "../../assets/menu.svg";
import Versions from "../../assets/versions.svg";
import User from "../../assets/User.svg";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="appbar">
      <div className="navbar">
        <p className="title">Configure Flows</p>
      </div>

      <div className="sidebar">
        <img src={Logo} alt="logo" className="logo" />
        <div className="sidebarItems">
        <div className="sidebarIcons">
          <img src={Menu} alt="menu" className="sidebarIcon" />
          <img src={GitIcon} alt="gitIcon" className="sidebarIcon" />
          <img src={Versions} alt="versions" className="sidebarIcon" />
          <img src={Frame} alt="frame" className="sidebarIcon" />
        </div>
        <div className="userIcons">
        <img src={User} alt="User" className="sidebarIcon userIcon" />
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default Sidebar;
