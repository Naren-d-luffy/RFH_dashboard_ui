import React, { useEffect, useState } from "react";
import { Form, Select } from "antd";
import lightmode from "../../Assets/Images/lightmode.png";
import darkmode from "../../Assets/Images/darkmode.png";

import "react-international-phone/style.css";
import { useDarkMode } from "../../DarkMode";

export const Preferences = () => {
  const [form] = Form.useForm();

  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [activeTheme, setActiveTheme] = useState(isDarkMode ? "dark" : "light");
  useEffect(() => {
    setActiveTheme(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleLightModeClick = () => {
    if (isDarkMode) {
      toggleDarkMode(); 
    }
  };

  const handleDarkModeClick = () => {
    if (!isDarkMode) {
      toggleDarkMode(); 
    }
  };
 
  return (
    <div className="settings-personal-information">
      <div className="container">
        <h4 className="mt-4 mt-lg-0">Preferences</h4>
        <p>Customisation according to your preferences</p>
        <hr />
        <Form layout="vertical" form={form}>
          <h5>Select Theme</h5>
          <div className="row mt-4">
            <div className="col-md-6">
            <div className="settings-theme-image" onClick={handleLightModeClick}>
                <img src={lightmode} alt="Light Mode" />
                <p className={activeTheme === "light" ? "active" : ""}>
                  Light Mode {activeTheme === "light" && "(Active)"}
                </p>
              </div>
            </div>
            <div className="col-md-6">
            <div className="settings-theme-image" onClick={handleDarkModeClick}>
                <img src={darkmode} alt="Dark Mode" />
                <p className={activeTheme === "dark" ? "active" : ""}>
                  Dark Mode {activeTheme === "dark" && "(Active)"}
                </p>
              </div>
            </div>

            {/* <div className=" col-md-4">
              <div className="settings-theme-image">
                <img src={customcolor} alt="" />
                <p className={activeTheme === "custom" ? "active" : ""}>
                  Custom Colour
                </p>
              </div>
            </div> */}
          </div>

          {/* <div className="row mt-4">
            <div className="col-md-4 mt-4 theme-select-option">
              <p>Time Zone</p>
            </div>
            <div className="col-lg-8 mt-4">
              <Form.Item>
                <Select
                  className="settings-input"
                  placeholder="Select a time zone"
                  defaultValue="(UTC -08:00) Pacific Time (Los Angeles)"
                >
                  <Select.Option value="UTC-12:00">
                    (UTC -12:00) International Date Line West
                  </Select.Option>
                  <Select.Option value="UTC+05:30">
                    (UTC +05:30) India Standard Time
                  </Select.Option>
                  <Select.Option value="UTC+08:00">
                    (UTC +08:00) China Standard Time
                  </Select.Option>
                  <Select.Option value="UTC+09:00">
                    (UTC +09:00) Japan Standard Time
                  </Select.Option>
                  <Select.Option value="UTC+10:00">
                    (UTC +10:00) Australian Eastern Time
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mt-4 theme-select-option">
              <p>Language</p>
            </div>
            <div className="col-lg-8 mt-4">
              <Form.Item>
                <Select
                  className="settings-input"
                  placeholder="Select a Language"
                  defaultValue="English (US)"
                >
                  <Select.Option value="en-us">English (US)</Select.Option>
                  <Select.Option value="en-uk">English (UK)</Select.Option>
                  <Select.Option value="de">Deutsch (German)</Select.Option>
                  <Select.Option value="zh">中文 (Chinese)</Select.Option>
                  <Select.Option value="ja">日本語 (Japanese)</Select.Option>
                  <Select.Option value="kn">ಕನ್ನಡ (Kannada)</Select.Option>
                  <Select.Option value="hi">हिन्दी (Hindi)</Select.Option>
                  <Select.Option value="ar">العربية (Arabic)</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </div> */}
          <div className="row mt-4">
            <div className="d-flex justify-content-end gap-2">
              <button className="settings-delete-button" type="button">
                Cancel
              </button>
              <button className="settings-edit-icon-button" type="submit">
                Save
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
