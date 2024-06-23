import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  Divider,
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
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import HospitalCarousel from "../HospitalsPage/HospitalCarousel";

const useStyles = makeStyles((theme) => ({
  maindiv: {
    margin: "30px 100px",
    [theme.breakpoints.down("lg")]: {
      margin: "30px 60px",
    },
    [theme.breakpoints.down("md")]: {
      margin: "30px 30px",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "30px 15px",
    },
  },
  main: {
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
        //color: theme.palette.primary.main,
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
        [theme.breakpoints.down("xs")]: {
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
          [theme.breakpoints.down("sm")]: {
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
      marginBottom: "10px",
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

  dialogComponent: {
    "&.MuiPaper-root": {
      borderRadius: "20px !important",
    },
    "& .MuiDialog-paperWidthSm": {
      overflow: "auto !important",
    },
  },
  appointmentInformation: {
    "& svg": {
      cursor: "pointer",
    },
    margin: "30px",
    "& .upperBox": {
      display: "flex",
      justifyContent: "start",
      [theme.breakpoints.down("xs")]: {
        display: "block",
      },
      "& .drProfileBox": {
        marginRight: "24px",
        height: "250px",
        width: "100%",
        maxWidth: "250px",
        borderRadius: "15px",
        [theme.breakpoints.down("xs")]: {
          width: "100%",
          maxWidth: "100%",
        },

        "& .drProfilePicture": {
          height: "250px",
           width: "100%",
          maxWidth: "250px",
          borderRadius: "15px",
          [theme.breakpoints.down("xs")]: {
            width: "100%",
            maxWidth: "100%",
          },
        },
      },
      "& .drDetails": {
        maxWidth: "75%",
        // marginTop: "24px",
        [theme.breakpoints.down("xs")]: {
          marginTop: "24px",
        },
        "& h2": {
          fontWeight: "600",
          color: "#080515",
          marginBottom: "10px",
          
          overflow: "hidden",
          textOverflow: "ellipsis",
          [theme.breakpoints.down("sm")]: {
            fontSize: "27px",
          },
        },
        "& p": {
          color: "#681E65",
          textTransform: "capitalize",
          lineHeight: "25px",
          fontWeight: "300",
        },
      },
    },
    "& .aboutContainer": {
      "& p": {
        margin: "18px 0px",
        color: "#08051599",
        fontWeight: "300",
        lineHeight: "25px",
      },
      "& .buttonBox": {
        display: "flex",
        justifyContent: "space-between",
        [theme.breakpoints.down("xs")]: {
          flexWrap: "wrap",
          gap: "0px",
        },

        gap: "15px",
        "& .cancelButton": {
          color: "#08051599",
          border: "1px solid #08051599",
          height: "40px",
          padding: "10px 39px",
          fontSize: "14px",
          // background: "linear-gradient(275deg, #4D164F 4.07%, #681E65 98.21%)",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25) !important",
          fontFamily: "Outfit",
          fontWeight: "500",
          lineHeight: "21px",
          borderRadius: "50px",
          [theme.breakpoints.down("sm")]: {
            marginBottom: "10px",
          },
        },
        "& .AppointBtn": {
          [theme.breakpoints.down("xs")]: {
            marginTop: "16px",
          },
        },
      },
    },
    // "& .locationImg": {
    //   marginBottom: "38px",
    // },
  },
  viewAllBoxService: {
    "& .pagination": {
      marginTop: "15px",
      width: "fit-content",
      "& button": {
        padding: "7px 14px",
        height: "auto",
        color: theme.palette.text.secondary,
      },
      "& .MuiPaginationItem-page.Mui-selected": {
        backgroundColor: theme.palette.primary.main,
        color: "white",
      },
    },
  },
}));

function LaboratoryListing() {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const [value, setValue] = useState(2);
  const [laboratoryData, setLaboratoryData] = useState([]);
  console.log("laboratoryData-=-=-=-", laboratoryData);
  const [isLoading, setIsLoading] = useState(false);
  const [isData, setIsData] = useState(false);
  const [appointOpen, setAppointOpen] = useState(false);
  const [doctorFavorites, setDoctorFavorites] = useState([]);
  const [laboratoryDetails, setlaboratoryDetails] = useState([]);

  console.log("laboratoryDetails-=-=-=-", laboratoryDetails);

  const [paginationData, setPaginationData] = useState({
    page: 1,
    size: 10,
  });
  const [totalPages, setTotalPage] = useState();
  const [filter, setFilter] = useState({
    search: "",
    city: "",
    witlisted: false,
  });
  const history = useHistory();
  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClearClick = () => {
    setAppointOpen(false);
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
        // url: `${ApiConfig.laboratory}/${id}`,
        params: { ...filter, page, size },
      });

      console.log(response, "biiiiii");
      if (response && response?.data?.responseCode === 200) {
        console.log(response?.data?.responseData);
        // // toast.success(response?.data?.responseMessage);
        setLaboratoryData(response?.data?.responseData);
        setIsLoading(false);
        setIsData(true);
        setTotalPage(response.data?.TotalPages);
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

  const labDetails = async (id) => {
    console.log(id, "id");
    try {
      const response = await axios({
        method: "GET",
        url: `${ApiConfig.laboratoryInfo}?laboratory_id=${id}`,
      });

      if (response && response?.data?.responseCode === 200) {
        // // toast.success(response?.data?.ResponseMessage);
        setlaboratoryDetails(response?.data?.responseData);
        setAppointOpen(true);
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

  const handleFavourite = async (id) => {
    if (!auth.userLoggedIn) {
      history.push("/login");
    } else {
      const doctorIndex = doctorFavorites.findIndex(
        (doctor) => doctor.id === id
      );
      let islike = false;
      likeArray.map((item) => {
        if (item.id == id) {
          islike = item.isLike;
          return (item.isLike = !item.isLike);
        }
      });
      if (islike) {
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

  const [likeArray, setLikeArray] = useState([]);

  useEffect(() => {
    console.log(laboratoryData);
    let arr = [];
    laboratoryData.map((item) => {
      arr.push({ id: item.id, isLike: item.is_witlisted });
    });
    setLikeArray(arr);
  }, [laboratoryData]);

  const findLike = (id) => {
    let imglike;
    let p = likeArray.map((item) => {
      if (item.id == id) imglike = item.isLike;
    });
    console.log("sdfdsfjdsklfjdsklf", imglike);
    return imglike;
  };

  useEffect(() => {
    getAllLaboratory(paginationData.page, paginationData.size);
  }, [paginationData.page, paginationData.size, filter]);

  return (
    <>
      <Box className={classes.main}>
        <Box>
          <HospitalCarousel bannerType="Laboratory" />
        </Box>
        <Box mb={3} className={classes.maindiv}>
          <TitlePage top={hospitalsCategories} />
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
        <Box className={`${classes.maindiv} textFieldBoxService`}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={5}>
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
            <Grid item xs={12} sm={12} md={7}>
              <Box display="flex" gridGap="13px" ml={!isXs && !isSm && 4}>
                <TextField
                  placeholder="Search by city"
                  className="customTextField"
                  variant="outlined"
                  value={filter.city}
                  onChange={(e) =>
                    setFilter({ ...filter, city: e.target.value })
                  }
                />
                <Button
                  variant="contained"
                  color="secondary"
                  className="whitelist"
                  onClick={() => {
                    if (filter.search.length == 0 && filter.city.length === 0) {
                      return;
                    }
                    setFilter({ search: "", city: "" });
                  }}
                >
                  Clear
                </Button>
                <Button
                  width="133px"
                  style={{ minWidth: "133px", fontSize: "14px" }}
                  variant="contained"
                  color="primary"
                  onClick={() => history.push("/all-laboratory")}
                >
                  View All
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

        <Box
          mt={5}
          mb={8}
          className={`${classes.maindiv} appointmentBoxService`}
        >
          <Grid container spacing={isMd ? 4 : isSm ? 3 : 2}>
            {!isData && isLoading ? (
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
                          onClick={() => {
                            setAppointOpen(true);
                            setlaboratoryDetails(item)
                                  // labDetails(item?.id);
                          //   setAppointOpen(true);
                          //   doctorDetail(item?.id);
                          //   // handleInfoIconClick(item);
                           }}
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
                            {findLike(item.id)
                              ? "Remove from interested list"
                              : doctorFavorites.find(
                                  (doctor) => doctor.id === item.id
                                )?.isFavorite
                              ? "Remove from interested list"
                              : "Mark as Interested"}
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
      </Box>
      <Dialog
        open={appointOpen}
        onClose={() => {
          setAppointOpen(false);
        }}
        style={{}}
        className={`${classes.dialogComponent} `}
        maxWidth="sm"
        fullWidth
      >
        <Box className={classes.appointmentInformation}>
          <Box className="displayEnd">
            <ClearOutlinedIcon
              className="clearIcon"
              onClick={handleClearClick}
            />
          </Box>

          <Box>
            <Box className="upperBox">
              <Box className="drProfileBox">
                <img
                  className="drProfilePicture"
                  src={
                    laboratoryDetails?.profile_picture
                      ? laboratoryDetails?.profile_picture
                      : "images/default_doctor.png"
                  }
                  alt="img"
                />
              </Box>
              <Box className="drDetails">
                <Typography variant="h2" >
                  {laboratoryDetails?.full_name  || "--"}
                </Typography>

                <Typography variant="body2" className="professionTypoD">
                  {laboratoryDetails?.services &&
                  laboratoryDetails?.services?.length > 0
                    ? laboratoryDetails?.services
                        .map(
                          (specialization, index) =>
                            specialization.charAt(0).toUpperCase() +
                            specialization.slice(1)
                        )
                        .join(", ")
                        .slice(0, 70) +
                      (laboratoryDetails?.services?.length > 3
                        ? " ..."
                        : "")
                    : "--"}
                </Typography>

                <Box my={2} className="serviceRatings displayStart">
                  {laboratoryDetails?.rating ? (
                    <Rating
                      name="read-only"
                      value={parseFloat(laboratoryDetails?.rating)}
                      readOnly
                    />
                  ) : (
                    "No ratings available"
                  )}
                  <Typography variant="body2" style={{ color: "#08051599" }}>
                    {` | ${laboratoryDetails?.rating}`}
                  </Typography>
                </Box>
                <Box my={2} className="displayStart">
                  <img src="images/phonecall.svg" alt="call" />
                  <Typography
                    variant="body2"
                    style={{
                      marginLeft: "8px",
                      color: "#08051599",
                      fontWeight: "500",
                    }}
                  >
                    {laboratoryDetails?.mobile || "--"}
                  </Typography>
                </Box>
                <Box className="displayStart">
                  <img src="images/gps.svg" alt="gps" className="locationImg" />
                  <Typography
                    variant="body2"
                    style={{
                      marginLeft: "8px",
                      color: "#08051599",
                      fontWeight: "300",
                    }}
                    className="wordBreak"
                  >{(laboratoryDetails?.location && laboratoryDetails?.location) || "--"}
                    
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}

export default LaboratoryListing;
