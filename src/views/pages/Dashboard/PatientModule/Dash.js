import {
  Box,
  Grid,
  Typography,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ApiConfig } from "src/config/apiConfig";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  mainDashBox: {
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    "& h2": {
      color: "#161E29",
      fontFamily: "Calistoga",
      fontStyle: "normal",
      fontWeight: "500",
    },
    "&.MuiOutlinedInput-root": {
      height: "48px",
      position: "relative",
      background: "#ffffff",
      borderRadius: "50px",
    },
    "& .mainBox": {
      background: "#FFF",
      borderRadius: "15px",
      width: "100%",
      padding: "20px 0",
      display: "flex",
      flexDirection: "column",
      gap: "25px",
      justifyContent: "center",
      alignItems: "center",
      "& h6": {
        color: "rgba(0, 0, 0, 0.60)",
        fontFamily: "Outfit",
      },
    },

    "& .subBox": {
      display: "flex",
      gap: "10px",
    },
    "& .gridBox": {
      display: "flex",
      gap: "10px",
      background: "#FFF",
      borderRadius: "15px",
      width: "100%",
      padding: "20px 0",
      cursor: "pointer",
    },
    "& .space": {
      paddingLeft: "15px",
      flexDirection: "column",
      display: "flex",
      alignItems: "start",
      justifyContent: "center",
      gap: "17px",
      "& h3": {
        fontSize: "32px",
        fontWeight: "700",
      },
    },
  },
}));

const data = [
  {
    image: "./images/upcomingAppoinment.png",
    title: "Upcoming Appointment",
    value: "03",
  },
  {
    image: "./images/totalPlaceOrder.png",
    title: "Total Placed Orders",
    value: "65",
  },
  {
    image: "./images/request.png",
    title: "Request Policies",
    value: "21",
  },
  {
    image: "./images/labs.png",
    title: "No. of Lab Reports",
    value: "23",
  },
];
export default function Dash() {
  const classes = useStyles();
  const history = useHistory();
  const [patientList, setPatientList] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const fetchDashboardDetail = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.patientDashboard,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setIsLoading(true);
      if (res.data?.responseCode === 200) {
        console.log(res?.data, "dataaaaa");
        setIsLoading(false);
      
        setPatientList(res?.data?.requestedData);
        console.log(res?.data?.requestedData, "resssssssssss");
      } else {
        setIsLoading(false);
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
    fetchDashboardDetail();
  }, []);
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
    )} ${year} | ${formatHour(hour)}:${minute} ${getMeridiem(hour)}`;

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

  const navigateToRoute = (route) => {
    history.push(route);
  };
  return (
    <Box className={classes.mainDashBox}>
      <Typography variant="h2">Dashboard</Typography>
      <Box class="mainBox">
        <img src="./images/report.png" alt="" />
        <Typography variant="h5"> Last Updated Health Report</Typography>
        <Box className="subBox">
          <Typography variant="h6">
            {patientList?.health_record_update
              ? patientList?.last_health_record?.last_updated_date
                ? formatDate(patientList.last_health_record.last_updated_date)
                : "----"
              : "---"}
          </Typography>
          {/* <Typography variant="h6">|</Typography>
          <Typography variant="h6"> 13:34 PM</Typography> */}
        </Box>
      </Box>
      {/* <Grid container spacing={4}>
        {data.map((item, index) => (
          <Grid item lg={6} md={6} sm={6} xs={12} key={index}>
            <Box className="gridBox">
              <Box className="space">
                <img src={item.image} alt="" style={{ width: "100%" }} />
              </Box>
              <Box className="space">
                <Typography variant="h5">{item.title}</Typography>
                <Typography variant="h3">{item.value}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid> */}
      <Grid container spacing={4}>
        {[
          {
            title: "Upcoming Appointment",
            imageSrc: "./images/upcomingAppoinment.png",
            count: patientList?.appointment_count || 0,
            route: "/appointment",
          },
          {
            title: "Total Placed Orders",
            imageSrc: "./images/totalPlaceOrder.png",
            count: patientList?.placed_order_count || 0,
            route: "/myorder",
          },
          {
            title: "Request Policies",
            imageSrc: "./images/request.png",
            count: patientList?.requested_policies || 0,
            route: "/requestpolicy",
          },
          {
            title: "No. of Lab Reports",
            imageSrc: "./images/labs.png",
            count: patientList?.lab_report_count || 0,
            route: "/labreport",
          },
        ].map((stat, index) => (
          <Grid
            key={index}
            item
            lg={6}
            md={6}
            sm={6}
            xs={12}
            onClick={() => navigateToRoute(stat.route)}
          >
            <Box className="gridBox">
              <Box className="space">
                <img src={stat.imageSrc} alt="" style={{ width: "100%" }} />
              </Box>
              <Box className="space">
                <Typography variant="h5">{stat.title}</Typography>
                <Typography variant="h3">{stat.count}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
