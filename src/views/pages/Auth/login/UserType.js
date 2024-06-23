import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Paper,
  FormHelperText,
  Divider,
  Container,
  Grid,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { HiEye, HiEyeOff, HiOutlineMail } from "react-icons/hi";
import { Form, Formik } from "formik";
import * as yep from "yup";
import { CgKey } from "react-icons/cg";

const useStyles = makeStyles((theme) => ({
  loginBox: {
    height: "initial",
    margin: "15px auto",
    maxHeight: "100%",
    maxWidth: "670px",
    width: "100%",
    borderRadius: "10px",
    boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.16)",
    "& .paperBox": {
      display: "flex !important",
      flexDirection: "column !important",
      alignItems: "center !important",
      padding: "50px !important",
    },
    "& h3": {
      color: theme.palette.primary.dark,
      textAlign: "center",
    },
    "& p": {
      textAlign: "center",
      margin: "20px 0",
      color: theme.palette.text.secondary,
    },
    "& .typeBox": {
      maxWidth: "370px",
      width: "100%",
      marginBottom: "50px",
    },
    "& .img": {
      [theme.breakpoints.down("sm")]: {
        height: "68px",
      },
    },
    "& .userBox": {
      cursor: "pointer",
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      padding: "10px",
      border: "2px solid",
      borderColor: "transparent",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.25)",
      [theme.breakpoints.down("sm")]: {
        width: "68px",
        height: "68px",
      },
      "&:hover": {
        borderColor: theme.palette.primary.main,
      },
    },
    "& .userBoxBorder": {
      borderColor: theme.palette.primary.main,
    },
    "& h5": {
      marginTop: "15px",
    },
    "& .imgBox": {
      width: "100%",
      borderRadius: "50px",
    },
    "& button": {
      borderRadius: "10px",
      fontSize: "18px",
    },
  },
}));
function UserType() {
  const classes = useStyles();
  const history = useHistory();
  const [userType, setUserType] = useState("DOCTOR");
  const handleFormSubmit = async (values) => {
    userType === "DOCTOR"
      ? history.push("/doc-sign-up")
      : history.push("/sign-up");
  };
  const [tabs, setTabs] = useState("signup");
  return (
    //   <Box className={classes.loginMainBox}>
    <Container>
      <Box className={classes.loginBox}>
        <Paper elevation={2} className="paperBox">
          <Box className="typeBox">
            <Typography style={{ marginBottom: "32px" }} variant="h3">
              Select User Type
            </Typography>
            {/* <Typography variant="body2">
              Reference site information on its origins, as well as a random
              ipsum generator.
            </Typography> */}
            <Grid container>
              <Grid item xs={6} align="center">
                <Box
                  className={`userBox displayCenter ${
                    userType === "PATIENT" && "userBoxBorder"
                  }`}
                  onClick={() => {
                    setUserType("PATIENT");
                  }}
                >
                  <img src="images/patient.png" className="img" alt="img" />
                </Box>
                <Typography variant="h5">Patient</Typography>
              </Grid>
              <Grid item xs={6} align="center">
                <Box
                  className={`userBox displayCenter ${
                    userType === "DOCTOR" && "userBoxBorder"
                  }`}
                  onClick={() => {
                    setUserType("DOCTOR");
                  }}
                >
                  <img src="images/docType.png" className="img" alt="img" />
                </Box>
                <Typography variant="h5">Doctor</Typography>
              </Grid>
            </Grid>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              handleFormSubmit();
            }}
          >
            Continue
          </Button>
        </Paper>
      </Box>
    </Container>
    //   </Box>
  );
}

export default UserType;
