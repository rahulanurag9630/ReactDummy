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
  CircularProgress,
  FormControl,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { AiOutlineDownload } from "react-icons/ai";
import { Pagination } from "@material-ui/lab";
import { FaEye } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import toast from "react-hot-toast";
import { ApiConfig } from "src/config/apiConfig";

const useStyles = makeStyles((theme) => ({
  mainAppBox: {
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    "& h2": {
      color: "#161E29",
      fontFamily: "Calistoga",
      fontStyle: "normal",
      fontWeight: "500",
      display: "flex",
      gap: "10px",
    },
    "& .subBox": {
      background: "#FFF",
      borderRadius: "15px",
      width: "100%",
      padding: "20px 0",
    },
    "& .downloadBtn": {
      "& button": {
        width: "265px",
        [theme.breakpoints.down("xs")]: {
          width: "100%",
        },
      },
    },
    "& .mainBox": {
      // padding: "0px 20px",
      display: "flex",
      gap: "10px",

      "@media(max-width:600px)": {
        flexDirection: "column",
      },
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "50px",
      padding: "5px 20px",
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
    "& .MuiFormControl-marginNormal": {
      marginTop: "0",
      marginBottom: "0",
      background: "rgba(0, 0, 0, 0.05)",
      borderRadius: "50px",
      padding: "15px 20px",
      border: "1px solid rgba(0, 0, 0, 0.05)",
    },
    "& .MuiTableCell-head": {
      background: "rgba(104, 30, 101, 0.05)",
    },
    "& .action": {
      display: "flex",
      gap: "5px",
    },
    "& .icon": {
      border: "1px solid",
      padding: "5px",
      fontSize: "20px",
      cursor: "pointer",
      borderRadius: "10px",
      "&:hover": {
        color: "#4D164F",
      },
    },
    "& .MuiTableContainer-root": {
      width: "auto",
    },
    "& .MuiTableRow-root": {
      borderBottom: "1px solid rgba(0, 0, 0, 0.10)",
    },
    "& .filterBtn": {
      height: "45px",
      borderRadius: "50px",
      padding: "0 40px",
      "@media(max-width:1490px)": { padding: "0 25px" },
      "@media(max-width:967px)": { padding: "0 40px" },
    },
    "& .inputBox1": {
      display: "flex",
      gap: "10px",
      // width: "57%",
      "@media(max-width:600px)": {
        width: "100%",
      },
    },
    "& .inputBox": {
      width: "100%",
    },
    "& .dateBox": {
      // width: "30%",
      height: "18px",
      // "@media(max-width:600px)": {
      //   width: "auto",
      // },
    },
    "& .button": {
      display: "flex",
      gap: "10px",
      justifyContent: "space-between",
      // padding: "0 20px",
      "@media(max-width:670px)": {
        flexWrap: "wrap",
      },
      "@media(max-width:959px)": {
        justifyContent: "start",
      },
    },
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
}));
function createData1(ID, Doctor, Horpital, Location, Appoinment, Action) {
  return { ID, Doctor, Horpital, Location, Appoinment, Action };
}

const LabReport = () => {
  const classes = useStyles();
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [appointmentList, setAppointmentList] = useState([{}]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;
  const history = useHistory();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFromDateChange = (date) => {
    setSelectedFromDate(date);
  };

  const handleToDateChange = (date) => {
    setSelectedToDate(date);
  };
  const rows1 = [
    createData1(
      "P0989w381",
      "Dr. Sanjay",
      "ASF Hospital",
      "NH-19,  Delhi 110076",
      "14th Dec 2023, 13:30 PM",
      [<FaEye className="icon" />, <AiOutlineDownload className="icon" />]
    ),
    createData1(
      "P0989w381",
      "Dr. Sanjay",
      "ASF Hospital",
      "NH-19,  Delhi 110076",
      "14th Dec 2023, 13:30 PM",
      [<FaEye className="icon" />, <AiOutlineDownload className="icon" />]
    ),
    createData1(
      "P0989w381",
      "Dr. Sanjay",
      "ASF Hospital",
      "NH-19,  Delhi 110076",
      "14th Dec 2023, 13:30 PM",
      [<FaEye className="icon" />, <AiOutlineDownload className="icon" />]
    ),
    createData1(
      "P0989w381",
      "Dr. Sanjay",
      "ASF Hospital",
      "NH-19,  Delhi 110076",
      "14th Dec 2023, 13:30 PM",
      [<FaEye className="icon" />, <AiOutlineDownload className="icon" />]
    ),
    createData1(
      "P0989w381",
      "Dr. Sanjay",
      "ASF Hospital",
      "NH-19,  Delhi 110076",
      "14th Dec 2023, 13:30 PM",
      [<FaEye className="icon" />, <AiOutlineDownload className="icon" />]
    ),
    createData1(
      "P0989w381",
      "Dr. Sanjay",
      "ASF Hospital",
      "NH-19,  Delhi 110076",
      "14th Dec 2023, 13:30 PM",
      [<FaEye className="icon" />, <AiOutlineDownload className="icon" />]
    ),
    createData1(
      "P0989w381",
      "Dr. Sanjay",
      "ASF Hospital",
      "NH-19,  Delhi 110076",
      "14th Dec 2023, 13:30 PM",
      [<FaEye className="icon" />, <AiOutlineDownload className="icon" />]
    ),
    createData1(
      "P0989w381",
      "Dr. Sanjay",
      "ASF Hospital",
      "NH-19,  Delhi 110076",
      "14th Dec 2023, 13:30 PM",
      [<FaEye className="icon" />, <AiOutlineDownload className="icon" />]
    ),
    createData1(
      "P0989w381",
      "Dr. Sanjay",
      "ASF Hospital",
      "NH-19,  Delhi 110076",
      "14th Dec 2023, 13:30 PM",
      [<FaEye className="icon" />, <AiOutlineDownload className="icon" />]
    ),
    createData1(
      "P0989w381",
      "Dr. Sanjay",
      "ASF Hospital",
      "NH-19,  Delhi 110076",
      "14th Dec 2023, 13:30 PM",
      [<FaEye className="icon" />, <AiOutlineDownload className="icon" />]
    ),
  ];

  const fetchPrescriptionList = async (page = 1) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.prescriptionList,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          page,
          itemsPerPage,
        },
      });
      if (res.data?.responseCode === 200) {
        setIsLoading(false);
        console.log(res?.data.responseData, "dataaaaa");
        // // toast.success(res.data?.responseMessage);
        setAppointmentList(res?.data?.responseData);
        console.log(res?.data?.responseData, "resssssssssss");
      } else {
        // toast.error(res.data?.responseMessage || "Something went wrong");
        return null;
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(
        error?.response?.data?.responseMessage || "Something went wrong"
      );
      return null;
    }
  };

  useEffect(() => {
    fetchPrescriptionList();
  }, []);

  const handleFilterClick = async () => {
    const token = localStorage.getItem("token");
    if (
      selectedFromDate &&
      selectedToDate &&
      selectedToDate < selectedFromDate
    ) {
      toast.error("End date cannot be earlier than start date");
      return;
    }

    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.prescriptionList,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          search: searchQuery,
          date_from: selectedFromDate
            ? selectedFromDate.toISOString().split("T")[0]
            : null,
          date_to: selectedToDate
            ? selectedToDate.toISOString().split("T")[0]
            : null,
        },
      });

      if (res.data?.responseCode === 200) {
        console.log(res?.data.responseData, "Filtered data");
        // toast.success(res.data?.responseMessage);
        setAppointmentList(res?.data?.responseData);
      } else {
        toast.error(res.data?.responseMessage || "Something went wrong");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.responseMessage || "Something went wrong"
      );
    }
  };

  const handlePageChange = (event, page) => {
    fetchPrescriptionList(page);
  };
  
  const downloadHandler = async (id) => {
    if (id === undefined || id === null) {
      toast.error("There is no Data");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "GET",
        url: `${ApiConfig.downloadPrescriptionById}${id}/`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        responseType: "blob",
      });
      const blob = new Blob([res.data], { type: res.headers["content-type"] });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `prescription_${id}`; // Set the desired file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Release the object URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading prescription:", error);
      // Handle the error, e.g., show a notification to the user
    }
  };
  const handleClearFilters = () => {
    setSelectedFromDate(null);
    setSelectedToDate(null);
    setSearchQuery("");
    fetchPrescriptionList();
  };

  const downloadCsv = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.downloadPrescriptionCsv,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        responseType: "blob",
      });
      if (res.data) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        // Construct the filename
        const filename = `prescription-list_${day}-${month}-${year}_${hours}-${minutes}-${seconds}.csv`;

        // Create a blob from the response data
        const blob = new Blob([res.data], { type: "application/octet-stream" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        toast.error("Failed to download CSV file");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.responseMessage || "Something went wrong"
      );
    }
  };
  const viewHandler = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "GET",
        url: `${ApiConfig.viewPrescription}${id}/`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        responseType: "json", // Set responseType to 'json'
      });

      console.log("Response:", res);

      if (res.status === 200) {
        const imageUrl = res.data?.responseData?.image_url;

        if (imageUrl) {
          // toast.success("Prescription image retrieved successfully");

          // Open the image in a new tab
          window.open(imageUrl, "_self");
        } else {
          toast.error("Image URL not found in the response");
        }
      } else {
        toast.error("Failed to fetch prescription image");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.responseMessage || "Something went wrong"
      );
    }
  };
  return (
    <Box className={classes.mainAppBox}>
      <Box onClick={() => window.history.back()}>
        <Typography variant="h2">
          <FaArrowLeftLong /> Prescription
        </Typography>
      </Box>

      <Box classname="subBox">
        <Box style={{ padding: "0px 20px" }}>
          <Grid container spacing={2}>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <Box className="mainBox">
                <Box className="inputBox1">
                  <TextField
                    fullWidth
                    type="text"
                    variant="outlined"
                    placeholder="Search by doctor name"
                    className="inputBox"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <Box>
                    <img src="./images/search.png" alt="" />{" "}
                  </Box>
                </Box>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="DD/MM/yyyy"
                  margin="normal"
                  placeholder="From"
                  id="date-picker-inline"
                  value={selectedFromDate}
                  onChange={handleFromDateChange}
                  className="dateBox"
                />
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="DD/MM/yyyy"
                  margin="normal"
                  placeholder="To"
                  id="date-picker-inline"
                  value={selectedToDate}
                  onChange={handleToDateChange}
                  className="dateBox"
                  minDate={selectedFromDate}
                />
              </Box>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Box className="button">
                <Button
                  fullWidth
                  variant="contained"
                  className="filterBtn"
                  onClick={handleFilterClick}
                >
                  Apply
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className="filterBtn"
                  onClick={handleClearFilters}
                >
                  Clear
                </Button>
              </Box>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Box className="downloadBtn displayEnd">
                <Button
                  variant="contained"
                  color="secondary"
                  className="filterBtn"
                  onClick={downloadCsv}
                >
                  Download CSV
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box mt={3}>
          <TableContainer component={Paper}>
            {isLoading ? (
              <Grid container justifyContent="center" alignItems="center">
                <CircularProgress />
              </Grid>
            ) : (
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Prescription ID</TableCell>
                    <TableCell align="left">Doctor Name</TableCell>
                    <TableCell align="left">Hospital Name</TableCell>
                    <TableCell align="left">Location</TableCell>
                    <TableCell align="left">Received Date & Time</TableCell>
                    <TableCell align="left">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointmentList.length > 0 ? (
                    appointmentList.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell align="left">
                          {row?.doctor_name || "--"}
                        </TableCell>
                        <TableCell align="left">
                          {row.hospital_name || "--"}
                        </TableCell>
                        <TableCell align="left">
                          {row.hospital_location || "--"}
                        </TableCell>
                        <TableCell align="left">
                          {row.created_date_time || "--"}
                        </TableCell>
                        <TableCell align="left" className="action">
                          <FaEye
                            className="icon"
                            onClick={() => viewHandler(row?.id)}
                          />{" "}
                          <AiOutlineDownload
                            className="icon"
                            onClick={() => downloadHandler(row?.id)}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        {/* <Typography variant="body1">NO DATA FOUND</Typography> */}
                        <Box mx={5} className="displayCenter">
                          <img src="images/no_data.png" alt="no_data" />
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Box>
      </Box>
      <Box align="right">
        <Pagination
          count={totalPages}
          shape="rounded"
          size="small"
          page={currentPage}
          onChange={handlePageChange}
          className="pagination"
        />
      </Box>
    </Box>
  );
};

export default LabReport;
