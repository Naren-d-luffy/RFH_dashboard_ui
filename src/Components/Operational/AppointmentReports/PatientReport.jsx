import React, { useRef } from "react";
import { Modal } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../../Assets/Images/logo.png";

export const PatientReport = ({ isModalVisible, setIsModalVisible }) => {
  const reportRef = useRef(null);

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleDownloadPDF = async () => {
    const input = reportRef.current;

    if (!input) {
      console.error("No input element found for PDF generation");
      return;
    }

    try {
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = 210;
      const pdfHeight = 297;
      const imgWidth = pdfWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("HbA1c_Report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <Modal
      open={isModalVisible}
      onCancel={handleClose}
      footer={null}
      width={600}
      className="hba1c-report-modal"
    >
      <div ref={reportRef} className="hba1c-report">
        <div className="report-header">
          <h1>HbA1c</h1>
          <p>Date: April 28, 2023 08:31</p>
        </div>
        <div className="report-content">
          <table className="styled-table">
            <thead>
              <tr>
                <th>
                  <div className="legend">
                    <div className="square"></div> Test Name
                  </div>
                </th>
                <th>Unit</th>
                <th>Reference Range</th>
                <th>Low</th>
                <th>Normal</th>
                <th>High</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="subtext">
                  Glycosylated Haemoglobin
                  <br />
                  <span>HbA1c</span>
                </td>
                <td>%</td>
                <td>
                  Normal: &lt; 5.7
                  <br />
                  Prediabetics/increased risk: 5.7 - 6.4
                  <br />
                  Diabetics: ≥ 6.5
                </td>
                <td className="low"></td>
                <td className="normal"></td>
                <td className="high">6.7</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="clinical-info mt-4">
          <h3>Clinical Information / Interpretation</h3>
          <p>
            HbA1c is a result of the nonenzymatic attachment of a hexose
            molecule to the N-terminal amins acid of the hemoglobin molecule The
            over the attachment of the hexose molecule occurs continually over
            the entire life concentration and the duration of exposure of the
            previous period (approximately 8-12 weeks, depending on the
            individual) and provides a much better indication of long-term
            glycemic contro erythrocyte than blood and urinary glucose
            determinations.
          </p>
        </div>
        <div className="report-footer" style={{ padding: "20px 0" }}>
          <hr />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 10px",
            }}
          >
            <img
              src={logo}
              alt="Hospital Logo"
              style={{ width: "80px", height: "auto" }}
            />

            <div
              style={{
                textAlign: "center",
                flex: 1,
                marginLeft: "0px",
              }}
            >
              <p
                style={{
                  margin: "0",
                  fontSize: "10px",
                  fontWeight: "bold",
                  maxWidth: "200px",
                  margin: "0 auto",
                }}
              >
                Prarthana Samaj, Raja Ram Mohan Roy Rd, Girgaon, Mumbai,
                Maharashtra 400004
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-actions d-flex justify-content-end">
        <button onClick={handleDownloadPDF} className="rfh-basic-button">Download</button>
      </div>
    </Modal>
  );
};
