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
  Grid,
} from "@material-ui/core";
import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Form, Formik } from "formik";
import * as yep from "yup";
import { useHistory } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { CgKey } from "react-icons/cg";

const useStyles = makeStyles((theme) => ({
  changePassBox: {
    zIndex: "999",
    "& h2": {
      fontWeight: "600",
      fontSize: "30px",
      color: "#262626",
    },
    "& h5": {
      fontFmily: "Clash Display",
      fontWeight: "500",
      fontSize: "24px",
      color: "#262626",
      marginBottom: "7px",
    },
    "& h6": {
      fontWeight: "400",
      color: "#262626",
    },
    "& p": {
      color: "#78819F",
      marginBottom: "5px",
    },
    "& .backBtn": {
      border: "1px solid rgba(0, 0, 0, 0.08)",
    },
    "& .paperBox": {
      padding: "40px 50px 287px !important",
      [theme.breakpoints.down("sm")]: {
        padding: "20px 15px 50px !important",
      },
      "& .buttonBox": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50px",
      },
      "& .changeBox":{
        paddingLeft:"120px",
        paddingRight:"120px",
        [theme.breakpoints.down("sm")]: {
          padding: "0",
        },
      }
    },
    iconsClass1: {
      color: "#585757",
      fontSize: "20px",
    },
  },
}));

export default function ChangePassword() {
  const classes = useStyles();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const formInitialSchema = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };
  const formValidationSchema = yep.object().shape({
    oldPassword: yep
      .string()
      .trim()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character."
      )
      .required("Please enter current password."),
    password: yep
      .string()
      .trim()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character."
      )
      .required("The new password must be different from the current password.")
      .min(6, "Please enter atleast 6 characters")
      .max(20, "You can enter only 30 characters"),
    confirmPassword: yep
      .string()
      .required("Please enter confirm password.")
      .oneOf([yep.ref("password"), null], "Password does not match."),
  });
  const handleFormSubmit = async (values) => {
    history.push("/profile");
  };

  return (
    <Box className={classes.changePassBox}>
      <Paper elevation={1} className="paperBox">
        <Box mb={2} style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            variant="contained"
            className="backBtn"
            onClick={() => history.goBack()}
          >
            <AiOutlineArrowLeft style={{ color: "#000", fontSize: "15px" }} />
          </IconButton>
          <Typography variant="h2">&nbsp;&nbsp; Security</Typography>
        </Box>
        <Divider style={{ height: "2px" }} />

        <Box className="changeBox">
        <Box my={7}>
          <Typography variant="h5">Change Password</Typography>
          <Typography variant="body2">
            Your new password must be different from previous used passwords.
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
              <Box>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <Typography variant="body2">Old Password</Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Please enter current password"
                        type={showPassword ? "text" : "password"}
                        name="oldPassword"
                        value={values.oldPassword}
                        error={Boolean(
                          touched.oldPassword && errors.oldPassword
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
                        {touched.oldPassword && errors.oldPassword}
                      </FormHelperText>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <Typography variant="body2">New Password</Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter new password"
                        type={showPassword1 ? "text" : "password"}
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
                                onClick={() => setShowPassword1(!showPassword1)}
                                edge="end"
                              >
                                <Box>
                                  {showPassword1 ? (
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
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <Typography variant="body2">Confirm Password</Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter confirm password"
                        type={showPassword2 ? "text" : "password"}
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
                                onClick={() => setShowPassword2(!showPassword2)}
                                edge="end"
                              >
                                <Box>
                                  {showPassword2 ? (
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
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box className="buttonBox">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ paddingLeft: "55px", paddingRight: "55px" }}
                >
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
        </Box>
      </Paper>
    </Box>
  );
}
