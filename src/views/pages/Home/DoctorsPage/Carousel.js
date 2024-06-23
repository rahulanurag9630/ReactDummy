import {
  Box,
  Container,
  Grid,
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import toast from "react-hot-toast";
import { ApiConfig } from "src/config/apiConfig";
import { mediaUrl } from "src/config/apiConfig";

// export const viewcategory = [
//   {
//     image: <img src="images/tooth.png" alt="tooth" />,
//     title: "Dentist",
//   },
//   {
//     image: <img src="images/kidney1.png" alt="kidney1" />,
//     title: "Urology",
//   },
//   {
//     image: <img src="images/brain1.png" alt="brain1" />,
//     title: "Neurology",
//   },
//   {
//     image: <img src="images/broken-bone1.png" alt="broken-bone1" />,
//     title: "Orthopedic",
//   },
//   {
//     image: <img src="images/pulse1.png" alt="pulse" />,
//     title: "Cardiology",
//   },
//   {
//     image: <img src="images/tooth.png" alt="tooth" />,
//     title: "Dentist",
//   },
//   {
//     image: <img src="images/kidney1.png" alt="kidney1" />,
//     title: "Urology",
//   },
//   {
//     image: <img src="images/brain1.png" alt="brain1" />,
//     title: "Neurology",
//   },
//   {
//     image: <img src="images/broken-bone1.png" alt="broken-bone1" />,
//     title: "Orthopedic",
//   },
//   {
//     image: <img src="images/pulse1.png" alt="pulse" />,
//     title: "Cardiology",
//   },
// ];

const Carousel = ({data}) => {
  const [isMax, setIsMax] = useState(false);
  const [isMin, setIsMin] = useState(true);
  const useStyles = makeStyles((theme) => ({
    mainSlider: {
      marginBottom: "50px",
      "& .slick-next ,& .slick-next:hover ,  & .slick-next:focus , & .slick-next:hover":
        {
          backgroundImage: isMax
            ? "url('/images/next3.svg')"
            : "url('/images/next2.svg')",
          backgroundRepeat: "no-repeat",
          height: "44px",
          right: "-25px",
          width: "44px",
          borderRadius: "50%",
        },

      "& .slick-prev, & .slick-prev:hover, & .slick-prev:focus, & .slick-prev:hover":
        {
          zIndex: "20",
          left: "-5px",
          backgroundImage: isMin
            ? "url('/images/prev3.svg')"
            : "url('/images/prev2.svg')",
          backgroundRepeat: "no-repeat",
          height: "44px",
          width: "44px",
          borderRadius: "50%",
          content: " ",
        },
      "& .slick-next:before,& .slick-next:before,& .slick-prev:before": {
        color: "transparent",
      },
      "& .myBox": {
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        display: "flex",
        flexDirection: "column",
        height: "260px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        borderRadius: "15px",
        border:"1px solid rgba(0, 0, 0, 0.1)",
        "& div": {
          "& img": {
            borderRadius: "50%",
            background: "#F0F0F0",
            padding: "10px",
          },
        },
        "& h6": {
          fontWeight: "bold",
          maxWidth: "201px",
          marginTop: " 20px",
        },
      },
    },
  }));
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [categoryList, setCategoryList] = useState(data);
  const classes = useStyles();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: isXs ? 1 : isSm ? 3 : isMd ? 4 : 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    afterChange: (currentSlide) => {
      if (currentSlide === 0) {
        setIsMin(true);
      } else {
        setIsMin(false);
      }
      if (currentSlide + settings.slidesToShow >= categoryList.length) {
        setIsMax(true);
      } else {
        setIsMax(false);
      }
    },
  };

  const doctorCategory = async () => {
    try {
      const response = await axios({
        url: ApiConfig["doctorCategory"],
        method: "GET",
      });
      setIsDataLoading(false);
      console.log(response, "ressssssssssssss");
      if (response?.data?.ResponseCode === 200) {
        // toast.success(
        //   response?.data?.ResponseMessage || "Data Found Successfully"
        // );
        console.log(response?.data?.ResponseBody);
        setCategoryList(response?.data?.ResponseBody);              
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error(err?.response?.data?.ResponseMessage);
      setIsDataLoading(false);
    }
  };

  // useEffect(() => {
  //   doctorCategory();
  // }, []);

  settings.prevArrow =
    !isDataLoading && categoryList.length > 0 ? (
      <button className="slick-prev" aria-label="Previous" />
    ) : (
      <></>
    );

  settings.nextArrow =
    !isDataLoading && categoryList.length > 0 ? (
      <button
        className="slick-next"
        aria-label="Next"
        style={{
          backgroundImage: isMax
            ? "url('/images/next3.svg')"
            : "url('/images/next2.svg')",
        }}
      />
    ) : (
      <></>
    );
  return (
    <Box pb={5}>
      <Slider {...settings} className={classes.mainSlider}>
        {categoryList.map((item, index) => (
          <div key={index}>
            <Box ml={3} className="myBox">
              <Box style={{ maxWidth: "300px", maxHeight: "200px" }}>
                <img
                  src={item?.image ? `${item.image}` : "images/def_doc.png"}
                  alt=""
                  height={100}
                  width={100}
                />
              </Box>
              <Typography variant="h6" className="whiteSpace">
                {item.name}
              </Typography>
            </Box>
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
