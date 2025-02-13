import React, { useState } from "react";
import { Preferences } from "./Preferences";
import { Notifications } from "./Notifications";
import { PiDevicesBold, PiPasswordBold } from "react-icons/pi";
import { Account } from "./Account";
import { MdOutlineAccountBox } from "react-icons/md";
import ChangePassword from "./ChangePassword";
export const Settings = () => {
  const [selectedOption, setSelectedOption] = useState("account");
  const renderContent = () => {
    switch (selectedOption) {
      case "preferences":
        return <Preferences />;
      case "notifications":
        return <Notifications />;
      case "account":
        return <Account />;
      case "password":
        return <ChangePassword />;
      default:
        return <Account />;
    }
  };

  return (
    <div className="settings-section">
      <div>
        <div className="row mt-4">
          <h2>Settings</h2>
          <p>Customize until match to your workflows</p>
          <div className="col-lg-3">
            <div className="settings-options">
             
              <div
                className={`settings-items mt-3 ${
                  selectedOption === "account" ? "active" : ""
                }`}
                onClick={() => setSelectedOption("account")}
              >
                <MdOutlineAccountBox /> &nbsp; Account
              </div>
              <div
                className={`settings-items mt-3 ${
                  selectedOption === "password" ? "active" : ""
                }`}
                onClick={() => setSelectedOption("password")}
              >
                <PiPasswordBold /> &nbsp; Change Password
              </div>
               <div
                className={`settings-items mt-3 ${
                  selectedOption === "preferences" ? "active" : ""
                }`}
                onClick={() => setSelectedOption("preferences")}
              >
                <PiDevicesBold /> &nbsp; Preferences
              </div>
              {/* <div
                className={`settings-items mt-3 ${
                  selectedOption === "notifications" ? "active" : ""
                }`}
                onClick={() => setSelectedOption("notifications")}
              >
                <IoNotificationsOutline /> &nbsp; Notifications
              </div> */}
            </div>
          </div>
          <div className="col-lg-9">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};
