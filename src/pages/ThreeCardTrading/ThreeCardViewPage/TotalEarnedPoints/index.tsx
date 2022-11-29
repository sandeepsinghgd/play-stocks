import React from "react";
import { useTypedSelector } from "../../../../hooks/useTypeSelector";

const TotalEarnedPoints =({record, date}:any)=>{
    const { threeCardBiddersLiveData } = useTypedSelector(
    (state) => state.LiveStocksData
  );
    const symbol: string = record?.stock_symbol;
  const findStock = threeCardBiddersLiveData[symbol];
  // const { marketStatus, marketPrevOpenDate } = useTypedSelector(
  //   (state) => state.marketDates)

    record?.bid_stock.forEach((stock: any) => {
          if (stock.stock_status == 1) {
            let finalPointCalc = 0;
            const pointsCalc =
              parseFloat(stock?.bid_amount) * findStock?.change_percentage.toFixed(2);
            const points = parseFloat(pointsCalc.toFixed(2));
            finalPointCalc = finalPointCalc + +points;
      
            return (
              <>
                {finalPointCalc >= 0.0 ? (
                  <strong>
                    <span style={{ color: "green" }}>+{finalPointCalc}</span>
                  </strong>
                ) : finalPointCalc < 0.0 ? (
                  <strong>
                    <span style={{ color: "red" }}>{finalPointCalc}</span>
                  </strong>
                ) : (
                  "N/A"
                )}
              </>
            );
          } else if (stock.stock_status == 2) {
            let finalPointCalc = 0;
            record?.bid_stock.forEach((stock: any) => {
            const pointsCalc =
              -parseFloat(record?.bid_amount) *
              findStock?.change_percentage.toFixed(2);
            const points = parseFloat(pointsCalc.toFixed(2));
            finalPointCalc = finalPointCalc + +points;
          })
            return (
              <>
                {finalPointCalc >= 0.0 ? (
                  <strong>
                    <span style={{ color: "green" }}>+{finalPointCalc}</span>
                  </strong>
                ) : finalPointCalc < 0.0 ? (
                  <strong>
                    <span style={{ color: "red" }}>{finalPointCalc}</span>
                  </strong>
                ) : (
                  "N/A"
                )}
              </>
            );
          } else {
            return <>N/A</>;
          }
      })

  return(
    <>Hello</>
  )
}

export default TotalEarnedPoints;


// import { useTypedSelector } from "../../../../hooks/useTypeSelector";

// const TotalEarnedPoints = ({ record, bidDate }: any) => {
//   const { threeCardBiddersLiveData } = useTypedSelector(
//     (state) => state.LiveStocksData
//   );
//   const symbol: string = record?.stock_symbol;
//   const findStock = threeCardBiddersLiveData[symbol];
//   // const { marketStatus, marketPrevOpenDate } = useTypedSelector(
//   //   (state) => state.marketDates)

//     record?.bid_stock.forEach((stock: any) => {
//     if (stock.stock_status == 1) {
//       let finalPointCalc = 0;
//       const pointsCalc =
//         parseFloat(stock?.bid_amount) * findStock?.change_percentage.toFixed(2);
//       const points = parseFloat(pointsCalc.toFixed(2));
//       finalPointCalc = finalPointCalc + +points;

//       return (
//         <>
//           {finalPointCalc >= 0.0 ? (
//             <strong>
//               <span style={{ color: "green" }}>+{finalPointCalc}</span>
//             </strong>
//           ) : finalPointCalc < 0.0 ? (
//             <strong>
//               <span style={{ color: "red" }}>{finalPointCalc}</span>
//             </strong>
//           ) : (
//             "N/A"
//           )}
//         </>
//       );
//     } else if (stock.stock_status == 2) {
//       let finalPointCalc = 0;
//       record?.bid_stock.forEach((stock: any) => {
//       const pointsCalc =
//         -parseFloat(record?.bid_amount) *
//         findStock?.change_percentage.toFixed(2);
//       const points = parseFloat(pointsCalc.toFixed(2));
//       finalPointCalc = finalPointCalc + +points;
//     })
//       return (
//         <>
//           {finalPointCalc >= 0.0 ? (
//             <strong>
//               <span style={{ color: "green" }}>+{finalPointCalc}</span>
//             </strong>
//           ) : finalPointCalc < 0.0 ? (
//             <strong>
//               <span style={{ color: "red" }}>{finalPointCalc}</span>
//             </strong>
//           ) : (
//             "N/A"
//           )}
//         </>
//       );
//     } else {
//       return <>N/A</>;
//     }
// })
// };

// export default TotalEarnedPoints;
