import React, { useEffect, useState } from "react";
// import HospitalTop from "./HospitalTop";
import HospitalTop from "../HospitalsPage4/HospitalTop";
import { Box, Container, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import DoctorsNews from "../../DoctorsPage/DoctorsNews";
import MedicalCategory from "./MedicalCatgory";
import MedicalProduct from "./MedicalProduct";

const useStyles = makeStyles((theme) => ({
  medicalCardCss: {
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
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "20px",
    marginTop: "32px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  leftSection: {
    marginTop: "10px",
    flex: "0 0 calc(20% - 10px)", // Adjust width as needed
    [theme.breakpoints.down("sm")]: {
      flex: "1 1 auto",
      marginBottom: "20px",
    },
  },
  rightSection: {
    marginTop: "10px",
    flex: "0 0 calc(80% - 10px)", // Adjust width as needed
    [theme.breakpoints.down("sm")]: {
      flex: "1 1 auto",
    },
  },
}));
const Index = () => {
  const classes = useStyles();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryArray, setSelectedCategoryArray] = useState([]);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState("");
  const [productName, setProductName] = useState("");

  const handleCategorySelect = (categoryId) => {
    console.log(categoryId);
    let arr = [...selectedCategoryArray]
    const index = selectedCategoryArray.indexOf(categoryId);
    if (index !== -1) {
      arr.splice(index, 1); 
    } else {
      arr.push(categoryId);
    }
    setSelectedCategoryArray(arr);

  };
  useEffect(() => {
    if (selectedCategoryArray.length > 0) {
      let arr = selectedCategoryArray.join(',')
      setSelectedCategoryId(arr)
    }
    
  },[selectedCategoryArray])

  const handleSubcategorySelect = (subcategoryId) => {
    setSelectedSubcategoryId(subcategoryId);
  };
  const handleProductName = (name) => {
   
    setProductName(name);
    
  };
 
  return (
    <>
      <Box className={classes.medicalCardCss}>
      <HospitalTop handleProductName={handleProductName} />
        <Box className={classes.container}>
          <Box className={classes.leftSection}>
            <MedicalCategory onCategorySelect={handleCategorySelect} onSubcategorySelect={handleSubcategorySelect} />
          </Box>
          <Box className={classes.rightSection}>
            <MedicalProduct selectedCategoryId={selectedCategoryId} selectedSubcategoryId={selectedSubcategoryId} productName={productName} />
          </Box>
        </Box>
      </Box>
      {/* <DoctorsNews /> */}
    </>
  );
};

export default Index;
