import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

function BreadCrumbs() {
  const location = useLocation();
  const [pathNames, setpathNames] = useState([]);

  useEffect(() => {
    const { pathname } = location;
    const pathNames: any = pathname.split("/").filter((i) => i);
    setpathNames(pathNames);
  }, []);
  return (
    <Breadcrumb>
      {pathNames.map((name: any, index: any) => {
        const displayUrl =
          name.charAt(0).toUpperCase() + name.slice(1).replace("-", " ");
        const isLast = index === pathNames.length - 1;
        return isLast ? (
          <Breadcrumb.Item key={index}>{displayUrl}</Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={index}>{displayUrl}</Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}
export default BreadCrumbs;
