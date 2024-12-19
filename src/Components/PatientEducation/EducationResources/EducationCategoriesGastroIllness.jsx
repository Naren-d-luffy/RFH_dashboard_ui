// import React, { useState, useEffect } from "react";
// import { Button, Dropdown, Menu } from "antd";
// import { FiSearch } from "react-icons/fi";
// import { GoPlus } from "react-icons/go";
// import { VscSettings } from "react-icons/vsc";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { BiEdit } from "react-icons/bi";
// import { RiDeleteBin7Line } from "react-icons/ri";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import AddEventsGastroIllness from "./AddEventsGastroIllness";
// import EditEventsGastroIllness from "./EditEventsGastroIllness";
// import ViewEventsGastroIllness from "./ViewEventsGastroIllness";
// import { Instance } from "../../../AxiosConfig";
// import { showDeleteMessage } from "../../../globalConstant";
// import {
//   deleteGastroIllness,
//   setGastroIllness,
// } from "../../../Features/GastroIllnessSlice";
// import { useDispatch, useSelector } from "react-redux";

// const EducationCategoriesGastroIllness = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [gastroEvents, setGastroEvents] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const showModal = () => setIsModalOpen(true);
//   const handleCancel = () => setIsModalOpen(false);
//   const showEditModal = () => setIsEditModalOpen(true);
//   const handleEditCancel = () => setIsEditModalOpen(false);
//   const showViewModal = () => setIsViewModalOpen(true);
//   const handleViewCancel = () => setIsViewModalOpen(false);
//   const dispatch = useDispatch();
//   const itemsPerPage = 100;

