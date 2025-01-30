import React from "react";
import { GoPlus } from "react-icons/go";
import user from "../../Assets/Images/Doctor.png";
import { Avatar } from "antd";

const RoleBasedCardList = () => {
  const users = [
    {
      id: 1,
      image: user,
      name: "Cameron Williamson",
      memberTag: "Gold Member",
      email: "cameron@gmai.com",
      phone: "+91 94464 64964",
    },
    {
      id: 2,
      image: user,
      name: "John Doe",
      memberTag: "Silver Member",
      email: "john@gmai.com",
      phone: "+91 94464 64965",
    },
    {
      id: 3,
      image: user,
      name: "Jane Smith",
      memberTag: "Platinum Member",
      email: "jane@gmai.com",
      phone: "+91 94464 64966",
    },
    {
      id: 4,
      image: user,
      name: "Emma Brown",
      memberTag: "Gold Member",
      email: "emma@gmai.com",
      phone: "+91 94464 64967",
    },
  ];

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <div className="user-engagement-header">
          <h3>Role Access</h3>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button
            className="d-flex gap-2 align-items-center rfh-basic-button"
          >
            <GoPlus />
            Create Role
          </button>
        </div>
      </div>

      <div className="row mt-4">
        {users.map(({ id, image, name, memberTag, email, phone }) => {
          let tagClass = "";
          switch (memberTag) {
            case "Gold Member":
              tagClass = "gold-member-tag";
              break;
            case "Silver Member":
              tagClass = "silver-member-tag";
              break;
            case "Platinum Member":
              tagClass = "platinum-member-tag";
              break;
            default:
              tagClass = "default-member-tag";
          }

          return (
            <div className="col-lg-4 col-xl-3 mb-4" key={id}>
              <div className="role-users-profile-card">
                <div className="d-flex justify-content-center">
                  <Avatar src={image} shape="square" size={68} />
                </div>
                <h2 className="mt-3">{name}</h2>
                <div className="d-flex justify-content-center">
                  <p className={tagClass}>{memberTag}</p>
                </div>
                <h4>{email}</h4>
                <h4>{phone}</h4>
                <div className="d-flex gap-2 mt-2">
                  <button className="edit-button">Edit</button>
                  <button className="role-active-button">Active</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoleBasedCardList;
