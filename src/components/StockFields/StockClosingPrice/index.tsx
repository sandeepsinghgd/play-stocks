import { useTypedSelector } from "../../../hooks/useTypeSelector";

const StockClosingPrice = (props: any) => {
  const { item, symbol, bidDate } = props;
  const { groupResultLiveData } = useTypedSelector(
    (state) => state.LiveStocksData
  );
  const { marketStatus, marketPrevOpenDate } = useTypedSelector(
    (state) => state.marketDates
  );
  const findStock = groupResultLiveData[symbol];
  if (marketStatus == "open" && bidDate == marketPrevOpenDate) {
    return (
      <div>
        {item != findStock.last_price ? (
          <>{findStock.last_price}</>
        ) : (
          <>{item}</>
        )}
      </div>
    );
  } else {
    if (item != null) {
      return <span>{item}</span>;
    } else {
      return <span>N/A</span>;
    }
  }
};

export default StockClosingPrice;
