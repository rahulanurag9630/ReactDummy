import { Box, Button, Typography, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Carousel from "./Carousel";
import TitlePage from "./TitlePage";
import axios from "axios";
import toast from "react-hot-toast";
import { ApiConfig } from "src/config/apiConfig";

const useStyles = makeStyles((theme) => ({
  CategoryContainer: {
    background: "#FFF2FF",

    "& .sideSpacing": {
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
  },
}));
const Categories = () => {
  const history = useHistory();
  const classes = useStyles();
  const [categoryList, setCategoryList] = useState([]);
  const hospitalsCategories = {
    name: "CATEGORIES",
    title: "Services and Categories",
    desc: "Specialized medical services tailored to address specific health needs, such as cardiology, dermatology, orthopedics, neurology, and pediatrics, delivered by expert physicians and healthcare professionals.",
  };
  const doctorCategory = async () => {
    try {
      const response = await axios({
        url: ApiConfig["doctorCategory"],
        method: "GET",
      });
     
      console.log(response, "ressssssssssssss");
      if (response?.data?.ResponseCode === 200) {
        
        console.log(response?.data?.ResponseBody);
        setCategoryList(response?.data?.ResponseBody);
       
         
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error(err?.response?.data?.ResponseMessage);
     
    }
  };

  useEffect(() => {
    doctorCategory();
  }, []);
  
  return (
    <>
     {categoryList.length>0 &&  <Box className={`${classes.CategoryContainer} `} mt={10}>
        <Box className="sideSpacing">
          <TitlePage top={hospitalsCategories} />
          <Carousel data={categoryList} /> 
        </Box>

        {/* <Box className="displayCenter" mt={5} paddingBottom={7}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              history.push("/view-doctors-categories");
            }}
          >
            View All
          </Button>
        </Box> */}
      </Box>}
    </>
  );
};

export default Categories;
