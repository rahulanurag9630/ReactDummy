import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import { Box } from "@material-ui/core";
import Footer from "../HomeLayout/Footer";
// import SettingsContext from "src/context/";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: "flex",
  //   height: "100%",
  //   overflow: "hidden",
  //   width: "100%",
  // },
  root: {
    // backgroundColor: "#eef4f8",
    // overflow: "hidden",
    position: "relative",
    // height: "100vh",
    display: "flex",
  },

  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    position: "relative",
    // backgroundColor: "#eef4f8",
    paddingTop: 70,
    minHeight: "calc(100vh - 75px)",
    [theme.breakpoints.up("lg")]: {
      // paddingLeft: 290,
    },
    "@media (max-width:767px)": {
      paddingTop: "70px !important",
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    background:'#F2F2F2',
    padding: "28px 25px 25px ",
    [theme.breakpoints.down("md")]: {
      padding: "25px 10px 10px ",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "10px 10px 10px ",
    },
  },
}));

const DashboardLayout = ({ children }) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  // const themeSeeting = useContext(SettingsContext);

  return (
    <>
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />   
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <Box className="orangeshadeBox1"></Box>
          <Box className="purpleBox1"></Box>
          <div className={classes.content} id="main-scroll">
            {children}
          </div>
        </div>
      </div>
    </div>
      <Footer/>
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default DashboardLayout;
