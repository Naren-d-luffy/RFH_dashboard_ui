import React, { useState } from "react";
import { Button, Dropdown, Input } from "antd";
import { FiSearch } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";
import IndexUserNegativeFeedback from "./IndexUserNegativeFeedback";
import NegativeFeedbackReplyAllModal from "./NegativeFeedbackReplyAllModal";
import { filterDropdown } from "../../../globalConstant"

export const UserNegativeFeedback = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);
    const handleCheckboxChange = (value, checked) => {
        if (checked) {
            setSelectedValues((prev) => [...prev, value]);
        } else {
            setSelectedValues((prev) => prev.filter((item) => item !== value));
        }
    };

    const handleApply = () => {
        console.log('Applied Filters:', selectedValues);
        setIsDropdownOpen(false);
    };
    const handleReset = () => {
        setSelectedValues([]);
    };
    const options = [
        {
            label: 'Type',
            options: [
                { label: 'All', value: 'all' },
                { label: 'OPD', value: 'opd' },
                { label: 'IPD', value: 'ipd' },
            ],
        },
        {
            label: 'Last Visit',
            options: [
                { label: 'Last 7 days', value: 'last7days' },
                { label: 'Last 30 days', value: 'last30days' },
            ],
        },
        {
            label: 'All Users',
            options: [
                { label: 'Active Users', value: 'activeusers' },
                { label: 'Inactive Users', value: 'inactiveusers' },
            ],
        },
    ];
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
                    <Dropdown
                        overlay={filterDropdown(options, selectedValues, handleCheckboxChange, handleApply, handleReset)}
                        trigger={['click']}
                        open={isDropdownOpen}
                        onOpenChange={setIsDropdownOpen}
                        placement="bottomLeft"
                    >
                        <Button style={{ width: 160 }}>
                            <VscSettings />
                            Filters
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
