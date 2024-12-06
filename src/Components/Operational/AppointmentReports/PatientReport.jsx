import React, { useRef } from "react";
import { Modal } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import logo from "../../../Assets/Images/logo.png";
import { showSuccessMessage } from "../../../globalConstant";

// Register Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip);

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
      const imgWidth = pdfWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("HbA1c_Report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
    showSuccessMessage("Completed", "You have successfully downloaded Saikiran file");
  };

  const graphData = {
    labels: ["04-Jun-22", "20-Oct-22", "16-Jan-24", "07-Jul-23"],
    datasets: [
      {
        label: "Value (%)",
        data: [60.9, 60.5, 61.6, 60.7],
        borderColor: "#87CEEB",
        backgroundColor: "#87CEEB",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#87CEEB",
        pointHoverRadius: 5,
      },
    ],
  };

  const graphOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        enabled: true, 
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Visit Date",
          font: {
            size: 14,
          },
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Value (%)",
          font: {
            size: 14,
          },
        },
        ticks: {
          stepSize: 20, 
          font: {
            size: 12,
          },
        },
        min: 0,
        max: 80, 
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
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
        <div className="report-graph" style={{ marginTop: "30px", textAlign: "center" }}>
          <h3 style={{ fontSize: "14px", marginBottom: "10px" }}>
            Glycosylated Haemoglobin | HbA1c | (Test - 1)
          </h3>
          <Line data={graphData} options={graphOptions} />
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
                  marginLeft: "100px",
                  fontSize: "10px",
                  fontWeight: "bold",
                  maxWidth: "200px",
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
        <button onClick={handleDownloadPDF} className="rfh-basic-button">
          Download
        </button>
      </div>
    </Modal>
  );
};
