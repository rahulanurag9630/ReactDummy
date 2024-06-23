import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Typography,
  CircularProgress,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import TitlePage from "../DoctorsPage/TitlePage";
import Select from "react-select";
import { InfoOutlined } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import toast from "react-hot-toast";
// import { getApiHandler } from "../../../../config/service";
import { ApiConfig, mediaUrl } from "../../../../config/apiConfig";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "src/context/Auth";
import HospitalCarousel from "../HospitalsPage/HospitalCarousel";

const useStyles = makeStyles((theme) => ({
  viewAll: {
    display: "flex",
    justifyContent: "end",
    marginBottom: "30px",
  },
  InsurancePolicyContainer: {
    // margin: "0px 100px",
    // [theme.breakpoints.down("lg")]: {
    //   margin: "0px 60px",
    // },
    // [theme.breakpoints.down("md")]: {
    //   margin: "0px 30px",
    // },
    // [theme.breakpoints.down("xs")]: {
    //   margin: "0px 15px",
    // },
    "& .MainGrid": {
      alignItems: "end",
      display: "flex",
      marginBottom: "30px",
    },

    "& h6": {
      color: theme.palette.primary.dark,
      marginBottom: "15px",
    },
    // "& .SelectInsuarance": {
    //   "& .css-tj5bde-Svg": {
    //     fill: "black !important",
    //   },
    //   "& .css-13cymwt-control": {
    //     backgroundColor: "#f6f6f6 !important",
    //     height: "55px",
    //     borderRadius: "20px !important",
    //     "& .css-1dimb5e-singleValue": {
    //       color: `${theme.palette.primary.dark} !important`,
    //     },
    //   },
    // },
    "& .whitelist": {
      border: "2px solid var(--Linear, #4D164F)",
      // color: theme.palette.primary.main,
      borderRadius: "30px",
      fontSize: "20px",
      fontWeight: 400,
    },

    "& .insuranceData": {
      border: "1px solid #DFDFDF",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      padding: "15px",
      borderRadius: "23px",
      height: "100%",
      maxHeight: "200px",
      "& .insuranceProfile": {
        width: "100%",
        height: "190px",
        borderRadius: "18px",
        "& img": {
          position: "relative",
          top: "0px",
          width: "100%",
          height: "190px",
          borderRadius: "18px",
          backgroundSize: "cover !important",
          backgroundRepeat: "no-repeat !important",
          // objectFit: "cover !important",
        },
      },
      "& .fullInsBox": {
        paddingLeft: "20px",
        [theme.breakpoints.down("xs")]: {
          paddingLeft: 0,
          paddingTop: "10px",
        },
        "& .displaystart": {
          display: "flex",
          justifyContent: "start",
        },
        "& p": {
          color: "#00000099",
          fontWeight: "300",
        },
        "& h6": {
          color: "#080515",
        },
        "& .priceButton": {
          background: "#F6F6F6",
          color: "#681E65",
          borderRadius: "50px",
          padding: "10px 35px",
        },
      },
    },
    "& .MuiButton-fullWidth": {
      [theme.breakpoints.up("md")]: {
        width: "95%",
      },
    },
    "& .paginationBox": {
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
        marginTop: "10px",
      },
      "& .pagination": {
        width: "fit-content",
        "& button": {
          padding: "7px 14px",
          height: "auto",
          color: theme.palette.primary.light,
        },
        "& .MuiPaginationItem-page.Mui-selected": {
          backgroundColor: theme.palette.primary.main,
          color: "white",
        },
      },
    },
    "& .insurancePolicyStyle": {
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
      "& .displayEnd": {
        marginBottom: "20px",
      },
    },
  },
  customTextField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "20px",
    },
  },
}));
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "2px solid #4D164F",
    borderRadius: "20px",
    color: "black",
    height: "48px",
  }),
  // Styles for the option container
  // option: (provided, state) => ({
  //   ...provided,
  //   backgroundColor: state.isSelected ? "#4D164F" : "white", // background color when option is selected
  //   color: state.isSelected ? "white" : "black", // text color
  // }),
  // Styles for the menu container
  // menu: (provided, state) => ({
  //   ...provided,
  //   backgroundColor: "white", // background color of the dropdown menu
  // }),
  // Styles for the single value container
  // singleValue: (provided, state) => ({
  //   ...provided,
  //   color: "black", // text color
  // }),
};

