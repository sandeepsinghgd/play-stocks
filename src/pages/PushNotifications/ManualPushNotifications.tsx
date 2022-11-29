import React, { useState } from "react";
import { BsHash } from "react-icons/bs";
import { getPushNotifications } from "../../api/pushNotifications";
import CRUDDataTable from "../../components/DataTable/dataTable";
import PushNotificationModal from "../../components/Modals/PushNotificationModal";
import { useTypedSelector } from "../../hooks/useTypeSelector";

const ManualPushNotifications = () => {
  const [draw, setDraw] = useState(0);
  const [isEdit, setIsEdit] = useState(false); //eslint-disable-line
  const [editId, setEditId] = useState(null); //eslint-disable-line
  const [isCreateModalVisible, setCreateModalVisibility] = useState(false);
  const [Notification, setNotification] = useState({});
  const [isActionPerform, setActionPerform] = useState(false); //eslint-disable-line
  const { currentUserPermissions } = useTypedSelector((state) => state.user);

  const columns = [
    {
      title: (
        <strong>
          <BsHash />
        </strong>
      ),

      dataIndex: "index",
      key: "index",width: "10%",
    },
    {
      title: <strong>Title</strong>,
      dataIndex: "title",
      key: "title",
      width: "40%",
      sorter: true,
    },
    {
      title: <strong>Message</strong>,
      dataIndex: "description",
      key: "description",
      width: "50%",
    },
  ];

  const fetchPushNotifications = async (params: any) => {
    params = {
      ...params,
    };
    return await getPushNotifications(params);
  };
  return (
    <>
      <CRUDDataTable
        draw={draw}
        entity="Push Notifications"
        fetchDataFunction={fetchPushNotifications}
        isActionPerform={isActionPerform}
        createModal={
          <PushNotificationModal
            Notification={Notification}
            title={"Create Notification"}
            onClose={() => {
              setIsEdit(false);
              setEditId(null);
              setNotification({});
            }}
            onSubmit={() => {
              setIsEdit(false);
              setEditId(null);
              setNotification({});
              setDraw(draw + 1);
            }}
            onSuccess={() => setDraw(draw + 1)}
          />
        }
        columns={columns}
        sortOrder="id"
        isButtonShown={
          !!currentUserPermissions.includes("send_push_notification")
        }
        isCreateModalVisible={isCreateModalVisible}
        setCreateModalVisibility={setCreateModalVisibility}
        rowKey="id"
      />
    </>
  );
};

export default ManualPushNotifications;
