import React, { useEffect, useRef, useState } from "react";
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
import { showSuccessMessage, validateImage,editorConfig, formatListWithTriangleBullets } from "../../../../globalConstant";
import { useDispatch } from "react-redux";
import { editEvent } from "../../../../Features/DiscoverEventsCard";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import Loader from "../../../../Loader";
import moment from "moment";
import dayjs from "dayjs";
import JoditEditor from "jodit-react";
import { FiMaximize2, FiMinimize2, FiX } from "react-icons/fi";
// const { TextArea } = Input;
// const { Option } = Select;

const EditEventsList = ({ open, handleCancel, eventsData }) => {
  const [title, setTitle] = useState("");
  // const [link, setLink] = useState("");
  // const [order, setOrder] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [, setFeatures] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [content, setContent] = useState("")
  const dispatch = useDispatch();
  const editor = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const toggleMaximize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMaximized(!isMaximized);
  };
  const handleUpload = (info) => {
    const file = info.file.originFileObj;
    if (!validateImage(file)) return false;
    setUploadedImage(file);
  };
  const handleDeleteImage = () => {
    setUploadedImage(null);
  };

  useEffect(() => {
    if (open && eventsData) {
      setTitle(eventsData?.title || "");
      setDescription(eventsData?.description || "");
      // setLink(eventsData?.link || "");
      // setOrder(eventsData?.order || "");
      setIsActive(eventsData?.isActive || "");
      setTime(eventsData?.time);
      const formattedDate = eventsData?.date
        ? new Date(eventsData.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "";

      setDate(formattedDate);
      setUploadedImage(eventsData?.image || null);
    } else {
      setTitle("");
      setDescription("");
      // setLink("");
      // setOrder("");
      // setIsActive(null);
      setFeatures([]);
      setUploadedImage(null);
    }
  }, [open, eventsData]);

  const handleUpdate = async () => {
    if (!title || !date || !time || !uploadedImage) {
      message.error("Please fill in all required fields.");
      return;
    }

    const formattedDate = dayjs(date, "DD-MM-YYYY").format("YYYY-MM-DD");

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    // formData.append("link", link.trim());
    // formData.append("order", parseInt(order, 10));
    formData.append("isActive", isActive);
    formData.append("image", uploadedImage);
    formData.append("date", formattedDate);
    formData.append("time", time);
    setIsLoading(true);

    try {
      const response = await Instance.put(
        `/discover/card/${eventsData?._id}`,
        formData
      );

      if (response?.status === 200 || response?.status === 201) {
        handleCancel();
        dispatch(editEvent(response.data.data));
        showSuccessMessage("Event updated successfully!");
        setTitle("");
        setDescription("");
        // setLink("");
        // setOrder("");
        setIsActive(true);
        setFeatures([]);
        setUploadedImage(null);
      }
    } catch (error) {
      console.error("Error updating event card:", error);
      message.error("Failed to update event card.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleInputChange = (key, value) => {
    setDate(value); // Directly set the formatted date string
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
        onClick={handleCancel}
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
          <span className="create-campaign-modal-title">Update Event Card</span>
        }
        onCancel={handleCancel}
        closeIcon={closeButtons}
        width={isMaximized ? "98%" : 680}
        style={isMaximized ? { top: 10, padding: 0, maxWidth: "98%" } : {}}
        bodyStyle={
          isMaximized ? { height: "calc(100vh - 110px)", overflow: "auto" } : {}
        }
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
            onClick={handleUpdate}
            className="create-campaign-save-button"
            loading={isLoading}
          >
            Update
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
              <span style={{ color: "red" }}>*</span> Title
            </span>
          </Form.Item>
          {/* <Form.Item>
            <Input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Enter Event Link" required />
            <span className="create-campaign-input-span"><span style={{ color: "red" }}>*</span> Link</span>
          </Form.Item> */}
          <Form.Item>
            <Upload
              listType="picture"
              showUploadList={false}
              onChange={handleUpload}
              className="create-campaign-upload"
              accept="image/*"
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
                  src={
                    typeof uploadedImage === "string"
                      ? uploadedImage
                      : URL.createObjectURL(uploadedImage)
                  }
                  alt="Uploaded"
                  style={{
                    width: "200px",
                    height: "auto",
                    marginTop: "10px",
                    borderRadius: "5px",
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
                {/* <DatePicker
                  className="settings-input w-100"
                  placeholder="Select Date"
                  format="YYYY-MM-DD" // Ensure the correct format
                  value={date ? moment(date, "YYYY-MM-DD") : null} // Ensure it's in correct format
                  onChange={(date) =>
                    setDate(date ? date.format("YYYY-MM-DD") : "")
                  }
                /> */}
                {/* <DatePicker
                  className="settings-input w-100"
                  placeholder="Select Date"
                  format="DD-MM-YYYY" // Ensure the correct format
                  value={date ? moment(date, "DD-MM-YYYY") : null} // Ensure it's in correct format
                  onChange={(date) =>
                    setDate(date ? date.format("DD-MM-YYYY") : "")
                  }
                /> */}
                <DatePicker
                  className="settings-input w-100"
                  placeholder="Select Date"
                  format="DD-MM-YYYY"
                  value={date ? dayjs(date, "DD-MM-YYYY") : null}
                  onChange={(date, dateString) =>
                    handleInputChange("date", dateString)
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
                  value={time ? moment(time, "HH:mm") : null}
                  onChange={(time) => setTime(time ? time.format("HH:mm") : "")}
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
              // config={editorConfig}
              config={{ ...editorConfig, className: "hide-placeholder-editor" }}
              value={description}
              onBlur={(newDescription) => {
                const modifiedContent = formatListWithTriangleBullets(newDescription);
                setDescription(modifiedContent)}}
              required
            />
            <span className="create-campaign-input-span">Description</span>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditEventsList;
