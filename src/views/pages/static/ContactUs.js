import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
  makeStyles,
  FormHelperText,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ApiConfig } from "src/config/apiConfig";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getApiHandler } from "src/config/service";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter valid email address.")
    .required("Email address is required.")
    .min(8, "Email address must be at least 8 characters.")
    .max(79, "Email address must not exceed 80 characters."),

  name: Yup.string()
    .required("Name is required.")
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name must not exceed 50 characters.")
    .matches(/^[a-zA-Z\s]+$/, "Name should only contain letters."),
  // .matches(/^[a-zA-Z\s]+$/, "Full name should only contain letters."),

  mobileNumber: Yup.string()
    .min(10, "Mobile number must be at least 10 digits.")
    .max(16, "Mobile number must not exceed 16 digits.")
    .required("Mobile number is required."),

  message: Yup.string()
    .required("Message is required.")
    .min(10, "Message must be at least 10 characters.")
    .max(1250, "Message must not exceed 1250 characters."),
  isNotARobot: Yup.boolean()
    .oneOf([true], "You must confirm that you're not a robot.")
    .required("You must confirm that you're not a robot."),
});

const useStyles = makeStyles((theme) => ({
  contactUsContainer: {
    marginTop: "56px",
    marginBottom: "72px",
    "& .react-tel-input": {
      width: "100% !important",
      "& input": {
        width: "100% !important",
        background: theme.palette.background.default,
        height: "55px",
        border: "1px solid rgba(0, 0, 0, 0.25)",
        marginBottom: "20px",
        fontFamily: "Outfit",
        "&:-webkit-autofill": {
          boxShadow: `0 0 0 1000px ${theme.palette.background.default} inset !important`,
        },
      },
    },
    "& .leftContactBox": {
      "& h2": {
        fontSize: "35px",
        color: "#202123",
        fontWeight: 500,
        marginBottom: "19px",
        lineHeight: "26px",
      },
      "& h6": {
        color: "rgba(32, 33, 35, 0.60)",
        width: "100%",
        maxWidth: "664px",
      },
      "& .alignIt": {
        display: "flex",

        gap: "10px",
      },
      "& .contactinfo": {
        gap: "30px",
        "& .contactinfoIn": {
          gap: "60px",
          "& .contactinfoInChild": {
            display: "flex",
            flexDirection: "column",
            gap: "35px",
            "& .nameContactUS": {
              color: "rgba(0, 0, 0, 0.87)",
              fontWeight: 300,
              lineHeight: "26px",
            },
            "& .infoContactUS": {
              color: "rgba(22, 30, 41, 0.60)",
              fontSize: "14px",
              fontWeight: 300,
              lineHeight: "26px",
              width: "100%",
              maxWidth: "322px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "5px",
            },
          },
        },
      },
    },
    "& .rightContactBox": {
      display: "flex",
      flexDirection: "column",
      gap: "30px",
      "& h6": {
        color: theme.palette.primary.dark,
        marginBottom: "8px",
      },
      "& .contactUsTextfield": {
        "& .MuiOutlinedInput-root": {
          height: "55px",
          backgroundColor: theme.palette.background.default,
          border: "1px solid rgba(0, 0, 0, 0.25)",
        },
      },
      "& .fullCheckbox": {
        alignItems: "start",
        marginTop: "-26px",
        "& p": {
          color: theme.palette.text.primary,
        },
      },
      "& .contactUsTextarea": {
        "& .MuiOutlinedInput-root": {
          height: "116px",
          backgroundColor: theme.palette.background.default,
          border: "1px solid rgba(0, 0, 0, 0.25)",
        },
      },
      "& .buttonContactUs": {
        "& button": {
          width: "100%",
          maxWidth: "306px",
          height: "55px",
          padding: "10px 30px",
          fontSize: "17px",
        },
      },
    },
  },
}));
const ContactUs = () => {
  const [isloading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [contactDetail, setContactDetail] = useState([]);
  const classes = useStyles();

  const initialValues = {
    email: "",
    name: "",
    mobileNumber: "",
    message: "",
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission here
    console.log(values);
    setSubmitting(false);
  };
  const contactData = [
    {
      image: <img src="images/ContactCall.png" alt="call" />,
      name: "Email",
      info: "+254 797 771771",
    },
    {
      image: <img src="images/ContactMail.png" alt="mail" />,
      name: "Phone Number",
      info: "connect@enterprise.com",
    },
    {
      image: <img src="images/ContactLocation.png" alt="location" />,
      name: "Location",
      info: "INTEGRAL ENTERPRISE LIMITED Jadala Place, 1st FloorNgong Lane, Off Ngong Road",
    },
  ];
  const isSubmitDisabled = (values) => {
    return (
      !values ||
      !values.name ||
      !values.email ||
      !values.mobileNumber ||
      !values.message
      // ||
      // !isRecaptchaVerified
    );
  };
  const contactusHandler = async (values) => {
    setIsLoading(true);
    alert("dfsdiofiosdj");
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.contactUs,
        data: {
          email: values.email,
          name: values.name,
          mobile_number: values.mobileNumber,
          message: values.message,
        },
      });
      if (res.data?.ResponseCode === 201) {
        console.log(res);
        toast.success(res?.data?.ResponseMessage);
        setIsLoading(false);
        setOpenDialog(true);
        // sessionStorage.setItem("userToken", res.data.result.token);
      } else {
        console.log(
          res.data?.ResponseMessage || "Something went wrong. Please try again."
        );
        setIsLoading(false);

        return null;
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.ResponseMessage ||
          "Something went wrong. Please try again."
      );
      setIsLoading(false);
    }
  };

  const getContact = async () => {
    setIsLoading(true);
    const res = await getApiHandler("getContactUsDetails");
    setIsLoading(false);
    if (!res) {
      return;
    }
    setContactDetail(res?.responseBody?.length > 0 ? res?.responseBody : {});
  };
  useEffect(() => {
    // Scroll to the top of the page when the component is loaded
    window.scrollTo({ top: 0, behavior: "smooth" });
    getContact();
  }, []);

  return (
    <Container maxWidth="xlg" className={classes.contactUsContainer}>
      <Box sx={{ paddingX: { md: "144px", xs: "30px" } }} py={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <Box className="leftContactBox">
              <Typography variant="h2">Get in touch with us</Typography>
              <Typography variant="h6">
                Lorem ipsum dolor sit amet consectetur. Sit risus id placerat
                morbi. Velit pellentesque sed duis id aliquam quis leo congue.
              </Typography>
              <Box mt={5} className="contactinfo displayColumnStart">
                {contactDetail.map((item) => {
                  return (
                    <Box className="displayStart contactinfoIn">
                      {item.image}
                      <Box className="contactinfoInChild">
                        {/* <Typography variant="body2" className="nameContactUS">
                          {item.name || "--"}
                        </Typography> */}
                        <Box className="alignIt">
                          <img
                            src="images/ContactMail.png"
                            height={"33px"}
                            width={"33px"}
                            alt=""
                          />
                          <Box>
                            <Typography variant="body2">Email</Typography>
                            <Typography
                              variant="body2"
                              className="infoContactUS"
                            >
                              {item.email || "--"}
                            </Typography>
                          </Box>
                        </Box>
                        <Box className="alignIt">
                          <img
                            src="images/ContactCall.png"
                            height={"33px"}
                            width={"33px"}
                            alt=""
                          />
                          <Box>
                            <Typography variant="body2">
                              Phone Number
                            </Typography>
                            <Typography
                              variant="body2"
                              className="infoContactUS"
                            >
                              {item.mobile_number || "--"}
                            </Typography>
                          </Box>
                        </Box>
                        <Box className="alignIt">
                          <img
                            src="images/ContactLocation.png"
                            height={"33px"}
                            width={"33px"}
                            alt=""
                          />
                          <Box>
                            <Typography variant="body2">Location</Typography>
                            <Typography
                              variant="body2"
                              className="infoContactUS"
                            >
                              {item.location || "--"}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box mt={5}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7975.85217825692!2d103.85141638029147!3d1.2902356818871847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19b6a358b8fb%3A0x3187729d77288a41!2s10%2010%20High%20Street%20Centre%201%20North%20Bridge%20Rd%2C%20Singapore%20179094!5e0!3m2!1sen!2sca!4v1624308918396!5m2!1sen!2sca"
                  width="100%"
                  frameborder="0"
                  style={{ border: 0, height: "262.326px" }}
                ></iframe>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                contactusHandler(values);
                resetForm();
              }}
            >
              {({
                errors,
                touched,
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
              }) => (
                <Form>
                  <Box className="rightContactBox">
                    <Box>
                      <Typography variant="h6">Name</Typography>
                      <Field
                        as={TextField}
                        variant="outlined"
                        placeholder="Enter your name"
                        fullWidth
                        name="name"
                        className="contactUsTextfield"
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                        FormHelperTextProps={{
                          style: {
                            marginLeft: "0px",
                          },
                          
                        }}
                        inputProps={{
                          maxLength: 51,
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="h6">Email</Typography>
                      <Field
                        as={TextField}
                        variant="outlined"
                        placeholder="Enter email address"
                        fullWidth
                        name="email"
                        className="contactUsTextfield"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        FormHelperTextProps={{
                          style: {
                            marginLeft: "0px",
                          },
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="h6">Mobile Number</Typography>
                      {/* <Field
                      as={TextField}
                      variant="outlined"
                      placeholder="Enter mobile number"
                      fullWidth
                      name="mobileNumber"
                      className="contactUsTextfield"
                    /> */}
                      <PhoneInput
                        style={{ width: "100%" }}
                        country={"in"}
                        onChange={(mobileNumber, cc) => {
                          setFieldValue("mobileNumber", mobileNumber);
                        }}
                        onBlur={handleBlur}
                        inputProps={{
                          name: "mobileNumber",
                          required: true,
                        }}
                        fullWidth
                      />

                      {touched.mobileNumber && errors.mobileNumber && (
                        <FormHelperText error className="helperText">
                          {errors.mobileNumber}
                        </FormHelperText>
                      )}
                    </Box>
                    <Box>
                      <Typography variant="h6">Message</Typography>
                      <Field
                        as={TextField}
                        variant="outlined"
                        placeholder="Message type here...."
                        fullWidth
                        name="message"
                        className="contactUsTextarea"
                        rows={4}
                        maxRows={5}
                        multiline
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.message && Boolean(errors.message)}
                        helperText={touched.message && errors.message}
                        FormHelperTextProps={{
                          style: {
                            marginLeft: "0px",
                          },
                        }}
                      />
                    </Box>
                    <Box>
                      <Box className="displaySpacebetween fullCheckbox">
                        <Box className="displayStart">
                          <Field
                            type="checkbox"
                            name="isNotARobot"
                            as={Checkbox}
                            color="primary"
                          />
                          <Typography variant="body2">
                            I'm not a Robot
                          </Typography>
                        </Box>
                        <img src="images/reCaptcha.png" alt="" />
                      </Box>
                      <FormHelperText error>
                        {errors.isNotARobot}
                      </FormHelperText>
                    </Box>

                    <Box className="displayCenter buttonContactUs">
                      <Button variant="contained" color="primary" type="submit">
                        Send Message
                        {isloading && (
                          <CircularProgress
                            size={20}
                            style={{ color: "#fff", marginLeft: "10px" }}
                          />
                        )}
                      </Button>
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
      >
        <Box style={{ textAlign: "center" }}>
          <img
            src="./images/order.png"
            style={{ width: "100%", maxWidth: "150px" }}
            alt=""
          />
        </Box>
        <DialogTitle style={{ textAlign: "center" }}>
          <Typography variant="h4">Thank You!</Typography>{" "}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" style={{ textAlign: "center" }}>
            Thank you for writing to us. We got your request and within 2
            business days, we will get in touch.
          </Typography>
        </DialogContent>
        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            variant="contained"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ContactUs;
