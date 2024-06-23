import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import SearchTextFields from "../../SearchTextFields";
import AppointMent from "../../AppointMent";
import { Pagination } from "@material-ui/lab";
import DoctorsNews from "../../DoctorsPage/DoctorsNews";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getApiHandler } from "../../../../../config/service";
import toast from "react-hot-toast";
import axios from "axios";
import { ApiConfig } from "../../../../../config/apiConfig";
const useStyles = makeStyles((theme) => ({
  MaxHospitalContainer: {
    margin: "0px 100px",
    [theme.breakpoints.down("lg")]: {
      margin: "0px 60px",
    },
    [theme.breakpoints.down("md")]: {
      margin: "0px 30px",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "0px 15px",
    },
    marginTop: "39px",
    "& .Hospitaltitle": {
      "& h2": {
        fontSize: "42px",
        color: theme.palette.primary.dark,
        fontWeight: 600,
        marginBottom: "45px",
        marginTop: "60px",
      },
    },
    "& .contactBox": {
      gap: "38px",
      alignItems: "start",
      flexWrap: "wrap",
      borderBottom: "1px solid rgba(8, 5, 21, 0.20)",
      "& > div": {
        gap: "10px",
        // alignItems: "start",
        "& p": {
          width: "100%",
          maxWidth: "284px",
          color: "rgba(8, 5, 21, 0.60)",
          fontSize: "16px",
        },
      },
    },
    "& .descBox": {
      "& h5": {
        color: theme.palette.primary.dark,
      },
      "& p": {
        color: theme.palette.text.secondary,
        marginTop: "8px",
      },
    },
    "& .descBtnBox": {
      gap: "20px",
      alignItems: "start",
      [theme.breakpoints.down("sm")]: {
        flexWrap: "wrap",
      },
      "& h5": {},
      "& .descBtnIn": {
        flexWrap: "wrap",
        gap: "15px",
        "& button": {
          borderRadius: "30px",
          border: `2px solid ${theme.palette.text.secondary}`,
          color: theme.palette.text.secondary,
          fontSize: "18px",
          fontWeight: 400,
          "&:hover": {
            backgroundColor: "#4D164F",
            border: "2px solid #4D164F",
            color: "#fff",
          },
        },
      },
    },
    "& .DocList": {
      "& h2": {
        fontSize: "35px",
        fontWeight: 600,
        color: theme.palette.primary.dark,
      },
    },
    "& .viewAllBoxService": {
      "& .pagination": {
        marginTop: "15px",
        width: "fit-content",
        "& button": {
          padding: "7px 14px",
          height: "auto",
          color: theme.palette.text.secondary,
        },
        "& .MuiPaginationItem-page.Mui-selected": {
          backgroundColor: theme.palette.primary.main,
          color: "white",
        },
      },
    },
  },
}));
const MaxHospital = () => {
  const location = useLocation();
  const [hospitalData, setHospitalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [specializations, setSpecialization] = useState([]);
  const [hospitalId, setHospitalId] = useState(null);
  const classes = useStyles();
  const userId = location.state?.id || location.state?.userId;
  console.log(userId, "locationnnnnnn");
  const descData = [
    {
      name: "Anaesthesiology",
    },
    {
      name: "Cosmetic & Plastic Surgery",
    },
    {
      name: "Dietetics and Clinical Nutrition",
    },
    {
      name: "Dermatology",
    },
    {
      name: "Anaesthesiology",
    },
  ];
  const [filter, setFilter] = useState({
    name: "",
    city: "",
  });
  const handleFilterChange = (Data) => {
    if(Data){
      setFilter({
        city: Data.city,
        name: Data.name,
        witlisted: false,
      })
    }
    
  
   
  }
  const getHospitalView = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${ApiConfig["hospital-view"]}/${userId}/`,
      });
      if (res.data?.responseCode == 200) {
        console.log(res?.data?.responseData, "dataaaaa");
        // // toast.success(res.data?.responseMessage);
        setHospitalData(res?.data?.responseData);
        setHospitalId(res?.data?.responseData?.id);
        console.log(res?.data?.responseData?.id, "id");
        setSpecialization(res?.data?.responseData?.specializations);
        return res.data;
      } else {
        // toast.error(res.data?.responseMessage || "Something went wrong");
        return null;
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.responseMessage || "Something went wrong"
      );
      setIsLoading(false);
      return null;
    }
  };

  useEffect(() => {
    getHospitalView();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page when component mounts
  }, []);
  return (
    <>
      {" "}
      <Box className={classes.MaxHospitalContainer}>
        <Box className="Hospitaltitle">
          <Typography variant="h2">
            {hospitalData?.hospital_name || "--"}
          </Typography>
        </Box>
        <Box className="displayStart contactBox" paddingBottom={5}>
          <Box className="displayStart">
            {/* <img src="images/ContactCall.png" alt="call" /> */}
            <img
              style={{ width: "30px" }}
              src="images/ContactCall.png"
              alt="call"
            />
            <Box className="contactinfoInChild">
              <Typography variant="body2">
                {hospitalData?.mobile_number || "--"}
              </Typography>
            </Box>
          </Box>
          <Box style={{ display: "flex", justifyContent: "start" }}>
            {/* <img src="images/ContactLocation.png" alt="location" /> */}
            <Box>
              <img
                style={{ width: "30px" }}
                src="images/ContactLocation.png"
                alt="location"
              />
            </Box>
            <Box className="contactinfoInChild">
              <Typography variant="body2">
                {hospitalData?.address || "--"}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box mt={2} className="descBox">
          <Typography variant="h5">Description:</Typography>
          <Typography variant="body2">
            {hospitalData?.about_hospital || "--"}
          </Typography>
        </Box>
        <Box
          className="displayStart descBtnBox"
          mt={4}
          mb={12}
          display={"flex"}
          flexDirection={"column  "}
        >
          <Box>
            <Typography variant="h5">Specialization:</Typography>
          </Box>
          <Box className="displayStart descBtnIn">
            {specializations && specializations.length > 0 ? (
              specializations.map((item) => (
                <Button key={item} variant="outlined">
                  {item.name}
                </Button>
              ))
            ) : (
              <Typography variant="body1" className="mt-3">
                No specialization found
              </Typography>
            )}
          </Box>
        </Box>

        <Box className="DocList" mb={7}>
          <Typography variant="h2">Doctor's List</Typography>
        </Box>
        <Box mb={10}>
          <SearchTextFields  filterChange= {handleFilterChange} />
        </Box>
        <Box>{hospitalId && <AppointMent hospitalId={hospitalId} filterData={filter} />}</Box>

        {/* <Box
          mt={4}
          mb={12}
          className={`viewAllBoxService `}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <Button variant="contained">View All</Button>
          <Pagination
            count={22}
            shape="rounded"
            size="small"
            className="pagination"
          />
        </Box> */}
      </Box>
      <Box>
        <DoctorsNews />
      </Box>
    </>
  );
};

export default MaxHospital;
