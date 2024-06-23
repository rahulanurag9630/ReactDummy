import { getApiHandler } from "../../../config/service";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ApiConfig } from "src/config/apiConfig";

const useStyles = makeStyles((theme) => ({
  aboutParent: {
    // marginTop: "56px",
    // marginBottom: "72px",
    margin: "56px 100px 72px 100px",
    [theme.breakpoints.down("lg")]: {
      margin: "56px 60px",
    },
    [theme.breakpoints.down("md")]: {
      margin: "20px 30px",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "10px 15px",
    },
    "& h2": {
      fontFamily: "Calistoga",
      color: theme.palette.text.primary,
      marginBottom: "30px",
      // marginLeft: "50px",
    },
    "& .columnFirst": {
      "& img": {
        position: "relative",
        top: "0px",
        height: "auto",
        width: "100%",
        backgroundSize: "cover !important",
        backgroundRepeat: "no-repeat !important",
        objectFit: "cover !important",
      },
    },
    "& .aboutRightParent": {
      width: "100%",
      "& > div": {
        "& h5": {
          color: "#5E1A5D",
          fontFamily: "Roboto",
          fontWeight: 600,
          marginBottom: "15px",
        },
        "& p": {
          color: "rgba(32, 33, 35, 0.87)",
          fontWeight: 300,
        },
      },
    },
    "& .description": {
      fontWeight: 400,
      marginBottom: "15px",
      fontFamily: "Outfit",
      fontSize: " 16px",
      lineHeight: "24px",
      letterSpacing: " 0em",
      textAlign: "justify",
      color: "#00000099",
      "& h1": {
        color: "#080515",
      },
    },
  },
}));

const About = () => {
  const classes = useStyles();
  const [aboutUs, setAboutUs] = useState([{}]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  useEffect(() => {
    getAboutUs();
  }, []);

  const aboutData = [
    {
      title: "Lorem Ipsum",
      description:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningfulcontent. Lorem ipsum may be used as a placeholder before final  copy is available",
    },
    {
      title: "Lorem Ipsum",
      description:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningfulcontent. Lorem ipsum may be used as a placeholder before final  copy is available",
    },
    {
      title: "Lorem Ipsum",
      description:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningfulcontent. Lorem ipsum may be used as a placeholder before final  copy is available",
    },
  ];

  const getAboutUs = async () => {
    setIsDataLoading(true);
    try {
      const response = await axios({
        url: ApiConfig["About-Us"],
        method: "GET",
      });

      console.log(response, "ressssssssssssss");
      if (response?.data?.responseCode === 200) {
        setIsDataLoading(false);
        // // toast.success(response.responseMessage || "Data Found Successfully");
        console.log(response?.data?.responseBody[0]?.title, "asajsahsg");
        setAboutUs(response?.data?.responseBody[0]);
      }
    } catch (err) {
      console.log("Error:", err);
      // toast.error(err?.response?.responseMessage);
      setIsDataLoading(false);
    }
  };

  return (
    <Box>
      <Box className={classes.aboutParent}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={5}>
            <Box className="columnFirst">
              <Typography gutterBottom variant="h2">
                About Us
              </Typography>
              <img
                src="images/Family.png"
                alt="fam"
                width="100%"
                height="324px"
                style={{ objectFit: "none" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={7}>
            <Box className="aboutRightParent">
              {isDataLoading ? (
                <Grid container justifyContent="center" alignItems="center">
                  <CircularProgress />
                </Grid>
              ) : (
                <>
                  <Box mb={4}>
                    <Box
                      className="description"
                      dangerouslySetInnerHTML={{
                        __html: aboutUs?.text ? aboutUs?.text : "NA",
                      }}
                    ></Box>
                  </Box>
                </>
              )}

              {/* {isDataLoading ? (
              <Grid container justifyContent="center" alignItems="center">
                <CircularProgress />
              </Grid>
            ) : (
              <Box mb={4}>
                <Typography variant="h5">
                {aboutUs?.title ? aboutUs?.title : "NA"}
              </Typography>
                <Typography variant="body2">
                {aboutUs?.content ? aboutUs?.content : "NA"}
              </Typography> */}
              {/* <Box
                  // dangerouslySetInnerHTML={{
                  //   __html: aboutUs?.content ? aboutUs?.content : "NA",
                  // }} */}

              {/* </Box> */}
              {/* )} */}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default About;
