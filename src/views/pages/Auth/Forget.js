import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
  Paper,
  FormHelperText,
  InputAdornment,
  IconButton,
  Divider,
  Container,
  FormControl,
  CircularProgress,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { postApiHandler } from "../../../config/service";
import toast from "react-hot-toast";

const useStyles = makeStyles((theme) => ({
  forgetBox: {
    height: "initial",
    margin: "15px auto",
    maxHeight: "100%",
    maxWidth: "475px",
    // width: "100%",
    borderRadius: "10px",
    padding: "50px !important",
    boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.16)",
    "& .react-tel-input": {
      width: "100% !important",
      "& input": {
        width: "100% !important",
        background: theme.palette.background.default,
        height: "40px",
        borderRadius: "10px",
        border: "1.2px solid rgba(0, 0, 0, 0.10)",
        fontFamily: "Outfit",
        "&:-webkit-autofill": {
          boxShadow: `0 0 0 1000px ${theme.palette.background.default} inset !important`,
        },
      },
    },
    "& .paperBox": {
      padding: "0px",
      flexDirection: "column",
    },
    "& form": {
      width: "100%",
    },
    "& .forgotText": {
      margin: "20px 0",
      color: theme.palette.text.secondary,
      textAlign: "center",
      padding: "0px 10px",
    },
    "& label": {
      color: theme.palette.primary.dark,
      fontSize: "18px",
    },
    "& h3": {
      color: theme.palette.primary.dark,
      textAlign: "center",
      marginTop: "30px",
    },
    "& button": {
      borderRadius: "10px",
      fontSize: "18px",
    },
  },
}));

export default function Forget() {
  const classes = useStyles();
  const history = useHistory();
  const formInitialSchema = {
    email: "",
  };
  const formValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address.")
      .trim("Trailing spaces not allowed.")
      .required("Email address is required.")
      .matches(
        /^[a-zA-Z0-9._%+$-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address."
      )
      .min(8, "Email address must be at least 8 characters.")
      .max(49, "Email address must not exceed 50 characters."),
  });
  const [isloading, setIsLoading] = useState(false);
  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    console.log(values, "sssss");
    try {
      const response = await postApiHandler("forgotPassword", values);
      console.log(response);
      if (response.responseCode === 200) {
        history.push("/verify-otp", { email: values.email, forgot: true });
      } else {
        toast.error(response?.response?.data?.responseMessage);
      }

      setIsLoading(false);
    } catch (err) {
      // toast.error(err?.response?.data?.responseMessage || "An error occurred");
      console.error(err.res);
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <Box className={classes.forgetBox}>
        <Paper elevation={1} className="paperBox displayCenter">
          <img src="images/password.svg" alt="img" />
          <Typography variant="h3">Forgot password</Typography>
          <Box mt={1}>
            <Typography className="forgotText" variant="body2">
              Please enter your email address for the verification process, we
              will send a four-digit code to your email.
            </Typography>
          </Box>
          <Formik
            initialValues={formInitialSchema}
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
              isValid,
            }) => (
              <Form>
                {/* <Box mt={2}>
                  <PhoneInput
                    country={"in"}
                    value={values.mobile_number}
                    onChange={(phone) => setFieldValue("mobile_number", phone)}
                  />
                  <FormHelperText error className="helperText">
                    {touched.mobile_number && errors.mobile_number}
                  </FormHelperText>
                </Box> */}

                <Box mb={3}>
                  <Typography variant="h6" style={{ marginBottom: "5px" }}>
                    Email
                  </Typography>
                  <TextField
                    className="allTextFields"
                    fullWidth
                    variant="outlined"
                    placeholder="Enter email address"
                    name="email"
                    value={values.email}
                    error={Boolean(touched.email && errors.email)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{
                      maxLength: 50,
                    }}
                  />
                  <FormHelperText error className="helperText">
                    {touched.email && errors.email}
                  </FormHelperText>
                </Box>

                <Box mt={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isloading || !isValid || !values.email}
                  >
                    Continue
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
