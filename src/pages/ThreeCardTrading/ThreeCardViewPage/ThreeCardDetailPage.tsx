import { Card, Tabs } from "antd";
import { Field, Formik } from "formik";
import { Form } from "formik-antd";
import { FC, useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import InputField from "../../../components/controls/InputField";
import * as Yup from "yup";
import SwitchField from "../../../components/controls/SwitchField";
import { useParams } from "react-router-dom";
import ThreeCardBiddersTab from "./ThreeCardBiddersTab";
import ThreeCardResultsTab from "./ThreeCardResultsTab";
import { viewThreeCardGroupApi } from "../../../api/threeCardTrading";
import { useTypedSelector } from "../../../hooks/useTypeSelector";
import { findCommonElements } from "../../../utils/helpers";
import { useDispatch } from "react-redux";
import { get3CardBiddersLiveData } from "../../../redux/actions/liveStocksData";
import { setStocks } from "../../../api/stocks";
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

const threeCardTradingModalSchema = Yup.object().shape({
  name: Yup.string().required("Please enter group name."),
  amount: Yup.number()
    .positive()
    .integer()
    .required("Please enter amount.")
    .test(
      "It is",
      "Amount must be multiple of three",
      (value: any) => value % 3 === 0
    ),
  bid_user_limit: Yup.number()
    .moreThan(-1, "Rounds limit can't be a negative value.")
    // .typeError('Rounds limit must be a number.')
    .integer("Rounds limit only allow digits.")
    .required("Please enter rounds limit."),
});

const ThreeCardDetailPage: FC<IEditPublicFormProps> = () => {
  const formikRef = useRef(null);
  const id: any = useParams();
  const { currentUserPermissions } = useTypedSelector((state) => state.user);
  const checkPermissions = ["view_three_card_bids", "view_three_card_result"];
  const [initialValues, setInitialValues] = useState<any>({});
  let interval: any = null;
  const secretKey = localStorage.getItem("secretKey");
  const dispatch = useDispatch();
  const [stockSymbols, setStockSymbols] = useState<any>();
  
  useEffect(() => {
    viewThreeCardGroup();
    getThreeCardStocks();
  }, []);

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
      dispatch(get3CardBiddersLiveData(JSON.parse(data)));
    };
  };

  const getThreeCardStocks = async () => {
    const response = await setStocks(2);
    const res = response.data.result;
    setStockSymbols(res);
    connect(res);
  };

  const viewThreeCardGroup = async () => {
    const response = await viewThreeCardGroupApi(id.id);
    // setDataValues(response.data.result);
    setInitialValues(response.data.result);
  };

  const submit = async (values: any, setFieldError: any) => {};

  if (Object.keys(initialValues).length === 0) {
    return null;
  }

  return (
    <>
      <Card size="small">
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={threeCardTradingModalSchema}
          onSubmit={(values, actions) => submit(values, actions.setFieldError)}
        >
          <Form>
            <Row className="pb-2 editTitle">
              <Col xs={12} md={6} lg={6}>
                <h6 className="pt-2 fw-bold fs-6"><strong > 50/50 Data </strong></h6>
              </Col>
              <Col
                xs={12}
                md={6}
                lg={6}
                className="d-flex justify-content-md-end"
              ></Col>
            </Row>
            <Row className="mt-2">
              <Col xs={12} md={6} lg={4}>
                <Field
                  name="name"
                  label="Group Name"
                  placeholder="Enter Group Name"
                  size="default"
                  defaultValue={initialValues.name}
                  value={initialValues.name}
                  component={InputField}
                  readOnly
                />
              </Col>
              <Col xs={12} md={6} lg={4}>
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
              <Col xs={12} md={6} lg={4}>
                <Field
                  name="system_commission"
                  label="System Commission"
                  type="number"
                  placeholder="Enter bid user limit"
                  size="default"
                  component={InputField}
                  readOnly
                />
              </Col>
            </Row>
            <Row>
            <Col xs={12} md={6} lg={4}>
                <Field
                  name="winning_amount"
                  label="Winning Amount"
                  type="number"
                  placeholder="Winning Amount"
                  size="default"
                  component={InputField}
                  readOnly
                />
              </Col>
              <Col xs={12} md={6} lg={4} className="mt-1">
                <Field
                  name="status"
                  label="Status"
                  size="default"
                  defaultChecked={initialValues.status !== 0}
                  className="mt-1 d-block"
                  component={SwitchField}
                  disabled
                />
              </Col>
              
            </Row>
          </Form>
        </Formik>
      </Card>
      {findCommonElements(checkPermissions, currentUserPermissions) && (
        <Tabs
          onChange={() => {}}
          type="card"
          className="detailPageTab ms-0 mt-3"
        >
          {currentUserPermissions.includes("view_three_card_bids") && (
            <TabPane tab="Bidders" key="1">
              <ThreeCardBiddersTab />
            </TabPane>
          )}
          {currentUserPermissions.includes("view_three_card_result") && (
            <TabPane tab="Results" key="2">
              <ThreeCardResultsTab />
            </TabPane>
          )}
        </Tabs>
      )}
    </>
  );
};

export default ThreeCardDetailPage;
