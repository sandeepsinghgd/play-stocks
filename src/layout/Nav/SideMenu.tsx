import { Layout, Menu } from "antd";
import React, { useEffect } from "react";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import routes from "../../routes";
import logo from "../../assets/images/real.png";
import smallLogo from "../../assets/images/Play-stocks-app-logo.png";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMenyKey, toggleSideBarVisibility } from "../../redux/actions/ui";
import { findCommonElements } from "../../utils/helpers";
import "../../styles/sideMenu.scss";

const { Sider } = Layout;
const { SubMenu } = Menu;

interface ISideMenuProps {
  currentPage?: any;
}

const SideMenu: React.FunctionComponent<ISideMenuProps> = (props) => {
  const matches = window.matchMedia("(max-width: 520px)").matches;
  const { isSidebarVisible } = useTypedSelector((state) => state.ui);
  const { menuKey } = useTypedSelector((state) => state.ui);
  const { currentUserPermissionModules } = useTypedSelector(
    (state) => state.user
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const arrVars = location.pathname.split("/");
    const openMenu = menuKey.length === 0 ? [`/${arrVars[1]}`] : menuKey;
    dispatch(setMenyKey(openMenu));
    onOpenChange(openMenu);
  }, []);

  const handleClick = (e: any) => {
    dispatch(setMenyKey(menuKey));
    history.push(e.key);
    if (matches) {
      dispatch(toggleSideBarVisibility());
    }
  };

  const onOpenChange = (openKeys: string[]) => {
    dispatch(setMenyKey(openKeys.slice(-1)));
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={isSidebarVisible}
      className={"sidebar"}
    >
      <div className="logo">
        {isSidebarVisible ? (
          <img src={smallLogo} className="smallLogo" alt="smallLogo" />
        ) : (
          <img src={logo} alt="logo" />
        )}
      </div>
      <Menu
        mode="inline"
        onClick={handleClick}
        onOpenChange={onOpenChange}
        defaultOpenKeys={menuKey}
        openKeys={menuKey}
        defaultSelectedKeys={[location.pathname]}
      >
        {routes &&
          routes.length > 0 &&
          routes.map((route: any) => {
            return route.isSubMenu && route.components?.length
              ? findCommonElements(
                  route.module,
                  currentUserPermissionModules
                ) && (
                  <SubMenu
                    key={route.path}
                    icon={route.icon}
                    title={route.title}
                  >
                    {route.components.map(
                      (subRoute: any) =>
                        subRoute.isSubMenuShown &&
                        currentUserPermissionModules?.includes(
                          subRoute.module
                        ) && (
                          <Menu.Item key={route.path + subRoute.path}>
                            {subRoute.title}
                          </Menu.Item>
                        )
                    )}
                  </SubMenu>
                )
              : route.isMenuShown &&
                Object.prototype.hasOwnProperty.call(route, "module")
              ? currentUserPermissionModules?.includes(route.module) && (
                  <Menu.Item key={route.path} icon={route.icon}>
                    {route.title}
                  </Menu.Item>
                )
              : route.isMenuShown && (
                  <Menu.Item key={route.path} icon={route.icon}>
                    {route.title}
                  </Menu.Item>
                );
          })}
      </Menu>
    </Sider>
  );
};

export default SideMenu;
