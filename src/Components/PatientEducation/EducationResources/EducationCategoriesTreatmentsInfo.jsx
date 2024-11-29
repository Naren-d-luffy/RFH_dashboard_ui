// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { GoPlus } from "react-icons/go";
// import AddTreatmentsInfo from "./AddTreatmentsInfo";
// import Frame1 from "../../Assets/Images/Frame1.png";
// import Frame2 from "../../Assets/Images/Frame2.png";
// import Frame3 from "../../Assets/Images/Frame3.png";

// const EducationCategoriesTreatmentsInfo = () => {
//   const items = [
//     {
//       label: "Last Day",
//       key: "1",
//     },
//     {
//       label: "Last Week",
//       key: "2",
//     },
//     {
//       label: "Last Month",
//       key: "3",
//     },
//   ];
//   const handleMenuClick = ({ key }) => {};
//   const menuProps = {
//     items,
//     onClick: handleMenuClick,
//   };

//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const showModal = () => setIsModalOpen(true);
//   const handleCancel = () => setIsModalOpen(false);

//   return (
//     <div className="container mt-3">
//       <div className="d-flex mt-3 justify-content-between education-categories-gastro-head-text">
//         <div>
//           <h3>Treatments Info </h3>
//         </div>
//         <div>
//           <button className="rfh-basic-button" onClick={showModal}>
//             <GoPlus size={20} /> Add
//           </button>
//         </div>
//       </div>

//       <div className="education-categories-treatments-info-head row">
//         <div>
//           <img src={Frame1} alt="frame" />
//           <div>
//             <h5>Gastritis</h5>
//             <p>1 hour ago</p>
//           </div>
//         </div>
//         <div>
//           <img src={Frame2} alt="frame" />
//           <div>
//             <h5>Peptic Ulcers</h5>
//             <p>1 hour ago</p>
//           </div>
//         </div>
//         <div>
//           <img src={Frame3} alt="frame" />
//           <div>
//             <h5>Stomach</h5>
//             <p>1 hour ago</p>
//           </div>
//         </div>
//       </div>
//       <AddTreatmentsInfo open={isModalOpen} handleCancel={handleCancel} />
//     </div>
//   );
// };

// export default EducationCategoriesTreatmentsInfo;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import AddTreatmentsInfo from "./AddTreatmentsInfo";
import Frame1 from "../../../Assets/Images/Frame1.png";
import Frame2 from "../../../Assets/Images/Frame2.png";
import Frame3 from "../../../Assets/Images/Frame3.png";

const EducationCategoriesTreatmentsInfo = () => {
  const items = [
    {
      label: "Last Day",
      key: "1",
    },
    {
      label: "Last Week",
      key: "2",
    },
    {
      label: "Last Month",
      key: "3",
    },
  ];
  const handleMenuClick = ({ key }) => {};
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <div className="container mt-3">
      <div className="d-flex mt-3 justify-content-between education-categories-gastro-head-text">
        <div>
          <h3>Treatments Info </h3>
        </div>
        <div>
          <button className="rfh-basic-button" onClick={showModal}>
            <GoPlus size={20} /> Add
          </button>
        </div>
      </div>

      <div className="row education-categories-treatments-info-head">
        <div className="col-lg-4">
          <img src={Frame1} alt="frame"/>
        </div>
        <div className="col-lg-4">
          <img src={Frame2} alt="frame" />
        </div>
        <div className="col-lg-4">
          <img src={Frame3} alt="frame" />
        </div>
      </div>
      <AddTreatmentsInfo open={isModalOpen} handleCancel={handleCancel} />
    </div>
  );
};

export default EducationCategoriesTreatmentsInfo;
