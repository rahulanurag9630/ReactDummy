import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  makeStyles,
  TextField,
  Button,
  FormControl,
  MenuItem,
  InputLabel,
  CircularProgress,
  Select,
} from "@material-ui/core";
import { CiHeart } from "react-icons/ci";
import { AuthContext } from "src/context/Auth";
import toast from "react-hot-toast";
// import { getApiHandler } from "../../../../config/service";
import { ApiConfig, mediaUrl } from "../../../../config/apiConfig";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Pagination } from "@material-ui/lab";
const useStyles = makeStyles((theme) => ({
  mainBox: {
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    "& h2": {
      color: "#161E29",
      fontFamily: "Calistoga",
      fontStyle: "normal",
      fontWeight: "500",
    },
    "& .subBox": {
      background: "#FFF",
      borderRadius: "15px",
      width: "100%",
      padding: "20px 0",
    },
    "& .gridBox": {
      padding: "10px 20px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      "& h5": {
        color: "#080515",
        fontStyle: "normal",
        fontWeight: "400",
      },
    },

    "& .MuiFormControl-root": {
      width: "100%",
    },
    "& .MuiFilledInput-underline:before": {
      borderBottom: "none",
    },
    "& .MuiFilledInput-underline:after": {
      borderBottom: "none",
    },
    "& .MuiFilledInput-root": {
      background: "rgba(0, 0, 0, 0.02)",
      border: "1px solid rgba(0, 0, 0, 0.02)",
    },
    "& .maxGridBox": {
      border: "1px solid #DFDFDF",
      borderRadius: "10px",
      padding: "15px",
      margin: "15px 20px 0 20px",
    },
    "& .maxGridInnerBox": {
      padding: "10px",
      background: "rgba(0, 0, 0, 0.03)",
      borderRadius: "10px",
      height: "135px",
      maxWidth: "200px",
    },
    "& .maxGridContent": {
      display: "flex",
      flexDirection: "column",
      gap: "50px",
      paddingRight: "10px",
    },
    "& .maxGridSubContent": {
      display: "flex",
      gap: "10px",
      justifyContent: "space-between",
      flexWrap: "wrap",
      "& h6": {
        color: "rgba(8, 5, 21, 0.60)",
        fontStyle: "normal",
        lineHeight: "130%",
      },
      "& h5": {
        color: "#080515",
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: "130%",
        marginTop: "10px",
      },
    },

    "& .maxGridSubBox": {
      display: "flex",
      gap: "10px",
    },
    "& .filterBtn": {
      color: "#681E65",
      height: "45px",
      border: "1px solid #681E65",
      maxWidth: "350px",
      textTransform: "capitalize",
      width: "100%",
      fontWeight: "400",
      borderRadius: "50px",
      fontSize: "20px",
      "&:hover": {
        background: "#681E65",
        color: "#FFF",
      },
      "@media(max-width:500px)": { fontSize: "15px" },
    },
    "& .icon": {
      width: "44px",
      height: "44px",
      background: "#F0F0F0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "36px",
      borderRadius: "60px",
      "@media(max-width:599px)": {
        fontSize: "30px",
        width: "65px",
      },
    },
    "& .MuiInputLabel-filled.MuiInputLabel-shrink": {
      display: "none",
    },
    "& .MuiFilledInput-input": {
      padding: "15px",
    },
    "& .MuiInputLabel-filled": {
      fontSize: "15px",
      letterSpacing: "0.5px",
      "@media(max-width:767px)": {
        fontSize: "12px",
      },
    },
    "& .MuiSelect-selectMenu": {
      fontSize: "15px",
      letterSpacing: "0.5px",
      "@media(max-width:767px)": {
        fontSize: "12px",
      },
    },
    "& .pagination": {
      marginTop: "15px",
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
  },
}));

