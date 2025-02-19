import React, { useState } from "react";
import { Spin, Button, Card, Modal } from "antd";
import { FaPlus } from "react-icons/fa6";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdDeleteOutline } from "react-icons/md";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useConfigList } from "./useConfigList";
import EditConfigModal from "./EditConfigModal";
import AddConfigurationModal from "./AddConfigurationModal";

const AllConfigList = () => {
  const { configs, loading, fetchConfigs, deleteConfig } = useConfigList();
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [isAddConfigModalVisible, setAddConfigModalVisible] = useState(false);

  const handleDeleteConfig = (id) => {
    Modal.confirm({
      title:
        "Deleting this configuration may affect functionality on Application. Proceed?",
      icon: <ExclamationCircleOutlined style={{ color: "red" }} />,
      okText: "Yes",
      cancelText: "No",
      onOk: () => deleteConfig(id),
    });
  };

  return (
    <>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="d-flex justify-content-between mb-4 marketing-categories-section">
          <h3>All Configurations</h3>
          <Button
            className="create-campaign-save-button"
            onClick={() => setAddConfigModalVisible(true)}
          >
            <FaPlus /> Add Configuration
          </Button>
        </div>

        {loading ? (
          <Spin size="large" className="d-flex justify-content-center mt-5" />
        ) : configs.length === 0 ? (
          <div className="text-center mt-5">
            <p className="coming-soon-text">No data found</p>
          </div>
        ) : (
          <div className="row">
            {configs.map((config, index) => (
              <div
                key={config._id}
                className="col-lg-6 col-md-7 col-sm-12 mb-4"
              >
                <Card
                  title={config.name || `Configuration ${index + 1}`}
                  bordered
                  className="settings-event-card"
                >
                  <div>
                    {config.content &&
                      Object.entries(config.content).map(([key, value]) => (
                        <p key={key}>
                          <strong>{key}:</strong> {value || "N/A"}
                        </p>
                      ))}
                  </div>
                  <div className="d-flex justify-content-end gap-3">
                    <Button
                      type="text"
                      className="create-campaign-save-button"
                      icon={<HiOutlinePencilSquare />}
                      onClick={() => setSelectedConfig(config)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="text"
                      className="campaign-performance-table-delete-icon"
                      icon={<MdDeleteOutline />}
                      onClick={() => handleDeleteConfig(config._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}

        {selectedConfig && (
          <EditConfigModal
            config={selectedConfig}
            onClose={() => setSelectedConfig(null)}
            refreshList={fetchConfigs}
          />
        )}
        <AddConfigurationModal
          visible={isAddConfigModalVisible}
          onClose={() => setAddConfigModalVisible(false)}
          refreshList={fetchConfigs}
        />
      </div>
    </>
  );
};

export default AllConfigList;
