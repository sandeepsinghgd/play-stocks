import { Card, Tabs } from "antd";
import { Field, Formik } from "formik";
import { Form } from "formik-antd";
import { FC, useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import InputField from "../../../components/controls/InputField";
import "../../../styles/_groupViewPage.scss";
import * as yup from "yup";
import { viewGroup } from "../../../api/groupTrading";
import SwitchField from "../../../components/controls/SwitchField";
import BiddersTab from "./BiddersTab";
import ResultsTab from "./ResultsTab";
import { useParams } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypeSelector";
import { findCommonElements } from "../../../utils/helpers";
import { getStockList } from "../../../api/stocks";
import PrizeDistributionTab from "./PrizeDistributeTab";
import { useDispatch } from "react-redux";
import { getGroupResultLiveData } from "../../../redux/actions/liveStocksData";
interface IEditPublicFormProps {
  title?: any;
  group?: any;
  visible?: boolean;
  setVisibility?: any;
  isEdit?: any;
  onClose?: any;
  onSubmit?: any;
}

const { TabPane } = Tabs;

const groupTradingModalSchema = yup.object().shape({
  name: yup.string().required("Please enter a name."),
  amount: yup.number().positive().integer().required("Please enter amount."),
  bid_user_limit: yup
    .number()
    .moreThan(-1, "Rounds limit can't be a negative value.")
    // .typeError('Rounds limit must be a number.')
    .integer("Rounds limit only allow digits.")
    .required("Please enter rounds limit."),
  winning_limit: yup
    .number()
    .moreThan(-1, "Rounds limit can't be a negative value.")
    .required("Please enter winning limit."),
  first_rank_amount: yup
    .number()
    .moreThan(-1, "Rounds limit can't be a negative value.")
    .required("Please enter first rank amount."),
  last_rank_amount: yup
    .number()
    .moreThan(-1, "Rounds limit can't be a negative value.")
    .required("Please enter last rank amount.")
    .lessThan(
      yup.ref("first_rank_amount"),
      "Last rank amount must be less than first rank amount."
    ),
});

const GroupViewPage: FC<IEditPublicFormProps> = ({
  title,
  group,
  visible,
  setVisibility,
  isEdit,
  onClose,
  onSubmit,
}) => {
  const formikRef = useRef(null);
  const [check, setCheck] = useState(1); // eslint-disable-line
  const [stockTypeId, setStockTypeId] = useState<any>();
  const [UserCount, setUserCount] = useState<any>(null);
  const id: any = useParams();
  const [stockList, setStockList] = useState<any[]>([]);
  const [groupResult, setGroupResult] = useState<any>({});
  const [stockSymbols, setStockSymbols] = useState<any>();
  const [randomeKey, setRandomKey] = useState("");

  // const [MarketStatus, setMarketStatus] = useState<any>();
  const { currentUserPermissions } = useTypedSelector((state) => state.user);
  const checkPermissions = ["view_group_bids", "view_group_leader_board"];
  let interval: any = null;
  const secretKey = localStorage.getItem("secretKey");
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, []);

  const connect = function (symbols = null) {
    const availableSymbols = symbols || stockSymbols;

    const wsUrl = encodeURI(
      "wss://kite-api.playstocks.in/stocks?client_id=" + secretKey
    );

    const ws = new WebSocket(wsUrl);
    const strSymbols = availableSymbols.map((item: any) => item).join(",");

    ws.onopen = function () {
      if (interval != null) {
        clearInterval(interval);
      }

      const filters: any = {
        filter: {
          sortBy: "symbol",
          order: "asc",
          search: "",
        },
        symbol: strSymbols,
      };
      interval = setInterval(function () {
        ws.send(JSON.stringify(filters));
      }, 2000);
    };
    ws.onclose = function () {
      if (interval != null) {
        clearInterval(interval);
      }
    };

    ws.onerror = function (e) {
      ws.close();
      connect(strSymbols);
    };

    ws.onmessage = function (stocks) {
      const { data } = stocks;
      dispatch(getGroupResultLiveData(JSON.parse(data)));
    };
  };

  useEffect(() => {
    fetchGroupDetails();
    fetchStock();
  }, []);

  const fetchGroupDetails = async () => {
    const response = await viewGroup(id.id);
    setGroupResult(response?.data?.result);
    setUserCount(response?.data?.result?.previous_day_join_count);
    setCheck(response?.data?.result?.status);
    setStockTypeId(response?.data?.result?.id);
  };
  const fetchStock = async () => {
    const response = await getStockList(1);
    setStockList(response?.data?.result);
    setStockSymbols(response?.data?.result);
    connect(response?.data?.result);
  };
  // const fetchWinningRatio = async () => {
  //   const resp = await listWinningRatio(id.id);
  //   const result = resp.data.result;
  //   dispatch(setWinningRatio(result));
  // };

  const initialValues = {
    name: groupResult?.name ? groupResult.name : "",
    amount: groupResult?.amount ? groupResult.amount : "",
    round_limit: groupResult?.round_limit ? groupResult.round_limit : "",
    winning_limit: groupResult?.winning_limit ? groupResult.winning_limit : "",
    winning_amount: groupResult?.winning_amount
      ? groupResult.winning_amount
      : "",
    first_rank_amount: groupResult?.first_rank_amount
      ? groupResult.first_rank_amount
      : "",
    last_rank_amount: groupResult?.last_rank_amount
      ? groupResult.last_rank_amount
      : "",
    // id:
    //   stockList !== undefined &&
    //   stockList
    //     .map((item: any) => (item.id == stockTypeId ? item.name : ""))
    //     .join(""),
    status: groupResult.status,
    minimum_player: groupResult?.minimum_player
      ? groupResult.minimum_player
      : "",
    maximum_player: groupResult?.maximum_player
      ? groupResult.maximum_player
      : "",
    system_commission: groupResult?.system_commission
      ? groupResult.system_commission
      : "",
  };
  // const submit = async (values: any, setFieldError: any) => {
  // values = {
  // ...values,
  // status: check,
  // id: stockTypeId,
  // };

  // let response;
  // try {
  // response = await updateGroup(values);
  // if (response.data.success) {
  // message.success(response.data.message);
  // setVisibility(false);
  // onSubmit();
  // }
  // } catch (error: any) {
  // if (error.response.status === 422) {
  // for (const key in error.response.data.errors) {
  // setFieldError(key, error.response.data.errors[key][0]);
  // }
  // }
  // message.destroy();
  // }
  // };
  const submit = () => {};

  if (
    Object.keys(initialValues).length === 0 ||
    Object.keys(stockList).length === 0 ||
    stockList === undefined ||
    Object.keys(groupResult).length === 0 ||
    UserCount == undefined
  ) {
    return null;
  }

  return (
    <>
      {stockTypeId !== undefined && (
        <Card size="small">
          <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            validationSchema={groupTradingModalSchema}
            onSubmit={submit}
            onReset={(setFieldValue) => {
              setCheck(1)
              setRandomKey(Math.random().toString(36));
            }}
          >
            {/* {({values}:any)=>( */}
            <Form>
              <Row className="pb-2 editTitle">
                <Col xs={12} md={6} lg={6}>
                  <h5 className="pt-2 fs-6"><strong>Group Data</strong></h5>
                </Col>
                <Col
                  xs={12}
                  md={6}
                  lg={6}
                  className="d-flex justify-content-md-end"
                >
                  {/* {initialValues.next_day_join_count === 0 ? (
                  <>
                    <ResetButton className="me-2">Reset</ResetButton>
                    <SubmitButton>Update</SubmitButton>
                  </>
                ) : (
                  ""
                )} */}
                </Col>
              </Row>
              <Row className="mt-2">
                <Col xs={12} md={6} lg={3}>
                  <Field
                    name="name"
                    label="Group Name"
                    placeholder="Enter Group Name"
                    size="default"
                    component={InputField}
                    // defaultValue={groupResult?.name}
                    // value={groupResult?.name}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <Field
                    name="amount"
                    label="Amount"
                    type="number"
                    placeholder="Enter amount"
                    size="default"
                    component={InputField}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <Field
                    name="round_limit"
                    label="Rounds Limit"
                    placeholder="Enter bid user limit"
                    size="default"
                    component={InputField}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <Field
                    name="winning_limit"
                    label="Winning Limit(In percentage)"
                    type="number"
                    placeholder="Enter winning limit"
                    size="default"
                    component={InputField}
                    readOnly
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6} lg={3}>
                  <Field
                    name="winning_amount"
                    label="Winning Amount"
                    type="number"
                    placeholder="Enter winning Amount"
                    size="default"
                    component={InputField}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <Field
                    name="minimum_player"
                    label="Minimum Player"
                    type="number"
                    placeholder="Enter Minimum Player"
                    size="default"
                    component={InputField}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <Field
                    name="maximum_player"
                    label="Maximum Player"
                    type="number"
                    placeholder="Enter Maximum Player"
                    size="default"
                    component={InputField}
                    readOnly
                  />
                </Col>
                {/* <Col xs={12} md={6} lg={3}>
                  <Field
                    name="system_commission"
                    label="System Commission"
                    placeholder="System Commission"
                    size="default"
                    readOnly
                    component={InputField}
                  />
                </Col> */}
              </Row>
              <Row>
                <Col xs={12} md={6} lg={3} className="mt-1">
                  <Field
                    name="is_guaranteed_return"
                    style={{ backgroundColor: groupResult?.is_guaranteed_return !== 0 ? "#0A3453" : "lightgray"}}
                    label="Is Guaranteed Return?"
                    size="default"
                    defaultChecked={groupResult?.is_guaranteed_return !== 0}
                    onChange={(values: any) =>
                      setCheck(values === true ? 1 : 0)
                    }
                    className="mt-1 d-block"
                    component={SwitchField}
                    randomeKey={randomeKey}
                    disabled
                  />
                </Col>
                <Col xs={12} md={6} lg={3} className="mt-1">
                  <Field
                    name="status"
                    style={{ backgroundColor: groupResult?.status !== 0 ? "#0A3453" : "lightgray"}}
                    label="Status"
                    size="default"
                    defaultChecked={groupResult?.status !== 0}
                    onChange={(values: any) =>
                      setCheck(values === true ? 1 : 0)
                    }
                    className="mt-1 d-block"
                    component={SwitchField}
                    randomeKey={randomeKey}
                    disabled
                  />
                </Col>
              </Row>
            </Form>
            {/* )} */}
          </Formik>
        </Card>
      )}
      {findCommonElements(checkPermissions, currentUserPermissions) && (
        <Tabs
          onChange={() => {}}
          type="card"
          className="detailPageTab ms-0 mt-3"
        >
          {currentUserPermissions.includes("view_group_bids") && (
            <TabPane tab="Bidders" key="1">
              <BiddersTab />
            </TabPane>
          )}

          {currentUserPermissions.includes("view_group_result") && (
            <TabPane tab="Results" key="2">
              <ResultsTab minPlayer={groupResult.minimum_player} />
            </TabPane>
          )}
          {/* {MarketStatus.live_market == "open" && UserCount > 1 && UserCount <= 10 && ( */}
          <TabPane tab="Prize Distribution" key="3">
            <PrizeDistributionTab />
            {/* <PrizeDistributionTab userCount={UserCount} /> */}
          </TabPane>
          {/* )} */}
        </Tabs>
      )}
    </>
  );
};

export default GroupViewPage;
