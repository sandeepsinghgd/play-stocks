import { Card, InputNumber, message } from "antd";
import { useEffect, useState } from "react";
import { BiSquare } from "react-icons/bi";
import { useDispatch } from "react-redux";
// import { useDispatch } from "react-redux";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { get3CardInvestmentData } from "../../../api/getChartData";
import { getGroupInvestmentData } from "../../../api/groupChartData";
import { useTypedSelector } from "../../../hooks/useTypeSelector";
import {
  dbGroupInvestmentData,
  dbThreeCardInvestmentData,
} from "../../../redux/actions/dbstockList";
import "../../../styles/_ytdChart.scss";

const YTDChart = () => {
  const [aspectRate, setAspectRate] = useState<number>(3.5);
  const dispatch = useDispatch();
  const { dbGroupInvestmentChart, db3CardInvestmentChart } = useTypedSelector(
    (state) => state.dbData
  );

  const fetchChartDataThreeCard = async () => {
    const payload = {
      type: "ytd",
    };
    try {
      const res = await get3CardInvestmentData(payload);
      const result = res.data.result;
      dispatch(dbThreeCardInvestmentData(result));
    } catch (error: any) {
      message.error(error);
    }
  };

  const fetchGroupChartData = async () => {
    const payload = {
      type: "ytd",
    };
    try {
      const res = await getGroupInvestmentData(payload);
      const result = res.data.result;
      dispatch(dbGroupInvestmentData(result));
    } catch (error: any) {
      message.error(error);
    }
  };
  useEffect(() => {
    fetchGroupChartData();
    fetchChartDataThreeCard();
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    return (
      <div className="customTooltip">
        <p className="label">{`Month  : ${payload[0]?.payload?.month}`}</p>
        <p className="label">{`Group Amount : ${payload[0]?.payload?.Gt_total_amount}`}</p>
        <p className="label">{`50/50 Amount : ${payload[0]?.payload?.TC_total_amount}`}</p>
      </div>
    );
  };
  const totalInvestedAmount: any[] = [];

  function getDifference(array1: any, array2: any) {
    return array1?.filter((object1: any) => {
      return !array2?.some((object2: any) => {
        return object1.month === object2.month;
      });
    });
  }

  // if (
  //   Object.keys(dbGroupInvestmentChart).length === 0 ||
  //   Object.keys(db3CardInvestmentChart).length === 0
  // ) {
  //   return null;
  // }

  const groupChartData = getDifference(
    dbGroupInvestmentChart,
    db3CardInvestmentChart
  );
  const threeCardChartData = getDifference(
    db3CardInvestmentChart,
    dbGroupInvestmentChart
  );

  threeCardChartData != undefined &&
    threeCardChartData.forEach((d: any) => {
      totalInvestedAmount.push({
        month: d?.month,
        Gt_total_amount: 0,
        TC_total_amount: d?.amount,
      });
    });
  groupChartData != undefined &&
    groupChartData.forEach((d: any) => {
      totalInvestedAmount.push({
        month: d?.month,
        Gt_total_amount: d?.amount,
        TC_total_amount: 0,
      });
    });

  dbGroupInvestmentChart != undefined &&
    dbGroupInvestmentChart.forEach((ele1: any) => {
      db3CardInvestmentChart != undefined &&
        db3CardInvestmentChart.forEach((ele2: any) => {
          if (ele1.month == ele2.month) {
            totalInvestedAmount.push({
              month: ele1?.month,
              Gt_total_amount: ele1?.amount,
              TC_total_amount: ele2?.amount,
            });
          }
        });
    });
  const newInvestAmountArr = totalInvestedAmount.map((ele: any) => {
    ele.month = ele.month.slice(0, 3);
    return ele;
  });
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const sorter = (a: any, b: any) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    } else {
      return months.indexOf(a.month) - months.indexOf(b.month);
    }
  };
  totalInvestedAmount.sort(sorter);

  return (
    <Card
      title="Invested Amount vs Months"
      extra={
        <InputNumber
          className="chartaspect"
          min={1}
          max={10}
          style={{ color: "#fff", background: "transparent" }}
          defaultValue={aspectRate}
          onChange={(value: number) => setAspectRate(+value)}
        />
      }
      className="ytdGraphCard mt-3"
    >
      <div className="tagsDiv">
        <strong style={{ color: "#32cd32" }}>
          <BiSquare /> &nbsp; Group Trading
        </strong>
        &nbsp;&nbsp;
        <strong style={{ color: "#f83a44" }}>
          <BiSquare /> &nbsp;50/50 Trading
        </strong>
      </div>
      <ResponsiveContainer width="100%" height="100%" aspect={aspectRate}>
        <LineChart
          data={newInvestAmountArr}
          margin={{ top: 10, right: 30, bottom: 10, left: 0 }}
          width={800}
          // height={}
        >
          <CartesianGrid strokeDasharray="3 3" fill="white" />
          <XAxis
            dataKey="month"
            stroke="#0A3453"
            type="category"
            dy={5}
            ticks={[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ]}
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

          <YAxis stroke="#0A3453" ticks={[1000, 2000, 3000, 4000]}>
            <Label
              style={{
                textAnchor: "middle",
                fontSize: "15px",
                fontWeight: "bold",
                fill: "#0A3453",
              }}
              angle={270}
              value={"Invested Amount"}
              dx={-20}
            />
          </YAxis>

          <Tooltip content={<CustomTooltip payload={undefined} />} />
          <Legend />

          <Line
            type="monotone"
            dataKey="Gt_total_amount"
            stroke="#32cd32"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="TC_total_amount"
            stroke="#f83a44"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default YTDChart;
