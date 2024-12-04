
import { Button, Modal, Form, Input, DatePicker, TimePicker } from "antd";
import "react-quill/dist/quill.snow.css";
import { Upload } from "antd";
import { IoCloudUploadOutline } from "react-icons/io5";
import { EnvironmentOutlined } from "@ant-design/icons";
import {showSuccessMessage} from "../../../globalConstant"
const handleClick=()=>{
  showSuccessMessage("Successfully Created", "");
}
const OutstationClinic = ({ open, handleCancel }) => (
  <Modal
    open={open}
    title={<span className="create-campaign-modal-title">Outstation Clinic</span>}
    onCancel={handleCancel}
    width={680}
    footer={[
      <Button
        key="back"
        onClick={handleCancel}
        className="create-campaign-cancel-button"
      >
        Cancel
      </Button>,
      <Button
        key="save"
        onClick={handleClick}
        className="create-campaign-save-button"
      >
        Save
      </Button>,
    ]}
  >
    <Form layout="vertical" className="mt-4">
      <Form.Item label="Upload image">
        <Upload listType="picture" className="create-campaign-upload">
          <p className="create-campaign-ant-upload-text">
            Drop files here or click to upload
          </p>
          <span className="create-campaign-ant-upload-drag-icon">
            <IoCloudUploadOutline />{" "}
            <span style={{ color: "#727880" }}>Upload Image</span>
          </span>
        </Upload>
      </Form.Item>
      <div className="row">
        <div className="col-md-6 mt-2">
          <Form.Item>
            <Input
              className="settings-input"
              placeholder="Clinic name"
              defaultValue="Acidity clinic"
            />
            <span className="settings-input-span">Clinic name</span>
          </Form.Item>
        </div>
        <div className="col-md-3 mt-2">
          <Form.Item>
            <DatePicker
              className="settings-input w-100"
              placeholder="Select Date"
              format="DD-MM-YYYY"
            />
            <span className="settings-input-span">Camp Date</span>
          </Form.Item>
        </div>
        <div className="col-md-3 mt-2">
          <Form.Item>
            <TimePicker
              className="settings-input w-100"
              placeholder="Select Time"
              format="HH:mm"
            />
            <span className="settings-input-span">Camp Time</span>
          </Form.Item>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mt-2">
          <Form.Item>
            <Input
              className="settings-input"
              placeholder="Description"
              defaultValue="Gastroscience Department"
            />
            <span className="settings-input-span">Description</span>
          </Form.Item>
        </div>
        <div className="col-md-6 mt-2">
          <Form.Item>
            <Input
              className="settings-input"
              placeholder="Hospital Name"
              defaultValue="RFH Hospital"
            />
            <span className="settings-input-span">Hospital Name</span>
          </Form.Item>
        </div>
      </div>
      <div className="mb-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d201561.48555289168!2d72.53166428671874!3d18.958732100000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce11624bd7f5%3A0x9e69b276b442c51a!2sSir%20H.%20N.%20Reliance%20Foundation%20Hospital%20and%20Research%20Centre!5e1!3m2!1sen!2sin!4v1732793162438!5m2!1sen!2sin"
          width="100%"
          height="250"
          style={{ border: "0" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="row">
        <div className="col-md-6 mt-2">
          <Form.Item>
            <Input
              className="settings-input"
              placeholder="Enter Address"
              defaultValue="Raja Rammohan Roy Road, Prarthana Samaj, Girgaon, Mumbai "
              prefix={
                <EnvironmentOutlined
                  style={{ color: "#00963F", fontSize: "14px" }}
                />
              }
            />

            <span className="settings-input-span">Address</span>
          </Form.Item>
        </div>
        <div className="col-md-6 mt-2">
          <Form.Item>
            <Input
              className="settings-input"
              placeholder="Enter Pincode"
              defaultValue="456567"
            />
            <span className="settings-input-span">Pin Code</span>
          </Form.Item>
        </div>
      </div>
    </Form>
  </Modal>
);

export default OutstationClinic;
