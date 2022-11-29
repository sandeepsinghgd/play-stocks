import {
  Button,
  Card,
  Col,
  Divider,
  Image,
  message,
  Modal,
  Row,
  Tag,
} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { FC, useEffect, useState } from "react";
import "../../../../styles/_summary.scss";
import "../../../../styles/_components.scss";
import { FaCoins } from "react-icons/fa";
import { customerStatus, viewCustomer } from "../../../../api/customer";
import { useParams } from "react-router-dom";
import CustomerSummaryModal from "../../../../components/Modals/customerSummaryModal";
import { useTypedSelector } from "../../../../hooks/useTypeSelector";
import profilePlaceholder from "../../../../assets/images/download.jpg";
import imgPlaceholder from "../../../../assets/images/imgPlaceholder.png";
import { customerBankDetails } from "../../../../api/customerTransaction";
// import { timeFormat } from "../../../../utils/helpers";
import { HiCurrencyRupee } from "react-icons/hi";

const { confirm } = Modal;
interface SummaryTabProps {
  onHandleClick?: any;
}

const SummaryTab: FC<SummaryTabProps> = (props) => {
  const id: any = useParams();
  const [profileData, setProfileData] = useState<any>({});
  const [BankDetails, setBankDetails] = useState<any>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { currentUserPermissions } = useTypedSelector((state) => state.user);

  const updateStatus = async (status: any, id: any) => {
    try {
      const payload = {
        id,
        status,
      };
      const response = await customerStatus(payload);
      if (response.data.success) {
        message.success(response.data.message);
        // setActionPerform(true)
      }
    } catch (err: any) {
      message.error(err);
    }
  };

  useEffect(() => {
    setProfileData(fetchProfile());
  }, []);

  useEffect(() => {
    fetchBankDetails();
  }, []);
  const fetchProfile = async () => {
    const response = await viewCustomer(id.id);
    const data = response.data.result;
    setProfileData(data);
  };

  const fetchBankDetails = async () => {
    const response = await customerBankDetails(id.id);
    const data = response.data.result;
    setBankDetails(data);
  };

  return (
    <>
      <Card className="detailCard">
        <Row className="justify-content-center imgRow">
          {profileData?.profile?.uploaded_file_path != null?
          <Image
          // width={100}
          // height={100}
          src={
            profileData?.profile?.uploaded_file_path != null
              ? "https://auth-api.playstocks.in/" +
                profileData?.profile?.uploaded_file_path
              : profilePlaceholder
          }
          className="profileImg"
        />
        :
        <img src={profilePlaceholder} alt="image" className="defaultImage"/>
          }
          
        </Row>
        <Row className="justify-content-center content-center">
          <strong className="text-primary">
            {profileData?.first_name ? profileData?.first_name : "N/A"}
            &nbsp;{profileData?.last_name ? profileData?.last_name : ""}
          </strong>
        </Row>
        {currentUserPermissions.includes("view_main_balance") && (
          <>
            <Row className="mt-3 justify-content-center balance">
              <Col className="ms-1 content-center">
                <Avatar
                  className="bg-primary"
                  shape="square"
                  size={40}
                  icon={<HiCurrencyRupee />}
                />
              </Col>
              <Col className="ms-1 content-center">
                <strong className="mb-0">
                  {profileData.total ? profileData.total : "N/A"}
                </strong>
                <p>Total Balance</p>
              </Col>
            </Row>
            <Row className="justify-content-center balance">
              <Col className=" content-center">
                <Avatar
                  className="bg-primary"
                  shape="square"
                  size={40}
                  icon={<FaCoins />}
                />
              </Col>
              <Col className="ms-1 content-center">
                <strong className="mb-0">
                  {profileData?.coin ? profileData?.coin : "N/A"}
                </strong>
                <p>Coin Balance</p>
              </Col>
            </Row>
          </>
        )}
        {currentUserPermissions.includes("view_wallet_history") && (
          <Row className="justify-content-center">
            <Button
              type="primary"
              onClick={props.onHandleClick}
              className="summaryBtn"
            >
              Transaction History
            </Button>
          </Row>
        )}
        <Row className="mt-3">
          <p className="font-bold text-base">Personal Info</p>
        </Row>
        <Divider />
        <Row className="mt-3">
          <strong>Nick Name: &nbsp; </strong>
          <p className="mb-2">
            {profileData?.nick_name ? profileData?.nick_name : "N/A"}
          </p>
        </Row>
        <Row className="">
          <strong>Full Name: &nbsp; </strong>
          <p className="mb-2">
            {profileData?.first_name ? profileData?.first_name : "N/A"}{" "}
            {profileData?.last_name}
          </p>
        </Row>
        <Row className="">
          <strong>Email: &nbsp; </strong>
          <p className="mb-2">
            {profileData?.email ? profileData?.email : "N/A"}
          </p>
        </Row>
        <Row className="">
          <strong>Gender: &nbsp; </strong>
          <p className="mb-2">
            {profileData?.gender ? profileData?.gender : "N/A"}
          </p>
        </Row>
        <Row>
          <strong>Contact: &nbsp; </strong>
          <p className="mb-2">
            {profileData?.phone ? profileData?.phone : "N/A"}
          </p>
        </Row>
        {/* //////////// */}
        <Divider style={{ background: "#cccccc" }} />
        <Row className="d-flex flex-column mt-1">
          <strong>Mobile Verification:- &nbsp; </strong>

          <div className="mt-1">
            <strong>Status : &nbsp;</strong>
            <span className="mb-2">
              {profileData?.is_mobile_verified === 1 ? (
                <Tag color="#29a329">Verified</Tag>
              ) : (
                <Tag color="#cc0000">Not Verified</Tag>
              )}
            </span>
          </div>
        </Row>
        <Row className="d-flex flex-column">
          <p className="mb-2">
            {" "}
            <strong>Date :</strong> &nbsp;
            {profileData?.mobile_verified_at
              ? profileData?.mobile_verified_at
              : "N/A"}
          </p>
        </Row>
        <Divider style={{ background: "#cccccc" }} />
        {/* <Row>
          <strong>Profile Verified: &nbsp; </strong>
          <p className="mb-2">
            {profileData?.is_profile_verified === 1
              ? "Verified"
              : "Not Verified"}
          </p>
        </Row> */}
        <Row className="mt-2">
          <strong>Pin Set Date: &nbsp; </strong>
          <p className="mb-2">
            {profileData?.pin_set_at ? profileData?.pin_set_at : "N/A"}
          </p>
        </Row>
        <Row className="">
          <strong>Registered Via: &nbsp;</strong>

          <p>
            {profileData.register_type === 1 ? (
              <span>Mobile</span>
            ) : profileData.register_type === 2 ? (
              <span>
                {profileData.provider.charAt(0).toUpperCase() +
                  profileData.provider.substr(1)}
              </span>
            ) : (
              "N/A"
            )}
          </p>
        </Row>
        <Row className="">
          <strong>Referral Code: &nbsp; </strong>
          <p className="mb-2">
            {profileData?.referral_code ? profileData?.referral_code : "N/A"}
          </p>
        </Row>
        <Row className="mt-1">
          <strong>PAN Number: &nbsp; </strong>
          <p className="mb-2">
            {profileData?.pancard_number ? profileData?.pancard_number : "N/A"}
          </p>
        </Row>
        <Row>
          <strong>Verification Date: &nbsp; </strong>
          <p className="mb-2">
            {profileData?.pancard_verified_at
              ? profileData?.pancard_verified_at
              : "N/A"}
          </p>
        </Row>

        <Row className="justify-content-center imgRow">
          {profileData?.pancard_image?.uploaded_file_path != null
          ? <Image
          // width={100}
          // height={100}
          src={
            profileData?.pancard_image?.uploaded_file_path != null
              ? "https://auth-api.playstocks.in/" +
                profileData?.pancard_image?.uploaded_file_path
              : imgPlaceholder
          }
        /> 
      :  
      <img src={profilePlaceholder} alt="image" className="defaultImage"/>
    }
          
        </Row>

        {/* ////////// */}

        <Row className="justify-content-center mt-3">
          <CustomerSummaryModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            profileData={profileData}
          />
          {profileData?.status === 0 ? (
            <Button
              style={{ color: "green", border: "1px solid green" }}
              onClick={() => {
                confirm({
                  title: "Do you want to activate the Customer?",
                  onOk: () => {
                    updateStatus(1, profileData.id);
                  },
                  onCancel: () => {},
                });
              }}
            >
              Activate
            </Button>
          ) : (
            <Button
              danger
              ghost
              onClick={() => {
                confirm({
                  title: "Do you want to inactivate the Customer?",
                  onOk: () => {
                    updateStatus(0, profileData.id);
                  },
                  onCancel: () => {},
                });
              }}
            >
              Inactivate
            </Button>
          )}
        </Row>
      </Card>
      <Card className="panCard">
        <Row className="">
          <p className="font-bold text-base">Wallet Info</p>
        </Row>
        <Divider />
        <Row>
          <strong>Total Balance: &nbsp;</strong>
          <p className="mb-2">
            {profileData.total ? profileData.total : "N/A"}
          </p>
        </Row>
        <Row>
          <strong>Wallet Amount: &nbsp;</strong>
          <p className="mb-2">
            {profileData.wallet_amount ? profileData.wallet_amount : "N/A"}
          </p>
        </Row>
        <Row>
          <strong>Winning Amount: &nbsp;</strong>
          <p className="mb-2">
            {profileData.winning_amount ? profileData.winning_amount : "N/A"}
          </p>
        </Row>
        <Row>
          <strong>Bonus Amount: &nbsp;</strong>
          <p className="mb-2">
            {profileData.total_bonus? profileData.total_bonus : "N/A"}
          </p>
        </Row>

      </Card>

      <Card className="panCard">
        <Row className="">
          <p className="font-bold text-base">Bank Info</p>
        </Row>
        <Divider />
        <Row className="mt-2">
          <strong>Bank Name: &nbsp;</strong>
          <p className="mb-2">
            {BankDetails?.bank_name ? BankDetails?.bank_name : "N/A"}
          </p>
        </Row>
        <Row>
          <strong>Account Number: &nbsp; </strong>
          <p className="mb-2">
            {BankDetails?.account_number ? BankDetails?.account_number : "N/A"}
          </p>
        </Row>
        <Row>
          <strong>IFSC Code: &nbsp; </strong>
          <p className="mb-2">
            {BankDetails?.ifsc_code
              ? BankDetails?.ifsc_code.toUpperCase()
              : "N/A"}
          </p>
        </Row>
        <Row>
          <strong>Account Type: &nbsp; </strong>
          <p className="mb-2">
            {BankDetails?.account_type ? BankDetails?.account_type : "N/A"}
          </p>
        </Row>
      </Card>
      <Card className="planCard">
        <Row className="">
          <p className="font-bold text-base">Last Device Info</p>
        </Row>
        <Divider />
        <Row>
          {/* <strong>Device Id: &nbsp;</strong>

          <p className="mb-2">
            {profileData?.last_device_details?.device_id
              ? profileData?.last_device_details?.device_id
              : "N/A"}
          </p> */}
          
          {/* <Col>
            <Avatar
              className="bg-primary"
              shape="square"
              size={60}
              icon={<GiTakeMyMoney style={{ fontSize: "30px" }} />}
            />
          </Col>
          <Col className="ms-3">
            <strong className="mb-0 bonusMoney">
              {profileData?.signup_money}
            </strong>
            <p className="bonusText">Sign Up Money</p>
          </Col> */}
        </Row>
        <Row>
          <strong>App Version: &nbsp;</strong>
          <p className="mb-2">
            {profileData?.last_device_details?.app_version
              ? profileData?.last_device_details?.app_version
              : "N/A"}
          </p>
        </Row>
        <Row>
          <strong>Model Name: &nbsp;</strong>
          <p className="mb-2">
            {profileData?.last_device_details?.model_name? profileData?.last_device_details?.model_name: "N/A"}
          </p>
        </Row>
        <Row>
          <strong>Ip Address: &nbsp;</strong>
          <p className="mb-2" style={{ wordBreak: "break-all" }}>
            {profileData?.last_device_details?.ip_address ? profileData?.last_device_details?.ip_address : "N/A"}
          </p>
        </Row>
        <Row>
          <strong>Mac Address: &nbsp;</strong>
          <p className="mb-2">
            {profileData?.last_device_details?.mac_address ? profileData?.last_device_details?.mac_address : "N/A"}
          </p>
        </Row>
        <Row>
          <strong>Last login At: &nbsp;</strong>
          <p className="mb-2">
            {/* {timeFormat(profileData.last_login_at)}  */}
            {profileData.last_login_at ? profileData.last_login_at : "N/A"}</p>
        </Row>
      </Card>
    </>
  );
};
export default SummaryTab;
