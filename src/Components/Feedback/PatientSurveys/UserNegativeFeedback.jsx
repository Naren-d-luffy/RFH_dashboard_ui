import React, { useState } from "react";
import { Button, Dropdown, Space } from "antd";
import { FiSearch } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";
import IndexUserNegativeFeedback from "./IndexUserNegativeFeedback";
import NegativeFeedbackReplyAllModal from "./NegativeFeedbackReplyAllModal";
export const UserNegativeFeedback = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const handleMenuClick = ({ key }) => {};
  const items = [
    {
      label: "Last Day",
      key: "1",
    },
    {
      label: "Last week",
      key: "2",
    },
    {
      label: "Last Month",
      key: "3",
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div className="campaign-performance-table-head">
      <div className="d-flex justify-content-between flex-lg-row flex-xl-row flex-column align-items-center">
        <h6>Negative Feedbacks</h6>
        <div className="d-flex gap-3 align-items-center flex-lg-row flex-xl-row flex-column align-items-center">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search anything here"
              className="search-input-table"
            />
          </div>
          <div className="d-flex gap-3 align-items-center">
            <Dropdown menu={menuProps}>
              <Button>
                <Space>
                  <VscSettings />
                  Filter
                </Space>
              </Button>
            </Dropdown>
            <button className="rfh-basic-button" onClick={showModal}>
              Reply All
            </button>
          </div>
        </div>
      </div>

      <div>
        <IndexUserNegativeFeedback />
      </div>
      <NegativeFeedbackReplyAllModal
        open={isModalOpen}
        handleCancel={handleCancel}
      />
    </div>
  );
};
