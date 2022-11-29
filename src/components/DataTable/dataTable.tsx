import React, { FC, ReactNode, useEffect, useState } from "react";
import {
  Button,
  Card,
  Space,
  message,
  Table,
  Pagination,
  Tag,
  Divider,
  Select,
  Spin,
  Input,
} from "antd";
import styled from "styled-components";
import { Col, Row } from "react-bootstrap";
import "../../styles/_dataTable.scss";
import "../../styles/_mainCardInDb.scss";
// import Search from "antd/lib/input/Search";
import { GoPlus } from "react-icons/go";
import DataTableFilter from "./DataTableFilter";
import "../../styles/_dbSearchAnimate.scss";
import { Link } from "react-router-dom";
import { ExportToExcel } from "./ExportToExcel";
import { FaArrowRight } from "react-icons/fa";
const { Option } = Select;
const { Search } = Input;

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
  dropDownMenus,
  dropDownButtonName,
  rowSelection,
  hasSelected,
  statusUpdate,
  setSelectVal,
  selectVal,
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
  isExportButton?: any;
  dropDownMenus?: any;
  dropDownButtonName?: any;
  rowSelection?: any;
  hasSelected?: any;
  statusUpdate?: any;
  setSelectVal?: any;
  selectVal?: any;
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
            <>
              {hasSelected && (
                <div>
                  <Select
                    placeholder={dropDownButtonName}
                    optionFilterProp="children"
                    style={{ width: "10%" }}
                    onChange={(val: any) => {
                      setSelectVal(val);
                    }}
                  >
                    {dropDownMenus &&
                      dropDownMenus.map((menu: any, index: any) => (
                        <Option key={index} value={menu.menu}>
                          {menu.menu}
                        </Option>
                      ))}
                  </Select>
                  <Button
                    type="primary"
                    className="ms-3"
                    onClick={statusUpdate}
                  >
                    Submit
                  </Button>
                  <Divider className="mt-2" />
                </div>
              )}
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
                  rowSelection={rowSelection}
                />
              </div>
            </>
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
                rowSelection={rowSelection}
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
            {
              <Pagination
                total={total}
                showSizeChanger
                // onShowSizeChange={onShowSizeChange}
                onChange={(current:any) => {
                  setPagination({
                    ...pagination,
                    current,
                  });
                }}
              />
            }
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
            rowSelection={rowSelection}
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
  isExportButton?: any;
  dropDownMenus?: any;
  dropDownButtonName?: any;
  rowSelection?: any;
  hasSelected?: any;
  statusUpdate?: any;
  setSelectVal?: any;
  selectVal?: any;
  rightArrowLink?: any;
  link?: any;
  searchBox?: any;
  isSmallTable?: boolean;
  type?: string;
}

