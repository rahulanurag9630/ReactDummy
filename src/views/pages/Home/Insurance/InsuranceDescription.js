import { ApiConfig, mediaUrl } from "src/config/apiConfig";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "src/context/Auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import PurchaseDialog from "src/component/PurchaseModal";
// import { UserContext } from "@/context/User";

const useStyles = makeStyles((theme) => ({
  insDescContainer: {
    "& button": {
      fontWeight: 400,
      fontSize: "18px",
      width: "fit-content",
      padding: "19px 30px",
      height: "52px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "14px",
        padding: "19px 20px",
      },
    },
    "& > div": {
      border: "1.5px solid #DFDFDF",
      borderRadius: "23px",
      padding: "25px 33px 30px 27px",
      "& .imgBoxLeft": {
        width: "100%",
        height: "240px",
        borderRadius: "18px",
        position: "relative",
        top: "0px",
        backgroundSize: "cover !important",
        backgroundRepeat: "no-repeat !important",
        // objectFit: "cover !important",
      },
      "& .rightUpIns": {
        paddingLeft: "25px",
        [theme.breakpoints.down("sm")]: {
          marginTop: "24px",
        },
        [theme.breakpoints.down("xs")]: {
          paddingLeft: 0,
        },
        "& .priceButton": {
          background: "#F6F6F6",
          color: "#681E65",
          borderRadius: "50px",
        },
        "& h4": {
          color: theme.palette.primary.dark,
          marginBottom: "20px",
        },
        "& .ratingBox": {
          gap: "8px",
          marginBottom: "21.6px",
          "& .rateCount": {
            color: theme.palette.text.secondary,
            borderLeft: `1px solid #D1D1D1`,
            paddingLeft: "8px",
            fontFamily: "Outfit",
          },
        },
        "& .serviceAddressIn": {
          gap: "8px",
          marginRight: "32px",
          "& p": {
            fontWeight: 500,
            color: "#08051599",
            width: "100%",
            maxWidth: "280px",
          },
        },

        "& .infoInsBox": {
          "& p": {
            color: "#00000099",
            marginBottom: "15px",
          },
          "& h5": {
            color: theme.palette.primary.dark,
            fontWeight: 600,
          },
        },
      },
      "& .aboutInsBox": {
        "& h4": {
          color: theme.palette.primary.dark,
          lineHeight: "36.212px",
          marginBottom: "13px",
        },
        "& p": {
          color: theme.palette.text.secondary,
        },
      },
    },
    "& .serviceRatings": {},
    "& .addressAndMob": {
      [theme.breakpoints.down("sm")]: {
        flexWrap: "wrap",
      },
      "& .serviceAddressIn": {
        margin: "10px 0px",
      },
    },
  },
}));

