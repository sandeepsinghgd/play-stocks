import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import {
  BsExclamationCircle,
  BsEyeFill,
  BsFillEyeSlashFill,
} from "react-icons/bs";
import OtpInput from "react-otp-input";
import { useParams } from "react-router";
import { forgotMpin } from "../../api/forgotMpin";
import logo from "../../assets/images/Play-stocks-app-logo1.png";
import "../../styles/_forgotMpin.scss";

const ForgotMpin = () => {
  const param: any = useParams();
  const [pin, setPin] = useState("");
  const [confirmPin, setconfirmPin] = useState("");
  const [visible, setVisible] = useState(true);
  const [confirmPinVisible, setConfirmPinVisible] = useState(true);
  const [token, setToken] = useState(false);
  const [isMpinError, setMpinError] = useState(false);
  const [isMpinConfirmError, setMpinConfirmError] = useState(false);
  useEffect(() => {
    localStorage.removeItem("isTokenExpired");
    if (localStorage.getItem("isTokenExpired") == "true") {
      setToken(true);
    }
  }, []);

  const togglePasswordVisiblity = () => {
    setVisible(!visible);
  };

  const toggleConfirmPinVisiblity = () => {
    setConfirmPinVisible(!confirmPinVisible);
  };

  const onSetMpin = async (payload: any) => {
    if (pin.length < 4) {
      setMpinError(true);
    }

    if (confirmPin.length < 4) {
      setMpinConfirmError(true);
    } else {
      try {
        payload = {
          pin,
          pin_confirmation: confirmPin,
          token: param.token,
        };

        const response = await forgotMpin(payload);
        if (response?.data) {
          if (response.data.success) {
            setPin("");
            setconfirmPin("");
            message.success({
              content: response.data.message,
              className: "custom-class",
              style: {
                marginTop: "30vh",
              },
            });
          }
        }
      } catch (err: any) {
        if (err.response?.data) {
          if (err.response.status === 400) {
            localStorage.setItem("isTokenExpired", "true");
            setToken(true);
          }
          if (err.response.status === 422) {
            for (const key in err.response.data.errors) {
              message.error({
                content: err.response.data.errors[key][0],
                className: "custom-class",
                style: {
                  marginTop: "30vh",
                },
              });
            }
          }
        }
      }
    }
  };
  const onMpinChange = (value: any) => {
    setPin(value);
    if (pin.length == 3) {
      setMpinError(false);
    }
  };

  const onConfirmPinChange = (value: any) => {
    setconfirmPin(value);
    if (confirmPin.length == 3) {
      setMpinConfirmError(false);
    }
  };

  return (
    <>
      {token ? (
        <div className="errorBlock">
          <div className="cardErrorBlock">
            <BsExclamationCircle className="errorIcon" />
            <h3>Your session has expired.</h3>
            <p>Please go to the application to change MPIN.</p>
          </div>
        </div>
      ) : (
        <div className="mpinPageContainer">
          <div className="pinSetWrapper">
            <div className="logoContainer">
              <img className="mpinPageLogo" src={logo} alt="logo" />
            </div>
            <div className="titleContainer">
              <h4>Set MPIN</h4>
            </div>
            <label className="pinLabel">Enter MPIN</label>
            <div className="newPinBlock">
              <OtpInput
                className="otpInput"
                onChange={onMpinChange}
                numInputs={4}
                separator={<span>&nbsp;&nbsp;</span>}
                inputStyle="inputStyle"
                hasErrored={false}
                isInputNum={true}
                isInputSecure={visible}
                value={pin}
              />
              {visible === true ? (
                <BsFillEyeSlashFill
                  onClick={togglePasswordVisiblity}
                  className="eyeIcon"
                />
              ) : (
                <BsEyeFill
                  onClick={togglePasswordVisiblity}
                  className="eyeIcon"
                />
              )}
            </div>
            {isMpinError && (
              <label
                style={{ color: "red", fontWeight: "500", display: "block" }}
                htmlFor=" "
                className="pt-2"
              >
                Please Enter valid MPIN.
              </label>
            )}

            <label className="confirmPinLabel">Confirm MPIN</label>
            <div className="newPinBlock">
              <OtpInput
                className="otpInput"
                onChange={onConfirmPinChange}
                numInputs={4}
                separator={<span>&nbsp;&nbsp;</span>}
                inputStyle="inputStyle"
                hasErrored={true}
                errorStyle="error"
                isInputNum={true}
                isInputSecure={confirmPinVisible}
                value={confirmPin}
              />
              {confirmPinVisible === true ? (
                <BsFillEyeSlashFill
                  onClick={toggleConfirmPinVisiblity}
                  className="eyeIcon"
                />
              ) : (
                <BsEyeFill
                  onClick={toggleConfirmPinVisiblity}
                  className="eyeIcon"
                />
              )}
            </div>
            {isMpinConfirmError && (
              <label
                style={{ color: "red", fontWeight: "500", display: "block" }}
                htmlFor=" "
                className="pt-2"
              >
                Please Enter valid confirm MPIN.
              </label>
            )}

            {pin !== confirmPin && pin.length == 4 && confirmPin.length == 4 && (
              <label
                style={{ color: "red", fontWeight: "500", display: "block" }}
                htmlFor=" "
              >
                New Pin and Confirm Pin Do not match.
              </label>
            )}

            <Button
              type="primary"
              className="mt-3 setPinBtn"
              block
              onClick={onSetMpin}
            >
              Done
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotMpin;
