import { message, Modal, Switch, Tooltip } from "antd";
import { useState } from "react";

import { VscChromeClose } from "react-icons/vsc";

import { AiFillEdit, AiOutlineCheck } from "react-icons/ai";
import { getPlans, changePlanStatus } from "../../api/plan";
import CRUDDataTable from "../../components/DataTable/dataTable";
import EditModalForm from "../../components/Modals/PlanEditModal";
import { BsHash } from "react-icons/bs";
import { findCommonElements } from "../../utils/helpers";
import { useTypedSelector } from "../../hooks/useTypeSelector";

const { confirm } = Modal;

const Plan = () => {
  const [isCreateModalVisible, setCreateModalVisibility] = useState(false);
  const [plan, setPlan] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [draw, setDraw] = useState(0);
  const [isActionPerform, setActionPerform] = useState(false);
  const { currentUserPermissions } = useTypedSelector((state) => state.user);
  const checkPermissions = ["plan_update", "plan_status_update"];

  const updateStatus = async (status: any, id: any) => {
    try {
      const payload = {
        id,
        status,
      };
      const response = await changePlanStatus(payload);
      if (response.data.success) {
        message.success(response.data.message);
        setDraw(draw + 1);
        setDraw(0);
      }
    } catch (err: any) {
      message.error(err.response.data.message);
    }
  };

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
      title: <strong>Plan Name</strong>,
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
      title: <strong>Coins</strong>,
      dataIndex: "coins",
      key: "coins",
      sorter: true,
    },
    {
      title: <strong>Status</strong>,
      dataIndex: "status",
      key: "status",
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
          findCommonElements(checkPermissions, currentUserPermissions) && (
            <div className="flex">
              {currentUserPermissions.includes("plan_update") ? (
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
                      setPlan(record);
                      setCreateModalVisibility(true);
                    }}
                  />
                </Tooltip>
              ) : null}
              {currentUserPermissions.includes("plan_status_update") ? (
                record.status === 1 ? (
                  <Tooltip title="Inactive">
                    <Switch
                      size="small"
                      defaultChecked={record.status}
                      checked={record.status}
                      onChange={(value: any) =>
                        confirm({
                          title: "Do you want to inactivate the Plan?",
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
                      defaultChecked={record.status}
                      checked={record.status}
                      onChange={(value: any) =>
                        confirm({
                          title: "Do you want to activate the Plan?",

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

  const fetchPlans = async (params: any) => {
    params = {
      ...params,
    };
    return await getPlans(params);
  };

  return (
    <>
      <CRUDDataTable
        draw={draw}
        entity="Plans"
        fetchDataFunction={fetchPlans}
        isActionPerform={isActionPerform}
        createModal={
          <EditModalForm
            plan={plan}
            isEdit={isEdit}
            title={editId ? "Edit Plan" : "Add Plan"}
            onClose={() => {
              setIsEdit(false);
              setEditId(null);
              setPlan({});
            }}
            onSubmit={() => {
              setIsEdit(false);
              setEditId(null);
              setPlan({});
              setDraw(draw + 1);
            }}
          />
        }
        columns={columns}
        sortOrder="id"
        isButtonShown={!!currentUserPermissions.includes("plan_create")}
        isCreateModalVisible={isCreateModalVisible}
        setCreateModalVisibility={setCreateModalVisibility}
        rowKey="id"
      />
    </>
  );
};
export default Plan;
