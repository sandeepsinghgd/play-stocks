import { message, Modal, Switch, Tooltip } from "antd";
import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { BsFillEyeFill, BsHash } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
import CRUDDataTable from "../../components/DataTable/dataTable";
import ThreeCardTradingAddModal from "../../components/Modals/ThreeCardTradingModal";
import {
  getThreeCardList,
  updateStatusThreeCard,
} from "../../api/threeCardTrading";
import { useTypedSelector } from "../../hooks/useTypeSelector";

const { confirm } = Modal;

const ThreeCardTrading = () => {
  const [isCreateModalVisible, setCreateModalVisibility] = useState(false);
  const [draw, setDraw] = useState(0);
  const [isActionPerform, setActionPerform] = useState(false);
  const { currentUserPermissions } = useTypedSelector((state) => state.user);

  const updateStatus = async (value: any, recordId: any) => {
    try {
      const payload = {
        id: recordId,
        status: value,
      };

      const response = await updateStatusThreeCard(payload);
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
  const [isEdit, setIsEdit] = useState(false);
  const [threeCardGroup, setThreeCardGroup] = useState<any>({});
  const [editId, setEditId] = useState(null); //eslint-disable-line

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
      title: <strong>Group Name</strong>,
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: <strong>Amount</strong>,
      dataIndex: "amount",
      key: "amount",
      sorter: true,
    },
    {
      title: <strong>System Commission</strong>,
      dataIndex: "system_commission",
      key: "system_commission",
      sorter: true,
    },

    {
      title: <strong>Winning Amount</strong>,
      dataIndex: "winning_amount",
      key: "winning_amount",
      sorter: true,
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
      render: (text: any, record: any, value: any) => {
        return (
          <div className="d-flex">
            <Tooltip title="View">
              <Link to={`50-50-trading/${record.id}`}>
                <BsFillEyeFill
                  style={{
                    color: "#0A3453",
                    fontSize: "18px",
                    marginRight: "10px",
                  }}
                />
              </Link>
            </Tooltip>
            {currentUserPermissions.includes("three_card_status_update") ? (
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
                    style={{backgroundColor: "lightgray"}}
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
  const fetchThreeCardList = async (params: any) => {
    params = {
      ...params,
    };
    return await getThreeCardList(params);
  };
  return (
    <div>
      <CRUDDataTable
        draw={draw}
        entity="50/50 Trading"
        fetchDataFunction={fetchThreeCardList}
        isActionPerform={isActionPerform}
        createModal={
          <ThreeCardTradingAddModal
            threeCardGroup={threeCardGroup}
            isEdit={isEdit}
            title="50/50 Trading"
            onClose={() => {
              setIsEdit(false);
              setEditId(null);
              setThreeCardGroup({});
            }}
            onSubmit={() => {
              setIsEdit(false);
              setEditId(null);
              setThreeCardGroup({});
              setDraw(draw + 1);
            }}
          />
        }
        columns={columns}
        sortOrder="id"
        isButtonShown={!!currentUserPermissions.includes("three_card_create")}
        rowKey="id"
        isCreateModalVisible={isCreateModalVisible}
        setCreateModalVisibility={setCreateModalVisibility}
        isAddGroupTrade={false}
      />
    </div>
  );
};

export default ThreeCardTrading;
