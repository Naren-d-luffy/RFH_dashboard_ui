import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, Input, Menu } from "antd";
import { IoIosArrowForward } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";
import IndexUserNegativeFeedback from "./IndexUserNegativeFeedback";
import NegativeFeedbackReplyAllModal from "./NegativeFeedbackReplyAllModal";
// import IndexUserNegativeFeedback from "./IndexUserNegativeFeedback";
// import ReplyAllUserNegativeFeedback from "./ReplyAllUserNegativeFeedback";

export const UserNegativeFeedback = () => {
    const filterMenu = (
        <Menu>
            <Menu.Item key="certifications" className="filter-menu-item">
                ABC <IoIosArrowForward className="right-arrow" />
            </Menu.Item>
            <Menu.Item key="employment-type" className="filter-menu-item">
                EFG <IoIosArrowForward className="right-arrow" />
            </Menu.Item>
        </Menu>
    );
    const sortMenu = (
        <Menu>
            <Menu.Item key="datePosted" className="filter-menu-item">
                ABC <IoIosArrowForward className="right-arrow" />
            </Menu.Item>
            <Menu.Item key="jobType" className="filter-menu-item">
                EFG <IoIosArrowForward className="right-arrow" />
            </Menu.Item>
        </Menu>
    );

    const navigate = useNavigate();
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
