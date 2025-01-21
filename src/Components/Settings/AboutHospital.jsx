import { useState, useEffect } from "react";
import { Card, Input, Button, Upload, message } from "antd";
import { Instance } from "../../AxiosConfig";
import { UploadOutlined } from "@ant-design/icons";

const AboutHospital = () => {
  const [hospital, setHospital] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const response = await Instance.get("/hospital");
        setHospital(response.data.data[0]);
      } catch (error) {
        console.error("Error fetching hospital data:", error);
      }
    };
    fetchHospital();
  }, []);

  const handleChange = (key, value) => {
    setHospital({ ...hospital, [key]: value });
    setIsChanged(true);
  };

  const handleFileChange = (info) => {
    setFile(info.file);
    setIsChanged(true);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", hospital.name);
      formData.append("short_title", hospital.short_title);
      formData.append("tag", hospital.tag);
      formData.append("year", hospital.year);
      formData.append("short_description", hospital.short_description);
      formData.append("description", hospital.description);
      formData.append("history", hospital.history);
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
      message.success("Hospital data saved successfully");
      setIsChanged(false);
    } catch (error) {
      console.error("Error saving hospital data:", error);
      message.error("Error saving hospital data");
    }
  };

  return (
    <div className="settings-personal-information">
      <div className="hospital-container">
        <div className="hospital-image-container">
          <img
            src={hospital.headerImage}
            alt={hospital.name}
            className="hospital-image"
          />
          <Upload
            beforeUpload={() => false}
            onChange={handleFileChange}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />} className="upload-button">
              Edit Image
            </Button>
          </Upload>
        </div>

        <Card className="hospital-section">
          <h3>Basic Information</h3>
          <Input
            value={hospital.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Hospital Name"
          />
          <Input
            value={hospital.short_title}
            onChange={(e) => handleChange("short_title", e.target.value)}
            placeholder="Short Title"
          />
          <Input
            value={hospital.tag}
            onChange={(e) => handleChange("tag", e.target.value)}
            placeholder="Tag"
          />
          <Input
            value={hospital.year}
            onChange={(e) => handleChange("year", e.target.value)}
            placeholder="Year"
          />
        </Card>

        <Card className="hospital-section">
          <h3>Overview</h3>
          <Input.TextArea
            value={hospital.short_description}
            onChange={(e) => handleChange("short_description", e.target.value)}
            placeholder="Short Description"
          />
          <Input.TextArea
            value={hospital.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Description"
          />
        </Card>

        <Card className="hospital-section">
          <h3>History</h3>
          <Input.TextArea
            value={hospital.history}
            onChange={(e) => handleChange("history", e.target.value)}
            placeholder="History"
          />
        </Card>

        {isChanged && (
          <div className="hospital-actions">
            <Button type="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutHospital;
