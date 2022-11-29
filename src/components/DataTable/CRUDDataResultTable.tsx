import React, { FC, ReactNode, useEffect, useState } from "react";
import {
  Button,
  Card,
  Space,
  message,
  Table,
  Pagination,
  Tag,
  Spin,
} from "antd";
import titleize from "titleize";
import styled from "styled-components";
import { Col, Row } from "react-bootstrap";
import "../../styles/_dataTable.scss";
import "../../styles/_mainCardInDb.scss";
import { GoPlus } from "react-icons/go";
import DataTableFilter from "./DataTableFilter";
import "../../styles/_dbSearchAnimate.scss";
import { BiRupee } from "react-icons/bi";
import SelectComp from "../controls/SelectComp";
import { contestsListApi } from "../../api/totalPlayerReport";

const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const Action = styled(Space)`
  display: flex;
  @media (min-width: 500px) {
    display: flex;
  }
`;

// const MobileAction = styled.div`
// display: none;
// @media (max-width: 500px) {
// display: block;
// margin: 3px 0 20px 0;
// & button {
// width: 100%;
// display: block;
// margin: 5px;
// }
// }
// `

const AntdDataTable = ({
  rowKey,
  data,
  columns,
  expandable,
  pagination,
  setPagination,
  total,
  filtersState,
  handleChange,
  responsive,
  highlightRow,
  loading,
  summary,
  dbcustomstyle,
  customComponentDisplay,
  frequentUpdate,
  analysisCustomStyle,
  linkPath,
  isAddGroupTrade,
  groupQualifyStatus,
  groupStatus,
  setCreateNew,
  finalResult,
  finalResultColumn,
  firstDropDownMenus,
  secondDropDownMenus,
  thirdDropDownMenus,
  finalResultData,
  fourthDropDown,
  DropdownName,
  rowSelection,
}: {
  rowKey: any;
  data: any;
  setData: any;
  columns: any;
  expandable: any;
  setColumns: any;
  setSearch: any;
  pagination: any;
  setPagination: any;
  showSizeChanger?: any;
  total: any;
  filtersState: any;
  handleChange: any;
  responsive: any;
  highlightRow: any;
  draw: any;
  setDraw: any;
  search: any;
  sort: any;
  setSort: any;
  setTotal: any;
  fetchData: any;
  loading: any;
  summary: any;
  dbcustomstyle: any;
  customComponentDisplay: any;
  frequentUpdate: any;
  analysisCustomStyle: any;
  sizeChanger: any;
  linkPath?: any;
  isAddGroupTrade?: any;
  groupQualifyStatus?: any;
  groupStatus?: any;
  setCreateNew?: any;
  finalResult?: any;
  finalResultColumn?: any;
  firstDropDownMenus?: any;
  secondDropDownMenus?: any;
  thirdDropDownMenus?: any;
  finalResultData?: any;
  fourthDropDown?: any;
  DropdownName?: any;
  rowSelection?: any;
}) => {
  // const filters = filtersState ?? {};
  // const hasValidFilter = filters
  // ? Object.values(filters).filter((v: any) => v.value && v.label).length > 0
  // : false;
  const rowClassName = (rec: any, i: any) => {
    if (highlightRow)
      return highlightRow(rec, i)
        ? "Crud-DataTable-Row-Highlight"
        : "Crud-DataTable-Row";
    return "";
  };

  return (
    <>
      {responsive ? (
        <>
          {dbcustomstyle == undefined ? (
            <div className="d-none d-md-block adminDataTable">
              {/* {hasValidFilter && filters && Object.keys(filters).length > 0 ? (
             <>
               <strong>Filters: &nbsp;</strong>
               {Object.keys(filters).map((p, i) => {
                 let newValTemp = "";
                 if (p && filters[p].label && filters[p].value) {
                   let newVal = filters[p].value;
                   if (filters[p].displayFormat) {
                     newVal = filters[p].displayFormat(filters[p].value);
                   }
                   if (
                     newVal &&
                     typeof newVal === "object" &&
                     Array.isArray(newVal)
                   ) {
                     newVal.forEach((item, index) => {
                       if (moment.isMoment(item)) {
                         newValTemp =
                           newValTemp +
                           item.format("DD-MM-yyyy") +
                           (index < newVal.length - 1 ? " to " : "");
                       }
                     });
                     newVal = newValTemp;
                   }
                   return (
                     <Tag
                       key={i}
                       closable
                       color="default"
                       onClose={(e) => {
                         const newFilter = { ...filters };
                         filters[p].value = null;
                         setFilters(newFilter);
                       }}
                     >
                       {`${filters[p].label}: ${newVal}`}
                     </Tag>
                   );
                 } else return null;
               })}
               <br />
               <br />
             </>
           ) : null} */}

              <Table
                loading={loading}
                rowClassName={rowClassName}
                dataSource={data}
                columns={columns}
                onChange={handleChange}
                expandable={expandable}
                summary={summary}
                size="small"
                pagination={{
                  ...pagination,
                  total,
                }}
                rowKey={rowKey}
                scroll={{
                  x: true,
                }}
              />
            </div>
          ) : (
            <div className="d-none d-md-block adminDataTable">
              <Table
                loading={loading}
                rowClassName={rowClassName}
                dataSource={data}
                columns={columns}
                onChange={handleChange}
                expandable={expandable}
                summary={summary}
                size="small"
                pagination={{
                  ...pagination,
                  total,
                }}
                rowKey={rowKey}
                scroll={{
                  x: true,
                }}
              />
            </div>
          )}

          <div className="d-block d-md-none">
            {/* <div className="d-flex justify-content-center align-items-center mb-4">
              <Search
                placeholder="Search"
                onChange={(e) => setSearch(e.currentTarget.value)}
                onSearch={(value, event) => setSearch(value)}
              />
            </div> */}
            <Spin spinning={loading}>
              {data?.map((d: any, i: number) => (
                <Card
                  key={i}
                  bodyStyle={{ padding: 0 }}
                  className={`mb-4 ${rowClassName(d, data.indexOf(d))}`}
                >
                  {columns.map((column: any, index: number) => (
                    <Row className="p-2" key={index}>
                      <Col
                        xs={{ span: 6 }}
                        sm={{ span: 6 }}
                        md={{ span: 12 }}
                        className="card-title"
                      >
                        {column.title}
                      </Col>
                      <Col xs={{ span: 6 }} sm={{ span: 6 }} md={{ span: 12 }}>
                        {column.render
                          ? column.render(d[column.dataIndex], d, 0)
                          : d[column.dataIndex]}
                      </Col>
                    </Row>
                  ))}
                </Card>
              ))}
            </Spin>
            <Pagination
              total={total}
              showSizeChanger
              // onShowSizeChange={onShowSizeChange}
              onChange={(current) => {
                setPagination({
                  ...pagination,
                  current,
                });
              }}
            />
          </div>
        </>
      ) : (
        <>
          <Table
            loading={loading}
            rowClassName={rowClassName}
            dataSource={data}
            columns={columns}
            onChange={handleChange}
            expandable={expandable}
            summary={summary}
            pagination={{
              ...pagination,
              total,
            }}
            size="small"
            rowKey={rowKey}
            scroll={{
              x: true,
            }}
          />
        </>
      )}
    </>
  );
};

