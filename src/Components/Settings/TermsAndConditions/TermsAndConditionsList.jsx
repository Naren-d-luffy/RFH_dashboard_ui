import React, { useEffect, useState } from "react";
import { Instance } from "../../../AxiosConfig";
import AddTermsModal from "./AddTerm";
import {  MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import EditTermsModal from "./EditTerms";
import { showDeleteMessage, showSuccessMessage } from "../../../globalConstant";
import Loader from "../../../Loader";
import { useSelector,useDispatch } from "react-redux";
import { deleteTerm, setTerms } from "../../../Features/TermsSlice";
export const TermsAndConditionsList = () => {
  const [, setTermsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClause, setSelectedClause] = useState(null);
  const handleEditClause = (clause) => {
    setSelectedClause(clause);
    setShowEditModal(true);
  };
  const dispatch=useDispatch();
  const TermsList = useSelector((state) => state.term.terms || []);
  useEffect(() => {
    const fetchTerms = async () => {
      setLoading(true);
      try {
        const response = await Instance.get("/terms");
        dispatch(setTerms(response.data))
        setTermsList(response.data);
        setError(null);
      } catch (err) {
        setError(
          "Failed to load terms and conditions. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchTerms();
  }, [dispatch]);

  const handleDeleteClause = (clauseId) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          setLoading(true);
          const response = await Instance.delete(`/terms/${clauseId}`);
          if (response.status === 201 || response.status) {
            dispatch(deleteTerm(clauseId))
            showSuccessMessage("Clause deleted successfully.");
          }
        } catch (err) {
          setError("Failed to delete clause. Please try again later.");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  if (loading) {
    return <Loader />;
  }

  if (!TermsList.length) {
    return (
      <div className="no-terms-message">
        <p>No terms and conditions available at the moment.</p>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between">
          <h4>Terms and Conditions</h4>
          <button
            className="settings-edit-icon-button"
            onClick={() => setShowModal(true)}
          >
            + Add Terms
          </button>
        </div>
        <hr style={{color:"var(--black-color)"}} />
        {TermsList.map((terms) => (
          <div key={terms._id} >
            <div className="clause d-flex justify-content-between align-items-center">
              <div>
                <h6>{terms.title}</h6>
                <p>{terms.content}</p>
              </div>
              <div className="d-flex gap-2">
                <MdEdit
                  className="trash-icon-health-package"
                  onClick={() => handleEditClause(terms)}
                />
                <FaTrash
                  className="trash-icon-health-package"
                  onClick={() => handleDeleteClause(terms._id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <AddTermsModal visible={showModal} onClose={() => setShowModal(false)} />
      <EditTermsModal
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        clause={selectedClause}
      />
    </>
  );
};
