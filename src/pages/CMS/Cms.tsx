import { message, Modal, Switch, Tooltip, Typography } from "antd";
import React, { useState } from "react";
import { AiFillEdit, AiOutlineCheck, AiFillDelete } from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc";
import CRUDDataTable from "../../components/DataTable/dataTable";
import CardComp from "./CardComp";
import { deleteCMSApi, getCmsList, updateCmsStatus } from "../../api/cms";
import { BsFillArrowLeftSquareFill, BsHash } from "react-icons/bs";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { findCommonElements } from "../../utils/helpers";
import { Link } from "react-router-dom";
const { confirm } = Modal;

function Cms(props: any) {
  const [draw, setDraw] = useState(0);
  const [isCreateModalVisible, setCreateModalVisibility] = useState(false);
  const [template, setTemplate] = useState<any>(false);
  const [isActionPerform, setActionPerform] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [user, setUser] = useState({});
  const { currentUserPermissions } = useTypedSelector((state) => state.user);
  const checkPermissions = ["page_update", "page_delete", "page_status_update"];

  const { Paragraph } = Typography;

  const updateStatus = async (status: any, id: any) => {
    try {
      const payload = {
        id,
        status,
      };
      const response = await updateCmsStatus(payload);
      if (response.data.success) {
        message.success(response.data.message);

        // setCheck(payload.status);
        setActionPerform(true);
      }
    } catch (err: any) {
      message.error(err);
    }
  };

  const deleteCMS = async (id: any) => {
    try {
      const response = await deleteCMSApi(id);
      if (response.data.success) {
        message.success(response.data.message);
        setDraw(draw + 1);
        setDraw(0);
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
      title: <strong>Title</strong>,
      dataIndex: "title",
      key: "title",
      sorter: true,
    },
    {
      title: <strong>Slug</strong>,
      dataIndex: "slug",
      key: "slug",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <Paragraph>{record?.slug}</Paragraph>;
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
          // placeholder: 'Select a status',
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
      title: <strong>Display Type</strong>,
      dataIndex: "display_type",
      key: "display_type",
      render: (text: any, record: any, value: any) => {
        let displayType;
        switch (record.display_type) {
          case 1:
            displayType = "None";
            break;
          case 2:
            displayType = "Footer";
            break;
          default:
            displayType = "N/A";
            break;
        }
        return (
          <>
            {/* {record.display_type === 1 ? (<p>Header</p>) : (<p>Footer</p>)} */}
            {displayType}
          </>
        );
      },
    },
    {
      title: findCommonElements(checkPermissions, currentUserPermissions) && (
        <strong>Action</strong>
      ),
      dataIndex: "actions",
      key: "actions",
      render: (text: any, record: any, value: any) => {
        return (
          findCommonElements(checkPermissions, currentUserPermissions) && (
            <div className="d-flex">
              {currentUserPermissions.includes("page_update") ? (
                <Tooltip title="Edit">
                  <AiFillEdit
                    style={{
                      color: "#0A3453",
                      fontSize: "16px",
                      marginRight: "10px",
                    }}
                    onClick={() => {
                      setTemplate(!template);
                      setIsEdit(true);
                      setEditId(record.id);
                      setUser(record);
                    }}
                  />
                </Tooltip>
              ) : null}

              <Tooltip title="Delete">
                {currentUserPermissions.includes("page_delete") && (
                  <AiFillDelete
                    style={{
                      color: "#0A3453",
                      fontSize: "16px",
                      marginRight: "10px",
                    }}
                    onClick={() => {
                      confirm({
                        title: "Are you sure, you want to delete the CMS Page?",
                        onOk: () => {
                          deleteCMS(record.id);
                        },
                        onCancel: () => {},
                      });
                    }}
                  />
                )}
              </Tooltip>

              {currentUserPermissions.includes("page_status_update") ? (
                record.status === 1 ? (
                  <Tooltip title="Inactive">
                    <Switch
                      size="small"
                      style={{ backgroundColor: "#0A3453" }}
                      defaultChecked={record.status}
                      checked={record.status}
                      onChange={(value: any) =>
                        confirm({
                          title: "Do you want to inactivate the CMS Page?",
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
                          title: "Do you want to activate the CMS Page?",

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

  const fetchCmsPageList = async (params: any) => {
    params = {
      ...params,
    };
    const res = await getCmsList(params);
    return res;
  };
  return (
    <>
      {currentUserPermissions.includes("page_create") && (
        <Link
          to="/cms"
          className="mb-4"
          onClick={() => {
            setTemplate(!template);
            setEditId(null);
            setUser({});
          }}
        >
          {template ? (
            <BsFillArrowLeftSquareFill
              size={35}
              className="mb-3"
              style={{ color: "#0A3453" }}
            />
          ) : (
            ""
          )}
        </Link>
      )}

      <div style={{ position: "relative", display: "flex" }}>
        {template ? (
          <div
            style={{
              position: "absolute",
              width: "100%",
              transform: template ? "translateX(0)" : "translateX(100%)",
              transition: "ease",
              transitionDuration: "1s",
              overflowX: "hidden",
            }}
          >
            <CardComp
              setTemplate={setTemplate}
              template={template}
              setCreateModalVisibility={setCreateModalVisibility}
              isEdit={isEdit}
              editId={editId}
              user={user}
              setEditId={setEditId}
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
            transform: template ? "translateX(-120%)" : "translateX(0)",
            transition: "ease",
            transitionDuration: "1s",
            overflowX: "hidden",
          }}
        >
          <CRUDDataTable
            draw={draw}
            entity="CMS Pages"
            fetchDataFunction={fetchCmsPageList}
            columns={columns}
            sortOrder="id"
            isButtonShown={true}
            rowKey="id"
            isCreateModalVisible={isCreateModalVisible}
            setCreateModalVisibility={setCreateModalVisibility}
            isActionPerform={isActionPerform}
            setCreateNew={setTemplate}
          />
        </div>
      </div>
    </>
  );
}

export default Cms;
