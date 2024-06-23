import React, { useEffect, useState } from "react";

import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Box,
  Select,
  MenuItem,
  TextareaAutosize,
  makeStyles,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@material-ui/core";
import GoBack from "src/component/GoBack";
import { ApiConfig } from "src/config/apiConfig";
import axios from "axios";
import { debounce } from "lodash";
import { Add as AddIcon, Remove as RemoveIcon } from "@material-ui/icons";
import {
  useLocation,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { Autocomplete } from "@material-ui/lab";
import toast from "react-hot-toast";
import { format } from "date-fns";
// import UploadPrescription from "src/component/UploadPrescription";
const useStyle = makeStyles((theme) => ({
  mainBox: {
    "& p": {
      marginBottom: "5px",
    },
    "& .headingPatient": {
      "& p": {
        width: "190px",
      },
      "& .body1": {
        width: "100%",
      },
    },
    "& .body2": {
      width: "120px",
    },
    "& .downloadPdfCs": {
      [theme.breakpoints.down("sm")]: {
        flexWrap: "wrap",
      },
      "& .downloadBtn": {
        marginRight: "15px",
        [theme.breakpoints.down("xs")]: {
          width: "100%",
          marginBottom: "15px",
          marginRight: "0px",
        },
      },
      "& .viewBtn": {
        [theme.breakpoints.down("xs")]: {
          width: "100%",
        },
      },
    },
  },
  previousReport: {
    "& h4": {
      marginBottom: "16px",
    },
    "& .titleBox": {
      display: "flex",
      gap: "10px",
    },
    "& .subBox": {
      background: "#FFF",
      borderRadius: "15px",
      width: "100%",
      padding: "20px 0",
      filter: "drop-shadow(0px 10px 40px rgba(0, 0, 0, 0.16))",
    },
  },
  testTextField: {
    width: "40%",
    [theme.breakpoints.down("md")]: {
      width: "92%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "85%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "82%",
    },
  },
}));

const Prescription = () => {
  const history = useHistory();
  const classes = useStyle();
  const [prescripton, setPrescription] = useState("");
  const [scanData, setScanData] = useState([{}]);
  const [healthData, setHealthData] = useState([{}]);
  console.log("healthData=-=-=-", healthData?.sex);
  const [openComponent, setOpenComponent] = useState(false);
  const [labData, setLabData] = useState([{}]);
  const [medicineOptions, setMedicineOptions] = useState([]);
  console.log("medicineOptions=-=-=-", medicineOptions);
  const [currentDate, setCurrentDate] = useState("");
  const location = useLocation();
  const item = location?.state;
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [tests, setTests] = useState([""]);
  const [prescribedMedicines, setPrescribedMedicines] = useState([]);
  console.log("prescribedMedicines-=-=-=-", prescribedMedicines);
  const [prescribedTests, setPrescribedTests] = useState([]);
  const [isDetails, setDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [summary, setSummary] = useState("");
  const [summaryError, setSummaryError] = useState("");

  console.log("isDetails-=-=-=-", isDetails?.doctor_name);
  const [medicines, setMedicines] = useState([
    { name: "", dose: "", duration: "" },
  ]);
  //  const [submitbtn,setSubmitBtn]=useState(true)
  // const medicineOptions = ["Medicine1", "Medicine2", "Medicine3"];
  const [pdf, setpdf] = useState(false);

  //  const handleViewPdf = () => {
  // //  alert(prescripton)
  //   window.open(prescripton, '_self');
  // };

  // const handleDownloadPdf = () => {
  //   const link = document.createElement('a');
  //   link.href = prescripton;
  //   link.download = 'your-pdf-file.pdf';
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const handleAddTest = () => {
    openComponent && setTests([...tests, ""]);
    !openComponent && setTests([""]);
    setOpenComponent((val) => !val);
  };

  const handleAddTest1 = () => {
    openComponent && setTests([...tests, ""]);
    // setOpenComponent((val)=>!val);
  };

  const handleRemoveTest = (index) => {
    const newTests = tests.filter((_, i) => i !== index);
    setTests(newTests);
  };

  const handleTestChange = (index, event) => {
    const newTests = [...tests];
    newTests[index] = event.target.value;
    setTests(newTests);
  };

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: "", dose: "", duration: "" }]);
  };

  const handleRemoveMedicine = (index) => {
    const newMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(newMedicines);
  };

  // const handleMedicineChange = (index, value) => {
  //   const newMedicines = [...medicines];
  //   newMedicines[index].name = value;
  //   setMedicines(newMedicines);
  // };

  const handleDoseChange = (index, event) => {
    const newMedicines = [...medicines];
    newMedicines[index].dose = event.target.value;
    setMedicines(newMedicines);
  };

  const handleDurationChange = (index, event) => {
    const newMedicines = [...medicines];
    newMedicines[index].duration = event.target.value;
    setMedicines(newMedicines);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log({ tests, medicines });
  };

  useEffect(() => {
    getHealthData(item?.state?.patient_id);
  }, []);

  useEffect(() => {
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    setCurrentDate(today.toLocaleDateString(undefined, options));
  }, []);
  const getHealthData = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.viewPatientHealth,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          patient_id: id,
        },
      });
      if (response && response?.data?.responseCode === 200) {
        console.log(response?.data?.responseData);

        // setHealthData(response?.data?.responseData);
        setHealthData(response?.data?.responseData?.health_record);
        const scanImagesData = response?.data?.responseData?.scan_image || [];
        console.log(scanImagesData, "scannnnnnn");
        const rowsData = scanImagesData.map((item) => {
          return {
            scan_image_name: item?.scan_images_name || "Scan Image",
            viewLink: item?.scan_file,
            // checkbox: <Checkbox />,
            id: item?.id,
          };
        });

        setScanData(rowsData);
        const labreportData = response?.data?.responseData?.lab_report || [];
        const labRow = labreportData.map((item) => {
          return {
            name: item?.name,
            lab_report_name: item?.lab_report_name || "Lab Name",
            viewLink: item?.lab_reports_file,
            // checkbox: <Checkbox />,
            id: item?.id,
          };
        });
        setLabData(labRow);
        setIsLoading(false);
      } else {
        // toast.error(
        //   response?.data?.ResponseMessage || "Failed to fetch options"
        // );
      }
    } catch {}
  };
  const handleMedicineChange = (index, value) => {
    const newMedicines = [...medicines];
    newMedicines[index].name = value;
    setMedicines(newMedicines);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    fetchMedicineOptions(value);
  };
  const handleInstruction = (event) => {
    setInstructions(event.target.value);
    setSummary(event.target.value);
  };
  // const handleSummary = (event) => {
  //   setSummary(event.target.value);
  // };
  const fetchMedicineOptions = debounce(async (value) => {
    if (value.length < 4) return;
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.searchMedicines,
      });
      console.log("searchMedicines=-=-=-", response);
      if (response?.data?.responseCode === 200) {
        setMedicineOptions(response?.data?.responseData);
      }
    } catch (error) {
      console.error("Error fetching medicine options:", error);
    }
  }, 100);

  const uploadPrecriptionApi = async () => {
    const token = localStorage.getItem("token");
    const patientId = item?.state?.patient_id;
    try {
      const response = await axios({
        method: "POST",
        url: ApiConfig.uploadMedicinesReport,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          prescribed_medicines: medicines.map((medicine) => ({
            medicine_name: medicine.name,
            dose: medicine.dose,
            duration: medicine.duration,
          })),
          prescribed_tests: tests.map((test) => ({
            test_name: test,
          })),
          instructions: instructions,
        },
        params: {
          patient_id: patientId,
        },
      });
      console.log("uploadMedicinesReport=-=-=-", response);
      if (response?.data?.responseData === 200) {
        setPrescribedMedicines(response?.data?.responseData);
      }
    } catch (error) {
      console.error("Error uploading medicines report:", error);
    }
  };

  const doctorAndPatientDetails = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const patientId = item?.state?.patient_id;
    try {
      const responce = await axios({
        method: "POST",
        url: ApiConfig.patientDoctorDetails,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          patient_id: patientId,
        },
      });
      if (responce?.data?.responseCode === 200) {
        setDetails(responce?.data?.responseData);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error", error);
      setIsLoading(false);
    }
  };

  const [healthRecord, setHealthRecord] = useState({
    weight: "",
    height: "",
    bmi: "",
    temperature: "",
    pulse: "",
    blood_pressure: "",
    // sex: "",
  });
  useEffect(() => {
    calculateBMI();
  }, [healthRecord.weight, healthRecord.height]);

  const calculateBMI = () => {
    const weight = parseFloat(healthRecord.weight);
    const heightInInches = parseFloat(healthRecord.height);
    if (!isNaN(weight) && !isNaN(heightInInches) && heightInInches !== 0) {
      const heightInMeters = heightInInches * 0.0254;
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setHealthRecord((prevData) => ({
        ...prevData,
        bmi: bmi.toString(),
      }));
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    let errorMessage = "";
    switch (name) {
      case "weight":
        if (!/^\d*\.?\d{0,2}$/.test(value)) {
          errorMessage = "Enter a valid weight with up to 2 decimal places.";
        }
        break;
      case "height":
        if (!/^\d*\.?\d{0,2}$/.test(value)) {
          errorMessage = "Enter a valid height with up to 2 decimal places.";
        }
        break;
      case "temperature":
        if (!/^\d*\.?\d{0,2}$/.test(value)) {
          errorMessage =
            "Enter a valid temperature with up to 2 decimal places.";
        }
        break;
      case "pulse":
        if (!/^\d{0,3}$/.test(value)) {
          errorMessage = "Enter a valid pulse with up to 3 digits.";
        }
        break;
      case "blood_pressure":
        if (!/^\d{1,3}\/\d{1,3}$/.test(value)) {
          errorMessage =
            'Enter a valid blood pressure in the format "123/123".';
        }
        break;
      default:
        break;
    }
    setHealthRecord({
      ...healthRecord,
      [name]: value,
      [`${name}Error`]: errorMessage,
    });
  };

  const handleSummary = (event) => {
    const value = event.target.value;
    let errorMessage = "";

    if (value.length > 600) {
      errorMessage = "Summary cannot exceed 500 characters";
    }

    setSummary(value);
    setSummaryError(errorMessage);
  };
  const handleHealthReport = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const patientId = item?.state?.patient_id;
      const id = item?.state?.id;

      const healthReportResponse = axios({
        method: "PUT",
        url: ApiConfig.doctorUploadHealthRecord,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          ...healthRecord,
          pulse: parseInt(healthRecord.pulse),
        },
        params: {
          patient_id: patientId,
        },
      });

      const prescriptionResponse = axios({
        method: "POST",
        url: ApiConfig.uploadMedicinesReport,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          prescribed_medicines: medicines.map((medicine) => ({
            medicine_name: medicine.name,
            dose: medicine.dose,
            duration: medicine.duration,
          })),
          prescribed_tests: tests.map((test) => ({
            test_name: test,
          })),
          instructions: instructions,
          summary: summary,
        },
        params: {
          patient_id: id,
        },
      });

      const [healthReportRes, prescriptionRes] = await Promise.all([
        healthReportResponse,
        prescriptionResponse,
      ]);

      console.log("doctorUploadHealthRecord response:", healthReportRes.data);
      console.log("uploadMedicinesReport response:", prescriptionRes.data);
      setpdf(true);

      if (prescriptionRes.data.responseCode === 201) {
        toast.success(prescriptionRes?.data?.responseMessage);
        // console.log('tester testing prescription here',prescriptionRes?.data?.responseData?.prescription_file)
        // setPrescription(prescriptionRes?.data?.responseData?.prescription_file);
        setIsLoading(true);
        history.push("/doctor-appoinment");
        // setSubmitBtn(false);
      }
    } catch (error) {
      console.error(
        "Error handling health report and uploading prescription:",
        error
      );
    }
  };

  useEffect(() => {
    doctorAndPatientDetails();
    // uploadPrecriptionApi();
  }, []);

  return (
    <Box className={classes.mainBox}>
      <Box mb={4} className="displayStart">
        <GoBack />
        <Typography style={{ marginLeft: "10px" }} variant="h1">
          Prescription Form
        </Typography>
      </Box>

      <Paper elevation={2}>
        <form>
          <Box mt={1} mb={4} className="displayColumn">
            <Typography variant="h1" style={{ marginBottom: "10px" }}>
              {isDetails?.hospital_name ? isDetails?.hospital_name : "--"}
            </Typography>
            <Typography variant="h6">
              {isDetails?.hospital_address
                ? isDetails.hospital_address.charAt(0).toUpperCase() +
                  isDetails.hospital_address.slice(1).toLowerCase()
                : "--"}
              , {isDetails?.hospital_email ? isDetails?.hospital_email : "--"},
              {isDetails?.hospital_mobile_no
                ? isDetails?.hospital_mobile_no
                : "--"}
              ,
            </Typography>
          </Box>
          <Box className="displaySpacebetween hospitalDetailStyle">
            <Box mt={1} className="displayStart">
              <Box>
                <Box className="displayStart headingPatient">
                  <Typography variant="body2" className="body2">
                    Patient Name:
                  </Typography>
                  <Typography variant="body2" className="body1">
                    {isDetails?.name
                      ? isDetails.name.charAt(0).toUpperCase() +
                        isDetails.name.slice(1).toLowerCase()
                      : "--"}
                  </Typography>
                </Box>
                <Box my={0.5} className="displayStart headingPatient">
                  <Typography variant="body2" className="body2">
                    Gender/Age :
                  </Typography>
                  <Typography variant="body2" className="body1">
                    {isDetails?.gender ? isDetails?.gender : "--"}/{" "}
                    {isDetails?.age ? isDetails?.age : "--"}
                  </Typography>
                </Box>
                {/* <Box className="displayStart headingPatient">
                  <Typography variant="body2" className="body2">
                    Hospital Id :
                  </Typography>
                  <Typography variant="body2" className="body1">
                    55040
                  </Typography>
                </Box> */}
                <Box className="displayStart headingPatient">
                  <Typography variant="body2" className="body2">
                    Doctor Name :
                  </Typography>
                  <Typography variant="body2" className="body1">
                    {isDetails?.doctor_name ? isDetails?.doctor_name : "--"}
                  </Typography>
                </Box>
                <Box my={0.5} className="displayStart headingPatient">
                  <Typography variant="body2" className="body2">
                    Department :
                  </Typography>
                  <Typography variant="body2" className="body1">
                    {isDetails?.specialization_category
                      ? isDetails?.specialization_category
                      : "--"}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Box className="displayStart">
                <Typography variant="body2" className="body2">
                  Location :&nbsp;
                </Typography>
                <Typography variant="body2">
                  {isDetails?.hospital_address
                    ? isDetails.hospital_address.charAt(0).toUpperCase() +
                      isDetails.hospital_address.slice(1).toLowerCase()
                    : "--"}
                </Typography>
              </Box>
              <Box my={0.5} className="displayStart">
                <Typography variant="body2" className="body2">
                  Date & Time : &nbsp;
                </Typography>
                <Typography variant="body2">
                  {isDetails?.date
                    ? format(new Date(isDetails.date), "dd-MM-yyyy hh:mm:ss aa")
                    : "--"}
                  {/* {isDetails?.date ? isDetails?.date : "--"} */}
                </Typography>
              </Box>
              {/* <Box className="displayStart">
                <Typography variant="body2" className="body2">
                  Invoice No :&nbsp;
                </Typography>
                <Typography variant="body2"> 0007 </Typography>
              </Box> */}
              {/* <Box className="displayStart">
                <Typography variant="body2" className="body2">
                  Referenced by :&nbsp;
                </Typography>
                <Typography variant="body2"> Sukrit Singh </Typography>
              </Box> */}
              <Box className="displayStart">
                <Typography variant="body2" className="body2">
                  Speciality:&nbsp;
                </Typography>
                <Typography variant="body2">
                  {" "}
                  {isDetails?.specialization ? isDetails?.specialization : "--"}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box mt={4}>
            <Typography style={{ margin: "16px 0px 24px" }} variant="h3">
              Health Records
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="body2">Height (Inches)</Typography>
                  <TextField
                    name="height"
                    value={healthRecord.height}
                    onChange={handleChange}
                    placeholder="Enter Height"
                    variant="outlined"
                    fullWidth
                  />
                  {healthRecord.heightError && (
                    <Typography color="error">
                      {healthRecord.heightError}
                    </Typography>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="body2">Weight (Kg)</Typography>
                  <TextField
                    name="weight"
                    value={healthRecord.weight}
                    onChange={handleChange}
                    placeholder="Enter Weight"
                    variant="outlined"
                    fullWidth
                  />
                  {healthRecord.weightError && (
                    <Typography color="error">
                      {healthRecord.weightError}
                    </Typography>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="body2">BMI</Typography>
                  <TextField
                    name="bmi"
                    value={healthRecord.bmi}
                    onChange={handleChange}
                    placeholder="Enter BMI"
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                    fullWidth
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2">Pulse (SpO2)</Typography>
                <TextField
                  name="pulse"
                  value={healthRecord.pulse}
                  onChange={handleChange}
                  placeholder="Enter Pulse"
                  variant="outlined"
                  fullWidth
                />
                {healthRecord.pulseError && (
                  <Typography color="error">
                    {healthRecord.pulseError}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="body2">Blood Pressure (mmHg)</Typography>
                  <TextField
                    name="blood_pressure"
                    value={healthRecord.blood_pressure}
                    placeholder="Enter Blood Pressure"
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                  {healthRecord.blood_pressureError && (
                    <Typography color="error">
                      {healthRecord.blood_pressureError}
                    </Typography>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="body2">Temperature (°C)</Typography>
                  <TextField
                    name="temperature"
                    value={healthRecord.temperature}
                    placeholder="Enter Temperature"
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                  {healthRecord.temperatureError && (
                    <Typography color="error">
                      {healthRecord.temperatureError}
                    </Typography>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} style={{ marginTop: "16px" }}>
                <Grid item xs={12} md={12}>
                  <Box>
                    <Typography variant="body2">Patient Summary</Typography>
                    <TextareaAutosize
                      value={summary}
                      onChange={handleSummary}
                      minRows={6}
                      placeholder="Patient Summary"
                      style={{
                        width: "100%",
                        padding: "10px 0px 10px 10px",
                        marginTop: "5px",
                        borderRadius: "7px",
                        background: "rgba(0, 0, 0, 0.05)",
                      }}
                    />
                    {summaryError && (
                      <Typography color="error">{summaryError}</Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Paper elevation={2}>
            <Box className={classes.previousReport}>
              <Box className="displaySpacebetween downloadPdfCs">
                <Button
                  className="downloadBtn"
                  variant="contained"
                  onClick={handleAddTest}
                >
                  Add Test & Medicine
                </Button>

                <Button
                  className="viewBtn"
                  variant="contained"
                  onClick={() => {
                    history.push("/past-history", {
                      id: item?.state?.patient_id,
                    });
                  }}
                >
                  Past Lab History
                </Button>
              </Box>
            </Box>
          </Paper>
        </form>
      </Paper>

      <Box mt={2}>
        {openComponent && (
          <Paper elevation={2}>
            <form>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Box mb={4}>
                    <Typography variant="h4">Prescription</Typography>
                  </Box>
                </Grid>

                {tests.map((test, index) => (
                  <Grid container spacing={1} alignItems="center" key={index}>
                    <Grid item xs={12}>
                      <Box mb={3}>
                        {index == 0 && (
                          <Typography
                            style={{ marginBottom: "5px" }}
                            variant="body2"
                          >
                            Test Name
                          </Typography>
                        )}

                        <TextField
                          variant="outlined"
                          placeholder="Enter Test Name"
                          value={test}
                          onChange={(e) => handleTestChange(index, e)}
                          className={classes.testTextField}
                        />
                        {index !== 0 && (
                          <IconButton
                            style={{
                              color: "#fff",
                              background: "#712171",
                              marginLeft: "5px",
                              padding: "5px",
                            }}
                            onClick={() => handleRemoveTest(index)}
                          >
                            <RemoveIcon />
                          </IconButton>
                        )}
                        <IconButton
                          onClick={handleAddTest1}
                          style={{
                            color: "#fff",
                            background: "#712171",
                            marginLeft: "5px",
                            padding: "5px",
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                ))}

                {medicines.map((medicine, index) => (
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    key={index}
                    style={{ marginBottom: "16px" }}
                  >
                    <Grid item xs={12} sm={12} md={5}>
                      <Box style={{ marginBottom: "16px" }}>
                        {index == 0 && (
                          <Typography
                            variant="body2"
                            style={{ marginBottom: "5px" }}
                          >
                            Prescribed Medicine
                          </Typography>
                        )}
                        <Box mb={2}>
                          <Autocomplete
                            freeSolo
                            options={medicineOptions.map(
                              (option) => option.name
                            )}
                            onChange={(e, value) =>
                              handleMedicineChange(index, value)
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                placeholder="Enter Prescribed Medicine"
                                fullWidth
                                value={medicine.name}
                                onChange={(e) => handleInputChange(e, index)}
                              />
                            )}
                          />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Box style={{ marginBottom: "16px" }}>
                        {index == 0 && (
                          <Typography
                            style={{ marginBottom: "5px" }}
                            variant="body2"
                          >
                            Dose (Times)
                          </Typography>
                        )}
                        <TextField
                          variant="outlined"
                          placeholder="Enter Dose"
                          value={medicine.dose}
                          onChange={(e) => handleDoseChange(index, e)}
                          fullWidth
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Box style={{ marginBottom: "16px" }}>
                        {index == 0 && (
                          <Typography
                            style={{ marginBottom: "5px" }}
                            variant="body2"
                          >
                            Duration (Days)
                          </Typography>
                        )}{" "}
                        <TextField
                          variant="outlined"
                          placeholder="Enter Duration"
                          value={medicine.duration}
                          onChange={(e) => handleDurationChange(index, e)}
                          fullWidth
                        />
                      </Box>
                    </Grid>
                    {index !== 0 && (
                      <IconButton
                        onClick={() => handleRemoveMedicine(index)}
                        style={{
                          color: "#fff",
                          background: "#712171",
                          marginLeft: "5px",
                          padding: "5px",
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                    )}
                    <IconButton
                      onClick={handleAddMedicine}
                      style={{
                        color: "#fff",
                        background: "#712171",
                        marginLeft: "5px",
                        padding: "5px",
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Box style={{ marginBottom: "16px" }}>
                    <Typography style={{ marginBottom: "5px" }} variant="body2">
                      Instructions
                    </Typography>
                    <TextareaAutosize
                      value={instructions}
                      onChange={handleInstruction}
                      minRows={6}
                      placeholder="Instructions"
                      style={{
                        width: "100%",
                        padding: "10px 0px 10px 10px",
                        marginTop: "5px",
                        borderRadius: "7px",
                        background: "rgba(0, 0, 0, 0.05)",
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleHealthReport}
                    disabled={isLoading}
                  >
                    Submit Prescription
                    {isLoading && (
                      <CircularProgress
                        size={20}
                        style={{ color: "#fff", marginLeft: "10px" }}
                      />
                    )}
                  </Button>

                  {/* <Box className="displayStart downloadPdfCs"> 
                
                <Button className="downloadBtn" variant="contained"    onClick={handleDownloadPdf}>
                  Download PDF
                </Button>

                <Button className="viewBtn" variant="contained" onClick={handleViewPdf}>
                View PDF
                </Button>
                
              </Box> */}
                </Grid>
              </Grid>
            </form>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default Prescription;
