import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, message, Col, Row, TextArea } from "antd";
import { Instance } from "../../../../AxiosConfig";
import { useDispatch } from "react-redux";
import { editOutstationClinic } from "../../../../Features/OutstationClinicSlice";
import Loader from "../../../../Loader";

const EditOutstationClinic = ({ open, handleCancel, EventData }) => {
  const { TextArea } = Input;
  const [clinicName, setClinicName] = useState("");
  const [address, setAddress] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState("");
  const [patients, setPatients] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [timing, setTiming] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (EventData) {
      setClinicName(EventData.name || "");
      setAddress(EventData.location || "");
      setRating(EventData.rating?.toString() || "");
      setReviews(EventData.reviews?.toString() || "");
      setPatients(EventData.patients?.toString() || "");
      setExperience(EventData.experience || "");
      setDescription(EventData.about || "");
      setTiming(EventData.timing || "");
    }
  }, [EventData]);

  const handleSave = async () => {
    if (
      !clinicName ||
      !address ||
      !rating ||
      !reviews ||
      !patients ||
      !experience ||
      !description ||
      !timing
    ) {
      message.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        name: clinicName,
        location: address,
        rating: parseFloat(rating),
        reviews: parseInt(reviews, 10),
        patients: parseInt(patients, 10),
        experience: experience.toString(),
        about: description,
        timing,
      };

      console.log("Submitting Edited Data: ", payload);

      const response = await Instance.put(
        `/discover/clinic/${EventData._id}`,
        payload
      );

      if (response?.status === 200) {
        handleCancel();
        message.success("Outstation Clinic details updated successfully!");
        dispatch(editOutstationClinic(response.data));
      }
    } catch (error) {
      console.error(
        "Error while updating clinic: ",
        error?.response?.data || error
      );
      message.error("Failed to update outstation clinic. Please try again.");
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
            Edit Outstation Clinic
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
            key="save"
            onClick={handleSave}
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
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
              placeholder="Edit Clinic Name"
              required
            />
            <span className="create-campaign-input-span">Clinic Name</span>
          </Form.Item>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <Input
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  placeholder="Enter Rating (e.g., 4.5)"
                  required
                />
                <span className="create-campaign-input-span">Rating</span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Input
                  value={reviews}
                  onChange={(e) => setReviews(e.target.value)}
                  placeholder="Enter Number of Reviews"
                  required
                />
                <span className="create-campaign-input-span">Reviews</span>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <Input
                  value={patients}
                  onChange={(e) => setPatients(e.target.value)}
                  placeholder="Enter Number of Patients"
                  required
                />
                <span className="create-campaign-input-span">Patients</span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Input
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Enter Experience (in years)"
                  required
                />
                <span className="create-campaign-input-span">Experience</span>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Edit Description"
              required
            />
            <span className="create-campaign-input-span">About</span>
          </Form.Item>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <Input
                  value={timing}
                  onChange={(e) => setTiming(e.target.value)}
                  placeholder="Enter Timing (e.g., Mon-Fri 9AM-5PM)"
                  required
                />
                <span className="create-campaign-input-span">Timing</span>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Address"
              required
            />
            <span className="create-campaign-input-span">Address</span>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditOutstationClinic;
