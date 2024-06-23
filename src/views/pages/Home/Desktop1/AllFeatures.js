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
  Container,
} from "@material-ui/core";
import axios from "axios";
import { ApiConfig, mediaUrl } from "../../../../config/apiConfig";

const useStyles = makeStyles((theme) => ({
  mainFeactures: {
    "& .featuresDesktop1": {
      textAlign: "center",
      // gap: "32px",
      // display: "flex",
      // flexDirection: "column",
      // justifyContent: "center",
      // [theme.breakpoints.down("sm")]: {
      //   paddingLeft: " 3%",
    },
    "& h5": {
      color: theme.palette.primary.main,
      fontSize: "22px",
      letterSpacing: "5px",
    },
    "& h2": {
      color: theme.palette.text.primary,
      fontFamily: "Calistoga",
      margin: "16px 0px",
    },
    "& h6": {
      color: "rgba(8, 5, 21, 0.60)",
      // width: "77%",
      marginBottom: "18px",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    "& button": {
      borderRadius: "30px",
    },
  },

  GridContainer: {
    // marginTop: "100px",
    backgroundColor: "#FAFAFA",
    padding: "100px 50px",
    [theme.breakpoints.only("md")]: {
      padding: "100px 30px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "100px 15px",
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
      height: "100%",
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
      },
      "& p": {
        // height: "100px",
        color: "#161E2999",
        marginTop: "16px",
        lineHeight: "21px",
        fontFamily: "Outfit",
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

const AllFeatures = () => {
  const classes = useStyles();
  const [featureList, setFeatureList] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const largeScreenUp = useMediaQuery((theme: Theme) =>
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
          res?.data?.ResponseBody?.length > 6
            ? res?.data?.ResponseBody?.slice(0, 6)
            : res?.data?.ResponseBody
        );
      }
    } catch (error) {
      setIsDataLoading(false);
      console.log(error);
    }
  };

  return (
    <Box className={classes.mainFeactures}>
      <Container>
        <Box mt={4} mb={6} className="featuresDesktop1">
          <Typography variant="h5">FEATURES</Typography>
          <Typography variant="h2">Key Features & Benefits</Typography>
          <Box>
            <Typography variant="h6">
              Lorem Ipsum is simply dummy text of the Ipsum has been the
              industry's standard it a dummy text ever since the 1500s.
            </Typography>
          </Box>
        </Box>
      </Container>

      <Grid container className={classes.GridContainer}>
        <Grid item sm={12}>
          <Grid container spacing={3}>
            {isDataLoading ? (
              <Grid container justifyContent="center" alignItems="center">
                <CircularProgress />
              </Grid>
            ) : (
              featureList.map((item, index) => {
                const textLength = extraSmallScreen
                  ? 250
                  : smallScreen
                  ? 250
                  : mediumScreen
                  ? 100
                  : largeScreen
                  ? 150
                  : 250;
                const slicedDescription =
                  item.description.length > 1000000
                    ? `${item.description.slice(0, textLength)}...`
                    : item.description;

                return (
                  <Grid
                    item
                    key={index}
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ marginBottom: "43px" }}
                  >
                    <Box className="featurRightBox displayColumnCenter">
                      <Box
                        className="featursCard"
                        component="img"
                        src={`${item.image}`}
                        alt="Feature"
                      />
                      {/* <Typography variant="h4">
                        {item.name.length > 20
                          ? `${item.name.slice(0, 20)}...`
                          : item.name}
                      </Typography> */}
                      <Typography variant="h4">{item?.name || "--"}</Typography>
                      <Typography variant="body2">
                        {item?.description}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AllFeatures;
