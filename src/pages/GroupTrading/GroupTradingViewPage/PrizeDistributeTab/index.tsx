// import { useState } from "react";
import { useParams } from "react-router";
import { BsHash } from "react-icons/bs";
import CRUDDataTable from "../../../../components/DataTable/dataTable";
import { getPrizeDistribution } from "../../../../api/groupDetailPage";

function PrizeDistributionTab() {
  const id: any = useParams();

  // const [isCreateModalVisible, setCreateModalVisibility] = useState(false);
  const draw: any = 0;
  const isActionPerform: any = false;

  const fetchGroupTradingList = async (params: any) => {
    params = {
      ...params,
    };
    return await getPrizeDistribution(id.id, 10, params);
  };

  const columns = [
    {
      title: (
        <strong>
          <BsHash />
        </strong>
      ),
      width: "20%",
      dataIndex: "index",
      key: "index",
    },
    {
      title: <strong>Rank</strong>,
      dataIndex: "min_rank",
      key: "min_rank",
      // sorter: true,
      width: "20%",
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record.min_rank} {record.max_rank ? -record.max_rank : ""}
          </>
        );
      },
    },

    {
      title: <strong>Amount</strong>,
      dataIndex: "amount",
      key: "amount",

      // render: (text: any, record: any, value: any) => {
      //   return (
      //     <>{record.is_guaranteed_return === 1 ? <AiOutlineCheck /> : <VscChromeClose />}</>
      //   );
      // },
    },
  ];

  return (
    <div>
      <CRUDDataTable
        direction="asc"
        sortOrder="min_rank"
        draw={draw}
        entity="Prize Distribution"
        fetchDataFunction={fetchGroupTradingList}
        isActionPerform={isActionPerform}
        columns={columns}
        isButtonShown={false}
        rowKey="id"
        isAddGroupTrade={false}
      />
    </div>
  );
}

export default PrizeDistributionTab;
