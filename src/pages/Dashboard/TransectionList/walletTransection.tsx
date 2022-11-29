import React, { useState } from "react";
import CRUDDataTable from "../../../components/DataTable/dataTable";
import {
  getGroupTradingWinners,
  getLatestTransactions,
  getThreeCardTradingWinners,
  getTodayGroupTrading,
  getTodayStockTrades,
  getTodayThreeCardTrading
} from "../../../api/dashboard";

const walletTransection = (props:any) => {
  const [draw, setDraw] = useState(0); // eslint-disable-line
  const getApiData = async (params: any) => {
    params = {
      ...params,
      rows: 5
    };
    
    switch(props.type) {
      case "todayGroupTrading":
        return await getTodayGroupTrading(params);
      case "todayFiftyFiftyTrading":
        return await getTodayThreeCardTrading(params);
      case "topTenStocksTrade":
        return await getTodayStockTrades(params);
      case "groupTradingWinners":
        return await getGroupTradingWinners(params);
      case "fiftyFiftyTradingWinners":
        return await getThreeCardTradingWinners(params);
      case "latestTransactions":
        return await getLatestTransactions(params);
    }
  };

  return (
    <div className="dashboardCard">
      <CRUDDataTable
        draw={draw}
        entity={props?.title}
        fetchDataFunction={getApiData}
        columns={props.column}
        sortOrder="id"
        rowKey="id"
        isButtonShown={false}
        dbcustomstyle="dbcustomstyle"
        // customComponentDisplay={true}
        sizeChanger={false}
        rightArrowLink={props.rightArrowLink}
        link={props.link}
        searchBox={props?.searchBox}
        isSmallTable={true}
        pageSize={5}
        type={props.type}
      />
    </div>
  );
};

export default walletTransection;
