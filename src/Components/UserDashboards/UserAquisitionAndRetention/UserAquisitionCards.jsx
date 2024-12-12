import React, { useState } from "react";
import { FaArrowDown, FaUsers } from "react-icons/fa6";
import { PiExport } from "react-icons/pi";
import profile_tick from "../../../Assets/Icons/profile-tick.png";
import { Button, Dropdown, Modal, Space } from "antd";
import { showSuccessMessage } from "../../../globalConstant";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export const UserAquisitionCards = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleSuccessDelete = () => {
    showSuccessMessage(
      "Export Successfully",
      "Please check your document, and open your document file"
    );
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    console.log("Export initiated!");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const cardData = [
    {
      heading: "Total new user",
      value: "5.715",
      percentage: (
        <span style={{ color: "red" }}>
          <FaArrowDown style={{ color: "red", marginRight: "4px" }} />
          -0.10%
        </span>
      ),
      description: "Since last week",
      icon: <FaUsers />,
      changeType: "down",
      iconBg: "#e6fff5",
      iconColor: "#59B29F",
      boxShadowColor: "#59B29F",
    },
    {
      heading: "Organic users",
      value: "1.510",
      percentage: "340",
      description: "Active now",
      icon: (
        <img
          src={profile_tick}
          alt="Profile Tick"
          style={{ width: "22px", height: "22px" }}
        />
      ),
      changeType: "up",
      iconBg: "#e6f7ff",
      iconColor: "#7EC2FF",
      boxShadowColor: "#7EC2FF",
    },
    {
      heading: "Referral users",
      value: "523",
      percentage: "+165",
      description: "New",
      icon: <FaUsers />,
      changeType: "up",
      iconBg: "#fffbe6",
      iconColor: "#ffc107",
      boxShadowColor: "#ffc107",
    },
    {
      heading: "Paid users",
      value: "221",
      percentage: "+340",
      description: "New",
      icon: (
        <img
          src={profile_tick}
          alt="Profile Tick"
          style={{ width: "22px", height: "22px" }}
        />
      ),
      changeType: "up",
      iconBg: "#e6f7ff",
      iconColor: "#7EC2FF",
      boxShadowColor: "#7EC2FF",
    },
  ];

  const items = [
    {
      label: "Week1",
      key: "1",
    },
    {
      label: "Week2",
      key: "2",
    },
    {
      label: "Week3",
      key: "3",
    },
    {
      label: "Week4",
      key: "4",
    },
  ];
  const handleMenuClick = ({ key }) => {};
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <div className="user-engagement-header">
          <h3>Overview</h3>
          <p>There is the latest update for the last 7 days. Check now</p>
        </div>
        <div className="d-flex align-items-center gap-3 ">
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                Week
                <MdOutlineKeyboardArrowDown />
              </Space>
            </Button>
          </Dropdown>
          <button
            className="d-flex gap-2 align-items-center rfh-basic-button"
            onClick={showModal}
          >
            <PiExport />
            Export
          </button>
        </div>
      </div>
      <div className="row">
        {cardData.map((card, index) => (
          <div key={index} className="col-lg-3 mt-2">
            <div
              className="userAquisition-card"
              style={{
                borderRight: `3px solid ${card.boxShadowColor}`,
              }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0">{card.heading}</p>
                <div
                  className="userAquisition-icon-div"
                  style={{
                    backgroundColor: card.iconBg,
                    color: card.iconColor,
                  }}
                >
                  {card.icon}
                </div>
              </div>
              <h2 className="fw-bold">{card.value}</h2>
              <p className="userAquisition-card-body-p mb-0">
                <span
                  className={`userAquisition-card-body-span ${
                    card.changeType === "up" ? "text-success" : "text-danger"
                  }`}
                >
                  {/* <FaArrowDown
                    className={card.changeType === 'up' ? 'rotate-180' : ''}
                  /> */}
                  {<> {card.percentage} </>}
                </span>{" "}
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Modal
        title=""
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="userAquisition-model">
          <h3>Export data</h3>
          <p>"Are you sure you want to export data?"</p>
          <span>Choose a type of document</span>
          <div className="row">
            <div className="col-lg-12 mt-3">
              <select
                className="form-select userAquisition-dropdown"
                aria-label="Default select example"
              >
                <option selected>PDF</option>
                <option value="1">Excel</option>
                <option value="2">PNG</option>
                <option value="3">Text document</option>
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <Button className="py-4" onClick={handleCancel}>
              Cancel
            </Button>
            <button className="export-button" onClick={handleSuccessDelete}>
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
