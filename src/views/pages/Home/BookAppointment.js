import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  makeStyles,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Button,
  Dialog,
  CircularProgress,
  Hidden,
  FormHelperText,
  InputLabel,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import TopBar from "src/layouts/HomeLayout/TopBar";
import { MdModeEdit } from "react-icons/md";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { postApiHandler } from "../../../config/service";
import { ApiConfig } from "src/config/apiConfig";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import GoBack from "src/component/GoBack";
import { FaArrowLeftLong } from "react-icons/fa6";

const useStyles = makeStyles((theme) => ({
  mainDashBox: {
    "& .container": {
      padding: "50px 5%",
      display: "flex",
      flexDirection: "column",
      gap: "30px",
      "& .bookAppointmentHeader": {
        display: "flex",
        alignItems: "center",
      },
    },
    "& h2": {
      color: "#161E29",
      fontSize: "35px",
      fontStyle: "normal",
      fontWeight: "500",
    },
    "& h6": {
      marginBottom: "5px",
    },
    "& .inputMainBox": {
      display: "flex",
      flexDirection: "column",
      // gap: "5px",
    },
    "& .dateBox": {
      padding: "15px",
      border: "1px solid rgba(0, 0, 0, 0.10)",
      borderRadius: "10px",
      background: "rgba(0, 0, 0, 0.02)",
      "& .MuiIconButton-root": {
        padding: "0px !important",
      },
    },
    "& .MuiFormControl-marginNormal": {
      marginTop: "0",
      marginBottom: "0",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "none",
    },
    "& .formContent": {
      display: "flex",
      flexDirection: "column",
      gap: "30px",
      "@media(max-width:767px)": { gap: "20px" },
    },
    "& .MuiFormHelperText-contained": {
      marginLeft: "0px !important",
    },
    "& .imgBox": {
      marginLeft: "65px",
      width: "100%",
      fill: "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 43.64%, #FFF 68.2%, #FFF 100%)",
    },
    "& body2": {
      color: "#000",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "26px" /* 162.5% */,
    },
    "& .reportBox": {
      height: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 20px",
      border: "1px solid #681E65",
      borderRadius: "10px",
      background: "rgba(0, 0, 0,0.05)",
      cursor: "pointer",
    },
    "& .MuiFilledInput-input": {
      padding: "15px",
    },
    "& .MuiFilledInput-root": {
      background: "rgba(0,0,0,0.02)",
      border: "1px solid rgba(0,0,0,0.10)",
      borderRadius: "10px",
    },
    "& .MuiFilledInput-underline:before": {
      borderBottom: "none",
    },
    "& .MuiFilledInput-underline:after": {
      borderBottom: "none",
    },
    "& .filterBtn": {
      borderRadius: "10px",
      fontSize: "18px",
      padding: "15px 45px",
      height: "auto",
      "@media(max-width:599px)": {
        fontSize: "14px",
      },
    },
    "& .dialogContent": {
      display: "flex",
      flexDirection: "column",
      gap: "35px",
    },
  },
  sub: {
    "& .MuiDialog-paper": {
      margin: "20px",
    },
    "& .mainBox": {
      backgroundColor: "#FFF",
      padding: "50px",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "30px",
      "@media (max-width:400px)": {
        padding: "20px",
      },
      "@media(max-width:767px)": {
        gap: "20px",
      },
      "& h4": {
        fontSize: "30px",
        color: "#080515",
        paddingTop: "30px",
        textAlign: "center",
        lineHeight: "normal",
      },
      "& h6": {
        color: "rgba(0, 0, 0, 0.60)",
        textAlign: "center",
        lineHeight: "normal",
      },
    },
    "& .filterBtn": {
      borderRadius: "10px",
      fontSize: "18px",
      padding: "15px 45px",
      height: "auto",
      width: "100%",
      "@media(max-width:599px)": {
        fontSize: "14px",
      },
    },
  },
}));

const formValidationSchema = Yup.object().shape({
  appointment_date: Yup.date().required("Appointment date is required"),
  appointment_time: Yup.string().required("Appointment time is required"),
  appointment_type: Yup.string().required("Appointment type is required"),
  message: Yup.string().required("Message is required"),
});

