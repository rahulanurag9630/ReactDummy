import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { CiMail } from "react-icons/ci";
import axios from "axios";
import { ApiConfig } from "src/config/apiConfig";
import toast from "react-hot-toast";

const useStyles = makeStyles((theme) => ({
  slideContainer: {
    position: "relative",
    backgroundImage: "url(images/HaveQue.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "396px",
    [theme.breakpoints.only("xs")]: {
      height: "450px",
    },
    // "& h2, & p": {
    //   color: "white",
    //   textAlign: "center",
    // },
  },
  overlayBox: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    "& > div": {
      gap: "15px",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
    "& h5": {
      textAlign: "center",
      color: "rgba(255, 255, 255, 0.6)",
      fontWeight: 400,
      lineHeight: "30px",
      margin: "18px 0px 41px 0px",
    },
    "& h2": {
      fontFamily: "Calistoga",
      color: "#fff",
      textAlign: "center",
    },
    "& h3": {
      fontSize: "32px",
      fontWeight: 400,
      color: theme.palette.background.default,
      textAlign: "center",
      width: "70%",
    },
    "& p": {
      fontFamily: "Calistoga",
    },
    "& .alignTop": {
      display: "flex",
      gap: "10px",
      alignItems: "flex-start",
      justifyContent: "center",
    },

    "& .customTextField": {
      marginRight: "16px",
      width: "100%",
      maxWidth: "500px",
      border: "none",
      [theme.breakpoints.only("xs")]: {
        maxWidth: "600px",
      },
      "& .MuiOutlinedInput-root , & .MuiOutlinedInput-root:hover": {
        borderRadius: "50px",
        background: "#FFF",
      },
      "& .MuiInputBase-input": {
        fontFamily: "Outfit",
        fontSize: "16px",
      },
    },
    "& button": {
      width: "160px",
      color: theme.palette.background.default,
      fontWeight: 400,
      padding: "15px 20px",
      borderRadius: "50px",
      background: "rgba(255, 255, 255, 0.10)",
      height: "49px",
      fontFamily: "Sora",
      fontSize: "19px",
      boxShadow: "none !important",
      border: "1px solid rgba(255, 255, 255, 0.25)",
      "&:hover": {
        background: "rgba(255, 255, 255, 0.10)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "13px",
      },
    },
  },
}));

const HaveQue = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const subscribeUser = async () => {
    if (!validateEmail()) return;
    setIsLoading(true);
    try {
      const res = await axios.post(ApiConfig.subscribe, { email });
      if (res.status === 201) {
        setSubscribeSuccess(true);
        toast.success(res.data.ResponseMessage);
        setEmail("");
      } else {
        setError("Subscription failed");
        toast.error(res.data.ResponseMessage);
      }
    } catch (error) {
      console.log("errorerrorerror=-=-=-", error);
      toast.error(error.response.data.ResponseMessage);
      setError("An error occurred while subscribing");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box mt={11}>
      <div className={`${classes.slideContainer} displayCenter`}>
        <Container className={`${classes.overlayBox}`}>
          <Typography variant="h2">Stay Updated & Never Miss Out !</Typography>
          <Typography variant="h5">
            Subscribe to our newsletter for exclusive updates, offers, and
            insights delivered straight to your inbox.
          </Typography>
          <Container>
            <Box className="alignTop">
              <Box>
                <TextField
                  placeholder="Enter your email..."
                  className={`customTextField `}
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CiMail fontSize="24px" color="#681E65" />
                      </InputAdornment>
                    ),
                  }}
                />
                {/* {subscribeSuccess && (
                  <Typography
                    variant="body1"
                    style={{
                      color: "green",
                      marginTop: "5px",
                      fontSize: "10px",
                      marginLeft: "10px",
                    }}
                  >
                    Subscription successful!
                  </Typography>
                )} */}
                {emailError && (
                  <Typography
                    style={{ fontSize: "10px", marginLeft: "10px" }}
                    variant="body1"
                    color="error"
                  >
                    {emailError}
                  </Typography>
                )}
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={subscribeUser}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Subscribe"}
              </Button>
            </Box>
          </Container>
        </Container>
      </div>
    </Box>
  );
};

export default HaveQue;
