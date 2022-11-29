import { useTypedSelector } from "../../../../hooks/useTypeSelector";

const TotalEarnedPoints = ({ record, bidDate }: any) => {
  const { groupResultLiveData } = useTypedSelector(
    (state) => state.LiveStocksData
  );
  const { marketStatus, marketPrevOpenDate } = useTypedSelector(
    (state) => state.marketDates
  );
  let totalPoint = 0;
  let points;

  if (marketStatus == "open" && bidDate == marketPrevOpenDate) {
    record.bid_stock.map((stock: any, index: any) => {
      const findStock = groupResultLiveData[stock?.stock_symbol];
      if (stock.stock_status === 2) {
        if (stock.is_star_performar) {
          points = findStock?.change_percentage * -2;
        } else {
          points = findStock?.change_percentage * -1;
        }
      } else {
        if (stock.is_star_performar) {
          points = findStock?.change_percentage * 2;
        } else {
          points = findStock?.change_percentage;
        }
      }
      totalPoint += points;
      return <strong key={index}> {totalPoint} </strong>;
    });
    totalPoint = (totalPoint * record.group_amount) / record.bid_stock.length;

    return (
      <strong>
        {totalPoint < 0 ? (
          totalPoint.toFixed(2)
        ) : (
          <> +{totalPoint.toFixed(2)} </>
        )}
      </strong>
    );
    // return <> {(totalPoint).toFixed(2)}</>;
  } else {
    if (record.points) {
      if (record.points < 0) {
        return <strong> {record.points} </strong>;
      } else {
        return <strong> +{record.points} </strong>;
      }
    } else {
      return <strong> N/A</strong>;
    }
  }
};

export default TotalEarnedPoints;
