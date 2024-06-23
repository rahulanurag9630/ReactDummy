import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import ScrollAnimation from "react-animate-on-scroll";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  LeftBox: {
    border: "4px solid #681E65",
    borderLeft: "none",
    borderRadius: "0 250px 0 0 ",
    padding: "62px 0px 62px 100px",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0 100px 0 0 ",
      padding: "62px 15px 62px 15px",
    },

    "& h2": {
      fontWeight: 300,
      fontSize: "42px",
      color: "rgba(22, 30, 41, 1)",
      marginBottom: "7px",
      lineHeight: "57.12px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
    "& h2:nth-of-type(1)": {
      color: "#772377",
      fontWeight: "600",
    },
    "& h5": {
      color: "rgba(8, 5, 21, 0.60)",
      fontWeight: 400,
      margin: "22px 0px 10px 0px",
    },
    "& button": {
      // borderRadius: "50px",
      // fontWeight: 400,
      // fontSize: "20px",
      // padding: "19px 30px",
    },
    "& button:nth-of-type(1)": {
      marginRight: "16px",
    },
    // "& button:nth-of-type(2)": {
    //   border: "1px solid #772377",
    //   color: theme.palette.primary.main,
    // },
  },
  absoluteBox: {
    position: "absolute",
    bottom: "17%",
    right: 0,
    width: "50%",
    height: "223px",
    background: "rgba(104, 30, 101, 0.15)",
    borderRadius: "300px 0px 0px 32px",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0px",
      width: "100%",
    },
  },
  mainContainer: {
    padding: "0 !important",
    position: "relative",
    marginTop: "100px",
    marginBottom: "100px",
  },
  buttonBox: {
    "& button": {
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        margin: "10px 0px",
      },
    },
  },
}));
const Optimize = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Grid container className={classes.mainContainer}>
      <Grid item xs={12} sm={9}>
        <Box className={classes.LeftBox}>
          <ScrollAnimation animateIn="slideInLeft">
            <Typography variant="h2">Optimize and automate</Typography>
            <Typography variant="h2">
              Your patients overall Health
              <br /> care experiences
            </Typography>
          </ScrollAnimation>

          <Box mt={5} className={classes.buttonBox}>
            <Button
              variant="contained"
              color="Primary"
              onClick={() => history.push("/login")}
            >
              Let's talk
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => history.push("/sign-up")}
            >
              Register Now
            </Button>
          </Box>
        </Box>
      </Grid>
      <div className={classes.absoluteBox}></div>
    </Grid>
  );
};

export default Optimize;
