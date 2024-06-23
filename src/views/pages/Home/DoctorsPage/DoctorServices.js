import {
  Box,
  Button,
  Container,
  Dialog,
  Divider,
  Fab,
  Grid,
  TextField,
  Tooltip,
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Pagination, Rating } from "@material-ui/lab";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import AppointMent from "../AppointMent";
import DoctorList from "./DoctorList";
import SearchTextFields from "../SearchTextFields";

const useStyles = makeStyles((theme) => ({
  DoctorServicesContainer: {
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
    "& .serviceTitles": {
      "& h5": {
        textAlign: "center",
        marginBottom: "16px",
        color: theme.palette.primary.main,
        letterSpacing: "5.06px",
        fontSize: "22px",
      },
      "& h2": {
        textAlign: "center",
        marginBottom: "18px",
        fontFamily: "Calistoga",
        color: theme.palette.text.primary,
      },
      "& h6": {
        textAlign: "center",
        marginBottom: "60px",
        color: "rgba(8, 5, 21, 0.60)",
        width: "100%",
        // maxWidth: "764px",
      },
    },
    "& .textFieldBoxService": {
      "& .customTextField": {
        width: "100%",

        "& .MuiOutlinedInput-root": {
          borderRadius: "50px",
          background: "#F6F6F6",
        },
        "& .MuiInputBase-input": {
          fontFamily: "Outfit",
          fontSize: "16px",
        },
      },
      "& button": {
        borderRadius: "30px",
        border: "2px solid var(--Linear, #4D164F)",
        color: theme.palette.primary.main,
        fontSize: "20px",
        fontWeight: 400,
        height: "49px",
        padding: "19px 30px",
      },
    },
  },
  appointmentBoxService: {
    "& .insideappointmentBox": {
      border: "1.5px solid #DFDFDF",
      padding: "15px 15px 14px",
      borderRadius: "20px",
      "& .imageServiceBox": {
        "& img": {
          width: "100%",
          height: "295px",
        },
        "& .dialogImg": {
          height: "230px",
        },
      },
      "& .insideappointmentBoxRight": {
        paddingLeft: "20px",
        [theme.breakpoints.down("xs")]: {
          paddingLeft: "0px",
        },
        "& .insideappointBoxRightTop": {
          "& h4": {
            color: theme.palette.primary.dark,
          },
          "& svg": {
            color: theme.palette.primary.main,
          },
          "& .clearIcon": {
            color: "rgba(8, 5, 21, 0.40)",
          },
        },
        "& .professionTypo": {
          color: theme.palette.primary.main,
          margin: "18px 0 16px 0",
        },
        "& .professionTypoD": {
          color: theme.palette.primary.main,
          fontSize: "18px",
          margin: "18px 0 16px 0",
        },
        "& .serviceRatings": {
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginBottom: "22px",
          "& p": {
            color: "rgba(8, 5, 21, 0.60)",
          },
        },
        "& .serviceAddress": {
          "& .serviceAddressIn": {
            gap: "8px",
            marginBottom: "25px",
            "& p": {
              color: "rgba(8, 5, 21, 0.60)",
              width: "100%",
              maxWidth: "280px",
            },
            "& img": {
              alignSelf: "start",
            },
          },
        },
        "& .serviceAppBtn": {
          display: "flex",
          alignItems: "center",
          gap: "16px",
          "& .bookAppointBtn": {
            color: theme.palette.primary.main,
            fontSize: "20px ",
            background: "#fff",
            border: "2px solid var(--Linear, #4D164F)",
            height: "44px",
            borderRadius: "30px",
            boxShadow: "none !important",
            fontWeight: 400,
            width: "100%",
            [theme.breakpoints.down("xs")]: {
              fontSize: "12px",
            },
          },
        },
      },
      "& .aboutBox": {
        borderTop: `1px solid ${theme.palette.text.secondary}`,
        paddingTop: "20px",
        "& h5": {
          color: theme.palette.primary.dark,
          marginBottom: "9px",
        },
        "& p": {
          color: theme.palette.text.secondary,
          marginBottom: "28px",
        },
        "& .CancelBtn, & .AppointBtn": {
          height: "52px",
          borderRadius: "30px",
        },
        "& .CancelBtn": {
          border: `2px solid ${theme.palette.text.secondary}`,
          color: theme.palette.text.secondary,
        },
        "& .AppointBtn": {
          border: `2px solid ${theme.palette.primary.main}`,
          color: theme.palette.primary.main,
        },
      },
    },
  },
  DialogParent: {
    "& .MuiDialog-paperFullWidth": {
      overflow: "scroll",
      width: "100%",
      maxWidth: "811px !important",
    },
  },
  viewAllBoxService: {
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
}));
const DoctorServices = () => {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState(2);
  const [appointOpen, setAppointOpen] = useState(false);
  const [diagData, setDialogData] = useState();

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.DoctorServicesContainer}>
      <Box className="serviceTitles displayColumnCenter">
        <Typography variant="h5">SERVICES</Typography>
        <Typography variant="h2">Get Service & Consultation</Typography>
        <Container>
          <Typography variant="h6">
            Specialized medical services tailored to address specific health
            needs, such as cardiology, dermatology, orthopedics, neurology, and
            pediatrics, delivered by expert physicians and healthcare
            professionals.
          </Typography>
        </Container>
      </Box>
      {/* <SearchTextFields onSearch={handleSearch} /> */}
      <DoctorList />
    </Box>
  );
};

export default DoctorServices;