const BookAppointment = () => {
  const history = useHistory();
  const location = useLocation();
  const id = location?.state?.id;
  const { state } = location;
  const OPD = "OPD";
  const IPD = "IPD";
  const classes = useStyles();
  const { scanImageIds, labReportIds } = state;
  const [selectedDate, setSelectedDate] = useState(null);
  const [disabletime, setDisableTime] = useState(false);
  const [timeError, setTimeError] = useState(false);

  const handleDateChange = (date, setFieldValue) => {
    setSelectedDate(date);

    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    let selectedDate, selectedMonth, selectedYear;
    if (date) {
      selectedDate = date.toISOString().split("T")[0].split("-")[2];
      selectedMonth = date.toISOString().split("T")[0].split("-")[1];
      selectedYear = date.toISOString().split("T")[0].split("-")[0];
    }

    if (
      currentDate.getDate() == selectedDate &&
      currentDate.getMonth() + 1 == selectedMonth &&
      currentDate.getFullYear() == selectedYear
    ) {
      const newHour = currentMinute >= 30 ? currentHour + 1 : currentHour;
      const newMinute = (currentMinute + 30) % 60;

      const formattedTime = `${newHour < 10 ? "0" : ""}${newHour}:${
        newMinute < 10 ? "0" : ""
      }${newMinute}`;
      setFormData({
        ...formData,
        appointment_date: date ? date.toISOString().split("T")[0] : "",
        appointment_time: formattedTime,
      });
      setFieldValue("appointment_time", formattedTime);
      setDisableTime(true);
      setTimeError(false);
    } else {
      setFormData({
        ...formData,
        appointment_date: date ? date.toISOString().split("T")[0] : "",
      });
      setDisableTime(false);
    }
  };

  useEffect(() => {
    console.log(location?.state, "ajshfuaa");
  }, [location?.state]);

  const [type, setType] = React.useState("");
  const [dataIsLoading, setIsDataLoading] = useState(false);
  const handleChange = (event) => {
    setType(event.target.value);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setFormData({
      doctor_id: "",
      appointment_date: "",
      appointment_time: "",
      appointment_type: "",
      message: "",
      scan_images: [],
      lab_reports: [],
    });
  };

  const handleAppointment = () => {
    history.push("/appointment");
    return;
  };

  const [formData, setFormData] = useState({
    doctor_id: location?.state?.id || location?.state?.formData?.doctor_id,
    appointment_date: location?.state?.formData?.appointment_date
      ? location?.state?.formData?.appointment_date
      : "",
    appointment_time: location?.state?.formData?.appointment_time
      ? location?.state?.formData?.appointment_time
      : "",
    appointment_type: location?.state?.formData?.appointment_type
      ? location?.state?.formData?.appointment_type
      : "",
    message: location?.state?.formData?.message
      ? location?.state?.formData?.message
      : "",
    scan_images: scanImageIds || [],
    lab_reports: labReportIds || [],
  });
  const formInitialSchema = {
    appointment_date: formData.appointment_date,
    appointment_time: formData.appointment_time,
    appointment_type: formData.appointment_type,
    message: formData.message,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // setFieldTouched(name, true, false);
  };
  const handleFormSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You Need to login first");
      history.push("/login");
      return;
    }
    const currentDate = new Date();
    // if (selectedDate < currentDate) {
    //     toast.error("Appointment date cannot be in the past");
    //     return;
    // }
    setIsDataLoading(true);
    try {
      const response = await axios({
        url: ApiConfig["bookAppointment"],
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          ...formData,
        },
      });
      setIsDataLoading(false);
      console.log(response, "ressssssssssssss");
      if (response?.data?.responseCode === 201) {
        setOpen(true);

        console.log(response?.data?.responseData);
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error(err?.response?.data?.responseMessage);
      setIsDataLoading(false);
    }
  };
  useEffect(() => {
    if (state) {
      const { scanImageIds, labReportIds, formData } = state;
      console.log("Scan Image IDs:", scanImageIds);
      console.log("Lab Report IDs:", labReportIds);
      console.log("Lab Report IDs:", formData);
    }
  }, [state]);
  // useEffect(() => {
  //   if (location.state && location.state.formData) {
  //     setFormData(location.state.formData);
  //   }
  // }, [location.state]);

  const healthReporthandler = () => {
    history.push({
      pathname: "/healthreportmanage",
      state: formData,
    });
  };
  return (
    <Box className={classes.mainDashBox}>
      <TopBar />
      <Box className="container">
        <Box className="bookAppointmentHeader">
          <FaArrowLeftLong
            style={{ fontSize: "35px" }}
            onClick={() => window.history.back()}
          />
          <Typography variant="h2" style={{ marginLeft: "10px" }}>
            Book Your Appointment
          </Typography>
        </Box>
        <Formik
          initialValues={formInitialSchema}
          validationSchema={formValidationSchema}
          onSubmit={(formData) => handleFormSubmit(formData)}
          // onSubmit={handleFormSubmit}
        >
          {({ errors, touched, handleSubmit, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item lg={5} md={5} sm={12} xs={12}>
                  <Box className="formContent">
                    <Box className="inputMainBox">
                      <Typography variant="h6">Appointment Date</Typography>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="DD/MM/YYYY"
                        placeholder="DD/MM/YYYY"
                        margin="normal"
                        id="date-picker-inline"
                        value={
                          selectedDate ||
                          (formData.appointment_date
                            ? new Date(formData.appointment_date)
                            : null)
                        }
                        onKeyDown={(e) => {
                          e.preventDefault();
                        }}
                        onChange={(e) => {
                          handleDateChange(e, setFieldValue);
                          setFieldValue(
                            "appointment_date",
                            e ? e.toISOString().split("T")[0] : ""
                          );
                        }}
                        className="dateBox"
                        disablePast={true}
                        error={
                          errors.appointment_date && touched.appointment_date
                        }
                      />
                      {errors.appointment_date && touched.appointment_date && (
                        <FormHelperText error>
                          {errors.appointment_date}
                        </FormHelperText>
                      )}
                    </Box>
                    <Box className="inputMainBox">
                      <Typography variant="h6">Appointment Time</Typography>

                      <TextField
                        type="time"
                        fullWidth
                        variant="outlined"
                        placeholder="Select time"
                        name="appointment_time"
                        value={formData.appointment_time}
                        onChange={(e) => {
                          const currentTime1 = new Date();
                          const selectedTime = new Date(
                            `${currentTime1.toDateString()} ${e.target.value}`
                          );

                          const currentTime = new Date(
                            currentTime1.getTime() + 30 * 60000
                          );

                          if (disabletime) {
                            if (selectedTime >= currentTime) {
                              setTimeError(false);
                              handleInputChange(e);
                              setFieldValue("appointment_time", e.target.value);
                            } else {
                              setTimeError(true);
                            }
                          } else {
                            setTimeError(false);
                            handleInputChange(e);
                            setFieldValue("appointment_time", e.target.value);
                          }
                        }}
                        error={
                          errors.appointment_time && touched.appointment_time
                        }
                        helperText={
                          errors.appointment_time &&
                          touched.appointment_time &&
                          errors.appointment_time
                        }
                      />
                    </Box>
                    <Box className="inputMainBox">
                      <Typography variant="h6">Appointment Type</Typography>
                      <FormControl
                        variant="filled"
                        className={classes.formControl}
                        error={
                          errors.appointment_type && touched.appointment_type
                        }
                      >
                        <Select
                          id="demo-simple-select-filled"
                          value={formData.appointment_type}
                          onChange={(e) => {
                            handleInputChange(e);
                            setFieldValue("appointment_type", e.target.value);
                          }}
                          name="appointment_type"
                          MenuProps={{
                            getContentAnchorEl: null,
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            PaperProps: {
                              style: {
                                maxHeight: "300px",
                                marginTop: "8px",
                              },
                            },
                          }}
                        >
                          <MenuItem value={OPD}>OPD</MenuItem>
                          <MenuItem value={IPD}>IPD</MenuItem>
                        </Select>
                      </FormControl>
                      {errors.appointment_type && touched.appointment_type && (
                        <FormHelperText error>
                          {errors.appointment_type}
                        </FormHelperText>
                      )}
                    </Box>
                    <Box className="inputMainBox">
                      <Typography variant="h6">Message</Typography>
                      <textarea
                        style={{ fontFamily: "Outfit", fontSize: "16px " }}
                        id=""
                        cols="30"
                        rows="10"
                        className="dateBox"
                        placeholder="Type here...."
                        name="message"
                        value={formData.message}
                        onChange={(e) => {
                          handleInputChange(e);
                          setFieldValue("message", e.target.value);
                        }}
                        error={errors.message && touched.message}
                      />
                      {errors.message && touched.message && (
                        <FormHelperText error>{errors.message}</FormHelperText>
                      )}
                    </Box>
                    <Box className="reportBox" onClick={healthReporthandler}>
                      <Typography variant="body2">
                        Health Report Privilage
                      </Typography>
                      <MdModeEdit
                        color="#681E65"
                        // onClick={healthReporthandler}
                      />
                    </Box>
                    <Box mt={3}>
                      <Button
                        variant="contained"
                        className="filterBtn"
                        type="submit"
                      >
                        Submit Request
                        {dataIsLoading && (
                          <CircularProgress
                            size={20}
                            style={{ color: "#fff", marginLeft: "10px" }}
                          />
                        )}
                      </Button>
                    </Box>
                  </Box>
                </Grid>

                <Hidden smDown>
                  <Grid item lg={7} md={7} sm={12} xs={12}>
                    <Box>
                      <img
                        src="./images/doctor1.png"
                        className="imgBox"
                        alt=""
                      />
                    </Box>
                  </Grid>
                </Hidden>
              </Grid>
            </Form>
          )}
        </Formik>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.sub}
        >
          <Box className="mainBox">
            <Box style={{ textAlign: "center" }}>
              <img
                src="./images/request1.png"
                style={{ width: "100%", maxWidth: "200px" }}
                alt=""
              />
            </Box>
            <Typography variant="h4">
              Appointment Booked Successfully!
            </Typography>
            <Typography variant="h6">
              Your request for an appointment has been sent successfully.
            </Typography>

            <Button
              variant="contained"
              className="filterBtn"
              onClick={handleAppointment}
            >
              Ok
            </Button>
          </Box>
        </Dialog>
      </Box>
    </Box>
  );
};

export default BookAppointment;
