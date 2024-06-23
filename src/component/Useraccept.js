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
  import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
  import axios from "axios";
  import toast from "react-hot-toast";
  import { ApiConfig } from "src/config/apiConfig";
  import { Grid } from "react-feather";
  
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
        //   color: theme.palette.primary.light,
          color:'black',
          marginBottom: "20px",
          textAlign: 'center',
          fontSize: '20px',
          lineHeight: '25px',
        },
        "& .btnCookieDialog": {
          gap: "14.09px",
        },
        "& .MuiButton-containedPrimary": {
          height: "58px",
          borderRadius: "50px",
          width: "50%",
          fontSize: "16px",
        },
        "& .MuiButton-outlinedPrimary": {
          border: `1.5px solid ${theme.palette.primary.main}`,
          height: "58px",
          borderRadius: "50px",
          width: "50%",
          fontSize: "16px",
          color: theme.palette.primary.main,
          "&:hover": {
            background: "transparent",
          },
        },
      },
    },
  }));
  const CookiesPolicy = () => {
    const [cookie, setCookie] = useState([{}]);
    const [isDataLoading, setIsDataLoading] = useState(false);
  
    const classes = useStyles();
    const [cookiesOpen, setCookiesOpen] = useState(true);
    const history = useHistory();
  
  
  
  
 


    
    return (

    
        <Dialog
          open={true}
        //   onClose={handleDialogClose}
          className={classes.DialogBoxCookies}
          maxWidth="xs"
          fullWidth
        >
          <Box className="DialogContentC" >
          <Box style={{ textAlign: "center" }} mb={3}>
              <img
                src="./images/Group.png"
                style={{ width: "100%", maxWidth: "200px" }}
                alt=""
              />
            </Box>
            
            <Typography variant="body2" className="descDialog"  >
            OTP verified successfully. Your new password has been sent to your email.
              
            </Typography>
            <Box className="btnCookieDialog" style={{display:'flex',justifyContent:'center'}} mt={3}>
             
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    history.push("/login")
                //   sessionStorage.setItem("allowCookie", "true");
                //   handleDialogClose();
                }}
              >
                OK      
              </Button>
            </Box>
          </Box>
        </Dialog>
    
    );
  };
  
  export default CookiesPolicy;
  