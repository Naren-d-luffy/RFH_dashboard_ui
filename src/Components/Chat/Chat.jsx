import React, { useState } from "react";
import { IoMicOutline, IoSearchOutline } from "react-icons/io5";
import image1 from "../../Assets/Images/DefaultUser.png";
import image2 from "../../Assets/Images/ladydoctor.png";
import image3 from "../../Assets/Images/image.png";
import { Avatar, Badge } from "antd";
import { TbPinned } from "react-icons/tb";
import addFile from "../../Assets/Icons/addFile.png";
import { FaRegSmile } from "react-icons/fa";
import { IoMdArrowBack, IoMdSend } from "react-icons/io";
const Chat = () => {
  const [activeTab, setActiveTab] = useState("All");
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
  const filteredChats = allChats.filter((chat) => {
    if (activeTab === "Unread") return chat.unread > 0;
    if (activeTab === "Groups") return chat.group;
    if (activeTab === "Contact") return !chat.group;
    return true;
  });

  return (
    <div>
      <div className="row technical-support-heading">
        <h4>Chat</h4>
      </div>
      <div
        className={`row  team-chat-container ${
          isChatVisible ? "chat-visible" : "sidebar-visible"
        }`}
      >
        <div className="col-lg-4">
          <div className="chat-sidebar">
            <h6 style={{ color: "var(--black-color)" }}>Online Now</h6>
            <div className="d-flex gap-2 mb-2">
              <Badge
                dot
                color="green"
                style={{
                  position: "absolute",
                  top: "32px",
                  right: "1px",
                }}
              >
                <Avatar src={image2} size={45} />
              </Badge>
              <Badge
                dot
                color="green"
                style={{
                  position: "absolute",
                  top: "32px",
                  right: "1px",
                }}
              >
                <Avatar src={image1} size={45} />
              </Badge>
            </div>
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
              <IoSearchOutline className="w-5 h-5" />
            </div>
            <div className="chat-filters">
              <button
                className={activeTab === "All" ? "message-active" : ""}
                onClick={() => setActiveTab("All")}
              >
                All
              </button>
              <button
                className={activeTab === "Unread" ? "message-active" : ""}
                onClick={() => setActiveTab("Unread")}
              >
                Unread
              </button>
              <button
                className={activeTab === "Groups" ? "message-active" : ""}
                onClick={() => setActiveTab("Groups")}
              >
                Groups
              </button>
              <button
                className={activeTab === "Contact" ? "message-active" : ""}
                onClick={() => setActiveTab("Contact")}
              >
                Contact
              </button>
            </div>
            <div className="recent-chats">
              {activeTab === "All" && (
                <>
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
                </>
              )}

              <div className="recent-chats-section">
                {filteredChats.map((chat, index) => (
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
        <div className="col-lg-8">
          <div className="main-chat ">
            {selectedChat ? (
              <>
                <div className="chat-messages p-4">
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
                      marginBottom: "20px",
                    }}
                  >
                    <IoMdArrowBack size={24} />
                  </button>
                  <h6 style={{ textAlign: "center" }}>Today 10:27am</h6>
                  {demoChat.map((message, index) => (
                    <div
                      key={index}
                      className={`d-flex  ${
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
                        className={`message  ${
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
              <p className="no-chat-selected">Select a chat to view messages</p>
            )}
            <div className="message-input-container">
              <div className="message-input-box">
                <button className="emoji-btn">
                  <FaRegSmile size={24} color="var(--black-color)"/>
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

export default Chat;
