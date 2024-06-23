import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { ApiConfig } from "src/config/apiConfig";
import axios from "axios";
import { Grid } from "react-feather";

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
      "& .slick-next, & .slick-prev": {
        display: "none",
      },
      "& .slick-arrow.slick-next::before": {
        display: "none",
      },
      "& .slick-dots": {
        bottom: "25px",
      },
      "& .slick-dots li.slick-active button:before": {
        color: "white",
      },
      "& .slick-dots li button:before": {
        color: "gray",
      },
      "& .carouselIn": {
        // marginTop: "85px",
        position: "relative",
        objectFit: "cover",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
        // height: "550px",
        "& img": {
          position: "relative",
          top: "0",
          width: "100%",
          objectFit: "cover !important",
          backgroundSize: "cover !important",
          backgroundRepeat: "no-repeat !important",
        },
        "& .bannerImg": {
          marginTop: "28px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        "& .carouselText": {
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          "& h1": {
            textAlign: "center",
            lineHeight: "85px",
            fontSize: "65px",
            fontFamily: "'Outfit'",
            padding: "0px 100px",
            [theme.breakpoints.down("md")]: {
              lineHeight: "72px",
            },
            [theme.breakpoints.down("sm")]: {
              padding: "0px 50px",
            },
            [theme.breakpoints.down("xs")]: {
              padding: "0px 10px",
              lineHeight: "40px",
            },
          },
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
        "& .description": {
          fontFamily: "Outfit",
          fontSize: "20px",
          lineHeight: "30px",
          padding: "0px 130px",
          [theme.breakpoints.down("sm")]: {
            padding: "0px 50px",
            lineHeight: "25px",
          },
          [theme.breakpoints.down("xs")]: {
            padding: "0px 10px",
            lineHeight: "22px",
          },
        },
      },
    },
  },
}));

const HospitalCarousel = ({ bannerType }) => {
  const classes = useStyles();
  const [bannerList, setBannerList] = useState([]);

  const [isDataLoading, setIsDataLoading] = useState(false);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const slides = [
    {
      title: "",
      description: "",
    },
    {
      title: "",
      description: "",
    },
  ];

  const isExtraSmallScreen = useMediaQuery((theme) =>
    theme.breakpoints.down("xs")
  );
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  useEffect(() => {
    getBannerList();
  }, []);

  const getBannerList = async () => {
    setIsDataLoading(true);
    try {
      const res = await axios({
        url: ApiConfig["banner-list"],
        method: "GET",
      });
      setIsDataLoading(false);
      console.log(res, "agsafa");
      if (res?.data?.responseCode === 200) {
        let resData = res?.data?.responseBody;
        setBannerList(resData || []);
      }
    } catch (error) {
      setIsDataLoading(false);
      console.log(error);
    }
  };
  const filteredBanners = bannerList.filter(
    (banner) => banner.banner_type === bannerType
  );

  return (
    <Box className={classes.SliderContainer}>
      <Slider {...settings} className="sliderslick">
        {isDataLoading ? (
          <Grid container justifyContent="center" alignItems="center">
            <CircularProgress />
          </Grid>
        ) : (
          filteredBanners.map((slide, index) => {
            return (
              <div key={index} className="carouselIn">
                <div key={index} className="carouselIn">
                  <Box
                    className="displayColumnCenter bannerImg"
                    style={{ width: "100%" }}
                  >
                    <img
                      src={`${slide?.images}`}
                      alt={slide?.name || "Hospital Banner"}
                      style={{
                        height: "500px",
                        width: "100%",
                        borderRadius: "50px",
                      }}
                    />
                    <Box className="carouselText">
                      <Typography
                        variant="h1"
                        style={{
                          marginBottom: "24px",
                          color: "#fff",
                        }}
                        className="primaryHeading"
                      >
                        {slide?.name &&
                          (isExtraSmallScreen
                            ? slide?.name?.slice(0, 35) + "..."
                            : isSmallScreen
                            ? slide?.name?.slice(0, 40) + "..."
                            : isMediumScreen
                            ? slide?.name?.slice(0, 40) + "..."
                            : slide?.name?.length > 40
                            ? slide?.name?.slice(0, 40) + "..."
                            : slide?.name)}
                      </Typography>

                      <Typography
                        className="description"
                        variant="body2"
                        style={{
                          textAlign: "center",
                          color: "#fff",
                        }}
                      >
                        {slide?.discription
                          ? slide?.discription?.length > 20
                            ? slide?.discription?.slice(0, 300) + "..."
                            : slide?.discription
                          : "NA"}
                      </Typography>
                      <Box mt={4} className="buttonBox displayCenter">
                        <Button
                          className="blackButton"
                          href={slide?.url}
                          target="_blank"
                        >
                          Explore Now
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </div>
              </div>
            );
          })
        )}
      </Slider>
    </Box>
  );
};

export default HospitalCarousel;
