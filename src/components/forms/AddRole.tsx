import React, { FC, useState, useEffect } from "react";
import { Tree, Input, Switch } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useTypedSelector } from "../../hooks/useTypeSelector";

interface AddRoleProps {
  roleData: any;
  setRoleData: any;
  inputError: any;
  permissionError: any;
  setInputError: any;
  setPermissionError: any;
  setDynamicInputError: any;
  dynamicInputError: any;
  inputValue: any;
  setInputValue: any;
}
const AddRole: FC<AddRoleProps> = (props) => {
  const { permissions } = useTypedSelector((state) => state.permission);
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onCheck = (checkedKeysValue: any, info: any) => {
    props.setPermissionError(false);
    props.setRoleData({ ...props.roleData, rolePermissions: checkedKeysValue });
  };

  let value = "";
  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  useEffect(() => {
    const pemissionsTree = buildTree(permissions);
    setTreeData(pemissionsTree);
  }, [permissions]);

  const buildTree = (permissions: any) => {
    return (
      permissions &&
      permissions.length > 0 &&
      permissions
        .map((permission: any) => {
          const obj: any = {
            title: permission.name,
            key:
              "module_id" in permission
                ? `${permission.id}_${permission.module_id}`
                : `${permission.id}`,
          };
          if ("permissions" in permission) {
            const children = buildTree(permission.permissions);
            if (children.length) obj.children = children;
          }
          return obj;
        })
        .filter((obj: any) => obj != null)
    );
  };

  return (
    <div className="mt-1 mb-2">
      <label><strong>Role name</strong></label>
      <Input
        placeholder="Enter Role name"
        onBlur={() => {
          props.setInputError(true);
          // props.setPermissionError(true);
        }}
        value={props.roleData.roleName}
        // className={`${props.inputError &&  `roleInputField`}`}
        className={
          props.dynamicInputError
            ? "roleInputField"
            : props.inputError && props.inputValue == ""
            ? "roleInputField"
            : ""
        }
        onChange={(e: any) => {
          value = e.target.value;

          if (value === "") {
            props.setInputValue(value);
            // props.setInputError(false);
            props.setDynamicInputError();
          } else {
            props.setInputValue(value);
            props.setInputError(false);
            props.setDynamicInputError();
          }
          props.setRoleData({ ...props.roleData, roleName: e.target.value });
        }}
      />
      {props.dynamicInputError ? (
        <label style={{ color: "red", fontWeight: "500" }} htmlFor="message">
          {props.dynamicInputError}
        </label>
      ) : props.inputError && props.inputValue == "" ? (
        <label style={{ color: "red", fontWeight: "500" }} htmlFor="message">
          Name field is required.
        </label>
      ) : (
        ""
      )}

      <div className="mt-3">
        <label className="me-2"><strong>Status</strong></label>
        <Switch
          defaultChecked={props.roleData.rolestatus}
          onChange={(value) => {
            props.setRoleData({
              ...props.roleData,
              rolestatus: value === true ? 1 : 0,
            });
          }}
        />
      </div>
      <div style={{ marginTop: 15 }}>
        <label className="d-block"><strong>Permissions</strong></label>
        {props.permissionError && (
          <label style={{ color: "red", fontWeight: "500" }} htmlFor=" ">
            Role permission field is required.
          </label>
        )}
        <Tree
          checkable
          treeData={treeData}
          onCheck={onCheck}
          onExpand={onExpand}
          switcherIcon={<DownOutlined />}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          checkedKeys={props.roleData.rolePermissions || []}
        />
      </div>
    </div>
  );
};

export default AddRole;
