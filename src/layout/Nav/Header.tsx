import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Popover,
  Dropdown,
  message,
  Tooltip,
  Badge,
} from "antd";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { useDispatch } from "react-redux";
import { toggleSideBarVisibility } from "../../redux/actions/ui";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { IoMdNotifications } from "react-icons/io";
import { BsPersonCircle } from "react-icons/bs";
import Notification from "../../components/notifications/Notification";
import { RiUserSettingsFill } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { logout } from "../../api/auth";
import { MdHistory } from "react-icons/md";
import { getNotifications, readAllNotifications } from "../../api/notification";

const { Header } = Layout;

function SlickTopMenu() {
  const { isSidebarVisible } = useTypedSelector((state) => state.ui);
  const { currentUserPermissions } = useTypedSelector((state) => state.user);
  const [notificationCount, setNotificationCount] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  const onClickProfile = (e: any) => {
    history.push("/account-profile");
  };

  const onLogout = async () => {
    try {
      const response = await logout();
      if (response.status === 200 && response.data.success) {
        message.success(response.data.message);
        history.push("/login");
      }
    } catch (err: any) {
      if (err.response?.data) {
        if (err.response.status === 401) {
          message.error("Something went wrong");
        }
      }
    }
  };
  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<RiUserSettingsFill />} onClick={onClickProfile}>
        Account Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<AiOutlineLogout />} onClick={onLogout}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  const onMenuClick = () => {
    dispatch(toggleSideBarVisibility());
  };

  const loadMoreData = async () => {
    const response = await getNotifications();
    const notification = response.data.count;
    setNotificationCount(notification);
  };
  const handleClick = async () => {
    setNotificationCount(0);
    return await readAllNotifications();
  };

  useEffect(() => {
    loadMoreData();
  }, []);
  return (
    <Header
      className={`topNav ${isSidebarVisible ? "sidenavClose" : "sidenavOpen"}`}
      style={{ color: "black" }}
    >
      {/* <img src={logo} alt="logo" className="d-block d-sm-none" style={{width:"100px"}}/> */}
      {React.createElement(
        isSidebarVisible ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: "trigger",
          onClick: onMenuClick,
        }
      )}
      <ul className="topNav-items">
        <li>
          <Popover
            className="notificationPopover"
            placement="bottomRight"
            content={() => (
              <Notification
                handleClick={handleClick}
                notificationCount={notificationCount}
              />
            )}
            // trigger="click"
          >
            <Button
              type="link"
              size="large"
              icon={
                <Badge
                  size="small"
                  count={notificationCount}
                  overflowCount={99}
                  offset={[3, 1]}
                >
                  <IoMdNotifications
                    size={"20px"}
                    style={{ color: "#0A3453" }}
                  />
                </Badge>
              }
            />
          </Popover>
        </li>
        {currentUserPermissions.includes("view_activity_log") && (
          <li>
            <Tooltip
              title="Activity Log"
              className="notificationPopover"
              placement="bottomRight"
              key={"#0A3453"}
              color={"#0A3453"}

              // trigger="click"
            >
              <Button
                type="link"
                size="large"
                icon={
                  <MdHistory
                    size={"20px"}
                    onClick={() => history.push("/activity-logs")}
                  />
                }
              />
            </Tooltip>
          </li>
        )}
        <li>
          <Dropdown overlay={menu} trigger={["click"]}>
            <a
              className="ant-dropdown-link profileDropDown"
              onClick={(e) => e.preventDefault()}
            >
              <BsPersonCircle size={"18px"} />
            </a>
          </Dropdown>
        </li>
      </ul>
    </Header>
  );
}

export default SlickTopMenu;
