import {
  Box,
  Button,
  Grid,
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Dialog,
  TextField,
  Divider,
  Container,
  IconButton,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import React, { useState, useEffect, useContext } from "react";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ApiConfig } from "src/config/apiConfig";
import { mediaUrl } from "src/config/apiConfig";
import { Pagination } from "@material-ui/lab";
import { AuthContext } from "src/context/Auth";

import toast from "react-hot-toast";
import { getApiHandler } from "src/config/service";

const useStyles = makeStyles((theme) => ({
  textFieldBoxService: {
    marginBottom: "40px",
    "& .customTextField": {
      width: "100%",

      "& .MuiOutlinedInput-root": {
        borderRadius: "50px",
        background: "#F6F6F6",
      },
      "& .MuiInputBase-input": {
        fontFamily: "Outfit",
        fontSize: "15px",
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
      width: "30%",
      [theme.breakpoints.down("sm")]: {
        fontSize: "15px",
      },
    },
    "& .whitelist": {
      border: "2px solid var(--Linear, #4D164F)",
      // color: theme.palette.primary.main,
      borderRadius: "30px",
      fontSize: "20px",
      fontWeight: 400,
      lineHeight: "20px",
      width: "60%",
      // marginLeft: "10px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "15px",
      },
    },
  },
  appointmentBoxService: {
    "& .insideappointmentBox": {
      height: "92%",
      border: "1.5px solid #DFDFDF",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      padding: "15px 15px 14px",
      borderRadius: "20px",
      [theme.breakpoints.down("xs")]: {
        height: "95%",
      },
      "& .imageServiceBox": {
        width: "100%",
        height: "283px",
        borderRadius: "15px",
        "& img": {
          position: "relative",
          top: "0px",
          width: "100%",
          height: "283px",
          borderRadius: "15px",
          backgroundSize: "cover !important",
          backgroundRepeat: "no-repeat !important",
          // objectFit: "cover !important",
        },
        "& .dialogImg": {
          height: "230px",
        },
      },
      "& .insideappointmentBoxRight": {
        paddingLeft: "20px",
        [theme.breakpoints.down("xs")]: {
          paddingLeft: "0px",
        },
        "& .insideappointBoxRightTop": {
          "& h4": {
            color: theme.palette.primary.dark,
          },
          "& svg": {
            color: theme.palette.primary.main,
          },
          "& .clearIcon": {
            color: "rgba(8, 5, 21, 0.40)",
          },
          "& > div": {
            background: "#F6F6F6",
            borderRadius: "10px",
            padding: "6px 3px 0px",
          },
        },
        "& .professionTypo": {
          color: theme.palette.primary.main,
          margin: "8px 0 8px 0",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          textTransform: "capitalize",
        },
        "& .professionTypoD": {
          color: theme.palette.primary.main,
          fontSize: "18px",
          margin: "8px 0px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        "& .serviceRatings": {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "16px",
          marginTop: "8px",
          "& p": {
            color: "rgba(8, 5, 21, 0.60)",
          },
          "& span": {
            "& .MuiRating-root": {
              borderRight: "1px solid #D1D1D1",
              paddingRight: "8px",
            },
          },
        },
        // "& .serviceAddress": {
        //   "& .serviceAddressIn": {
        //     gap: "8px",
        //     marginBottom: "16px",
        //     "& p": {
        //       color: "rgba(8, 5, 21, 0.60)",
        //       width: "100%",
        //       maxWidth: "280px",
        //     },
        //     "& img": {
        //       alignSelf: "start",
        //     },
        //     "& .locationCss": {
        //       marginBottom: "38px",
        //     },
        //   },
        // },
        "& .serviceAddress": {
          "& img": {
            marginRight: "8px",
          },
          "& p": {
            fontSize: "16px",
            color: "#08051599",
          },
        },

        "& .serviceAppBtn": {
          "& .bookAppointBtn": {
            [theme.breakpoints.down("xs")]: {
              fontSize: "15px !important",
            },
          },
        },
      },
      "& .aboutBox": {
        borderTop: `1px solid ${theme.palette.text.secondary}`,
        paddingTop: "20px",
        "& h5": {
          color: theme.palette.primary.dark,
          marginBottom: "9px",
        },
        "& p": {
          color: theme.palette.text.secondary,
          marginBottom: "16px",
        },
        "& .CancelBtn, & .AppointBtn": {
          // height: "52px",
          // borderRadius: "30px",
        },
        "& .CancelBtn": {
          // border: `2px solid ${theme.palette.text.secondary}`,
          // color: theme.palette.text.secondary,
        },
        "& .AppointBtn": {
          // border: `2px solid ${theme.palette.primary.main}`,
          // color: theme.palette.primary.main,
          // [theme.breakpoints.down("sm")]: {
          //   marginTop: "16px",
          // },
        },
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
        minWidth: "200px",
        borderRadius: "15px",
        [theme.breakpoints.down("xs")]: {
          width: "100%",
          maxWidth: "100%",
        },

        "& .drProfilePicture": {
          height: "250px",
          // width: "100%",
          maxWidth: "250px",
          minWidth: "200px",
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
          whiteSpace: "nowrap",
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
        "& button": {
          fontSize: "18px",
        },
        "& .cancelButton": {
          color: "#08051599",
          border: "1px solid #08051599",
          height: "40px",
          padding: "10px 39px",
          fontSize: "18px",
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

const DoctorList = () => {
  const classes = useStyles();
  const theme = useTheme();
  const auth = useContext(AuthContext);

  // const auth = useContext(AuthContext);
  // console.log(auth,"authhhh")
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const userLoggedIn = localStorage.getItem("isLoggedIn");
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const [appointOpen, setAppointOpen] = useState(false);
  // const userLoggedIn=localStorage.getItem('isLoggedIn')
  const [diagData, setDialogData] = useState();
  const [paginationData, setPaginationData] = useState({
    page: 1,
    size: 10,
  });
  const [value, setValue] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const history = useHistory();
  const [filter, setFilter] = useState({
    search: "",
    city: "",
    witlisted: false,
  });

  const setCity = (city) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      city: city,
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClearClick = () => {
    setAppointOpen(false);
  };
  const [doctorList, setDoctorList] = useState([]);
  const [totalPages, setTotalPage] = useState();
  const [doctorFavorites, setDoctorFavorites] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState([]);
  const [isData, setIsData] = useState(false);
  const getDoctorList = async (page, size) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const res = await axios({
        method: "GET",
        url: ApiConfig["doctorLists"],
        headers,
        params: {
          ...filter,
          page,
          size,
        },
      });

      if (res.data?.ResponseCode === 200) {
        console.log(res?.data, "dataaaaa");
        // // toast.success(res.data?.ResponseMessage);
        setDoctorList(res?.data?.ResponseBody);
        setIsLoading(false);
        setIsData(true);
        setPaginationData((prevData) => ({
          ...prevData,
          page,
        }));

        console.log(res?.data?.ResponseBody, "resssssssssss");
        setTotalPage(res?.data?.TotalPages);
        // setSpecialization(res?.data?.responseData?.specialization)
        // return res.data;
      } else {
        setIsLoading(false);
        // toast.error(res.data?.responseMessage || "Something went wrong");
        return null;
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(
        error?.response?.data?.ResponseMessage || "Something went wrong"
      );
      return null;
    }
  };
  const handlePaginationChange = (event, value) => {
    getDoctorList(value, paginationData.size);
  };

  useEffect(() => {
    getDoctorList(paginationData.page, paginationData.size);
  }, [paginationData.page, paginationData.size, filter]);

  const handleAppointment = (id) => {
    if (!userLoggedIn) {
      history.push("/login");
    } else {
      history.push({
        pathname: "/bookappointment",
        state: { id: id },
      });
    }
  };

  const [likeArray, setLikeArray] = useState([]);

  useEffect(() => {
    console.log(doctorList);
    let arr = [];
    doctorList.map((item) => {
      arr.push({ id: item.id, isLike: item.is_witlisted });
    });
    setLikeArray(arr);
  }, [doctorList]);

  const findLike = (id) => {
    let imglike;
    let p = likeArray.map((item) => {
      if (item.id == id) imglike = item.isLike;
    });
    console.log("sdfdsfjdsklfjdsklf", imglike);
    return imglike;
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
        const updatedFavorites = [...doctorFavorites];
        updatedFavorites.splice(doctorIndex, 1);
        setDoctorFavorites(updatedFavorites);
        await removeFromFavorites(id);
      } else {
        // If not a favorite, add it
        setDoctorFavorites([...doctorFavorites, { id, isFavorite: true }]);
        await markAsFavourite(id);
      }
    }
  };
  console.log("userLoggedIn=-==", userLoggedIn);

  const markAsFavourite = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "POST",
        url: ApiConfig.markAsFavDoctor,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          doctor_id: id,
        },
      });

      if (response && response?.data?.responseCode === 200) {
        // // toast.success(response?.data?.ResponseMessage);
      } else {
        console.error(
          response?.data?.responseMessage || "Something went wrong"
        );
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.responseMessage || "Something went wrong"
      );
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
        const updatedFavorites = [...doctorFavorites];
        updatedFavorites.splice(doctorIndex, 1);
        setDoctorFavorites(updatedFavorites);
      }

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
        url: ApiConfig.removeFavDoctor,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          doctor_id: id,
        },
      });

      if (response && response?.data?.responseCode === 200) {
        // // toast.success(response?.data?.responseMessage);
      } else {
        console.error(
          response?.data?.responseMessage || "Something went wrong"
        );
      }
    } catch (error) {
      setDoctorFavorites([...doctorFavorites, { id, isFavorite: true }]);
      toast.error(
        error?.response?.data?.responseMessage || "Something went wrong"
      );
      console.error(
        error?.response?.data?.responseMessage || "Something went wrong"
      );
    }
  };

  const handleClear = () => {
    if (
      filter.search.length === 0 &&
      filter.city.length === 0 &&
      (!filter.witlisted || filter.witlisted == false)
    ) {
      return;
    }
    if (filter.search.length == 0 && filter.city.length == 0) {
      if (!filter.witlisted) return;
    }

    setFilter({
      search: "",
      city: "",
      witlisted: false,
    });
  };

  const doctorDetail = async (id) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${ApiConfig.doctorDetails}${id}`,
      });

      if (response && response?.data?.responseCode === 200) {
        // // toast.success(response?.data?.ResponseMessage);
        setDoctorDetails(response?.data?.responseData);
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

  return (
    <>
      <Box className={classes.textFieldBoxService}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={3}>
            <Box display="flex" gridGap="13px">
              <TextField
                placeholder="Search by hospital Name/specialization"
                className={`customTextField `}
                variant="outlined"
                name="search"
                value={filter.search}
                onChange={(e) =>
                  setFilter({ ...filter, search: e.target.value })
                }
              />
              <img src="images/SearchIcon.png" alt="" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Box
              display="flex"
              // justifyContent="space-between"
              // ml={isXs ? 0 : isSm ? 0 : 4}
            >
              <TextField
                fullWidth
                placeholder="Search by city"
                className={`customTextField`}
                style={{ marginRight: "10px" }}
                variant="outlined"
                value={filter.city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box style={{ display: "flex", gap: "10px" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClear}
              >
                Clear
              </Button>

              <Button
                // fullWidth
                variant="contained"
                color="secondary"
                className="whitelist"
                onClick={() => {
                  if (!auth.userLoggedIn) {
                    history.push("/login");
                    return;
                  }
                  setFilter((prevFilter) => ({
                    ...prevFilter,
                    witlisted: !filter.witlisted,
                  }));
                }}
              >
                Wishlist Doctor
              </Button>

              {doctorList.length > 0 && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => history.push("/all-doctors")}
                >
                  View All
                </Button>
              )}
            </Box>
          </Grid>
          {/* <Grid item xs={12}sm={12} md={6}>
            <Box className="displayEnd">
              <Button variant="outlined" className="whitelist">
                Wishlist Doctor
              </Button>
            </Box>
          </Grid> */}
        </Grid>
      </Box>

      <Box className={classes.appointmentBoxService} mb={10}>
        <Grid container spacing={isMd ? 4 : isSm ? 3 : 2}>
          {isLoading && !isData ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "60px",
                marginTop: "60px",
                width: "100%",
              }}
            >
              <CircularProgress />
            </div>
          ) : doctorList.length === 0 ? (
            <Box mx={5} className="displayCenter">
              <img src="images/no_data.png" alt="no_data" />
            </Box>
          ) : (
            doctorList.map((item) => (
              <Grid item xs={12} sm={12} md={12} lg={6} key={item.id}>
                <Box className="insideappointmentBox">
                  <Grid container>
                    <Grid item xs={12} sm={4}>
                      <Box className="imageServiceBox">
                        <img
                          src={
                            item?.profile_picture
                              ? `${item?.profile_picture}`
                              : "images/default_doctor.png"
                          }
                          alt="img"
                          height={100}
                          width={100}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Box className="insideappointmentBoxRight">
                        <Box className="insideappointBoxRightTop displaySpacebetween">
                          <Typography variant="h4" className="whiteSpace">
                            {item.full_name || "--"}
                          </Typography>
                          <IconButton
                            style={{
                              borderRadius: "10px",
                              background: "#F6F6F6",
                              padding: "8px",
                            }}
                          >
                            <InfoOutlinedIcon
                              onClick={() => {
                                doctorDetail(item?.id);
                                // handleInfoIconClick(item);
                              }}
                            />
                          </IconButton>
                        </Box>
                        <Typography variant="body2" className="professionTypo">
                          {item?.specialization_name
                            ? item?.specialization_name
                            : "--"}
                        </Typography>

                        <Typography variant="h6">
                          {item?.hospital_name || "--"}
                        </Typography>

                        <Box className="serviceRatings">
                          {item.rating ? (
                            <Rating
                              name="read-only"
                              value={parseFloat(item.rating)}
                              readOnly
                            />
                          ) : (
                            "No ratings available"
                          )}
                          <Typography variant="body2">
                            {` | ${item.rating}`}
                          </Typography>
                        </Box>
                        <Box className="serviceAddress">
                          <Box className="displayStart">
                            <img src="images/phonecall.svg" alt="call" />
                            <Typography variant="body1">
                              {item?.mobile_number || "--"}
                            </Typography>
                          </Box>
                          <Box
                            className="displayStart"
                            style={{
                              margin: "11px 0px",
                              height: "44px",
                              overflow: "hidden",
                              alignItems: "self-start",
                            }}
                          >
                            <img
                              src="images/gps.svg"
                              alt="gps"
                              className="locationCss"
                              style={{ float: "left", marginRight: "10px" }}
                            />
                            <Typography
                              variant="body1"
                              style={{
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                                overflow: "hidden",
                                maxWidth: "calc(100% - 24px)",
                              }}
                            >
                              {item?.hospital_address || "--"}
                            </Typography>
                          </Box>
                        </Box>
                        <Box className="serviceAppBtn">
                          <Grid
                            container
                            alignItems="center"
                            className="displaySpacebetween"
                          >
                            <Grid item xs={10}>
                              <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                className="bookAppointBtn"
                                style={{ fontSize: "20px" }}
                                onClick={() => handleAppointment(item?.id)}
                              >
                                Book an Appointment
                              </Button>
                            </Grid>
                            <Grid
                              item
                              style={{
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                              className="displayCenter"
                              onClick={() => handleFavourite(item?.id)}
                              // className="displayCenter"
                            >
                              <img
                                src={
                                  findLike(item.id)
                                    ? "images/redHeart.png"
                                    : doctorFavorites.find(
                                        (doctor) => doctor.id === item.id
                                      )?.isFavorite
                                    ? "images/redHeart.png"
                                    : "images/Hearts.png"
                                }
                                alt="heart"
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            ))
          )}
        </Grid>
        {}
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
              style={{ cursor: "pointer" }}
            />
          </Box>

          <Box>
            <Box className="upperBox">
              <Box className="drProfileBox">
                <img
                  className="drProfilePicture"
                  src={
                    doctorDetails?.profile_picture
                      ? `${doctorDetails?.profile_picture}`
                      : "images/default_doctor.png"
                  }
                  alt="img"
                />
              </Box>
              <Box className="drDetails">
                <Typography variant="h2" className="whiteSpace">
                  {doctorDetails?.full_name &&
                  doctorDetails.full_name.length > 25
                    ? doctorDetails.full_name
                    : doctorDetails?.full_name || "--"}
                </Typography>

                <Typography variant="body2" className="professionTypoD">
                  {doctorDetails?.specialization
                    ? doctorDetails.specialization
                    : "--"}
                  {/* {doctorDetails?.specialization || "--"} */}
                </Typography>

                <Box my={2} className="serviceRatings displayStart">
                  {doctorDetails?.rating ? (
                    <Rating
                      name="read-only"
                      value={parseFloat(doctorDetails?.rating)}
                      readOnly
                    />
                  ) : (
                    "No ratings available"
                  )}
                  <Typography variant="body2" style={{ color: "#08051599" }}>
                    {` | ${doctorDetails?.rating}`}
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
                    {doctorDetails?.mobile_number || "--"}
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
                  >
                    {doctorDetails?.address || "--"}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box>
              <Box className="aboutContainer">
                <Divider style={{ margin: "16px 0px" }} />
                <Typography variant="h5">About:</Typography>
                <Typography variant="body2" className="wordBreak">
                  {doctorDetails?.about_doctor || "--"}
                </Typography>
                <Box className="buttonBox">
                  <Box style={{ width: "100%" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      // className="cancelButton"
                      fullWidth
                      onClick={handleClearClick}
                    >
                      Cancel
                    </Button>
                  </Box>
                  <Box style={{ width: "100%" }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      className="AppointBtn"
                      onClick={() => handleAppointment(doctorDetails?.id)}
                    >
                      Book an Appointment
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};
export default DoctorList;
