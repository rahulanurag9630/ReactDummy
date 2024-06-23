import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormHelperText,
  Divider,
  FormControl,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Form, Formik } from "formik";
import * as yep from "yup";
import { CgKey } from "react-icons/cg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const useStyles = makeStyles((theme) => ({
  mobileBOx: {},
  iconClass1: {
    color: "#ADADAD",
    fontSize: "20px",
  },
}));

export default function Mobile() {
  const classes = useStyles();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const formInitialSchema = {
    phone: "",
    password: "",
  };
  const formValidationSchema = yep.object().shape({
    phone: yep
      .string()
      .required("Phone number is required.")
      .max(13, "Should not exceeds 13 digits.")
      .min(7, "Must be only 7 digits."),
    country: yep.string().required("Country is required."),

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
  });
  const handleFormSubmit = async (values) => {
    history.push("/dashboard");
  };
  const [tabs, setTabs] = useState("email");
  return (
    <Box className={classes.mobileBOx}>
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
            <Box mt={2}>
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
                    <InputAdornment position="start" className="textfiledicons">
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
            <Box className="displaySpaceBetween">
              <Typography
                variant="body2"
                style={{
                  color: "#EC1F24",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
                onClick={() => history.push("/forget-password")}
              >
                Forgot Password?
              </Typography>
            </Box>
            <Box className="buttonBox">
              <Button variant="contained" color="primary" type="submit">
                LOGIN
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      {/* <Box mt={5} align="center">
                <Typography variant="body2">
                  Don't have account?&nbsp;
                  <span
                    style={{
                      color: "#EC1F24",
                      cursor: "pointer",
                      fontWeight: "500",
                    }}
                    onClick={() => history.push("/sign-up")}
                  >
                    SIGNUP
                  </span>
                </Typography>
              </Box> */}
    </Box>
  );
}
