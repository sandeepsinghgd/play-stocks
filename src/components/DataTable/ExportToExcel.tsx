import { Button } from "antd";
import { exportWithdrawRequestListApi } from "../../api/withdrawRequests";

export const ExportToExcel = ({ params }: any) => {
  console.log("export :", params)
  const JSONToCSVConvertor = async (params: any) => {
    // params = {
    //   ...params,
    // };
    const response = await exportWithdrawRequestListApi(params);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "withdrawal-requests.xlsx");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Button
      onClick={(e) => JSONToCSVConvertor(params)}
      type="primary"
      className="me-2"
    >
      Export
    </Button>
  );
};
