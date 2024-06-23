import React from "react";
import { Grid, Box, Typography, makeStyles, Button } from "@material-ui/core";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Optimize from "./Desktop1/Optimize";
import Testimonials from "./Desktop1/Testimonials";
import FaqDesktop from "./Desktop1/FaqDesktop";
import HaveQuestion from "./Desktop1/HaveQuestion";
import Features from "./Desktop1/Features";
import Services from "./Desktop1/Services";
import LandingCarousel from "./Desktop1/LandingCarousel";
import Testi from "./Desktop1/Testimonials/Testimonials";

const useStyles = makeStyles((theme) => ({
  bannerBox: {
    position: "relative",
    padding: "24px 0px 0px 0px",
    overflow: "hidden",
    [theme.breakpoints.down("md")]: {
      padding: "24px 0px 0px 0px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "24px 0px 0px 0px",
    },

    "& .viewAll": {
      "& button": {
        borderRadius: "50px",
      },
    },
  },
}));

export default function Banner() {
  const classes = useStyles();

  return (
    <Box className={classes.bannerBox}>
      <LandingCarousel />
      <Services />
      <Features />
      <Optimize />
      {/* <Testimonials /> */}
      <Testi />
      <HaveQuestion />
    </Box>
  );
}
