import React, { useContext } from "react";

import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  ListItem,
  List,
  Link,
  IconButton,
  Divider,
} from "@material-ui/core";

// import { UserContext } from 'src/context/User'
import { useHistory, Link as RouterLink } from "react-router-dom";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";


const useStyles = makeStyles((theme) => ({
  footerSection: {
    background: "#161E29",
    position: "relative",
    padding: "60px 0px 0",
    zIndex: "2",
    overflow: " hidden",
    "& > :first-child": {
      padding: "0 100px 20px",
      [theme.breakpoints.down("lg")]: {
        padding: "0 60px 20px",
      },
      [theme.breakpoints.down("md")]: {
        padding: "0 30px 20px",
      },
      [theme.breakpoints.down("xs")]: {
        padding: "0 15px 20px",
      },
    },
    "& .footerContent": {
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.down("sm")]: {
        flexWrap: "wrap",
      },
    },
    "& .footerContentBox": {
      "& p": {
        fontFamily: "Calistoga",
        color: theme.palette.background.default,
        letterSpacing: "0.478px",
      },
      "& .logosideSubHeading": {
        fontSize: "7.785px",
        color: "rgba(255, 255, 255, 0.60)",
        fontFamily: "Outfit",
      },
      "& .footBelowLogoTypo": {
        fontWeight: 300,
        width: "360px",
      },
      maxWidth: "243px",
      [theme.breakpoints.down("xs")]: {
        maxWidth: "100%",
      },
      "& h6": {
        color: "rgba(255,255,255,0.60)",
        fontSize: "16px",
        fontWeight: 300,
      },
    },
    "& .secondFooterGrid": {
      display: "flex",
      height: "100%",
      paddingLeft: "40%",
      gap: "20px",
      flexDirection: "column",
      [theme.breakpoints.down("sm")]: {
        paddingLeft: "0px",
        gap: "15px",
        marginTop: "24px",
      },
      "& h6": {
        fontFamily: "Calistoga",
        fontSize: "16px",
        // color: theme.palette.background.default,
        cursor: "pointer",
        width: "200px",
        fontWeight: "400",
      },
    },
    "& .contactUsBox": {
      "& svg": {
        fontSize: "25px",
        color: "#fff",
      },
      [theme.breakpoints.down("sm")]: {
        marginTop: "24px",
      },
      "& h5": {
        fontFamily: "Calistoga",
        color: theme.palette.background.default,
        fontWeight: 400,
      },
      "& a": {
        marginBottom: "6px",
        color: "rgba(255, 255, 255, 0.60)",
        fontFamily: "Outfit",
        fontSize: "14px",
        fontWeight: 300,
        // lineHeight: "20px",
        "&:hover": {
          color: "#712171",
        },
      },
    },
    "& .copy": {
      fontSize: "12px",
      textAlign: "center",
      fontWeight: "300",
      "& .lowerFooter": {
        flexWrap: "wrap",
        gap: "15px",
        position: "relative",
        padding: "14px 0px",
        "& > div:first-child": {
          display: "flex",
          gap: "12px",
          "& p": {
            fontWeight: "300 !important",
            fontFamily: "Sora",
            color: "rgba(255, 255, 255, 0.60)",
            cursor: "pointer",
            "&:hover": {
              color: "#712171",
            },
          },
        },
        "& > div:nth-child(2)": {
          color: "rgba(255, 255, 255, 0.60)",
          fontFamily: "Sora",
          fontSize: "15.743px",
          [theme.breakpoints.down("xs")]:{
              fontSize:"9px"
          },
          fontWeight: 300,
          "& span": {
            fontWeight: 400,
            color: "#fff",
            fontFamily: "Calistoga",
          },
        },
      },
    },

    "& ul": {
      paddingLeft: "0",
      "& li": {
        paddingLeft: "0",
        alignItems: "center",
        color: theme.palette.text.gray,
        fontSize: "14px",
        fontWeight: "300",
        display: "block",
        "& svg": {
          marginRight: "10px",
          color: "#fe2efe",
          fontSize: "15px",
        },
      },
    },
    // "& svg": {
    //   color: "rgba(255 255 255 / 30%)",
    //   fontSize: "15px",
    // },
    "& p": {
      color: theme.palette.text.gray,
    },
    "& h6": {
      color: "#fff",
      // [theme.breakpoints.down("sm")]: {
      //   marginTop: "30px",
      // },
      // [theme.breakpoints.down("xs")]: {
      //   marginTop: "10px",
      // },
    },

    "& a": {
      display: "flex",
      fontSize: "13px",
      alignItems: "center",
      fontWeight: "400",
      paddingLeft: "0px",
      paddingRight: "0px",
      textDecoration: "none",
      color: "#78819F",
      padding: "3px",
      [theme.breakpoints.only("xs")]: {
        fontSize: "11px",
      },
      "&:hover": {
        color: "#EC1F24",
        textDecoration: "none",
        "& svg": {
          color: "#712171",
          // fontSize: "px",
        },
      },
    },
    "& .borderBox": {
      position: "absolute",
      left: "153px",
      top: "12px",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  },
  iconbtn: {
    marginTop: "16px",
    "& svg": {
      marginTop: "10px",
      marginRight: "16px",
      fontSize: "30px",
      color: "#395071 !important",
      "&:hover": {
        color: "#712171 !important",
      },
    },
    "& .MuiIconButton-root": {
      marginRight: "8px",
      marginBottom: "8px",
      borderRadious: "10px",
      borderRadius: "7px",
      width: "30px",
      height: "30px",
      padding: "0px",

      // "& svg": {
      //   color: "#395071",
      //   fontSize: "24px",
      //   "& :hover": {
      //     "& svg": {
      //       color: "#EC1F24",
      //       fontSize: "24px !important",
      //     },
      //   },
      // },
    },
  },
  spacingContainer: {
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
  },
}));

