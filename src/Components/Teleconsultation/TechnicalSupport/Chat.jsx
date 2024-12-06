import React, { useState } from "react";
import { IoMicOutline } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import image1 from "../../../Assets/Images/DefaultUser.png";
import image2 from "../../../Assets/Images/ladydoctor.png";
import image3 from "../../../Assets/Images/image.png";
import { Avatar } from "antd";
import { TbPinned } from "react-icons/tb";
import chatIcon from "../../../Assets/Icons/chat-header.png";
import addFile from "../../../Assets/Icons/addFile.png";
import { FaRegSmile } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

const MessageChat = () => {
  const allChats = [
    {
      name: "Jennie Sherlock",
      message: "Hey there is available",
      time: "4:30 PM",
      avatar: image2,
      unread: 0,
      group: false,
    },
    {
      name: "Ronald Tucker",
      message: "Wow, that’s great...",
      time: "3:00 PM",
      avatar: image1,
      unread: 4,
      group: false,
    },
    {
      name: "Team Alpha",
      message: "Meeting at 5 PM",
      time: "2:00 PM",
      avatar: image3,
      unread: 2,
      group: true,
    },
    {
      name: "Project Beta",
      message: "New updates available",
      time: "1:00 PM",
      avatar: image2,
      unread: 0,
      group: true,
    },
    {
      name: "Rishabh Kumrawat",
      message: "Wow, that’s great...",
      time: "3:00 PM",
      avatar: image1,
      unread: 4,
      group: false,
    },
  ];

  const pinnedChats = [
    {
      name: "Jennie Sherlock",
      message: "Hey there is available",
      time: "4:30 PM",
      avatar: image2,
      unread: 0,
      group: false,
    },
    {
      name: "Ronald Tucker",
      message: "Wow, that’s great...",
      time: "3:00 PM",
      avatar: image1,
      unread: 4,
      group: false,
    },
  ];

  const [selectedChat, setSelectedChat] = useState(null);
  const [isChatVisible, setIsChatVisible] = useState(false);

  const demoChat = [
    {
      sender: selectedChat?.name || "",
      message: "Good morning",
      time: "11:35 AM",
      avatar: image2,
    },
    {
      sender: selectedChat?.name || "",
      message: "Hi there, how are you?",
      time: "11:35 AM",
      avatar: image1,
    },
    {
      sender: "Krishna Iam",
      message: "I am down for whatever!",
      time: "11:36 AM",
      isSelf: true,
      avatar: image3,
    },
    {
      sender: "Krishna Iam",
      message: "Good morning",
      time: "11:36 AM",
      isSelf: true,
      avatar: image2,
    },
    {
      sender: "Krishna Iam",
      message: "I’ll be there in a few minutes, please wait!",
      time: "11:36 AM",
      isSelf: true,
      avatar: image1,
    },
    {
      sender: selectedChat?.name || "",
      message: "Waiting for your reply...",
      time: "11:45 AM",
      avatar: image3,
    },
  ];

  return (
    <div>
      <div className="row technical-support-heading">
        <h4>Technical Support</h4>
        <p>Number of users installed the app by source</p>
      </div>
      <div
        className={`row team-chat-container ${
          isChatVisible ? "chat-visible" : "sidebar-visible"
        }`}
      >
        {/* Chat Sidebar */}
        <div className={`col-lg-4 ${isChatVisible ? "d-none d-lg-block" : ""}`}>
          <div className="chat-sidebar">
            <div className="recent-chats">
              <div className="d-flex gap-2 align-items-center">
                <TbPinned style={{ color: "#627D98", fontSize: "20px" }} />
                <h3>Pinned Conversations</h3>
              </div>
              {pinnedChats.map((chat, index) => (
                <div
                  key={index}
                  className={`chat-item ${
                    selectedChat === chat ? "active-chat" : ""
                  }`}
                  onClick={() => {
                    setSelectedChat(chat);
                    setIsChatVisible(true);
                  }}
                >
                  <Avatar src={chat.avatar} />
                  <div className="chat-info">
                    <h4>{chat.name}</h4>
                    <p>{chat.message}</p>
                  </div>
                  <div className="chat-meta">
                    <p>{chat.time}</p>
                    {chat.unread > 0 && (
                      <span className="unread-count">{chat.unread}</span>
                    )}
                  </div>
                </div>
              ))}
              <h3>Today</h3>
              <div className="recent-chats-section">
                {allChats.map((chat, index) => (
                  <div
                    key={index}
                    className={`chat-item ${
                      selectedChat === chat ? "active-chat" : ""
                    }`}
                    onClick={() => {
                      setSelectedChat(chat);
                      setIsChatVisible(true);
                    }}
                  >
                    <Avatar src={chat.avatar} />
                    <div className="chat-info">
                      <h4>{chat.name}</h4>
                      <p>{chat.message}</p>
                    </div>
                    <div className="chat-meta">
                      <p>{chat.time}</p>
                      {chat.unread > 0 && (
                        <span className="unread-count">{chat.unread}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className={`col-lg-8 ${isChatVisible ? "" : "d-none d-lg-block"}`}>
          <div className="main-chat">
            {selectedChat ? (
              <>
                <div className="chat-messages">
                  <div className="chat-header">
                    {/* Back Button for Mobile */}
                    <button
                      className="btn btn-light back-btn d-lg-none"
                      onClick={() => setIsChatVisible(false)}
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        zIndex: "10",
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <IoMdArrowBack size={24} />
                    </button>
                    <div className="chat-header-icon">
                      <img src={chatIcon} alt="" />
                      <h4>
                        {selectedChat.name}
                        <br />
                        <small>{selectedChat.group ? "Group" : "User"}</small>
                      </h4>
                    </div>
                  </div>

                  {demoChat.map((message, index) => (
                    <div
                      key={index}
                      className={`d-flex mx-2 ${
                        message.isSelf
                          ? "justify-content-end"
                          : "justify-content-start"
                      } gap-1 align-items-center`}
                      style={{ marginBottom: "10px" }}
                    >
                      {!message.isSelf && (
                        <Avatar src={message.avatar} size={40} />
                      )}

                      <div
                        className={`message mx-2 ${
                          message.isSelf ? "self" : "received"
                        }`}
                      >
                        <p>{message.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div>
                <div className="chat-header">
                  <div className="chat-header-icon">
                    <img src={chatIcon} alt="" />
                    <h4>
                      What do you want to <br /> Know About RFH?
                    </h4>
                  </div>
                </div>
                <p className="no-chat-selected">Select a chat to view messages</p>
              </div>
            )}
            <div className="message-input-container">
              <div className="message-input-box">
                <button className="emoji-btn">
                  <FaRegSmile size={24} />
                </button>
                <input
                  type="text"
                  placeholder="Message"
                  className="message-input"
                />
                <button className="message-send-btn">
                  <IoMdSend size={24} />
                </button>
              </div>

              <div>
                <button className="add-document-button">
                  <img
                    src={addFile}
                    alt=""
                    style={{ width: "18px", height: "18px" }}
                  />
                </button>
              </div>
              <div>
                <button className="add-document-button">
                  <IoMicOutline className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageChat;

