import { Button, Card, Col, DatePicker, message, Row } from "antd";
import moment from "moment";
import GroupTradingStats from "../GroupTradingStats";
import "../../../styles/logicTable.scss";
import GroupSummaryTable from "../GroupSummaryTable";
import ThreeCardStats from "../ThreeCardStats";
import { useEffect, useState } from "react";
import ThreeCardSummaryTable from "../ThreeCardSummaryTable";
import { analysisUsers } from "../../../api/analysisUsers";
import { getGroupAnalysis } from "../../../api/groupAnalysis";
import { useDispatch } from "react-redux";
import { setGroupAnalysisData, setThreeCardAnalysisData } from "../../../redux/actions/groupTrade";
import { get3CardAnalysis } from "../../../api/threeCardAnalysis";
// import { useTypedSelector } from "../../../hooks/useTypeSelector";

const LogicTable = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState<any>(null);
  const [investedAmount, setInvestedAmount] = useState<any>(null);
  const [commission, setCommission] = useState<any>(null);
  const [amountDistributed, setAmountDistributed] = useState<any>(null);
  const [floorAmount, setFloorAmount] = useState<any>(null);
  const [total, setTotal] = useState<any>(null);

  const [ThreeCardUsers, setThreeCardUsers] = useState<any>(null);
  const [ThreeCardInvestedAmount, setThreeCardInvestedAmount] =
    useState<any>(null);
  const [ThreeCardCommission, setThreeCardCommission] = useState<any>(null);
  const [ThreeCardAmountDistributed, setThreeCardAmountDistributed] =
    useState<any>(null);
  const [ThreeCardTotal, setThreeCardTotal] = useState<any>(null);
  const todayDate = new Date();
  const date =
    todayDate.getFullYear() +
    "-" +
    (todayDate.getMonth() + 1) +
    "-" +
    todayDate.getDate();
  const [ResultDate, setResultDate] = useState(date);
  const [UserAnalysisData, setUserAnalysisData] = useState<any>({});
  // const { GroupData } = useTypedSelector((state) => state.GroupTradeReducer);

  const fetchDateAnalysis = async () => {
    try {
      const payload = {
        date: ResultDate,
      };
      const response = await analysisUsers(payload);
      setUserAnalysisData(response.data.result);
    } catch (err: any) {
      message.error(err);
    }
  };
  const fetchGroupAnalysis = async () => {
    try {
      const payload = {
        bid_date: ResultDate,
      };
      const response = await getGroupAnalysis(payload);
      dispatch(setGroupAnalysisData(response.data));
      } 
      catch (err: any) {
        message.error(err);
      }
    };
    const fetch3CardAnalysis = async () => {
      try {
        const payload = {
          bid_date: ResultDate,
        };
        const response = await get3CardAnalysis(payload);
        dispatch(setThreeCardAnalysisData(response.data));
        } 
        catch (err: any) {
          message.error(err);
        }
      };
    useEffect(() => {
      fetchDateAnalysis();
      fetchGroupAnalysis();
      fetch3CardAnalysis();
    }, [ResultDate]);
  return (
    <div>
      <div className="dateSelector pb-4 ps-2">
        <label style={{ color: "#0A3453", fontWeight: "600" }}>
          Select Result Date: &nbsp;&nbsp;&nbsp;
        </label>
        <DatePicker
          name="value"
          defaultValue={moment(date)}
          onChange={(date: any, dateString: any) => {
            setResultDate(dateString);
          }}
        />
        <Button
          type="primary"
          style={{ borderRadius: "0px" }}
          className="ms-3"
          onClick={()=>{fetchDateAnalysis();fetchGroupAnalysis();}}
        >
          Get Result
        </Button>
      </div>
      <Row className="pt-3 ps-3">
        <Col span={8}>
          <Card title="User Stats" className="cardStyle1">
            <div style={{ display: "flex" }}>
              <Card.Grid hoverable={false} style={{ width: "50%" }}>
                Today&apos;s Registrations
              </Card.Grid>
              <Card.Grid style={{ width: "50%" }}>
                {UserAnalysisData?.registred_user}
              </Card.Grid>
            </div>
            <div>
              <Card.Grid hoverable={false} style={{ width: "50%" }}>
                Total Active Users
              </Card.Grid>
              <Card.Grid style={{ width: "50%" }}>
                {UserAnalysisData?.active_user}
              </Card.Grid>
            </div>
          </Card>
        </Col>
        <Col span={8} className="ps-3">
          <Card title="Group trading" className="cardStyle">
            <div style={{ display: "flex" }}>
              <Card.Grid hoverable={false} style={{ width: "50%" }}>
                Amount Invested in Group Trading
              </Card.Grid>
              <Card.Grid style={{ width: "50%" }}>{investedAmount}</Card.Grid>
            </div>
            <div style={{ display: "flex" }}>
              <Card.Grid hoverable={false} style={{ width: "50%" }}>
                Difference
              </Card.Grid>
              <Card.Grid style={{ width: "50%" }}>
                {investedAmount - total}
              </Card.Grid>
            </div>
          </Card>
        </Col>
        <Col span={8} className="px-3">
          <Card title="50/50 trading" className="cardStyle">
            <div style={{ display: "flex" }}>
              <Card.Grid hoverable={false} style={{ width: "50%" }}>
                Amount Invested in 50/50 Trading
              </Card.Grid>
              <Card.Grid style={{ width: "50%" }}>
                {ThreeCardInvestedAmount}
              </Card.Grid>
            </div>
            <div style={{ display: "flex" }}>
              <Card.Grid hoverable={false} style={{ width: "50%" }}>
                Difference
              </Card.Grid>
              <Card.Grid style={{ width: "50%" }}>
                {ThreeCardInvestedAmount - ThreeCardTotal}
              </Card.Grid>
            </div>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col span={18} className="ps-3 pt-5">
          <GroupTradingStats
            ResultDate={ResultDate}
            setUsers={setUsers}
            setInvestedAmount={setInvestedAmount}
            setCommission={setCommission}
            setAmountDistributed={setAmountDistributed}
            setFloorAmount={setFloorAmount}
            setTotal={setTotal}
          />
        </Col>
        <Col span={6} className="ps-3 pt-5 pe-3">
          <GroupSummaryTable
            users={users}
            investedAmount={investedAmount}
            commission={commission}
            amountDistributed={amountDistributed}
            floorAmount={floorAmount}
            total={total}
          />
        </Col>
      </Row>
      <Row className="pb-5">
        <Col span={18} className="ps-3 pt-5">
          <ThreeCardStats
            setThreeCardUsers={setThreeCardUsers}
            setThreeCardInvestedAmount={setThreeCardInvestedAmount}
            setThreeCardCommission={setThreeCardCommission}
            setThreeCardAmountDistributed={setThreeCardAmountDistributed}
            setThreeCardTotal={setThreeCardTotal}
          />
        </Col>
        <Col span={6} className="ps-3 pt-5 pe-3">
          <ThreeCardSummaryTable
            ThreeCardUsers={ThreeCardUsers}
            ThreeCardInvestedAmount={ThreeCardInvestedAmount}
            ThreeCardCommission={ThreeCardCommission}
            ThreeCardAmountDistributed={ThreeCardAmountDistributed}
            ThreeCardTotal={ThreeCardTotal}
          />
        </Col>
      </Row>
    </div>
  );
};

export default LogicTable;
