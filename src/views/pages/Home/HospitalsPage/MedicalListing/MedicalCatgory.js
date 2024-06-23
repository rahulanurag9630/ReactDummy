import { getApiHandler } from "src/config/service";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Input,
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { mediaUrl } from "src/config/apiConfig";
import axios from "axios";
import { ApiConfig } from "src/config/apiConfig";
const useStyles = makeStyles((theme) => ({
  // hospitalfourSlider: {
  //   "& .myBox": {
  //     justifyContent: "center",
  //     alignItems: "center",
  //     background: "white",
  //     display: "flex",
  //     flexDirection: "column",
  //     cursor: "pointer",
  //     marginTop: "25px",
  //     "& p": {
  //       color: theme.palette.primary.dark,
  //       textAlign: "center",
  //       marginTop: "35px",
  //     },
  //     "& div": {
  //       "& img": {
  //         borderRadius: "50%",
  //         border: "1px solid #F0F0F0",
  //         padding: "10px",
  //       },
  //     },
  //   },
  // },
  root: {
    "& h2": {
      fontSize: "35px",
      fontWeight: "600",
    },
  },
  categoryItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
  },
  searchField: {
    "& .inputField": {
      "& .MuiInput-root": {
        borderBottom: "none !important",
      },
    },
    "& .MuiInput-underline:before": {
      borderBottom: "none !important",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "none !important",
    },
  },

  checkBoxStyle: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 20px",
    "& p": {
      marginLeft: "7px",
      fontWeight: "100",
      fontSize: "14px",
      textTransform: "capitalize",
      color: "#2D2C2C",
      // transition: "transform 0.2s ease",
      // "&:hover": {
      //   color: "#521753",
      //   transform: "scale(1.1)",
      // },
    },
    "& .MuiCheckbox-root": {},
    "& .MuiCheckbox-root:hover": {
      color: "#521753",
    },
    "& .MuiFormControlLabel-root": {
      marginBottom: "10px",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "16px",
    },
  },
}));

// export const viewcategory = [
//   {
//     image: <img src="images/HC1.png" alt="tooth" />,
//     name: "Body Care",
//   },
//   {
//     image: <img src="images/HC2.png" alt="kidney1" />,
//     name: "Health & Body Development ",
//   },
//   {
//     image: <img src="images/HC3.png" alt="brain1" />,
//     name: "Women Care",
//   },
//   {
//     image: <img src="images/HC4.png" alt="broken-bone1" />,
//     name: "Diet Care",
//   },
//   {
//     image: <img src="images/HC5.png" alt="pulse" />,
//     name: "Health Drinks",
//   },
//   {
//     image: <img src="images/HC6.png" alt="tooth" />,
//     name: "Ayurveda",
//   },
//   {
//     image: <img src="images/HC1.png" alt="kidney1" />,
//     name: "Sexual Health & Care",
//   },
//   {
//     image: <img src="images/HC2.png" alt="brain1" />,
//     name: "Ayurveda",
//   },
//   {
//     image: <img src="images/HC3.png" alt="broken-bone1" />,
//     name: "Ayurveda",
//   },
//   {
//     image: <img src="images/HC4.png" alt="pulse" />,
//     name: "Ayurveda",
//   },
// ];

const MedicalCategory = ({ onCategorySelect, onSubcategorySelect }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDataLoading = false; // Set to true if data is loading
  const [categoryList, setCategoryList] = useState([]);
  const [openSubcategories, setOpenSubcategories] = useState({});

  const category = async () => {
    try {
      const response = await axios({
        url: ApiConfig["medical-category"],
        method: "GET",
      });
      if (response?.data?.responseCode === 200) {
        setCategoryList(response?.data?.responseData);
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error(err?.response?.data?.responseMessage);
    }
  };

  useEffect(() => {
    category();
  }, []);

  const toggleSubcategories = (categoryId) => {
    setOpenSubcategories((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId],
    }));
  };

  const handleCategoryClick = (categoryId) => {
    toggleSubcategories(categoryId);
    onCategorySelect(categoryId);
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h2">Categories</Typography>
      <Box className={classes.searchField}>
        <Input
          placeholder="Search categories"
          className="inputField"
          style={{
            background: "#F6F6F6",
            borderRadius: "50px",
            padding: "18.5px 14px",
            marginTop: "30px",
            width: "100%",
            borderBottom: "none !important",
          }}
        />
        <Divider style={{ marginTop: "24px" }} />
      </Box>

      {isDataLoading ? (
        <p>Loading...</p>
      ) : (
        <Box className={classes.checkBoxStyle}>
          {categoryList.map((category) => (
            <React.Fragment key={category.id}>
              <FormControlLabel
                style={{ display: "flex", alignItems: "start" }}
                control={
                  <Checkbox
                    style={{ borderRadius: "3px", padding: "0px" }}
                    checked={category.selected}
                    onChange={() => onCategorySelect(category.id)}
                    name={category.name}
                  />
                }
                label={
                  <Typography
                    onClick={() => handleCategoryClick(category.id)}
                    variant="body1"
                  >
                    {category.name}
                  </Typography>
                }
                onClick={() => handleCategoryClick(category.id)}
              />
              {openSubcategories[category.id] && (
                <Box>
                  {category.subcategories.map((subcategory) => (
                    <FormControlLabel
                      style={{
                        display: "flex",
                        alignItems: "start",
                        marginLeft: "1rem",
                      }}
                      control={
                        <Checkbox
                          style={{ borderRadius: "3px", padding: "0px" }}
                          checked={subcategory.selected}
                          onChange={() => onSubcategorySelect(subcategory.id)}
                          name={subcategory.name}
                        />
                      }
                      label={
                        <Typography variant="body1">
                          {subcategory.name}
                        </Typography>
                      }
                    />
                    // <Typography
                    //   key={subcategory.id}
                    //   variant="body2"
                    //   style={{
                    //     marginLeft: "10px",
                    //     marginBottom: "10px",
                    //     cursor: "pointer",
                    //   }}
                    // >
                    //   {subcategory.name}
                    // </Typography>
                  ))}
                </Box>
              )}
            </React.Fragment>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MedicalCategory;