export interface DataTableProps {
  button?: any;
  buttonPreventDefault?: any;
  customFilters?: any;
  columns?: any;
  createModal?: any;
  continuousFetchInterval?: number;
  direction?: any;
  data?: any;
  draw: number;
  entity?: any;
  fetchDataFunction?: any;
  isActionPerform?: any;
  isButtonShown?: undefined | boolean;
  onShowSizeChange?: any;
  pageSize?: number;
  sortOrder?: any;
  title?: string;
  isCreateModalVisible?: boolean;
  setCreateModalVisibility?: any;
  actions?: any;
  tabs?: any;
  containerClass?: any;
  rowKey?: any;
  highlightRow?: any;
  children?: ReactNode;
  recordsTotal?: any;
  fetchFunctionTimeOut?: number | undefined;
  recordsTotalTimeOut?: number | undefined;
  expandable?: any;
  centerData?: any;
  dbcustomstyle?: any;
  summary?: any;
  frequentUpdate?: boolean;
  customComponentDisplay?: boolean;
  analysisCustomStyle?: boolean;
  sizeChanger?: any;
  linkPath?: any;
  isAddGroupTrade?: undefined | boolean;
  groupQualifyStatus?: any;
  groupStatus?: any;
  setCreateNew?: any;
  finalResult?: any;
  finalResultColumn?: any;
  firstDropDownMenus?: any;
  secondDropDownMenus?: any;
  thirdDropDownMenus?: any;
  finalResultData?: any;
  fourthDropDown?: any;
  DropdownName?: any;
  isStatusDropdown?: boolean;
  isGameDropdown?: boolean;
  isContestDropdown?: boolean;
  isMovementDropdown?: boolean;
  rowSelection?: any;
  setParamsVal?: any;
  exportButtonClicked?: any;
  startDate?: any;
  endDate?: any;
  apiResponse?: any;
  setDraw?: any;
  setParamVal?: any;
  singleDateFilter?: any;
  singleDate?: any;
  // contestListApiFunction?: any;
}

