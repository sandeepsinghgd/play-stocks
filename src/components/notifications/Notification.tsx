import { useState, useEffect } from "react";
import { List, Skeleton, Divider } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { GoPrimitiveDot } from "react-icons/go";
import { getNotifications } from "../../api/notification";
import "./_notification.scss";
import { BsFillInboxFill } from "react-icons/bs";
import "../../styles/_notification.scss";
const Notification = ({ handleClick, notificationCount }: any) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const response = await getNotifications();
    const notification = response.data.result;
    setData([notification]);
    setLoading(false);
  };
  useEffect(() => {
    loadMoreData();
  }, []);

  function onHandleClick (){
    loadMoreData();
    handleClick();
  }

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
      }}
    >
      <InfiniteScroll
        className="infiniteScrollDiv"
        dataLength={data.length}
        next={loadMoreData}
        hasMore={false}
        loader={
          data[0]?.length > 0 ? (
            <Skeleton avatar paragraph={{ rows: 1 }} active />
          ) : (
            <div className="noDataBlock">
              <BsFillInboxFill style={{ fontSize: "60px" }} />
              <p>No Data</p>
            </div>
          )
        }
        endMessage={<Divider plain>It is all, nothing more</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <span className="markReadButtonStyle">{notificationCount !== 0 ? (
                    <button
                      className="btn btn-small"
                      style={{ backgroundColor: "#0A3453", color: "white",padding: "5px",fontSize: "14px" }}
                      onClick={handleClick}
                    >
                      Mark as all read
                    </button>
                  ) : (
                    <button
                      className="btn btn-small"
                      disabled
                      style={{ backgroundColor: "#0A3453", color: "white", padding: "5px",fontSize: "14px" }}
                      onClick={onHandleClick}
                    >
                      Mark all as read
                    </button>
                  )}</span>
        <List
          dataSource={data}
          renderItem={(data: any) => {
            return Object.entries(data).map(([key, value]: any, index: any) => (
              <div key={index}>
                <div className="d-flex justify-content-between">
                  <span className="dateTitle">{key}</span>
                </div>
                {value.map((val: any, index:any) => (
                  <List.Item key={data.id} className="list-item">
                    <List.Item.Meta
                      title={val.title}
                      description={val.description}
                    />
                    {/* <List.Item.Meta
                      title={val.created_at}
                      description={<><GoPrimitiveDot
                        style={{
                          color: notificationCount !== 0 ? "red" : "green", textAlign:"right"
                        }}
                      /></>}
                    /> */}
                    <div className="event-date">{val.created_at.substring(11,19)}</div>
                    <div className="notification-dot">
                      <GoPrimitiveDot
                        style={{
                          color: ( val.is_read != 1 ) ? "red" : "green",
                        }}
                      />
                    </div>
                  </List.Item>
                ))}
              </div>
            ));
          }}
        />
      </InfiniteScroll>
    </div>
  );
};

export default Notification;
