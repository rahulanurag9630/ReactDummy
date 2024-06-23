import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Paper,
  FormHelperText,
  Divider,
  Container,
  FormControl,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { HiEye, HiEyeOff, HiOutlineMail } from "react-icons/hi";
import { Form, Formik } from "formik";
import * as yep from "yup";
import toast from "react-hot-toast";
import { ApiConfig } from "../../../config/apiConfig";
import axios from "axios";
import { CgKey } from "react-icons/cg";
import Mobile from "./login/Mobile";
import { postApiHandler } from "../../../config/service";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "src/context/Auth";
import Doctorstatus from "../../../component/Doctorstatus";

const useStyles = makeStyles((theme) => ({
  loginBox: {
    height: "initial",
    margin: "15px auto",
    maxHeight: "100%",
    maxWidth: "670px",
    width: "100%",
    borderRadius: "10px",
    boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.16)",
    "& .paperBox": {
      display: "flex !important",
      flexDirection: "column !important",
      alignItems: "center !important",
      padding: "50px !important",
      [theme.breakpoints.down("xs")]: {
        padding: "20px !important",
      },
    },
    "& h3": {
      color: theme.palette.primary.dark,
      textAlign: "center",
    },
    "& label": {
      color: theme.palette.primary.dark,
      fontSize: "18px",
    },
    "& .textBtn": {
      color: theme.palette.primary.main,
      cursor: "pointer",
      fontWeight: "500",
    },
    "& form": {
      width: "100%",
    },
    "& .remember": {
      margin: "20px 0",
    },
    "& button": {
      height: "50px",
    },
    "& p": {
      color: theme.palette.text.secondary,
    },
    "& .MuiFormControl-root": {
      marginTop: "6px",
    },
    "& .MuiTypography-body1": {
      fontSize: "16px",
      fontWeight: 400,
    },
    "& .MuiFormControlLabel-root": {
      marginLeft: "-6px",
    },
    "& button": {
      borderRadius: "10px",
      fontSize: "18px",
    },
  },
}));

