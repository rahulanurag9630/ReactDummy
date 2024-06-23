import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineUpload } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ApiConfig } from "src/config/apiConfig";
import toast from "react-hot-toast";
import { Pagination } from "@material-ui/lab";
const useStyles = makeStyles((theme) => ({
  mainBox: {
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",

    "& h2": {
      color: "#161E29",
      fontFamily: "Calistoga",
      fontStyle: "normal",
      fontWeight: "500",
    },
    "& .subBox": {
      background: "#FFF",
      borderRadius: "15px",
      width: "100%",
      padding: "20px 0",
    },
    "& .contentBox": {
      padding: "10px 20px",
      "& .pagination": {
        marginTop: "15px",
        width: "fit-content",
        "& button": {
          padding: "7px 14px",
          height: "auto",
        },
        "& .MuiPaginationItem-page.Mui-selected": {
          backgroundColor: theme.palette.primary.main,
          color: "white",
        },
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
    "& .secendBox": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& .uploadBtn": {
        borderRadius: "50px",
        padding: "10px 40px",
        color: "#681E65",
        border: "1px solid #681E65",
        "&:hover": {
          background: "#681E65",
          color: "#FFF",
        },
      },
    },

    "& .filterBtn": {
      height: "45px",
      borderRadius: "50px",
      marginRight: "10px",
      height: "auto",
      fontSize: "18px",
      "@media(max-width:1280px)": { margin: "0px 10px 10px 0px" },
      "@media(max-width:500px)": { fontSize: "15px" },
    },
    "& .table": {
      marginTop: "30px",
      display: "flex",
      justifyContent: "space-between",
      maxWidth: "1000px",
    },
    "& .MuiTableContainer-root": {
      width: "auto",
    },
    "& .MuiTableCell-head": {
      background: "#FFF",
      borderBottom: "1px solid rgba(0, 0, 0, 0.20)",
      color: "rgba(0, 0, 0, 0.60)",
    },
    "& .MuiTableCell-root": {
      padding: "16px 16px 16px 0 !important",
    },
    "& .MuiPaper-elevation1": {
      padding: "14px 0 !important",
    },
    "& .ancor": {
      color: "#169BD5",
    },
  },
  dialogModal: {
    "& .MuiDialogTitle-root": {
      padding: "0px !important",
    },
    "& .MuiDialogContent-root": {
      padding: "0px !important",
    },
    "& .MuiInputBase-input": {
      paddingBottom: "12px !important",
    },
    "& button": {
      padding: "0px 40px",
      height: "40px",
      fontSize: "16px",
      marginRight: "10px",
      width: "130px",
    },
    "& svg": {
      fontSize: "20px",
    },
  },

  uploadLabel: {
    display: "flex",
    alignItems: "center",
  },
  marginTop: {
    marginTop: "15px",
  },
  labPaginationCs: {
    marginTop: "15px",
    width: "fit-content",
    "& button": {
      padding: "7px 14px",
      height: "auto",
    },
    "& .MuiPaginationItem-page.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
}));
function createData(item, Date, Date1, Action) {
  return { item, Date, Date1, Action };
}
const rows = [
  createData("Frozen yoghurt", "View", "2023-11-24", <RiDeleteBin6Line />),
  createData("Ice cream sandwich", "View", "2023-11-24", <RiDeleteBin6Line />),
];
function createData1(item, Date, Date1, Action) {
  return { item, Date, Date1, Action };
}
const rows1 = [
  createData1("Frozen yoghurt", "View", "2023-11-24", <RiDeleteBin6Line />),
  createData1("Ice cream sandwich", "View", "2023-11-24", <RiDeleteBin6Line />),
];
const HealthRecord = () => {
  const classes = useStyles();
  const history = useHistory();
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    bmi: "",
    temperature: "",
    pulse: "",
    blood_pressure: "",
    sex: "",
  });
  useEffect(() => {
    calculateBMI();
  }, [formData.weight, formData.height]);

  const calculateBMI = () => {
    const weight = parseFloat(formData.weight);
    const heightInInches = parseFloat(formData.height);
    if (!isNaN(weight) && !isNaN(heightInInches) && heightInInches !== 0) {
      const heightInMeters = heightInInches * 0.0254;
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setFormData((prevData) => ({
        ...prevData,
        bmi: bmi.toString(),
      }));
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    switch (name) {
      case "weight":
      case "height":
      case "temperature":
        if (!/^\d*\.?\d{0,2}$/.test(value)) {
          errorMessage =
            "Enter a valid numeric value with up to 5 characters including the decimal point";
        }
        break;
      case "pulse":
        if (!/^\d{0,3}$/.test(value)) {
          errorMessage = "Enter a valid numeric value with up to 3 characters";
        }
        break;
      case "blood_pressure":
        if (!/^\d{1,3}\/\d{1,3}$/.test(value)) {
          errorMessage =
            'Enter a valid blood pressure value in the format "123/123"';
        }
        break;
      default:
        break;
    }

    setFormData({
      ...formData,
      [name]: value,
      [`${name}Error`]: errorMessage,
    });
  };
  const [scanFile, setScanFile] = useState("");
  const [labFile, setLabFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [scanFileList, setScanFileList] = useState([{}]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [labReport, setLabReport] = useState([{}]);
  const [fileName, setFileName] = useState("");
  const [labReportName, setLabReportName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpen1, setDialogOpen1] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scanLoading, setscanLoading] = useState(false);
  const [labLoading, setlabLoading] = useState(false);
  const [scanFileName, setScanFileName] = useState("");
  const [labFileName, setLabFileName] = useState("");

  const [open, setOpen] = useState(false);
  const [labOpen, setLabOpen] = useState(false);
  const [scanId, setScanId] = useState();
  const [labId, setLabId] = useState();
  const [fileSelected, setFileSelected] = useState(false);
  const [labReportSelected, setLabReportSelected] = useState(false);
  const [totalPage, setTotalPage] = useState();
  const [labTotalPage, setLabTotalPage] = useState();
  const [paginationLabReport, setPaginationLabReport] = useState({
    // page: 1,
    size: 4,
  });
  const [paginationData, setPaginationData] = useState({
    // page: 1,
    size: 4,
  });

  // Function to handle file selection

  const handleLabFile = (e) => {
    setLabFile(e.target.files[0]);
    setLabFileName(e?.target?.files[0].name);
    setLabReportSelected(true);
  };
  const handleFile = (e) => {
    setScanFile(e.target.files[0]);
    setScanFileName(e?.target?.files[0].name);
    console.log(e?.target.files);
    setFileSelected(true);
  };
  const handleFileUpload = async () => {
    console.log("handleFileUpload called");
    if (fileName == "") {
      toast.error("Please enter file name.");
      return;
    }
    if (!scanFile) {
      toast.error("Please select file.");
      return;
    }
    setLoading(true);
    console.log(scanFile, "scfile");
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("scan_file", scanFile);
    formData.append("scan_images_name", fileName);
    try {
      const response = await axios({
        method: "POST",
        url: ApiConfig.uploadScanImage,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      console.log(response, "respos");
      if (response && response?.data?.responseCode === 200) {
        setLoading(false);
        setDialogOpen(false);

        getScanFile();
      } else {
        toast.error(response?.data?.responseMessage);
      }
    } catch (err) {
      setLoading(false);
      setDialogOpen(false);
      toast.error(err?.response?.data?.responseMessage);
    }
  };

  const handleUpload = () => {
    setDialogOpen(true);
    setFileName("");
    setFileSelected(false);
  };
  const handleUpload1 = () => {
    setDialogOpen1(true);
    setLabReportName("");
    setFileSelected(false);
  };

  const deleteItem = (itemId) => {
    setScanId(itemId);
    setOpen(true);
  };

  const deleteLabItem = (itemId) => {
    setLabId(itemId);
    setLabOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleLabCloseModal = () => {
    setLabOpen(false);
  };

  const handleLabFileUpload = async () => {
    if (labReportName == "") {
      toast.error("Please enter file name.");
      return;
    }
    if (!labFile) {
      toast.error("Please select file.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found.");
        return;
      }
      const formData = new FormData();
      formData.append("lab_reports_file", labFile);
      formData.append("lab_reports_name", labReportName);
      console.log(formData.get("lab_reports_file"), "forrrrrr");
      console.log(formData.get("lab_reports_name"), "forrrrrr");

      setLoading(true);
      try {
        const response = await axios({
          method: "POST",
          url: ApiConfig.uploadLabReport,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        });

        setIsDataLoading(false);

        if (response && response.data && response.data.responseCode === 200) {
          setLoading(false);
          setDialogOpen1(false);
          setLabReportSelected("");
          getLabFiles();
        } else {
          setDialogOpen1(false);
          toast.error(
            response?.data?.responseMessage || "Unknown error occurred."
          );
        }
      } catch (err) {
        setIsDataLoading(false);
        console.error("Error uploading file:", err);
        toast.error(
          err.response?.data?.responseMessage || "An error occurred."
        );
      }
    } catch (err) {
      setIsDataLoading(false);
      console.error("Error handling lab file upload:", err);
      toast.error("An error occurred while handling lab file upload.");
    }
  };

  const createHealthRecord = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true); // Start loading
    try {
      const response = await axios({
        method: "POST",
        url: ApiConfig.createHealthRecordData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: formData,
      });

      if (response?.data?.responseCode === 201) {
        toast.success(response?.data?.responseMessage);
      } else {
        toast.error(response?.data?.responseMessage);
      }
    } catch (err) {
      toast.error(err?.response?.data?.responseMessage);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const getVitals = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.getHealthDataForPatient,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response, "respos");
      setIsLoading(true);
      if (response && response?.data?.responseCode === 200) {
        setFormData(response?.data?.responseData);
      }
      //   const scanFileData = response?.data?.responseData || [];
      //   console.log(scanFileData, "scaa");
      //   const scanRow = scanFileData.map((item) => {
      //     const date = new Date(item?.created_at);
      //     const formattedDate = date.toISOString().split("T")[0];
      //     return {
      //       name: item?.scan_images_name,
      //       viewLink: item?.scan_file_url,
      //       action: <RiDeleteBin6Line />,
      //       date: formattedDate,
      //       id: item?.id,
      //     };
      //   });
      //   setScanFileList(scanRow);
      //   setIsLoading(false);

      // } else {
      //   toast.error(response?.data?.responseMessage);
      // }
    } catch (err) {
      setIsLoading(false);
      // toast.error(err?.response?.data?.responseMessage);
    }
  };
  const getScanFile = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.getScanFiles,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: paginationData.page,
          size: paginationData.size,
        },
      });
      console.log(response, "respos");
      setscanLoading(true);
      // setIsLoading(true);
      if (response && response?.data?.responseCode === 200) {
        const scanFileData = response?.data?.responseData || [];
        console.log(scanFileData, "scaa");
        const totalPages = response?.data?.totalPages || 0;
        setTotalPage(totalPages);
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
        setScanFileList(scanRow);
        // setIsLoading(false);
        setscanLoading(false);
      } else {
        toast.error(response?.data?.responseMessage);
      }
    } catch (err) {
      // setIsLoading(false);
      setscanLoading(false);
      // toast.error(err?.response?.data?.responseMessage);
    }
  };
  const getLabFiles = async () => {
    setlabLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.getLabReportFiles,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: paginationLabReport.page,
          size: paginationLabReport.size,
        },
      });
      console.log("getLabReportFiles=-=-=-=-", response);
      if (response && response?.data?.responseCode === 200) {
        const labreportData = response?.data?.responseData || [];
        const labTotalPage = response?.data?.totalPages || 0;

        setLabTotalPage(labTotalPage);
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
        setLabReport(labRow);
        // setLoading(false);
        setlabLoading(false);
      } else {
      }
    } catch (err) {
      // setLoading(false);
      setlabLoading(false);
      toast.error(err?.response?.data?.responseMessage);
    }
  };
  const handleDeleteScan = async () => {
    const token = localStorage.getItem("token");
    if (!scanId) {
      toast.error("ID is empty");
      setOpen(false);
      return;
    }
    try {
      const response = await axios({
        method: "DELETE",
        url: ApiConfig.deleteScanFile,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          scan_image_id: scanId,
        },
      });
      if (response.data?.responseCode === 200) {
        getScanFile();
      } else {
        toast.error(response?.data?.responseMessage);
      }
    } catch {}
    setOpen(false);
  };
  const handleDeleteLab = async () => {
    const token = localStorage.getItem("token");
    if (!labId) {
      toast.error("ID is empty");
      setOpen(false);
      return;
    }
    try {
      const response = await axios({
        method: "DELETE",
        url: ApiConfig.deleteLabFile,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          lab_report_id: labId,
        },
      });
      if (response.data?.responseCode === 200) {
        getLabFiles();
        setLabOpen(false);
      } else {
        toast.error(response?.data?.responseMessage);
      }
    } catch {}
    setLabOpen(false);
  };
  useEffect(() => {}, [formData]);
  useEffect(() => {
    getVitals();
    getScanFile();
    getLabFiles();
  }, [paginationData?.page, paginationLabReport?.page]);

  const handlePaginationChange = (event, value) => {
    setPaginationData(() => ({
      page: value,
      size: 4,
    }));
  };
  const handleLabReportPage = (event, value) => {
    setPaginationLabReport(() => ({
      page: value,
      size: 4,
    }));
  };
  return (
    <Box className={classes.mainBox}>
      <Typography variant="h2">Health Records</Typography>
      <Box className="subBox">
        <Box className="contentBox">
          <Box className="titleBox">
            <Box className="line" />
            <Typography variant="h4">Latest Vitals</Typography>
          </Box>
          <Box className="gridMainBox">
            <Grid container spacing={4}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box className="gridBox">
                  <label htmlFor="weight">Weight (kg)</label>
                  <TextField
                    type="text"
                    fullWidth
                    variant="outlined"
                    placeholder="Enter Weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                  />
                  {formData.weightError && (
                    <Typography color="error">
                      {formData.weightError}
                    </Typography>
                  )}
                </Box>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box className="gridBox">
                  <label htmlFor="height">Height (inch)</label>
                  <TextField
                    type="text"
                    fullWidth
                    variant="outlined"
                    placeholder="Enter Height"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                  />
                  {formData.heightError && (
                    <Typography color="error">
                      {formData.heightError}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box className="gridBox">
                  <label htmlFor="">BMI</label>
                  <TextField
                    type="text"
                    fullWidth
                    variant="outlined"
                    placeholder="Enter BMI"
                    name="bmi"
                    value={formData.bmi}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: true }}
                  />
                </Box>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box className="gridBox">
                  <label htmlFor="temperature">Temperature(°C)</label>
                  <TextField
                    type="text"
                    fullWidth
                    variant="outlined"
                    placeholder="Enter Tempreture"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleInputChange}
                  />
                  {formData.temperatureError && (
                    <Typography color="error">
                      {formData.temperatureError}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box className="gridBox">
                  <label htmlFor="">Pulse(SpO2)</label>
                  <TextField
                    type="text"
                    fullWidth
                    variant="outlined"
                    placeholder="Enter Pulse"
                    name="pulse"
                    value={formData.pulse}
                    onChange={handleInputChange}
                  />
                  {formData.pulseError && (
                    <Typography color="error">{formData.pulseError}</Typography>
                  )}
                </Box>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box className="gridBox">
                  <label htmlFor="blood_pressure">Blood Pressure (mmHg)</label>
                  <TextField
                    type="text"
                    fullWidth
                    variant="outlined"
                    placeholder="Enter Blood Pressure"
                    name="blood_pressure"
                    value={formData.blood_pressure}
                    onChange={handleInputChange}
                  />
                  {formData.blood_pressureError && (
                    <Typography color="error">
                      {formData.blood_pressureError}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box className="gridBox">
                  <label htmlFor="gender">Gender</label>
                  <Select
                    fullWidth
                    variant="outlined"
                    value={formData.sex}
                    onChange={handleInputChange}
                    inputProps={{
                      name: "sex",
                      id: "gender",
                    }}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <Box className="subBox">
        <Box className="contentBox">
          <Box className="secendBox">
            <Box className="titleBox">
              <Box className="line" />
              <Typography variant="h4">Scan Image</Typography>
            </Box>

            <Button
              variant="outlined"
              className="uploadBtn"
              onClick={handleUpload}
              disabled={loading}
            >
              + Upload
            </Button>
          </Box>
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            className={classes.dialogModal}
          >
            <Box mb={2} className="displaySpacebetween">
              <Typography variant="h6">Upload File</Typography>
              <CloseIcon onClick={() => setDialogOpen(false)} />
            </Box>

            <DialogContent style={{ padding: "0px" }}>
              <TextField
                placeholder="Enter File Name"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                fullWidth
                disabled={loading}
              />
              {fileSelected ? (
                <label className={classes.uploadLabel}>{scanFileName} </label>
              ) : (
                <label className={classes.uploadLabel}>
                  <AiOutlineUpload size={20} />
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFile}
                    style={{ display: "none", paddingBottom: "12px" }}
                  />
                  Choose File
                </label>
              )}
              {/* <label className={classes.uploadLabel}>
                <AiOutlineUpload size={20} />
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFile(e)}
                  style={{ display: "none" }}
                />
                Choose File
              </label> */}
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFileUpload}
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Upload"}
                </Button>
              </Box>
            </DialogActions>
          </Dialog>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scanLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : scanFileList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No Scan Data Found
                    </TableCell>
                  </TableRow>
                ) : (
                  scanFileList.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left">
                        <a
                          href={row.viewLink}
                          className="ancor"
                          target="_blank"
                        >
                          View
                        </a>
                      </TableCell>
                      <TableCell align="left" style={{ cursor: "pointer" }}>
                        <RiDeleteBin6Line onClick={() => deleteItem(row.id)} />
                      </TableCell>
                    </TableRow>
                  ))
                )}
                <Dialog
                  open={open}
                  onClose={handleCloseModal}
                  className={classes.dialogModal}
                >
                  <DialogTitle style={{ padding: "0px" }}>
                    <Typography variant="h4" style={{ textAlign: "center" }}>
                      Delete Appointment
                    </Typography>
                  </DialogTitle>
                  <DialogContent style={{ padding: "0px" }}>
                    <Typography
                      variant="body2"
                      style={{ textAlign: "center", margin: "20px 0px" }}
                    >
                      Are you sure you want to delete this scan image?
                    </Typography>
                  </DialogContent>
                  <DialogActions
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      onClick={handleCloseModal}
                      variant="contained"
                      color="secondary"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleDeleteScan}
                      variant="contained"
                      color="primary"
                    >
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </TableBody>
            </Table>
          </TableContainer>
          {totalPage > 1 && (
            <Box>
              <Pagination
                count={totalPage}
                shape="rounded"
                size="small"
                className="pagination"
                page={paginationData.page}
                onChange={(event, value) => {
                  handlePaginationChange(event, value);
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
      <Box className="subBox">
        <Box className="contentBox">
          {/* <Box className="secendBox">
            <Box className="titleBox">
              <Box className="line" />
              <Typography variant="h4">Lab Report</Typography>
            </Box>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleLabFileUpload(e?.target?.files[0])}
              style={{ display: "none" }}
              id="upload"
            />
            <label htmlFor="upload">
              <Button
                variant="outlined"
                className="uploadBtn"
                component="span"
                // onClick={handleLabFileUpload}
                disabled={loading}
              >
                {isDataLoading ? "Uploading..." : "+ Upload"}
              </Button>
            </label>
          </Box> */}
          <Box className="secendBox">
            <Box className="titleBox">
              <Box className="line" />
              <Typography variant="h4">Lab Report</Typography>
            </Box>

            <Button
              variant="outlined"
              className="uploadBtn"
              onClick={handleUpload1}
              disabled={loading}
            >
              + Upload
            </Button>
          </Box>
          <Dialog
            open={dialogOpen1}
            onClose={() => setDialogOpen1(false)}
            className={classes.dialogModal}
          >
            <Box mb={2} className="displaySpacebetween">
              <Typography variant="h6">Upload File</Typography>
              <CloseIcon onClick={() => setDialogOpen1(false)} />
            </Box>

            <DialogContent style={{ padding: "0px" }}>
              <TextField
                placeholder="Enter File Name"
                value={labReportName}
                onChange={(e) => {
                  setLabReportName(e.target.value);
                }}
                fullWidth
                disabled={loading}
              />

              {labReportSelected ? (
                <label className={classes.uploadLabel}>{labFileName}</label>
              ) : (
                <label className={classes.uploadLabel}>
                  <AiOutlineUpload size={20} />
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleLabFile(e)}
                    style={{ display: "none", paddingBottom: "12px" }}
                  />
                  Choose File
                </label>
              )}
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setDialogOpen1(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLabFileUpload}
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Upload"}
                </Button>
              </Box>
            </DialogActions>
          </Dialog>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {labLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : labReport.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No Lab Reports Found
                    </TableCell>
                  </TableRow>
                ) : (
                  labReport &&
                  labReport.length > 0 &&
                  labReport.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.lab_report_name}
                      </TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left" className="ancor">
                        <a
                          href={row.viewLink}
                          className="ancor"
                          target="_blank"
                        >
                          View
                        </a>
                      </TableCell>
                      <TableCell align="left" style={{ cursor: "pointer" }}>
                        <RiDeleteBin6Line
                          onClick={() => deleteLabItem(row.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
                <Dialog
                  open={labOpen}
                  onClose={handleCloseModal}
                  className={classes.dialogModal}
                >
                  <DialogTitle style={{ padding: "0px" }}>
                    <Typography variant="h4" style={{ textAlign: "center" }}>
                      Delete Lab Report
                    </Typography>
                  </DialogTitle>
                  <DialogContent style={{ padding: "0px" }}>
                    <Typography
                      variant="body2"
                      style={{ textAlign: "center", margin: "20px 0px" }}
                    >
                      Are you sure you want to delete this Lab report?
                    </Typography>
                  </DialogContent>
                  <DialogActions
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      onClick={handleLabCloseModal}
                      variant="contained"
                      color="secondary"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleDeleteLab}
                      color="primary"
                      variant="contained"
                    >
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {labTotalPage > 1 && (
          <Box>
            <Pagination
              count={labTotalPage}
              shape="rounded"
              size="small"
              className={classes.labPaginationCs}
              page={paginationLabReport.page}
              onChange={(event, value) => {
                handleLabReportPage(event, value);
              }}
            />
          </Box>
        )}
      </Box>
      <Box>
        <Button
          variant="contained"
          color="primary"
          className="filterBtn"
          onClick={createHealthRecord}
          // disabled={isLoading}

          //   onClick={() => history.push("/healthreportmanage")}
        >
          Update Health Report
        </Button>
      </Box>
    </Box>
  );
};

export default HealthRecord;
