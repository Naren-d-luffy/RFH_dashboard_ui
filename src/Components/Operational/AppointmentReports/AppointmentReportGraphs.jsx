import { PiGenderFemaleBold } from "react-icons/pi";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import {
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Area,
} from "recharts";
import { FiArrowUpRight } from "react-icons/fi";
import appstatus from "../../../Assets/Icons/appstatus.png";

export const AppointmentReportGraphs = () => {
  const dateFormat = "YYYY/MM/DD";
  const trafficData = [
    { name: "Male", value: 4000, color: "#288cd5" },
    { name: "Female", value: 2000, color: "#93d528" },
    { name: "Children", value: 1000, color: "#23b4a2" },
  ];
  const churnRateData = [
    { month: "Jan", confirmed: 600, declined: 250 },
    { month: "Feb", confirmed: 800, declined: 320 },
    { month: "Mar", confirmed: 700, declined: 350 },
    { month: "Apr", confirmed: 650, declined: 300 },
    { month: "May", confirmed: 1000, declined: 450 },
    { month: "Jun", confirmed: 700, declined: 350 },
    { month: "Jul", confirmed: 613, declined: 290 },
    { month: "Aug", confirmed: 750, declined: 330 },
    { month: "Sep", confirmed: 720, declined: 290 },
    { month: "Oct", confirmed: 730, declined: 300 },
    { month: "Nov", confirmed: 600, declined: 350 },
    { month: "Dec", confirmed: 500, declined: 150 },
  ];
  const formatYAxis = (tick) => (tick >= 1000 ? `${tick / 1000}k` : tick);
  const confirmedPercentage = 80;
  const declinedPercentage = 18;
  return (
    <div className="row mt-4">
      <div className="col-xl-5 mb-4 ">
        <div className="d-flex flex-column gap-4 top-used-screens">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="d-flex gap-2 align-items-center">
              <div className="traffic-graph-image">
                {/* <img src={handicon} alt="hand Icon" /> */}
                <PiGenderFemaleBold style={{ color: "var(--primary-green)" }} />
              </div>
              <h6>Gender</h6>
            </div>
            <DatePicker
              defaultValue={dayjs("2015/01/01", dateFormat)}
              format={dateFormat}
            />
          </div>
          <div className="top-used-screens-chart">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={88}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                  paddingAngle={2}
                  cornerRadius={10}
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    background: "var(--black-color)",
                    boxShadow: "0px 13.28px 13.28px 0px #00000040",
                    borderRadius: "8px",
                    color: "var(--white-color)",
                    border: "none",
                  }}
                  formatter={(value, name, props) => {
                    const color = props.payload?.color || "#000";
                    return (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: color,
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                          }}
                        ></div>

                        <p
                          style={{
                            fontSize: "14px",
                            marginBottom: "0px",
                            color: "var(--white-color)",
                          }}
                        >
                          {value.toLocaleString()}{" "}
                        </p>
                      </span>
                    );
                  }}
                  labelFormatter={() => ""}
                />

                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  content={({ payload }) => (
                    <div>
                      {payload.map((entry, index) => (
                        <div className="d-flex flex-column ms-2">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontWeight: "bold",
                              fontSize: "14px",
                              color: entry.color,
                              marginBottom: "10px",
                            }}
                          >
                            <span
                              style={{
                                width: "10px",
                                height: "10px",
                                backgroundColor: entry.color,
                                borderRadius: "50%",
                                display: "inline-block",
                                marginRight: "5px",
                              }}
                            ></span>
                            {entry.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="last-updated-display">
              <p className="mb-0">Last Update</p>
              <h1 className="mb-0">Nov 29,2024</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-7">
        <div className="appointment-bboking-graph">
          <div className="application-dashboard-graph d-flex justify-content-between align-items-center w-100">
            <div className="d-flex gap-2 align-items-center">
              <div className="traffic-graph-image">
                <img src={appstatus} alt="Traffic Icon" />
              </div>
              <h2 className="card-title text-start">
                Appointment booking and cancellation rates
              </h2>
            </div>
            <div className="">
              <DatePicker
                defaultValue={dayjs("2024-12-09")}
                format="DD, MMM YYYY"
              />
            </div>
          </div>
          <div
            className="d-flex justify-content-start w-100"
            style={{ position: "relative" }}
          >
            <ResponsiveContainer
              width="100%"
              height={230}
              style={{ position: "relative" }}
            >
              <AreaChart data={churnRateData}>
                <CartesianGrid
                  strokeDasharray="1 1"
                  vertical={false}
                  horizontal={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                />
                <YAxis
                  ticks={[0, 200, 300, 500, 800, 1000]}
                  tickFormatter={formatYAxis}
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: " #30363D",
                    boxShadow: "0px 13.28px 13.28px 0px #00000040",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value) => (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <FiArrowUpRight className="application-dashboard-graph-arrow" />
                      {value.toLocaleString()}
                    </span>
                  )}
                  labelFormatter={() => ""}
                />
                <Legend
                  align="start"
                  verticalAlign="top"
                  wrapperStyle={{
                    marginBottom: "20px",
                  }}
                  formatter={(value, entry) => {
                    const color = entry.color;
                    const percentage =
                      value === "confirmed"
                        ? confirmedPercentage
                        : declinedPercentage;

                    return (
                      <span>
                        <span style={{ color }}>
                          {value === "confirmed" ? "Confirmed" : "Declined"}
                        </span>
                        <br />
                        <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                          {percentage}%
                        </span>
                      </span>
                    );
                  }}
                />
                <Area
                  type="linear"
                  dataKey="confirmed"
                  stroke="#f07e8d"
                  fill="#f07e8d"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                  fillOpacity={0.1}
                />
                <Area
                  type="linear"
                  dataKey="declined"
                  stroke="#4d81e7"
                  fill="#4d81e7"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
