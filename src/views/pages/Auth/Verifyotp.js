import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  makeStyles,
  FormControl,
  Typography,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import OTPInput from "otp-input-react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import toast from "react-hot-toast";
import { ApiConfig } from "../../../config/apiConfig";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import * as Yup from "yup";
import Useraccept from "../../../component/Useraccept.js";
// const validationSchema = Yup.object().shape({
//   otp: Yup.string()
//     .matches(/^[0-9]+$/, "OTP must be numeric")
//     .length(4, "OTP must be 4 characters")
//     .required("OTP is required"),
// });

const useStyles = makeStyles((theme) => ({
  inputBox: {
    "& input": {
      border: "2px solid black !important",
    },
  },
  verifyOtpBox: {
    height: "calc(100vh - 100px)",
    position: "relative",
    zIndex: "999",
    overflowY: "auto",
    fill: theme.palette.background.default,
    filter: "drop-shadow(0px 10px 40px rgba(0, 0, 0, 0.16))",
    "& .otpBox": {
      borderRadius: "6px",
      background: theme.palette.background.default,
      backdropFilter: "blur(25px)",
      height: "initial",
      margin: "15px auto",
      maxWidth: " 673px",
      width: "100%",
      [theme.breakpoints.down("xs")]: {
        marginLeft: "20px",
        marginRight: "20px",
      },
      maxHeight: "100%",
      "& .mainBox": {
        flexDirection: "column",
        gap: "10px",

        [theme.breakpoints.down("xs")]: {},
        "& h2": {
          paddingBottom: "5px",
          fontFamily: "Clash Display",
          color: "#262626",
        },
        "& .otpTitle": {
          color: theme.palette.primary.dark,
          marginTop: "23px",
        },
      },
      "& .buttonBox": {
        // padding: "35px 0 0 0",
        // display: "flex",
        // justifyContent: "flex-end",
        width: "100%",
        borderRadius: "10px",
        "& .verifySubmitBtn": {
          // color: "#fff",
          borderRadius: "10px",
        },
      },
      "& .otpTextBox": {
        padding: "20px 0px 20px",
        "& .otpSubText": {
          textAlign: "center",
          fontSize: "16px",
          color: theme.palette.primary.light,
          padding: " 0 63px",
          [theme.breakpoints.down("xs")]: {
            padding: " 0 10px",
          },
        },
      },
      "& .otpFormControl": {
        "& input": {
          color: "rgba(0, 0, 0, 0.87)",
          width: "49px !important",
          height: "49px !important",
          border: "0px",
          background: theme.palette.background.card,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          borderRadius: "10px",
          "@media(max-width:460px)": {
            width: "37px !important",
            height: "37px !important",
          },
          "@media(max-width:380px)": {
            width: "26px !important",
            height: "26px !important",
          },
        },
      },
      "& .resendBtn": {
        color: theme.palette.primary.main,
        textDecoration: "underline",
        marginRight: "20px",
        fontWeight: 500,
        cursor: "pointer",
      },
      "& .timerText": {
        color: theme.palette.error.main,
        marginRight: "20px",
      },
    },
  },
}));

