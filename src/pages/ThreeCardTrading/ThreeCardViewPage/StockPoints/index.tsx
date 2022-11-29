import { useTypedSelector } from "../../../../hooks/useTypeSelector";

const StockPoints = ({ record, bidDate }: any) => {
  const { threeCardBiddersLiveData } = useTypedSelector(
    (state) => state.LiveStocksData
  );
  const symbol: string = record?.stock_symbol;
  const findStock = threeCardBiddersLiveData[symbol];
  const { marketStatus, marketPrevOpenDate } = useTypedSelector(
    (state) => state.marketDates
  );
  if (marketStatus == "open" && bidDate == marketPrevOpenDate) {
    if (record.stock_status == 1) {
      const pointsCalc =
        parseFloat(record?.bid_amount) *
        findStock?.change_percentage.toFixed(2);
      const points = parseFloat(pointsCalc.toFixed(2));
      return (
        <>
          {points >= 0.0 ? (
            <strong>
              <span style={{ color: "green" }}>+{points}</span>
            </strong>
          ) : points < 0.0 ? (
            <strong>
              <span style={{ color: "red" }}>{points}</span>
            </strong>
          ) : (
            "N/A"
          )}
        </>
      );
    } else if (record.stock_status == 2) {
      const pointsCalc =
        -parseFloat(record?.bid_amount) *
        findStock?.change_percentage.toFixed(2);
      const points = parseFloat(pointsCalc.toFixed(2));
      return (
        <>
          {points >= 0.0 ? (
            <strong>
              <span style={{ color: "green" }}>+{points}</span>
            </strong>
          ) : points < 0.0 ? (
            <strong>
              <span style={{ color: "red" }}>{points}</span>
            </strong>
          ) : (
            "N/A"
          )}
        </>
      );
    } else {
      return <>N/A</>;
    }
  } else {
    return (
      <>
        {record?.points >= 0.0 && record?.points != null ? (
          <strong>
            <span style={{ color: "green" }}>+{record?.points}</span>
          </strong>
        ) : record?.points < 0.0 && record?.points != null ? (
          <strong>
            <span style={{ color: "red" }}>{record?.points}</span>
          </strong>
        ) : (
          "N/A"
        )}
      </>
    );
  }
};

export default StockPoints;
