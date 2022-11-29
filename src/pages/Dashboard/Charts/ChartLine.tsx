import { Card, InputNumber, message } from "antd";
import React, { useEffect, useState } from "react";
import { BiSquare } from "react-icons/bi";
import { useDispatch } from "react-redux";

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  Label,
} from "recharts";
import { getChartDara } from "../../../api/getChartData";
import { getGroupChartData } from "../../../api/groupChartData";
import { useTypedSelector } from "../../../hooks/useTypeSelector";
import {
  dbGroupChartData,
  dbThreeCardChartData,
} from "../../../redux/actions/dbstockList";

const ChartLine = () => {
  const dispatch = useDispatch();
  const [aspectRate, setAspectRate] = useState<number>(3.5);
  const { dbGroupChart, dbThreeCardChart } = useTypedSelector(
    (state) => state.dbData
  );
  const CustomTooltip = ({ active, payload, label }: any) => {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#0A3453",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          padding: "10px",
          fontSize: "11px",
        }}
      >
        <p className="label">{`Amount  : ${payload[0]?.payload?.amount}`}</p>
        <p className="label">{`Group Bids : ${payload[0]?.payload?.Gt_total_bids}`}</p>
        <p className="label">{`50/50 Bids : ${payload[0]?.payload?.TC_total_bids}`}</p>
      </div>
    );
  };

  let merge: any[] = [];
  let addingZero: any[] = [];
  addingZero = [
    {
      amount: "0.00",
      Gt_total_bids: 0,
      TC_total_bids: 0,
    },
  ];

  const fetchChartDataThreeCard = async () => {
    try {
      const res = await getChartDara();
      const result = res.data.result;
      dispatch(dbThreeCardChartData(result));
    } catch (error: any) {
      message.error(error);
    }
  };

  const fetchGroupChartData = async () => {
    try {
      const res = await getGroupChartData();
      const result = res.data.result;

      dispatch(dbGroupChartData(result));
    } catch (error: any) {
      message.error(error);
    }
  };
 
  useEffect(() => {
    fetchGroupChartData();
    fetchChartDataThreeCard();
  }, []);

  const totalGroupAmount: any[] = [];

  function getDifference(array1: any, array2: any) {
    return array1.filter((object1: any) => {
      return !array2.some((object2: any) => {
        return object1.amount === object2.amount;
      });
    });
  }

  const groupChartData = getDifference(dbGroupChart, dbThreeCardChart);
  const threeCardChartData = getDifference(dbThreeCardChart, dbGroupChart);

  threeCardChartData.forEach((d: any) => {
    totalGroupAmount.push({
      amount: d?.amount,
      Gt_total_bids: 0,
      TC_total_bids: d?.total_bids,
    });
  });
  groupChartData.forEach((d: any) => {
    totalGroupAmount.push({
      amount: d?.amount,
      Gt_total_bids: d?.total_bids,
      TC_total_bids: 0,
    });
  });

  dbGroupChart.forEach((ele1: any) => {
    dbThreeCardChart.forEach((ele2: any) => {
      if (ele1.amount == ele2.amount) {
        totalGroupAmount.push({
          amount: ele1?.amount,
          Gt_total_bids: ele1?.total_bids,
          TC_total_bids: ele2?.total_bids,
        });
      }
    });
  });
  merge = addingZero.concat(totalGroupAmount);
  merge = merge.sort((a: any, b: any) => {
    return a.amount - b.amount;
  });

  return (
    <Card
      title="Group Amount vs No. of Bids"
      extra={
        <InputNumber
          className="chartaspect"
          min={1}
          max={10}
          style={{ color: "#fff", background: "transparent" }}
          defaultValue={aspectRate}
          onChange={(value: any) => setAspectRate(+value)}
        />
      }
      className="ytdGraphCard"
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
          data={merge}
          margin={{ top: 10, right: 30, bottom: 10, left: 0 }}
          width={800}
        >
          <CartesianGrid strokeDasharray="3 3" fill="white" />
          <XAxis
            dataKey="amount"
              stroke="#0A3453"
              dy={5}
              type="number"
              ticks={[25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300]}
              textAnchor="end"
              tick={{ fontSize: 14 }}
              minTickGap={1000}
              tickCount={5}
              interval={0}
              scale="linear"
              domain={[0, 0]}
          >
            <Label
              style={{
                textAnchor: "middle",
                fontSize: "15px",
                fontWeight: "bold",
                fill: "#0A3453",
              }}
              angle={360}
              value={"Group Amount"}
              dy={30}
            />
          </XAxis>

          <YAxis stroke="#0A3453" ticks={[5, 10, 15, 20]}>
            <Label
              className="me-4"
              style={{
                textAnchor: "middle",
                fontSize: "15px",
                fontWeight: "bold",
                fill: "#0A3453",
              }}
              angle={270}
              value={"No.of Bids"}
              // dx={-5}
            />
          </YAxis>

          <Tooltip content={<CustomTooltip />} />
          <Legend />

          <Line
            type="monotone"
            dataKey="Gt_total_bids"
            stroke="#32cd32"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="TC_total_bids"
            stroke="#f83a44"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ChartLine;
