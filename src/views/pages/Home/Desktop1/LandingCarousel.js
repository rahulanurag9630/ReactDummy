import { ApiConfig, mediaUrl } from "../../../../config/apiConfig";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
  makeStyles,
  Grid,
  useMediaQuery,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const useStyles = makeStyles((theme) => ({
  SliderContainer: {
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
    "& .sliderslick": {
      "& .slick-next ,& .slick-prev": {
        display: "none",
      },
      "& .slick-arrow.slick-next::before": {
        display: "none",
      },
      "& .slick-dots": {
        bottom: "95px",
      },
      "& .slick-dots li.slick-active button:before ": {
        color: "white",
      },

      "& .slick-dots li button:before ": {
        color: "gray",
      },
      "& .carouselIn": {
        // backgroundImage: "url(images/CarouselBack.png)",
        position: "relative",
        backgroundSize: "cover",
        backgroundPosition: "center",
        objectFit: "cover",
        display: "flex",
        borderRadius: "50px",
        alignItems: "center",
        height: "620px",
        textTransform: "capitalize",
        "& > div": {
          zIndex: 1,
          position: "absolute",
          width: "100%",
          gap: "25px",
          padding: "16px 0px",
          height: "85%",
          "& button": {
            background: theme.palette.primary.dark,
            color: theme.palette.background.default,
            fontSize: "20px",
            fontWeight: 400,
            border: "1.5px solid rgba(255, 255, 255, 0.60)",
            borderRadius: "50px",
            padding: "19px 30px",
            height: "52px",
          },
        },
      },
    },
  },
  heroSectionImg: {
    // position: "relative",
    // top: "0px",
    // width: "100%",
    // backgroundSize: "cover !important",
    // backgroundRepeat: "no-repeat !important",
    // objectFit: "cover !important",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    "& h1": {
      // marginBottom: "24px",
      lineHeight: "85px",
      fontSize: "65px",
      fontFamily: "Outfit",
      padding: "0px 150px",
      [theme.breakpoints.down("md")]: {
        lineHeight: "58px",
        fontSize: "55px",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "0px 50px",
        // lineHeight: "40px",
      },
      [theme.breakpoints.down("xs")]: {
        padding: "0px 10px",
        lineHeight: "40px",
      },
    },
    "& p": {
      lineHeight: "30px",
      fontSize: "20px",
      padding: "0px 215px",
      fontFamily: "Outfit",
      [theme.breakpoints.down("md")]: {
        lineHeight: "25px",
        fontSize: "18px",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "0px 50px",
        fontSize: "16px",
      },
      [theme.breakpoints.down("xs")]: {
        padding: "0px 10px",
      },
    },

    "& .buttonBox": {
      marginTop: "40px",
    },
    "& .headingTitle": {
      position: "absolute !important",
      top: "25px !important",
      right: "10px",
      left: "10px",
      color: "#fff !important",
    },
    "& .descriptionContent": {
      color: "rgb(255, 255, 255)",
      position: "absolute",
      top: "45%",
      right: "5%",
      left: "35px",
      bottom: "50%",
    },
  },
  imgText: {
    textAlign: "center",
    top: "75px",
    gap: "20px",
    "& .blackButton": {
      color: "#fff",
      border: "1.5px solid rgba(255, 255, 255, 0.60)",
      height: "52px",
      padding: "19px 30px",
      fontSize: "20px",
      background: "#080515",
      fontWeight: "400",
      borderRadius: "50px",
    },
  },
}));

const LandingCarousel = () => {
  const classes = useStyles();
  const [bannerList, setBannerList] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const isExtraSmallScreen = useMediaQuery((theme) =>
    theme.breakpoints.down("xs")
  );
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  useEffect(() => {
    getBannerList();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const getBannerList = async () => {
    setIsDataLoading(true);
    try {
      const res = await axios({
        url: ApiConfig["banner-list"],
        method: "GET",
      });
      console.log("banner-list-=-=-", res);
      setIsDataLoading(false);
      console.log(res, "agsafa");
      if (res?.data?.responseCode == 200) {
        let resData = res?.data?.responseBody;
        const filteredBanners = resData.filter(
          (banner) => banner.banner_type === "Landing_page"
        );
        setBannerList(filteredBanners);
      }
    } catch (error) {
      setIsDataLoading(false);
      console.log(error);
    }
  };

  return (
    <Box className={classes.SliderContainer}>
      <Slider {...settings} className="sliderslick">
        {isDataLoading
          ? // <Grid container justifyContent="center" alignItems="center">
            //   <CircularProgress />
            // </Grid>
            null
          : bannerList.map((slide, index) => {
              console.log(`url('${mediaUrl}${slide?.images}')`);
              return (
                <div key={index} className="carouselIn">
                  <Box className="displayColumnCenter">
                    <Box
                      className={`${classes.heroSectionImg} displayCenter`}
                      sx={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "50px",
                      }}
                      style={{
                        background: `url('${slide?.images}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <Box
                        className={classes.imgText}
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          variant="h1"
                          style={{
                            marginBottom: "24px",
                            color: "#fff",
                          }}
                        >
                          {slide?.name &&
                            (isExtraSmallScreen
                              ? slide?.name?.slice(0, 35) + "..."
                              : isSmallScreen
                              ? slide?.name?.slice(0, 40) + "..."
                              : isMediumScreen
                              ? slide?.name?.slice(0, 50) + "..."
                              : slide?.name?.length > 60
                              ? slide?.name?.slice(0, 60) + "..."
                              : slide?.name)}
                        </Typography>
                        <Typography
                          variant="body2"
                          style={{
                            textAlign: "center",
                            color: "#fff",
                            padding: "0px, 130px",
                          }}
                        >
                          {slide?.discription
                            ? slide?.discription?.length > 300
                              ? slide?.discription?.slice(0, 300) + "..."
                              : slide?.discription
                            : "NA"}
                        </Typography>
                        <Box
                          // mt={6}
                          className="buttonBox"
                          // style={{ position: "absolute", top: "72%", right: "44%" }}
                        >
                          <Button
                            // variant="contained"
                            className="blackButton"
                            href={slide?.url}
                            target="_blank"
                          >
                            Explore Now
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </div>
              );
            })}
      </Slider>
    </Box>
  );
};

export default LandingCarousel;
