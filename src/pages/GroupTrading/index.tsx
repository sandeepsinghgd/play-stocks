import { message, Modal, Switch, Tooltip } from "antd";
import React, { useState } from "react";
import CRUDDataTable from "../../components/DataTable/dataTable";
import { AiOutlineCheck } from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc";
import "../../styles/_groupTrading.scss";
import { getGroupTradingList, groupStatus } from "../../api/groupTrading";
import { BsFillEyeFill, BsHash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import CreateGroupTrading from "../CreateGroup";

const { confirm } = Modal;

function GroupTrading() {
  const [isCreateModalVisible, setCreateModalVisibility] = useState(false);
  const [draw, setDraw] = useState(0);
  const [check, setCheck] = useState(true); //eslint-disable-line
  // const [isEdit, setIsEdit] = useState(false);
  // const [group, setGroup] = useState<any>({});
  // const [editId, setEditId] = useState(null);
  // const [stockList, setStockList] = useState<any>([]);
  const [isActionPerform, setActionPerform] = useState<any>(false);
  const [createContest, setCreateContest] = useState<any>(false);
  const { currentUserPermissions } = useTypedSelector((state) => state.user);

  const updateStatus = async (status: any, id: any) => {
    try {
      const payload = {
        id,
        status,
      };
      const response = await groupStatus(payload);
      if (response.data.success) {
        message.success({
          content: response.data.message,
          style: { fontWeight: "400", color: "green" },
        });
        setCheck(payload.status);
        setActionPerform(true);
      }
    } catch (err: any) {
      message.error({
        content: err.response.data.message,
        style: { fontWeight: "400", color: "red" },
      });
    }
  };
  const fetchGroupTradingList = async (params: any) => {
    // params = {
    //   ...params,
    // };
    return await getGroupTradingList(params);
  };

  

  // const fetchStockList = async () => {
  //   const response = await getStockList(1);
  //   setStockList(response?.data?.result);
  // };
  // useEffect(() => {
  //   fetchStockList();
  // }, []);

  // if (stockList.length === 0) {
  //   return null;
  // }

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
    // {
    //   title: <strong>Stock type</strong>,
    //   dataIndex: "stock_type_id",
    //   key: "stock_type_id",
    //   filter: {
    //     paramName: "stock_type",
    //     label: "Stock Type",
    //     component: {
    //       name: "radio",
    //       fetchData: () => [
    //         { value: 1, displayText: "NIFTY 50" },
    //         { value: 2, displayText: "BANK NIFTY" },
    //       ],
    //     },
    //   },
    //   render: (text: any, record: any, value: any) => {
    //     const stockArray = stockList?.filter(
    //       (type: any) => record?.stock_type_id === type.id
    //     );
    //     return stockArray[0]?.name;
    //   },
    // },
    {
      title: <strong>Group Name</strong>,
      dataIndex: "name",
      key: "name",
      width: "12%",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <>{record.name}</>;
      },
    },
    {
      title: <strong>Amount</strong>,
      dataIndex: "amount",
      key: "amount",
      sorter: true,
    },
    {
      title: <strong>Winning Amount</strong>,
      dataIndex: "winning_amount",
      key: "winning_amount",
      sorter: true,
    },
    {
      title: <strong>Winning Limit (%)</strong>,
      dataIndex: "winning_limit",
      key: "winning_limit",
      sorter: true,
    },
    {
      title: <strong>Rounds Limit</strong>,
      dataIndex: "round_limit",
      key: "round_limit",
      sorter: true,
    },
    {
      title: <strong>Minimum Player</strong>,
      dataIndex: "minimum_player",
      key: "minimum_player",
      sorter: true,
    },
    {
      title: <strong>Maximum Player</strong>,
      dataIndex: "maximum_player",
      key: "maximum_player",
      sorter: true,
    },
    // {
    //   title: <strong>System Commission</strong>,
    //   dataIndex: "system_commission",
    //   key: "system_commission",
    //   sorter: true,
    // },
    {
      title: <strong>Is Guaranteed Return?</strong>,
      dataIndex: "is_guaranteed_return",
      key: "is_guaranteed_return",
      // filter: {
      //   paramName: "status",
      //   label: "Is guaranteed return?",
      //   component: {
      //     name: "radio",
      //     fetchData: () => [
      //       { value: 1, displayText: "Active" },
      //       { value: 0, displayText: "Inactive" },
      //     ],
      //   },
      // },
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record.is_guaranteed_return === 1 ? (
              <AiOutlineCheck />
            ) : (
              <VscChromeClose />
            )}
          </>
        );
      },
    },

    {
      title: <strong>Status</strong>,
      dataIndex: "status",
      key: "status",
      filter: {
        paramName: "status",
        label: "Status",
        component: {
          name: "radio",
          fetchData: () => [
            { value: 1, displayText: "Active" },
            { value: 0, displayText: "Inactive" },
          ],
        },
      },
      render: (text: any, record: any, value: any) => {
        return (
          <>{record.status === 1 ? <AiOutlineCheck /> : <VscChromeClose />}</>
        );
      },
    },
    {
      title: <strong>Action</strong>,
      dataIndex: "action",
      key: "action",
      width: "8%",
      render: (text: any, record: any, value: any) => {
        return (
          <div className="d-flex">
            <Tooltip title="View">
              <Link to={`group-trading/${record.id}`}>
                <BsFillEyeFill
                  style={{
                    color: "#0A3453",
                    fontSize: "18px",
                    marginRight: "10px",
                  }}
                />
              </Link>
            </Tooltip>
            {currentUserPermissions.includes("group_status_update") ? (
              record.status === 1 ? (
                <Tooltip title="Inactive">
                  <Switch
                    size="small"
                    style={{ backgroundColor: "#0A3453" }}
                    defaultChecked={record.status}
                    checked={record.status}
                    onChange={(value: any) =>
                      confirm({
                        title: "Do you want to inactivate the Group?",
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
                        title: "Do you want to activate the Group?",

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
        );
      },
    },
  ];
  return (
    <>
      <div
        style={{ position: "relative", display: "flex" }}
        className="groupTradingMain"
      >
        {createContest ? (
          <div
            style={{
              position: "absolute",
              width: "100%",
              transform: createContest ? "translateX(0)" : "translateX(100%)",
              transition: "ease",
              transitionDuration: "1s",
              overflowX: "hidden",
            }}
          >
            <CreateGroupTrading
              setCreateContest={setCreateContest}
              createContest={createContest}
              // setCreateModalVisibility={setCreateModalVisibility}
              // isEdit={isEdit}
              // editId={editId}
              // user={user}
              // setEditId={setEditId}
              setActionPerform={setActionPerform}
              draw={draw}
              setDraw={setDraw}
            />
          </div>
        ) : (
          ""
        )}
        <div
          style={{
            position: "absolute",
            width: "100%",
            transform: createContest ? "translateX(-120%)" : "translateX(0)",
            transition: "ease",
            transitionDuration: "1s",
            overflowX: "hidden",
          }}
        >
          <CRUDDataTable
            draw={draw}
            entity="Group Trading"
            fetchDataFunction={fetchGroupTradingList}
            isActionPerform={isActionPerform}
            columns={columns}
            sortOrder="id"
            isButtonShown={!!currentUserPermissions.includes("group_create")}
            rowKey="id"
            isAddGroupTrade={false}
            isCreateModalVisible={isCreateModalVisible}
            setCreateModalVisibility={setCreateModalVisibility}
            setCreateNew={setCreateContest}
            // isExportButton={true}
            // linkPath="/trading/create-group-trading"
            // createModal={
            //   <GroupTradingAddModal
            //     group={group}
            //     isEdit={isEdit}
            //     title={`${editId ? "Update" : "Create"} Group Trading`}
            //     stockList={stockList}
            //     onClose={() => {
            //       setIsEdit(false);
            //       setEditId(null);
            //       setGroup({});
            //     }}
            //     onSubmit={() => {
            //       setIsEdit(false);
            //       setEditId(null);
            //       setGroup({});
            //       setDraw(draw + 1);
            //     }}
            //   />
            // }
          />
        </div>
      </div>
    </>
  );
}

export default GroupTrading;
