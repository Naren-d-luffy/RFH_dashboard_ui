import React, { useRef, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  message,
  Upload,
  Switch,
  DatePicker,
  TimePicker,
} from "antd";
import { Instance } from "../../../../AxiosConfig";
import {
  showErrorMessage,
  showSuccessMessage,
  validateImage,
  editorConfig
} from "../../../../globalConstant";
import { useDispatch } from "react-redux";
import { addEvent } from "../../../../Features/DiscoverEventsCard";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import Loader from "../../../../Loader";
import moment from "moment";
import JoditEditor from "jodit-react";
import { FiMaximize2, FiMinimize2, FiX } from "react-icons/fi";

const AddEventsList = ({ open, handleCancel }) => {
  const [title, setTitle] = useState("");
  // const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const editor = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const toggleMaximize = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    setIsMaximized(!isMaximized);
  };
  const dispatch = useDispatch();

  const handleUpload = (file) => {
    if (!validateImage(file)) return false;
    setUploadedImage(file);
    return false;
  };
  const handleDeleteImage = () => {
    setUploadedImage(null);
  };
  const handleSave = async () => {
    if (!title.trim() || !date || !time || !uploadedImage) {
      message.error("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("isActive", isActive);
    formData.append("date", date);
    formData.append("time", time);

    formData.append("image", uploadedImage);

    // console.log("Form Data being sent:");
    // for (let pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    // return;
    setIsLoading(true);

    try {
      const response = await Instance.post("/discover/card", formData);
      console.log(response, "event");
      if (response?.status === 200 || response?.status === 201) {
        handleCancel();

        dispatch(addEvent(response.data.data));
        showSuccessMessage("Event card added successfully!");
        setTitle("");
        setDescription("");
        setTime("");
        setIsActive(true);
        setDate("");
        setUploadedImage(null);
      }
    } catch (error) {
      console.error("Error adding event card:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Error adding event";
      showErrorMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancelClick = (e) => {
    e.preventDefault(); // Prevent any form submission
    e.stopPropagation(); // Stop event bubbling
    setTitle("");
    setDescription("");
    // setLink("");
    // setOrder("");
    setIsActive(true);
    // setFeatures([]);
    setUploadedImage(null);
    handleCancel();
  };
  const closeButtons = (
    <div className="d-flex items-center gap-2 pe-5">
      <Button
        type="button"
        onClick={toggleMaximize}
        icon={
          isMaximized ? <FiMinimize2 size={16} /> : <FiMaximize2 size={16} />
        }
      />
      <Button
        type="button"
        className="p-0 w-10 h-10 flex items-center justify-center hover:bg-gray-100"
        onClick={handleCancelClick}
      >
        <span>
          <FiX size={18} />
        </span>
      </Button>
    </div>
  );
  return (
    <>
      {isLoading && <Loader />}
      <Modal
        visible={open}
        title={
          <span className="create-campaign-modal-title">Add Event Card</span>
        }
        onCancel={handleCancelClick}
        closeIcon={closeButtons}
        width={isMaximized ? "98%" : 680}
        style={isMaximized ? { top: 10, padding: 0, maxWidth: "98%" } : {}}
        bodyStyle={
          isMaximized ? { height: "calc(100vh - 110px)", overflow: "auto" } : {}
        }
        footer={[
          <Button
            key="back"
            onClick={handleCancelClick}
            className="create-campaign-cancel-button"
          >
            Cancel
          </Button>,
          <Button
            key="save"
            onClick={handleSave}
            className="create-campaign-save-button"
            loading={isLoading}
          >
            Save
          </Button>,
        ]}
      >
        <Form layout="vertical" className="mt-4">
          <Form.Item>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Event Title"
              required
            />
            <span className="create-campaign-input-span">
              {" "}
              <span style={{ color: "red" }}>*</span> Title
            </span>
          </Form.Item>
          {/* <Form.Item>
            <Input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Enter Event Link"
              required
            />
            <span className="create-campaign-input-span"><span style={{ color: "red" }}>*</span> Link</span>
          </Form.Item> */}
          <Form.Item>
            <Upload
              listType="picture"
              showUploadList={false}
              beforeUpload={handleUpload}
              className="create-campaign-upload"
            >
              <p className="create-campaign-ant-upload-text">
                Drop files here or click to upload
              </p>
              <span className="create-campaign-ant-upload-drag-icon">
                <IoCloudUploadOutline className="image-upload-icon" />{" "}
                <span style={{ color: "#727880" }}>Upload Image</span>
              </span>
            </Upload>
            {uploadedImage && (
              <div className="uploaded-image-preview d-flex gap-2">
                <img
                  src={URL.createObjectURL(uploadedImage)}
                  alt="Uploaded"
                  style={{
                    width: "200px",
                    height: "auto",
                    marginTop: "10px",
                    borderRadius: "5px",
                    objectFit: "cover",
                  }}
                />
                <Button
                  onClick={handleDeleteImage}
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#e6f2ed",
                    borderRadius: "50%",
                    fontSize: "16px",
                    padding: "4px 12px",
                  }}
                >
                  <RiDeleteBin5Line className="model-image-upload-delete-icon" />
                </Button>
              </div>
            )}
            <span className="create-campaign-input-span">
              <span style={{ color: "red" }}>*</span> Image
            </span>
          </Form.Item>

          <div className="row">
            <div className="col-md-3 mt-2">
              <Form.Item>
                <DatePicker
                  className="settings-input w-100"
                  placeholder="Select Date"
                  format="YYYY-MM-DD" // Ensure the correct format
                  value={date ? moment(date, "YYYY-MM-DD") : null} // Ensure it's in correct format
                  onChange={(date) =>
                    setDate(date ? date.format("YYYY-MM-DD") : "")
                  }
                />
                <span className="create-campaign-input-span">
                  <span style={{ color: "red" }}>*</span> Event Date
                </span>
              </Form.Item>
            </div>
            <div className="col-md-3 mt-2">
              <Form.Item>
                <TimePicker
                  className="settings-input w-100"
                  placeholder="Select Time"
                  format="HH:mm"
                  value={time ? moment(time, "HH:mm") : null} // Convert string to Moment
                  onChange={(time) => setTime(time ? time.format("HH:mm") : "")} // Convert Moment to string
                />
                <span className="create-campaign-input-span">
                  <span style={{ color: "red" }}>*</span> Event Time
                </span>
              </Form.Item>
            </div>
            <div className="col-lg-4 mb-5">
              <div
                className="mt-3"
                style={{ display: "flex", gap: "20px", alignItems: "center" }}
              >
                <div>
                  <span style={{color:'var(--black-color)'}}>Active &nbsp;</span>
                  <Switch
                    className="gastro-switch-button"
                    checked={isActive}
                    onChange={(checked) => setIsActive(checked)}
                  />
                </div>
              </div>
            </div>
          </div>
          <Form.Item>
            <JoditEditor
              ref={editor}
              value={description}
              config={editorConfig}
              onChange={setDescription}
            />
            <span className="create-campaign-input-span">Description</span>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddEventsList;
