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
    "& .DialogContentC": {
      padding: "30px",
      "& h5": {
        color: "#000",
        fontWeight: 400,
        marginBottom: "20px",
      },
      "& p": {
        color: theme.palette.primary.light,
        marginBottom: "20px",
        textAlign: "center",
      },
      "& .btnCookieDialog": {
        gap: "14.09px",
      },
      "& .MuiButton-containedPrimary": {
        height: "49px",
        borderRadius: "50px",
        width: "20%",
        fontSize: "18px",
      },
      "& .MuiButton-outlinedPrimary": {
        border: `1.5px solid ${theme.palette.primary.main}`,
        height: "49px",
        borderRadius: "50px",
        width: "20%",
        fontSize: "18px",
        color: theme.palette.primary.main,
        "&:hover": {
          background: "transparent",
        },
      },
    },
  },
}));

const CookiesPolicy = ({ responseByAdmin, ok, cancel, token }) => {
  const [cookie, setCookie] = useState([{}]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const [cookiesOpen, setCookiesOpen] = useState(true);
  const [isdata, setisdata] = useState(false);

  // const handleDialogClose = () => {
  //   setCookiesOpen(false);
  //   // setisdata(false)
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

  // useEffect(() => {
  //   if (localStorage.getItem("allowCookie") == "true") {
  //     setCookiesOpen(false);
  //   }

  //   getCookiePolicy();
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  //   // localStorage.setItem(cookie, true);
  // }, []);

  // const [htmlString, setHtmlString] = useState("");

  // useEffect(() => {
  //   const truncatedText = cookie?.text ? cookie.text.slice(0, 800) : "";
  //   const newHtmlString = cookie?.text
  //     ? `${truncatedText} <span id="read-more" style="color: blue; cursor: pointer;">Read more</span>`
  //     : "NA";
  //   setHtmlString(newHtmlString);
  // }, [cookie]);

  // useEffect(() => {
  //   const readMoreElement = document.getElementById("read-more");
  //   if (readMoreElement) {
  //     // setisdata(flase)
  //     readMoreElement.onclick = () => history.push("/cookies-policy");
  //   }
  // }, [htmlString, history]);

  
  return (
    <Dialog
      open={true}
      className={classes.DialogBoxCookies}
      maxWidth="xs"
      fullWidth
    >
      <Box className="DialogContentC">
        <Typography
          variant="h4"
          style={{ textAlign: "center", marginBottom: "16px" }}
        >
          Account Status
        </Typography>

        <Typography
          variant="body2"
          style={{ marginBottom: "16px" }}
          className="displayCenter descDialog"
        >
          {responseByAdmin.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Typography>

        {/* {isDataLoading ? (
            // <Grid container justifyContent="center" alignItems="center">
            //   <CircularProgress />
            // </Grid>
            null
                 ) : (
            <>
             
              <Typography variant="body2">
                <Box
                  className="description"
                  dangerouslySetInnerHTML={{
                    __html: htmlString || 'NA',
                  }}
          
                  
                  
                  
                
                />
                
              </Typography>
            </>
          )} */}

        <Box className="displayCenter btnCookieDialog">
          {cancel && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                history.push("/");
              }}
            >
              Cancel
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              //   localStorage.setItem("allowCookie", "true");
              //   handleDialogClose();
              if (ok === "/editdoctorprofile") {
                localStorage.setItem("userRole", "DOC");
                localStorage.setItem("token", token);
              }
              history.push(ok);
            }}
          >
            Ok
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CookiesPolicy;
