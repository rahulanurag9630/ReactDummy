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
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Pagination } from "@material-ui/lab";
import { AiOutlineDownload } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ApiConfig } from "src/config/apiConfig";
import toast from "react-hot-toast";
import { BorderColor, Visibility } from "@material-ui/icons";
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
    "& .mainBox": {
      padding: "10px 20px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
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
      padding: "0 40px",
    },
    "& .inputBox": {
      width: "100%",
    },
    "& .dateBox": {
      width: "20%",
      height: "18px",
      "@media(max-width:599px)": {
        width: "auto",
      },
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
      border: "1px solid",
      color: "#4D164F",
      padding: "5px",
      fontSize: "20px",
      borderRadius: "10px",
      cursor: "pointer",
      marginRight: "10px",
      BorderColor: "#4D164F",
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
      padding: "16 14px",
      [theme.breakpoints.up("sm")]: {
        minWidth: "150px",
        padding: "16px",
      },
    },
    "& .MuiTableCell-root:first-child": {
      // target first child
      minWidth: "30px",
    },

    "& .gridBox2": {
      display: "flex",
      gap: "5px",
      width: "50%",
      "@media(max-width:599px)": {
        width: "100%",
      },
    },
    "& .gridBox1": {
      display: "flex",
      gap: "20px",
      "@media(max-width:599px)": {
        flexDirection: "column",
      },
    },
    "& .gridButtonBox": {
      display: "flex",
      gap: "10px",
      justifyContent: "space-between",
      // flexWrap:"wrap"
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
function createData1(S_No, Lab, Horpital, Location, Appoinment, Action) {
  return { S_No, Lab, Horpital, Location, Appoinment, Action };
}

const LabReport = () => {
  const classes = useStyles();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [labList, setLabList] = useState([{}]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;
  const [totalPages, setTotalPage] = useState();
  const [paginationData, setPaginationData] = useState({
    page: 1,
    size: 10,
  });

  const history = useHistory();
  const rows1 = [
    createData1(
      1,
      "Redcliffe Labs",
      "ASF Hospital",
      "NH-19,  Delhi 110076",
      "14th Dec 2023, 13:30 PM",
      [<FaEye className="icon" />, <AiOutlineDownload className="icon" />]
    ),
    createData1(
      2,
      "Redcliffe Labs",
      "ASF Hospital",
      "NH-19,  Delhi 110076",
      "14th Dec 2023, 13:30 PM",
      [<FaEye className="icon" />, <AiOutlineDownload className="icon" />]
    ),
    createData1(
      3,
      "Redcliffe Labs",
      "ASF Hospital",
      "NH-19,  Delhi 110076",
      "14th Dec 2023, 13:30 PM",
      [<FaEye className="icon" />, <AiOutlineDownload className="icon" />]
    ),
    createData1(
      4,
      "Redcliffe Labs",
      "ASF Hospital",
      "NH-19,  Delhi 110076",
      "14th Dec 2023, 13:30 PM",
      [<FaEye className="icon" />, <AiOutlineDownload className="icon" />]
    ),
    createData1(
      5,
      "Redcliffe Labs",
      "ASF Hospital",
      "NH-19,  Delhi 110076",
      "14th Dec 2023, 13:30 PM",
      [<FaEye className="icon" />, <AiOutlineDownload className="icon" />]
    ),
    createData1(
      6,
      "Redcliffe Labs",
      "ASF Hospital",
      "NH-19,  Delhi 110076",
      "14th Dec 2023, 13:30 PM",
      [<FaEye className="icon" />, <AiOutlineDownload className="icon" />]
    ),
    createData1(
      7,
      "Redcliffe Labs",
      "ASF Hospital",
      "NH-19,  Delhi 110076",
      "14th Dec 2023, 13:30 PM",
      [<FaEye className="icon" />, <AiOutlineDownload className="icon" />]
    ),
    createData1(
      8,
      "Redcliffe Labs",
      "ASF Hospital",
      "NH-19,  Delhi 110076",
      "14th Dec 2023, 13:30 PM",
      [<FaEye className="icon" />, <AiOutlineDownload className="icon" />]
    ),
    createData1(
      9,
      "Redcliffe Labs",
      "ASF Hospital",
      "NH-19,  Delhi 110076",
      "14th Dec 2023, 13:30 PM",
      [<FaEye className="icon" />, <AiOutlineDownload className="icon" />]
    ),
    createData1(
      10,
      "Redcliffe Labs",
      "ASF Hospital",
      "NH-19,  Delhi 110076",
      "14th Dec 2023, 13:30 PM",
      [<FaEye className="icon" />, <AiOutlineDownload className="icon" />]
    ),
  ];
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
  const laboratoryList = async (page, size) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.laboratoryList,
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
        setIsLoading(false);
        console.log(res?.data, "dataaaaa");
        // // toast.success(res.data?.responseMessage);
        setLabList(res?.data?.responseData);
        setTotalPage(res?.data?.TotalPages);
        // setStatus((prevState) =>[
        //   ...prevState,
        //   ...res?.data?.responseData?.Status
        // ])
        console.log(res?.data?.responseData, "resssssssssss");
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

  useEffect(() => {
    laboratoryList();
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
        url: ApiConfig.laboratoryList,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          laboratory_name: searchQuery,
          from_date: selectedFromDate
            ? selectedFromDate.toISOString().split("T")[0]
            : null,
          to_date: selectedToDate
            ? selectedToDate.toISOString().split("T")[0]
            : null,
        },
      });

      if (res.data?.responseCode === 200) {
        console.log(res?.data.responseData, "Filtered data");
        // // toast.success(res.data?.responseMessage);
        setLabList(res?.data?.responseData);
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
    laboratoryList(page);
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
    laboratoryList();
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
        url: `${ApiConfig.downloadLabById}?report_id=${id}`,
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
      a.download = `lab${id}`;
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

  const handlePaginationChange = (event, value) => {
    laboratoryList(value, paginationData.size);
  };

  const viewHandler = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "GET",
        url: `${ApiConfig.viewlabById}?report_id=${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        responseType: "json",
      });

      console.log("Response:", res);

      if (res.status === 200) {
        const imageUrl = res.data?.responseData;

        if (imageUrl) {
          // toast.success("Lab Report retrieved successfully");
          window.open(imageUrl, "_blank");
        } else {
          toast.error("Lab Report not found in the response");
        }
      } else {
        toast.error("Failed to fetch Lab Report");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.responseMessage || "Something went wrong"
      );
    }
  };
  return (
    <Box className={classes.mainAppBox}>
      <Typography variant="h2">Lab Report</Typography>
      <Box class="subBox">
        <Box className="mainBox">
          <Grid container spacing={2}>
            <Grid item lg={7} md={7} sm={12} xs={12}>
              <Box className="gridBox1">
                <Box className="gridBox2">
                  <TextField
                    type="text"
                    variant="outlined"
                    placeholder="Search by Lab name"
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
                  disabled={!selectedFromDate}
                />
              </Box>
            </Grid>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <Box className="gridButtonBox">
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
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
                  {/* <TableCell className={classes.cell} align="left">
                    Laboratory Name
                  </TableCell> */}
                  <TableCell className={classes.cell} align="left">
                    Lab Name
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    Location
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    Received Date & Time
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                style={{
                  height: labList && labList.length > 0 ? "auto" : "50vh",
                }}
              >
                {labList && labList?.length > 0 ? (
                  labList?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      {/* <TableCell align="left">
                        {row?.lab_company_name || "NA"}
                      </TableCell> */}
                      <TableCell align="left">
                        {row?.hospital_name || "NA"}
                      </TableCell>
                      <TableCell align="left">
                        {row?.location || "NA"}
                      </TableCell>
                      <TableCell align="left">
                        {row?.created_date_time
                          ? new Date(row.created_date_time).toLocaleString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                              }
                            )
                          : "NA"}
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Visibility
                            className="icon"
                            onClick={() => viewHandler(row?.id)}
                          />

                          <AiOutlineDownload
                            className="icon"
                            onClick={() => downloadHandler(row?.id)}
                          />
                        </Box>
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
  );
};

export default LabReport;