const CRUDDataTable: FC<DataTableProps> = (props) => {
  const [data, setData] = useState([] as any);
  const [columns, setColumns] = useState(props.columns);
  const [draw, setDraw] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({
    order: props.sortOrder ? props.sortOrder : props.columns[0].dataIndex,
    direction: props.direction ? props.direction : "DESC",
  });
  const [dbSearchShow, setdbSearchShow] = useState<any>(false);
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
  const [params, setParams] = useState("");

  function onShowSizeChange(current: any, pageSize: any) {
    setPagination({
      ...pagination,
      pageSize,
      current: 1,
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
    if (props.draw > 0) {
      fetchData(filters, sort, pagination);
    }
  }, [props.draw]);

  useEffect(() => {
    setCurrentPage(pagination.current);
    fetchData(filters, sort, pagination);
    // eslint-disable-next-line
  }, [filters, sort, pagination]);

  useEffect(() => {
    if (isActionPerform) {
      fetchData(filters, sort, pagination);
    }
  }, [isActionPerform]);

  const indexing = (
    item: any,
    index: any,
    currentPage?: any,
    perPage?: any
  ) => {
    const indexof = (currentPage - 1) * perPage + index;
    const data = { ...item, index: indexof + 1 };
    return data;
  };

  const fetchData = async (filters: any, sort: any, pagination: any) => {
    if (props.frequentUpdate == true) {
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
        search: search,
      };
      setParams(params);

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
          if (
            "upStocks" in res?.data?.result?.data ||
            "downStocks" in res?.data?.result?.data
          ) {
            const upstocks = res?.data?.result?.data?.upStocks?.data;
            const downstocks = res?.data?.result?.data?.downStocks?.data;
            const data = new Array(5).fill(1).map((value, index) => {
              const item: any = {
                upStocks: upstocks[index],
                downStocks: downstocks[index],
              };
              return indexing(
                item,
                index,
                res?.data?.result?.data?.upStocks?.current_page,
                res?.data?.result?.data?.upStocks?.per_page
              );
            });
            setData(data);
            setTotal(
              res?.data?.result?.data?.upStocks?.total
                ? res?.data?.result?.data?.upStocks?.total
                : res?.data?.result?.data?.upStocks?.meta?.total
            );
            setColumns(columns);
            setDraw(res.data.draw);
            setLoading(false);
          } else {
            const data = res?.data?.result?.data.map(
              (item: any, index: any) => {
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
              }
            );
            setData(data);
            if (props.type === "latestTransactions") {
              setTotal(15);
            } else {
              setTotal(
                res?.data?.result?.total
                  ? res?.data?.result?.total
                  : res?.data?.result?.meta?.total
              );
            }
            setColumns(columns);
            setDraw(res.data.draw);
            setLoading(false);
          }
        } else {
          // new structure
          if (res?.data && Array.isArray(res?.data)) {
            const data = res?.data.map((item: any, index: any) => {
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

  const onChangeSearch = (e: any) => {
    setSearch(e.currentTarget.value.trim());

    const newFilters = { ...filters };

    if (newFilters.search) {
      newFilters.search.value = e.currentTarget.value.trim();
    } else {
      newFilters.search = { value: e.currentTarget.value.trim() };
    }

    setPagination({
      current: 1,
      pageSize: props.pageSize ?? 10,
      showSizeChanger: props.sizeChanger == true ? false : true, // eslint-disable-line
      onShowSizeChange,
    });
    setFilters(newFilters);
  };
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
        React.cloneElement(props.button, {
          onClick: () => {
            if (!props?.buttonPreventDefault) {
              props?.setCreateModalVisibility(true);
              props?.setCreateNew(true);
            }
          },
        })
      ) : (
        <Button
          className="d-flex justify-content-center align-items-center"
          type="primary"
          onClick={() => {
            props?.setCreateModalVisibility(true);
            props?.setCreateNew(true);
          }}
          icon={<GoPlus />}
        ></Button>
      )
    ) : null;

  const link = props.isAddGroupTrade && (
    <Link to={props.linkPath}>
      <Button
        type="primary"
        onClick={() => {
          props.setCreateModalVisibility(true);
        }}
        icon={<GoPlus />}
      ></Button>
    </Link>
  );

  // const extra = (
  //   <>
  //     <Search
  //       placeholder="Search"
  //       className=""
  //       onChange={onChangeSearch}
  //       onSearch={(value, event) => setSearch(value)}
  //     />

  //     {/*{props.actions ||
  //       (props.tabs && ( */}
  //     <Action>
  //       {/*{props.actions} */}
  //       {button}
  //     </Action>
  //     {/*))} */}
  //     <DataTableFilter
  //       filterState={{ filters, setFilters }}
  //       filtersConfig={columns
  //         .filter((col: any) => col.filter)
  //         .map((col: any) => col.filter)}
  //       style={{ float: "right" }}
  //     />
  //   </>
  // );

  return (
    <>
      {props.createModal &&
        React.cloneElement(props.createModal, {
          visible: props.isCreateModalVisible,
          setVisibility: props.setCreateModalVisibility,
          onSuccess: () => fetchData(search, sort, pagination),
        })}
      {continuousFetchInterval ? (
        <PollingFetch
          fetchData={() => fetchData(filters, sort, pagination)}
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
              <div className="d-flex justify-content-between items-center">
                <span
                  className={`${
                    props.dbcustomstyle == undefined
                      ? "text-primary"
                      : "text-white"
                  } font-bold ${props.isSmallTable ? "text-[18px]" : ""}`}
                >
                  {title || props.entity}
                  {props.groupQualifyStatus && (
                    <Tag
                      className="ms-2 s fs-50 "
                      style={{ backgroundColor: "red" }}
                    >
                      {props.groupStatus}
                    </Tag>
                  )}
                </span>

                <div className="me-2">{props.centerData}</div>
                {props?.rightArrowLink ? (
                  <Link to={props?.link}>
                    <FaArrowRight className="fs-5 text-white" />
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </>
          )
        }
        extra={
          <>
            {props.dbcustomstyle == undefined ? (
              <DataTableFilter
                filterState={{ filters, setFilters }}
                filtersConfig={columns
                  .filter((col: any) => col.filter)
                  .map((col: any) => col.filter)}
                style={{ float: "right" }}
                setPagination={setPagination}
                pagination={pagination}
              />
            ) : (
              ""
            )}
            {console.log("props", props)}
            {props.isExportButton && (
              <div>
                <ExportToExcel
                  apiData={data}
                  fileName="ExcelFile"
                  params={params}
                />
              </div>
            )}

            {!props?.searchBox && (
              <div>
                <Search
                  placeholder="Search"
                  className={
                    props.dbcustomstyle !== undefined && !dbSearchShow
                      ? "dbSearchFun"
                      : ""
                  }
                  onChange={onChangeSearch}
                  onSearch={(value:any, event:any) => {
                    setSearch(value);
                    setdbSearchShow(!dbSearchShow);
                  }}
                />
              </div>
            )}

            <Action>
              {/* {props.actions} */}
              {button}
              {link}
            </Action>
          </>
        }
      >
        {/* {(props.actions || props.tabs) && ( */}
        {/* <MobileAction>
            {props.actions}
            {button}
          </MobileAction> */}
        {/* )} */}
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
          dropDownMenus={props.dropDownMenus}
          dropDownButtonName={props.dropDownButtonName}
          rowSelection={props.rowSelection}
          hasSelected={props.hasSelected}
          statusUpdate={props.statusUpdate}
          setSelectVal={props.setSelectVal}
          selectVal={props.selectVal}
        />
      </Card>
    </>
  );
};
export default CRUDDataTable;
