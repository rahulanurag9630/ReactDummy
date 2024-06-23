import React, { useEffect, useState } from "react";

import {
  Typography,
  Box,
  makeStyles,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import GoBack from "src/component/GoBack";
import { ApiConfig } from "src/config/apiConfig";
import axios from "axios";

import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { date } from "yup";

// import PrescriptionPDF from "../../../../component/pdfgenerator";
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

const Pasthistory = () => {
  const classes = useStyle();
  const [scanData, setScanData] = useState([{}]);
  const [healthData, setHealthData] = useState([{}]);
  console.log("healthData=-=-=-", healthData?.sex);
  const [openComponent, setOpenComponent] = useState(false);
  const [labData, setLabData] = useState([{}]);
  const [medicineOptions, setMedicineOptions] = useState([]);
  console.log("medicineOptions=-=-=-", medicineOptions);
  const [currentDate, setCurrentDate] = useState("");
  const location = useLocation();
  const id = location?.state;
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
  console.log("isDetails-=-=-=-", isDetails?.doctor_name);
  const [medicines, setMedicines] = useState([
    { name: "", dose: "", duration: "" },
  ]);

  const formatDate = (inputDate) => {
    if (!inputDate) return ""; // Return empty string if inputDate is undefined or null

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const [day, month, year, time] = inputDate.split(" ");
    console.log("tester is checking year", month);
    const [hour, minute] = time.split(":");

    const formattedDate = `${day}${getOrdinalSuffix(day)} ${month.slice(
      0
    )} ${year} , ${formatHour(hour)}:${minute} ${getMeridiem(hour)}`;

    return formattedDate;
  };
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const formatHour = (hour) => {
    return hour > 12 ? hour - 12 : hour === "00" ? 12 : hour;
  };

  const getMeridiem = (hour) => {
    return hour >= 12 ? "PM" : "AM";
  };

  useEffect(() => {
    // console.log("tester is here123456", obj);
    getHealthData(id);
  }, []);

  const getHealthData = async ({ id }) => {
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
            updated_at: item?.updated_at,
          };
        });

        setScanData(rowsData);
        const labreportData = response?.data?.responseData?.lab_report || [];
        const labRow = labreportData.map((item) => {
          return {
            name: item?.name,
            lab_report_name: item?.lab_reports_name || "Lab Name",
            viewLink: item?.lab_reports_file,
            // checkbox: <Checkbox />,
            id: item?.id,
            updated_at: item?.updated_at,
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
  const convertToIST = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Intl.DateTimeFormat("en-IN", options).format(date);
  };

  return (
    <>
      <Box mb={4} className="displayStart">
        <GoBack />
        <Typography style={{ marginLeft: "10px" }} variant="h1">
          Past History
        </Typography>
      </Box>

      <Box className={classes.previousReport}>
        <Box className="displaySpacebetween">
          {/* <Typography style={{ margin: "16px 0px 24px" }} variant="h3">
      Previous Records
    </Typography> */}

          {/* <Button variant="contained" onClick={handleAddTest}>
     Past History 
    </Button>
    <Button variant="contained" onClick={handleAddTest}>
      Add Test & Medicine
    </Button> */}
        </Box>

        <Box className="titleBox">
          <Box className="line" />
          <Typography variant="h4">Scan Image</Typography>
        </Box>
        <Box className="subBox">
          <Box className="contentBox">
            <TableContainer>
              {scanData && scanData.length > 0 ? (
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="record">Item</TableCell>

                      <TableCell className="record">Date & Time</TableCell>
                      <TableCell align="center" className="record"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {scanData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell
                          component="th"
                          scope="row"
                          className="record"
                        >
                          {row.scan_image_name}
                        </TableCell>

                        <TableCell>
                          {(row.updated_at && formatDate(row.updated_at)) ||
                            "--"}
                        </TableCell>

                        <TableCell align="center" className="record">
                          {row.viewLink && (
                            <a href={row.viewLink} className="anchor">
                              View
                            </a>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                // <p>No data found</p>
                <Box mx={5} className="displayCenter">
                  {/* <img src="images/no_data.png" alt="no_data" /> */}
                  <Typography variant="body2" style={{ textAlign: "center" }}>
                    {" "}
                    No scan image available
                  </Typography>
                </Box>
              )}
            </TableContainer>
          </Box>
        </Box>

        <Box className="titleBox">
          <Box className="line" />
          <Typography variant="h4" style={{ marginTop: "16px" }}>
            Lab Report
          </Typography>
        </Box>
        <Box className="subBox">
          <Box className="contentBox">
            <TableContainer>
              {labData && labData.length > 0 ? (
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      {/* <TableCell align="left">Laboratory Name</TableCell> */}
                      <TableCell align="left">Date & Time</TableCell>
                      <TableCell align="left"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {labData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.lab_report_name}
                        </TableCell>
                        {/* <TableCell>{ row.lab_report_name}</TableCell>  */}

                        <TableCell>{row.updated_at}</TableCell>

                        <TableCell align="center" className="record">
                          {row.viewLink && (
                            <a href={row.viewLink} className="anchor">
                              View
                            </a>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography style={{ textAlign: "center" }} variant="body2">
                  No lab data found
                </Typography>
              )}
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Pasthistory;
