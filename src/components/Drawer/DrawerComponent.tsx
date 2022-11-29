import { Drawer } from "antd";

function DrawerComponent(props: any) {
  // const { children, title, placement, onClose, visible, extra } = props;

  return (
    <>
      <Drawer
        title={props.title}
        placement={props.placement}
        onClose={props.onClose}
        visible={props.visible}
        extra={props.extra}
        destroyOnClose={props.destroyOnClose}
      >
        {props.children}
      </Drawer>
    </>
  );
}

export default DrawerComponent;