export default function Verifyotp() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [opendialog, setOpendialog] = useState(false);
  // const email = location.state.params;
  const [showResend, setShowResend] = useState(false);
  const initialTimer = 180;
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [loading, setLoading] = useState(false);
  const [response, setresponse] = useState(false);
  const [timer, setTimer] = useState(initialTimer);
  const [errorMessage, setErrorMessage] = useState("");
  // const mobile = location?.state?.mobile;
  const email = location?.state?.email;
  console.log("location?.state?", Object.keys(location?.state).length);
  let forgot =
    Object.keys(location?.state).length > 1 ? location?.state?.forgot : false;

  const VerifyOTPFunction = async (values) => {
    setLoading(true);

    if (values.OTP === "0000" || values.OTP < 4) {
      toast.error("Please enter valid otp.");
      setLoading(false);
      return;
    }
    // let hitpoint1=forgot===true?'verifyOtp':'verifyOtpsignup';
    try {
      const response = await axios({
        url: forgot ? ApiConfig.verifyOtp : ApiConfig.verifyOtpsignup,
        method: "POST",
        data: {
          otp: otp,
          email: email,
        },
      });
      // console.log(res, "ajkgfa");
      if (response && response?.data?.responseCode === 200) {
        console.log("Email:", response?.responseData?.email);
        !response?.data.hasOwnProperty("yourPassword ") &&
          history.push("/login");
        response?.data.hasOwnProperty("yourPassword ") && setOpendialog(true);
      } else {
        setresponse(response?.data?.responseMessage);
        console.log("Error response:", response);
        toast.error(response?.data?.responseMessage);
      }

      setLoading(false);
    } catch (err) {
      setresponse(err?.response?.responseMessage);
      console.log("Error:", err);
      toast.error(err?.response?.responseMessage || "An error occurred");
      setLoading(false);
    }
  };
  useEffect(() => {
    let countdown = timer;

    const interval = setInterval(() => {
      if (countdown > 0) {
        countdown -= 1;
        setTimer(countdown);
        localStorage.setItem("timer", countdown.toString());
      } else {
        setIsTimerRunning(false);
        setShowResend(true);
        clearInterval(interval);
        localStorage.removeItem("timer");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);
  const handleResendClick = async () => {
    try {
      setLoading(true);

      console.log("Resending OTP for mobile number:", email);

      const response = await axios.post(ApiConfig.resendOtp, {
        email: email,
      });

      console.log("Resend API Response:", response);

      if (response && response.data.responseCode === 200) {
      } else {
        console.error("Error response:", response);
        toast.error(response?.data?.responseMessage || "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error?.response?.data?.responseMessage || "An error occurred"
      );
    } finally {
      setLoading(false);
    }

    setTimer(180);
    setIsTimerRunning(true);
    setShowResend(false);
  };

  return (
    <Formik
      initialValues={{ otp: "" }}
      // validationSchema={Yup.object().shape({
      //   otp: Yup.string()
      //     .required("Otp is required")
      //     .matches(/^[0-9]+$/, "OTP must be numeric")
      //     .min(4, "OTP must be 4 digits"),
      // })}
      onSubmit={(values) => VerifyOTPFunction(values)}
    >
      {({
        handleSubmit,
        errors,
        handleBlur,
        handleChange,
        touched,
        values,
        setFieldValue,
      }) => (
        <Form>
          <Box className={`${classes.verifyOtpBox} displayCenter`}>
            <Box className="otpBox">
              <Paper className="mainBox displayCenter" elevation={2}>
                <img src="images/Mail.png" alt="mail" />
                <Typography variant="h3" className="otpTitle">
                  OTP Verification
                </Typography>
                <Box className="otpTextBox">
                  <Typography variant="h6" className="otpSubText">
                    Please enter the 4 digit verification code that was sent to
                    <span style={{ color: "black" }}>{` ${email}`}</span>. The
                    code is valid for 3 minutes.
                  </Typography>
                </Box>
                <Box>
                  {/* {response && <Typography variant="body2">{response}<Typography/>} */}
                  {response && (
                    <Typography
                      variant="body2"
                      style={{
                        color: "#DC0404",
                        textAlign: "center",
                        marginBottom: "20px",
                      }}
                    >
                      {response}
                    </Typography>
                  )}
                  <FormControl fullWidth className="otpFormControl">
                    <Field
                      type="text"
                      name="otp"
                      as={OTPInput}
                      value={otp}
                      inputVariant="standard"
                      autoComplete="off"
                      onChange={(value) => setOtp(value)}
                      // autoFocus
                      OTPLength={4}
                      otpType="number"
                      className={classes.inputBox}
                    />
                    <ErrorMessage
                      name="otp"
                      component="div"
                      className="error-message"
                    />
                  </FormControl>
                  <Box pt={1} className="displayEnd">
                    <div className={classes.timerdiv}>
                      {showResend ? (
                        <span
                          className="resendBtn"
                          onClick={handleResendClick}
                          variant="h6"
                        >
                          Resend Code
                        </span>
                      ) : (
                        <span variant="body2" className="timerText">
                          {moment.utc(timer * 1000).format("mm:ss")}
                        </span>
                      )}
                    </div>
                  </Box>
                </Box>

                <Box className="buttonBox" mt={4}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    color="primary"
                    className="verifySubmitBtn"
                    disabled={loading || otp.length < 4 || !isTimerRunning}
                    onClick={() => {
                      if (otp.length < 4) {
                        setErrorMessage("OTP must contain atleast 4 digits.");
                      }
                      // } else {
                      //   otpHandler();
                      // }
                    }}
                  >
                    Submit
                    {loading && (
                      <CircularProgress
                        size={20} // Set the size of CircularProgress
                        style={{ color: "#fff", marginLeft: "10px" }}
                      />
                    )}
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Box>

          {opendialog && <Useraccept />}
        </Form>
      )}
    </Formik>
  );
}
