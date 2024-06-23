import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import toast from "react-hot-toast";
import axios from "axios";
import { ApiConfig } from "src/config/apiConfig";

const useStyles = makeStyles((theme) => ({
  mainCategoryBox: {
    marginBottom: "100px !important",
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

  myBox: {
    justifyContent: "center",
    alignItems: "center",
    background: "white",
    display: "flex",
    flexDirection: "column",
    // height: "100%",
    cursor: "pointer",
    marginTop: "25px",
    border: "2px solid #DFDFDF",
    borderRadius: "15px",
    height: "100%",
    minHeight: "260px",
    // padding: "0px 40px",
    // width: "230px",
    "& p": {
      color: theme.palette.primary.dark,
      textAlign: "center",
      marginTop: "35px",
    },
    "& div": {
      "& img": {
        borderRadius: "50%",
        height: "132px",
        width: "132px",
        position: "relative",
        top: "0px",
        backgroundSize: "cover !important",
        backgroundRepeat: "no-repeat !important",
        objectFit: "cover !important",
        // border: "1px solid #F0F0F0",
        // padding: "10px",
      },
    },
  },
  headingContent: {
    "& h6": {
      color: "#681E65",
      textAlign: "center",
      textTransform: "uppercase",
    },
    "& h2": {
      color: "#161E29",
      textAlign: "center",
      fontWeight: "600",
      margin: "16px 0px",
    },
    "& p": {
      color: "#08051599",
      textAlign: "center",
    },
  },
}));

const AllCategoryCarousel = ({ onCategorySelect }) => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [categoryList, setCategoryList] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const category = async () => {
    setIsDataLoading(true);
    try {
      const response = await axios({
        url: ApiConfig["medical-category"],
        method: "GET",
      });
      setIsDataLoading(false);
      if (response?.data?.responseCode === 200) {
        setCategoryList(response?.data?.responseData || []);
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
    <Box className={classes.mainCategoryBox}>
      <Container maxWidth="md">
        <Box mb={4} className={classes.headingContent}>
          <Typography variant="h6">Categories</Typography>
          <Typography variant="h2">Categories</Typography>
          <Typography variant="body2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </Typography>
        </Box>
      </Container>

      {isDataLoading ? (
        <p>Loading...</p>
      ) : (
        <Grid container spacing={3}>
          {categoryList.map((item) => (
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              lg={3}
              key={item.id}
              onClick={() => handleCategorySelect(item.id)}
            >
              <Box className={classes.myBox}>
                <Box>
                  <img
                    src={item?.image ? `${item?.image}` : "images/HP5.png"}
                    alt="img"
                  />
                </Box>
                <Typography variant="body2" className="wordBreak">
                  {item.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default AllCategoryCarousel;
