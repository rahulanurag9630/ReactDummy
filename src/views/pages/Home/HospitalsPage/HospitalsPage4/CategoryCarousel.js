import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import {
  Box,
  Button,
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import axios from "axios";
import toast from "react-hot-toast";
import { ApiConfig } from "src/config/apiConfig";

const useStyles = makeStyles((theme) => ({
  hospitalfourSlider: {
    "& .slick-next:hover , & .slick-next , & .slick-next:focus , & .slick-next:hover":
      {
        backgroundImage: "url('images/next2.svg')",
        backgroundRepeat: "no-repeat",
        height: "44px",
        right: "25px",
        width: "44px",
        borderRadius: "50%",
      },
    "& .slick-prev, & .slick-prev:hover, & .slick-prev:hover, & .slick-prev:focus":
      {
        zIndex: "20",
        left: "25px",
        backgroundImage: "url('images/prev2.svg')",
        backgroundRepeat: "no-repeat",
        height: "44px",
        width: "44px",
        borderRadius: "50%",
        content: " ",
      },
    "& .slick-next:before, & .slick-prev:before": {
      color: "transparent",
    },
    "& .myBox": {
      justifyContent: "center",
      alignItems: "center",
      background: "white",
      display: "flex",
      flexDirection: "column",
      cursor: "pointer",
      marginTop: "45px",
      "& p": {
        color: theme.palette.primary.dark,
        textAlign: "center",
        marginTop: "35px",
      },
      "& div": {
        "& img": {
          borderRadius: "50%",
          border: "1px solid #F0F0F0",
          padding: "10px",
        },
      },
    },
  },
  categoryPage: {
    "& h2": {
      fontSize: "32px",
      color: theme.palette.primary.dark,
      fontWeight: 600,
    },
  },
}));

const CategoryCarousel = ({ onCategorySelect, setCategoryData }) => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const [categoryList, setCategoryList] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [currentSlider,setCurrentSlider]=useState(0)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(categoryList.length, 8),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const category = async () => {
    setIsDataLoading(true);
    try {
      const response = await axios({
        url: ApiConfig["medical-category"],
        method: "GET",
      });
      setIsDataLoading(false);
      if (response?.data?.responseCode === 200) {
        setCategoryList(response?.data?.responseData);
        setCategoryData(response?.data?.responseData)
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error(err?.response?.data?.responseMessage);
      setIsDataLoading(false);
    }
  };

  const handleCategorySelect = (categoryId) => {
    onCategorySelect(categoryId);
  };

  useEffect(() => {
    category();
  }, []);

  return (
    <Box>
      <Box
        mt={5}
        mb={4}
        className={`${classes.categoryPage} displaySpacebetween`}
      >
        <Typography variant="h2">Shop By Categories</Typography>
        {/* <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/product-list")}
        >
          View All
        </Button> */}
      </Box>
      {isDataLoading ? (
        <p>Loading...</p>
      ) : (
        <Slider {...settings} className={classes.hospitalfourSlider}>
          {categoryList &&
            categoryList.map((item) => (
              <div key={item.id} onClick={() => handleCategorySelect(item.id)}>
                <Box className="myBox">
                  <Box style={{ maxWidth: "300px", maxHeight: "100px" }}>
                    <img
                      src={item?.image ? `${item?.image}` : "images/HP5.png"}
                      alt="img"
                      height={100}
                      width={100}
                    />
                  </Box>
                  <Typography variant="body2">{item.name}</Typography>
                </Box>
              </div>
            ))}
        </Slider>
      )}
    </Box>
  );
};

export default CategoryCarousel;
