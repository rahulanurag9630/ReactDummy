import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { ApiConfig } from "src/config/apiConfig";
import {
  Box,
  Button,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  descBtnBox: {
    gap: "20px",
    alignItems: "start",
    overflowX: "auto",
    whiteSpace: "nowrap",
    "& h5": {},
    "& .descBtnIn": {
      // flexWrap: "wrap",
      gap: "15px",
      cursor: "pointer",
      background: "#F6F6F6",
      "& .MuiButton-root": {
        minWidth: "auto !important",
        padding: "8px 16px", // Set your custom padding
        borderRadius: "4px", // Set your custom border radius
        color: "#08051599", // Set text color
        // "&:hover": {
        //   background:
        //     "linear-gradient(275.36deg, #4D164F 4.07%, #681E65 98.21%)", // Set linear gradient background color on hover
        //   color: "#FFFFFF", // Change text color on hover
        // },
      },
    },
  },
  borders: {
    border: "1px solid rgba(8, 5, 21, 0.20)",
  },
}));
const HospitalCategories = ({ onSubCategorySelect,selectedCategoryData }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [subCategoris ,setSubCategoris]= useState([{id:"All",name:"All"}])
  useEffect(() => {
    
    if (selectedCategoryData?.subcategories && selectedCategoryData.subcategories.length>0
    ) {
      
      setSubCategoris([...subCategoris,...selectedCategoryData.subcategories])
    }
   
    
  },[selectedCategoryData])
  

  const handleCategorySelect = (Id) => {
    setSelectedSubCategory(Id);
    onSubCategorySelect(Id);
  };

  

  const classes = useStyles();

  return (
    
    <>
      <Box className={` ${classes.descBtnBox}`} mt={6} mb={6}>
        <Box className="/* displayStart */ descBtnIn">
          {subCategoris.map((item) => (
            <Button
              key={item.id}
              onClick={() => handleCategorySelect(item.id)}
              style={{
                backgroundColor:
                  selectedSubCategory === item.id ? "#681E65" : "transparent",
                color: selectedSubCategory === item.id ? "#fff" : "#08051599",
              }}
            >
              {item.name}{" "}
            </Button>
          ))}
        </Box>
      </Box>
      <Box mb={8} fullWidth className={classes.borders}></Box>
    </>
  );
};

export default HospitalCategories;
