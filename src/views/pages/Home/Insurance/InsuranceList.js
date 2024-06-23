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
import GoBack from "src/component/GoBack";

const useStyles = makeStyles((theme) => ({
  InsurancePolicyContainer: {
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

    "& .MainGrid": {
      alignItems: "end",
      display: "flex",
      marginBottom: "30px",
    },

    "& h6": {
      color: theme.palette.primary.dark,
      marginBottom: "15px",
    },
    "& .SelectInsuarance": {
      "& .css-tj5bde-Svg": {
        fill: "black !important",
      },
      "& .css-13cymwt-control": {
        backgroundColor: "#f6f6f6 !important",
        height: "55px",
        borderRadius: "20px !important",
        "& .css-1dimb5e-singleValue": {
          color: `${theme.palette.primary.dark} !important`,
        },
      },
    },
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
      "& .insuranceProfile": {
        width: "100%",
        height: "212px",
        borderRadius: "15px",
        "& img": {
          position: "relative",
          top: "0px",
          width: "100%",
          height: "212px",
          borderRadius: "15px",
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
        "& .fullInsBox1": {
          marginBottom: "13px",
          "& > div": {
            gap: "15px",
            "& .claim1": {
              color: theme.palette.text.secondary,
            },
            "& .claim2": {
              color: "rgba(8, 5, 21, 0.87)",
              fontSize: "14px",
              fontWeight: 600,
            },
          },
          "& svg": {
            color: theme.palette.primary.main,
            background: "#F6F6F6",
          },
        },
        "& .fullInsBox2": {
          marginBottom: "20px",
          "& .claim1": {
            color: theme.palette.text.secondary,
          },
          "& .claim2": {
            color: "rgba(8, 5, 21, 0.87)",
            fontSize: "14px",
            fontWeight: 600,
          },
        },
        "& .fullInsBox3": {
          marginBottom: "22px",
          color: theme.palette.primary.dark,
        },
        "& .fullInsBox4": {
          gap: "10px",
        },
        "& button": {
          width: "89%",
          border: "2px solid #4D164F",
          borderRadius: "30px",
          // color: theme.palette.primary.main,
          fontSize: "20px",
          fontWeight: 400,
          padding: 0,
        },
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
  },

  CategoryContainer: {
    padding: "45px 0px 0px",
    "& .categoryTitles": {
      "& h5": {
        textAlign: "center",
        marginBottom: "16px",
        color: theme.palette.primary.main,
        letterSpacing: "5.06px",
        fontSize: "22px",
      },
      "& h2": {
        textAlign: "center",
        marginBottom: "18px",
        fontFamily: "Calistoga",
        color: theme.palette.text.primary,
      },
      "& h6": {
        textAlign: "center",
        marginBottom: "39px",
        color: "rgba(8, 5, 21, 0.60)",
        width: "100%",
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
};

const InsuranceList = () => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const auth = useContext(AuthContext);

  const [costPlan, setCostPlan] = useState(null);
  const [lifeCover, setLifeCover] = useState(null);
  const [coverTill, setCoverTill] = useState(null);
  const [paymentFrequency, setPaymentFrequency] = useState(null);
  const [insurancePolicydata, setInsurancePolicydata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
    history.push({
      pathname: "/insurance-description",
      state: { id: id },
    });
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

  return (
    <Box className={classes.InsurancePolicyContainer}>
      <Box mb={3}>
        <Container maxWidth="xlg" className={`${classes.CategoryContainer} `}>
          <Box className="categoryTitles displayColumnCenter">
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
              <GoBack />{" "}
              <Typography variant="h2">{hospitalsCategories.title}</Typography>{" "}
              <Box></Box>
            </Box>

            <Container>
              <Typography variant="h6">{hospitalsCategories.desc}</Typography>
            </Container>
          </Box>
        </Container>
      </Box>
      <Box mt={5} className="displayEnd">
        <Grid
          container
          spacing={2}
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
                    options={insurancePolicyOptions.costPlan.map((option) => ({
                      value: option.title,
                      label: option.title,
                    }))}
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
              fullWidth
              variant="contained"
              color="secondary"
              className="whitelist"
              onClick={handleClear}
            >
              Clear
            </Button>
          </Grid>
          {auth.userLoggedIn && (
            <Grid item xs={12} sm={6} md={3}>
              <Box className="displayEnd">
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className="whitelist"
                  onClick={handleWitlistedChange}
                >
                  Wishlist Insurance
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>

      <Box>
        <Grid container spacing={3}>
          {isLoading ? (
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
                          <Box className="displaySpacebetween fullInsBox1">
                            <Box className="displayStart">
                              <Box>
                                <Typography variant="body1" className="claim1">
                                  Claim Settled
                                </Typography>
                                <Typography variant="body1" className="claim2">
                                  {item.claim_settled}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="body1" className="claim1">
                                  Coverage Till:
                                </Typography>
                                <Typography variant="body1" className="claim2">
                                  {item.select_coverage_till}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          <Box className="fullInsBox2">
                            <Typography variant="body1" className="claim1">
                              Life Cover
                            </Typography>
                            <Typography variant="body1" className="claim2">
                              {item.select_life_cover}
                            </Typography>
                          </Box>
                          <Box className="fullInsBox3">
                            <Typography variant="h4">
                              ₹ {item.claim_settled} / month{" "}
                            </Typography>
                          </Box>
                          <Box className="fullInsBox4 displaySpacebetween">
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handlePlanDetailsClick(item?.id)}
                            >
                              Plan Details
                            </Button>
                            <Grid
                              item
                              xs={2}
                              style={{ textAlign: "center", cursor: "pointer" }}
                              className="displayCenter"
                              onClick={() => handleFavourite(item?.id)}
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

        <Box mt={6} mb={8}>
          <Grid container>
            {/* <Grid item xs={12} sm={6}>
                <Box>
                  <Button variant="contained">View All</Button>
                </Box>
              </Grid> */}

            <Grid item xs={12} sm={12}>
              {totalPages > 1 && (
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
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default InsuranceList;