export default function Login() {
  const auth = useContext(AuthContext);
  const [doctorStatus, setDoctorStatus] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [responseByAdmin, setResponseByAdmin] = useState("");
  const [ok, setOk] = useState("");
  const [cancel, setCancel] = useState(false);
  const [token, setToken] = useState("");
  // const [rememberMe, setRememberMe] = useState(false); // State to store remember me checkbox status

  const formInitialSchema = {
    password: window.localStorage.getItem("password")
      ? window.localStorage.getItem("password")
      : "",
    email: window.localStorage.getItem("email")
      ? window.localStorage.getItem("email")
      : "",
  };
  const formValidationSchema = yep.object().shape({
    email: yep
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter valid email."
      )
      .max(256, "Should not exceeds 256 characters.")
      .required("Please enter your email"),

    password: yep
      .string()
      // .trim()
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      //   "Please enter valid password."
      // )
      .required("Please enter your password"),
    // .max(16, "Password should not exceeds 16 characters.")
    // .min(8, "Password must be minimum of 8 characters."),
  });
  // const handleFormSubmit = async (values) => {
  //   setIsLoading(true);
  //   try {

  //     if (!rememberMe) {
  //       toast.error("Please select 'Remember me' to proceed.");
  //       setIsLoading(false);
  //       return;
  //     }

  //     const response = await postApiHandler("login", values);
  //     console.log(response);
  //     if (response.responseCode == 200) {
  //       console.log(response,"ressssssssssssssssssssssssss")
  //       localStorage.setItem("userRole", response?.responseData?.userRole);
  //       localStorage.setItem("token", response?.responseData?.access_token);
  //       localStorage.setItem("name", response?.responseData?.full_name)
  //       localStorage.setItem("email", response?.responseData?.email)

  //       if(response?.responseData?.userRole === 'DOC'){
  //         history.push("/doctor-appoinment")
  //       }
  //     else{
  //       history.push("/patient-dashboard");
  //     }
  //       // setIsLoading(false);
  //     } else {
  //       toast.error(response?.responseMessage);
  //     }

  //     setIsLoading(false);
  //   } catch (err) {
  //     // toast.error(err?.response?.data?.responseMessage || "An error occurred");
  //     console.error(err.res);
  //     setIsLoading(false);
  //   }
  // };
  function rememberMe() {
    if (!isRememberMe) {
      setIsRememberMe(true);
      const email = document.getElementById("email");
      const password = document.getElementById("password");
      window.localStorage.setItem("email", email?.value);
      window.localStorage.setItem("password", password?.value);
      window.localStorage.setItem("gender", email?.gender);
    } else {
      setIsRememberMe(false);
      window.localStorage.removeItem("email");
      window.localStorage.removeItem("password");
    }
  }
  useEffect(() => {
    if (window.localStorage.getItem("email")) {
      setIsRememberMe(true);
    } else {
      setIsRememberMe(false);
    }
  }, [window.localStorage.getItem("email")]);

  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    try {
      // if (!rememberMe) {
      //   toast.error("Please select 'Remember me' to proceed.");
      //   setIsLoading(false);
      //   return;
      // }

      const response = await postApiHandler("login", values);

      console.log(response);

      if (response.response?.data?.responseCode === 451) {
        //pending case
        setDoctorStatus(true);
        setOk("/");

        setIsLoading(false);
        setResponseByAdmin("You account is still under review by admin.");
        return;
      } else if (response.responseCode === 200) {
        if (response.responseData?.doctor_rejected === true) {
          setDoctorStatus(true);
          setResponseByAdmin(
            `Your account request has been rejected. \n Here is Reason : ${response.responseData?.reject_reason} \n Do you want to upload your documents again?`
          );
          setOk("/editdoctorprofile");
          // localStorage.setItem("userRole", response?.responseData?.userRole);
          // localStorage.setItem("token", response?.responseData?.access_token);
          setToken(response?.responseData?.access_token);
          setCancel(true);
          setIsLoading(false);
          return;
        }

        console.log(response, "ressssssssssssssssssssssssss");
        localStorage.setItem("userRole", response?.responseData?.userRole);
        localStorage.setItem("token", response?.responseData?.access_token);
        localStorage.setItem("name", response?.responseData?.full_name);
        localStorage.setItem("email", response?.responseData?.email);

        localStorage.setItem("isLoggedIn", "true");
        auth.setIsLogin(true);
        if (response?.responseData?.userRole === "DOC") {
          history.push("/doctor-appoinment");
        } else {
          history.push("/patient-dashboard");
        }
      } else if (
        response.responseCode === 404 &&
        response.responseMessage === "User not found"
      ) {
        toast.error(
          "Registration Required - Entered email address is not registered for this application."
        );
      }

      // else if( response.responseCode === 404 && response.responseMessage =="OTP verification required. Please check your email for the OTP."){
      //   alert('hello')
      //   history.push("/verify-otp", { email: values.email });
      //   return;
      // }
      else if (response?.response?.data?.responseCode === 302) {
        history.push("/verify-otp", { email: values.email });
        return;
      } else {
        toast.error(response?.response?.data?.responseMessage);
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  console.log("testere is checkign doctorstatus", doctorStatus);
  return (
    <Container>
      {doctorStatus && (
        <Doctorstatus
          responseByAdmin={responseByAdmin}
          ok={ok}
          cancel={cancel}
          token={token}
        />
      )}
      <Box className={classes.loginBox}>
        <Paper elevation={1} className="paperBox">
          <Typography variant="h3">Welcome Back</Typography>
          <Box my={2}>
            <Typography variant="body2">
              Don't have account?&nbsp;
              <span
                className="textBtn"
                onClick={() => history.push("/select-user-type")}
              >
                Sign Up
              </span>
            </Typography>
          </Box>

          <Formik
            initialValues={formInitialSchema}
            initialStatus={{
              success: false,
              successMsg: "",
            }}
            validationSchema={formValidationSchema}
            onSubmit={(values) => handleFormSubmit(values)}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
              setFieldValue,
            }) => (
              <Form>
                <Box mt={3}>
                  <label>Email</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter email Id"
                    name="email"
                    id="email"
                    value={values.email}
                    error={Boolean(touched.email && errors.email)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onInput={(e) => {
                      let value = e.target.value;

                      value = value.replace(/\s/g, "");

                      e.target.value = value.toLowerCase();
                      window.localStorage.setItem("email", e.target.value);
                    }}
                  />
                  <FormHelperText error className={classes.helperText}>
                    {touched.email && errors.email}
                  </FormHelperText>
                </Box>
                <Box mt={3} mb={2}>
                  <label>Password</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={values.password}
                    error={Boolean(touched.password && errors.password)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onInput={(e) => {
                      const regex = /^[^\s]*$/;

                      if (!regex.test(e.target.value)) {
                        e.target.value = e.target.dataset.previousValue || "";
                      } else {
                        e.target.dataset.previousValue = e.target.value;
                      }

                      window.localStorage.setItem("password", e.target.value);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            <Box>
                              {showPassword ? (
                                <HiEye className={classes.iconClass1} />
                              ) : (
                                <HiEyeOff className={classes.iconClass1} />
                              )}
                            </Box>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormHelperText error className={classes.helperText}>
                    {touched.password && errors.password}
                  </FormHelperText>
                </Box>
                <Box className="displaySpacebetween remember">
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: "#4D164F" }}
                        checked={isRememberMe}
                        // onChange={() => setisRememberMeEnable((p) => !p)}
                        onChange={() => rememberMe()}
                      />
                    }
                    label="Remember me"
                  />
                  <Typography
                    variant="body2"
                    className="textBtn"
                    onClick={() => history.push("/forget-password")}
                  >
                    Forgot Password?
                  </Typography>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    disabled={isloading}
                  >
                    Login
                    {isloading && (
                      <CircularProgress
                        size={20}
                        style={{ color: "#fff", marginLeft: "10px" }}
                      />
                    )}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Container>
  );
}
