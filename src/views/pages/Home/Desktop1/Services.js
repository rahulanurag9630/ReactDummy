import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import { ApiConfig, mediaUrl, url } from "../../../../config/apiConfig";
import TruncatedDescription from "src/component/truncatedDescription";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  spacingContainer: {
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
  },
  servicesDesktop1CardBox: {
    height: "100%",
    // minHeight: "320px",
    textAlign: "center",
    // gap: "20px",
    border: "0.5px solid #E4E4E4",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    // transition: "transform 0.2s ease",
    // "&:hover": {
    //   transform: "scale(1.1)",
    // },
    [theme.breakpoints.down("md")]: {
      height: "90%",
    },
    "& h5": {
      color: theme.palette.text.primary,
      textAlign: "center",
      margin: "16px 0px",
      fontSize: "21px",
    },
    "& p": {
      color: "#08051599",
      fontSize: "14px",
      margin: "0px",
      textAlign: "center",
      width: "100%",
      fontFamily: "Outfit",
      fontWeight: "300",
      [theme.breakpoints.down("sm")]: {
        fontSize: "12px",
      },
    },
    "& h6": {
      color: theme.palette.primary.main,
    },
    // "& > div": {
    //   display: "flex",
    //   gap: "9px",
    // },
  },

  imgBox: {
    width: "77px",
    height: "77px",
    textAlign: "center",
    borderRadius: "50%",
    border: "1px solid transparent",
    background: "rgba(104, 30, 101, 0.15)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  heroSectionImg: {
    textAlign: "center",
    position: "relative",
    top: "0px",
    width: "50px",
    height: "50px",
    backgroundSize: "cover !important",
    backgroundRepeat: "no-repeat !important",
    objectFit: "fill !important",
    borderRadius: "50%",
    "& h5": {
      height: "50px",
      margin: "24px 0px",
    },
    "& .descriptText": {
      height: "100px",
      "& p": {
        overflow: "hidden",
      },
    },
  },
  viewAll: {
    display: "flex",
    justifyContent: "center",
  },
  // serviceContent: {
  //   "& h5": {
  //     color: "#681E65",
  //     marginBottom: "16px",
  //     textAlign: "center",
  //     textTransform: "uppercase",
  //   },
  //   "& h2": {
  //     color: "#161E29",
  //     marginBottom: "16px",
  //     fontWeight: "400",
  //     fontFamily: "Calistoga",
  //     textAlign: "center",
  //   },
  //   "& p": {
  //     color: "#08051599",
  //     marginBottom: "32px",
  //     textAlign: "center",
  //   },
  // },
}));

const Services = () => {
  const classes = useStyles();
  const history = useHistory();
  const [infraList, setInfraList] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    getKeyFeatureData();
  }, []);

  const getKeyFeatureData = async () => {
    setIsDataLoading(true);
    try {
      const res = await axios({
        url: ApiConfig["infrastructure-list"],
        method: "GET",
      });
      setIsDataLoading(false);
      if (res?.data?.ResponseCode == 200) {
        let resData = res?.data?.ResponseBody;
        setInfraList(resData || []);
      }
    } catch (error) {
      setIsDataLoading(false);
      console.log(error);
    }
  };
  const handleLearnMore = (itemName) => {
    if (itemName.includes("Doctor")) {
      history.push("/doctors-page");
    } else if (itemName.includes("Laboratories")) {
      history.push("/laboratory-listing");
    } else if (itemName.includes("Insurance")) {
      history.push("/insurance-policy");
    } else if (itemName.includes("Pharmaceutical")) {
      history.push("/medical-product");
    }
  };

  return (
    <>
      {/* <Box
        mt={4}
        className={`displayColumnCenter ${classes.serviceDesktop1}`}
      ></Box> */}
      <Box className={classes.spacingContainer}>
        <Grid container spacing={3}>
          {isDataLoading ? (
            <>
              {/* <Box container justifyContent="center" alignItems="center">
                <CircularProgress />
              </Box> */}
               <Grid container justifyContent="center" alignItems="center" my={4}>
               <CircularProgress />
              </Grid>
            </>
          ) : (
            infraList.map((item, index) => {
              return (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                  <Box
                    className={`${classes.servicesDesktop1CardBox} displayColumn`}
                  >
                    <Box className={classes.imgBox}>
                      <Box
                        className={classes.heroSectionImg}
                        component={"img"}
                        src={`${item?.image}`}
                      />
                    </Box>

                    {/* <Typography variant="h5">{item.name}</Typography> */}

                    <Typography variant="h5">
                      {item.name
                        ? item?.name?.length > 30
                          ? item?.name?.slice(0, 30) + "..."
                          : item?.name
                        : "NA"}
                    </Typography>
                    <Box
                      className="descriptText"
                      style={{ height: "80px", overflow: "hidden" }}
                    >
                      {/* <TruncatedDescription description={item.description} /> */}
                      <Typography variant="body1" color="#08051599">
                        {item?.description ? item.description : "--"}
                      </Typography>
                    </Box>

                    <Box
                      style={{ cursor: "pointer", marginTop: "20px" }}
                      className="displayCenter"
                      onClick={() => handleLearnMore(item?.name)}
                    >
                      <Typography variant="h6" style={{ marginRight: "10px" }}>
                        Learn More
                      </Typography>
                      <img src="images/LearnArrow.png" alt="arrow" />
                    </Box>
                  </Box>
                </Grid>
              );
            })
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Services;
