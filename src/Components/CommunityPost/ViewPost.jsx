import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";

const ViewPost = ({ open, handleCancel, newsData }) => {
  const [postDetails, setPostDetails] = useState({
    title: "",
    content: "",
    type: "",
    reports: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    userId: { name: "Unknown", image: "" },
    imageUrls: [],
    videoUrls: [],
  });

  useEffect(() => {
    if (newsData) {
      setPostDetails({
        title: newsData.title || "",
        content: newsData.content || "",
        type: newsData.type || "",
        reports: newsData.reports || 1,
        likes: newsData.likes || 0,
        comments: newsData.comments || 0,
        shares: newsData.shares || 0,
        userId: newsData.userId || { name: "Unknown", image: "" },
        imageUrls: newsData.imageUrls || [],
        videoUrls: newsData.videoUrls || [],
      });
    }
  }, [newsData]);

  return (
    <>
    <Modal
      visible={open}
      onCancel={handleCancel}
      footer={[
        <Button
          key="close"
          onClick={handleCancel}
          className="create-campaign-save-button"
        >
          Close
        </Button>,
      ]}
      className="custom-modal"
      width={600}
    >
      <div className="d-flex justify-content-center mb-2">
        <h4>View Post Details</h4>
      </div>

      <div className="d-flex mb-3">
        <img
          src={
            postDetails.userId.image ||
            "https://reliancehospital.s3.eu-north-1.amazonaws.com/avatar.png"
          }
          alt={postDetails.userId.name}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            marginRight: "10px",
            border: "1px solid #ddd",
          }}
        />
        <span style={{ fontWeight: "bold" }}>{postDetails.userId.name}</span>
      </div>

      <p>
        <strong>Title:</strong> {postDetails.title}
      </p>
      <p>
        <strong>Content:</strong> {postDetails.content}
      </p>
      <p>
        <strong>Type:</strong> {postDetails.type}
      </p>
      <p>
        <strong>Reports:</strong> {postDetails.reports}
      </p>
      <p>
        <strong>Likes:</strong> {postDetails.likes}
      </p>
      <p>
        <strong>Comments:</strong> {postDetails.comments}
      </p>
      <p>
        <strong>Shares:</strong> {postDetails.shares}
      </p>

      {/* Images Section */}
      {postDetails.imageUrls.length > 0 && (
        <div>
          <strong>Images:</strong>
          <div>
            {postDetails.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Post Image ${index + 1}`}
                style={{
                  width: "100px",
                  marginRight: "10px",
                  marginBottom: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Videos Section */}
      {postDetails.videoUrls.length > 0 && (
        <div>
          <strong>Videos:</strong>
          <div>
            {postDetails.videoUrls.map((url, index) => (
              <video
                key={index}
                src={url}
                controls
                style={{
                  width: "200px",
                  marginRight: "10px",
                  marginBottom: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
            ))}
          </div>
        </div>
      )}
    </Modal>
    </>
  );
};

export default ViewPost;
