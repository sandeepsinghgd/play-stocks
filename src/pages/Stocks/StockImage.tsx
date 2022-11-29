import React, { useRef } from "react";
import "../../styles/stockImage.scss";
const StockImage = (props: any) => {
  const imageRef: any = useRef();
  const { logo } = props;
  return (
    <div className="stockImage">
      <img
        ref={imageRef}
        src={"https://stock-api.playstocks.in/" + logo}
        onError={() => {
          imageRef.current.src =
            "https://stock-api.playstocks.in/images/stock/placeholder.svg";
        }}
        alt="image"
        className="images"
        height={20}
        width={20}
      />
    </div>
  );
};
export default StockImage;
