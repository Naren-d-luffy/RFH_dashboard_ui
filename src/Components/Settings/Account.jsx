import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button, Form, Input, message } from "antd";
import DefaultUser from "../../Assets/Images/singleuser.png";
import "react-international-phone/style.css";
import { Instance } from "../../AxiosConfig";
import { useNavigate } from "react-router-dom";
import {
  editSettingsProfileData,
  setSettingsProfileData,
} from "../../Features/SettingsProfileSlice";
import { useDispatch, useSelector } from "react-redux";
export const Account = () => {
  const [form] = Form.useForm();
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState("");
  const dispatch = useDispatch();
  const [profileFile, setProfileFile] = useState(null);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const navigate = useNavigate();
  const profileData = useSelector(
    (state) => state.settingsprofile.settingsprofile
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setIsProfileUpdated(true);
    }
  };
  const handleChangePasswordClick = () => {
    const email = form.getFieldValue("email");
    navigate("/confirm-password", { state: { email } });
  };
  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const fetchUser = useCallback(async () => {
    const userInfo = localStorage.getItem("userInfo");
    const parsedUserInfo = JSON.parse(userInfo);
    try {
      const response = await Instance.get(
        `/admin/getProfile/${parsedUserInfo.uid}`
      );
      dispatch(setSettingsProfileData(response.data));
      form.setFieldsValue({
        name: response.data.name,
        email: response.data.email,
        phoneNumber: response.data.phoneNumber,
      });
      setPreviewImage(response.data.profile || DefaultUser);
    } catch (error) {
      message.error("Error fetching user data");
      console.error("Error fetching user data:", error);
    }
  }, [dispatch, form]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSubmit = async () => {
    const userInfo = localStorage.getItem("userInfo");
    const parsedUserInfo = JSON.parse(userInfo);
    const updatedFields = form.getFieldsValue();

    try {
      if (isProfileUpdated) {
        const formData = new FormData();
        formData.append("name", updatedFields.name);
        formData.append("email", updatedFields.email);
        formData.append("phoneNumber", updatedFields.phoneNumber);
        if (profileFile) {
          formData.append("profile", profileFile);
        }

        const response = await Instance.put(
          `/admin/profile/${parsedUserInfo.uid}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const updatedUserInfo = {
          ...parsedUserInfo,
          name: updatedFields.name,
          email: updatedFields.email,
          phoneNumber: updatedFields.phoneNumber,
          profile: previewImage,
        };
        localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
        message.success("Profile updated successfully!");
        dispatch(editSettingsProfileData(response.data));
      } else {
        const updatedData = {};
        if (updatedFields.name !== profileData.name) {
          updatedData.name = updatedFields.name;
        }
        if (updatedFields.email !== profileData.email) {
          updatedData.email = updatedFields.email;
        }
        if (updatedFields.phoneNumber !== profileData.phoneNumber) {
          updatedData.phoneNumber = updatedFields.phoneNumber;
        }

        if (Object.keys(updatedData).length === 0) {
          message.warning("No changes made to the profile.");
          return;
        }

        try {
          const response = await Instance.patch(
            `/admin/updateProfile/${parsedUserInfo.uid}`,
            updatedData
          );
          message.success("Profile updated successfully!");
          dispatch(editSettingsProfileData(response.data));
          const updatedUserInfo = {
            ...parsedUserInfo,
            ...updatedData,
          };
          localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
        } catch (error) {
          message.error("Error updating profile");
          console.error("Error updating profile:", error);
        }
      }
    } catch (error) {
      message.error("Error updating profile");
      console.error("Error updating profile:", error);
    }
  };
  const handleDeleteProfile = async () => {
    const userInfo = localStorage.getItem("userInfo");
    const parsedUserInfo = JSON.parse(userInfo);
  
    try {
      await Instance.delete(`/admin/profile/${parsedUserInfo.uid}`);
      setPreviewImage(DefaultUser);
      setProfileFile(null);
      setIsProfileUpdated(true);
      dispatch(editSettingsProfileData({ ...profileData, profile: "" }));
      const updatedUserInfo = { ...parsedUserInfo, profile: "" };
      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
  
      message.success("Profile image deleted successfully!");
    } catch (error) {
      message.error("Error deleting profile image");
      console.error("Error deleting profile image:", error);
    }
  };
  
  return (
    <div className="settings-personal-information">
      <div className="container">
        <h4 className="mt-4 mt-lg-0">Account</h4>
        {/* <p>Settings your account details here</p> */}
        <hr style={{ color: "var(--black-color)" }} />
        <Form layout="vertical" form={form} >
          <h5>My Profile</h5>
          <div className="row mt-4">
            <div className="settings-profile-icon-section">
              <img
                src={previewImage || DefaultUser}
                alt="Profile"
                className="settings-profile-image"
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
              />
              <button
                type="button"
                className="settings-edit-icon-button ms-3"
                onClick={handleEditClick}
              >
                Upload new
              </button>
              <button
                type="button"
                className="settings-delete-button ms-3"
                onClick={handleDeleteProfile}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6 mt-4">
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  { required: true, message: "Name is required" },
                  { min: 3, message: "Name must be at least 3 characters" },
                ]}
              >
                <Input
                  className="settings-input"
                  placeholder="Enter Full Name"
                />
              </Form.Item>
            </div>
            <div className="col-md-6 mt-4">
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[
                  { required: true, message: "Phone number is required" },
                  {
                    pattern: /^[0-9]{10,15}$/,
                    message: "Enter a valid phone number",
                  },
                ]}
              >
                <Input
                  className="settings-input"
                  placeholder="Enter Phone Number"
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mt-2">
              <Form.Item name="email" label="Email"
               rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Enter a valid email" },
              ]}>
                <Input className="settings-input" placeholder="Email ID" 
                readOnly
                />
              </Form.Item>
            </div>
            <div className="col-md-6 mt-2">
              <Button
                type="button"
                className="create-campaign-cancel-button ms-3 mt-4"
                onClick={handleChangePasswordClick}
              >
                Change Password
              </Button>
            </div>
          </div>

          <div className="row mt-4">
            <div className="d-flex justify-content-end gap-2">
              <Button className="status-role-button" onClick={handleSubmit}>
                Save
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
