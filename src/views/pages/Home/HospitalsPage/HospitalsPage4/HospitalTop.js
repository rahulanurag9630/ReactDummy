import React,{useState} from "react";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  slideContainer: {
    position: "relative",
    backgroundImage: "url(images/HospitalBack.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    // padding: "50px 0px 0px 0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "431px",
    borderRadius: "38px",
    "& h2, & p": {
      color: "white",
      textAlign: "center",
    },
  },
  overlayBox: {
    // position: "absolute",
    // borderRadius: "100px",
    // top: "25%",
    // zIndex: 1,
    // width: "100%",
    // height: "100%",
    "& > div": {
      gap: "15px",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        padding: "0 10px",
      },
    },
    "& h5": {
      textAlign: "center",
      color: theme.palette.background.default,
      fontSize: "22px",
      letterSpacing: "5.06px",
      lineHeight: "30px",
    },
    "& h2": {
      fontFamily: "Calistoga",
      margin: "16px 0px 54px 0px",
    },
    "& h3": {
      fontSize: "32px",
      fontWeight: 400,
      color: theme.palette.background.default,
      textAlign: "center",
      width: "70%",
    },
    "& p": {
      fontFamily: "Calistoga",
    },
    "& .customTextField": {
      width: "100%",
      maxWidth: "500px",
      "& .MuiOutlinedInput-root": {
        borderRadius: "50px",
        background: "#FFF",
      },
      "& .MuiInputBase-input": {
        fontFamily: "Outfit",
        fontSize: "16px",
      },
    },
    "& button": {
      width: "160px",
      color: theme.palette.background.default,
      fontWeight: 400,
      padding: "15px 20px",
      borderRadius: "50px",
      background: "rgba(255, 255, 255, 0.10)",
      height: "49px",
      fontFamily: "Sora",
      fontSize: "19px",
      boxShadow: "none !important",
      "&:hover": {
        background: "transparent",
      },
      border: "1px solid rgba(255, 255, 255, 0.25)",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
  },
}));

const HospitalTop = ({handleProductName}) => {
  const classes = useStyles();
  const handleSearchChange = (value) => {
    handleProductName(value)
  }
  
  return (
    <Box pt={5}>
      <div className={classes.slideContainer}>
        <Box className={`${classes.overlayBox}`}>
          <Typography variant="h5">EXPLORE PRODUCTS</Typography>
          <Typography variant="h2">Buy Medicines And Essentials</Typography>
          <Box className="displayCenter">
            <TextField
              placeholder="Search product..."
              className={`customTextField `}
              variant="outlined"
              fullWidth
              onChange={(e)=>handleSearchChange(e.target.value)}
            />
            <Button variant="contained">Search</Button>
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default HospitalTop;
