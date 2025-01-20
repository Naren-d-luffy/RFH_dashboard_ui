import React, { useState } from "react";
import { General } from "./General";
import { RiHospitalLine } from "react-icons/ri";
import { Preferences } from "./Preferences";
import { Notifications } from "./Notifications";
import { PiDevicesBold } from "react-icons/pi";
import { IoNotificationsOutline } from "react-icons/io5";
import { Account } from "./Account";
import { MdOutlineAccountBox } from "react-icons/md";
import { TermsAndConditionsList } from "./TermsAndConditions/TermsAndConditionsList";

export const Settings = () => {
  const [selectedOption, setSelectedOption] = useState("general");
  const renderContent = () => {
    switch (selectedOption) {
      case "general":
        return <General />;
      case "preferences":
        return <Preferences />;
      case "notifications":
        return <Notifications />;
      case "account":
        return <Account />;
      case "termsAndConditions":
        return <TermsAndConditionsList/>;
      default:
        return <General />;
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
                className={`settings-items ${
                  selectedOption === "general" ? "active" : ""
                }`}
                onClick={() => setSelectedOption("general")}
              >
                <RiHospitalLine /> &nbsp; General
              </div>
              <div
                className={`settings-items mt-3 ${
                  selectedOption === "preferences" ? "active" : ""
                }`}
                onClick={() => setSelectedOption("preferences")}
              >
                <PiDevicesBold /> &nbsp; Preferences
              </div>
              <div
                className={`settings-items mt-3 ${
                  selectedOption === "notifications" ? "active" : ""
                }`}
                onClick={() => setSelectedOption("notifications")}
              >
                <IoNotificationsOutline /> &nbsp; Notifications
              </div>
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
                  selectedOption === "termsAndConditions" ? "active" : ""
                }`}
                onClick={() => setSelectedOption("termsAndConditions")}
              >
                <MdOutlineAccountBox /> &nbsp;Terms & Conditions
              </div>
            </div>
          </div>
          <div className="col-lg-9">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};
