import { Tooltip, Typography } from "antd";
import React, { useState } from "react";
import { BsHash } from "react-icons/bs";
import { RiStickyNoteFill } from "react-icons/ri";
import { getInquiries } from "../../api/inquiries";
import CRUDDataTable from "../../components/DataTable/dataTable";

const { Paragraph } = Typography;

function Inquires() {
  const [draw, setDraw] = useState(0); //eslint-disable-line
  const [isCreateModalVisible, setCreateModalVisibility] = useState(false);

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
      title: <strong>Email</strong>,
      dataIndex: "email",
      key: "email",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <Paragraph copyable>{record.email}</Paragraph>;
      },
    },
    {
      title: <strong>Mobile No.</strong>,
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: <strong>Subject</strong>,
      dataIndex: "subject",
      key: "subject",
      sorter: true,
    },
    // {
    // title: <strong>Status</strong>,
    // dataIndex: "status",
    // key: "status",
    // },
    // {
    // title: <strong>Active</strong>,
    // dataIndex: "is_active",
    // key: "is_active",
    // },
    {
      title: <strong>Notes</strong>,
      dataIndex: "message",
      key: "message",
      render: (text: any, record: any, value: any) => {
        const leng = record.message.split(" ").filter((word: any) => word !== "").length;
        return (
          <div className="demo">
            <Tooltip
              title={`${record.message}`}
              key={"#0A3453"}
              color={"#0A3453"}
              overlayClassName={`${leng > 15 ? "fixedHeight" : ""}`}
            >
              <RiStickyNoteFill
                style={{
                  color: "#0A3453",
                  fontSize: "18px",
                  marginRight: "10px",
                }}
              />
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: <strong>Created At</strong>,
      dataIndex: "created_at",
      key: "created_at",
      sorter: true,
    },
    // {
    //   title: <strong>Updated At</strong>,
    //   dataIndex: "updated_at",
    //   key: "updated_at",
    // },
  ];

  const fetchInquiryList = async (params: any) => {
    params = {
      ...params,
    };
    return await getInquiries(params);
  };

  return (
    <div>
      <CRUDDataTable
        draw={draw}
        entity="Inquiries"
        fetchDataFunction={fetchInquiryList}
        // createModal={
        // <GroupTradingAddModal
        // group={group}
        // isEdit={isEdit}
        // title={editId ? "Update Group Trading" : "Create Group Trading"}
        // onClose={() => {
        // setIsEdit(false);
        // setEditId(null);
        // setGroup({});
        // }}
        // onSubmit={() => {
        // setIsEdit(false);
        // setEditId(null);
        // setGroup({});
        // setDraw(draw + 1);
        // }}
        /// >
        // }
        columns={columns}
        sortOrder="id"
        isButtonShown={false}
        rowKey="id"
        isCreateModalVisible={isCreateModalVisible}
        setCreateModalVisibility={setCreateModalVisibility}
      />
    </div>
  );
}

export default Inquires;
