import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "./Testimonial.css";
import Box from "@material-ui/core/Box";
import {
  Typography,
  IconButton,
  CircularProgress,
  Grid,
  useMediaQuery,
  Theme,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { mediaUrl } from "src/config/apiConfig";
import axios from "axios";
import { ApiConfig } from "src/config/apiConfig";

export default function Testi() {
  const [testimonials, setTestimonials] = useState([]);
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

  const getTestimonialList = async () => {
    setIsDataLoading(true);
    try {
      const res = await axios({
        url: ApiConfig["testimonials-list"],
        method: "GET",
      });
      setIsDataLoading(false);
      if (res?.data?.ResponseCode == 200) {
        let resData = res?.data?.ResponseBody;
        setTestimonials(resData || []);
      }
    } catch (error) {
      setIsDataLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getTestimonialList();
  }, []);

  const sliderRef = useRef();

  const handlePrevious = () => {
    if (currentSlide > 0) {
      sliderRef.current.slickPrev();
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNext = () => {
    console.log(currentSlide,testimonials.length);
    if (currentSlide < testimonials.length) {
      sliderRef.current.slickNext();
      setCurrentSlide(currentSlide + 1);
    }
  };
  const [currentSlide, setCurrentSlide] = useState(0);

  // const truncateText = (text, maxLength) => {
  //   if (text.length <= maxLength) return text;
  //   return text.substr(0, maxLength) + "...";
  // };

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "14px",
    slidesToShow: 3,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          centerMode: true,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 1500,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
          autoplay: true,
          autoplaySpeed: 1500,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
          autoplay: true,
          autoplaySpeed: 1500,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          autoplay: true,
          autoplaySpeed: 1500,
        },
      },
    ],
  };

  const styles = {
    image: {
      height: "80px",
      width: "80px",
      // marginTop: "8%",
      borderRadius: "50%",
      // marginLeft: "35%",
      objectFit: "cover",
      zIndex: 1,
      position: "absolute",
      right: "35%",
      top: "-23px",
      // transform: "translateY(-50%)",
      "@media screen (max-width: 1400px)": {
        right: "24% !important",
      },
    },
    paragraph: {
      textAlign: "center",
      padding: "10px",
      height: "150px",
      marginTop: "50px",
    },
    footer: {
      display: "flex",
      textAlign: "center",
      justifyContent: "right",
      margin: "1rem 2rem",
    },
    testimonialCard: {},
    silderArrowIcon: {
      background: "#712171",
      color: "#fff",
    },
    disableArrowIcon: {
      background: "#712171",
      color: "#808080",
    },
  };

  return (
    <>
      {testimonials.length > 0 && (
        <Box
          className="slider-container"
          sx={{ position: "relative", height: "50%" }}
        >
          <Box
            sx={{
              position: "absolute",
              left: 0,
              top: "50%",
              marginLeft: "-10%",
              transform: "translateY(-50%)",
            }}
          >
            <IconButton
              onClick={handlePrevious}
              style={
                currentSlide == 0
                  ? styles.disableArrowIcon
                  : styles.silderArrowIcon
              }
              disabled={currentSlide === 0}
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "24px auto",
            }}
          >
            <Typography variant="h3" style={{ color: "#681E65" }}>
              Testimonials
            </Typography>
          </Box>
          <Slider {...settings} ref={sliderRef}>
            {isDataLoading
              ? // <Grid container justifyContent="center" alignItems="center">
                //   <CircularProgress />
                // </Grid>
                null
              : testimonials.map((testimonial, index) => (
                  <Box
                    key={index}
                    className="testimonial-card"
                    style={{
                      background:
                        index % 2 === 0 ? "rgba(82, 49, 104, 0.10)" : "#e9e9e9",
                      userSelect: "none",
                      cursor: "pointer",
                      boxShadow:
                        "0 1px 1px rgba(0,0,0,0.11), 0 2px 2px rgba(0,0,0,0.11), 0 4px 4px rgba(0,0,0,0.11), 0 6px 8px rgba(0,0,0,0.11), 0 8px 16px rgba(0,0,0,0.11)",
                    }}
                  >
                    <Box style={styles.image}>
                      <img
                        src={
                          testimonial.image
                            ? `${testimonial.image}`
                            : "images/avatar.png"
                        }
                        alt="pic"
                        style={styles.image}
                      />
                    </Box>
                    <Box style={styles.paragraph}>
                      <Typography
                        variant="body2"
                        style={{ maxHeight: "157px", overflow: "hidden" }}
                      >
                        {largeScreen
                          ? testimonial.description &&
                            testimonial.description.length > 320
                            ? `${testimonial.description.slice(0, 320)}...`
                            : testimonial.description
                          : mediumScreen
                          ? testimonial.description &&
                            testimonial.description.length > 20
                            ? `${testimonial.description.slice(0, 20)}...`
                            : testimonial.description
                          : smallScreen
                          ? testimonial.description &&
                            testimonial.description.length > 30
                            ? `${testimonial.description.slice(0, 30)}...`
                            : testimonial.description
                          : extraSmallScreen
                          ? testimonial.description &&
                            testimonial.description.length > 40
                            ? `${testimonial.description.slice(0, 40)}...`
                            : testimonial.description
                          : ""}
                      </Typography>
                    </Box>
                    <Box style={styles.footer}>
                      <Typography>
                        <b>
                          {testimonial.name.length > 25
                            ? `${testimonial.name.slice(0, 25)}...`
                            : testimonial.name}
                        </b>
                        , &nbsp;
                        {testimonial.designation.length > 30
                          ? `${testimonial.designation.slice(0, 30)}...`
                          : testimonial.designation}
                      </Typography>
                    </Box>
                  </Box>
                ))}
          </Slider>

          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              marginRight: "-10%",
              transform: "translateY(-50%)",
            }}
          >
            <IconButton
              onClick={handleNext}
              style={
                currentSlide == testimonials.length
                  ? styles.disableArrowIcon
                  : styles.silderArrowIcon
              }
              disabled={currentSlide == testimonials.length}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </>
  );
}
