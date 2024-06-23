import React, { useState, useEffect } from "react";
import Categories from "./Categories";
import {
  Box,
  Container,
  Grid,
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import HaveQue from "../Desktop1/HaveQuestion";
import DoctorsNews from "./DoctorsNews";
import axios from "axios";
import toast from "react-hot-toast";
import { ApiConfig } from "src/config/apiConfig";
import { mediaUrl } from "src/config/apiConfig";
import GoBack from "src/component/GoBack";
// import { viewcategory } from "../DoctorsPage/Carousel";

const useStyles = makeStyles((theme) => ({
  CategoryContainer: {
    padding: "56px 10px 0px",
    "& .categoryTitles": {
      // "& .displayColumnCenter": {
      //   display: "flex",
      //   flexDirection: "column",
      //   alignItems: "center",
      // },
      "& h5": {
        textAlign: "center",
        marginBottom: "16px",
        color: theme.palette.primary.main,
        letterSpacing: "5.06px",
        fontSize: "22px",
      },
      "& h2": {
        textAlign: "center",
        marginBottom: "18px",
        fontFamily: "Calistoga",
        color: theme.palette.text.primary,
      },
      "& h6": {
        textAlign: "center",
        marginBottom: "39px",
        color: "rgba(8, 5, 21, 0.60)",
        width: "100%",
        // maxWidth: "764px",
      },
    },
  },
  gridBox: {
    border: "1.5px solid #DFDFDF",
    height: "230px",
    borderRadius: "10px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "25px",
    padding: "20px",
    "& >div": {
      background: "#DFDFDF",
      borderRadius: "50%",
      // padding: "10px",
      marginBottom: "16px",
      height: "120px",
      width: "120px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& h4": {
      color: theme.palette.primary.dark,
    },
    "& h6": {
      fontWeight: "bold",
    },
    "& img": {
      height: "100px",
      width: "100px",
      borderRadius: "50%",
    },
  },
}));
const ViewCategories = () => {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const doctorCategory = async () => {
    try {
      const response = await axios({
        url: ApiConfig["doctorCategory"],
        method: "GET",
      });
      setIsDataLoading(false);
      console.log(response, "ressssssssssssss");
      if (response?.data?.ResponseCode === 200) {
       
        console.log(response?.data?.ResponseBody);
        setCategoryList(response?.data?.ResponseBody);
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error(err?.response?.data?.ResponseMessage);
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    doctorCategory();
  }, []);
  const classes = useStyles();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));

  return (
    <Container maxWidth="xlg">
      <div>
        <Box className={`${classes.CategoryContainer} `}>
          <Box className="categoryTitles">
            <Box>
              <GoBack />
            </Box>
            <Typography variant="h5">CATEGORIES</Typography>
            <Typography variant="h2">
              Our Services and Categories115151
            </Typography>
            <Container>
              <Typography variant="h6">
                Specialized medical services tailored to address specific health
                needs, such as cardiology, dermatology, orthopedics, neurology,
                and pediatrics, delivered by expert physicians and healthcare
                professionals.
              </Typography>
            </Container>
          </Box>
        </Box>
        <Box mb={5} mt={5} padding="30px">
          <Grid container spacing={3}>
            {categoryList.map((item) => {
              return (
                <Grid item xs={12} sm={4} md={3}>
                  <Box className={`${classes.gridBox} `}>
                    <Box>
                      <img
                        src={
                          item?.image ? `${item.image}` : "images/def_doc.png"
                        }
                        alt=""
                        // style={{ borderRadius: "50%" }}
                        // height={100}
                        // width={100}
                      />
                    </Box>

                    <Typography variant="h6" className="whiteSpace">
                      {/* {item.name || "NA"} */}

                      {item?.name
                        ? item?.name?.length > 20
                          ? item?.name?.slice(0, 20) + "..."
                          : item?.name
                        : "NA"}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
        <DoctorsNews />
      </div>
    </Container>
  );
};

export default ViewCategories;
