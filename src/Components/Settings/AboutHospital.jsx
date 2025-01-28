import { useState, useEffect, useCallback } from "react";
import { Input, Button, Upload, message, Form, Modal } from "antd";
import { Instance } from "../../AxiosConfig";
import { FiEdit } from "react-icons/fi";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { setHospitalData } from "../../Features/AboutHospitalSlice";
import Loader from "../../Loader";
const AboutHospital = () => {
  const [hospital, setHospital] = useState({});
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const showModal = () => {
    form.setFieldsValue(hospital);
    setIsModalOpen(true);
  };

  const handleCancel = () => setIsModalOpen(false);

  // const fetchHospital = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await Instance.get("/hospital");
  //     const hospitalData = response.data.data[0];
  //     setHospital(hospitalData);
  //     dispatch(setHospitalData(hospitalData));
  //     form.setFieldsValue(hospitalData);
  //     if (hospitalData.headerImage) {
  //       setThumbnailImage(hospitalData.headerImage);
  //     }
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching hospital data:", error);
  //     message.error("Failed to fetch hospital data");
  //     setIsLoading(false);
  //   }
  // };
  const fetchHospital = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await Instance.get("/hospital");
      const hospitalData = response.data.data[0];
      setHospital(hospitalData);
      dispatch(setHospitalData(hospitalData));
      form.setFieldsValue(hospitalData);
      if (hospitalData.headerImage) {
        setThumbnailImage(hospitalData.headerImage);
      }
    } catch (error) {
      console.error("Error fetching hospital data:", error);
      message.error("Failed to fetch hospital data");
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, form]); 

  useEffect(() => {
    fetchHospital();
  }, [fetchHospital]);

  const handleFileChange = (info) => {
    const selectedFile = info.file.originFileObj;
    setFile(selectedFile);
    setThumbnailImage(URL.createObjectURL(selectedFile));
    setIsChanged(true);
  };

  const handleDeleteImage = () => {
    setFile(null);
    setThumbnailImage(null);
    setIsChanged(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (file) {
        formData.append("headerImage", file);
      }
      const response = await Instance.put(
        `/hospital/6787609a02298d6c010e5a04`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      
      // dispatch(editHospital(response.data.data))
      message.success("Hospital data saved successfully");
      fetchHospital();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving hospital data:", error);
      message.error("Error saving hospital data");
    }
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Only image files are allowed!");
    }
    return isImage;
  };
  if (isLoading) {
    <Loader />;
    return;
  }
  return (
    <div className="settings-personal-information">
      <div className="hospital-container">
        <div className="d-flex justify-content-between">
          <div>
            <h4 className="mt-4 mt-lg-0">About Hospital</h4>
            <p>Information about the hospital</p>
          </div>
          <div>
            <button className="rfh-basic-button" onClick={showModal}>
              <FiEdit size={20} /> Edit
            </button>
          </div>
        </div>
        <hr style={{ color: "var(--black-color)" }} />
        <div className="hospital-section mt-4">
          <div className="d-flex justify-content-between">
            <h3 style={{ color: "var(--primary-green)" }}>Basic Information</h3>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <div className="d-flex mt-4">
                <h4 className="hospital-title-heading">Hospital Name</h4>
                <p className="hospital-title-paragraph">: {hospital.name}</p>
              </div>
              <div className="d-flex ">
                <h4 className="hospital-title-heading">Hospital Short Title</h4>
                <p className="hospital-title-paragraph">
                  : {hospital.short_title}
                </p>
              </div>
              <div className="d-flex ">
                <h4 className="hospital-title-heading">Hospital Tag</h4>
                <p className="hospital-title-paragraph">: {hospital.tag}</p>
              </div>
              <div className="d-flex ">
                <h4 className="hospital-title-heading">
                  Hospital Established year
                </h4>
                <p className="hospital-title-paragraph">: {hospital.year}</p>
              </div>
            </div>
            <div className="settings-profile-icon-section ">
              {thumbnailImage && (
                <img
                  src={thumbnailImage}
                  alt={hospital.name}
                  className="hospital-profile-image"
                  style={{
                    width: "200px",
                    height: "auto",
                    borderRadius: "5px",
                  }}
                />
              )}
            </div>
          </div>

          <hr style={{ color: "var(--black-color)" }} />
          <h3 style={{ color: "var(--primary-green)" }}>Overview</h3>
          <div className="hospital-profile-description">
            <h4>Short Description</h4>
            <p>{hospital.short_description}</p>
          </div>
          <div className="hospital-profile-description">
            <h4> Description</h4>
            <p>{hospital.description}</p>
          </div>
          <hr style={{ color: "var(--black-color)" }} />
          <h3 style={{ color: "var(--primary-green)" }}>History</h3>
          <div className="hospital-profile-description">
            <p>{hospital.history}</p>
          </div>
        </div>

        <Modal
          width={600}
          title={
            <span className="create-campaign-modal-title">
              Edit Hospital Information
            </span>
          }
          open={isModalOpen}
          onCancel={handleCancel}
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
              onClick={handleSave}
              className="create-campaign-save-button"
            >
              Save
            </Button>,
          ]}
        >
          <Form layout="vertical" form={form} onFinish={handleSave}>
            <div className="col-lg-12 mt-4">
              <Form.Item>
                <Upload
                  listType="picture"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleFileChange}
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
                {thumbnailImage && (
                  <div className="uploaded-image-preview d-flex gap-2">
                    <img
                      src={thumbnailImage}
                      alt="Thumbnail"
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
              </Form.Item>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <Form.Item
                  name="name"
                  label="Hospital Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the hospital name",
                    },
                  ]}
                >
                  <Input placeholder="Enter hospital name" />
                </Form.Item>
              </div>
              <div className="col-lg-6">
                <Form.Item
                  name="short_title"
                  label="Short Title"
                  rules={[
                    { required: true, message: "Please enter the short title" },
                  ]}
                >
                  <Input placeholder="Enter short title" />
                </Form.Item>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <Form.Item
                  name="tag"
                  label="Tag"
                  rules={[{ required: true, message: "Please enter the tag" }]}
                >
                  <Input placeholder="Enter tag" />
                </Form.Item>
              </div>
              <div className="col-lg-6">
                <Form.Item name="year" label="Year">
                  <Input placeholder="Enter established year" />
                </Form.Item>
              </div>

              <div className="col-lg-12">
                <Form.Item name="short_description" label="Short Title">
                  <Input.TextArea placeholder="Enter short description" />
                </Form.Item>
              </div>

              <div className="col-lg-12">
                <Form.Item name="description" label="Description">
                  <Input.TextArea placeholder="Enter description" />
                </Form.Item>
              </div>

              <div className="col-lg-12">
                <Form.Item name="history" label="History">
                  <Input.TextArea placeholder="Enter history" />
                </Form.Item>
              </div>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default AboutHospital;
