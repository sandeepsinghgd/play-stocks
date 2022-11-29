import { FC, useEffect } from "react";
import PageWrapper from "./PageWrapper/PageWrapper";
import { getPermissions } from "../api/permission";
import { message } from "antd";
import { setPermissions } from "../redux/actions/permissions";
import { useDispatch } from "react-redux";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import IdleTimer from "react-idle-timer";
import { onIdle } from "../utils/helpers";
import {
  getPrevMarketDate,
  setMarketStatus,
} from "../redux/actions/marketDates";
import { getMarketStatus, setPrevMarketDate } from "../api/marketStatus";

const MainLayout: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllPermissions();
    fetchPrevMarketOpenDate();
    fetchMarketStatus();
  }, []);

  const fetchAllPermissions = async () => {
    try {
      const response = await getPermissions();

      if (response?.data?.result) {
        dispatch(setPermissions(response.data.result));
      }
    } catch (err: any) {
      message.error(err);
    }
  };
  const fetchMarketStatus = async () => {
    try {
      const response = await getMarketStatus();
      const result = response?.data?.result.live_market;
      dispatch(setMarketStatus(result));
    } catch (err: any) {
      message.error(err);
    }
  };
  const fetchPrevMarketOpenDate = async () => {
    try {
      const response = await setPrevMarketDate("PREV_MARKET_OPEN_DATE");
      dispatch(getPrevMarketDate(response.data));
    } catch (err: any) {
      message.error(err);
    }
  };

  return (
    <>
      <IdleTimer timeout={1000 * 1800} onIdle={onIdle}>
        <PageWrapper />
      </IdleTimer>
    </>
  );
};

export default MainLayout;
