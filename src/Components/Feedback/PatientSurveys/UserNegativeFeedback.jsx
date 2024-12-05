import React, { useState } from "react";
import { Button, Dropdown, Input } from "antd";
import { FiSearch } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";
import IndexUserNegativeFeedback from "./IndexUserNegativeFeedback";
import NegativeFeedbackReplyAllModal from "./NegativeFeedbackReplyAllModal";
export const UserNegativeFeedback = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);
    const handleMenuClick = ({ key }) => { };
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
        <div className="">
            <div className='user-engagement-header'>
                <h3>Negative Feedbacks</h3>
            </div>

            <div className="d-flex gap-3 align-items-center justify-content-between mt-4">
                <div
                    className="d-flex align-items-center px-3"
                    style={{
                        border: "1px solid var(--border-color)",
                        borderRadius: "8px",
                        height: "33px",
                    }}
                >
                    <FiSearch style={{ color: "#888", marginRight: "10px" }} />
                    <Input
                        type="text"
                        placeholder="Search anything here"
                        style={{
                            border: "none",
                            outline: "none",
                        }}
                    />
                </div>
                <div className="d-flex align-items-center gap-2">
                    <Dropdown menu={menuProps}>
                        <Button>
                            <VscSettings />
                            Filter
                        </Button>
                    </Dropdown>
                    <button className="d-flex gap-3 align-items-center rfh-basic-button" onClick={showModal}>
                        Reply All
                    </button>
                </div>
            </div>

            <div>
                <IndexUserNegativeFeedback />
            </div>
            <NegativeFeedbackReplyAllModal open={isModalOpen} handleCancel={handleCancel} />
        </div>
    );
};
