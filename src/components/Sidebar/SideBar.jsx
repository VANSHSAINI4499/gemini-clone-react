import React, { useState, useContext } from "react";
import "./SideBar.css";
import { assets } from "../../assets/assets";
import menu_close_icon from "../../assets/menu_close.svg";
import { Context } from "../../context/Context";

const SideBar = () => {
  const [extended, setExtended] = useState(false); // Fixed spelling of `extended`
  const { onSent, prevPrompts, setRecentPrompt ,newChat} = useContext(Context); // Corrected `setRecentsPrompts` to `setRecentPrompt`

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt); // Set the recent prompt in context
    await onSent(prompt); // Fetch the result for the selected prompt
  };

  return (
    <div className={`sidebar ${extended ? "extended" : ""}`}>
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)} // Toggle sidebar extension
          className={`menu ${extended ? "rotate" : ""}`}
          src={extended ? menu_close_icon : assets.menu_icon}
          alt="Menu Icon"
        />
        <div onClick={()=>newChat()}className="newchat">
          <img src={assets.plus_icon} alt="Plus Icon" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent Prompts</p>
            {prevPrompts.map((item, index) => (
              <div
                key={index}
                onClick={() => loadPrompt(item)} // Load the selected prompt
                className="recent-entry"
              >
                <img src={assets.message_icon} alt="Message Icon" />
                <p title={item}>{item.slice(0, 18)}...</p> {/* Tooltip added */}
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Help Icon" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="Activity Icon" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
