  import { useTypedSelector } from "../../../hooks/useTypeSelector";

const ChangePercentage = (props: any) => {
  const { record, bidDate } = props;
  const { groupResultLiveData } = useTypedSelector(
    (state) => state.LiveStocksData
    );
 
  
  const symbol: string = record?.stock_symbol;
  const findStock = groupResultLiveData[symbol];
  const { marketStatus, marketPrevOpenDate } = useTypedSelector(
    (state) => state.marketDates
  );
  if (marketStatus == "open" && bidDate == marketPrevOpenDate) {
    if (
      record?.bid_stock_price != null &&
      findStock?.last_price != null
    ) {
      const changeInRupee =
        findStock?.last_price - record?.bid_stock_price;
      return (
        <div>
          {findStock?.change_percentage >= 0.0 ? (
            <strong>
              <span style={{ color: "green" }}>
                {changeInRupee > 0.0
                  ? `+${changeInRupee.toFixed(2)}`
                  : changeInRupee.toFixed(2)}
                ({`+${findStock?.change_percentage.toFixed(2)}%`}){" "}
              </span>
            </strong>
          ) : (
            <strong>
              <span style={{ color: "red" }}>
                {changeInRupee >= 0.0
                  ? `+${changeInRupee.toFixed(2)}`
                  : changeInRupee.toFixed(2)}
                ({findStock?.change_percentage.toFixed(2)}%){" "}
              </span>
            </strong>
          )}
        </div>
      );
    } else if (findStock?.change_percentage != null) {
      return (
        <>
          {findStock?.change_percentage >= 0.0 ? (
            <strong>
              <span style={{ color: "green" }}>
                ({`+${findStock?.change_percentage.toFixed(2)}%`}){" "}
              </span>
            </strong>
          ) : (
            <strong>
              <span style={{ color: "red" }}>
                ({findStock?.change_percentage.toFixed(2)}%){" "}
              </span>
            </strong>
          )}
        </>
      );
    } else {
      return <>N/A</>;
    }
  } 
  else {
    if (
      record?.bid_stock_price != null &&
      record?.bid_stock_close_price != null
    ) {
      const changeInRupee =
        record?.bid_stock_close_price - record?.bid_stock_price;
      return (
        <div>
          {record?.change_percentage >= 0.0 ? (
            <strong>
              <span style={{ color: "green" }}>
                {changeInRupee > 0.0
                  ? `+${changeInRupee.toFixed(2)}`
                  : changeInRupee.toFixed(2)}
                ({`+${record?.change_percentage}%`}){" "}
              </span>
            </strong>
          ) : (
            <strong>
              <span style={{ color: "red" }}>
                {changeInRupee >= 0.0
                  ? `+${changeInRupee.toFixed(2)}`
                  : changeInRupee.toFixed(2)}
                ({record?.change_percentage}%){" "}
              </span>
            </strong>
          )}
        </div>
      );
    } else if (record?.change_percentage != null) {
      return (
        <>
          {record?.change_percentage >= 0.0 ? (
            <strong>
              <span style={{ color: "green" }}>
                ({`+${record?.change_percentage}%`}){" "}
              </span>
            </strong>
          ) : (
            <strong>
              <span style={{ color: "red" }}>
                ({record?.change_percentage}%){" "}
              </span>
            </strong>
          )}
        </>
      );
    } else {
      return <>N/A</>;
    }
  }
};
export default ChangePercentage;
