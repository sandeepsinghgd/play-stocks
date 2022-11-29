import { message, Modal, Switch, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { AiFillEdit, AiOutlineCheck } from "react-icons/ai";
import { BsHash } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";
import { getStockList, getStocks, stockStatus } from "../../api/stocks";
import CRUDDataTable from "../../components/DataTable/dataTable";
import StocksModal from "../../components/Modals/StocksModal";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { findCommonElements } from "../../utils/helpers";
import StockImage from "./StockImage";

const { confirm } = Modal;

const Stocks = () => {
  const [draw, setDraw] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isCreateModalVisible, setCreateModalVisibility] = useState(false);
  const [stock, setStock] = useState({});
  const [stockTypesList, setStockTypesList] = useState<any>([]);
  const [isActionPerform, setActionPerform] = useState(false);

  const { currentUserPermissions } = useTypedSelector((state) => state.user);
  const checkPermissions = ["stock_update", "stock_delete"];

  const updateStatus = async (status: any, id: any) => {
    try {
      const payload = {
        id,
        status,
      };
      const response = await stockStatus(payload);
      if (response.data.success) {
        message.success({
          content: response.data.message,
          style: { fontWeight: "400", color: "green" },
        });
        setActionPerform(true);
      }
    } catch (err: any) {
      message.error({
        content: err.response.data.message,
        style: { fontWeight: "400", color: "red" },
      });
    }
  };

  // const fetchStockList = async () => {
  //   const response = await getStockList(1);
  //   setStockList(response?.data?.result);
  // };
  // useEffect(() => {
  //   fetchStockList();
  // }, []);

  // const deleteData = async (id: any) => {
  //   try {
  //     const response = await deleteStock(id);
  //     if (response.data.success) {
  //       message.success(response.data.message);
  //       setActionPerform(true);
  //     }
  //   } catch (err: any) {
  //     message.error(err);
  //   }
  //   return await deleteStock(id);
  // };

  const columns = [
    {
      title: (
        <strong>
          <BsHash />
        </strong>
      ),
      dataIndex: "index",
      key: "index",
    },
    {
      title: <strong>Stock Index</strong>,
      dataIndex: "types",
      key: "types",
      width: "15%",
      filter: {
        paramName: "type_id",
        label: "Stock Type",
        component: {
          name: "radio",
          fetchData: () => [
            {
              value: stockTypesList[0].id,
              displayText: stockTypesList[0].name,
            },
            {
              value: stockTypesList[1].id,
              displayText: stockTypesList[1].name,
            },
          ],
        },
      },
      render: (text: any, record: any, value: any) => {
        const stockTypes = record?.types.map((type: any) => {
          return type.name;
        });
        return <span>{stockTypes.toString()}</span>;
      },
    },
    {
      title: <strong>Stock Symbol</strong>,
      dataIndex: "symbol",
      key: "symbol",
      sorter: true,
    },
    {
      title: <strong>Company Name</strong>,
      dataIndex: "company_name",
      key: "company_name",
    },
    {
      title: <strong>Logo</strong>,
      dataIndex: "logo",
      key: "logo",
      width: "10%",
      render: (text: any, record: any, value: any) => {
        return <>{record?.logo ? <StockImage logo={record?.logo} /> : "N/A"}</>;
      },
    },
    {
      title: <strong>Instrument Token</strong>,
      dataIndex: "instrument_token",
      key: "instrument_token",
      sorter: true,
      render(text: any, record: any, value: any) {
        return (
          <> {record?.instrument_token ? record?.instrument_token : "N/A"} </>
        );
      },
    },
    {
      title: <strong>Status</strong>,
      dataIndex: "status",
      key: "status",
      // sorter: true,
      render(text: any, record: any, value: any) {
        return (
          <> {record.status === 1 ? <AiOutlineCheck /> : <VscChromeClose />} </>
        );
      },
    },
    {
      title: findCommonElements(checkPermissions, currentUserPermissions) && (
        <strong>Action</strong>
      ),
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (text: any, record: any, value: any) => {
        return (
          findCommonElements(checkPermissions, currentUserPermissions) && (
            <div className="d-flex">
              {currentUserPermissions.includes("stock_update") && (
                <Tooltip title="Edit">
                  <AiFillEdit
                    style={{
                      color: "#0A3453",
                      fontSize: "16px",
                      marginRight: "10px",
                    }}
                    onClick={() => {
                      setIsEdit(true);
                      setEditId(record.id);
                      setStock(record);
                      setCreateModalVisibility(true);
                    }}
                  />
                </Tooltip>
              )}
              {/* {currentUserPermissions.includes("stock_delete") && (
                <Tooltip title="Delete">
                  <AiFillDelete
                    style={{
                      color: "red",
                      fontSize: "16px",
                      marginRight: "10px",
                    }}
                    onClick={() => {
                      confirm({
                        title: "Are you sure, You want to delete the stock?",
                        onOk: () => {
                          setActionPerform(false);
                          deleteData(record.id);
                        },
                        okText: "Yes",
                        okType: "danger",
                        cancelText: "No",
                        onCancel: () => {},
                      });
                    }}
                  />
                </Tooltip>
              )} */}

              {currentUserPermissions.includes("stock_update") ? (
                record.status === 1 ? (
                  <Tooltip title="Inactive">
                    <Switch
                      size="small"
                      style={{ backgroundColor: "#0A3453" }}
                      defaultChecked={record.status}
                      checked={record.status}
                      onChange={(value: any) =>
                        confirm({
                          title: "Do you want to inactivate the Stock?",
                          okText: "Yes",
                          cancelText: "No",
                          onOk: () => {
                            setActionPerform(false);
                            updateStatus(value === true ? 1 : 0, record.id);
                          },
                          onCancel: () => {
                            setActionPerform(false);
                          },
                        })
                      }
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Active">
                    <Switch
                      size="small"
                      style={{ backgroundColor: "lightgray" }}
                      defaultChecked={record.status}
                      checked={record.status}
                      onChange={(value: any) =>
                        confirm({
                          title: "Do you want to activate the Stock?",

                          onOk: () => {
                            setActionPerform(false);
                            updateStatus(value === true ? 1 : 0, record.id);
                          },
                          onCancel: () => {
                            setActionPerform(false);
                          },
                          okText: "Yes",
                          cancelText: "No",
                        })
                      }
                    />
                  </Tooltip>
                )
              ) : null}
            </div>
          )
        );
      },
    },
  ];

  const fetchStocks = async (params: any) => {
    try {
      params = {
        ...params,
      };
      return await getStocks(params);
    } catch (error: any) {
      message.error(error);
    }
  };

  const fetchStockTypesList = async () => {
    try {
      const resp = await getStockList(3);
      const result = resp.data.result;
      setStockTypesList(result);
    } catch {}
  };
  useEffect(() => {
    fetchStockTypesList();
  }, []);

  if (stockTypesList.length === 0) {
    return null;
  }
  return (
    <>
      <CRUDDataTable
        draw={draw}
        entity="Stocks"
        fetchDataFunction={fetchStocks}
        isActionPerform={isActionPerform}
        createModal={
          <StocksModal
            stock={stock}
            isEdit={isEdit}
            isActionPerform={isActionPerform}
            stockTypesList={stockTypesList}
            title={`${editId ? "Update" : "Create"} Stock`}
            onClose={() => {
              setIsEdit(false);
              setEditId(null);
              setStock({});
            }}
            onSubmit={() => {
              setIsEdit(false);
              setEditId(null);
              setStock({});
              setDraw(draw + 1);
            }}
            onSuccess={() => setDraw(draw + 1)}
          />
        }
        columns={columns}
        sortOrder="symbol"
        direction="ASC"
        isButtonShown={!!currentUserPermissions.includes("stock_create")}
        isCreateModalVisible={isCreateModalVisible}
        setCreateModalVisibility={setCreateModalVisibility}
        rowKey="id"
      />
    </>
  );
};

export default Stocks;
