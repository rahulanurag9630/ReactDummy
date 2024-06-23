import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  makeStyles,
  TextField,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
} from "@material-ui/core";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import toast from "react-hot-toast";
import { ApiConfig } from "src/config/apiConfig";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import GoBack from "src/component/GoBack";
const useStyles = makeStyles((theme) => ({
  mainBox: {
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
    padding: "50px 5%",
    gap: "30px",
    "& h2": {
      color: "#161E29",
      fontStyle: "normal",
      fontWeight: "500",
    },
    "& .subBox": {
      background: "#FFF",
      borderRadius: "15px",
      width: "100%",
      padding: "20px 0",
      filter: "drop-shadow(0px 10px 40px rgba(0, 0, 0, 0.16))",
    },
    "& .contentBox": {
      padding: "0px 20px",
      "& h6": {
        color: "rgba(0, 0, 0, 0.60)",
        fontStyle: "normal",
        lineHeight: "26px",
        padding: "10px 0",
      },
    },
    "& .line": {
      width: "5px",
      background: "#681E65",
      borderRadius: "50px",
      "& h4": {
        color: "#161E29",
        fontSize: "24px",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "normal",
      },
    },
    "& .titleBox": {
      display: "flex",
      gap: "10px",
    },
    "& .gridBox": {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
    "& .gridMainBox": {
      marginTop: "30px",
      display: "flex",
      flexDirection: "column",
      gap: "30px",
    },
    "& .textField": {
      width: "100%",
    },

    "& .MuiTableContainer-root": {
      width: "auto",
    },
    "& .MuiTableCell-head": {
      background: "#FFF",
      borderBottom: "1px solid rgba(0, 0, 0, 0.20)",
      color: "rgba(0, 0, 0, 0.60)",
    },
    "& .ancor": {
      color: "#169BD5",
    },
    "& .MuiPaper-elevation1": {
      padding: "0",
    },
    "& .record": {
      maxWidth: "33%",
      width: "100%",
    },
    "& .MuiTableCell-root": {
      padding: "16px 16px 16px 0 !important",
    },
    "& .subtext2": {
      color: "#080515 !important",
    },
    "& .filterBtn": {
      borderRadius: "10px",
      height: "auto",
      fontSize: "18px",
      "@media(max-width:500px)": { fontSize: "15px" },
    },
  },
}));
const data = [
  { label: "Weight", value: "47 Kg", label1: "BMI", value1: "2.99" },
  {
    label: "Height",
    value: "4.9 feet",
    label1: "Blood Pressure",
    value1: "90/60mmHg",
  },
  { label: "Pulse", value: "10 per min", label1: "Sex", value1: "Female" },
  { label: "Temperature", value: "37 C" },
];
function createData(item, Date, Action) {
  return { item, Date, Action };
}
const rows = [
  createData("X-Ray", "View", <Checkbox />),
  createData("CT Scan", "View", <Checkbox />),
];
function createData1(item, lab, Date, Action) {
  return { item, lab, Date, Action };
}
const rows1 = [
  createData1("Blood Test Report", "Redcliffe Labs", "View", <Checkbox />),
  createData1("Blood Test Report", "Others", "View", <Checkbox />),
];

const HealthReportManage = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [healthData, setHealthData] = useState([{}]);
  console.log("healthDatahealthData-=-=-=-", healthData);
  const [scanData, setScanData] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [labData, setLabData] = useState([{}]);
  const [scanFileList, setScanFileList] = useState([{}]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [labReport, setLabReport] = useState([{}]);
  const [selectedScanImageIds, setSelectedScanImageIds] = useState([]);
  const [selectedLabReportIds, setSelectedLabReportIds] = useState([]);
  const location = useLocation();
  const formData = location?.state?.formData;






  const getHealthData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.getHealthDataForPatient,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response && response?.data?.responseCode === 200) {
        console.log(response?.data?.responseData, "asasasas");
        // // toast.success(response?.data?.responseMessage);
        setHealthData(response?.data?.responseData);
        // const scanImagesData =
        //   response?.data?.responseData?.health_records[0]?.scan_images || [];
        // console.log(scanImagesData, "scannnnnnn");
        // const rowsData = scanImagesData.map((item) => {
        //   return {
        //     scan_image_name: item?.scan_images_name || "Scan Image",
        //     viewLink: item?.scan_file,
        //     checkbox: <Checkbox />,
        //     id: item?.id,
        //   };
        // });

        // setScanData(rowsData);
        // const labreportData =
        //   response?.data?.responseData?.health_records[0]?.lab_reports || [];
        // const labRow = labreportData.map((item) => {
        //   return {
        //     name: item?.name,
        //     lab_report_name: item?.lab_report_name || "Lab Name",
        //     viewLink: item?.lab_reports_file,
        //     checkbox: <Checkbox />,
        //     id: item?.id,
        //   };
        // });
        // setLabData(labRow);
        // console.log(scanData, "scaaaaaaaa");
        // setIsLoading(false);
      } else {
        toast.error(
          response?.data?.ResponseMessage || "Failed to fetch options"
        );
      }
    } catch {}
  };
  useEffect(() => {
    getHealthData();
    getLabFiles();
    getScanFile();
  }, []);

  // useEffect(() => {
  //   history.push({
  //     pathname: "/bookappointment",
  //     state: {
  //       // scanImageIds: selectedScanImageIds,
  //       // labReportIds: selectedLabReportIds,
  //       formData: location?.state,
  //     },
  //   });
  // }, [history]);

  // useEffect(() => {
  //   if (location?.state) {
  //     history.push({
  //       pathname: "/bookappointment",
  //       state: {
  //         formData: location.state,
  //       },
  //     });
  //   }
  // }, [location?.state]);

  const getScanFile = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.getScanFiles,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response, "respos");
      setIsLoading(true);
      if (response && response?.data?.responseCode === 200) {
        const scanFileData = response?.data?.responseData || [];
        console.log(scanFileData, "scaa");
        const scanRow = scanFileData.map((item) => {
          const date = new Date(item?.created_at);
          const formattedDate = date.toISOString().split("T")[0];
          return {
            name: item?.scan_images_name,
            viewLink: item?.scan_file_url,
            action: <RiDeleteBin6Line />,
            date: formattedDate,
            id: item?.id,
          };
        });
        setScanData(scanRow);
        setIsLoading(false);
        // // toast.success(response?.data?.responseMessage);
      } else {
        toast.error(response?.data?.responseMessage);
      }
    } catch (err) {
      setIsLoading(false);
      // toast.error(err?.response?.data?.responseMessage);
    }
  };
  const getLabFiles = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.getLabReportFiles,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response, "respos");
      if (response && response?.data?.responseCode === 200) {
        const labreportData = response?.data?.responseData || [];
        console.log(labreportData, "laaaab");
        const labRow = labreportData.map((item) => {
          const date = new Date(item?.created_at);
          const formattedDate = date.toISOString().split("T")[0];
          return {
            name: item?.name,
            lab_report_name: item?.lab_reports_name || "Lab Name",
            viewLink: item?.lab_reports_file_url,
            action: <RiDeleteBin6Line />,
            date: formattedDate,
            id: item?.id,
          };
        });
        setLabData(labRow);
        setLoading(false);
        // // toast.success(response?.data?.responseMessage);
      } else {
        // toast.error(response?.data?.responseMessage);
      }
    } catch (err) {
      setLoading(false);
      toast.error(err?.response?.data?.responseMessage);
    }
  };

  const handleScanImageCheckboxClick = (id) => {
    setSelectedScanImageIds((prevIds) => [...prevIds, id]);
  };

  const handleLabReportCheckboxClick = (id) => {
    setSelectedLabReportIds((prevIds) => [...prevIds, id]);
  };
  const handleShareHealthReportClick = () => {
    history.push({
      pathname: "/bookappointment",
      state: {
        scanImageIds: selectedScanImageIds,
        labReportIds: selectedLabReportIds,
        formData: location?.state,
      },
    });
  };

  const apiRows = scanData.map((image) => {
    return createData(
      image.id,
      // Format the date as needed, you can use a library like moment.js for this
      image.created_at,
      <Checkbox />
    );
  });
  //   const rows = [
  //     ...apiRows,
  //     createData("X-Ray", "View", <Checkbox />),
  //     createData("CT Scan", "View", <Checkbox />)
  //   ];

  const classes = useStyles();
  return (
    <Box className={classes.mainBox}>
      {/* <Box>
        <GoBack />
      </Box> */}
      <Typography variant="h2">Health Record</Typography>
      <Box className="titleBox">
        <Box className="line" />
        <Typography variant="h4">Latest Vitals</Typography>
      </Box>
      <Box className="subBox">
        <Box className="contentBox">
          <Grid container spacing={2}>
            <Grid item lg={3} md={3} sm={3} xs={6}>
              <Typography variant="h6">Weight (kg)</Typography>{" "}
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={6}>
              <Typography variant="h6" className="subtext2">
                {healthData?.weight || "NA"}
              </Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={6}>
              <Typography variant="h6">Height (inch)</Typography>{" "}
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={6}>
              <Typography variant="h6" className="subtext2">
                {healthData?.height || " NA"}
              </Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={6}>
              <Typography variant="h6">Pulse</Typography>{" "}
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={6}>
              <Typography variant="h6" className="subtext2">
                {healthData?.pulse || "NA"}
              </Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={6}>
              <Typography variant="h6">Tempreture (°C)</Typography>{" "}
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={6}>
              <Typography variant="h6" className="subtext2">
                {healthData?.temperature || "NA"}
              </Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={6}>
              {" "}
              <Typography variant="h6">BMI</Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={6}>
              {" "}
              <Typography variant="h6" className="subtext2">
                {healthData?.bmi || "NA"}
              </Typography>{" "}
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={6}>
              {" "}
              <Typography variant="h6">Sex</Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={6}>
              {" "}
              <Typography variant="h6" className="subtext2">
                {healthData?.sex || "NA"}
              </Typography>{" "}
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={6}>
              {" "}
              <Typography variant="h6">Blood Pressure (mmHg)</Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={6}>
              {" "}
              <Typography variant="h6" className="subtext2">
                {healthData?.blood_pressure || "NA"}
              </Typography>{" "}
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box className="titleBox">
        <Box className="line" />
        <Typography variant="h4">Scan Image</Typography>
      </Box>
      <Box className="subBox">
        <Box className="contentBox">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="record">Item</TableCell>
                  <TableCell align="center" className="record"></TableCell>
                  <TableCell align="right" className="record">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scanData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row" className="record">
                      {row.name}
                    </TableCell>
                    <TableCell align="center" className="record">
                      <a href={row.viewLink} className="ancor">
                        View
                      </a>
                    </TableCell>
                    <TableCell align="right" className="record">
                      {/* Use an anonymous function to pass the id to the handler */}
                      <Checkbox
                        onClick={() => handleScanImageCheckboxClick(row.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Box className="titleBox">
        <Box className="line" />
        <Typography variant="h4">Lab Report</Typography>
      </Box>
      <Box className="subBox">
        <Box className="contentBox">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {/* <TableCell>Item</TableCell> */}
                  <TableCell align="left">Laboratory Name</TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {labData.map((row) => (
                  <TableRow key={row.id}>
                    {/* <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell> */}
                    <TableCell component="th" scope="row">
                      {row.lab_report_name}
                    </TableCell>
                    <TableCell align="center" className="record">
                      <a href={row.viewLink} className="ancor">
                        View
                      </a>
                    </TableCell>
                    <TableCell align="right" className="record">
                      <Checkbox
                        onClick={() => handleLabReportCheckboxClick(row.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Box>
        <Button
          variant="contained"
          className="filterBtn"
          onClick={handleShareHealthReportClick}
        >
          Share Health Report
        </Button>
      </Box>
    </Box>
  );
};

export default HealthReportManage;
