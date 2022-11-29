import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getGroupCardStock, getThreeCardStock } from "../../../api/dbStockList";
import CRUDDataTable from "../../../components/DataTable/dataTable";
// import { useTypedSelector } from "../../../hooks/useTypeSelector";
import {
  dbStockList3CT,
  dbStockListGT,
} from "../../../redux/actions/dbstockList";
const StockList = () => {
  const dispatch = useDispatch();
  const [draw, setDraw] = useState(0); // eslint-disable-line

  const [groupStock, setGroupStock] = useState<any>([]);
  const [threeStock, setThreeStock] = useState<any>([]);

  const newAray: any[] = [];
  let stockMerge: any[] = [];
  let stockMerge1: any[] = [];
  const columns = [
    {
      title: <strong>Stock Symbol</strong>,
      dataIndex: "stock_symbol",
      key: "stock_symbol",
      sorter: true,
    },
    {
      title: <strong>Total Bid Count</strong>,
      dataIndex: "total_bid_count",
      key: "total_bid_count",
      // sorter: true,
    },
    {
      title: <strong>Total Amount Invested</strong>,
      dataIndex: "total_amount",
      key: "total_amount",
      // sorter: true,
    },
  ];

  useEffect(() => {
    fetchGroupStockData();
    fetchThreeStockData();
  }, []);

  const fetchGroupStockData = async () => {
    const result = await getGroupCardStock();
    setGroupStock(result?.data?.result?.group_bids);
    dispatch(dbStockListGT(result?.data?.result));
    // setActiveGroupNo3CT(result?.data?.result?.group_trading_counts);
  };
  const fetchThreeStockData = async () => {
    const result = await getThreeCardStock();
    setThreeStock(result?.data?.result?.bid_stocks);
    dispatch(dbStockList3CT(result?.data?.result));

    // setActiveGroupNo3CT(result?.data?.result?.three_card_counts);
  };

  if (groupStock !== "" && threeStock !== "") {
    stockMerge = groupStock.concat(threeStock);
    groupStock.forEach((item1: any, index: any) => {
      threeStock.forEach((item2: any, index: any) => {
        if (item1.stock_symbol == item2.stock_symbol) {
          stockMerge = stockMerge.filter((obj) =>
            obj.stock_symbol !== item1.stock_symbol &&
            obj.stock_symbol !== item2.stock_symbol
              ? obj
              : "null"
          );
          newAray.push({
            stock_symbol: item1.stock_symbol,
            stock_name: item1.stock_name,
            total_bid_count: item1.total_bid_count + item2.total_bid_count,
            total_amount: +item1.total_amount + +item2.total_amount,
          });
        }
      });
    });
    stockMerge1 = [...newAray, ...stockMerge];
    stockMerge1 = stockMerge1.slice(0, 5).sort((a, b) => {
      return b.total_amount - a.total_amount;
    });
  }

  return (
    <div>
      <CRUDDataTable
        draw={draw}
        entity="Stock List"
        columns={columns}
        sortOrder="id"
        rowKey="id"
        isButtonShown={false}
        data={stockMerge1}
        dbcustomstyle="dbcustomstyle"
        customComponentDisplay={true}
        sizeChanger={false}
      />
    </div>
  );
};

export default StockList;
