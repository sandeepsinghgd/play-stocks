import { Card } from "antd";
import { useEffect, useState } from "react";
import { FaSquare, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  CartesianGrid,
  Label,
  Legend,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
} from "recharts";
import { getAmountStatistics } from "../../../api/dashboard";
import SelectComp from "../../../components/controls/SelectComp";
import useMedia from "../../../hooks/useMedia";
import { useTypedSelector } from "../../../hooks/useTypeSelector";
import "../../../styles/_ytdChart.scss";

const ChartBar = (props: any) => {
  const { md, tablet, lg, desktop } = useMedia();

  const [aspectRate, setAspectRate] = useState<number>(3.9); //eslint-disable-line
  const [selectedStatisticsChart, setSelectedStatisticsChart] =
    useState<number>(1); //eslint-disable-line
  const [data, setData] = useState<Array<any>>([]); //eslint-disable-line
  const [dataMin, setDataMin] = useState<number>(0);
  const {  currentUserPermissionModules } = useTypedSelector((state) => state.user);

  useEffect(() => {
    if (desktop) {
      setAspectRate(1.85);
    } else if (lg) {
      setAspectRate(1.7);
    } else if (tablet) {
      setAspectRate(1.5);
    } else if (md) {
      setAspectRate(2.1);
    } else {
      setAspectRate(2.1);
    }
  }, [md, tablet, lg, desktop]);

  useEffect(() => {
    const getData = async () => {
      const getAmountStatisticsRes = await getAmountStatistics({
        game_type: selectedStatisticsChart,
      });
      const result = getAmountStatisticsRes.data.result;
      setData(result);

      let valuesArr: any = [];
      result.map((item: any) => {
        valuesArr = [
          ...valuesArr,
          item.earnings,
          item.fee_collection,
          item.price_distribution,
        ];
        return valuesArr;
      });

      setDataMin(Math.min(...valuesArr));
    };
    getData();
  }, [selectedStatisticsChart]);

  const DropDownMenus = [
    { id: 1, name: "Group Trading" },
    { id: 2, name: "50/50 Trading" },
  ];

  return (
    <Card
      title={
        <div className="block md:flex">
          <span className="me-2">{props.title} </span>
          <SelectComp
            placeholder="Select Trade"
            options={DropDownMenus}
            handleChange={(val: any) => setSelectedStatisticsChart(val)}
            value={selectedStatisticsChart}
          />
        </div>
      }
      extra={
        <div className="flex items-center">
          {/* <SelectComp
            placeholder="Select Trade"
            options={DropDownMenus}
            handleChange={(val: any) => setSelectedStatisticsChart(val)}
            value={selectedStatisticsChart}
          /> */}
          {currentUserPermissionModules.includes("Earnings Report") && (
            <Link to="/reports/earnings" className="ml-2">
              <FaArrowRight className="fs-5 text-white" />
            </Link>
          )}
        </div>
      }
      className="ytdGraphCard tablet:mt-3"
    >
      <div className=" d-lg-flex md:flex mt-1.5 barChart">
        <ResponsiveContainer
          width={md ? "70%" : "100%"}
          height="50%"
          aspect={aspectRate}
        >
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, bottom: 10, left: 20 }}
            width={800}
          >
            <CartesianGrid strokeDasharray="3 3" fill="white" />
            <XAxis
              dataKey="month"
              stroke="#0A3453"
              type="category"
              dy={5}
              textAnchor="middle"
              tick={{ fontSize: 14, fontWeight: 400 }}
              interval={0}
            >
              <Label
                style={{
                  textAnchor: "middle",
                  fontSize: "15px",
                  fontWeight: "bold",
                  fill: "#0A3453",
                }}
                angle={360}
                value={"Months"}
                dy={30}
              />
            </XAxis>

            <YAxis stroke="#0A3453" domain={[dataMin, "auto"]}>
              <Label
                className="YAxisName"
                style={{
                  textAnchor: "middle",
                  fontSize: "15px",
                  fontWeight: "bold",
                  fill: "#0A3453",
                }}
                angle={270}
                value={"Amount"}
                dx={-30}
              />
            </YAxis>
            <Tooltip />
            <Legend />
            <Bar dataKey="fee_collection" fill="#79B1E5" />
            <Bar dataKey="price_distribution" fill="#EA6E69" />
            <Bar dataKey="earnings" fill="#FCDB88" />
          </BarChart>
        </ResponsiveContainer>
        <div className="elements tagsDiv xs:flex w-full justify-start md:justify-end md:w-[30%] md:block">
          <strong
            className="flex items-center mb-2.5 pr-4 md:pr-0"
            style={{ color: "#79B1E5" }}
          >
            <FaSquare /> &nbsp;Price Distribution
          </strong>
          <strong
            className="flex items-center mb-2.5 pr-4 md:pr-0"
            style={{ color: "#EA6E69" }}
          >
            <FaSquare /> &nbsp;Entry FeeCollection
          </strong>
          <strong
            className="flex items-center mb-2.5 pr-4 md:pr-0"
            style={{ color: "#FCDB88" }}
          >
            <FaSquare /> &nbsp;Earning
          </strong>
        </div>
      </div>
    </Card>
  );
};

export default ChartBar;