// const maxGridData = [
//     {
//         imageUrl: "./images/max.png",
//         content: {
//             claimSettled: "97.8 %",
//             coverageTill: "60 Yrs",
//             lifeCover: "$ 3 Cr",
//             subBoxText: "$ 1828/ month",
//         },
//     },
//     {
//         imageUrl: "./images/max.png",
//         content: {
//             claimSettled: "97.8 %",
//             coverageTill: "60 Yrs",
//             lifeCover: "$ 3 Cr",
//             subBoxText: "$ 1828/ month",
//         },
//     },
//     {
//         imageUrl: "./images/max.png",
//         content: {
//             claimSettled: "97.8 %",
//             coverageTill: "60 Yrs",
//             lifeCover: "$ 3 Cr",
//             subBoxText: "$ 1828/ month",
//         },
//     },
//     // Add more data objects as needed
// ];
const RequestPolicy = () => {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const [viewRequestPolicy, setViewRequestPolicy] = useState([]);
  const [viewRequestPolicyOptions, setViewRequestPolicyOptions] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isData, setIsData] = useState(false);
  const [filter, setFilter] = useState({
    select_life_cover: "",
    select_coverage_till: "",
    plan_type: "",
    payable_mode: "",
    insurance_company_name: "",
    policy_name: "",
  });
  const [costPlan, setCostPlan] = useState(null);
  const [lifeCover, setLifeCover] = useState(null);
  const [coverTill, setCoverTill] = useState(null);
  const [totalPage, setTotalPage] = useState();

  const history = useHistory();
  const [paymentFrequency, setPaymentFrequency] = useState(null);
  const handleChange1 = (event) => {
    setCostPlan(event.target.value);
    setFilter((prevFilter) => ({
      ...prevFilter,
      plan_type: event.target.value,
    }));
  };
  const handleChange2 = (event) => {
    setLifeCover(event.target.value);
    setFilter((prevFilter) => ({
      ...prevFilter,
      select_life_cover: event.target.value,
    }));
  };
  const handleChange3 = (event) => {
    setCoverTill(event.target.value);
    setFilter((prevFilter) => ({
      ...prevFilter,
      select_coverage_till: event.target.value,
    }));
  };
  const handleChange4 = (event) => {
    setPaymentFrequency(event.target.value);
    setFilter((prevFilter) => ({
      ...prevFilter,
      payable_mode: event.target.value,
    }));
  };
  const optionsData = [
    {
      label: "Plan Type",
      placeholder: "- Select Plane Type",
      values: viewRequestPolicyOptions.costPlan,
      method: handleChange1,
      value: costPlan,
    },

    {
      label: "Category",
      placeholder: "- Select Category",
      values: viewRequestPolicyOptions.paymentFrequency,
      method: handleChange4,
      value: paymentFrequency,
    },
  ];
  const handlePlanDetailsClick = (id) => {
    history.push({
      pathname: "/insurance-description",
      state: { id: id },
    });
  };

  const [paginationData, setPaginationData] = useState({
    page: 1,
    size: 10,
  });

  const handlePaginationChange = (event, value) => {
    setPaginationData((prevData) => ({
      ...prevData,
      page: value,
    }));
  };

  const [doctorFavorites, setDoctorFavorites] = useState([]);
  const [likeArray, setLikeArray] = useState([]);

  useEffect(() => {
    console.log(viewRequestPolicy);
    let arr = [];
    viewRequestPolicy.map((item) => {
      arr.push({ id: item.policy_id, isLike: item.is_witlisted });
    });
    setLikeArray(arr);
  }, [viewRequestPolicy]);

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
  const markAsFavourite = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "POST",
        url: ApiConfig.markAsInsuranceFav,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          policy_id: id,
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
        url: ApiConfig.removeInsuranceFav,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          policy_id: id,
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
      console.error(
        error?.response?.data?.responseMessage || "Something went wrong"
      );
    }
  };

  const getAllViewRequestPolicyOptions = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig["patient-viewrequest-policy-options"],
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response, "hiiiiiii");
      if (response && response?.data?.ResponseCode === 200) {
        console.log(response?.data?.ResponseData);
        // // toast.success(response?.data?.ResponseMessage);

        const responseData = response?.data?.ResponseData;

        setViewRequestPolicyOptions({
          costPlan: responseData?.planType.map((item) => item.title),
          lifeCover: responseData?.lifeCover.map((item) => item.title),
          coverTill: responseData?.coverageYears.map((item) => item.title),
          paymentFrequency: responseData?.payableMode.map((item) => item.title),
        });

        setIsLoading(false);
        setIsData(true);
      } else {
        toast.error(
          response?.data?.ResponseMessage || "Failed to fetch options"
        );
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(err?.response?.data?.ResponseMessage || "An error occurred");
      setIsLoading(false);
    }
  };
  const getAllViewRequestPolicy = async (filter, page, size) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "GET",
        url: ApiConfig["patient-viewrequest-policy"],
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          ...filter,
          page,
          size,
        },
      });

      if (response && response?.data?.ResponseCode == 200) {
        console.log(response?.data?.ResponseBody);
        // // toast.success(response?.data?.ResponseMessage);

        setViewRequestPolicy(response?.data?.ResponseBody);
        setPaginationData((prevData) => ({
          ...prevData,
          page,
        }));
        setTotalPage(response?.data?.TotalPages);
        setIsLoading(false);
      } else {
        // setIsLoading(false);
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

  // useEffect(() => {
  //   viewRequestPolicy && viewRequestPolicy.map(item=> setDoctorFavorites([...doctorFavorites, { id:item.id, isFavorite: true }]))
  //  },[viewRequestPolicy])
  useEffect(() => {
    getAllViewRequestPolicyOptions();
    getAllViewRequestPolicy(filter, paginationData.page, paginationData.size);
  }, [filter, paginationData.page, paginationData.size]);

  return (
    <Box className={classes.mainBox}>
      <Typography variant="h2">Requested Policies List</Typography>
      <Box className="subBox">
        <Grid container>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <Box className="gridBox">
              <Typography variant="h5">Company Name</Typography>
              <FormControl variant="filled" className={classes.formControl}>
                <TextField
                  placeholder="Search by company name"
                  className={classes.customTextField}
                  variant="outlined"
                  value={filter.insurance_company_name}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      insurance_company_name: e.target.value,
                    })
                  }
                />
              </FormControl>
            </Box>
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <Box className="gridBox">
              <Typography variant="h5">Policy Name</Typography>
              <FormControl variant="filled" className={classes.formControl}>
                <TextField
                  placeholder="Search by policy name"
                  className={classes.customTextField}
                  variant="outlined"
                  value={filter.policy_name}
                  onChange={(e) =>
                    setFilter({ ...filter, policy_name: e.target.value })
                  }
                />
              </FormControl>
            </Box>
          </Grid>

          {optionsData.map((data, index) => (
            <Grid key={index} item lg={3} md={3} sm={6} xs={12}>
              <Box className="gridBox">
                <Typography variant="h5">{data.label}</Typography>
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel id={`demo-simple-select-filled-label-${index}`}>
                    {data.placeholder}
                  </InputLabel>
                  <Select
                    labelId={`demo-simple-select-filled-label-${index}`}
                    id={`demo-simple-select-filled-${index}`}
                    value={data.value}
                    onChange={data.method}
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      getContentAnchorEl: null,
                    }}
                  >
                    <MenuItem value="">None</MenuItem>
                    {data.values &&
                      data.values.map((value, optionIndex) => (
                        <MenuItem key={optionIndex} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          ))}
        </Grid>
        {isLoading && !isData ? (
          <Box style={{ textAlign: "center" }}>
            <CircularProgress />
          </Box>
        ) : viewRequestPolicy.length === 0 ? (
          <Box mx={5} className="displayCenter" style={{ height: "50vh" }}>
            <img src="images/no_data.png" alt="no_data" />
          </Box>
        ) : (
          viewRequestPolicy &&
          viewRequestPolicy.map((data, index) => {
            const fullUrl = data?.image_field
              ? `${mediaUrl}${data.image_field}`
              : "";
            return (
              <Box key={index} className="maxGridBox">
                <Grid container spacing={2}>
                  <Grid item lg={2} md={2} sm={12} xs={12}>
                    <Box className="maxGridInnerBox">
                      <img
                        src={data?.insurance_company_image}
                        alt=""
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Box>
                  </Grid>
                  <Grid item lg={10} md={10} sm={12} xs={12}>
                    <Grid container>
                      <Grid item lg={8} md={8} sm={8} xs={10}>
                        <Box className="maxGridContent">
                          <Box className="maxGridSubContent">
                            <Box>
                              <Typography variant="h6">
                                Claim Settled:
                              </Typography>
                              <Typography variant="h5">
                                {" "}
                                {data.claim_settled || "NA"}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="h6">
                                Coverage Till:
                              </Typography>
                              <Typography variant="h5">
                                {" "}
                                {data.select_coverage_till || "NA"}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="h6">Life Cover:</Typography>
                              <Typography variant="h5">
                                {" "}
                                {data.select_life_cover || "NA"}
                              </Typography>
                            </Box>
                          </Box>
                          <Box className="maxGridSubBox">
                            <Button variant="outlined" className="filterBtn">
                              {" "}
                              ₹ {data.payable_amount} / month{" "}
                            </Button>
                            <Grid
                              item
                              xs={2}
                              style={{ textAlign: "center", cursor: "pointer" }}
                              className="displayCenter"
                              onClick={() => handleFavourite(data?.policy_id)}
                            >
                              <img
                                src={
                                  findLike(data.policy_id)
                                    ? "images/redHeart.png"
                                    : doctorFavorites.find(
                                        (doctor) => doctor.id === data.policy_id
                                      )?.isFavorite
                                    ? "images/redHeart.png"
                                    : "images/Hearts.png"
                                }
                                alt="heart"
                              />
                            </Grid>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item lg={4} md={4} sm={4} xs={2}>
                        <Box
                          style={{ textAlign: "end" }}
                          onClick={() =>
                            handlePlanDetailsClick(data?.policy_id)
                          }
                        >
                          <img src="./images/arrow.png" alt="" />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            );
          })
        )}
        <Grid item xs={12} align="right">
          {totalPage > 1 && (
            <Pagination
              count={totalPage}
              shape="rounded"
              size="small"
              className="pagination"
              page={paginationData.page}
              onChange={handlePaginationChange}
            />
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default RequestPolicy;
