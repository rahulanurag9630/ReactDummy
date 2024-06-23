import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { CloseOutlined } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { getApiHandler } from "src/config/service";

import axios from "axios";
import toast from "react-hot-toast";
import { ApiConfig } from "src/config/apiConfig";
import { Grid } from "react-feather";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  CookiesPolicyContainer: {
    marginBottom: "72px",
    "& .cookiesPolicy": {
      "& h2": {
        color: theme.palette.text.primary,
        fontSize: "40px",
        fontWeight: 600,
        marginBottom: "16px",
      },
      "& h3": {
        color: theme.palette.text.primary,
        marginBottom: "18px",
      },
      "& p": {
        color: theme.palette.primary.light,
        marginBottom: "22px",
      },
    },
    "& .loremIpsum": {
      color: theme.palette.primary.dark,
      "& h3": {
        fontWeight: 600,
        marginBottom: "20px",
      },
      "& p": {
        marginBottom: "27px",
      },
      "& ul, & ol": {
        paddingInlineStart: "17px",
        "& li": {
          "& p": {
            color: theme.palette.primary.light,
            marginBottom: "16px",
          },
        },
      },
    },
    "& .description": {
      fontWeight: 400,
      marginBottom: "15px",
      fontFamily: "Outfit",
      fontSize: " 16px",
      lineHeight: "24px",
      letterSpacing: " 0em",
      textAlign: "justify",
      color: "#00000099",
    },
  },
  DialogBoxCookies: {
    "& .MuiDialog-paperWidthXs": {
      maxWidth: "496px",
    },
    "& svg": {
      color: "rgba(32, 33, 35, 0.51)",
      cursor: "pointer",
    },
    "& a": {
      fontWeight: "100 !important",
    },
    "& .DialogContentC": {
      padding: "20px",
      "& h5": {
        color: "#000",
        fontWeight: 400,
        marginBottom: "20px",
      },
      "& p": {
        color: theme.palette.primary.light,
        marginBottom: "20px",
      },
      "& .btnCookieDialog": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
          flexWrap: "wrap",
        },
        "& .allowCookiesBtn": {
          marginLeft: "10px",
          [theme.breakpoints.down("sm")]: {
            marginTop: "10px",
            marginLeft: "0px",
          },
        },
      },
    },
  },
}));
const CookiesPolicy = ({ cookieData }) => {
  const [cookie, setCookie] = useState(cookieData);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const [cookiesOpen, setCookiesOpen] = useState(true);
  const [isdata, setisdata] = useState(false);

  const handleDialogClose = () => {
    setCookiesOpen(false);
    // setisdata(false)
  };

  // const getCookiePolicy = async () => {
  //   setIsDataLoading(true);
  //   const res = await getApiHandler("Cookie-policy");
  //   console.log(res, "dddddddddddddddd");
  //   setIsDataLoading(false);

  //   if (!res) {
  //     return;
  //   }
  //   console.log(res?.data, "dhwjdghwjg");
  //   setCookie(res?.responseBody?.length > 0 ? res?.responseBody[0] : {});
  //   // setisdata(true)
  // };

  // const getCookiePolicy = async () => {
  //   setIsDataLoading(true);
  //   const res = await getApiHandler("Cookie-policy");
  //   console.log(res, "dddddddddddddddd");
  //   setIsDataLoading(false);
  //   if (!res) {
  //     return;
  //   }
  //   console.log(res?.data, "dhwjdghwjg");
  //   setCookie(res?.responseBody?.length > 0 ? res?.responseBody[0] : {});
  // };

  useEffect(() => {
    if (localStorage.getItem("allowCookie") == "true") {
      setCookiesOpen(false);
    }

    // getCookiePolicy();
    window.scrollTo({ top: 0, behavior: "smooth" });
    // localStorage.setItem(cookie, true);
  }, []);

  const [htmlString, setHtmlString] = useState("");

  useEffect(() => {
    const truncatedText = cookie?.text ? cookie.text.slice(0, 780) + "..." : "";
    const newHtmlString = cookie?.text
      ? `${truncatedText} <span id="read-more" style="color: blue; cursor: pointer;">Read more</span>`
      : "NA";
    setHtmlString(newHtmlString);
  }, [cookie]);

  useEffect(() => {
    const readMoreElement = document.getElementById("read-more");
    if (readMoreElement) {
      // setisdata(flase)
      readMoreElement.onclick = () => window.open("/cookies-policy", "_blank");
    }
  }, [htmlString, history]);

  useEffect(() => {
    const readMoreElement = document.getElementById("read-more");
    if (readMoreElement) {
      // setisdata(flase)
      readMoreElement.onclick = () => history.push("/cookies-policy");
    }
  }, [htmlString, history]);

  return (
    <Container maxWidth="xlg" className={classes.CookiesPolicyContainer}>
      {/* <Box sx={{ paddingX: { md: "144px", xs: "30px" } }} py={4} className="cookiesPolicy" mt={8}>
          {isDataLoading ? (
            <Grid container justifyContent="center" alignItems="center">
              <CircularProgress />
            </Grid>
          ) : (
            <>
              <Typography variant="h2">Our Cookies Policy</Typography>
              <Typography variant="body2">
                <Box className="description"
                  dangerouslySetInnerHTML={{
                    __html: cookie?.text
                      ? cookie?.text
                      : "NA",
                  }}
                />
              </Typography>
            </>
          )}
        </Box> */}

      <Dialog
        open={cookiesOpen}
        onClose={handleDialogClose}
        className={classes.DialogBoxCookies}
        maxWidth="xs"
        fullWidth
      >
        <Box className="DialogContentC">
          <Box className="displayEnd">
            <CloseOutlined onClick={handleDialogClose} />
          </Box>
          <Typography variant="h5">We value your Privacy</Typography>
          {/* <Typography variant="body2" className="descDialog">
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used.In publishing and graphic design, Lorem ipsum is a
            placeholder text is a commonly fine to the used.Lorem ipsum is a
            placeholder text is a commonly fine to the ipsum is a placeholder
            text ipsum is a placeholder text used.
          </Typography> */}

          {isDataLoading ? null : ( // </Grid> //   <CircularProgress /> // <Grid container justifyContent="center" alignItems="center">
            <>
              <Typography variant="body2">
                <Box
                  className="description"
                  dangerouslySetInnerHTML={{
                    __html: htmlString || "NA",
                  }}
                />
              </Typography>
            </>
          )}

          <Box className="btnCookieDialog">
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleDialogClose}
            >
              Deny Cookies
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className="allowCookiesBtn"
              onClick={() => {
                Cookies.set("allowCookie", "true");
                localStorage.setItem("allowCookie", "true");

                handleDialogClose();
              }}
            >
              Allow Cookies
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
};

export default CookiesPolicy;
