import {
  Box,
  Button,
  Grid,
  TextField,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "src/context/Auth";

const useStyles = makeStyles((theme) => ({
  textFieldBoxService: {
    "& .customTextField": {
      width: "100%",

      "& .MuiOutlinedInput-root": {
        borderRadius: "50px",
        background: "#F6F6F6",
      },
      "& .MuiInputBase-input": {
        fontFamily: "Outfit",
        fontSize: "16px",
      },
    },

    "& button": {
      borderRadius: "30px",
      border: "2px solid var(--Linear, #4D164F)",
      color: theme.palette.primary.main,
      fontSize: "20px",
      fontWeight: 400,
      height: "49px",
      padding: "19px 30px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "15px",
      },
    },
    "& .whitelist": {
      border: "2px solid var(--Linear, #4D164F)",
      //color: theme.palette.primary.main,
      borderRadius: "30px",
      fontSize: "20px",
      lineHeight: "20px",
      fontWeight: 400,
      // marginLeft: "10px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "15px",
        marginLeft: "0px",
      },
    },
  },
}));

const SearchTextFields = ({filterChange=null}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [city, setCity] = useState("");
  const auth = useContext(AuthContext);
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState({
    name: "",
    city: "",
  });

  useEffect(() => {
    if (filterChange) {
      filterChange(filter)
    }
  }, [filter])
  useEffect(() => {
    console.log(filter);
  },[filter])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
    console.log(filter, "aasajsh");
  };
  const handleSearch = (value) => {
    setSearchValue(filter.name);
  };

  return (
    <Box className={classes.textFieldBoxService}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Box display="flex" gridGap="13px">
            <TextField
              placeholder="Search by name/specialization"
              className={`customTextField `}
              variant="outlined"
              name="name"
              value={filter.name}
              onChange={handleChange}
            />
            <img
              src="images/SearchIcon.png"
              style={{ cursor: "pointer" }}
              alt=""
              onClick={handleSearch}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
          // ml={isXs ? 0 : isSm ? 0 : 4}
          >
            <TextField
              placeholder="Search by city"
              className={`customTextField`}
              variant="outlined"
              name='city'
              value={filter.city}
              onChange={handleChange}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={1}>
          <Box className="displayStart">
            <Button variant="contained" color="secondary" fullWidth>
              Clear
            </Button>
            {/* <Box>
              {auth.userLoggedIn && (
                <Button variant="outlined" fullWidth className="whitelist">
                  Wishlist Doctor
                </Button>
              )}
            </Box> */}
          </Box>
        </Grid>
        {/* <Grid item xs={12} sm={6} md={3}>
        
        </Grid> */}
        <Grid item xs={12} sm={6} md={3}>
          <Box className="displayEnd">
            <Button
              variant="contained"
              color="secondary"
              className="whitelist"
              fullWidth
            >
              Wishlist Doctor
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchTextFields;
