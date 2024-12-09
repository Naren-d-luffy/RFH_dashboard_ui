import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Button, Divider, Dropdown } from "antd";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend as ChartLegend } from 'chart.js';

const jobOverviewData = [
  { year: "2021", opdPatients: 6, ipdPatients: 4 },
  { year: "2022", opdPatients: 8, ipdPatients: 5 },
  { year: "2023", opdPatients: 10, ipdPatients: 7 },
  { year: "2024", opdPatients: 7.5, ipdPatients: 4.5 },
];
ChartJS.register(ArcElement, ChartTooltip, ChartLegend);

const UserManagementGraph = () => {
  const data = {
    labels: ['', ''],
    datasets: [{
      label: 'My First Dataset',
      data: [50, 50],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(35, 180, 162)',
      ],
      hoverOffset: 4,
      borderWidth: 2,
      borderColor: 'white',
    }]
  };

  const options = {
    cutout: '85%',
    circumference: 200,
    rotation: -100,
    radius: 128,
    elements: {
      arc: {
        borderRadius: 10,
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: true,
        callbacks: {
          label: function (tooltipItem) {
            return `\u00A0\u00A0${tooltipItem.raw}`;
          }
        },
        boxHeight: 10,
        boxWidth: 10,
        usePointStyle: true,
      }
    }
  };
  function adjustRadius() {
    const mediaQuery = window.matchMedia('(min-width: 992px) and (max-width: 1150px)');
    options.radius = mediaQuery.matches ? 100 : 128;
  }

  adjustRadius();
  window.addEventListener('resize', adjustRadius);

  const actionMenu = {
    items: [
      { key: 'year', label: 'Year' },
      { key: 'month', label: 'Month' },
    ],
  };
  const COLORS = {
    opdPatients: "#00963F",
    ipdPatients: "#191F2F",
  };

  return (
    <div className='container'>
      <div className='row mt-4'>
        <div className="col-lg-7">
          <div className="userManaggement-card flex-column flex-sm-row gap-4 align-items-center">
            <div className="d-flex align-items-center justify-content-between">
              <div className="">
                <h2 className="card-title text-start mb-3">Patient Type</h2>
              </div>

              <div
                className="d-flex align-items-center gap-2"
              >
                <div className="d-flex align-items-center gap-1">
                  <div className="legend-dot" style={{ backgroundColor: COLORS.opdPatients }}></div>
                  <h2 className="mb-0 card-title">OPD Patients</h2>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <div className="legend-dot" style={{ backgroundColor: COLORS.ipdPatients }}></div>
                  <h2 className="mb-0 card-title">IPD Patients</h2>
                </div>
              </div>
            </div>
            <Divider className="mb-5" />
            <div className="card-body">
              <ResponsiveContainer width="100%" height={217}>
                <BarChart data={jobOverviewData} barSize={30}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="year"
                    axisLine={{
                      strokeWidth: 1,
                      stroke: "#cccccc",
                    }}
                  />
                  <YAxis
                    tickFormatter={(value) => `${value}k`}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#30363D",
                      boxShadow: "0px 13.28px 13.28px 0px #00000040",
                      borderRadius: "8px",
                      color: "var(--white-color)",
                      border: "none",
                    }}
                    className="userManagementGraph-tooltip"
                    formatter={(value, name, props) => (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          color: COLORS[name],
                        }}
                      >
                        <div
                          style={{
                            width: "10px",
                            height: "10px",
                            backgroundColor: name === "OPD Patients" ? COLORS.opdPatients : name === "IPD Patients" ? COLORS.ipdPatients : "#fff", // Conditional check for OPD and IPD patients
                            borderRadius: "50%",
                          }}
                        ></div>
                        <span style={{ fontSize: "14px", color: "var(--white-color)" }}>
                          {`${value}k`}
                        </span>
                      </div>
                    )}
                  />
                  <Bar
                    dataKey="opdPatients"
                    name="OPD Patients"
                    fill="#00963F"
                    radius={[5, 5, 5, 5]}
                  />
                  <Bar
                    dataKey="ipdPatients"
                    name="IPD Patients"
                    fill="#191F2F"
                    radius={[5, 5, 5, 5]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className='col-lg-5'>
          <div className="userManaggement-card">
            <div className="d-flex justify-content-between align-items-center w-100">
              <h2 className="card-title text-start mb-2">
                Category
              </h2>
              <Dropdown menu={actionMenu} trigger={['click']}>
                <Button type="text">
                  <PiDotsThreeOutlineLight size={24} style={{ color: 'var(--secondary-text-color)' }} />
                </Button>
              </Dropdown>
            </div>
            <div className="d-flex justify-content-center align-items-start userMnagement-doughnut-div">
              <Doughnut data={data} options={options} height={260} width="100%" />
              <div className="userManagement-halfGraph-text" style={{
                position: 'absolute',
                top: '85%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}>
                <h6 style={{ margin: 10, color: "var(--black-color)" }} >Last Updated</h6>
                <p style={{ margin: 0, textAlign: "center" }}>24, Feb 2024</p>
              </div>
            </div>
            <div className="d-flex gap-5 justify-content-center">
              <div>
                <p>Doctors</p>
                <div className="d-flex gap-2 align-items-center">
                  <div
                    className="userAquisition-tooltip-dot"
                    style={{ backgroundColor: data.datasets[0].backgroundColor[0] }}
                  ></div>
                  {data.datasets[0].data[0]}%
                </div>
              </div>
              <div>
                <p>Patients</p>
                <div className="d-flex gap-2 align-items-center">
                  <div
                    className="userAquisition-tooltip-dot"
                    style={{ backgroundColor: data.datasets[0].backgroundColor[1] }}
                  ></div>
                  {data.datasets[0].data[1]}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserManagementGraph