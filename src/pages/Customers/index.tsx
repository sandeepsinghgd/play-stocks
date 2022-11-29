import { Avatar, Typography, message, Modal, Tooltip, Switch } from "antd";
import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { BsHash } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { customerStatus, getCustomers } from "../../api/customer";
import CRUDDataTable from "../../components/DataTable/dataTable";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { findCommonElements } from "../../utils/helpers";
import CustomersAddEditModal from "../../components/Modals/CustomersAddEditModal";
import "../../styles/_customers.scss";
const { Paragraph } = Typography;
const { confirm } = Modal;

function Customers() {
  const [draw, setDraw] = useState(0);
  const [isCreateModalVisible, setCreateModalVisibility] = useState(false);
  const [isEdit, setIsEdit] = useState<any>(false);
  const [editId, setEditId] = useState(null);
  const [user, setUser] = useState({});
  const [isActionPerform, setActionPerform] = useState(false);
  const { currentUserPermissions } = useTypedSelector((state) => state.user);
  const checkPermissions = ["customer_status_update"];
  const updateStatus = async (status: any, id: any) => {
    try {
      const payload = {
        id,
        status,
      };
      const response = await customerStatus(payload);
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
        if (record?.first_name !== null && record?.last_name !== null) {
          initials =
            record?.first_name.slice(0, 1) + record?.last_name.slice(0, 1);
        } else {
          initials = "";
        }
        return (
          <div className="avtarName">
            <Link to={`customers/${record?.id}`}>
              <Avatar>{initials.toUpperCase()}</Avatar>
              <Paragraph className="nameDisplay">
                {record?.first_name !== null && record?.last_name !== null ? (
                  <>
                    {record?.first_name} {record?.last_name}
                  </>
                ) : (
                  <>N/A</>
                )}
              </Paragraph>
            </Link>  
          </div>
        );
      },
    },
    {
      title: <strong>Nick Name</strong>,
      dataIndex: "nick_name",
      key: "nick_name",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return record?.nick_name !== null ? (
          <>{record?.nick_name}</>
        ) : (
          <>N/A</>
        );
      },
    },
    {
      title: <strong>Email</strong>,
      dataIndex: "email",
      key: "email",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return record?.email !== null ? (
          <Paragraph copyable>{record?.email}</Paragraph>
        ) : (
          <>N/A</>
        );
      },
    },
    {
      title: <strong>Phone Number</strong>,
      dataIndex: "phone",
      key: "phone",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return record?.phone !== null ? (
          <Paragraph >{record?.phone}</Paragraph>
        ) : (
          <>N/A</>
        );
      },
    },
    {
      title: <strong>Pin Set</strong>,
      dataIndex: "is_pin_set",
      key: "is_pin_set",
      filter: {
        paramName: "is_pin_set",
        label: "Is Pin Set",
        component: {
          name: "radio",
          fetchData: () => [
            { value: 1, displayText: "YES" },
            { value: 0, displayText: "NO" },
          ],
        },
      },
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record.is_pin_set == 1 ? <AiOutlineCheck /> : <VscChromeClose />}
          </>
        );
      },
    },
    {
      title: <strong>Verified</strong>,
      dataIndex: "is_mobile_verified",
      key: "is_mobile_verified",
      filter: {
        paramName: "is_mobile_verified",
        label: "Is Mobile Verified",
        component: {
          name: "radio",
          fetchData: () => [
            { value: 1, displayText: "YES" },
            { value: 0, displayText: "NO" },
          ],
        },
      },
      onFilter: (value: any, record: any) =>
        record.is_mobile_verified === value,
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record.is_mobile_verified === 1 ? (
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
      title: findCommonElements(checkPermissions, currentUserPermissions) && (
        <strong>Action</strong>
      ),
      dataIndex: "action",
      key: "action",
      render: (text: any, record: any, value: any) => {
        return currentUserPermissions.includes("customer_status_update") ? (
          record.status === 1 ? (
            <Tooltip title="Inactive">
              <Switch
                size="small"
                style={{ backgroundColor: "#0A3453" }}
                defaultChecked={record.status}
                checked={record.status}
                onChange={(value: any) =>
                  confirm({
                    title: "Do you want to inactivate the Customer?",
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
                    title: "Do you want to activate the Customer?",

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
        ) : null;
      },
    },
  ];

  const fetchCustomers = async (params: any) => {
    params = {
      ...params,
      // rows: 10,
    };

    const res = await getCustomers(params);
    return res;
  };

  return (
    <>
      <CRUDDataTable
        draw={draw}
        entity="Customers"
        columns={columns}
        isActionPerform={isActionPerform}
        createModal={
          <CustomersAddEditModal
            user={user}
            isEdit={isEdit}
            title={editId ? "Update Customer" : "Create Customer"}
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
          />
        }
        sortOrder="id"
        isButtonShown={false}
        isCreateModalVisible={isCreateModalVisible}
        setCreateModalVisibility={setCreateModalVisibility}
        fetchDataFunction={fetchCustomers}
        rowKey="id"
      />
    </>
  );
}

export default Customers;
