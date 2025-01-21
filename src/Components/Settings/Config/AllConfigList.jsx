import React, { useState, useEffect } from "react";
import { Spin, Button, Card, Modal, message } from "antd";
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
    <div className="container">
      <div className="d-flex justify-content-between mb-4">
        <h2>All Configurations</h2>
        <Button type="primary" onClick={() => setAddConfigModalVisible(true)}>
          <FaPlus /> Add Configuration
        </Button>
      </div>

      {loading ? (
        <Spin size="large" className="d-flex justify-content-center mt-5" />
      ) : (
        <div className="row">
          {configs.map((config, index) => (
            <div key={config._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <Card
                title={`Configuration ${index + 1}`}
                bordered
                className="config-card"
              >
                <div>
                  {/* Add check to make sure config.config is not null or undefined */}
                  {config.content &&
                  Object.entries(config.content).length > 0 ? (
                    Object.entries(config.content).map(([key, value]) => (
                      <p key={key}>
                        <strong>{key}:</strong> {value || "N/A"}
                      </p>
                    ))
                  ) : (
                    <p>No configuration data available</p>
                  )}
                </div>
                <div className="d-flex justify-content-between">
                  <Button
                    type="text"
                    icon={<HiOutlinePencilSquare />}
                    onClick={() => setSelectedConfig(config)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="text"
                    icon={<MdDeleteOutline />}
                    onClick={() => handleDeleteConfig(config._id)}
                    danger
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
  );
};

export default AllConfigList;