const CRUDDataResultTable: FC<DataTableProps> = (props) => {
  const [data, setData] = useState([] as any);
  const [columns, setColumns] = useState(props.columns);
  const [draw, setDraw] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({
    order: props.sortOrder ? props.sortOrder : props.columns[0].dataIndex,
    direction: props.direction ? props.direction : "DESC",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: props.pageSize ?? 10,
    showSizeChanger: props.sizeChanger == false ? false : true, // eslint-disable-line
    onShowSizeChange,
  });
  const [total, setTotal] = useState<any>(0);
  const customFilters = props.customFilters;
  const { title, continuousFetchInterval, isActionPerform = false } = props;
  const [loading, setLoading] = useState(true);
  const [selectGame, setSelectGame] = useState<any>(0);
  const [selectContest, setSelectContest] = useState(0);
  const [userStatus, setUserStatus] = useState();
  const [movement, setMovement] = useState();
  const [paramsOptions, setParamsOptions] = useState<any>();
  const [contestOptions, setContestOptions] = useState<any>();

  useEffect(() => {
    const contestList = async () => {
      const resp: any = await contestsListApi(paramsOptions);
      const contestResult = resp?.data?.result.map((item: any) => {
        return {
          id: parseInt(item.amount),
          name: parseInt(item.amount),
        };
      });
      setContestOptions(contestResult);
      return resp;
    };

    contestList();
  }, [selectGame]);

  function onShowSizeChange(current: any, pageSize: any) {
    setPagination({
      ...pagination,
      pageSize,
      current,
    });
  }
  const [filters, setFilters] = useState(
    columns.reduce((filter: any, col: any, i: any) => {
      if (col.filter) {
        if (!col.filter.paramName)
          throw Error("Property 'paramName' of Object 'filter' is required");
        filter[col.filter.paramName] = {
          label: col.filter.label,
          value: col.filter.defaultValue,
        };
      }

      return filter;
    }, {})
  );
  const PollingFetch = ({
    fetchData,
    continuousFetchInterval,
  }: {
    fetchData: any;
    continuousFetchInterval: number;
  }) => {
    useEffect(() => {
      const fetch = setInterval(fetchData, continuousFetchInterval);
      return () => clearInterval(fetch);
    });
    return null;
  };

  useEffect(() => {
    if (movement || movement === null) {
      fetchData(
        filters,
        sort,
        pagination,
        props.startDate,
        props.endDate,
        selectGame,
        selectContest,
        userStatus,
        movement
      );
    }
  }, [movement]);

  useEffect(() => {
    if (userStatus) {
      fetchData(
        filters,
        sort,
        pagination,
        props.startDate,
        props.endDate,
        selectGame,
        selectContest,
        userStatus,
        movement
      );
    }
  }, [userStatus]);

  useEffect(() => {
    if (
      userStatus ||
      userStatus === null ||
      props.singleDate ||
      props.singleDate == ""
    ) {
      fetchData(
        filters,
        sort,
        pagination,
        props.startDate,
        props.endDate,
        selectGame,
        selectContest,
        userStatus,
        movement
      );
    }
  }, [userStatus, props.singleDate]);

  useEffect(() => {
    if (selectContest || selectContest === null) {
      fetchData(
        filters,
        sort,
        pagination,
        props.startDate,
        props.endDate,
        selectGame,
        selectContest,
        userStatus,
        movement
      );
    }
  }, [selectContest]);

  useEffect(() => {
    if (selectGame || selectGame === null) {
      fetchData(
        filters,
        sort,
        pagination,
        props.startDate,
        props.endDate,
        selectGame,
        selectContest,
        userStatus,
        movement
      );
      // props?.contestListApiFunction(selectGame);
    }
  }, [selectGame]);

  useEffect(() => {
    if (props.data && props.data.data) {
      setData(props.data.data);
      setTotal(props.data.total);
      setDraw(props.data.draw);
    } else {
      if (props.data && Array.isArray(props.data)) {
        setData(props.data);
      }
    }
  }, [props.data]);

  useEffect(() => {
    // setStartDate(props.startDate);
    // setEndDate(props.endDate);
    if (props.endDate || props.endDate) {
      fetchData(
        filters,
        sort,
        pagination,
        props.startDate,
        props.endDate,
        selectGame,
        selectContest,
        userStatus,
        movement
      );
    }
  }, [props.startDate, props.endDate]);

  useEffect(() => {
    if (props.draw > 0) {
      fetchData(
        filters,
        sort,
        pagination,
        props.startDate,
        props.endDate,
        selectGame,
        selectContest,
        userStatus,
        movement
      );
    }
  }, [props.draw]);

  useEffect(() => {
    setCurrentPage(pagination.current);
    if (filters && sort && pagination) {
      fetchData(
        filters,
        sort,
        pagination,
        props.startDate,
        props.endDate,
        selectGame,
        selectContest,
        userStatus,
        movement
      );
    }
    // eslint-disable-next-line
  }, [filters, sort, pagination]);

  useEffect(() => {
    if (isActionPerform) {
      fetchData(
        filters,
        sort,
        pagination,
        props.startDate,
        props.endDate,
        selectGame,
        selectContest,
        userStatus,
        movement
      );
    }
  }, [isActionPerform]);

  const indexing = (item: any, index: any, currentPage: any, perPage: any) => {
    const indexof = (currentPage - 1) * perPage + index;
    const data = { ...item, index: indexof + 1 };

    return data;
  };

  const fetchData = async (
    filters: any,
    sort: any,
    pagination: any,
    startDate: any,
    endDate: any,
    selectGame: any,
    selectContest: any,
    userStatus: any,
    movement: any
  ) => {
    if (props?.frequentUpdate == true) {
      setLoading(false);
    } else {
      setLoading(true);
    }
    try {
      const params: any = {
        page: pagination.current,
        draw,
        start: (pagination.current - 1) * pagination.pageSize,
        rows: pagination.pageSize,
        sort: sort.order,
        order: sort.direction,
        start_date: startDate,
        end_date: endDate,
        game_type: selectGame,
        status: userStatus,
        contest: selectContest,
        movement,
        date: "",
      };
      props?.setParamVal(params);
      setParamsOptions(params);

      if (customFilters !== undefined) {
        customFilters.forEach((filter: any, index: number) => {
          params[filter.paramName] = filter.value;
        });
      }
      if (filters)
        Object.keys(filters).forEach((p) => {
          if (filters[p].beforeRequest) {
            const val = filters[p].beforeRequest(filters[p].value);
            if (val) Object.keys(val).forEach((vp) => (params[vp] = val[vp]));
          } else {
            params[p] = filters[p].value;
          }
        });

      if (props.fetchDataFunction) {
        props.draw > 0 &&
          pagination?.current == currentPage &&
          (await timeout(props.fetchFunctionTimeOut ?? 1000));
        const res = await props.fetchDataFunction(params);
        if (res?.data?.result?.data) {
          const data = res?.data?.result?.data?.map((item: any, index: any) => {
            return indexing(
              item,
              index,
              res.data.result.meta &&
                typeof res.data.result.meta?.current_page !== "undefined"
                ? res.data.result.meta?.current_page
                : res.data.result?.current_page,

              res.data.result.meta &&
                typeof res.data.result.meta.per_page !== "undefined"
                ? res.data.result.meta.per_page
                : res.data.result.per_page
            );
          });
          setData(data);
          setTotal(
            res?.data?.result?.total
              ? res?.data?.result?.total
              : res?.data?.result?.meta?.total
          );
          setColumns(columns);
          setDraw(res.data.draw);
          setLoading(false);
        } else {
          // new structure
          if (res?.data && Array.isArray(res?.data)) {
            const data = res.data.map((item: any, index: any) => {
              return indexing(
                item,
                index,
                res.meta?.current_page,
                res.meta.per_page
              );
            });
            setData(data);
            setTotal(res?.total ? res?.total : res?.meta?.total);
          } else {
            if (res) {
              setData(res);
            }
          }
          if (props.recordsTotal) {
            props.draw > 0 &&
              pagination?.current == currentPage &&
              (await timeout(props.recordsTotalTimeOut ?? 1000));
            const res = await props.recordsTotal(params);
            setTotal(res?.data);
          }
          setColumns(columns);
          setLoading(false);
        }
      } else {
        setColumns(columns);
        setLoading(false);
      }
    } catch (e: unknown) {
      if (typeof e === "string") {
        message.error(e);
      } else if (e instanceof Error) {
        message.error(e.message); //
      }
      setLoading(false);
    }
  };

  //   const onChangeSearch = (e: any) => {
  //     setSearch(e.currentTarget.value);

  //     const newFilters = { ...filters };

  //     if (newFilters.search) {
  //       newFilters.search.value = e.currentTarget.value;
  //     } else {
  //       newFilters.search = { value: e.currentTarget.value };
  //     }

  //     setPagination({
  //       current: 1,
  //       pageSize: props.pageSize ?? 10,
  //       showSizeChanger: props.sizeChanger == true ? false : true, // eslint-disable-line
  //       onShowSizeChange,
  //     });
  //     setFilters(newFilters);
  //   };

  function handleChange(
    pagination: any,
    filters: any,
    sorter: any,
    extra: any
  ) {
    setPagination(pagination);
    if (Object.keys(sorter).length !== 0) {
      setSort({
        order: sorter.field ? sorter.field : columns[0].dataIndex,
        direction:
          sorter.order != undefined
            ? sorter.order == "ascend"
              ? "asc"
              : "desc"
            : "ASC",
      });
    }
  }

  // Added undefined to the condition to still show the button if it is not declared on the props, some sort of default prop value.
  const button =
    props?.isButtonShown || props?.isButtonShown === undefined ? (
      props?.button !== undefined ? (
        React.cloneElement(props?.button, {
          onClick: () => {
            if (!props?.buttonPreventDefault) {
              props?.setCreateModalVisibility(true);
              props?.setCreateNew(true);
            }
          },
        })
      ) : (
        <Button
          type="primary"
          onClick={() => {
            props?.setCreateModalVisibility(true);
            props?.setCreateNew(true);
          }}
          icon={<GoPlus />}
        ></Button>
      )
    ) : null;

  const exportButton = (
    <Button
      type="primary"
      className="exportButton"
      onClick={props.exportButtonClicked}
    >
      {" "}
      Export{" "}
    </Button>
  );

  const statusOptions = [
    { id: 1, name: "Pending" },
    { id: 2, name: "Success" },
    { id: 3, name: "Queued" },
    { id: 4, name: "Cancelled" },
  ];

  const gameOptions = [
    { id: 1, name: "Group Trading" },
    { id: 2, name: "50/50 Trading" },
  ];

  const movementOptions = [
    { id: 1, name: "Up" },
    { id: 2, name: "Down" },
  ];

  return (
    <>
      {props.createModal &&
        React.cloneElement(props.createModal, {
          visible: props.isCreateModalVisible,
          setVisibility: props.setCreateModalVisibility,
          onSuccess: () =>
            fetchData(
              search,
              sort,
              pagination,
              props.startDate,
              props.endDate,
              selectGame,
              selectContest,
              userStatus,
              movement
            ),
        })}
      {continuousFetchInterval ? (
        <PollingFetch
          fetchData={() =>
            fetchData(
              filters,
              sort,
              pagination,
              props.startDate,
              props.endDate,
              selectGame,
              selectContest,
              userStatus,
              movement
            )
          }
          continuousFetchInterval={continuousFetchInterval}
        />
      ) : null}
      <Card
        className={`${props.containerClass || ""}  ${
          props.dbcustomstyle == undefined ? "mainCard" : "mainCardInDb"
        } ${props.customComponentDisplay == true && "customComponent"}
        ${props.analysisCustomStyle == true && "analysisComponent"}`}
        title={
          props.tabs ? (
            ""
          ) : (
            <>
              <div className="d-flex  justify-content-between">
                <span
                  className={`${
                    props.dbcustomstyle == undefined
                      ? "text-primary"
                      : "text-white"
                  }
                 font-weight-bold tableTitle`}
                >
                  {title ? titleize(title) : titleize(props.entity)}
                  {props.groupQualifyStatus ? (
                    <Tag
                      className="ms-2 s fs-50 text-white"
                      style={{ backgroundColor: "red" }}
                    >
                      {props.groupStatus}
                    </Tag>
                  ) : (
                    ""
                  )}
                </span>

                <div className="me-2">{props.centerData}</div>
              </div>
            </>
          )
        }
        extra={
          <>
            <div className="w-full mr-2.5">
              {props.dbcustomstyle == undefined && (
                <Col xs={12} md={6} lg={3}>
                  <DataTableFilter
                    filterState={{ filters, setFilters }}
                    filtersConfig={columns
                      ?.filter((col: any) => col.filter)
                      ?.map((col: any) => col.filter)}
                    style={{ float: "right" }}
                  />
                </Col>
              )}
              <div>
                {/* <Col xs={12} md={8} lg={8}> */}
                <Space
                  direction="horizontal"
                  className="mx-2 w-full grid md:flex justify-content-end innerSpaceItem"
                >
                  <Col xs={12} md={4} lg={6} xl={4} className="mt-1">
                    {exportButton}
                  </Col>
                  {/* {props.singleDateFilter && (
                      <Col
                        xs={12}
                        md={4}
                        lg={6}
                        xl={4}
                        className="mt-1"
                      >
                        <DatePickerComp setDate={setDateVal} />
                      </Col>
                    )} */}
                  {props?.isStatusDropdown && (
                    <Col xs={12} md={4} lg={6} xl={4} className="mt-1">
                      <SelectComp
                        placeholder={"Status"}
                        options={statusOptions}
                        handleChange={(val: any) => {
                          setUserStatus(val)
                          setPagination({
                            ...pagination,
                            current: 1,
                          });
                        }}
                        onClear={() => {
                          fetchData(
                            filters,
                            sort,
                            pagination,
                            props.startDate,
                            props.endDate,
                            selectGame,
                            selectContest,
                            0,
                            movement
                          );
                        }}
                      />
                    </Col>
                  )}
                  {props?.isGameDropdown && (
                    <Col xs={12} md={4} lg={6} xl={4} className="mt-1">
                      <SelectComp
                        placeholder={"Select Game"}
                        options={gameOptions}
                        handleChange={(val: any) => {
                          setSelectGame(val);
                          setParamsOptions({
                            ...paramsOptions,
                            game_type: val,
                          });
                          setPagination({
                            ...pagination,
                            current: 1,
                          });
                        }}
                        onClear={() => {
                          fetchData(
                            filters,
                            sort,
                            pagination,
                            props.startDate,
                            props.endDate,
                            0,
                            selectContest,
                            userStatus,
                            movement
                          );
                        }}
                      />
                    </Col>
                  )}
                  {props?.isContestDropdown && (
                    <Col xs={12} md={4} lg={6} xl={4} className="mt-1">
                      <SelectComp
                        placeholder={"Select Contest"}
                        options={contestOptions}
                        handleChange={(val: any) => {
                          setSelectContest(val)
                          setPagination({
                            ...pagination,
                            current: 1,
                          });
                        }}
                        onClear={() => {
                          fetchData(
                            filters,
                            sort,
                            pagination,
                            props.startDate,
                            props.endDate,
                            selectGame,
                            0,
                            userStatus,
                            movement
                          );
                        }}
                      />
                    </Col>
                  )}
                  {props?.isMovementDropdown && (
                    <Col xs={12} md={4} lg={6} xl={4} className="mt-1">
                      <SelectComp
                        placeholder={"Movement"}
                        options={movementOptions}
                        handleChange={(val: any) => {
                          setMovement(val)
                          setPagination({
                            ...pagination,
                            current: 1,
                          });
                        }}
                        onClear={() => {
                          fetchData(
                            filters,
                            sort,
                            pagination,
                            props.startDate,
                            props.endDate,
                            selectGame,
                            selectContest,
                            userStatus,
                            0
                          );
                        }}
                      />
                    </Col>
                  )}
                </Space>
                {/* </Col> */}
              </div>
              <Action>
                {button}
                {/* {link} */}
              </Action>
            </div>
          </>
        }
      >
        {/* {(props.actions || props.tabs) && ( */}
        {/* <MobileAction>
            {props.actions}
            {button}
          </MobileAction> */}
        {/* )} */}
        {props.finalResult ? (
          <>
            <Row className="mt-2 mb-3">
              {props?.finalResultColumn?.first ? (
                <Col
                  xs={12}
                  lg={6}
                  xl={4}
                  className="fs-6 fw-normal d-block mt-1"
                >
                  <span>
                    {props?.finalResultColumn?.first &&
                      `${props?.finalResultColumn?.first} : `}{" "}
                  </span>
                  <span className="fw-bold">
                    {/* {!props?.apiResponse?.group_total_players &&
                      !props?.apiResponse?.group_earnings &&
                      "N/A"} */}
                    {(props?.apiResponse?.group_players ||
                      props?.apiResponse?.group_players === 0) &&
                      `${props?.apiResponse?.group_players} Players`}
                    {(props?.apiResponse?.group_total_players ||
                      props?.apiResponse?.group_total_players == 0) &&
                      `${props?.apiResponse?.group_total_players} Players`}
                    {((props?.apiResponse?.group_total_players ||
                      props?.apiResponse?.group_total_players === 0) &&
                      (props?.apiResponse?.group_earnings ||
                        props?.apiResponse?.group_earnings === 0)) ||
                      ((props?.apiResponse?.group_players ||
                        props?.apiResponse?.group_players === 0) &&
                        (props?.apiResponse?.group_winning_amounts ||
                          props?.apiResponse?.group_winning_amounts === 0) &&
                        " | ")}

                    {props?.apiResponse?.group_earnings ||
                    props?.apiResponse?.group_winning_amounts ||
                    props?.apiResponse?.group_earnings === 0 ||
                    props?.apiResponse?.group_winning_amounts === 0 ? (
                      <>
                        <BiRupee className="d-inline-block" />
                        {props?.apiResponse?.group_earnings}
                        {props?.apiResponse?.group_winning_amounts}
                      </>
                    ) : (
                      ""
                    )}
                    {/* </>
                    ) : (
                      ""
                    )} */}
                  </span>
                </Col>
              ) : (
                ""
              )}
              {props.finalResultColumn.second ? (
                <Col
                  xs={12}
                  lg={6}
                  xl={4}
                  className="fs-6 fw-normal d-block mt-1"
                >
                  <span className="tableColName">
                    {props.finalResultColumn.second &&
                      `${props.finalResultColumn.second} : `}{" "}
                  </span>
                  <span className="fw-bold">
                    {/* {!props?.apiResponse?.three_total_players &&
                      !props?.apiResponse?.three_card_earnings &&
                      "N/A"} */}
                    {(props?.apiResponse?.three_players ||
                      props?.apiResponse?.three_players === 0) &&
                      `${props?.apiResponse?.three_players} Players`}
                    {(props?.apiResponse?.three_total_players ||
                      props?.apiResponse?.three_total_players === 0) &&
                      `${props?.apiResponse?.three_total_players} Players`}
                    {((props?.apiResponse?.three_total_players ||
                      props?.apiResponse?.three_total_players === 0) &&
                      (props?.apiResponse?.three_card_earnings ||
                        props?.apiResponse?.three_card_earnings === 0)) ||
                      ((props?.apiResponse?.three_players ||
                        props?.apiResponse?.three_players === 0) &&
                        (props?.apiResponse?.three_winning_amounts ||
                          props?.apiResponse?.three_winning_amounts === 0) &&
                        // (props?.apiResponse?.three_players === 0 &&
                        //   props?.apiResponse?.three_winning_amounts === 0)  &&
                        " | ")}
                    {(props?.apiResponse?.three_card_earnings ||
                      props?.apiResponse?.three_winning_amounts ||
                      props?.apiResponse?.three_card_earnings === 0 ||
                      props?.apiResponse?.three_winning_amounts === 0) && (
                      <>
                        <BiRupee className="d-inline-block" />
                        {props?.apiResponse?.three_card_earnings &&
                          props?.apiResponse?.three_card_earnings}
                        {props?.apiResponse?.three_winning_amounts &&
                          props?.apiResponse?.three_winning_amounts}
                      </>
                    )}
                  </span>
                </Col>
              ) : (
                ""
              )}
              {props.finalResultColumn.third ? (
                <Col
                  xs={12}
                  lg={6}
                  xl={4}
                  className="fs-6 fw-normal d-block mt-1"
                >
                  <span className="tableColName">
                    {" "}
                    {props.finalResultColumn.third &&
                      `${props.finalResultColumn.third} : `}{" "}
                  </span>
                  <span className="fw-bold">
                    {(props?.apiResponse?.total_players ||
                      props?.apiResponse?.total_players === 0) &&
                      `${props?.apiResponse?.total_players} Players`}
                    {((props?.apiResponse?.total_players ||
                      props?.apiResponse?.total_players === 0) &&
                      (props?.apiResponse?.total_earnings ||
                        props?.apiResponse?.total_earnings === 0)) ||
                      // (props?.apiResponse?.total_players === 0 &&
                      //   props?.apiResponse?.total_earnings === 0)
                      ((props?.apiResponse?.total_players ||
                        props?.apiResponse?.total_players === 0) &&
                        (props?.apiResponse?.total_winning_amounts ||
                          props?.apiResponse?.total_winning_amounts === 0) &&
                        // (props?.apiResponse?.total_players === 0 &&
                        //   props?.apiResponse?.total_winning_amounts === 0) &&
                        " | ")}
                    {/* {props?.apiResponse?.total_earnings && (
                      <> */}
                    {props?.apiResponse?.total_earnings ||
                    props?.apiResponse?.total_earnings === 0 ? (
                      <>
                        <BiRupee className="d-inline-block" />{" "}
                        {props?.apiResponse?.total_earnings}{" "}
                      </>
                    ) : (
                      ""
                    )}
                    {/* </>
                    )} */}
                    {/* {props?.apiResponse?.totalAmt && (
                      <> */}
                    {props?.apiResponse?.totalAmt ||
                    props?.apiResponse?.totalAmt === 0 ||
                    props?.apiResponse?.total_winning_amounts ||
                    props?.apiResponse?.total_winning_amounts === 0 ? (
                      <>
                        <BiRupee className="d-inline-block" />
                        {props?.apiResponse?.totalAmt}
                        {props?.apiResponse?.group_total_players}
                        {props?.apiResponse?.total_winning_amounts}
                      </>
                    ) : (
                      ""
                    )}
                    {/* </>
                    )} */}
                    {/* {!props?.apiResponse?.total_players &&
                      !props?.apiResponse?.totalAmt &&
                      !props?.apiResponse?.total_earnings &&
                      "N/A"} */}
                  </span>{" "}
                </Col>
              ) : (
                ""
              )}
              {props.finalResultColumn.fourth ? (
                <Col
                  xs={12}
                  lg={6}
                  xl={4}
                  className="fs-6 fw-normal d-block mt-1"
                >
                  {props.finalResultColumn.fourth}:
                  <span className="fw-light"> 421 Players </span>{" "}
                </Col>
              ) : (
                ""
              )}
            </Row>
          </>
        ) : (
          ""
        )}

        <AntdDataTable
          loading={loading}
          data={data}
          setData={setData}
          columns={columns}
          setColumns={setColumns}
          filtersState={{ filters, setFilters }}
          draw={draw}
          setDraw={setDraw}
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
          pagination={pagination}
          setPagination={setPagination}
          total={total}
          setTotal={setTotal}
          fetchData={fetchData}
          handleChange={handleChange}
          responsive={true}
          rowKey={props.rowKey}
          highlightRow={props.highlightRow}
          expandable={props.expandable}
          dbcustomstyle={props.dbcustomstyle}
          summary={props.summary}
          frequentUpdate={props.frequentUpdate}
          customComponentDisplay={props.customComponentDisplay}
          analysisCustomStyle={props.analysisCustomStyle}
          sizeChanger={props.sizeChanger}
          linkPath={props.linkPath}
        />
      </Card>
    </>
  );
};
export default CRUDDataResultTable;
