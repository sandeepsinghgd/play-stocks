import { Tooltip } from "antd";
import { useState } from "react";
import { BsHash } from "react-icons/bs";
import { RiStickyNoteFill } from "react-icons/ri";
import { getActivityLogs } from "../../api/activityLog";
import CRUDDataTable from "../../components/DataTable/dataTable";

const ActivityLog = () => {
  const [draw, setDraw] = useState(0); // eslint-disable-line
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
      title: <strong>User</strong>,
      dataIndex: "first_name",
      key: "first_name",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.user?.first_name} {record?.user?.last_name}
          </>
        );
      },
    },
    {
      title: <strong>Action</strong>,
      dataIndex: "operation_type",
      key: "operation_type",
      sorter:true,
    },
    {
      title: <strong>Date</strong>,
      dataIndex: "created_at",
      key: "created_at",
      sorter: true,
    },
    {
      title: <strong>Module</strong>,
      dataIndex: "modules",
      key: "modules",
      sorter:true,
    },
    {
      title: <strong>Description</strong>,
      dataIndex: "description",
      key: "description",
      render: (text: any, record: any, value: any) => {
        return (
          <>
            <Tooltip
              title={`${record.description}`}
              key={"#0A3453"}
              color={"#0A3453"}
            >
              <RiStickyNoteFill
                style={{
                  color: "#0A3453",
                  fontSize: "18px",
                  marginRight: "10px",
                }}
              />
            </Tooltip>
          </>
        );
      },
    },
  ];

  const fetchActivityLogs = async (params: any) => {
    params = {
      ...params,
    };
    return await getActivityLogs(params);
  };
  return (
    <div>
      <CRUDDataTable
        draw={draw}
        entity="Activity Logs"
        columns={columns}
        fetchDataFunction={fetchActivityLogs}
        isButtonShown={false}
        rowKey="id"
        sortOrder="id"
      />
    </div>
  );
};

export default ActivityLog;
