import React, { useState } from "react";
import {
  Form,
  Switch,
  Checkbox,
  Row,
  Col,
} from "antd";

import "react-international-phone/style.css";

export const Notifications = () => {
  const [form] = Form.useForm();
  const [switchState, setSwitchState] = useState(true);
  const onChange = (checked) => {
    setSwitchState(checked);
    console.log(`Switch is now ${checked ? "ON" : "OFF"}`);
  };
  return (
    <div className="settings-personal-information">
      <div className="container">
        <h4 className="mt-4 mt-lg-0">Notifications</h4>
        <p>
          Get notified what's happening right now. you can turn off at any time
        </p>
        <hr />
        <Form layout="vertical" form={form}>
          <div className="row">
            <div className="col-md-4 mt-4 theme-select-option">
              <p>Email Notifications</p>
              <h6>
                Substance can send you email notifications for any new direct
                messages
              </h6>
            </div>
            <div className="col-lg-8 mt-4">
              <Row gutter={16} align="middle">
                <Col>
                  <Switch
                    checked={switchState}
                    onChange={onChange}
                    style={{
                      backgroundColor: switchState
                        ? "var(--primary-green)"
                        : "var(--secondary-text-color)",
                    }}
                  />
                </Col>
                <Col>
                  <span className="settings-toggle">
                    {switchState ? "On" : "Off"}
                  </span>
                </Col>
              </Row>
              <div className="row mt-4">
                <div className="col-md-12">
                  <div className="notification-item d-flex align-items-start mb-3">
                    <Checkbox
                      className="notification-checkbox"
                      defaultChecked
                    />
                    <div className="notification-content">
                      <h6>News and Update Settings</h6>
                      <p>
                        The latest news about the latest features and software
                        update settings.
                      </p>
                    </div>
                  </div>
                  <div className="notification-item d-flex align-items-start mb-3">
                    <Checkbox className="notification-checkbox" />
                    <div className="notification-content">
                      <h6>Tips and Tutorials</h6>
                      <p>
                        Tips and tricks in order to increase your performance
                        efficiency.
                      </p>
                    </div>
                  </div>
                  <div className="notification-item d-flex align-items-start">
                    <Checkbox
                      className="notification-checkbox"
                      defaultChecked
                    />
                    <div className="notification-content">
                      <h6>Offer and Promotions</h6>
                      <p>
                        Promotions about software package prices and about the
                        latest discounts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-4 mt-4 theme-select-option">
              <p>More Activity</p>
              <h6>
              Substance can send you email notifications for any new direct messages
              </h6>
            </div>
            <div className="col-lg-8 mt-4">
              <Row gutter={16} align="middle">
                <Col>
                  <Switch
                    checked={switchState}
                    onChange={onChange}
                    style={{
                      backgroundColor: switchState
                        ? "var(--primary-green)"
                        : "var(--secondary-text-color)",
                    }}
                  />
                </Col>
                <Col>
                  <span className="settings-toggle">
                    {switchState ? "On" : "Off"}
                  </span>
                </Col>
              </Row>
              <div className="row mt-4">
                <div className="col-md-12">
                  <div className="notification-item d-flex align-items-start mb-3">
                    <Checkbox
                      className="notification-checkbox"
                    />
                    <div className="notification-content">
                      <h6>All Reminders & Activity</h6>
                      <p>
                      Notify me all system activities and reminders that have been created
                      </p>
                    </div>
                  </div>
                  <div className="notification-item d-flex align-items-start mb-3">
                    <Checkbox className="notification-checkbox" />
                    <div className="notification-content">
                      <h6>Activity only</h6>
                      <p>
                      Only notify me we have the latest activity updates about increasing or decreasing data
                      </p>
                    </div>
                  </div>
                  <div className="notification-item d-flex align-items-start">
                    <Checkbox
                      className="notification-checkbox"
                      defaultChecked
                    />
                    <div className="notification-content">
                      <h6>Important Reminder only</h6>
                      <p>
                      Only notify me all the reminders that have been made
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
