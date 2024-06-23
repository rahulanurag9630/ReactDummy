import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  FormHelperText,
  Divider,
  Grid,
  Checkbox,
  FormControl,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { HiEye, HiEyeOff, HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { Form, Formik } from "formik";
import * as yep from "yup";
import { CgKey } from "react-icons/cg";
import { AiOutlineArrowLeft } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const useStyle = makeStyles((theme) => ({
  createAccountBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    
    "& .widthBox": {
      maxWidth: "1000px",
      margin: "auto",
    },
    "& h2": {
      color: "#262626",
    },
    "& .paperBox": {
      padding: "40px 50px !important",
      [theme.breakpoints.down("sm")]: {
        padding: "20px 15px 50px !important",
        marginTop:"40px"
      },
    },
    "& .buttonBox": {
      padding: "35px 0",
      display: "flex",
      justifyContent: "flex-start",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
        padding: "10px"
      },
    },
    "& .checkSpan": {
      color: "#21BCED !important",
      cursor: "pointer",
    },
    "& .displayStart": {
      maxWidth: "390px",
      alignItems:"flex-start",
      "& .MuiCheckbox-root":{
        padding:"2px"
      },
      "& .MuiCheckbox-colorSecondary.Mui-checked":{
        color:"#EC1F24"
      }
    },
    "& .backBtn": {
      position: "absolute",
      top: 30,
      left: 30,
      border: "1px solid rgba(0, 0, 0, 0.08)",
      [theme.breakpoints.down("sm")]: {
        top: 15,
      left: 15,
      },
    },
  },
}));

export default function CreateAccount() {
  const classes = useStyle();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");

  const formInitialSchema = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  };
  const formValidationSchema = yep.object().shape({
    fullName: yep
      .string()
      .max(25, "Should not exceeds 25 characters.")
      .required("Full name is required."),
    email: yep
      .string()
      .email("Please enter valid email.")
      .max(256, "Should not exceeds 256 characters.")
      .required("Email is required."),
    password: yep
      .string()
      .trim()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Please enter valid password."
      )
      .required("Password is required.")
      .max(16, "Password should not exceeds 16 characters.")
      .min(8, "Password must be minimum of 8 characters."),
    confirmPassword: yep
      .string()
      .required("Please enter confirm password.")
      .oneOf([yep.ref("password"), null], "Password does not match."),
    phone: yep
      .string()
      .required("Phone number is required.")
      .max(13, "Should not exceeds 13 digits.")
      .min(7, "Must be only 7 digits."),
  });
  const handleFormSubmit = async (values) => {
    history.push("/login");
  };

  return (
    <Box className={classes.createAccountBox}>
      <Box>
        <IconButton
        variant="contained"
        className="backBtn"
        onClick={() => history.goBack()}
      >
        <AiOutlineArrowLeft style={{ color: "#000", fontSize: "15px" }} />
      </IconButton>
      </Box>
      
      <Container>
        <Box className="widthBox">
          <Paper elevation={1} className="paperBox">
            <Box mb={4}>
              <Typography variant="h2">Create Your Account</Typography>
              <Box mt={2}>
              <Typography variant="body2">To get started, we need you to create an account with us. It's a quick and straight forward process that will only take a few minutes.</Typography>
            </Box>
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
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter full name"
                        name="fullName"
                        value={values.fullName}
                        error={Boolean(touched.fullName && errors.fullName)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className="textfiledicons"
                            >
                              <IconButton>
                                <HiOutlineUser />
                              </IconButton>
                              <Divider
                                orientation="vertical"
                                style={{ height: "27px" }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <FormHelperText error className={classes.helperText}>
                        {touched.fullName && errors.fullName}
                      </FormHelperText>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Email"
                        name="email"
                        value={values.email}
                        error={Boolean(touched.email && errors.email)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className="textfiledicons"
                            >
                              <IconButton>
                                <HiOutlineMail />
                              </IconButton>
                              <Divider
                                orientation="vertical"
                                style={{ height: "27px" }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <FormHelperText error className={classes.helperText}>
                        {touched.email && errors.email}
                      </FormHelperText>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={values.password}
                        error={Boolean(touched.password && errors.password)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className="textfiledicons"
                            >
                              <IconButton>
                                <CgKey />
                              </IconButton>
                              <Divider
                                orientation="vertical"
                                style={{ height: "27px" }}
                              />
                            </InputAdornment>
                          ),
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
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder=" Confirm password"
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={values.confirmPassword}
                        error={Boolean(
                          touched.confirmPassword && errors.confirmPassword
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className="textfiledicons"
                            >
                              <IconButton>
                                <CgKey />
                              </IconButton>
                              <Divider
                                orientation="vertical"
                                style={{ height: "27px" }}
                              />
                            </InputAdornment>
                          ),
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
                        {touched.confirmPassword && errors.confirmPassword}
                      </FormHelperText>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Box>
                        <FormControl fullWidth variant="outlined">
                          <PhoneInput
                            country={"in"}
                            inputStyle={{
                              background: "rgba(0, 0, 0, 0.05)",
                              width: "100%",
                              height: "48px",
                              borderRadius: "7px",
                            }}
                            value={values.phone}
                            error={Boolean(touched.phone && errors.phone)}
                            onBlur={handleBlur}
                            onChange={(phone, e) => {
                              setCountryCode(e.dialCode);
                              setFieldValue("phone", phone);
                            }}
                          />
                          <FormHelperText error className={classes.helperText}>
                            {touched.phone && errors.phone}
                          </FormHelperText>
                        </FormControl>
                      </Box>
                    </Grid>
                  </Grid>
                  <Box className="displayStart" mt={3}>
                    <Checkbox onChange={handleChange} />
                    <Typography variant="body2">
                      By creating an account you agree to our{" "}
                      <span className="checkSpan" onClick={()=>{history.push("/terms-and-conditions")}}>Terms and Condition</span> and{" "}
                      <span className="checkSpan" onClick={()=>{history.push("/privacy")}}>Privacy Policy .</span>
                    </Typography>
                  </Box>
                  <Box className="buttonBox">
                    <Button variant="contained" color="primary" type="submit">
                      CREATE ACCOUNT
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
            <Box mt={5} align="left">
              <Typography variant="body2">
                Already have an account?&nbsp;
                <span
                  style={{
                    color: "#EC1F24",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                  onClick={() => history.push("/login")}
                >
                  LOGIN
                </span>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
