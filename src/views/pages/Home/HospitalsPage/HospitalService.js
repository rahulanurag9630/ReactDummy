import {
  Box,
  Button,
  Container,
  Dialog,
  Divider,
  Fab,
  Grid,
  TextField,
  Tooltip,
  Typography,
  makeStyles,
  useMediaQuery,
  CircularProgress,
  useTheme,
  IconButton,
} from "@material-ui/core";
import { Pagination, Rating } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useHistory } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import TitlePage from "../DoctorsPage/TitlePage";
import DoctorsNews from "../DoctorsPage/DoctorsNews";
import { getApiHandler } from "../../../../config/service";
import toast from "react-hot-toast";
import { mediaUrl } from "../../../../config/apiConfig";
import _debounce from "lodash/debounce";
import TruncatedDescription from "src/component/truncatedDescription";

const useStyles = makeStyles((theme) => ({
  DoctorServicesContainer: {
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
    "& .textFieldBoxService": {
      marginBottom: "40px",
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
  },
  appointmentBoxService: {
    [theme.breakpoints.down("xs")]: {
      width: "calc(100vw - 30px)",
    },
    "& .insideappointmentBox": {
      // border: "1.5px solid #DFDFDF",
      // // padding: "15px",
       boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      // borderRadius: "20px",
      // // height: "100%",
      border: "1.5px solid #DFDFDF",
      padding: "15px",

      borderRadius: "20px",
      height: "100%",
      // minHeight: "300px",
      display: "flex",
      justifyContent: "start",

      [theme.breakpoints.down("xs")]: {
        width: "calc(100vw - 60px)",
      },
      [theme.breakpoints.down("sm")]: {
        flexWrap: "wrap",
      },

      "& .imageServiceBox": {
        width: "250px",
        height: "250px",
        borderRadius: "18px",
        [theme.breakpoints.down("sm")]: {
          width: "100%",
        },
        "& img": {
          position: "relative",
          top: "0px",
          width: "250px",
          height: "250px",
          borderRadius: "18px",
          backgroundSize: "cover !important",
          backgroundRepeat: "no-repeat !important",
          objectFit: "fill !important",
          [theme.breakpoints.down("sm")]: {
            width: "100%",
          },
        },

        // "& .dialogImg": {
        //   height: "230px",
        // },
      },
      "& .insideappointmentBoxRight": {
        paddingLeft: "20px",
        width: "100%",
        [theme.breakpoints.up("md")]: {
          width: "calc(100% - 280px)",
        },
        [theme.breakpoints.down("xs")]: {
          paddingLeft: "0px",
          paddingTop: "20px",
        },
        "& .insideappointBoxRightTop": {
          display: "flex",
          justifyContent: "space-between",

          "& h4": {
            color: theme.palette.primary.dark,
            height: "34px",
          },
          "& svg": {
            color: theme.palette.primary.main,
            cursor: "pointer",
          },
          "& .clearIcon": {
            color: "rgba(8, 5, 21, 0.40)",
          },
        },
        "& .professionTypo": {
          fontFamily: " Outfit",
          fontSize: "16px",
          fontWeight: "400",
          lineHeight: "20px",
          letterSpacing: "0em",
          color: "#681E65",
          wordBreak: "break-word",
          height: "30px",

          color: theme.palette.primary.main,
          margin: "15px 0 0px 0",
        },
        "& .professionTypoD": {
          color: theme.palette.primary.main,
          fontSize: "18px",
          margin: "0px 0 10px 0",
        },
        "& .serviceRatings": {
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "10px",
          "& p": {
            color: "rgba(8, 5, 21, 0.60)",
          },
        },
        "& .serviceAddress": {
          alignItems: "start !important",
          fontSize: "16px",
          "& .serviceAddressIn": {
            gap: "8px",
            [theme.breakpoints.down("xs")]: {},
            // marginBottom: "25px",
            "& p": {
              color: "#08051599",
              width: "100%",
              // maxWidth: "280px",
              // height: "55px",
              fontSize: "16px",
              fontWeight: "300",
            },
            "& img": {
              alignSelf: "start",
            },
          },
          "& .mobileNuberCs": {
            gap: "8px",
            marginBottom: "10px",
            "& p": {
              color: "#08051599",
              width: "100%",
              fontSize: "16px",
              fontWeight: "300",
              // maxWidth: "280px",
              // height: "55px",
            },
          },
        },
        "& .serviceAppBtn": {
          display: "flex",
          alignItems: "center",
          gap: "16px",
          "& .bookAppointBtn": {
            color: theme.palette.primary.main,
            fontSize: "20px ",
            background: "#fff",
            border: "2px solid var(--Linear, #4D164F)",
            height: "44px",
            borderRadius: "30px",
            boxShadow: "none !important",
            fontWeight: 400,
            width: "100%",
            [theme.breakpoints.down("xs")]: {
              fontSize: "12px",
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
          marginBottom: "28px",
        },
        "& .CancelBtn, & .AppointBtn": {
          height: "52px",
          borderRadius: "30px",
        },
        "& .CancelBtn": {
          border: `2px solid ${theme.palette.text.secondary}`,
          color: theme.palette.text.secondary,
        },
        "& .AppointBtn": {
          border: `2px solid ${theme.palette.primary.main}`,
          color: theme.palette.primary.main,
        },
      },
    },
  },
  viewAllBoxService: {
    "& .pagination": {
      marginTop: "15px",
      width: "fit-content",
      "& button": {
        fontSize: "16px",
        // padding: "7px 14px",
        // height: "auto",
        // color: theme.palette.text.secondary,
      },
      "& .MuiPaginationItem-page.Mui-selected": {
        backgroundColor: theme.palette.primary.main,
        color: "white",
      },
    },
  },
}));

const HospitalService = () => {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState(2);
  const userLoggedIn = localStorage.getItem("isLoggedIn");
  const [appointOpen, setAppointOpen] = useState(false);
  const [diagData, setDialogData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [filter, setFilter] = useState({
    hospital_name: "",
    city: "",
  });
  const [appointmentData, setAppointmentData] = useState([]);
  const [paginationData, setPaginationData] = useState({
    page: 1,
    size: 10,
  });
  const [totalPages, setTotalPage] = useState();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleInfoIconClick = (item) => {
    console.log(item);
    setDialogData(item);
  };

  const AppointMentmentData = [
    {
      image: <img src="images/MaxHospital1.png" alt="" />,
      name: "Max Hospital",
      profession: "Dentist",
      ratings: (
        <Rating
          name="simple-controlled"
          value={value}
          onChange={handleRatingChange}
        />
      ),
      ratingCount: value,
    },
    {
      image: <img src="images/MaxHospital2.png" alt="" />,
      name: "Metro Hospital",
      profession: "Dentist",
      ratings: (
        <Rating
          name="simple-controlled"
          value={value}
          onChange={handleRatingChange}
        />
      ),
      ratingCount: value,
    },
    {
      image: <img src="images/MaxHospital3.png" alt="" />,
      name: "Fortis Hospital",
      profession: "Dentist",
      ratings: (
        <Rating
          name="simple-controlled"
          value={value}
          onChange={handleRatingChange}
        />
      ),
      ratingCount: value,
    },
    {
      image: <img src="images/MaxHospital4.png" alt="" />,
      name: "Mali Harries",
      profession: "Dentist",
      ratings: (
        <Rating
          name="simple-controlled"
          value={value}
          onChange={handleRatingChange}
        />
      ),
      ratingCount: value,
    },
  ];
  const getAllHospital = async (page, size) => {
    try {
      setIsLoading(true);
      const response = await getApiHandler("hospital-listing", {
        ...filter,
        page,
        size,
      });

      if (response && response.responseCode === 200) {
        console.log(response?.responseData);
        // // toast.success(response?.responseMessage);
        console.log(response?.responseData, "daaaaaaaaaaaaaaat");
        setAppointmentData(response?.responseData);
        setPaginationData((prevData) => ({
          ...prevData,
          page,
        }));
        setTotalPage(response?.TotalPages);
        setIsLoading(false);
        setIsData(true);
      } else {
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error(err?.response?.responseMessage);
      setIsLoading(false);
    }
  };
  const handleClearClick = () => {
    setAppointOpen(false);
  };
  const handleClear = () => {
    if (filter.hospital_name.length === 0 && filter.city.length == 0) {
      return;
    }
    getAllHospital();
    setFilter({
      hospital_name: "",
      city: "",
    });
  };
  const handlePaginationChange = (event, value) => {
    setPaginationData((prevData) => ({
      ...prevData,
      page: value,
    }));
  };

  useEffect(() => {
    getAllHospital(paginationData.page, paginationData.size);
  }, [paginationData.page, paginationData.size, filter]);

  const hospitalsCategories = {
    name: "HOSPITALS",
    title: "Top Hospitals Available Near Your",
    desc: "Discover premier healthcare at your fingertips with our curated selection of top hospitals nearby. Offering cutting-edge facilities and compassionate care, these institutions ensure you receive the highest standard of medical treatment. Trust in their expertise for all your healthcare needs.",
  };
  const handleAppointment = (id) => {
    if (!userLoggedIn) {
      history.push("/login");
    } else {
      history.push({
        pathname: "/hospitals-description",
        state: { id: id },
      });
    }
  };

  const [isData, setIsData] = useState(false);
  return (
    <>
      <Box className={classes.DoctorServicesContainer}>
        <TitlePage top={hospitalsCategories} />
        <Box className="textFieldBoxService">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={5}>
              <Box display="flex" gridGap="13px">
                <TextField
                  placeholder="Search by hospital name"
                  className="customTextField"
                  variant="outlined"
                  value={filter.hospital_name}
                  onChange={(e) =>
                    setFilter({ ...filter, hospital_name: e.target.value })
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
                  onClick={handleClear}
                >
                  Clear
                </Button>

                {appointmentData.length > 0 && (
                  <Button
                    width="133px"
                    style={{ fontSize: "14px", minWidth: "133px" }}
                    className={`${classes.viewAllBoxService} `}
                    variant="contained"
                    color="primary"
                    onClick={() => history.push("/all-hospitals")}
                  >
                    View All
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box className={classes.appointmentBoxService} mb={6}>
          {isLoading && !isData ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "60px",
                marginTop: "60px",
              }}
            >
              <CircularProgress
                style={{ display: "flex", justifyContent: "center" }}
              />
            </div>
          ) : appointmentData?.length === 0 ? (
            <Box my={5} className="displayCenter">
              <img src="images/no_data.png" alt="no_data" />
            </Box>
          ) : (
            <Grid container spacing={4}>
              {appointmentData?.map((item) => (
                <Grid
                  item
                  sm={12}
                  md={12}
                  lg={6}
                  key={item.id}
                  style={{ height: "100%" }}
                >
                  <Box className="insideappointmentBox">
                    <Box className="imageServiceBox">
                      <img
                        src={
                          item?.images[0]?.image
                            ? `${item?.images[0]?.image}`
                            : "images/def_hospital.png"
                        }
                        alt=""
                      />
                    </Box>
                    <Box className="insideappointmentBoxRight" style={{}}>
                      <Box className="insideappointBoxRightTop whiteSpace">
                        {/* <Typography variant="h4">
                          {item.hospital_name}
                        </Typography> */}
                        <Typography
                          variant="h4"
                          className="whiteSpace"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {item.hospital_name || "--"}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        className="professionTypo whiteSpace"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {item.specializations && item.specializations.length > 0
                          ? item.specializations
                              .map(
                                (specialization, index) =>
                                  specialization.name.charAt(0).toUpperCase() +
                                  specialization.name.slice(1)
                              )
                              .join(", ")
                          : "--"}
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
                        <Box className="mobileNuberCs displayStart">
                          <img src="images/phonecall.svg" alt="call" />
                          <Typography variant="body1">
                            {item?.mobile_number || "--"}
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
                            {item?.address || "--"}
                          </Typography>
                        </Box>
                      </Box>
                      <Box className="serviceAppBtn">
                        <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          // className="bookAppointBtn"
                          // onClick={() => {
                          //   history.push("/hospitals-description", {
                          //     userId: item.id,
                          //   });
                          // }}
                          style={{fontSize:"20px"}}
                          onClick={() => {
                            history.push("/hospitals-description", {
                              userId: item?.id,
                            });
                          }}
                          // onClick={() => handleAppointment(item?.id)}
                        >
                          View Details
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
      {/* <DoctorsNews /> */}
    </>
  );
};

export default HospitalService;
