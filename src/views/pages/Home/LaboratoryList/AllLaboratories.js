import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import TitlePage from "../DoctorsPage/TitlePage";
import { Pagination, Rating } from "@material-ui/lab";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import toast from "react-hot-toast";
import { ApiConfig, mediaUrl } from "src/config/apiConfig";
import axios from "axios";
import { AuthContext } from "src/context/Auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import HospitalCarousel from "../HospitalsPage/HospitalCarousel";
import AllPageTitle from "src/component/AllPageTitle";

const useStyles = makeStyles((theme) => ({
  main: {
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
    "& .MuiButton-outlined": {
      // border: "2px solid",
      // borderRadius: "50px",
      // borderColor: theme.palette.text.secondary,
      // height: "44px",
    },
    "& .markButton": {
      "& button": {
        [theme.breakpoints.down("sm")]: {
          fontSize: "15px",
        },
      },
    },
    "& .textFieldBoxService": {
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
        // color: theme.palette.primary.main,
        fontSize: "20px",
        fontWeight: 400,
        height: "49px",
        padding: "19px 30px",
      },
    },
    "& .whitelist": {
      border: "2px solid var(--Linear, #4D164F)",
      color: theme.palette.primary.main,
      borderRadius: "30px",
      fontSize: "20px",
      fontWeight: 400,
    },

    "& .appointmentBoxService": {
      [theme.breakpoints.down("xs")]: {
        width: "calc(100vw - 30px)",
      },

      "& .insideappointmentBox": {
        border: "1.5px solid #DFDFDF",
        padding: "15px 15px 14px",
        borderRadius: "20px",
        border: "1.5px solid #DFDFDF",
        padding: "15px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "20px",
        // height: "100%",
        // minHeight: "300px",
        display: "flex",
        justifyContent: "start",

        [theme.breakpoints.down("xs")]: {
          width: "calc(100vw - 60px)",
        },
        [theme.breakpoints.down("sm")]: {
          flexWrap: "wrap",
        },
      },
      "& .MuiRating-root": {
        borderRight: "1px solid #D1D1D1",
        paddingRight: "8px",
      },
      "& .imageServiceBox": {
        width: "250px",
        height: "280px",
        borderRadius: "15px",
        [theme.breakpoints.down("xs")]: {
          width: "100%",
        },
        "& img": {
          position: "relative",
          top: "0px",
          width: "250px",
          height: "280px",
          borderRadius: "15px",
          backgroundSize: "cover !important",
          backgroundRepeat: "no-repeat !important",
          [theme.breakpoints.down("xs")]: {
            width: "100%",
          },
          // objectFit: "cover !important",
        },
      },
      "& .serviceRatings": {
        gap: "8px",
        marginBottom: "16px",
        marginTop: "16px",
        "& p": {
          color: "rgba(8, 5, 21, 0.60)",
        },
      },
      "& h4": {
        color: theme.palette.primary.dark,
      },
      "& .info": {
        color: theme.palette.primary.main,
        background: "#F6F6F6",
        borderRadius: "10px",
        padding: "6px 3px 0px",
      },
      "& .insideappointmentBoxRight": {
        paddingLeft: "20px",
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          width: "calc(100% - 280px)",
        },
        [theme.breakpoints.down("xs")]: {
          paddingLeft: "0px",
        },
        "& .serviceAddressIn": {
          gap: "8px",
          marginBottom: "10px",
          marginTop: "16px",
          "& p": {
            fontSize: "16px",
            color: "rgba(8, 5, 21, 0.60)",
            width: "100%",
            // maxWidth: "280px",
          },
          "& img": {
            alignSelf: "start",
          },
        },
      },
      // "& .MuiButton-containedSecondary": {
      //   color: theme.palette.primary.main,
      //   fontSize: "20px ",
      //   background: "#fff",
      //   border: "2px solid var(--Linear, #4D164F)",
      //   height: "44px",
      //   borderRadius: "30px",
      //   boxShadow: "none !important",
      //   fontWeight: 400,
      //   [theme.breakpoints.down("xs")]: {
      //     fontSize: "15px",
      //   },
      //},
      "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after, & .MuiFilledInput-underline:hover:before":
        {
          borderBottom: "0px",
        },
      "& .MuiFilledInput-root": {
        borderRadius: "50px",
      },

      "& .MuiFilledInput-input": {
        padding: "25px 30px",
      },
    },
    "& .pagination": {
      width: "fit-content",
      "& button": {
        padding: "7px 14px",
        height: "auto",
      },
      "& .MuiPaginationItem-page.Mui-selected": {
        backgroundColor: theme.palette.primary.main,
        color: "white",
      },
    },
    "& .MuiButton-containedPrimary": {
      borderRadius: "50px",
    },
    "& .whitelist": {
      cursor: "pointer",
    },
    "& .descBtnIn": {
      height: "38px",
      flexWrap: "wrap",
      overflow: "scroll",
      gap: "10px",
      cursor: "pointer",
      marginBottom: "24px",
      "& button": {
        borderRadius: "30px",
        // border: `2px solid ${theme.palette.text.secondary}`,
        // color: theme.palette.text.secondary,
        background: "#F0F0F0",
        fontSize: "13px",
        fontWeight: 400,
        padding: "6px 20px",
      },
    },
  },
}));