const InsurancePolicy = () => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const auth = useContext(AuthContext);

  const [costPlan, setCostPlan] = useState(null);
  const [lifeCover, setLifeCover] = useState(null);
  const [coverTill, setCoverTill] = useState(null);
  const [companyName, serCompanyName] = useState(null);
  const [paymentFrequency, setPaymentFrequency] = useState(null);
  const [insurancePolicydata, setInsurancePolicydata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isData, setIsData] = useState(false);
  const [doctorFavorites, setDoctorFavorites] = useState([]);
  const [filter, setFilter] = useState({
    select_life_cover: "",
    select_coverage_till: "",
    plan_type: "",
    payable_mode: "",
    insurance_company_name: "",
    name: "",
  });

  const [paginationData, setPaginationData] = useState({
    page: 1,
    size: 10,
  });
  const [totalPages, setTotalPage] = useState();
  const [insurancePolicyOptions, setInsurancePolicyOptions] = useState({
    costPlan: [],
    lifeCover: [],
    coverTill: [],
    paymentFrequency: [],
  });
  const history = useHistory();

  // const insurancePolicydata = [
  //   {
  //     image: "",
  //   },
  //   {
  //     image: "",
  //   },
  //   {
  //     image: "",
  //   },
  //   {
  //     image: "",
  //   },
  //   {
  //     image: "",
  //   },
  //   {
  //     image: "",
  //   },
  // ];

  // const costPlanOptions = [
  //   { value: "zero", label: "Zero cost plan" },
  //   { value: "basic", label: "Basic plan" },
  //   { value: "premium", label: "Premium plan" },
  // ];

  // const lifeCoverOptions = [
  //   { value: "cover", label: "3 Crore" },
  //   { value: "cover5", label: "5 Crore" },
  //   { value: "cover10", label: "10 Crore" },
  // ];

  // const coverTillOptions = [
  //   { value: "covertill", label: "60 years" },
  //   { value: "cover70", label: "70 years" },
  //   { value: "cover80", label: "80 years" },
  // ];

  // const paymentFrequencyOptions = [
  //   { value: "monthly", label: "Monthly" },
  //   { value: "quarterly", label: "Quarterly" },
  //   { value: "yearly", label: "Yearly" },
  // ];

  const handleCostPlanChange = (selectedOption) => {
    setCostPlan(selectedOption);
    setFilter({ ...filter, plan_type: selectedOption?.value || "" });
  };

  const handleLifeCoverChange = (selectedOption) => {
    setLifeCover(selectedOption);
    setFilter({ ...filter, select_life_cover: selectedOption?.value || "" });
  };

  const handleCoverTillChange = (selectedOption) => {
    setCoverTill(selectedOption);
    setFilter({ ...filter, select_coverage_till: selectedOption?.value || "" });
  };

  const handlePaymentFrequencyChange = (selectedOption) => {
    setPaymentFrequency(selectedOption);
    setFilter({ ...filter, payable_mode: selectedOption?.value || "" });
  };
  const handleWitlistedChange = (selectedOption) => {
    if (filter.witlisted) {
      const newFilter = { ...filter };
      delete newFilter.witlisted;
      setFilter({ ...newFilter });
      return;
    }
    setFilter({ ...filter, witlisted: !filter.witlisted });
  };

  const hospitalsCategories = {
    // name: "INSURANCE",
    title: "Insurance Agencies",
    desc: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
  };

  const getAllInsurancePolicyOptions = async () => {
    try {
      setIsLoading(true);
      const response = await axios({
        method: "GET",
        url: ApiConfig["insurance-policy-options"],
      });

      console.log(response, "hiiiiiii");
      if (response && response?.data?.ResponseCode == 200) {
        console.log(response?.data?.ResponseData);
        // // toast.success(response?.data?.ResponseMessage);
        setInsurancePolicyOptions({
          costPlan: response?.data?.ResponseData?.planType,
          lifeCover: response?.data?.ResponseData?.lifeCover,
          coverTill: response?.data?.ResponseData?.coverageYears,
          paymentFrequency: response?.data?.ResponseData?.payableMode,
        });

        setIsLoading(false);
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

  const getAllInsurancePolicy = async (page, size) => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig["insurance-listing"],
        headers,
        params: { ...filter, page, size },
      });
      setIsLoading(true);
      if (response && response.data?.ResponseCode === 200) {
        // // toast.success(response.data?.ResponseMessage);
        setInsurancePolicydata(response.data?.ResponseBody);
        setTotalPage(response.data?.TotalPages);
        setIsLoading(false);
        setIsData(true);
      } else {
        toast.error(
          response?.data?.ResponseMessage || "Failed to fetch options"
        );
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(
        err?.response?.data?.ResponseMessage || "Something went wrong"
      );
      setIsLoading(false);
    }
  };

  // const getAllInsurancePolicy = async () => {
  //   try {
  //     const response = await getApiHandler("insurance-listing");
  //     console.log(response, "reeeeeeeeeeeeeeeee");
  //     if (response && response.responseCode === 200) {
  //       console.log(response?.responseData);
  //       // toast.success(response?.responseMessage);
  //       setInsurancePolicydata(response?.responseData);
  //       setIsLoading(false);
  //     } else {
  //     }
  //   } catch (err) {
  //     console.log("Error:", err);
  //     toast.error(err?.response?.responseMessage);
  //     setIsLoading(false);
  //   }
  // };
  const handlePlanDetailsClick = (id) => {
    if (auth.userLoggedIn) {
      history.push({
        pathname: "/insurance-description",
        state: { id: id },
      });
    } else {
      history.push("/login");
    }
  };

  const handlePaginationChange = (event, value) => {
    setPaginationData((prevData) => ({
      ...prevData,
      page: value,
    }));
  };
  const handleClear = () => {
    if (
      filter.payable_mode == "" &&
      filter.plan_type == "" &&
      filter.select_coverage_till == "" &&
      filter.select_life_cover == ""
    ) {
      if (filter.witlisted) {
        setFilter({
          select_life_cover: "",
          select_coverage_till: "",
          plan_type: "",
          payable_mode: "",
        });
        setLifeCover("");
        setCoverTill("");
        setPaymentFrequency("");
        setCostPlan("");
        return;
      } else {
        return;
      }
    }

    setFilter({
      select_life_cover: "",
      select_coverage_till: "",
      plan_type: "",
      payable_mode: "",
    });
    setLifeCover("");
    setCoverTill("");
    setPaymentFrequency("");
    setCostPlan("");
  };

  useEffect(() => {
    getAllInsurancePolicyOptions();
    getAllInsurancePolicy(paginationData.page, paginationData.size);
  }, [paginationData.page, paginationData.size, filter]);

  const [likeArray, setLikeArray] = useState([]);

  useEffect(() => {
    console.log(insurancePolicydata);
    let arr = [];
    insurancePolicydata.map((item) => {
      arr.push({ id: item.id, isLike: item.is_witlisted });
    });
    setLikeArray(arr);
  }, [insurancePolicydata]);

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

  return (
    <Box className={classes.InsurancePolicyContainer}>
      <Box>
        <HospitalCarousel bannerType="Insurance" />
        {/* <img
          src="images/insurancedoctor.png"
          alt="insurancedoctor"
          height="431px"
          width="100%"
        /> */}
      </Box>
      <Box className="insurancePolicyStyle">
        <Box mb={3}>
          <TitlePage top={hospitalsCategories} />
        </Box>
        <Box className="displayEnd">
          <Grid
            container
            spacing={1}
            className="MainGrid"
            style={{ flexWrap: "wrap" }}
          >
            <Grid item xs={12} sm={6} md={2}>
              <Box>
                <Typography variant="h6">Company Name</Typography>

                <Box>
                  <FormControl fullWidth>
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
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Box>
                <Typography variant="h6">Policy Name</Typography>

                <Box>
                  <FormControl fullWidth>
                    <TextField
                      placeholder="Search by policy name"
                      className={classes.customTextField}
                      variant="outlined"
                      value={filter.name}
                      onChange={(e) =>
                        setFilter({ ...filter, name: e.target.value })
                      }
                    />
                  </FormControl>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Box>
                <Typography variant="h6">Plan Type</Typography>
                <Box>
                  <FormControl fullWidth>
                    <Select
                      value={costPlan}
                      onChange={handleCostPlanChange}
                      options={insurancePolicyOptions.costPlan.map(
                        (option) => ({
                          value: option.title,
                          label: option.title,
                        })
                      )}
                      styles={customStyles}
                      placeholder="Select cost plan"
                    />
                  </FormControl>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <Box>
                <Typography variant="h6">Payable Mode</Typography>
                <FormControl fullWidth>
                  <Select
                    value={paymentFrequency}
                    onChange={handlePaymentFrequencyChange}
                    options={insurancePolicyOptions.paymentFrequency.map(
                      (option) => ({
                        value: option.title,
                        label: option.title,
                      })
                    )}
                    styles={customStyles}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={1}>
              <Button
                style={{ fontSize: "16px", width: "100%" }}
                fullWidth
                variant="contained"
                color="secondary"
                className="whitelist"
                disabled={
                  filter.select_life_cover.length === 0 &&
                  filter.select_coverage_till.length === 0 &&
                  filter.plan_type.length === 0 &&
                  filter.payable_mode.length === 0 &&
                  filter.witlisted === false
                }
                onClick={handleClear}
              >
                Clear
              </Button>
            </Grid>
            {auth.userLoggedIn && (
              <Grid item xs={12} sm={6} md={2}>
                <Button
                  fullWidth
                  style={{ fontSize: "16px", width: "100%" }}
                  variant="contained"
                  color="secondary"
                  className="whitelist"
                  onClick={handleWitlistedChange}
                >
                  Wishlist Insurance
                </Button>
              </Grid>
            )}
            <Grid item xs={12} sm={6} md={1}>
              <Box>
                {insurancePolicydata.length > 0 && (
                  <Button
                    style={{
                      fontSize: "13px",
                      padding: "15px 0px",
                      width: "100%",
                    }}
                    variant="contained"
                    color="primary"
                    onClick={() => history.push("/all-insurance")}
                  >
                    View All
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* <Grid xs={12} sm={12}  className={classes.viewAll} fullWidth>
                {!isLoading && insurancePolicydata.length > 0 && (
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => history.push("/all-insurance")}
                    >
                      View All
                    </Button>
                  </Box>
                )}
             

           <Grid item xs={12} sm={12}>
              <Box className="displayEnd paginationBox">
                <Pagination
                  count={totalPages}
                  shape="rounded"
                  size="small"
                  className="pagination"
                  page={paginationData.page}
                  onChange={handlePaginationChange}
                />
              </Box>
            </Grid> 
            </Grid> */}

        <Box mb={8}>
          <Grid container spacing={3}>
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
                <CircularProgress
                  style={{ display: "flex", justifyContent: "center" }}
                />
              </div>
            ) : insurancePolicydata.length === 0 ? (
              <Grid item xs={12} style={{ textAlign: "center" }}>
                {/* <Typography variant="body1">No data found</Typography> */}
                <Box mx={5} className="displayCenter">
                  <img src="images/no_data.png" alt="no_data" />
                </Box>
              </Grid>
            ) : (
              insurancePolicydata.map((item) => {
                // const fullUrl = item?.image_field ? `${mediaUrl}${item.image_field}` : "";
                return (
                  <Grid item xs={12} sm={12} md={6} key={item.id}>
                    <Box className="insuranceData">
                      <Grid container>
                        <Grid item xs={12} sm={4}>
                          <Box className="insuranceProfile">
                            <img src={item?.company_image} alt="Bed" />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <Box className="fullInsBox">
                            <Box>
                              <Box>
                                <Box className="displaySpacebetween">
                                  <Box className="displaystart">
                                    <Typography
                                      variant="body2"
                                      className="claim1"
                                    >
                                      Claim Settled: &nbsp;
                                    </Typography>
                                    <Typography variant="h6" className="claim2">
                                      {item.claim_settled}
                                    </Typography>
                                  </Box>
                                  <Box>
                                    <Button className="priceButton">
                                      ₹ {item.claim_settled} / month
                                    </Button>
                                  </Box>
                                </Box>

                                <Box className="displaystart">
                                  <Typography
                                    variant="body2"
                                    className="claim1"
                                  >
                                    Coverage Till: &nbsp;
                                  </Typography>
                                  <Typography variant="h6" className="claim2">
                                    {item.select_coverage_till}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                            <Box className="displaystart">
                              <Typography variant="body2" className="claim1">
                                Life Cover: &nbsp;
                              </Typography>
                              <Typography variant="h6">
                                {item.select_life_cover}
                              </Typography>
                            </Box>

                            <Box
                              style={{ marginTop: "19px" }}
                              className="displaySpacebetween"
                            >
                              <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                style={{ fontSize: "20px" }}
                                onClick={() => handlePlanDetailsClick(item?.id)}
                              >
                                Plan Details
                              </Button>
                              <Grid
                                item
                                xs={2}
                                style={{
                                  textAlign: "center",
                                  cursor: "pointer",
                                }}
                                className="displayCenter"
                                onClick={() => handleFavourite(item?.id)}
                              >
                                <img
                                  style={{ marginTop: "5px" }}
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
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                );
              })
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default InsurancePolicy;
