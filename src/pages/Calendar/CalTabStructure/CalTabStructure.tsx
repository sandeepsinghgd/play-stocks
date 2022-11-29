import { FC, useEffect, useState } from "react";
import { Row, Col, Calendar, Card, Tooltip } from "antd";
import "../../../styles/_calendar.scss";
import CalendarModal from "../../../components/Modals/CalendarModal";
import { useTypedSelector } from "../../../hooks/useTypeSelector";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import { getEvents } from "../../../api/calendar";
import { setEvents } from "../../../redux/actions/eventData";
import { useDispatch } from "react-redux";
import { FcPlus } from "react-icons/fc";
import { HiOutlinePlusCircle } from "react-icons/hi";
// const { confirm } = Modal;
const CalTabStructure: FC = () => {
  const [cellModalVisible, setCellModalVisible] = useState(false);
  const eventData = useTypedSelector<any>((state) => state.eventData);
  const [defaultDate, setDefaultDate] = useState<any>(
    moment().format("YYYY-MM-DD")
  );
  const [isEdit, setIsEdit] = useState(false);
  const [clickEditIcon, setClickEditIcon] = useState(false);
  const [editId, setEditId] = useState(null);
  const [checkAddBtn, setCheckAddBtn] = useState(false);
  const [selectMonth, setSelectMonth] = useState<any>();
  const [selectYear, setSelectYear] = useState<any>();
  const [filteredEvents, setFilteredEvents] = useState<any>();
  const [eventNamesObj, setEventNamesObj] = useState<any>({});
  const [eventIdsObj, setEventIdsObj] = useState<any>({});
  const [eventDates, setEventDates] = useState<any>([]);
  // const [eventStartTime, setEventStartTime] = useState<any>({});
  // const [eventEndTime, setEventEndTime] = useState<any>({});
  const [eventDeleteId, setEventDeleteId] = useState<any>(null);
  const [isHalfDay, setIsHalfDay] = useState<any>(null); // eslint-disable-line
  const dispatch = useDispatch();
  const matches = window.matchMedia("(max-width: 520px)").matches;
  const { currentUserPermissions } = useTypedSelector((state) => state.user);
  const disableBtn: any = false;
  const params = {
    month: selectMonth,
    year: selectYear,
  };
  useEffect(() => {
    const defaultDateMonth = moment().format("YYYY-MM-DD").split("-")[1];
    const defaultDateYear = moment().format("YYYY-MM-DD").split("-")[0];
    setSelectMonth(defaultDateMonth);
    setSelectYear(defaultDateYear);
  }, []);

  useEffect(() => {
    if (eventData) {
      const eventNames: any = {};
      const eventIds: any = {};
      const eventStartTime: any = {};
      const eventEndTime: any = {};
      const isHalfDay: any = {};
      const eventDateArray = eventData.allEvents.map((item1: any) => {
        eventNames[item1.event_date] = item1.event_name;
        eventIds[item1.event_date] = item1.id;
        eventStartTime[item1.event_date] = item1.opening_time;
        eventEndTime[item1.event_date] = item1.closing_time;
        isHalfDay[item1.event_date] = item1.is_half_day;
        return item1.event_date;
      });
      setEventNamesObj(eventNames);
      setEventIdsObj(eventIds);
      setEventDates(eventDateArray);
      // setEventStartTime(eventStartTime);
      // setEventEndTime(eventEndTime);
      setIsHalfDay(isHalfDay);
    }
  }, [eventData]);

  useEffect(() => {
    if (selectMonth || selectYear != undefined) {
      fetchAllEvents(params);
    }
  }, [selectMonth, selectYear]);

  const onSelectDate = (e: any) => {
    setDefaultDate(e);
    const month = moment(e).format("YYYY-MM-DD").split("-")[1];
    const year = moment(e).format("YYYY-MM-DD").split("-")[0];
    setSelectMonth(month);
    setSelectYear(year);
  };

  const setModalSetBtn = () => {
    setCellModalVisible(true);
    setCheckAddBtn(true);
    setFilteredEvents("");
    // setEdit(true)
  };

  const fetchAllEvents = async (params: any) => {
    const res = await getEvents(params);
    dispatch(setEvents(res?.data?.result));
  };

  // const deleteEvent = async (id: any) => {
  //   try {
  //     const response = await deleteEvents(id);
  //     if (response.data.success) {
  //       message.success(response.data.message);
  //       fetchAllEvents(params);
  //     }
  //   } catch (err: any) {
  //     message.error(err);
  //   }
  // };

  function dateCellRender(value: any) {
    const result = moment(value)
      .format("DD-MM-YYYY")
      .split("-")
      .reverse()
      .join("-");

    const dates = value.format("YYYY-MM-DD");
    const current = moment().format("YYYY-MM-DD");

    const duration = moment(dates, "YYYY-MM-DD").diff(
      moment(current, "YYYY-MM-DD")
    );
    const content = (
      <div>
        {matches ? (
          <>
            {currentUserPermissions.includes("events_update") && (
              <MdModeEdit
                onClick={() => {
                  setIsEdit(true);
                  setEditId(eventIdsObj[result]);
                  setCellModalVisible(true);
                  setClickEditIcon(true);

                  const filterData = eventData.allEvents.filter(
                    (e: any) => e.id === eventIdsObj[result]
                  );

                  setFilteredEvents(filterData[0]);
                }}
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  position: "absolute",
                  bottom: "10%",
                  right: "20px",
                  color: "#0A3453",
                }}
              />
            )}
            {/* {currentUserPermissions.includes("events_delete") && (
              <AiFillDelete
                onClick={() => {
                  setEventDeleteId(eventIdsObj[result]);
                  confirm({
                    title: "Are you sure, you want to Remove Market Day Off?",
                    onOk: () => {
                      deleteEvent(eventIdsObj[result]);
                    },
                    onCancel: () => {
                      setEventDeleteId("");
                    },
                  });
                }}
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  position: "absolute",
                  bottom: "10%",
                  right: "45px",
                  color: "red",
                }}
              />
            )} */}
          </>
        ) : (
          ""
        )}
        <p>
          <strong>{eventNamesObj[result]}</strong>
        </p>

        {/* {eventStartTime[result] !== null ? (
          <p>From : {eventStartTime[result]}</p>
        ) : (
          ""
        )}
        {eventEndTime[result] !== null ? (
          <p>To : {eventEndTime[result]}</p>
        ) : (
          ""
        )} */}
      </div>
    );

    // const lastDate = moment().clone().startOf("month").format("YYYY-MM-DD");
    // const firstDate = moment().clone().endOf("month").format("YYYY-MM-DD");

    return (
      <>
        {eventDates.includes(result) ? (
          <div className="holiday-div">
            <Tooltip title={editId || eventDeleteId ? "" : content}>
              <p>
                {!matches
                  ? eventNamesObj[result]?.length > 12
                    ? `${eventNamesObj[result]?.slice(0, 13)}...`
                    : eventNamesObj[result]
                  : eventNamesObj[result]?.length > 3
                  ? `${eventNamesObj[result]?.slice(0, 4)}...`
                  : eventNamesObj[result]}
              </p>
            </Tooltip>
            {!matches && duration > 0 && (
              <>
                {currentUserPermissions.includes("events_update") && (
                  <MdModeEdit
                    className="addEventIcon"
                    onClick={() => {
                      setIsEdit(true);
                      setEditId(eventIdsObj[result]);
                      setCellModalVisible(true);
                      setClickEditIcon(true);
                      setCheckAddBtn(true);

                      const filterData = eventData.allEvents.filter(
                        (e: any) => e.id === eventIdsObj[result]
                      );
                      setFilteredEvents(filterData[0]);
                    }}
                    style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                      position: "absolute",
                      bottom: "0",
                      right: eventIdsObj == false ? "15%" : "0",
                      color: "#0A3453",
                    }}
                  />
                )}
                {/* {currentUserPermissions.includes("events_delete") && (
                  <AiFillDelete
                    onClick={() => {
                      setEventDeleteId(eventIdsObj[result]);

                      confirm({
                        title:
                          "Are you sure, you want to Remove Market Day Off?",
                        onOk: () => {
                          deleteEvent(eventIdsObj[result]);
                        },
                        onCancel: () => {},
                      });
                    }}
                    style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                      position: "absolute",
                      bottom: "0",
                      right: eventIdsObj == false ? "30%" : "15%",
                      color: "red",
                    }}
                  />
                )} */}
              </>
            )}

            {/* {eventStartTime[result] !== null && eventEndTime[result] !== null && (
              <Tooltip title="Timings" color={"#0A3453"}>
                <BiTime
                  style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    position: "absolute",
                    bottom: "0",
                    right: eventIdsObj == false ? "45%" : "15%",
                    color: "red",
                  }}
                />
              </Tooltip>
            )} */}

            {!eventIdsObj && (
              <FcPlus
                onClick={() => setCellModalVisible(true)}
                style={{
                  fontSize: "13px",
                  fontWeight: 900,
                  color: "green",
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                }}
              />
            )}
          </div>
        ) : (
          currentUserPermissions.includes("events_create") &&
          duration > 0 && (
            <div className="addEventIcon">
              {!disableBtn && (
                <HiOutlinePlusCircle
                  onClick={() => {
                    setCellModalVisible(true);
                    setCheckAddBtn(true);
                    setClickEditIcon(true);
                    setModalSetBtn();
                  }}
                  style={{
                    fontSize: "13px",
                    fontWeight: 900,
                    color: "#0A3453",
                    position: "absolute",
                    bottom: "0",
                    right: "0px",
                  }}
                />
              )}
            </div>
          )
        )}
      </>
    );
  }

  return (
    <>
      <Row>
        {currentUserPermissions.includes("events_create") && (
          <button
            className="btn btn-sm mb-3"
            style={{ backgroundColor: "#0A3453", color: "white" }}
            onClick={setModalSetBtn}
          >
            Add Market Day Off
          </button>
        )}
      </Row>
      <Row gutter={16} className="calender-set">
        <Col xs={24} sm={24} md={18} className="columnone">
          <Calendar
            dateCellRender={dateCellRender}
            onSelect={onSelectDate}
            // disabledDate={(current) => current.isBefore(moment().add(0, "day"))}
          />
        </Col>
        <Col xs={24} sm={24} md={6} className="event">
          <div>
            <Card
              title="Upcoming Market Days Off"
              bordered={false}
              className="cal-card"
            >
              {eventData.allEvents.map((item: any) => {
                return (
                  <p className="fw-bold" key={item.id}>
                    {item.event_name}: <span>{item.event_date}</span>
                  </p>
                );
              })}
            </Card>
          </div>
        </Col>
      </Row>
      <CalendarModal
        cellModalVisible={cellModalVisible}
        setCellModalVisible={setCellModalVisible}
        fetchAllEvents={fetchAllEvents}
        defaultDate={defaultDate}
        setDefaultDate={setDefaultDate}
        title={isEdit ? "Edit Market Day Off" : "Add Market Day Off"}
        setCheckAddBtn={setCheckAddBtn}
        checkAddBtn={checkAddBtn}
        clickEditIcon={clickEditIcon}
        setClickEditIcon={setClickEditIcon}
        editId={editId}
        setEditId={setEditId}
        filteredEvents={filteredEvents}
        setFilteredEvents={setFilteredEvents}
        setEventDeleteId={setEventDeleteId}
      />
    </>
  );
};

export default CalTabStructure;