function AllLaboratories() {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const theme = useTheme();
  const [isData,setIsData]= useState(false)
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const [value, setValue] = useState(2);
  const [laboratoryData, setLaboratoryData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [doctorFavorites, setDoctorFavorites] = useState([]);
  const [paginationData, setPaginationData] = useState({
    page: 1,
    size: 10,
  });
  const [totalPages, setTotalPage] = useState(0);
  const [filter, setFilter] = useState({
    search: "",
    city: "",
    witlisted: false,
  });
  const history = useHistory();
  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
  };
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  const hospitalsCategories = {
    name: "LABORATORY",
    title: "Laboratories For You",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  };

  const AppointMentmentData = [
    {
      image: <img src="images/MaxHospital1.png" alt="" />,
      name: "City X Ray & Scan Clinic Pvt Ltd.",
      ratings: (
        <Rating
          name="simple-controlled"
          value={value}
          onChange={handleRatingChange}
        />
      ),
      ratingCount: "3.0",
    },
    {
      image: <img src="images/MaxHospital1.png" alt="" />,
      name: "City X Ray & Scan Clinic Pvt Ltd.",
      ratings: (
        <Rating
          name="simple-controlled"
          value={value}
          onChange={handleRatingChange}
        />
      ),
      ratingCount: "3.0",
    },
    {
      image: <img src="images/MaxHospital1.png" alt="" />,
      name: "City X Ray & Scan Clinic Pvt Ltd.",
      ratings: (
        <Rating
          name="simple-controlled"
          value={value}
          onChange={handleRatingChange}
        />
      ),
      ratingCount: "3.0",
    },
    {
      image: <img src="images/MaxHospital1.png" alt="" />,
      name: "City X Ray & Scan Clinic Pvt Ltd.",
      ratings: (
        <Rating
          name="simple-controlled"
          value={value}
          onChange={handleRatingChange}
        />
      ),
      ratingCount: "3.0",
    },
  ];
  const handlePaginationChange = (event, value) => {
    setPaginationData((prevData) => ({
      ...prevData,
      page: value,
    }));
  };
  const getAllLaboratory = async (page, size) => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    setIsLoading(true);
    try {
      const response = await axios({
        method: "GET",
        headers,
        url: ApiConfig.laboratory,
        params: { ...filter, page, size },
      });

      console.log(response, "biiiiii");
      if (response && response?.data?.responseCode === 200) {
        console.log(response?.data?.responseData);
        // // toast.success(response?.data?.responseMessage);
        setLaboratoryData(response?.data?.responseData);
        setIsLoading(false);
        setIsData(true)
        setTotalPage(response.data?.totalPages);
      } else {
        toast.error(
          response?.data?.ResponseMessage || "Failed to fetch options"
        );
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error(err?.response?.data?.ResponseMessage);
      setIsLoading(false);
    }
  };
  const handleFavourite = async (id) => {
    if (!auth.userLoggedIn) {
      history.push("/login");
    } else {
      const doctorIndex = doctorFavorites.findIndex(
        (doctor) => doctor.id === id
      );
      if (doctorIndex !== -1) {
        // If already a favorite, remove it
        await removeFromFavorites(id);
        const updatedFavorites = [...doctorFavorites];
        updatedFavorites.splice(doctorIndex, 1);
        setDoctorFavorites(updatedFavorites);
      } else {
        // If not a favorite, add it
        await markAsFavourite(id);
        setDoctorFavorites([...doctorFavorites, { id, isFavorite: true }]);
      }
    }
  };

  const markAsFavourite = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "POST",
        url: ApiConfig.markAsLabFav,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          laboratory_id: id,
        },
      });

      if (response && response?.data?.responseCode === 200) {
        // toast.success(response?.data?.responseMessage);
      } else {
        console.error(
          response?.data?.responseMessage || "Something went wrong"
        );
      }
    } catch (error) {
      toast.error(error?.response?.data?.responseMessage);
      console.error(
        error?.response?.data?.responseMessage || "Something went wrong"
      );
    }
  };
  const removeFromFavorites = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "POST",
        url: ApiConfig.removeLabFav,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          laboratory_id: id,
        },
      });

      if (response && response?.data?.responseCode === 200) {
        // toast.success(response?.data?.responseMessage);
      } else {
        console.error(
          response?.data?.responseMessage || "Something went wrong"
        );
      }
    } catch (error) {
      console.error(
        error?.response?.data?.responseMessage || "Something went wrong"
      );
    }
  };
  useEffect(() => {
    getAllLaboratory(paginationData.page, paginationData.size);
  }, [paginationData.page, paginationData.size, filter]);
  return (
    <Box className={classes.main}>
      <Box mb={3}>
        {/* <TitlePage top={hospitalsCategories} /> */}
        <AllPageTitle top={hospitalsCategories} />
      </Box>
      {/* <Box mt={7}>
          <Grid container >
            <Grid item xs={12} md={5} className="displayCenter">
              <TextField
                fullWidth
                variant="filled"
                placeholder="Search By Name"
              />
            </Grid>
            <Grid item xs={12} md={5} className="displayCenter">
              <TextField
                fullWidth
                variant="filled"
                placeholder="Search by city"
              />
             
            </Grid>
            <Button variant="contained" color="secondary">
                Clear
              </Button>
          </Grid>
        </Box> */}
      <Box className="textFieldBoxService">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <Box display="flex" gridGap="13px">
              <TextField
                placeholder="Search by Laboratory name or Service"
                className="customTextField"
                variant="outlined"
                value={filter.search}
                onChange={(e) =>
                  setFilter({ ...filter, search: e.target.value })
                }
              />
              <img src="images/SearchIcon.png" alt="search" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box display="flex" gridGap="13px" ml={!isXs && !isSm && 4}>
              <TextField
                placeholder="Search by city"
                className="customTextField"
                variant="outlined"
                value={filter.city}
                onChange={(e) => setFilter({ ...filter, city: e.target.value })}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  if (filter.search.length === 0 && filter.city.length === 0) {
                    return;
                  }
                  setFilter({ search: "", city: "" });
                }}
              >
                Clear
              </Button>
            </Box>
          </Grid>
        </Grid>
        {/* {auth.userLoggedIn && (
          <Grid item lg={12} xs={12} sm={12} md={6}>
            <Box mt={4} className="displayEnd">
              <Button
                variant="contained"
                color="secondary"
                className="whitelist"
                onClick={() => {
                  setFilter((prevFilter) => ({
                    ...prevFilter,
                    witlisted: true,
                  }));
                }}
              >
                Interested Lab
              </Button>
            </Box>
          </Grid>
        )} */}
      </Box>

      <Box mt={5} className="appointmentBoxService">
        <Grid container spacing={isMd ? 4 : isSm ? 3 : 2}>
          {(!isData && isLoading) ? (
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <CircularProgress />
            </Grid>
          ) : laboratoryData.length === 0 ? (
            <Grid item xs={12} style={{ textAlign: "center" }}>
              {/* <img src="images/noData.jpg" alt="" /> */}
              {/* <Typography variant="h5">No Data found</Typography> */}
              <Box mx={5} className="displayCenter">
                <img src="images/no_data.png" alt="no_data" />
              </Box>
            </Grid>
          ) : (
            laboratoryData &&
            laboratoryData?.map((item) => (
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Box className="insideappointmentBox">
                  <Box className="imageServiceBox">
                    <img
                      src={
                        item?.profile_picture
                          ? `${item?.profile_picture}`
                          : "images/def_lab.jpg"
                      }
                      alt=""
                    />
                  </Box>

                  <Box className="insideappointmentBoxRight">
                    <Box className="insideappointBoxRightTop displaySpacebetween">
                      <Typography variant="h4" className="whiteSpace">
                        {" "}
                        {item?.full_name ? item?.full_name : "--"}
                      </Typography>
                      {/* <Typography
                            style={{ margin: "8px 0px", color: "#681E65" }}
                            variant="body2"
                          >
                            {item.full_name}
                          </Typography> */}
                      <IconButton
                        style={{
                          borderRadius: "10px",
                          background: "#F6F6F6",
                          padding: "8px",
                        }}
                      >
                        <InfoOutlinedIcon
                        // onClick={() => {
                        //   setAppointOpen(true);
                        //   doctorDetail(item?.id);
                        //   // handleInfoIconClick(item);
                        // }}
                        />
                      </IconButton>
                    </Box>

                    <Box className="serviceRatings displayStart">
                      {item.rating ? (
                        <Rating
                          name="read-only"
                          value={parseFloat(item.rating)}
                          readOnly
                        />
                      ) : (
                        "No ratings available"
                      )}
                      <Typography variant="body2">{item.rating}</Typography>
                    </Box>
                    <Box>
                      <Box className="serviceAddressIn displayStart">
                        <img src="images/phonecall.svg" alt="call" />
                        <Typography variant="body1">
                          {item?.mobile || "--"}
                        </Typography>
                      </Box>
                      <Box
                        className="serviceAddressIn displayStart"
                        style={{
                          margin: "11px 0px",
                          height: "44px",
                          overflow: "hidden",
                          alignItems: "self-start",
                        }}
                      >
                        <img src="images/gps.svg" alt="gps" />
                        <Typography
                          variant="body1"
                          style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                          }}
                        >
                          {(item?.location && item?.location) || "--"}
                        </Typography>
                      </Box>
                    </Box>

                    <Box>
                      <Box className="displayStart descBtnIn">
                        {item?.services?.length > 0 ? (
                          item.services.slice(0, 3).map((service, index) => (
                            <Button
                              // variant="outlined"
                              style={{ cursor: "pointer" }}
                              key={index}
                            >
                              {service}
                            </Button>
                          ))
                        ) : (
                          <Typography variant="body2">
                            No services available
                          </Typography>
                        )}
                        {item?.services?.length > 3 && (
                          <Typography variant="body2">
                            + {item.services.length - 3}
                          </Typography>
                        )}
                      </Box>
                      <Box>
                        <Button
                          fullWidth
                          variant="contained"
                          color="secondary"
                          onClick={() => handleFavourite(item?.id)}
                        >
                          Mark as Interested
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
      <Box
        className="displaySpacebetween"
        mt={6}
        mb={8}
        style={{ justifyContent: "end" }}
      >
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            shape="rounded"
            size="small"
            className="pagination"
            page={paginationData.page}
            onChange={handlePaginationChange}
          />
        )}
      </Box>
    </Box>
  );
}

export default AllLaboratories;
