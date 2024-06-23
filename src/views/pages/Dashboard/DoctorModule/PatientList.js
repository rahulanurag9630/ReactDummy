import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  makeStyles,
  CircularProgress,
  Checkbox,
  Paper,
} from "@material-ui/core";
import {
  Close,
  CloseOutlined,
  FilterList,
  Search,
  Visibility,
} from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import { KeyboardDatePicker } from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlineUpload } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";
import { ApiConfig, mediaUrl } from "../../../../config/apiConfig";

const useStyle = makeStyles((theme) => ({
  main: {
    "& .filter": {
      marginBottom: "10px",
      "& .datePicker": {
        width: "100%",
        "& .MuiFormControl-root": {
          borderRadius: "50px !important",
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
        "& button": {
          padding: "0px",
          height: "auto ",
        },
      },
      "& .filterBtn": {
        height: "45px",
        borderRadius: "50px",
        // marginRight: "10px",
      },
      // "& .button1": {
      //   display: "flex",
      //   gap: "10px",
      //   // padding: "0 20px",
      // },
      "& .downloadBtn": {
        width: "82%",
        [theme.breakpoints.down("sm")]: {
          width: "77%",
        },
        [theme.breakpoints.down("xs")]: {
          width: "85%",
        },
        "@media(max-width:375px)": {
          width: "80%",
        },
      },
    },
    "& .table": {
      marginTop: "30px",
      borderRadius: "10px",
      background: theme.palette.secondary.main,
      padding: "10px",
      "& .actionBtn": {
        gap: "5px",
        "& button": {
          padding: "10px",
          borderRadius: "5px",
          height: "auto",
          border: "1px solid",
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
        },
      },
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "50px",
    },
    "& .searchBtn": {
      padding: "10px",
      height: "auto",
      marginLeft: "10px",
      border: "2px solid",
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
    },
    "& .filterIcon": {
      padding: "8px",
      height: "auto",
      marginLeft: "10px",
      border: "2px solid",
      borderRadius: "10px",
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
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
  mainBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "5px 5% 50px 5%",
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
  },
}));
function PatientList() {
  const history = useHistory();
  const [filter, setFilter] = useState({
    appointment_type: "",
    patient_name: "",
  });

  const [doctorPatientList, setDoctorPatientList] = useState([]);
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyle();
  const [scanData, setScanData] = useState([{}]);
  const [healthData, setHealthData] = useState([{}]);
  const [labData, setLabData] = useState([{}]);
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const itemsPerPage = 10;
  // const totalPages = Math.ceil(doctorPatientList.length / itemsPerPage);
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const startItem = (currentPage - 1) * itemsPerPage;
  const endItem = currentPage * itemsPerPage;
  const [viewOpen, setViewOpen] = useState(false);
  const handleClose = () => {
    setOpenFilter(false);
    setSelectedFromDate(null);
    setSelectedToDate(null);
    getAllDoctorPatientList();
  };
  const handleCloseView = () => {
    setViewOpen(false);
  };
  const handleSelectChange = (value) => {
    setFilter({
      ...filter,
      appointment_type: value,
    });
  };

  const handleFromDateChange = (date) => {
    setSelectedFromDate(date);
  };

  const handleToDateChange = (date) => {
    setSelectedToDate(date);
  };
  // const data = [
  //   {
  //     SrNo: "1",
  //     PatientName: "Mr. Sanjay",
  //     PhoneNo: "+91 78965-56787",
  //     Location: "NH-19,  Delhi 110076",
  //   },
  //   {
  //     SrNo: "1",
  //     PatientName: "Mr. Sanjay",
  //     PhoneNo: "+91 78965-56787",
  //     Location: "NH-19,  Delhi 110076",
  //   },
  //   {
  //     SrNo: "1",
  //     PatientName: "Mr. Sanjay",
  //     PhoneNo: "+91 78965-56787",
  //     Location: "NH-19,  Delhi 110076",
  //   },
  //   {
  //     SrNo: "1",
  //     PatientName: "Mr. Sanjay",
  //     PhoneNo: "+91 78965-56787",
  //     Location: "NH-19,  Delhi 110076",
  //   },
  //   {
  //     SrNo: "1",
  //     PatientName: "Mr. Sanjay",
  //     PhoneNo: "+91 78965-56787",
  //     Location: "NH-19,  Delhi 110076",
  //   },
  //   {
  //     SrNo: "1",
  //     PatientName: "Mr. Sanjay",
  //     PhoneNo: "+91 78965-56787",
  //     Location: "NH-19,  Delhi 110076",
  //   },
  //   {
  //     SrNo: "1",
  //     PatientName: "Mr. Sanjay",
  //     PhoneNo: "+91 78965-56787",
  //     Location: "NH-19,  Delhi 110076",
  //   },
  //   {
  //     SrNo: "1",
  //     PatientName: "Mr. Sanjay",
  //     PhoneNo: "+91 78965-56787",
  //     Location: "NH-19,  Delhi 110076",
  //   },
  //   {
  //     SrNo: "1",
  //     PatientName: "Mr. Sanjay",
  //     PhoneNo: "+91 78965-56787",
  //     Location: "NH-19,  Delhi 110076",
  //   },
  //   {
  //     SrNo: "1",
  //     PatientName: "Mr. Sanjay",
  //     PhoneNo: "+91 78965-56787",
  //     Location: "NH-19,  Delhi 110076",
  //   },
  //   {
  //     SrNo: "1",
  //     PatientName: "Mr. Sanjay",
  //     PhoneNo: "+91 78965-56787",
  //     Location: "NH-19,  Delhi 110076",
  //   },
  // ];

  const getAllDoctorPatientList = async (filter) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios({
        method: "GET",
        url: ApiConfig["doctor-patient-list"],
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { ...filter },
      });
      console.log(response, "alllllllllllllll");
      if (response && response?.data?.responseCode === 200) {
        console.log(response?.data?.responseData);

        setDoctorPatientList(response?.data?.responseData);
        console.log(response?.data?.responseData, "dddddddddddddddd");
        setTotalPage(response?.data?.totalPages);
        setIsLoading(false);
      } else {
        toast.error(
          response?.data?.responseMessage || "Failed to fetch options"
        );
        setIsLoading(false);
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error(err?.response?.data?.responseMessage);
      setIsLoading(false);
    }
  };

  const handleUpload = async (file, id) => {
    console.log(file, id, "fillle");
    if (!file) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found.");
        return;
      }
      const formData = new FormData();
      formData.append("prescription_file", file);
      try {
        const response = await axios({
          method: "POST",
          url: `${ApiConfig.uploadPrescriptionFile}?patient_id=${id}`,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        });

        if (response && response.data && response.data.responseCode === 201) {
        } else {
          toast.error(
            response?.data?.responseMessage || "Unknown error occurred."
          );
        }
      } catch (err) {
        console.error("Error uploading file:", err);
        toast.error(
          err.response?.data?.responseMessage || "An error occurred."
        );
      }
    } catch (err) {
      console.error("Error handling lab file upload:", err);
      toast.error("An error occurred while handling lab file upload.");
    }
  };

  useEffect(() => {
    getAllDoctorPatientList(filter);
  }, [filter]);

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
        url: ApiConfig["doctor-patient-list"],
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
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

        setDoctorPatientList(res?.data?.responseData);
        setOpenFilter(false);
      } else {
        toast.error(res.data?.responseMessage || "Something went wrong");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.responseMessage || "Something went wrong"
      );
    }
  };

  const downloadCsv = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.doctorPatientCsv,
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
        const filename = `patient-list_${day}-${month}-${year}_${hours}-${minutes}-${seconds}.csv`;

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
  const handleUploadButtonClick = () => {
    document.getElementById("file-input").click();
  };
  const handleView = (id) => {
    setViewOpen(true);
    getHealthData(id);
  };
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
            checkbox: <Checkbox />,
            id: item?.id,
          };
        });

        setScanData(rowsData);
        const labreportData = response?.data?.responseData?.lab_report || [];
        const labRow = labreportData.map((item) => {
          console.log(item, "df");
          return {
            name: item?.name,
            lab_report_name: item?.lab_report_name || "Lab Name",
            viewLink: item?.lab_reports_file,
            checkbox: <Checkbox />,
            id: item?.id,
          };
        });
        setLabData(labRow);
        console.log(scanData, "scaaaaaaaa");
        setIsLoading(false);
      } else {
        toast.error(
          response?.data?.ResponseMessage || "Failed to fetch options"
        );
      }
    } catch {}
  };
  const formatDate = (dateString) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours < 12 ? "AM" : "PM";
    const formattedHours = hours % 12 || 12;

    return `${day}th ${month} ${year}, ${formattedHours}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${ampm}`;
  };

  return (
    <div>
      <Grid container className={classes.main}>
        <Grid item xs={12} className="displaySpacebetween">
          <Box className="displayStart">
            <Typography variant="h3">Patient List</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} className="table">
          <Grid container className="filter" spacing={1}>
            <Grid item lg={4} md={4} sm={4} xs={12}>
              <Box className="displayStart">
                <TextField
                  fullWidth
                  placeholder="Search by patient name"
                  variant="outlined"
                  value={filter.patient_name}
                  onChange={(e) =>
                    setFilter({ ...filter, patient_name: e.target.value })
                  }
                />
                <IconButton className="searchBtn">
                  <Search />
                </IconButton>
              </Box>
            </Grid>

            <Grid item lg={4} md={4} sm={4} xs={12}>
              <Select
                fullWidth
                displayEmpty
                value={filter.appointment_type}
                variant="outlined"
                className="filterSelect"
                onChange={(e) => handleSelectChange(e.target.value)}
                placeholder="Select Department"
              >
                <MenuItem value={""}>Select Department</MenuItem>
                <MenuItem value={"OPD"}>OPD</MenuItem>
                <MenuItem value={"IPD"}>IPD</MenuItem>
              </Select>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={12}>
              <Box>
                <Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="filterBtn downloadBtn"
                    onClick={downloadCsv}
                  >
                    Download CSV
                  </Button>
                  <IconButton
                    className="filterIcon"
                    onClick={() => {
                      setOpenFilter(true);
                    }}
                  >
                    <FilterList />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Phone No.</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Last Visit Date</TableCell>

                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              {isLoading ? (
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: "center",
                    padding: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </Grid>
              ) : (
                <TableBody>
                  {doctorPatientList.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} style={{ textAlign: "center" }}>
                        {/* <Typography variant="h5">No Data Found</Typography> */}
                        <Box mx={5} className="displayCenter">
                          <img src="images/no_data.png" alt="no_data" />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    doctorPatientList &&
                    doctorPatientList
                      .slice(startItem, endItem)
                      .map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell>{index + 1 || "--"}</TableCell>
                          <TableCell>
                            {(item.patient_name &&
                              item.patient_name
                                .split(" ")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ")) ||
                              "--"}
                          </TableCell>
                          <TableCell>+{item.phone_no || "--"}</TableCell>
                          <TableCell>{item.address || "--"}</TableCell>
                          <TableCell>
                            {(item.last_visit && formatDate(item.last_visit)) ||
                              "--"}
                          </TableCell>

                          <TableCell>
                            <Box className="displayCenter actionBtn">
                              <IconButton>
                                <Visibility
                                  onClick={() => handleView(item?.id)}
                                />
                              </IconButton>
                              <input
                                type="file"
                                id="file-input"
                                accept="image/*,.pdf"
                                onChange={(e) => {
                                  handleUpload(e?.target?.files[0], item?.id);
                                }}
                                style={{ display: "none" }}
                              />
                              <IconButton>
                                <AiOutlineUpload
                                  onClick={handleUploadButtonClick}
                                />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Grid>

        {totalPage > 1 && (
          <Grid item xs={12} align="right">
            <Pagination
              count={totalPage}
              shape="rounded"
              size="small"
              className="pagination"
              page={currentPage}
              onChange={(event, page) => setCurrentPage(page)}
            />
          </Grid>
        )}
        <Dialog
          open={openFilter}
          onClose={() => handleClose()}
          className={classes.dialog}
        >
          <DialogContent>
            <Box className="displaySpacebetween">
              <Typography variant="h2">Filter</Typography>
              <Close onClick={() => handleClose()} />
            </Box>
            <Divider />
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} className="datePicker">
                <Typography variant="h6">From</Typography>
                <KeyboardDatePicker
                  format="DD/MM/YYYY"
                  value={selectedFromDate}
                  onChange={handleFromDateChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} className="datePicker">
                <Typography variant="h6">To</Typography>
                <KeyboardDatePicker
                  format="DD/MM/YYYY"
                  value={selectedToDate}
                  onChange={handleToDateChange}
                />
              </Grid>
              <Grid item xs={12} className="datePicker">
                <Box mt={2} />
              </Grid>
              <Grid item xs={12} sm={6} align="center">
                <Button
                  variant="contained"
                  fullWidth
                  color="secondary"
                  onClick={() => handleClose()}
                >
                  Cancel{" "}
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} align="center">
                <Button
                  variant="contained"
                  className="filterBtn"
                  onClick={handleFilterClick}
                  fullWidth
                  color="primary"
                >
                  Apply{" "}
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>

        <Dialog
          open={viewOpen}
          onClose={() => handleCloseView()}
          className={classes.dialog}
        >
          <DialogContent>
            <Box className="displayEnd">
              <Close onClick={() => handleCloseView()} />
            </Box>

            <Box className={classes.mainBox}>
              <Typography variant="h2">Health Record</Typography>
              <Box className="titleBox">
                <Box className="line" />
                <Typography variant="h4">Latest Vitals</Typography>
              </Box>

              <Box className="subBox">
                <Box className="contentBox">
                  <Grid container spacing={2}>
                    <Grid item lg={3} md={3} sm={3} xs={6}>
                      <Typography variant="h6">Weight</Typography>{" "}
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={6}>
                      <Typography variant="h6" className="subtext2">
                        {healthData?.weight || "NA"}
                      </Typography>
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={6}>
                      <Typography variant="h6">Height</Typography>{" "}
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
                      <Typography variant="h6">Tempreture</Typography>{" "}
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
                      <Typography variant="h6">Gender</Typography>
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={6}>
                      {" "}
                      <Typography variant="h6" className="subtext2">
                        {healthData?.sex || "NA"}
                      </Typography>{" "}
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={6}>
                      {" "}
                      <Typography variant="h6">Blood Pressure</Typography>
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
                    {scanData && scanData.length > 0 ? (
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell className="record">Item</TableCell>
                            <TableCell
                              align="center"
                              className="record"
                            ></TableCell>
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
                        <img src="images/no_data.png" alt="no_data" />
                      </Box>
                    )}
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
                    {labData && labData.length > 0 ? (
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell align="left">Laboratory Name</TableCell>
                            <TableCell align="left"></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {labData.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row.lab_report_name}
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
                      <p>No lab data found</p>
                    )}
                  </TableContainer>
                </Box>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>

        {/* My Test dialog */}
        {/* <Dialog
          open={viewOpen}
          onClose={() => handleCloseView()}
          className={classes.dialog}
        >
          <DialogContent>
            <Box className="displaySpacebetween">
              <Typography variant="h2"></Typography>
              <Close onClick={() => handleCloseView()} />
            </Box>

            <Box className={classes.mainBox}>
            <img src="images/appointmentComfirm.png" alt="gps" style={{height:'150px',width:'180px'}} />
              <Box className="titleBox">
          
                <Typography variant="h4">Appointment  Accept Successfully!</Typography>
              </Box>
            </Box>
          </DialogContent>
        </Dialog> */}

        {/* My test modal 2 */}
        {/* <Dialog
          open={viewOpen}
          onClose={() => handleCloseView()}
          className={classes.dialog}
        >
          <DialogContent>
            <Box className="displaySpacebetween">
              <Typography variant="h2"></Typography>
              <Close onClick={() => handleCloseView()} />
            </Box>

            <Box className={classes.mainBox}>
              <img
                src="images/decline.png"
                alt="gps"
                style={{ height: "70px", width: "70px" }}
              />
              <Box className="titleBox">
                <Typography variant="h4">Decline Appointment!</Typography>
              </Box>
              <Typography variant="body2">
                Are you  sure you want to decline request?
              </Typography>
              <Box className="" style={{ width: "100%" }}>
                <Typography variant="body2">
                  Please Choose A Valid Reason
                </Typography>
                <FormControl fullWidth variant="outlined">
                  <Select
                    fullWidth
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      getContentAnchorEl: null,
                    }}
                  >
                    <MenuItem value="Reason 1">Reason1</MenuItem>
                    <MenuItem value="Reason 2">Reason 2</MenuItem>
                    <MenuItem value="Reason 3">Reason 3</MenuItem>
                  </Select>
                
                </FormControl>
              </Box>
              <Box className="button1" style={{display:"flex", gap:'20px', width:"100%"}}>
                 
                  <Button
                  fullWidth
                    variant="contained"
                    color="secondary"
                    className=""
                    onClick={() => history.push("/patient-dashboard")}
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
        </Dialog> */}
      </Grid>
    </div>
  );
}

export default PatientList;
