import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Upload } from "antd";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Instance } from "../../../AxiosConfig";
import { showErrorMessage, showSuccessMessage } from "../../../globalConstant";
import { useDispatch } from "react-redux";
import Loader from "../../../Loader";
import { updateDoctorProfile } from "../../../Features/DoctorProfileSlice";
const UploadProfileModal = ({ open, handleCancel, doctorData }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [doctorId, setDoctorId] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [designation, setDesignation] = useState("");
  const [, setDoctorEmail] = useState("");
  const [, setDoctorMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleUpload = (info) => {
    const file = info.file.originFileObj;
    setUploadedImage(file);
  };

  const handleDeleteImage = () => {
    setUploadedImage(null);
  };

  useEffect(() => {
    if (doctorData) {
        console.log("doctorData",doctorData)
      setDoctorId(doctorData.doctorId || "");
      setDoctorName(doctorData.doctorName || "");
      setDoctorEmail(doctorData.email || "");
      setDesignation(doctorData.designation || "");
      setDoctorMobile(doctorData.mobile || "");   
      if (doctorData.profileImage) {
        setUploadedImage(doctorData.profileImage);
      } else {
        setUploadedImage(null);
      }
    }
  }, [doctorData]);

  const handleUpdateProfileImage = async () => {
    if (!uploadedImage) {
      showErrorMessage("Please upload an image first");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("profileImage", uploadedImage);
      formData.append("doctorId", doctorId);
      formData.append("doctorName", doctorName);
      formData.append("designation", designation);
      let response;
      if (!doctorData.profileImage) {
        response = await Instance.post("/doctorProfile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        showSuccessMessage("Profile created successfully!");
      } else {
        // If doctorData has a profileImage, use PUT
        response = await Instance.put(`/doctorProfile/${doctorData._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        showSuccessMessage("Profile updated successfully!");
      }
      dispatch(updateDoctorProfile({
        doctorId: doctorData.doctorId,
        profileImage: response.data.profileImage || response.data.data.profileImage
      }));
      console.log('Dispatched action payload:', {
        doctorId: doctorData.doctorId,
        profileImage: response.data.profileImage || response.data.data.profileImage,
      });
      handleCancel();
    } catch (error) {
      console.error("Error updating profile:", error);
      showErrorMessage("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      {isLoading && <Loader />}
      <Modal
        visible={open}
        title={<span className="create-campaign-modal-title">Edit Doctor</span>}
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
            onClick={handleUpdateProfileImage}
            className="create-campaign-save-button"
            loading={isLoading}
          >
            Update
          </Button>,
        ]}
      >
        <Form layout="vertical" className="mt-4">
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
                <IoCloudUploadOutline />{" "}
                <span style={{ color: "#727880" }}>Upload Profile Image</span>
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
            <span className="create-campaign-input-span">Profile Image</span>
          </Form.Item>
          <Form.Item>
            <Input
              value={doctorData?.doctorId || ""}
              disabled
              className="disabled-input"
            />
            <span className="create-campaign-input-span">Doctor Id</span>
          </Form.Item>
          <Form.Item>
            <Input
              value={doctorData?.doctorName || ""}
              disabled
              className="disabled-input"
            />
            <span className="create-campaign-input-span">Doctor Name</span>
          </Form.Item>
          <Form.Item>
            <Input
              value={doctorData?.designation || ""}
              disabled
              className="disabled-input"
            />
            <span className="create-campaign-input-span">Designation</span>
          </Form.Item>
          <Form.Item>
            <Input
              value={doctorData?.email || ""}
              disabled
              className="disabled-input"
            />
            <span className="create-campaign-input-span">Email</span>
          </Form.Item>
          <Form.Item>
            <Input
              value={doctorData?.mobile || ""}
              disabled
              className="disabled-input"
            />
            <span className="create-campaign-input-span">Mobile</span>
          </Form.Item>
          
        </Form>
      </Modal>
    </>
  );
};

export default UploadProfileModal;
