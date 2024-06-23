/* eslint-disable react/jsx-no-duplicate-props */
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
  CircularProgress,
  MenuItem,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Pagination } from "@material-ui/lab";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { ApiConfig } from "src/config/apiConfig";
// import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TableCell, TableRow, TableBody } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Close } from "@material-ui/icons";
import GoBack from "src/component/GoBack";
const useStyles = makeStyles((theme) => ({
  mainBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "5px 0 50px 0",
    gap: "20px",
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
    "& MuiFormControl-root": {
      "& MuiFormLabel-root": {
        fontSize: "30px",
      },
    },
  },
  select: {
    "& .MuiFormLabel-root": {
      fontSize: 14,
    },
    "& .MuiInputBase-root": {
      background: "white",
    },
  },
  dialog: {
    "& .MuiDialog-paper": {
      maxWidth: "500px !important",
      width: "100%",
    },
    "& .MuiDialogContent-root": {
      padding: "24px 24px",
    },
    "& h2": {
      width: "fit-content",
    },
    "& .datePicker": {
      width: "100%",
      "& .MuiFormControl-root": {
        borderRadius: "10px !important",
        width: "100%",
        background: "rgba(0, 0, 0, 0.05)",
      },
      "& .MuiInputBase-root": {
        padding: "16px 10px",
      },
      "& .MuiInput-underline:before": {
        borderBottom: "0px",
      },
      "& .MuiInput-underline:after": {
        borderBottom: "0px",
      },
      "& .MuiIconButton-root": {
        color: theme.palette.primary.main,
      },
      "& button": {
        padding: "0px",
        height: "auto ",
      },
    },
    "& hr": {
      margin: "10px 0",
    },
  },
  mainAppBox: {
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",

    "& .headerText": {
      "& h2": {
        color: "#161E29",
        fontFamily: "Calistoga",
        fontStyle: "normal",
        fontWeight: "500",
        display: "flex",
        gap: "10px",
        marginLeft: "10px",
        [theme.breakpoints.down("xs")]: {
          fontSize: "20px",
        },
        "@media(max-width:375px)": {
          fontSize: "20px !important",
          marginRight: "6px",
        },
      },
      "& svg": {
        fontSize: "30px",
        [theme.breakpoints.down("xs")]: {
          fontSize: "20px",
        },
      },
    },
    "& .subBox": {
      background: "#FFF",
      borderRadius: "15px",
      width: "100%",
      padding: "20px 0",
    },
    "& .mainBox": {
      padding: "0px 20px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      // "& .downloadBtn": {
      //   "& button": {
      //     width: "265px",

      //     [theme.breakpoints.down("lg")]: {
      //       width: "218px",
      //     },
      //     [theme.breakpoints.down("md")]: {
      //       width: "190px",
      //     },
      //     [theme.breakpoints.down("xs")]: {
      //       width: "100%",
      //     },
      //   },
      // },
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
    "& .filterBtn": {
      height: "50px",
      borderRadius: "50px",
      // marginRight: "10px",
      padding: "0 20px",
      [theme.breakpoints.down("xs")]: {
        padding: "0 18px",
      },
    },
    "& .respfilterBtn": {
      height: "50px",
      borderRadius: "50px",
      // marginRight: "10px",
      padding: "0 20px",
      [theme.breakpoints.down("xs")]: {
        padding: "0 18px",
      },
      "@media(max-width:375px)": {
        height: "35px",
        boxSizing: "border-box",
        fontSize: "11px",
        lineHeight: "13px",
        maxWidth: "135px",
        padding: " 0px 9px !important",
      },
    },
    "& .inputBox": {
      width: "100%",
    },
    "& .dateBox": {
      // width: "20%",
      height: "18px",
      // "@media(max-width:599px)": {
      //   width: "auto",
      // },
    },
    "& .MuiTableCell-head": {
      background: "rgba(104, 30, 101, 0.05)",
    },
    "& .action": {
      display: "flex",
      gap: "10px",
      justifyContent: "end",
    },
    "& .icon": {
      border: "1px solid ",
      padding: "5px",
      fontSize: "20px",
      borderRadius: "10px",
      cursor: "pointer",
      color: "#4D164F",
      "&:hover": {
        color: "rgba(8, 5, 21, 0.60)",
      },
    },
    "& .MuiTableContainer-root": {
      width: "auto",
    },
    "& .MuiTableRow-root": {
      borderBottom: "1px solid rgba(0, 0, 0, 0.10)",
    },

    "& .MuiTableCell-root": {
      minWidth: "120px",
      padding: " 16 10px",
      [theme.breakpoints.up("sm")]: {
        minWidth: "150px",
        padding: " 16 12px",
      },
    },
    "& .MuiTableCell-root:first-child": {
      minWidth: "30px",
    },
    "& .MuiTableCell-root:nth-child(6)": {
      minWidth: "60px",
    },
    "& .MuiTableCell-root:nth-child(5)": {
      minWidth: "140px",
      [theme.breakpoints.up("sm")]: {
        minWidth: "190px",
      },
    },
    // "& .gridBox2": {
    //   display: "flex",
    //   gap: "5px",
    //   width: "50%",
    //   "@media(max-width:599px)": {
    //     width: "100%",
    //   },
    // },
    // "& .gridBox1": {
    //   display: "flex",
    //   gap: "20px",
    //   "@media(max-width:599px)": {
    //     flexDirection: "column",
    //   },
    // },
    // "& .gridButtonBox": {
    //   display: "flex",
    //   gap: "10px",
    //   justifyContent: "space-between",
    //   // flexWrap:"wrap"
    // },
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
function createData1(
  S_No,
  Doctor,
  Horpital,
  Location,
  Appoinment,
  Status,
  Action
) {
  return { S_No, Doctor, Horpital, Location, Appoinment, Status, Action };
}

const AppointMent = () => {
  const classes = useStyles();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [appointmentList, setAppointmentList] = useState([{}]);
  const [searchQuery, setSearchQuery] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [paginationData, setPaginationData] = useState({
    page: 1,
    size: 10,
  });
  const [status, setStatus] = useState();
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
  useEffect(() => {
    handleFilterClick();
  }, [selectedFromDate, selectedToDate, searchQuery]);
  const [reason, setReason] = useState("");
  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const fetchAppointmentDetail = async (page, size) => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.appointmentList,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          page,
          size,
        },
      });
      if (res.data?.responseCode === 200) {
        console.log(res?.data, "dataaaaa");
        setIsLoading(false);

        setAppointmentList(res?.data?.responseData);
        setTotalPage(res?.data?.totalPages);
        // setStatus((prevState) =>[
        //   ...prevState,
        //   ...res?.data?.responseData?.Status
        // ])
        setPaginationData((prevData) => ({
          ...prevData,
          page,
        }));
        console.log(res?.data?.responseData, "resssssssssss");
      } else if (res.data?.responseCode === 400) {
        toast.error("Appointment status is already cancelled");
      } else {
        toast.error(res.data?.responseMessage || "Something went wrong");
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

  // useEffect(() => {
  //   fetchAppointmentDetail();
  // }, []);

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
        url: ApiConfig.appointmentList,
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
  const handleClearFilters = () => {
    if (
      selectedFromDate == null &&
      selectedToDate == null &&
      searchQuery == ""
    ) {
      return;
    }
    setSelectedFromDate(null);
    setSelectedToDate(null);
    setSearchQuery("");
    fetchAppointmentDetail();
  };

  const downloadCsv = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.downloadCsv,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        responseType: "blob",
      });

      if (res.data) {
        // Get the current date and time
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        // Construct the filename
        const filename = `appointment-list_${day}-${month}-${year}_${hours}-${minutes}-${seconds}.csv`;

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
  const [open, setOpen] = useState(false);

  const handleOpenModal = (id) => {
    setSelectedAppointment(id);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleClose = async (id) => {
    console.log(id, "handlee");
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "post",
        url: ApiConfig.handleCheckForAppointment,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          appointment_id: id,
          cancelled_reason: reason,
        },
      });
      if (response.data?.responseCode === 200) {
        fetchAppointmentDetail();
      } else {
        toast.error(response?.data?.responseMessage);
      }
    } catch {}
  };

  const handleCheckIn = async (id) => {
    console.log(id, "handlee");
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "post",
        url: ApiConfig.handleCheckInStatus,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          appointment_id: id,
        },
      });
      if (response.data?.responseCode === 200) {
        fetchAppointmentDetail();
      } else {
        toast.error(response?.data?.responseMessage);
      }
    } catch {}
  };
  const handleDeleteAppointment = async () => {
    const token = localStorage.getItem("token");
    if (!selectedAppointment) {
      toast.error("ID is empty");
      setOpen(false);
      return;
    }
    try {
      const response = await axios({
        method: "DELETE",
        url: ApiConfig.deleteAppointment,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          appointment_id: selectedAppointment,
        },
      });
      if (response.data?.responseCode === 200) {
        fetchAppointmentDetail();
      } else {
        toast.error(response?.data?.responseMessage);
      }
    } catch {}
    setOpen(false);
  };
  const handlePaginationChange = (event, value) => {
    fetchAppointmentDetail(value, paginationData.size);
  };
  useEffect(() => {
    fetchAppointmentDetail();
  }, []);

  const [cancelViewOpen, setCancelViewOpen] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [appointmentId, setAppointmentId] = useState();
  const handleCancelViewOpen = () => {
    setCancelViewOpen(false);
  };

  const handleCancel2 = (id) => {
    setCancel(true);
    setCancelViewOpen(true);
    setAppointmentId(id);
  };

  const handleCancel = async (id) => {
    if (reason != "") {
      await handleClose(appointmentId);
      setAppointmentId(null);
      setCancelViewOpen(false);
      setCancel(false);
    } else {
      toast.error("Please select reason.");
    }
  };

  const options = [
    { value: "emergency", label: "Family Emergency" },
    { value: "priorities", label: "Conflicting Priorities" },
    { value: "delays", label: "Travel Delays" },
    { value: "work", label: "Work Obligations" },
    { value: "weather", label: "Inclement Weather" },
    { value: "personal", label: "Personal Reasons" },
  ];

  return (
    <>
      <Box className={classes.mainAppBox}>
        <Box className="headerText displaySpacebetween">
          <Box className="displayStart" onClick={() => window.history.back()}>
            <GoBack />
            <Typography variant="h2">Appointment</Typography>
          </Box>

          <Box>
            <Button
              variant="contained"
              color="primary"
              className="filterBtn respfilterBtn"
              onClick={() => {
                history.push("/prescription");
              }}
            >
              View Prescription List
            </Button>
          </Box>
        </Box>

        <Box class="subBox">
          <Box className="mainBox">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Box /* className="gridBox1" */>
                  <TextField
                    type="text"
                    variant="outlined"
                    placeholder="Search by doctor name"
                    className="inputBox"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  {/* <Box>
                      <img src="./images/search.png" alt="" />{" "}
                    </Box> */}
                </Box>
              </Grid>
              <Grid item xs={6} sm={3} md={2} lg={2}>
                <Box>
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
                </Box>
              </Grid>
              <Grid item xs={6} sm={3} md={2} lg={2}>
                <Box>
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
                    disabled={!selectedFromDate}
                  />
                </Box>
              </Grid>
              <Grid item xs={6} sm={3} md={1} lg={1}>
                <Box>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="filterBtn"
                    onClick={handleFilterClick}
                  >
                    Apply
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3} md={1} lg={1}>
                <Box className="gridButtonBox">
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
              <Grid item xs={12} sm={3} md={2} lg={2}>
                <Box className="downloadBtn displayEnd">
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className="filterBtn"
                    // style={{ padding: "10px" }}
                    onClick={downloadCsv}
                  >
                    Download CSV
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <TableContainer component={Paper}>
            {isLoading ? (
              <Grid container justifyContent="center" alignItems="center">
                <CircularProgress />
              </Grid>
            ) : (
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.cell}>S.No</TableCell>
                    <TableCell className={classes.cell} align="left">
                      Doctor Name
                    </TableCell>
                    <TableCell className={classes.cell} align="left">
                      Hospital Name
                    </TableCell>
                    <TableCell className={classes.cell} align="left">
                      Location
                    </TableCell>
                    <TableCell className={classes.cell} align="left">
                      Appointment Date & Time
                    </TableCell>
                    <TableCell className={classes.cell} align="left">
                      Status
                    </TableCell>
                    <TableCell className={classes.cell} align="center">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  style={{
                    height:
                      appointmentList && appointmentList.length > 0
                        ? "auto"
                        : "50vh",
                  }}
                >
                  {appointmentList && appointmentList?.length > 0 ? (
                    appointmentList?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell align="left">
                          {row?.Doctor_Name || "--"}
                        </TableCell>
                        <TableCell align="left">
                          {row.Hospital_Name || "--"}
                        </TableCell>
                        <TableCell align="left">
                          {row.Location || "--"}
                        </TableCell>
                        <TableCell align="left">
                          {row.appointmentDateTime || "--"}
                        </TableCell>
                        <TableCell
                          align="left"
                          // style={{
                          //   color:
                          //     row.Status === "confirmed"
                          //       ? "#09a509"
                          //       : row.Status === "pending"
                          //       ? "#f2c713"
                          //       : row.Status === "cancelled"
                          //       ? "red"
                          //       : "",
                          // }}
                          style={{
                            color:
                              row.Status === "confirmed"
                                ? "#0000FF"
                                : row.Status === "completed"
                                ? "#008000"
                                : row.Status === "pending"
                                ? "#FFA500"
                                : row.Status === "cancelled"
                                ? "#FF0000"
                                : "inherit",
                          }}
                        >
                          {(row.Status &&
                            row.Status.charAt(0).toUpperCase() +
                              row.Status.slice(1)) ||
                            "--"}
                        </TableCell>
                        {row.Status !== "completed" && (
                          <TableCell align="left" className="action">
                            {row.Status !== "cancelled" &&
                              row.Status !== "check-in" &&
                              row.Status == "confirmed" && (
                                <BsCheckCircle
                                  className="icon"
                                  title="Check-in"
                                  onClick={() => handleCheckIn(row?.id)}
                                />
                              )}
                            {row.Status !== "cancelled" &&
                              row.Status !== "check-in" && (
                                <>
                                  <AiOutlineClose
                                    title="Cancel"
                                    className="icon"
                                    onClick={() => handleCancel2(row?.id)}
                                  />{" "}
                                </>
                              )}
                          </TableCell>
                        )}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        {/* <Typography variant="body1">NO DATA FOUND</Typography>
                         */}
                        <Box mx={5} className="displayCenter">
                          <img src="images/no_data.png" alt="no_data" />
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}

                  <Dialog open={open} onClose={handleCloseModal}>
                    <DialogTitle>Delete Appointment</DialogTitle>
                    <DialogContent>
                      <p>Are you sure you want to delete this appointment?</p>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseModal} color="primary">
                        Cancel
                      </Button>
                      <Button
                        onClick={handleDeleteAppointment}
                        color="primary"
                        autoFocus
                      >
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Box>
        <Box align="right">
          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              shape="rounded"
              size="small"
              className="pagination"
              page={paginationData.page}
              onChange={handlePaginationChange}
            />
          )}
        </Box>
      </Box>

      <Dialog
        open={cancelViewOpen}
        onClose={() => handleCancelViewOpen()}
        className={classes.dialog}
      >
        <DialogContent>
          <Box className="displaySpacebetween">
            <Typography variant="h2"></Typography>
            <Close onClick={() => handleCancelViewOpen()} />
          </Box>

          <Box className={classes.mainBox}>
            <img
              src="images/decline.png"
              alt="gps"
              style={{ height: "70px", width: "70px" }}
            />
            <Box className="titleBox">
              <Typography variant="h4">Cancel Appointment!</Typography>
            </Box>
            <Typography variant="body2">
              Are you  sure you want to cancel request?
            </Typography>
            <TextField
              variant="outlined"
              select
              label="-Select Reason-"
              value={reason}
              onChange={handleReasonChange}
              className={classes.select}
              fullWidth
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
              <MenuItem key={"Other"} value={"Other"}>
                Other
              </MenuItem>
            </TextField>
            <Box
              className="button1"
              style={{ display: "flex", gap: "20px", width: "100%" }}
            >
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className=""
                onClick={() => {
                  setCancelViewOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className=""
                disabled={isLoading}
                type="submit"
                onClick={() => handleCancel(appointmentId)}
              >
                Sure
                {isLoading && (
                  <CircularProgress
                    size={20}
                    style={{ color: "#fff", marginLeft: "10px" }}
                  />
                )}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointMent;
