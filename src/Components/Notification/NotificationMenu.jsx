import { Col, Row, Select, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { useSearchParams } from "react-router-dom";
import SidebarActiveNotification from "./SidebarActiveNotification";
import SidebarCompletedNotification from "./SidebarCompletedNotification";
import SidebarNotificationDraft from "./SidebarNotificationDraft";
import CreateSidebarNotificationModal from "./CreateSidebarNotificationModal";
import { Option } from "lucide-react";

const NotificationMenu = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("tab");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  return (
    <div className="">
      <div className="d-flex flex-column flex-sm-column flex-md-column flex-lg-row justify-content-between align-items-start align-items-lg-center">
        <div className="user-engagement-header">
          <h3>Notification</h3>
          <p>Stay Informed Important Update for All Users</p>
        </div>
        <button
          className="d-flex gap-2 align-items-center rfh-basic-button"
          onClick={showModal}
        >
          <GoPlus />
          Create Notification
        </button>
      </div>
      <div className="mt-3">
        <Row gutter={24}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Select
              className="create-camapign-input-select"
              defaultValue="Select"
              style={{ width: "100%" }}
              dropdownClassName="create-campaign-dropdown"
            >
              <Option value="All">All Users</Option>
              <Option value="New">New Users</Option>
              <Option value="Old">Old Users</Option>
            </Select>
            <span className="create-campaign-input-span">Trigger by</span>
          </Col>
        </Row>
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-3">
          <div className=" mt-4 rounded-lg project-card xl:col-span-2">
            <Tabs defaultActiveKey={page || "1"}>
              <TabPane
                tab={
                  <>
                    Active
                    <span className="notification-menu-count-span">
                      05
                    </span>{" "}
                  </>
                }
                key="1"
              >
                <SidebarActiveNotification />
              </TabPane>
              <TabPane
                tab={
                  <>
                    Completed
                    <span className="notification-menu-count-span">
                      02
                    </span>{" "}
                  </>
                }
                key="2"
              >
                <SidebarCompletedNotification />
              </TabPane>
              <TabPane
                tab={
                  <>
                    Draft
                    <span className="notification-menu-count-span">
                      01
                    </span>{" "}
                  </>
                }
                key="3"
              >
                <SidebarNotificationDraft />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
      <CreateSidebarNotificationModal
        open={isModalOpen}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default NotificationMenu;
