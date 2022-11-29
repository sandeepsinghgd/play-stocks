import { useTypedSelector } from "../../../../hooks/useTypeSelector";

const TotalEarnedPoints = ({ record, bidDate }: any) => {
  const { threeCardBiddersLiveData } = useTypedSelector(
    (state) => state.LiveStocksData
  );

  const { marketStatus, marketPrevOpenDate } = useTypedSelector(
    (state) => state.marketDates
  );

  if (marketStatus == "open" && bidDate == marketPrevOpenDate) {
    let finalPointCalc = 0;
    record?.bid_stock.forEach((stock: any) => {
      const findStock = threeCardBiddersLiveData[stock?.stock_symbol];
      if (stock.stock_status == 1) {
        const pointsCalc =
          parseFloat(stock?.bid_amount) *
          parseFloat(findStock?.change_percentage);
        const points = parseFloat(pointsCalc.toFixed(2));
        finalPointCalc = finalPointCalc + +points;
      } else if (stock.stock_status == 2) {
        const pointsCalc =
          -parseFloat(stock?.bid_amount) *
          parseFloat(findStock?.change_percentage);
        const points = parseFloat(pointsCalc.toFixed(2));
        finalPointCalc = finalPointCalc + points;
      }
    });
    return (
      <strong>
        {finalPointCalc < 0 ? (
          finalPointCalc.toFixed(2)
        ) : (
          <> +{finalPointCalc.toFixed(2)}</>
        )}{" "}
      </strong>
    );
  } else {
    return (
      <>
        {record?.points >= 0.0 && record?.points != null ? (
          <strong>
            <span>+{record?.points}</span>
          </strong>
        ) : record?.points < 0.0 && record?.points != null ? (
          <strong>
            <span>{record?.points}</span>
          </strong>
        ) : (
          <strong>N/A</strong>
        )}
      </>
    );
  }
};

export default TotalEarnedPoints;
