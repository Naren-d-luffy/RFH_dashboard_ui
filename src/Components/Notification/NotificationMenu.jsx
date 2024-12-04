import { Col, Row, Select, Tabs } from 'antd'
import { Option } from 'antd/es/mentions'
import TabPane from 'antd/es/tabs/TabPane'
import React, { useState } from 'react'
import { GoPlus } from 'react-icons/go'
import { PiExport } from 'react-icons/pi'
import { Form, useSearchParams } from 'react-router-dom'
import SidebarActiveNotification from './SidebarActiveNotification'
import SidebarCompletedNotification from './SidebarCompletedNotification'
import SidebarNotificationDraft from './SidebarNotificationDraft'
import CreateSidebarNotificationModal from './CreateSidebarNotificationModal'

const NotificationMenu = () => {
    const [searchParams] = useSearchParams();
    const page = searchParams.get("tab");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);
    return (
        <div className='container'>
            <div className="d-flex justify-content-between align-items-center">
                <div className='user-engagement-header'>
                    <h3>Notification</h3>
                    <p >
                        Stay Informed Important Update for All Users
                    </p>
                </div>
                <button className="d-flex gap-2 align-items-center rfh-basic-button"
                    onClick={showModal}
                >
                    <GoPlus />
                    Create Notification
                </button>
            </div>
            <div className='mt-3'>
                <Row gutter={24}>
                    <Col span={8}>
                        <Select
                            className="create-camapign-input-select"
                            placeholder="All"
                            style={{ width: "100%" }}
                            dropdownClassName="create-campaign-dropdown"
                        >
                            <Select.Option value="All">All Users</Select.Option>
                            <Select.Option value="">New Users</Select.Option>
                            <Select.Option value="">Old Users</Select.Option>
                        </Select>
                        <span className="create-campaign-input-span">Trigger by</span>
                    </Col>
                </Row>
            </div>
            <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-3">
                    <div className=" mt-4 rounded-lg project-card xl:col-span-2">
                        <Tabs defaultActiveKey={page || "1"}>
                            <TabPane tab={<>Active<span className='notification-menu-count-span'>05</span> </>} key="1">
                                <SidebarActiveNotification />
                            </TabPane>
                            <TabPane tab={<>Completed<span className='notification-menu-count-span'>02</span> </>} key="2">
                                <SidebarCompletedNotification />
                            </TabPane>
                            <TabPane tab={<>Draft<span className='notification-menu-count-span'>01</span> </>} key="3">
                                <SidebarNotificationDraft />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
            <CreateSidebarNotificationModal open={isModalOpen} handleCancel={handleCancel} />
        </div>
    )
}

export default NotificationMenu
