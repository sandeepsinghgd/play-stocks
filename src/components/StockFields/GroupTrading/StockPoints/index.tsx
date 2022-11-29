import { useTypedSelector } from "../../../../hooks/useTypeSelector";

const StockPoints = ({ record, bidDate }: any) => {
  const { groupResultLiveData } = useTypedSelector(
    (state) => state.LiveStocksData
  );
  
  const symbol: string = record?.stock_symbol;
  const findStock = groupResultLiveData[symbol];
  const { marketStatus, marketPrevOpenDate } = useTypedSelector(
    (state) => state.marketDates
    );

    if (marketStatus == "open" && bidDate == marketPrevOpenDate) {
        const points = parseFloat(findStock.change_percentage);
        if (record?.stock_status === 2) {
          if (points < 0.0) {
            return (
              <strong>
                <span style={{ color: "green" }}>
                  +{record.is_star_performar ? (Math.abs(points) * (2)).toFixed(2) : (Math.abs(points)).toFixed(2)}
                </span>
              </strong>
            );
          } else {
            return (
              <strong>
                <span style={{ color: "red" }}>
                  
                  -{record.is_star_performar
                    ? (points * 2).toFixed(2)
                    : (points).toFixed(2)}
                </span>
              </strong>
            );
          }
        } else {
          if (points < 0.0) {
            return (
              <strong>
                <span style={{ color: "red" }}>
                  {record.is_star_performar ? (points * 2).toFixed(2) : (points).toFixed(2)}
                </span>
              </strong>
            );
          } else {
            return (
              <strong>
                <span style={{ color: "green" }}>
                  +
                  {record.is_star_performar
                    ? (points * 2).toFixed(2)
                    :(points).toFixed(2)}
                </span>
              </strong>
            );
          }
        }
  } else {
   const points = parseFloat(record.change_percentage);
        if (record?.stock_status === 2) {
          if (points < 0.0) {
            return (
              <strong>
                <span style={{ color: "green" }}>
                  +{record.is_star_performar ? Math.abs(points * 2).toFixed(2) : Math.abs(points).toFixed(2)}
                </span>
              </strong>
            );
          } else {
            return (
              <strong>
                <span style={{ color: "red" }}>
                  -{record.is_star_performar
                    ? (points * 2).toFixed(2)
                    : (points).toFixed(2)}
                </span>
              </strong>
            );
          }
        } else {
          if (points < 0.0) {
            return (
              <strong>
                <span style={{ color: "red" }}>
                  {record.is_star_performar ? (points * 2).toFixed(2) : (points).toFixed(2)}
                </span>
              </strong>
            );
          } else {
            return (
              <strong>
                <span style={{ color: "green" }}>
                  +
                  {record.is_star_performar
                    ? (points * 2).toFixed(2)
                    : (points).toFixed(2)}
                </span>
              </strong>
            );
          }
        }
  }
};

export default StockPoints;
