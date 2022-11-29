import { Tag, Tooltip, Space, Button, message, Modal, Switch } from "antd";
import { useState } from "react";
import {
  AiFillEdit,
  AiOutlineCheck,
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import { BsFillEyeFill, BsHash } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";
import { getRoles, createRole, updateRole, roleStatus } from "../../api/role";
import CRUDDataTable from "../../components/DataTable/dataTable";
import DrawerComponent from "../../components/Drawer/DrawerComponent";
import AddRole from "../../components/forms/AddRole";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { findCommonElements } from "../../utils/helpers";
import "../../styles/_roles.scss";

const { confirm } = Modal;

const Roles = (props: any) => {
  const [isCreateModalVisible, setCreateModalVisibility] = useState(false);
  const [isEdit, setIsEdit] = useState(false); //eslint-disable-line
  const [editId, setEditId] = useState(null); //eslint-disable-line
  const [draw, setDraw] = useState(0);
  const [userPermissions, setUserPermissions] = useState<any>([]);
  const [inputError, setInputError] = useState(false);
  const [permissionError, setPermissionError] = useState(false);
  const [isActionPerform, setActionPerform] = useState(false);
  const { currentUserPermissions } = useTypedSelector((state) => state.user);
  const [dynamicInputError, setDynamicInputError] = useState<any>();
  const [inputValue, setInputValue] = useState<any>("");

  const [roleData, setRoleData] = useState<any>({
    roleName: "",
    rolestatus: 1,
    rolePermissions: [],
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const checkPermissions = ["role_update", "role_status_update"];
  const updateStatus = async (status: any, id: any) => {
    try {
      const payload = {
        id,
        status,
      };
      const response = await roleStatus(payload);
      if (response.data.success) {
        message.success(response.data.message);
        setDraw(draw + 1);
        setDraw(0);
      }
    } catch (error: any) {
      message.error(error.response.data.message);
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
      dataIndex: "name",
      key: "name",
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
      title: <strong>permissions</strong>,
      dataIndex: "permissions",
      key: "permissions",
      render: (text: any, record: any, value: any) => {
        return (
          <>
            <BsFillEyeFill
              onClick={() => {
                setUserPermissions(record.permissions);
                setIsModalVisible(true);
              }}
            />
          </>
        );
      },
      responsive: ["xs"],
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
              {currentUserPermissions.includes("role_update") ? (
                <Tooltip title="Edit">
                  <AiFillEdit
                    style={{
                      color: "#0A3453",
                      fontSize: "16px",
                      marginRight: "10px",
                    }}
                    onClick={() => {
                      const selectedPermissions = record.permissions.map(
                        (p: any) => `${p.id}_${p.module_id}`
                      );
                      setRoleData({
                        roleName: record.name,
                        rolestatus: record.status,
                        rolePermissions: selectedPermissions,
                      });
                      setIsEdit(true);
                      setEditId(record.id);
                      setCreateModalVisibility(true);
                    }}
                  />
                </Tooltip>
              ) : null}
              {currentUserPermissions.includes("role_status_update") ? (
                record.status === 1 ? (
                  <Tooltip title="Inactive">
                    <Switch
                      size="small"
                    style={{ backgroundColor: "#0A3453" }}
                      defaultChecked={record.status}
                      checked={record.status}
                      onChange={(value: any) =>
                        confirm({
                          title: "Do you want to inactivate the Role?",
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
                          title: "Do you want to activate the Role?",

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
  const fetchRoles = async (params: any) => {
    params = {
      ...params,
    };
    return await getRoles(params);
  };
  const getRolePermissions = (permissions: any) => {    
       const arr = permissions.map((permission: any) => {   
           if (isNaN(permission)) { 
             return ( 
               permission.indexOf("_") > -1 && parseInt(permission.split("_")[0]) 
             );
           }
           return; // eslint-disable-line
         });

    return arr.filter((v: any) => v !== undefined);
  };

  const create = async (values: any) => {
    try {
      // setDynamicInputError("");
      const payload = {
        name: values.roleName,
        status: values.rolestatus,
        permission: getRolePermissions(values.rolePermissions),
      };
      const response = await createRole(payload);

      if (response.data.success) {
        message.success(response.data.message);
        setCreateModalVisibility(false);
        setRoleData({
          roleName: "",
          rolestatus: 1,
          rolePermissions: [],
        });
        setDraw(draw + 1);
        setDraw(0);
      }
    } catch (err: any) {
      message.error(err);
      if (err.response.status === 422) {
        for (const key in err.response.data.errors) {
          setInputError(true);

          setDynamicInputError(err.response.data.errors[key][0]);

          // setInputError(err.response.data.errors[key][0]);
        }
      }
    }
  };

  const update = async (values: any, id: any) => {
    try {
      const payload = {
        name: values.roleName,
        status: values.rolestatus,
        permission: getRolePermissions(values.rolePermissions),
      };
      const response = await updateRole(id, payload);

      if (response.data.success) {
        message.success(response.data.message);
        setCreateModalVisibility(false);
        setDraw(draw + 1);
        setDraw(0);
      }
    } catch (err: any) {
      message.error(err);
    }
  };

  return (
    <>
      <Modal
        title="Permissions"
        visible={isModalVisible}
        onOk={() => {
          setIsModalVisible(false);
        }}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      >
        {userPermissions.map((permission: any, index: any) => {
          return (
            <Tag color="#0A3453" key={index}>
              {permission.name}
            </Tag>
          );
        })}
      </Modal>
      <CRUDDataTable
        draw={draw}
        entity="Roles"
        fetchDataFunction={fetchRoles}
        isActionPerform={isActionPerform}
        expandable={{
          expandedRowRender: (record: any) => (
            <div style={{ paddingLeft: 40 }}>
              {record?.permissions.map((permission: any) => (
                <Tag
                  key={permission.id}
                  style={{
                    fontSize: 13,
                    color: "#fff",
                    backgroundColor: "#0A3453",
                    marginBottom: 6,
                    marginRight: 8,
                  }}
                >
                  {permission.name}
                </Tag>
              ))}
            </div>
          ),
          expandIcon: ({ expanded, onExpand, record }: any) =>
            expanded ? (
              <AiOutlineMinusSquare onClick={(e) => onExpand(record, e)} />
            ) : (
              <Tooltip placement="top" title="Permissions">
                <AiOutlinePlusSquare onClick={(e) => onExpand(record, e)} />
              </Tooltip>
            ),
        }}
        createModal={
          <DrawerComponent
            title={`${editId ? "Edit" : "New"} Role`}
            visible={isCreateModalVisible}
            onClose={() => {
              setIsEdit(false);
              setCreateModalVisibility(false);
              setDynamicInputError("");
              setInputError(false);
              setPermissionError(false);
              setEditId(null);
              setInputValue("");
              setRoleData({
                roleName: "",
                rolestatus: 1,
                rolePermissions: [],
              });
            }}
            destroyOnClose={true}
            extra={
              <Space>
                {editId ? (
                  <Button
                    type="primary"
                    onClick={() => {
                      const value1 = roleData?.roleName;
                      const value2 = roleData?.rolePermissions;
                      if (value1 === "") {
                        setInputError(true);
                      }
                      if (value2.length === 0) {
                        setPermissionError(true);
                      } else {
                        update(roleData, editId);
                      }
                    }}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    onClick={() => {
                      setRoleData(roleData);
                      const value1 = roleData.roleName;
                      const value2 = roleData.rolePermissions;

                      if (value1 === "") {
                        setInputError(true);
                      }
                      if (value2.length === 0) {
                        setPermissionError(true);
                      } else {
                        create(roleData);
                      }
                    }}
                  >
                    Add
                  </Button>
                )}
              </Space>
            }
          >
            <AddRole
              roleData={roleData}
              setRoleData={setRoleData}
              inputError={inputError}
              permissionError={permissionError}
              setInputError={setInputError}
              setPermissionError={setPermissionError}
              setDynamicInputError={setDynamicInputError}
              dynamicInputError={dynamicInputError}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          </DrawerComponent>
        }
        isCreateModalVisible={isCreateModalVisible}
        setCreateModalVisibility={setCreateModalVisibility}
        columns={columns}
        sortOrder="id"
        isButtonShown={!!currentUserPermissions.includes("role_create")}
        rowKey="id"
      />
    </>
  );
};
export default Roles;
