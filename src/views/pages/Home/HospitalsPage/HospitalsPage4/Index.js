import React, { useEffect, useState } from "react";
import HospitalTop from "./HospitalTop";
import { Box, Container, makeStyles } from "@material-ui/core";
import HospitalCategories from "./HospitalCategories";
import CategoryCarousel from "./CategoryCarousel";
import HospitalProduct from "./HospitalProduct";
import { Pagination } from "@material-ui/lab";
import DoctorsNews from "../../DoctorsPage/DoctorsNews";

const useStyles = makeStyles((theme) => ({
  mainProductBox: {
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
  pagination: {
    marginTop: "15px",
    width: "fit-content",
    "& button": {
      padding: "7px 14px",
      height: "auto",
      color: "gray",
    },
    "& .MuiPaginationItem-page.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
}));
const Index = () => {
  const classes = useStyles();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [productName, setProductName] = useState("");

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };
  const handleSubCategorySelect = (Id) => {
    setSelectedSubCategoryId(Id);
  };
  const handleProductName = (name) => {
    setProductName(name);
    console.log(productName);
  };
  const [categoryData, setCategoryData] = useState(null)
  const [idData,setIdData]= useState("")
  useEffect(() => {
    console.log(categoryData,selectedCategoryId);
    if(categoryData){
      const filteredObject = categoryData.find(obj => obj.id === selectedCategoryId)
      setIdData(filteredObject)

    }
  }, [selectedCategoryId])
  
  const clearFilter = () => {
    setSelectedSubCategoryId(null)
    setSelectedCategoryId(null)
  }

 
  
  return (
    <>
      <Box className={classes.mainProductBox}>
        
        <HospitalTop handleProductName={handleProductName} />
        
      {selectedCategoryId && productName=="" &&<HospitalCategories onSubCategorySelect={handleSubCategorySelect} selectedCategoryData={idData
} /> }
        {!selectedCategoryId && productName=="" && <CategoryCarousel onCategorySelect={handleCategorySelect} setCategoryData={setCategoryData}  />}
        <HospitalProduct selectedCategoryId={selectedCategoryId} productName={productName} selectedSubCategoryId={selectedSubCategoryId} clearFilter={clearFilter}  />
      </Box>
      {/* <DoctorsNews /> */}
    </>
  );
};

export default Index;
