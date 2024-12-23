import React, { useState } from "react";
import "./SideBar.css";
import { assets } from "../../assets/assets";
import menu_close_icon from "../../assets/menu_close.svg";

const SideBar = () => {
    const [extented, setExtented] = useState(false);
  
    return (
      <div className={`sidebar ${extented ? "extended" : ""}`}>
        <div className="top">
          <img
            onClick={() => setExtented((prev) => !prev)}
            className={`menu ${extented ? "rotate" : ""}`}
            src={extented ? menu_close_icon : assets.menu_icon}
            alt="Menu Icon"
          />
          <div className="newchat">
            <img src={assets.plus_icon} alt="Plus Icon" />
            {extented ? <p>New Chat</p> : null}
          </div>
          {extented ? (
            <div className="recent">
              <p className="recent-title">Recent Title</p>
              <div className="recent-entry">
                <img src={assets.message_icon} alt="Message Icon" />
                <p>What is react....</p>
              </div>
            </div>
          ) : null}
        </div>
        <div className="bottom">
          <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="Help Icon" />
            {extented ? <p>Help</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="Activity Icon" />
            {extented ? <p>Activity</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="Settings Icon" />
            {extented ? <p>Settings</p> : null}
          </div>
        </div>
      </div>
    );
  };
  
  export default SideBar;