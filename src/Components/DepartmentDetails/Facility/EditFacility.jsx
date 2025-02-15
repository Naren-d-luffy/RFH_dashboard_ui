import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Upload, message } from "antd";
import "react-quill/dist/quill.snow.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Instance } from "../../../AxiosConfig";
import { showSuccessMessage, validateImage } from "../../../globalConstant";
import Loader from "../../../Loader";
import { useDispatch } from "react-redux";
import { editFacility } from "../../../Features/FacilitySlice";


const EditFacility = ({ open, handleCancel, facilityData }) => {
  const [title, setTitle] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (open && facilityData) {
      setTitle(facilityData.heading || "");
      setThumbnailImage(facilityData.thumbnail || null);
    }
  }, [open, facilityData]);

  const handleUploadThumbnail = (info) => {
    const file = info.file.originFileObj;
    if (!validateImage(file)) return false;
    setThumbnailImage(file);
  };

  const handleDeleteThumbnail = () => {
    setThumbnailImage(null);
  };

  const handleUpdate = async () => {
    if (
      !title ||
      !thumbnailImage 
    ) {
      message.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("heading", title);
     
      if (thumbnailImage && typeof thumbnailImage !== "string") {
        formData.append("thumbnail", thumbnailImage);
      }

      const response = await Instance.put(
        `/depcat/facility/${facilityData._id}`,
        formData
      );
      if (response?.status === 200 || response?.status === 201) {
        showSuccessMessage("Facility updated successfully!");
        handleCancel();
        dispatch(editFacility(response.data));
      }
    } catch (error) {
      console.error("Failed to update facility:", error);
      message.error("Failed to update facility.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Modal
        visible={open}
        title={
          <span className="create-campaign-modal-title">
            Edit Facility
          </span>
        }
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
            key="update"
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
              placeholder="Add Title"
              required
            />
            <span className="create-campaign-input-span">
              <span style={{ color: "red" }}>*</span> Title
            </span>
          </Form.Item>
          
          <div className="row">
            <div className="col-lg-12">
              <Form.Item>
                <Upload
                  listType="picture"
                  showUploadList={false}
                  onChange={handleUploadThumbnail}
                  className="create-campaign-upload"
                >
                  <p className="create-campaign-ant-upload-text">
                    Drop files here or click to upload
                  </p>
                  <IoCloudUploadOutline />{" "}
                  <span style={{ color: "#727880" }}>Upload Thumbnail</span>
                </Upload>
                {thumbnailImage && (
                  <div className="uploaded-image-preview">
                    <img
                      src={
                        typeof thumbnailImage === "string"
                          ? thumbnailImage
                          : URL.createObjectURL(thumbnailImage)
                      }
                      alt="Thumbnail"
                      style={{
                        width: "200px",
                        height: "auto",
                        marginTop: "10px",
                      }}
                    />
                    <Button
                      onClick={handleDeleteThumbnail}
                      className="model-image-upload-delete-icon"
                    >
                      <RiDeleteBin5Line />
                    </Button>
                  </div>
                )}
                <span className="create-campaign-input-span">
                  <span style={{ color: "red" }}>*</span> Thumbnail Image
                </span>
              </Form.Item>
            </div>
         
          </div>
          
        </Form>
      </Modal>
    </>
  );
};

export default EditFacility;
