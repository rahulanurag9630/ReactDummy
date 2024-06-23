import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  makeStyles,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@material-ui/core";
import { IoIosCloudUpload } from "react-icons/io";
import { Formik, Form } from "formik";
import { HiEye, HiEyeOff } from "react-icons/hi";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ApiConfig } from "src/config/apiConfig";
import toast, { Toaster } from "react-hot-toast";
import UserType from "../../Auth/login/UserType";

const useStyles = makeStyles((theme) => ({
  mainAppBox: {
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    "& h2": {
      color: "#161E29",
      fontFamily: "Calistoga",
      fontStyle: "normal",
      fontWeight: "500",
    },
    "& .subBox": {
      background: "#FFF",
      borderRadius: "15px",
      width: "100%",
      padding: "40px 0",
      height: "70vh",
      "@media(max-width:599px)": {
        padding: "20px 0px",
        height: "auto",
      },
    },
    "& .MuiGrid-container": {
      padding: "0 30px",
      "@media(max-width:599px)": {
        padding: "0px 20px",
      },
    },
    "& h6": {
      color: "#080515",
      fontSize: "18px",
      fontStyle: "normal",
      marginBottom: "10px",
    },
  },
}));
const Changepassword = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const history = useHistory();

  const handleSubmit1 = async (values) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "POST",
        url: ApiConfig.changePassword,
        data: {
          old_password: values.oldpassword,
          new_password: values.newpassword,
          confirm_new_password: values.confirmpassword,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data?.responseCode === 200) {
        toast.success(response?.data?.responseMessage);
        console.log(response, "response");
        console.log("Password changed successfully");
        let type = await localStorage.getItem("userRole");

        type != "DOC"
          ? history.push("/patient-dashboard")
          : history.push("/doctor-appoinment");
      } else {
        toast.error(response?.data?.responseMessage);
        console.error("Failed to change password:", response);
      }
    } catch (error) {
      toast.error(error?.response?.data?.responseMessage);
      console.error("Error while changing password:", error);
    }
  };

  //   const handleSubmit1 = async (values) => {

  //     try {
  //       const bearerToken =localStorage.getItem("token");

  //       const response = await fetch(`${url}/admin/change-password/`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${bearerToken}`,
  //         },
  //         body: JSON.stringify({
  //           old_password: values.oldpassword,
  //           new_password: values.newpassword,
  //           confirm_new_password: values.confirmpassword,
  //         }),
  //       });

  //       if (response.responseCode === 200) {
  //
  //         console.log(response,"response")
  //         console.log("Password changed successfully");
  //         history.push("/dashboard");
  //       } else {
  //         toast.error(response?.responseMessage)
  //         const errorData = await response.json();
  //         console.error("Failed to change password:", errorData);
  //       }
  //     } catch (error) {
  //       console.error("Error while changing password:", error);
  //     }
  //   };
  const defaultValues = {
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
  };
  const validationSchema = yup.object().shape({
    oldpassword: yup.string().required("Please enter a valid password"),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
    //   "please enter valide password"
    // ),

    newpassword: yup
      .string()
      .required("Please enter a valid new password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
        "please enter valide password"
      ),

    confirmpassword: yup
      .string()
      .required("Please enter a valid confirm password")
      .oneOf([yup.ref("newpassword")], "Passwords does not match"),
  });
  return (
    <Box className={classes.mainAppBox}>
      <Typography variant="h2"> Change Password</Typography>
      <Box class="subBox">
        <Formik
          onSubmit={(values) => handleSubmit1(values)}
          initialValues={defaultValues}
          validationSchema={validationSchema}
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
            <Form action="" style={{ width: "100%" }} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item lg={8} xs={12}>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box>
                      <Typography variant="h6">Old Password</Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter old password"
                        type={showPassword ? "text" : "password"}
                        name="oldpassword"
                        value={values.oldpassword}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(
                          touched.oldpassword && errors.oldpassword
                        )}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className="textfiledicons"
                            ></InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                <Box>
                                  {showPassword ? <HiEye /> : <HiEyeOff />}
                                </Box>
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <FormHelperText error className={classes.helperText}>
                        {touched.oldpassword && errors.oldpassword}
                      </FormHelperText>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}
                    style={{ marginTop: "16px" }}
                  >
                    <Box>
                      <Typography variant="h6">New Password</Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter new password"
                        type={showPassword1 ? "text" : "password"}
                        name="newpassword"
                        value={values.newpassword}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(
                          touched.newpassword && errors.newpassword
                        )}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className="textfiledicons"
                            ></InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword1(!showPassword1)}
                                edge="end"
                              >
                                <Box>
                                  {showPassword1 ? <HiEye /> : <HiEyeOff />}
                                </Box>
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <FormHelperText error className={classes.helperText}>
                        {touched.newpassword && errors.newpassword}
                      </FormHelperText>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}
                    style={{ marginTop: "16px" }}
                  >
                    <Box>
                      <Typography variant="h6">Confirm Password</Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter confirm password"
                        type={showPassword2 ? "text" : "password"}
                        name="confirmpassword"
                        value={values.confirmpassword}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(
                          touched.confirmpassword && errors.confirmpassword
                        )}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className="textfiledicons"
                            ></InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword2(!showPassword2)}
                                edge="end"
                              >
                                <Box>
                                  {showPassword2 ? <HiEye /> : <HiEyeOff />}
                                </Box>
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <FormHelperText error className={classes.helperText}>
                        {touched.confirmpassword && errors.confirmpassword}
                      </FormHelperText>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Box style={{ padding: "50px 20px 20px 31px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  className="filterBtn"
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Changepassword;
