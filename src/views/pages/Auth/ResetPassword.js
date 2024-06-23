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
} from "@material-ui/core";
import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { CgKey } from "react-icons/cg";
import { Form, Formik } from "formik";
import * as yep from "yup";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  resetPassBox: {
    height: "100vh",
    position: "relative",
    zIndex: "999",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflowY: "auto",
    "& h2": {
      color: "#262626",
    },
    "& .paperBox": {
      padding: "40px 50px ",
      [theme.breakpoints.down("xs")]: {
        padding: "20px 15px 50px",
      },
    },
  },
  resetBox: {
    height: "initial",
    margin: "15px auto",
    maxHeight: "100%",
    maxWidth: "475px",
    width: "100%",
    "& .buttonBox": {
      padding: "35px 0 0",
      display: "flex",
      justifyContent: "flex-end",
    },
  },
  iconClass1: {
    color: "#585757",
    fontSize: "20px",
  },
}));

export default function ResetPassword() {
  const classes = useStyles();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const formInitialSchema = {
    newPassword: "",
    confirmPassword: "",
  };
  const formValidationSchema = yep.object().shape({
    newPassword: yep
      .string()
      .trim()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character."
      )
      .required("Please enter new password.")
      .min(6, "Please enter atleast 6 characters")
      .max(20, "You can enter only 30 characters"),

    confirmPassword: yep
      .string()
      .required("New password and Confirm password must be same.")
      .oneOf(
        [yep.ref("newPassword"), null],
        "Confirm password does not match."
      ),
  });
  const handleFormSubmit = async (values) => {
    history.push("/login");
  };
  return (
    <Box className={classes.resetPassBox}>
      <Container>
        <Box className={classes.resetBox}>
          <Paper elevation={2} className="paperBox">
            <Box mb={4}>
              <Typography variant="h2" color="primary">
                Reset Password
              </Typography>
              <Typography style={{ color: "#78819F" }} variant="body2">
              Enter the password to reset the password on your account.
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
                  <Box mt={2} mb={2}>
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
                  </Box>
                  <Box>
                    <Box mt={1}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Confirm password"
                        type={showPassword1 ? "text" : "password"}
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
                    </Box>
                    <FormHelperText error className={classes.helperText}>
                      {touched.confirmPassword && errors.confirmPassword}
                    </FormHelperText>
                  </Box>
                  <Box className="buttonBox">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
