import { Layout } from "antd";
import { connect } from "react-redux";
import { useTypedSelector } from "../hooks/useTypeSelector";
import Header from "../layout/Nav/Header";
import SideMenu from "../layout/Nav/SideMenu";
import "../styles/_mainLayout.scss";

const { Content } = Layout;

function BasePage(props: any) {
  const { children } = props;
  const { isSidebarVisible } = useTypedSelector((state) => state.ui);

  return (
    <div id="basePage">
      <Layout className="mainLayout">
        <SideMenu />
        <Layout
          className={`site-layout ${isSidebarVisible ? "isClose" : "isOpen"}`}
        >
          <Header />
          <div className="pageHeader">
            {/* <h1 className="pageTitle">{pageTitle ? pageTitle : pageName}</h1> */}
            {/* <BreadCrumbs/> */}
          </div>
          <Content className="site-layout-background">{children}</Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default connect(
  (state) => {
    return {
      // isTourVisible: state.ui.isTourVisible,
      // pageTitle: state.ui.pageTitle,
    };
  },
  (dispatch) => {
    return {
      // setTourVisibility: (isTourVisible) =>
      // dispatch(setTourVisibility(isTourVisible)),
    };
  }
)(BasePage);
