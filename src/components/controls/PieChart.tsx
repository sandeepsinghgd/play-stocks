import { Card } from "antd";
import { useEffect, useState } from "react";
import { FaSquare, FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { getInvestedAmounts } from "../../api/dashboard";
import useMedia from "../../hooks/useMedia";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { setInvestedAmounts } from "../../redux/actions/dashboard";
import SelectComp from "./SelectComp";

const PieChartComp = () => {
  // const [aspectRate, setAspectRate] = useState<number>(3.5);
  const dispatch = useDispatch();
  const { investedAmounts } = useTypedSelector((state) => state.dashboard);
  const [selectedInvestedChart, setSelectedInvestedChart] = useState<number>(1);
  const [aspectRate, setAspectRate] = useState<number>(3.9); //eslint-disable-line
  const { md, tablet, lg, desktop } = useMedia();
  const { currentUserPermissionModules } = useTypedSelector((state) => state.user);

  useEffect(() => {
    if (desktop) {
      setAspectRate(1.4);
    } else if (lg) {
      setAspectRate(1.3);
    } else if (tablet) {
      setAspectRate(1.15);
    } else if (md) {
      setAspectRate(2.1);
    } else {
      setAspectRate(1.5);
    }
  }, [md, tablet, lg, desktop]);

  const data = [
    { name: "Group B", value: parseFloat(investedAmounts[0]?.earnings) },
    {
      name: "Group A",
      value: parseFloat(investedAmounts[0]?.price_distribution),
    },
  ];

  useEffect(() => {
    const getData = async () => {
      const getInvestedAmountsRes = await getInvestedAmounts({
        game_type: selectedInvestedChart,
      });
      dispatch(setInvestedAmounts(getInvestedAmountsRes.data.result));
    };
    getData();
  }, [selectedInvestedChart]);

  const COLORS = ["#9cbbe2", "#28548a"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const DropDownMenus = [
    { id: 1, name: "Group Trading" },
    { id: 2, name: "50/50 Trading" },
  ];

  return (
    <Card
      title="Invested Amount vs Months"
      extra={
        <div className="flex items-center">
          <SelectComp
            placeholder="Select Trade"
            options={DropDownMenus}
            handleChange={(val: any) => setSelectedInvestedChart(val)}
            value={selectedInvestedChart}
          />
          {currentUserPermissionModules.includes("Earnings Report") && (
            <Link to="/reports/earnings" className="ml-2">
              <FaArrowRight className="fs-5 text-white" />
            </Link>
          )}
        </div>
      }
      className="ytdGraphCard tablet:mt-3"
    >
      <div className="pieChartTagsDiv">
        <strong
          style={{
            color: "#9cbbe2",
            display: "flex",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <FaSquare /> &nbsp; Commission
        </strong>
        <strong
          style={{
            color: "#28548a",
            display: "flex",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <FaSquare /> &nbsp; Price Distribution
        </strong>
      </div>
      <ResponsiveContainer
        width={md ? "70%" : "100%"}
        height="80%"
        aspect={aspectRate}
      >
        <PieChart width={500} height={500} style={{ marginTop: "-2px" }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default PieChartComp;
