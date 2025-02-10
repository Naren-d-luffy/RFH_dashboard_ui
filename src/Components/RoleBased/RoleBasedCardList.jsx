import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import user from "../../Assets/Images/singleuser.png";
import { Avatar, Button, Tag } from "antd";
import { Instance } from "../../AxiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { setRoleAccess } from "../../Features/RoleAccessSlice";
import { useNavigate } from "react-router-dom";
import { showErrorMessage, showSuccessMessage } from "../../globalConstant";

const RoleBasedCardList = () => {
  const [, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roleaccessData = useSelector((state) => state.roleAccess.roleAccess);
  const storedUserInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  useEffect(() => {
    const fetchRoleAccessList = async () => {
      setIsLoading(true);
      try {
        const response = await Instance.get(`/admin/allUser`);
        console.log(response)
        dispatch(setRoleAccess(response.data));
      } catch (error) {
        console.error("Error fetching user roles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoleAccessList();
  }, [dispatch]);
  
  const handleStatusChange = async (_id, currentStatus) => {
    const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
  
    try {
      const response = await Instance.patch(
        `/admin/updateStatus/${_id}`, 
        { status: newStatus }, 
        { headers: { "Content-Type": "application/json" } }
      );
  console.log("response",response)
      if (response.status === 200) {
        showSuccessMessage("Status Updated!", `User status changed to ${newStatus}.`);
        dispatch(setRoleAccess(roleaccessData.map(user => 
          user._id === _id ? { ...user, status: newStatus } : user
        )));
      } else {
        showErrorMessage("Failed to update status. Unexpected response.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      showErrorMessage("Failed to update status. Please try again.");
    }
  };
  
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <div className="user-engagement-header">
          <h3>Role Access</h3>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button
            className="d-flex gap-2 align-items-center rfh-basic-button"
            onClick={() => navigate("/add-role-access")}
          >
            <GoPlus />
            Create Role
          </button>
        </div>
      </div>

      <div className="row mt-4">
        {Array.isArray(roleaccessData) &&
          roleaccessData
          .filter(({ _id }) => _id !== storedUserInfo.uid)
          .map(
            ({ _id, profile, name, email, phoneNumber, role, status }) => (
              <div className="col-lg-4 col-xl-3 mb-4" key={_id}>
                <div   className={`role-users-profile-card ${status === "ACTIVE" ? "active-card" : "inactive-card"}`}
                >
                  <div className="d-flex justify-content-center">
                    <Avatar src={profile || user} shape="square" size={68} />
                  </div>
                  <h2 className="mt-3">{name}</h2>
                  <h4>
                  {email?.length > 26 ? `${email.slice(0, 26)}...` : email}
                  </h4>
                  <h4>{phoneNumber}</h4>
                  <div className="d-flex justify-content-center mt-2">
                    <Tag
                      className="most-user-success-tag"
                      style={{ width: "fit-content" }}
                    >
                      {role}
                    </Tag>
                  </div>
                  <div className="d-flex justify-content-center gap-2 mt-2">
                    <Button className="edit-role-button"  onClick={() => navigate(`/edit-role-access/${_id}`)}>
                      Edit
                    </Button>
                    <Button
                      className={
                        status === "ACTIVE"
                          ? "status-role-button"
                          : "inactive-status-button"
                      }
                      onClick={() => handleStatusChange(_id, status)}

                    >
                      {status}
                    </Button>
                  </div>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default RoleBasedCardList;
