import { Typography, Avatar, Tag, message, Modal, Tooltip, Switch } from "antd";
import React,{ useState } from "react";
import { AiFillEdit, AiOutlineCheck } from "react-icons/ai";
import { BsHash } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";
import { adminUserStatus, getAdminUsers } from "../../api/adminUser";
import CRUDDataTable from "../../components/DataTable/dataTable";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { findCommonElements } from "../../utils/helpers";
import EditModalForm from "../../components/Modals/AdminModal";

const { Paragraph } = Typography;
const { confirm } = Modal;

const AdminUsers = (props: any) => {
  const [isCreateModalVisible, setCreateModalVisibility] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [user, setUser] = useState({});
  const [draw, setDraw] = useState(0);
  const [isActionPerform, setActionPerform] = useState(false);
  const { currentUserPermissions } = useTypedSelector((state) => state.user);
  const checkPermissions = ["user_update", "user_status_update"];

  const updateStatus = async (status: any, id: any) => {
    try {
      const payload = {
        id,
        status,
      };
      const response = await adminUserStatus(payload);
      if (response.data.success) {
        message.success(response.data.message);
        setActionPerform(true);
      }
    } catch (err: any) {
      message.error(err);
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
      title: <strong>Name</strong>,
      dataIndex: "first_name",
      key: "first_name",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        let initials;
        if (record.first_name !== null && record.last_name !== null) {
          initials =
            record.first_name.slice(0, 1) + record.last_name.slice(0, 1);
        } else {
          initials = "";
        }
        return (
          <div className="avtarName">
            <Avatar>{initials.toUpperCase()}</Avatar>
            <Paragraph>
              {record.first_name} {record.last_name}
            </Paragraph>
          </div>
        );
      },
    },
    {
      title: <strong>Email</strong>,
      dataIndex: "email",
      key: "email",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <Paragraph copyable>{record.email}</Paragraph>;
      },
    },
    {
      title: <strong>Phone Number</strong>,
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: <strong>Role</strong>,
      dataIndex: "role",
      key: "role",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <Tag color="blue">{record?.role && record.role.name}</Tag>;
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
      title: findCommonElements(checkPermissions, currentUserPermissions) && (
        <strong>Action</strong>
      ),
      dataIndex: "action",
      key: "action",
      render: (text: any, record: any, value: any) => {
        return (
          findCommonElements(checkPermissions, currentUserPermissions) && (
            <div className="d-flex">
              {currentUserPermissions.includes("user_update") ? (
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
                      setUser(record);
                      setCreateModalVisibility(true);
                    }}
                  />
                </Tooltip>
              ) : null}        
              {currentUserPermissions.includes("user_status_update") ? (
                record.status === 1 ? (
                  <Tooltip title="Inactive">
                    <Switch
                      size="small"
                    style={{ backgroundColor: "#0A3453" }}
                      defaultChecked={record.status}
                      checked={record.status}
                      onChange={(value: any) =>
                        confirm({
                          title: "Do you want to inactivate the User?",
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
                          title: "Do you want to activate the User?",

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

  const fetchAdminUsers = async (params: any) => {
    params = {
      ...params,
    };
    return await getAdminUsers(params);
  };

  return (
    <>
      <CRUDDataTable
        draw={draw}
        entity="Admin Users"
        fetchDataFunction={fetchAdminUsers}
        isActionPerform={isActionPerform}
        createModal={
          <EditModalForm
            user={user}
            isEdit={isEdit}
            setActionPerform={setActionPerform}
            title={`${editId ? "Update" : "Create"} User`}
            onClose={() => {
              setIsEdit(false);
              setEditId(null);
              setUser({});
            }}
            onSubmit={() => {
              setIsEdit(false);
              setEditId(null);
              setUser({});
              setDraw(draw + 1);
            }}
            onSuccess={() => setDraw(draw + 1)}
          />
        }
        columns={columns}
        sortOrder="id"
        isButtonShown={!!currentUserPermissions.includes("user_create")}
        isCreateModalVisible={isCreateModalVisible}
        setCreateModalVisibility={setCreateModalVisibility}
        rowKey="id"
      />
    </>
  );
};
export default AdminUsers;
