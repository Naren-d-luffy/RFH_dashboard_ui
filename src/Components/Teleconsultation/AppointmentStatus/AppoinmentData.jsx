import { Tabs } from "antd";
import { useSearchParams } from "react-router-dom";
import VirtualConsult from "./VirtualConsult";
import DirectConsult from "./DirectConsult";

const { TabPane } = Tabs;

const AppoinmentData = () => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("tab");
  return (
      <div className="appoinment-table-data mt-4">
            <Tabs defaultActiveKey={page || "1"}>
              <TabPane tab="Virtual Consult" key="1">
                <VirtualConsult />
              </TabPane>
              <TabPane tab="Direct Consult" key="2">
                <DirectConsult />
              </TabPane>
            </Tabs>
      </div>
  );
};

export default AppoinmentData;
