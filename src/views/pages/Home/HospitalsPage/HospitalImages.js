import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { ApiConfig } from "src/config/apiConfig";
import axios from "axios";
import { Grid } from "react-feather";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

// const useStyles = makeStyles((theme) => ({
//   SliderContainer: {
//     // padding: "0px 70px 0px",
//     // [theme.breakpoints.only("md")]: {
//     //   padding: "0px 30px 0px",
//     // },
//     // [theme.breakpoints.down("sm")]: {
//     //   padding: "0px 20px 0px",
//     // },
//     "& .sliderMainH": {
//       "& .slick-next ,& .slick-prev": {
//         display: "none !important",
//       },
//       "& .slick-arrow.slick-next::before": {
//         display: "none !important",
//       },
//       "& .slick-dots": {
//         bottom: "25px",
//       },
//       "& .slick-dots li.slick-active button:before ": {
//         color: "white",
//       },

//       "& .slick-dots li button:before ": {
//         color: "gray",
//       },
//       "& .carouselIn": {
//         backgroundImage: "url(images/HospitalPage1.png)",
//         position: "relative",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         borderRadius: "20px",
//         display: "flex",
//         borderRadius: "50px",
//         alignItems: "center",
//         height: "500px",
//         "& > div": {
//           zIndex: 1,
//           position: "absolute",
//           width: "100%",
//           gap: "25px",
//           padding: "30px 0px",
//           height: "85%",
//           "& h1": {
//             fontSize: "60px",
//             width: "100%",
//             maxWidth: "930px",
//             lineHeight: "70px",
//             textAlign: "center",
//             color: theme.palette.background.default,
//             [theme.breakpoints.only("sm")]: {
//               lineHeight: "60px",
//               width: "90%",
//             },
//             [theme.breakpoints.only("xs")]: {
//               lineHeight: "35px",
//             },
//           },
//           "& h6": {
//             width: "100%",
//             maxWidth: "730px",
//             textAlign: "center",
//             color: theme.palette.background.default,
//           },
//           "& button": {
//             background: theme.palette.primary.dark,
//             color: theme.palette.background.default,
//             fontSize: "20px",
//             fontWeight: 400,
//             border: "1.5px solid rgba(255, 255, 255, 0.60)",
//             borderRadius: "50px",
//             padding: "19px 30px",
//             height: "52px",
//           },
//         },
//       },
//     },
//   },
// }));
const useStyles = makeStyles((theme) => ({
  SliderContainer: {
    "& .sliderslick": {
      "& .slick-next ,& .slick-prev": {
        display: "none",
      },
      "& .slick-arrow.slick-next::before": {
        display: "none",
      },
      "& .slick-dots": {
        bottom: "25px",
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
        objectFit: "cover",
        backgroundPosition: "center",
        borderRadius: "20px",
        display: "flex",
        borderRadius: "50px",
        alignItems: "center",
        height: "500px",
        "& > div": {
          zIndex: 1,
          position: "absolute",
          width: "100%",
          gap: "25px",
          padding: "30px 0px",
          height: "85%",
          "& h1": {
            fontSize: "60px",
            width: "100%",
            maxWidth: "930px",
            lineHeight: "70px",
            textAlign: "center",
            color: theme.palette.background.default,
            [theme.breakpoints.only("sm")]: {
              lineHeight: "60px",
              width: "90%",
            },
            [theme.breakpoints.only("xs")]: {
              lineHeight: "35px",
            },
          },
          "& h6": {
            width: "100%",
            maxWidth: "730px",
            textAlign: "center",
            color: theme.palette.background.default,
          },
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
}));

const HospitalImages = () => {
  const location = useLocation();
  const userId = location.state?.userId;
  console.log("iiiiiiiiiiiiiiiii,", userId);
  const classes = useStyles();
  const [bannerList, setBannerList] = useState([]);

  const [isDataLoading, setIsDataLoading] = useState(false);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
  // useEffect(() => {
  //   getBannerList();
  // }, []);

  // const getBannerList = async () => {
  //   setIsDataLoading(true);
  //   try {
  //     const res = await axios({
  //       url: ApiConfig["banner-list"],
  //       method: "GET",
  //     });
  //     setIsDataLoading(false);
  //     console.log(res, "agsafa");
  //     if (res?.data?.responseCode === 200) {
  //       let resData = res?.data?.responseBody;
  //       setBannerList(resData || []);
  //     }
  //   } catch (error) {
  //     setIsDataLoading(false);
  //     console.log(error);
  //   }
  // };
  const getHospitalView = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${ApiConfig["hospital-view"]}/${userId}/`,
      });
      setIsDataLoading(true);
      if (res.data?.responseCode === 200) {
        console.log(res?.data?.responseData, "dataaaaa");
        let resData = res?.data?.responseData.images;
        console.log(resData, "ssjdhsdjshdjshdjsdjh");
        setBannerList(resData || []);
        console.log(bannerList);
      } else {
        // toast.error(res.data?.responseMessage || "Something went wrong");
        return null;
      }
    } catch (error) {
      setIsDataLoading(false);
      return null;
    }
  };

  useEffect(() => {
    getHospitalView();
  }, []);
  return (
    // <Container maxWidth="xlg" className={classes.SliderContainer}>
    //   <Slider {...settings} className="sliderMainH">
    //     {slides.map((slide, index) => (
    //       <div key={index} className="carouselIn">
    //         <Box className="displayColumnCenter">
    //           <Typography variant="h1">{slide.title}</Typography>
    //           <Typography variant="h6">{slide.description}</Typography>
    //         </Box>
    //       </div>
    //     ))}
    //   </Slider>
    // </Container>
    <Container maxWidth="xlg" className={classes.SliderContainer}>
      <Slider {...settings} className="sliderslick">
        {isDataLoading ? (
          <Grid container justifyContent="center" alignItems="center">
            <CircularProgress />
          </Grid>
        ) : (
          bannerList.map((slide, index) => {
            {
              console.log(slide.image, "dssssssssssssssssssssssssssssssssss");
            }
            return (
              <div key={index} className="carouselIn">
                <Box className="displayColumnCenter">
                  <img
                    src={`${slide?.image}`}
                    alt=""
                    style={{ height: "100%", width: "100%" }}
                  />
                </Box>
              </div>
            );
          })
        )}
      </Slider>
    </Container>
  );
};

export default HospitalImages;