//   const fetchGastroEvents = async (page) => {
//     setIsLoading(true);
//     try {
//       const response = await Instance.get(`/gastro`, {
//         params: { page, limit: itemsPerPage },
//       });
//       console.log("GastroIllness", response.data.gastros);
//       setGastroIllness(response.data.gastros || []);
//       dispatch(setGastroIllness(response.data));
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching treatments:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDeleteEvent = (_id) => {
//     showDeleteMessage({
//       message: "",
//       onDelete: async () => {
//         try {
//           const response = await Instance.delete(`/gastro/${_id}`);
//           if (response.status === 200) {
//             dispatch(deleteGastroIllness(_id));
//           }
//         } catch (error) {
//           console.error("Error deleting post:", error);
//         }
//       },
//     });
//   };

//   useEffect(() => {
//     fetchGastroEvents();
//   }, []);

//   const renderEventCard = (event) => (
//     <div className="col-lg-4" key={event._id}>
//       <div className="upcoming-event-card p-3" style={{ position: "relative" }}>
//         <div className="treatment-info-icon-container">
//           <Dropdown
//             overlay={
//               <Menu>
//                 <Menu.Item
//                   key="edit"
//                   onClick={() => {
//                     setSelectedEvent(event);
//                     showEditModal();
//                   }}
//                 >
//                   <BiEdit
//                     style={{
//                       color: "var(--primary-green)",
//                       marginRight: "4px",
//                     }}
//                   />
//                   Edit
//                 </Menu.Item>
//                 <Menu.Item
//                   key="view"
//                   onClick={() => {
//                     setSelectedEvent(event);
//                     showViewModal();
//                   }}
//                 >
//                   View
//                 </Menu.Item>
//                 <Menu.Item
//                   key="delete"
//                   onClick={() => handleDeleteEvent(event._id)}
//                 >
//                   <RiDeleteBin7Line style={{ color: "var(--red-color)" }} />
//                   Delete
//                 </Menu.Item>
//               </Menu>
//             }
//             trigger={["click"]}
//           >
//             <button className="action-icon-button">
//               <BsThreeDotsVertical />
//             </button>
//           </Dropdown>
//         </div>
//         <div className="d-flex justify-content-center align-items-center mb-3">
//           <img
//             src={event.thumbnail || "default_image.jpg"}
//             alt={event.title}
//             style={{ maxHeight: "150px", maxWidth: "100%" }}
//           />
//         </div>
//         <div>
//           <div className="d-flex justify-content-between mb-2">
//             <h4>{event.title}</h4>
//             <span>{event.date}</span>
//           </div>
//           <p>{event.description}</p>
//         </div>
//       </div>
//     </div>
//   );

//   const sliderSettings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     arrows: true,
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: { slidesToShow: 1, slidesToScroll: 1 },
//       },
//     ],
//   };

//   return (
//     <div className="container mt-4">
//       <div className="marketing-categories-section">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h4>Education Categories</h4>
//           <div className="d-flex gap-3 align-items-center">
//             <div className="search-container">
//               <FiSearch className="search-icon" />
//               <input
//                 type="text"
//                 placeholder="Search anything here"
//                 className="search-input-table"
//               />
//             </div>
//             <Button>
//               <VscSettings />
//               Filters
//             </Button>
//           </div>
//         </div>

//         <div className="row mt-4">
//           <div className="d-flex justify-content-between">
//             <h6>Gastro Illness</h6>
//             <button className="rfh-basic-button" onClick={showModal}>
//               <GoPlus size={20} /> Add Events
//             </button>
//           </div>
//           <div className="mt-3">
//             {isLoading ? (
//               <p>Loading events...</p>
//             ) : Array.isArray(gastroEvents) && gastroEvents.length > 0 ? (
//               <Slider {...sliderSettings}>
//                 {gastroEvents.map((event) => renderEventCard(event))}
//               </Slider>
//             ) : (
//               <p>No events available.</p>
//             )}
//           </div>
//         </div>
//       </div>

//       <AddEventsGastroIllness open={isModalOpen} handleCancel={handleCancel} />
//       <EditEventsGastroIllness
//         open={isEditModalOpen}
//         handleCancel={handleEditCancel}
//         eventData={selectedEvent}
//       />
//       <ViewEventsGastroIllness
//         open={isViewModalOpen}
//         handleCancel={handleViewCancel}
//         eventData={selectedEvent}
//       />
//       <EditEventsGastroIllness
//         open={isEditModalOpen}
//         handleCancel={handleEditCancel}
//         eventData={selectedEvent}
//       />
//     </div>
//   );
// };

// export default EducationCategoriesGastroIllness;








import React, { useState, useEffect } from "react";
import { Button, Dropdown, Menu } from "antd";
import { FiEye, FiSearch } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { VscSettings } from "react-icons/vsc";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddEventsGastroIllness from "./AddEventsGastroIllness";
import EditEventsGastroIllness from "./EditEventsGastroIllness";
import ViewEventsGastroIllness from "./ViewEventsGastroIllness";
import { Instance } from "../../../AxiosConfig";
import { showDeleteMessage } from "../../../globalConstant";
import {
  deleteGastroIllness,
  setGastroIllness,
} from "../../../Features/GastroIllnessSlice";
import { useDispatch, useSelector } from "react-redux";


const EducationCategoriesGastroIllness = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const gastroEvents = useSelector((state) => state.gastroIllness.gastroIllness || []);
  console.log("gastroevents",gastroEvents)
  const itemsPerPage = 100;

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const showEditModal = () => setIsEditModalOpen(true);
  const handleEditCancel = () => setIsEditModalOpen(false);
  const showViewModal = () => setIsViewModalOpen(true);
  const handleViewCancel = () => setIsViewModalOpen(false);

  
  const fetchGastroEvents = async (page) => {
    setIsLoading(true);
    try {
      const response = await Instance.get("/gastro", {
        params: { page, limit: itemsPerPage },
      });
      console.log("GastroIllness:", response.data.gastros);
      dispatch(setGastroIllness(response.data.gastros || [])); 
    } catch (error) {
      console.error("Error fetching gastro events:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleDeleteEvent = (_id) => {
    showDeleteMessage({
      message: "Are you sure you want to delete this event?",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/gastro/${_id}`);
          if (response.status === 200) {
            dispatch(deleteGastroIllness(_id));
          }
        } catch (error) {
          console.error("Error deleting event:", error);
        }
      },
    });
  };

  useEffect(() => {
    fetchGastroEvents();
  }, []);

  const renderEventCard = (event) => (
    <div className="col-lg-4" key={event._id}>
      <div className="upcoming-event-card p-3" style={{ position: "relative" }}>
        <div className="treatment-info-icon-container">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key="view"
                  onClick={() => {
                    setSelectedEvent(event);
                    showViewModal();
                  }}
                >
                  <FiEye style={{ color: "var(--primary-green)", marginRight: "4px" }} />
                  View
                </Menu.Item>
                <Menu.Item
                  key="edit"
                  onClick={() => {
                    setSelectedEvent(event);
                    showEditModal();
                  }}
                >
                  <BiEdit style={{ color: "var(--primary-green)", marginRight: "4px" }} />
                  Edit
                </Menu.Item>
                <Menu.Item
                  key="delete"
                  onClick={() => handleDeleteEvent(event._id)}
                >
                  <RiDeleteBin7Line style={{ color: "var(--red-color)", marginRight: "4px"}} />
                  Delete
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <button className="action-icon-button">
              <BsThreeDotsVertical />
            </button>
          </Dropdown>
        </div>
        <div className="d-flex justify-content-center align-items-center mb-3">
          <img
            src={event.thumbnail || "default_image.jpg"}
            alt={event.title}
            // style={{ maxHeight: "150px", maxWidth: "100%" }}
          />
        </div>
        <div>
          <div className="d-flex justify-content-between mb-2">
            <h4>{event.title}</h4>
            <span>{event.date}</span>
          </div>
          <p>{event.description}</p>
        </div>
      </div>
    </div>
  );

  // Slider settings
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="container mt-4">
      <div className="marketing-categories-section">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4>Education Categories</h4>
          <div className="d-flex gap-3 align-items-center">
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search anything here"
                className="search-input-table"
              />
            </div>
            <Button>
              <VscSettings />
              Filters
            </Button>
          </div>
        </div>

        <div className="row mt-4">
          <div className="d-flex justify-content-between">
            <h6>Gastro Illness</h6>
            <button className="rfh-basic-button" onClick={showModal}>
              <GoPlus size={20} /> Add Events
            </button>
          </div>
          <div className="mt-3">
            {isLoading ? (
              <p>Loading events...</p>
            ) : gastroEvents.length > 0 ? (
              <Slider {...sliderSettings}>
                {gastroEvents.map((event) => renderEventCard(event))}
              </Slider>
            ) : (
              <p>No events available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddEventsGastroIllness open={isModalOpen} handleCancel={handleCancel} />
      <EditEventsGastroIllness
        open={isEditModalOpen}
        handleCancel={handleEditCancel}
        eventData={selectedEvent}
      />
      <ViewEventsGastroIllness
        open={isViewModalOpen}
        handleCancel={handleViewCancel}
        eventData={selectedEvent}
      />
    </div>
  );
};

export default EducationCategoriesGastroIllness;