const InsuranceDescription = () => {
  const [insurancePolicydata, setInsurancePolicydata] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const location = useLocation();
  const id = location?.state?.id;
  const auth = useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles();

  const brokerData = [
    {
      title: "Claim Settled",
      value: "97.8%",
    },
    {
      title: "Coverage Till",
      value: "60 Yrs",
    },
    {
      title: "Life Cover",
      value: "$ 3 Cr.",
    },
    {
      title: "Plan Type",
      value: "Zero Cost Plan",
    },
    {
      title: "Payable  Amount",
      value: "$1,828 / month",
    },
  ];

  const apiDataMapping = {
    claim_settled: "Claim Settled",
    select_coverage_till: "Coverage Till",
    select_life_cover: "Life Cover",
    plan_type: "Plan Type",
    // payable_amount: "Payable Amount",
  };

  const insuranceDescriptionById = async (id) => {
    console.log(id);

    try {
      const response = await axios({
        method: "GET",
        url: `${ApiConfig.insuranceDescription}${id}/`,
      });
      if (response && response?.data?.responseCode === 200) {
        console.log(response?.data?.responseData);
        // toast.success(response?.data?.responseMessage);
        setInsurancePolicydata(response?.data?.responseData);
        setIsLoading(false);
      } else {
        toast.error(
          response?.data?.ResponseMessage || "Failed to fetch options"
        );
      }
    } catch {}
  };
  const purchasePolicy = async () => {
    setIsLoading(true);
    if (!auth.userLoggedIn) {
      history.push("/login");
    } else {
      try {
        const token = localStorage.getItem("token");
        const response = await axios({
          method: "POST",
          url: ApiConfig.purchasePolicy,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            policy_id: id,
          },
        });

        if (response && response?.data?.ResponseCode === 201) {
          // toast.success(response?.data?.ResponseMessage);
          setDialogOpen(true);
          // history.push("/requestpolicy");
        } else {
          console.error(
            response?.data?.responseMessage || "Something went wrong"
          );
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(error?.response?.data?.responseMessage);
        console.error(
          error?.response?.data?.responseMessage || "Something went wrong"
        );
        history.push("/requestpolicy");
      }
    }
  };
  const markAsFavourite = async (id) => {
    console.log(id, "id");
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
  useEffect(() => {
    insuranceDescriptionById(id);
  }, [id]);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  return (
    <Container className={classes.insDescContainer}>
      <Box mb={13.8} mt={3.8}>
        <Grid container>
          <Grid item xs={12} sm={12} md={3}>
            {/* <img
              src="images/Healthcare.png"
              alt="health"
              className="imgBoxLeft"
            /> */}
            <img
              src={
                insurancePolicydata?.image_field
                  ? `${insurancePolicydata?.image_field}`
                  : "images/default.jpg"
              }
              className="imgBoxLeft"
              alt=""
            />
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <Box className="rightUpIns">
              <Box className="displaySpacebetween">
                <Typography variant="h4">
                  {insurancePolicydata?.name || "--"}
                </Typography>
                <Button className="priceButton">
                  ₹ {insurancePolicydata.payable_amount || "--"} / month
                </Button>
              </Box>

              <Box className="serviceRatings displayStart">
                {/* {insurancePolicydata.rating ? (
                  <Rating
                    name="read-only"
                    value={parseFloat(insurancePolicydata.rating)}
                    readOnly
                  />
                ) : (
                  "No ratings available"
                )}
                <Typography variant="body2">
                  {insurancePolicydata.ratingCount}
                </Typography> */}
                {insurancePolicydata.rating ? (
                  <Rating
                    name="read-only"
                    value={parseFloat(insurancePolicydata.rating)}
                    readOnly
                  />
                ) : (
                  "No ratings available"
                )}
                <Typography variant="body2" style={{ color: "#08051599" }}>
                  {` | ${insurancePolicydata.rating}`}
                </Typography>
              </Box>

              <Box my={3} className="addressAndMob displayStart">
                <Box className="serviceAddressIn displayStart">
                  <img src="images/phonecall.svg" alt="call" />
                  <Typography variant="body1">
                    {insurancePolicydata.mobile_number || "--"}
                  </Typography>
                </Box>
                <Box className="serviceAddressIn displayStart">
                  <img src="images/gps.svg" alt="gps" />
                  <Typography variant="body1">
                    {insurancePolicydata?.address || "--"}
                  </Typography>
                </Box>
              </Box>
              <Box mt={3}>
                <Grid container spacing={1}>
                  {Object.keys(apiDataMapping).map((key, index) => (
                    <Grid
                      item
                      md={2}
                      sm={4}
                      xs={6}
                      // sm={index === 1 || index === 4 ? 6 : 4}
                      // md={index === 3 || index === 4 ? 3 : 2}
                      key={index}
                    >
                      <Box className="infoInsBox">
                        <Typography variant="body2">
                          {apiDataMapping[key]}
                        </Typography>
                        {key === "payable_amount" &&
                        insurancePolicydata["payable_mode"] ? (
                          <Typography variant="h6">
                            {`${insurancePolicydata[key]} ${insurancePolicydata["payable_mode"]}`}
                          </Typography>
                        ) : key === "select_life_cover" ? (
                          <Typography variant="h6">
                            ₹ {insurancePolicydata[key] || "--"}
                          </Typography>
                        ) : (
                          <Typography variant="h6">
                            {insurancePolicydata[key] || "--"}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box mt={4.3} mb={4.1} className="aboutInsBox">
          <Typography variant="h5">About</Typography>
          <Typography variant="body2" style={{ wordBreak: "break-word" }}>
            {insurancePolicydata?.about_insurance || "--"}
          </Typography>
        </Box>
        <Box className="displayEnd">
          <Button
            variant="contained"
            color="primary"
            onClick={purchasePolicy}
            disabled={isLoading}
          >
            Purchase Policy
            {isLoading && (
              <CircularProgress
                size={20}
                style={{ color: "#fff", marginLeft: "10px" }}
              />
            )}
          </Button>
        </Box>
      </Box>
      <PurchaseDialog open={dialogOpen} handleClose={handleDialogClose} />
    </Container>
  );
};

export default InsuranceDescription;