const currentYear = new Date().getFullYear();

export default function Footer() {
  const classes = useStyles();
  const history = useHistory();

  const handleTerms = () => {
    history.push("/terms-and-conditions");
  };

  const handlePrivacy = () => {
    window.open("/privacy", "_blank");
  };

  const handleCookies = () => {
    window.open("/cookies-policy", "_blank");
  };

  const handleFAQ = () => {
    history.push("/faqs");
  };



  

  return (
    <>
      <Box className={classes.footerSection}>


        <Container maxWidth="xlg">
          <Box className="footerContent">
            <Box>
              <Box className="footerContentBox">
                <Box mb={3}>
                  <RouterLink to="/">
                    <img src="/images/footer_logo.png" alt="" />
                  </RouterLink>
                </Box>
                <Typography variant="h6" className="footBelowLogoTypo">
                  At City General Hospital, your health and well-being are our
                  top priorities. Whether you're seeking medical treatment,
                  preventive care, or simply looking for information, we're here
                  to help you every step of the way.
                </Typography>
              </Box>
            </Box>

            <Box>
              <Box className="secondFooterGrid">
                <Typography variant="h6" onClick={handleTerms}>
                  Terms & Conditions
                </Typography>
                <Typography variant="h6" onClick={handlePrivacy}>
                  Privacy Policy
                </Typography>
                <Typography variant="h6" onClick={handleCookies}>
                  Cookies Policies
                </Typography>
                <Typography variant="h6" onClick={handleFAQ}>
                  FAQ's
                </Typography>
              </Box>
            </Box>

            <Box>
              <Box className="contactUsBox">
                <Typography variant="h5">Contact Us</Typography>
                <List style={{ marginBottom: "24px" }}>
                  <ListItem>
                    <Link /* href="https://www.google.com" */>
                      <IoLocationOutline /* style={{ fontSize: "30px" }} */ />
                      Jadala Place, 1st FloorNgong Lane, Off Ngong Road
                    </Link>
                    <Link /* href="mailto:connect@enterprise.com" */>
                      <MdOutlineMailOutline />
                      connect@enterprise.com
                    </Link>
                    <Link /* href="tel:+254797771771" */>
                      <FiPhone />
                      +254 797 771771
                    </Link>
                  </ListItem>
                </List>
                <Typography variant="h5">Follow us:</Typography>
                <Box className={classes.iconbtn} display="flex" mb={1}>
                  <FaWhatsapp onClick={() => window.open('https://api.whatsapp.com/send', '_blank')} />
                  <FaTelegramPlane onClick={() => window.open('https://telegram.org/', '_blank')} />
                  <FaXTwitter onClick={() => window.open('https://twitter.com/', '_blank')} />
                  <FaInstagram onClick={() => window.open('https://www.instagram.com/', '_blank')} />
                  <FaLinkedin onClick={() => window.open('https://www.linkedin.com/', '_blank')}  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
        <Box style={{ borderTop: "1px solid #283B55" }}></Box>
        <Box className={classes.spacingContainer}>
          <Box className="copy" mt={1}>
            <Box my={2} className="lowerFooter displaySpacebetween">
              <Box>
                <Typography variant="body2" onClick={handlePrivacy}>
                  Privacy Policy
                </Typography>
                <Divider orientation="vertical" />
                <Typography variant="body2" onClick={handleTerms}>
                  Terms & Conditions
                </Typography>
              </Box>

              <Box className="displayStart">
                {`Copyright©${currentYear}.`} Created with love by &nbsp;
                <span>Health Trust Technologies</span>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
