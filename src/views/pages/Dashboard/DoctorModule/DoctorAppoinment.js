import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TextField,
  TableContainer,
  TableHead,
  CircularProgress,
  TableRow,
  Typography,
  makeStyles,
  FormControl,
  Tooltip,
} from "@material-ui/core";
import {
  Close,
  CloseOutlined,
  FilterList,
  Search,
  Visibility,
  BorderColor,
} from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import { KeyboardDatePicker } from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ApiConfig, mediaUrl } from "../../../../config/apiConfig";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlineUpload } from "react-icons/ai";
import toast from "react-hot-toast";
import { MdPreview } from "react-icons/md";
import { FiDownload } from "react-icons/fi";

const useStyle = makeStyles((theme) => ({
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
  dialog: {
    "& .MuiDialog-paper": {
      maxWidth: "500px !important",
      width: "100%",
    },
    "& .MuiDialogContent-root": {
      padding: "24px 0px",
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
  main: {
    "& .filter": {
      padding: "20px 10px 30px 0px",
      "& .MuiFormControl-marginNormal": {
        marginTop: "0",
        marginBottom: "0",
        background: "rgba(0, 0, 0, 0.05)",
        borderRadius: "50px",
        padding: "15px 20px",
        border: "1px solid rgba(0, 0, 0, 0.05)",
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
      // "& .datePicker": {
      //   width: "100%",
      //   "& .MuiFormControl-root": {
      //     borderRadius: "50px !important",
      //     width: "100%",
      //     background: "rgba(0, 0, 0, 0.05)",
      //   },
      //   "& .MuiInputBase-root": {
      //     padding: "16px 10px",
      //   },
      //   "& .MuiInput-underline:before": {
      //     borderBottom: "0px",
      //   },
      //   "& .MuiInput-underline:after": {
      //     borderBottom: "0px",
      //   },
      //   "& button": {
      //     padding: "0px",
      //     height: "auto ",
      //   },
      // },

      "& .dateBox": {
        "@media(min-width:600px)": {
          width: "88%",
        },
        "@media(min-width:786px)": {
          width: "auto",
        },
      },
    },
    "& .filterBtn": {
      height: "50px",
      borderRadius: "50px",
      padding: "0px 40px",
    },
    "& .downloadBtn": {
      width: "100%",
    },

    "& .tabContainer": {
      marginTop: "30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "self-end",
      [theme.breakpoints.down("md")]: {
        marginTop: "20px",
      },
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "10px",
      },
    },
    "& .tabFilter": {
      boxSizing: "border-box",
      background: "#fff",
      border: "1px solid #681E65",
      borderRadius: "50px",
      width: "25%",
      height: "60px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        width: "35%",
      },
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        alignSelf: "center",
      },
    },
    "& .customBtn": {
      width: "45%",
      color: "black",
      padding: "8px 16px",
      borderRadius: "50px",
    },
    "& .customBtn.active": {
      backgroundColor: "#4D164F",
      color: "#fff",
    },
    "& .MuiTableCell-root": {
      minWidth: "120px",
      padding: " 16 10px",
      [theme.breakpoints.up("sm")]: {
        minWidth: "150px",
        padding: " 16px 12px",
      },
    },
    "& .MuiTableCell-root:first-child": {
      minWidth: "70px",
      [theme.breakpoints.down("sm")]: {
        minWidth: "70px",
      },
    },
    "& .MuiTableCell-root:nth-child(6)": {
      minWidth: "60px",
      padding: "16px",
    },
    "& .MuiTableCell-root:nth-child(5)": {
      minWidth: "110px",
      [theme.breakpoints.up("sm")]: {
        minWidth: "140px",
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

    // dialog: {
    //   "& .MuiDialog-paper": {
    //     maxWidth: "500px !important",
    //     width: "100%",
    //     // padding: "15px",
    //   },
    //   "& .MuiDialogContent-root": {
    //     padding: "24px 24px",
    //   },
    //   "& h2": {
    //     width: "fit-content",
    //   },

    // },
    // "& .datePicker": {
    //   width: "100%",
    //   "& .MuiFormControl-root": {
    //     borderRadius: "10px ",
    //     width: "100%",
    //     background: "rgba(0, 0, 0, 0.05)",
    //   },

    //   "& .MuiInputBase-root": {
    //     padding: "16px 10px",
    //   },
    //   "& .MuiInput-underline:before": {
    //     borderBottom: "0px",
    //   },
    //   "& .MuiInput-underline:after": {
    //     borderBottom: "0px",
    //   },
    //   "& .MuiIconButton-root": {
    //     color: theme.palette.primary.main,
    //   },
    //   "& button": {
    //     padding: "0px",
    //     height: "auto ",
    //   },
    // },
    // "& hr": {
    //   margin: "10px 0",
    // },
    // },
  },
}));

const handleDownload = (url, filename) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function DoctorAppoinment() {
  const handleFromDateChange = (date) => {
    setSelectedFromDate(date);
  };

  const handleToDateChange = (date) => {
    setSelectedToDate(date);
  };
  const [filter, setFilter] = useState({
    search_letter: "",
    appointment_type: "",
  });
  const handleSelectChange = (value) => {
    setFilter({
      ...filter,
      appointment_type: value,
    });
  };

  const [labData, setLabData] = useState([{}]);
  const [scanData, setScanData] = useState([{}]);
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();
  const classes = useStyle();
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [appointmentList, setAppointmentList] = useState([{}]);
  const [viewappointment, setViewappointment] = useState([]);
  const [healthData, setHealthData] = useState([{}]);
  const [viewOpen, setViewOpen] = useState(false);
  // const [viewRequestPolicyOptions, setViewRequestPolicyOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [appointmentId, setAppointmentId] = useState();
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleClose = () => {
    setOpenFilter(false);
  };
  // const data = [
  //   {
  //     SrNo: "1",
  //     PatientName: "Mr. Sanjay",
  //     PhoneNo: "+91 78965-56787",
  //     Location: "NH-19,  Delhi 110076",
  //     Date: "14th Dec 2023, 13:30 PM",
  //     Status: "Confirmed",
  //   },
  //   {
  //     SrNo: "1",
  //     PatientName: "Mr. Sanjay",
  //     PhoneNo: "+91 78965-56787",
  //     Location: "NH-19,  Delhi 110076",
  //     Date: "14th Dec 2023, 13:30 PM",
  //     Status: "Confirmed",
  //   },
  //   {
  //     SrNo: "1",
  //     PatientName: "Mr. Sanjay",
  //     PhoneNo: "+91 78965-56787",
  //     Location: "NH-19,  Delhi 110076",
  //     Date: "14th Dec 2023, 13:30 PM",
  //     Status: "Confirmed",
  //   },
  //   {
  //     SrNo: "1",
  //     PatientName: "Mr. Sanjay",
  //     PhoneNo: "+91 78965-56787",
  //     Location: "NH-19,  Delhi 110076",
  //     Date: "14th Dec 2023, 13:30 PM",
  //     Status: "Confirmed",
  //   },
  //   {
  //     SrNo: "1",
  //     PatientName: "Mr. Sanjay",
  //     PhoneNo: "+91 78965-56787",
  //     Location: "NH-19,  Delhi 110076",
  //     Date: "14th Dec 2023, 13:30 PM",
  //     Status: "Confirmed",
  //   },
  //   {
  //     SrNo: "1",
  //     PatientName: "Mr. Sanjay",
  //     PhoneNo: "+91 78965-56787",
  //     Location: "NH-19,  Delhi 110076",
  //     Date: "14th Dec 2023, 13:30 PM",
  //     Status: "Confirmed",
  //   },
  //   {
  //     SrNo: "1",
  //     PatientName: "Mr. Sanjay",
  //     PhoneNo: "+91 78965-56787",
  //     Location: "NH-19,  Delhi 110076",
  //     Date: "14th Dec 2023, 13:30 PM",
  //     Status: "Confirmed",
  //   },
  //   {
  //     SrNo: "1",
  //     PatientName: "Mr. Sanjay",
  //     PhoneNo: "+91 78965-56787",
  //     Location: "NH-19,  Delhi 110076",
  //     Date: "14th Dec 2023, 13:30 PM",
  //     Status: "Confirmed",
  //   },
  //   {
  //     SrNo: "1",
  //     PatientName: "Mr. Sanjay",
  //     PhoneNo: "+91 78965-56787",
  //     Location: "NH-19,  Delhi 110076",
  //     Date: "14th Dec 2023, 13:30 PM",
  //     Status: "Confirmed",
  //   },
  //   {
  //     SrNo: "1",
  //     PatientName: "Mr. Sanjay",
  //     PhoneNo: "+91 78965-56787",
  //     Location: "NH-19,  Delhi 110076",
  //     Date: "14th Dec 2023, 13:30 PM",
  //     Status: "Confirmed",
  //   },
  // ];

  // For getting the appointment(OPD or IPD)
  const [paginationData, setPaginationData] = useState({
    page: 1,
    size: 10,
  });

  const [totalPage, setTotalPage] = useState();
  const handlePaginationChange = (event, value) => {
    setPaginationData((prevData) => ({
      ...prevData,
      page: value,
    }));
  };
  const getAllAppointments = async (filter, page, size) => {
    try {
      setIsLoading(true);
      console.log("AHEYE YE EGet all appoingtments");
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "GET",
        url: ApiConfig["appointments-opdIpd"],
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          ...filter,
          page,
          size,
          date_from: selectedFromDate
            ? selectedFromDate.toISOString().split("T")[0]
            : null,
          date_to: selectedToDate
            ? selectedToDate.toISOString().split("T")[0]
            : null,
        },
      });
      console.log("Api Resposnse::--{>", response);
      if (response && response?.data?.responseCode == 200) {
        console.log(response?.data?.responseData);

        setViewappointment(response?.data?.responseData);
        setPaginationData((prevData) => ({
          ...prevData,
          page,
        }));
        setTotalPage(response?.data?.totalPages);

        setIsLoading(false);
      } else {
        toast.error(
          response?.data?.responseMessage || "Failed to fetch options"
        );
      }
    } catch (err) {
      console.log("Error:", err);
      // toast.error(err?.response?.data?.responseMessage);
      setIsLoading(false);
    }
  };

  const handleFilterClick = async () => {
    getAllAppointments();
  };

  const handleCloseView = () => {
    setViewOpen(false);
  };

  const downloadCsv = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig["download-csv"],
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
        const filename = `patient-appointment-list_${day}-${month}-${year}_${hours}-${minutes}-${seconds}.csv`;

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

  const handleClearFilters = () => {
    setFilter({ ...filter, search_letter: "" });
    setSelectedFromDate(null);
    setSelectedToDate(null);
    setSearchQuery("");
  };
  const handleCancel = async () => {
    if (cancel === true) {
      // console.log(id, "handlee");
      const token = localStorage.getItem("token");
      try {
        const response = await axios({
          method: "POST",
          url: ApiConfig.handlecancelDoctorAppointment,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: {
            appointment_id: appointmentId,
          },
        });
        if (response.data?.responseCode === 200) {
          setCancelViewOpen(false);

          getAllAppointments();
        } else {
          toast.error(response?.data?.responseMessage);
          setCancelViewOpen(false);
        }
      } catch (err) {
        setCancelViewOpen(false);
      }
    }
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
            // checkbox: <Checkbox />,
            id: item?.id,
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
          };
        });
        setLabData(labRow);
        setIsLoading(false);
      } else {
        toast.error(
          response?.data?.ResponseMessage || "Failed to fetch options"
        );
      }
    } catch {}
  };

  const handleConfirm = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "post",
        url: ApiConfig.handleConfirmDoctorAppointment,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          appointment_id: id,
        },
      });
      if (response.data?.responseCode === 200) {
        setConfirmViewOpen(true);
        getAllAppointments();
      } else {
        toast.error(response?.data?.responseMessage);
      }
    } catch {}
  };
  const handleComplete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "post",
        url: ApiConfig.handleCompleteDoctorAppointment,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          appointment_id: id,
        },
      });
      if (response.data?.responseCode === 200) {
        setCompleteViewOpen(true);
        getAllAppointments();
      } else {
        toast.error(response?.data?.responseMessage);
      }
    } catch {}
  };

  useEffect(() => {
    getAllAppointments({ ...filter }, paginationData.page, paginationData.size);
  }, [
    filter,
    paginationData.page,
    paginationData.size,
    selectedFromDate,
    selectedToDate,
  ]);

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
          toast.success(response.data?.responseMessage);
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
  const handleUploadButtonClick = () => {
    document.getElementById("file-input").click();
  };

  const [activeTab, setActiveTab] = useState("OPD");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setFilter({ ...filter, appointment_type: tab });
  };

  const [confirmViewOpen, setConfirmViewOpen] = useState(false);
  const [completeViewOpen, setCompleteViewOpen] = useState(false);
  const handleConfirmCloseView = () => {
    setConfirmViewOpen(false);
  };
  const handleCompleteCloseView = () => {
    setCompleteViewOpen(false);
  };

  const [cancelViewOpen, setCancelViewOpen] = useState(false);
  const [cancel, setCancel] = useState(false);

  const handleCancel2 = (id) => {
    setCancel(true);
    setCancelViewOpen(true);
    setAppointmentId(id);
  };

  const handleCancelViewOpen = () => {
    setCancelViewOpen(false);
  };
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
    const [hour, minute] = time.split(":");

    const formattedDate = `${day}${getOrdinalSuffix(day)} ${month.slice(
      0,
      -1
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

  return (
    <div>
      <Box container className={classes.main}>
        <Grid item xs={12} className="displaySpacebetween">
          <Box className="displayStart">
            <Typography variant="h3">Appointment</Typography>
          </Box>
        </Grid>
        <Grid className="tabContainer">
          <Box className="tabFilter">
            <Button
              className={`customBtn ${activeTab === "OPD" ? "active" : ""}`}
              onClick={() => handleTabClick("OPD")}
            >
              OPD
            </Button>
            <Button
              className={`customBtn ${activeTab === "IPD" ? "active" : ""}`}
              onClick={() => handleTabClick("IPD")}
            >
              IPD
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              className="filterBtn downloadBtn"
              onClick={downloadCsv}
            >
              Download CSV
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} className="table">
          <Grid container className="filter" spacing={1}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Box className="displayStart">
                <TextField
                  fullWidth
                  placeholder="Search by patient name"
                  variant="outlined"
                  value={filter.search_letter}
                  onChange={(e) =>
                    setFilter({ ...filter, search_letter: e.target.value })
                  }
                />
                <IconButton className="searchBtn" onClick={handleFilterClick}>
                  <Search />
                </IconButton>
              </Box>
            </Grid>

            {/* <Grid item lg={4} md={4} sm={4} xs={12}>
              <Select
                fullWidth
                displayEmpty
                variant="outlined"
                className="filterSelect"
                // style={{ marginRight: "30px" }}
                placeholder="Select Department"
                value={filter.appointment_type}
                onChange={(e) =>
                  setFilter({ ...filter, appointment_type: e.target.value })
                }
              >
                <MenuItem value={""}>Select Department</MenuItem>
                <MenuItem value={"OPD"}>OPD</MenuItem>
                <MenuItem value={"IPD"}>IPD</MenuItem>
              </Select>
            </Grid>*/}

            <Grid item lg={2} md={2} sm={6} xs={6}>
              <Box sx={{ width: "100%" }}>
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
            <Grid item lg={2} md={2} sm={6} xs={6}>
              <Box sx={{ width: "100%" }}>
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
            <Grid item lg={2} md={2} sm={6} xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className="filterBtn"
                onClick={handleFilterClick}
              >
                Apply
              </Button>
            </Grid>
            <Grid item lg={2} md={2} sm={6} xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className="filterBtn"
                onClick={handleClearFilters}
              >
                Clear
              </Button>
            </Grid>
            {/*<Grid item lg={4} md={4} sm={4} xs={12}>
              <Box>
               {/* <Button
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
            </Grid>*/}
          </Grid>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.cell} align="left">
                    Sr. No.
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    Patient Name
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    Phone No.
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

              {isLoading ? (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <TableBody>
                  {viewappointment.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} style={{ textAlign: "center" }}>
                        {/* <Typography variant="h5">No Data Found</Typography> */}
                        <Box mx={5} className="displayCenter">
                          <img src="images/no_data.png" alt="no_data" />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    viewappointment.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{index + 1}</TableCell>
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
                        <TableCell>{item.phone_number || "--"}</TableCell>

                        <TableCell>
                          {(item.appointment_datetime &&
                            formatDate(item.appointment_datetime)) ||
                            "--"}
                        </TableCell>
                        <TableCell
                          style={{
                            color:
                              item.status === "Confirmed"
                                ? "#0000FF"
                                : item.status === "Completed"
                                ? "#008000"
                                : item.status === "Pending"
                                ? "#FFA500"
                                : item.status === "Cancelled"
                                ? "#FF0000"
                                : "inherit",
                          }}
                        >
                          {item.status}
                        </TableCell>
                        <TableCell>
                          <Box className="displayCenter actionBtn">
                            {item.status !== "Completed" &&
                              item.status !== "Cancelled" && (
                                <>
                                  <Tooltip title="View Report" arrow>
                                    <IconButton>
                                      <Visibility
                                        onClick={() =>
                                          handleView(item?.patient_id)
                                        }
                                      />
                                    </IconButton>
                                  </Tooltip>

                                  {item.status !== "Check-in" &&
                                    item.status !== "Confirmed" && (
                                      <Tooltip title="Accept Appointment" arrow>
                                        <IconButton>
                                          <IoMdCheckmarkCircleOutline
                                            onClick={() =>
                                              handleConfirm(item?.id)
                                            }
                                          />
                                        </IconButton>
                                      </Tooltip>
                                    )}
                                  {item.status == "Check-in" && (
                                    <Tooltip title="Check Up Completed" arrow>
                                      <IconButton>
                                        <IoMdCheckmarkCircleOutline
                                          onClick={() =>
                                            handleComplete(item?.id)
                                          }
                                        />
                                      </IconButton>
                                    </Tooltip>
                                  )}
                                  {item.status !== "Check-in" && (
                                    <Tooltip title="Cancel Appointment" arrow>
                                      <IconButton>
                                        <CloseOutlined
                                          title="Cancel"
                                          className="icon"
                                          onClick={() =>
                                            handleCancel2(item?.id)
                                          }
                                        />
                                      </IconButton>
                                    </Tooltip>
                                  )}
                                  <input
                                    type="file"
                                    id="file-input"
                                    accept="image/*,.pdf"
                                    onChange={(e) => {
                                      handleUpload(
                                        e?.target?.files[0],
                                        item?.patient_id
                                      );
                                    }}
                                    style={{ display: "none" }}
                                  />
                                  <Tooltip title="Upload Prescription" arrow>
                                    <IconButton
                                      onClick={() =>
                                        history.push("/prescriptions", {
                                          state: item,
                                        })
                                      }
                                    >
                                      <AiOutlineUpload
                                      // onClick={handleUploadButtonClick}
                                      // onClick={() =>
                                      //   history.push("/prescriptions", {
                                      //     state: item,
                                      //   })
                                      // }
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </>
                              )}

                            {item.status === "Cancelled" && (
                              <Tooltip title="View Report" arrow>
                                <IconButton>
                                  <Visibility
                                    onClick={() => handleView(item?.patient_id)}
                                  />
                                </IconButton>
                              </Tooltip>
                            )}

                            {item.status === "Completed" && (
                              <>
                                <Tooltip title="View Report" arrow>
                                  <IconButton>
                                    <Visibility
                                      onClick={() =>
                                        handleView(item?.patient_id)
                                      }
                                    />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title="View PDF" arrow>
                                  <IconButton>
                                    <MdPreview
                                      onClick={() => {
                                        //  alert(prescripton)
                                        window.open(
                                          item?.prescription?.prescription_file,
                                          "_self"
                                        );
                                      }}
                                    />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title="Download PDF" arrow>
                                  <IconButton>
                                    <FiDownload
                                      onClick={() => {
                                        handleDownload(
                                          item?.prescription?.prescription_file,
                                          "your-pdf-file.pdf"
                                        );
                                      }}
                                    />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
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
              page={paginationData.page}
              onChange={handlePaginationChange}
            />
          </Grid>
        )}
        <Dialog
          open={confirmViewOpen}
          onClose={() => handleConfirmCloseView()}
          className={classes.dialog}
        >
          <DialogContent>
            <Box className="displaySpacebetween">
              <Typography variant="h2"></Typography>
              <Close onClick={() => handleConfirmCloseView()} />
            </Box>

            <Box className={classes.mainBox}>
              <img
                src="images/appointmentComfirm.png"
                alt="gps"
                style={{ height: "150px", width: "180px" }}
              />
              <Box className="titleBox">
                <Typography variant="h4">
                  Appointment  Accept Successfully!
                </Typography>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
        <Dialog
          open={completeViewOpen}
          onClose={() => handleCompleteCloseView()}
          className={classes.dialog}
        >
          <DialogContent>
            <Box className="displaySpacebetween">
              <Typography variant="h2"></Typography>
              <Close onClick={() => handleCompleteCloseView()} />
            </Box>

            <Box className={classes.mainBox}>
              <img
                src="images/appointmentComfirm.png"
                alt="gps"
                style={{ height: "150px", width: "180px" }}
              />
              <Box className="titleBox">
                <Typography variant="h5">
                  Appointment Completed Successfully!
                </Typography>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>

        <Dialog
          open={viewOpen}
          onClose={() => handleCloseView()}
          className={classes.dialog}
        >
          <DialogContent>
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
                  <TableContainer>
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
                        {/* <img src="images/no_data.png" alt="no_data" /> */}
                        <Typography
                          variant="body2"
                          style={{ textAlign: "center" }}
                        >
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
                <Typography variant="h4">Lab Report</Typography>
              </Box>
              <Box className="subBox">
                <Box className="contentBox">
                  <TableContainer>
                    {labData && labData.length > 0 ? (
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>Item</TableCell>
                            {/* <TableCell align="left">Laboratory Name</TableCell> */}
                            <TableCell align="left"></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {labData.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell component="th" scope="row">
                                {row.lab_report_name}
                              </TableCell>
                              {/* <TableCell component="th" scope="row">
                                {row.lab_report_name}
                              </TableCell> */}
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
                      <Typography
                        style={{ textAlign: "center" }}
                        variant="body2"
                      >
                        No lab data found
                      </Typography>
                    )}
                  </TableContainer>
                </Box>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>

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
                  variant="outlined"
                  fullWidth
                  color="primary"
                  onClick={() => handleClose()}
                >
                  Cancel{" "}
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} align="center">
                <Button
                  variant="outlined"
                  fullWidth
                  color="primary"
                  onClick={handleFilterClick}
                >
                  Apply{" "}
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
        {/* klsdjfskljfkjkfjkdfjkdjkdfjdkdjfkjkdjfkdjfkjdkfjdkfjdkfjdkjdkfjdkfjkdjfdkfjdkfjdkjfkdjkdjkfjdkfjd */}
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
                <Typography variant="h4">Decline Appointment!</Typography>
              </Box>
              <Typography variant="body2">
                Are you  sure you want to decline request?
              </Typography>
              {/* <Box className="" style={{ width: "100%" }}>
                <Typography variant="body2">
                  Please Choose A Valid Reason
                </Typography> *
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
                   <FormHelperText
                            error
                            className="helperText"
                            style={{ margin: "0px 0px" }}
                          >
                          
                          </FormHelperText> 
                </FormControl> 
              </Box>*/}
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
      </Box>
    </div>
  );
}

export default DoctorAppoinment;
