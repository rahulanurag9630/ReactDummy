import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  makeStyles,
  useMediaQuery,
  Theme,
} from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ApiConfig, mediaUrl } from "../../../../config/apiConfig";

const useStyles = makeStyles((theme) => ({
  GridContainer: {
    marginTop: "100px",
    backgroundColor: "#FAFAFA",
    padding: "100px 100px",
    [theme.breakpoints.down("lg")]: {
      marginTop: "100px",
      padding: "70px 60px",
    },
    [theme.breakpoints.only("md")]: {
      marginTop: "50px",
      padding: "40px 30px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "30px 15px",
    },
    "& .featuresDesktop1": {
      gap: "32px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        paddingLeft: " 3%",
      },
      "& h5": {
        color: theme.palette.primary.main,
        fontSize: "22px",
        letterSpacing: "5px",
      },
      "& h2": {
        color: theme.palette.text.primary,
        fontFamily: "Calistoga",
      },
      "& h6": {
        color: "rgba(8, 5, 21, 0.60)",
        width: "77%",
        marginBottom: "18px",
        [theme.breakpoints.down("sm")]: {
          width: "100%",
        },
      },
      "& button": {
        borderRadius: "30px",
      },
    },

    "& .featurRightBox": {
      height: "270px",
      // maxHeight: "270px",
      borderRadius: "15px",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      border: " 1.5px solid #E4E4E4",
      gap: "15px",
      padding: "20px",
      alignItems: "start",
      [theme.breakpoints.down("sm")]: {
        // padding: "10px 15px 20px 15px",
        // maxHeight: "226px",
      },
      "& h4": {
        marginTop: "16px",
        overflow: "hidden",
        height: "30px",
      },
      "& p": {
        height: "106px",
        fontSize: "15px",
        color: "#161E2999",
        marginTop: "14px",
        lineHeight: "21px",
        fontFamily: "Outfit",
        fontWeight: "300",
        overflow: "hidden",
      },
      "& .featursCard": {
        height: "80px",
        width: "80px",
        borderRadius: "50%",
        objectFit: "cover",

        "& img": {},
      },
    },
  },
}));

const Features = () => {
  const classes = useStyles();
  const history = useHistory();
  const [featureList, setFeatureList] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const extraLargeScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("lg")
  );
  const largeScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("lg")
  );
  const mediumScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  const smallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const extraSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("xs")
  );

  useEffect(() => {
    getFeatureList();
  }, []);

  const getFeatureList = async () => {
    setIsDataLoading(true);
    try {
      const res = await axios({
        url: ApiConfig["key-features"],
        method: "GET",
      });
      setIsDataLoading(false);
      if (res?.data?.ResponseCode == 200) {
        setFeatureList(
          res?.data?.ResponseBody?.length > 4
            ? res?.data?.ResponseBody?.slice(0, 4)
            : res?.data?.ResponseBody
        );
      }
    } catch (error) {
      setIsDataLoading(false);
      console.log(error);
    }
  };

  return (
    <Grid container className={classes.GridContainer}>
      <Grid item xs={12} sm={12} md={5}>
        <Box mt={4} mb={6} className="featuresDesktop1">
          <Typography variant="h5">FEATURES</Typography>
          <Typography variant="h2">Key Features & Benefits</Typography>
          <Box>
            <Typography variant="h6">
              Welcome, everyone, and thank you for joining us today. It is a
              privilege to share with you the exciting advancements and future
              plans for our hospital. Our primary focus remains on providing
              exemplary patient care, and today,and future initiatives designed
              to elevate the healthcare experience for our patients and
              community.
            </Typography>
            <Typography variant="h6">
              Over the past year, our hospital has implemented several
              patient-centered care initiatives aimed at improving patient
              satisfaction and outcomes.
            </Typography>
            <Typography variant="h6">
              We have invested heavily in cutting-edge technology to enhance
              patient care. Our hospital recently adopted an advanced Electronic
              Health Record (EHR) system, allowing seamless access to patient
              information for healthcare providers.
            </Typography>
          </Box>

          <Box>
            <Button
              variant="contained"
              color="primary"
              className="displayStart"
              onClick={() => history.push("/all-features")}
            >
              View All
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Grid container spacing={3}>
          {isDataLoading
            ? null
            : // <>
              //   {/* <Grid container justifyContent="center" alignItems="center">
              //     <CircularProgress />
              //   </Grid> */}

              // </>
              featureList.map((item, index) => (
                <Grid item key={index} xs={12} sm={6}>
                  <Box className="featurRightBox displayColumnCenter">
                    <Box
                      className="featursCard"
                      component={"img"}
                      src={item?.image || "/images/key_features.png"}
                    />
                    <Typography variant="h4">
                      {item?.name ? item?.name : "--"}
                      {/* {item?.name?.length > 23
                      ? item?.name?.slice(0, 23) + "..."
                      : item?.name} */}
                    </Typography>
                    <Typography variant="body2">
                      {item?.description ? item?.description : "--"}
                    </Typography>
                    {/* <Typography variant="body2">
                    {extraSmallScreen
                      ? item?.description?.length > 250
                        ? item?.description?.slice(0, 250) + "..."
                        : item?.description
                      : smallScreen
                      ? item?.description?.length > 100
                        ? item?.description?.slice(0, 100) + "..."
                        : item?.description
                      : mediumScreen
                      ? item?.description?.length > 105
                        ? item?.description?.slice(0, 105) + "..."
                        : item?.description
                      : largeScreen
                      ? item?.description?.length > 133
                        ? item?.description?.slice(0, 133) + "..."
                        : item?.description
                      : extraLargeScreen
                      ? item?.description?.length > 300
                        ? item?.description?.slice(0, 300) + "..."
                        : item?.description
                      : null}
                  </Typography> */}
                  </Box>
                </Grid>
              ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Features;
