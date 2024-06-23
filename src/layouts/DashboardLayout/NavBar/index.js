import React, { useEffect, useState, useContext } from "react";
import { useLocation, matchPath, useHistory } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { FaSquarespace } from "react-icons/fa";
import { FaLuggageCart } from "react-icons/fa";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  Hidden,
  List,
  Button,
  ListSubheader,
  makeStyles,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  Avatar,
  Divider,
  MenuItem,
  ListItem,
} from "@material-ui/core";
import NavItem from "./NavItem";
import { FaOpencart } from "react-icons/fa";
import { BsInfoCircle, BsQuestionCircle } from "react-icons/bs";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { AuthContext } from "src/context/Auth";
import { IoWallet } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";
import { LuHeartPulse } from "react-icons/lu";
import { GoChecklist } from "react-icons/go";
import { TbReportMoney } from "react-icons/tb";
import { FaUserEdit } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaPowerOff } from "react-icons/fa6";
import axios from "axios";
import { ApiConfig } from "src/config/apiConfig";
import { mediaUrl } from "src/config/apiConfig";

import { Email } from "@material-ui/icons";

const sections = [
  {
    items: [
      // {
      //   title: "Home",
      //   modules: "",
      //   icon: AiFillHome,
      //   href: "/",
      // },
      {
        title: "Dashboard",
        modules: "dashboard",
        icon: MdDashboard,
        userRole: "PAT",
        href: "/patient-dashboard",
      },
      {
        title: "Dashboard",
        modules: "dashboard",
        icon: MdDashboard,
        userRole: "INSURANCE",
        href: "/dashboard",
      },
      {
        title: "Health Record",
        modules: "dashboard",
        icon: LuHeartPulse,
        userRole: "PAT",
        href: "/health-record",
      },
      {
        title: "Appointment",
        modules: "dashboard",
        icon: IoWallet,
        userRole: "PAT",
        href: "/appointment",
      },
      {
        title: "Lab Report",
        modules: "dashboard",
        icon: TbReportMoney,
        userRole: "PAT",
        href: "/labreport",
      },
      {
        title: "Patients-Policy",
        modules: "dashboard",
        icon: GoChecklist,
        userRole: "PAT",
        href: "/requestpolicy",
      },
      {
        title: "Policy Lists",
        modules: "dashboard",
        userRole: "INSURANCE",
        icon: LuHeartPulse,
        href: "/policy-listing",
      },
      {
        title: "Customer Lists",
        modules: "dashboard",
        userRole: "INSURANCE",
        icon: IoWallet,
        // img: <img src="images/dash1.png"/>,
        href: "/customer-list",
      },
      {
        title: "My Cart",
        modules: "Patiants Module",
        icon: FaLuggageCart,
        userRole: "PAT",
        href: "/mycart",
      },
      {
        title: "My Order",
        modules: "Patiants Module",
        icon: FaOpencart,
        userRole: "PAT",
        href: "/myorder",
      },
      {
        title: "Pharmaceutical Dashboard",
        modules: "dashboard",
        icon: MdDashboard,
        userRole: "Pharmaceutical",
        // img: <img src="images/dash1.png"/>,
        href: "/pharmaceutical-dashboard",
      },
      {
        title: "Pharmaceutical Product List",
        modules: "dashboard",
        icon: MdDashboard,
        userRole: "Pharmaceutical",
        // img: <img src="images/dash1.png"/>,
        href: "/pharmaceutical-product-list",
      },
      {
        title: "Pharmaceutical Order List",
        modules: "dashboard",
        icon: MdDashboard,
        userRole: "Pharmaceutical",
        // img: <img src="images/dash1.png"/>,
        href: "/pharmaceutical-order-list",
      },
      {
        title: "Appoinment",
        modules: "dashboard",
        icon: MdDashboard,
        userRole: "DOC",
        // img: <img src="images/dash1.png"/>,
        href: "/doctor-appoinment",
      },
      {
        title: "Patient List",
        modules: "dashboard",
        icon: MdDashboard,
        userRole: "DOC",
        // img: <img src="images/dash1.png"/>,
        href: "/doctor-patient-list",
      },
      {
        title: "Laboratory Patient List",
        modules: "dashboard",
        icon: MdDashboard,
        userRole: "LAB",
        // img: <img src="images/dash1.png"/>,
        href: "/laboratory-patient-list",
      },
      {
        title: "Change Password",
        modules: "dashboard",
        icon: BiTransfer,
        href: "/change-password",
      },
      {
        title: "Edit Profile",
        modules: "Patiants Module",
        icon: FaUserEdit,
        href: "/editprofile",
        userRole: "PAT",
      },
      {
        title: "Edit Profile",
        modules: "Patiants Module",
        icon: FaUserEdit,
        href: "/editdoctorprofile",
        userRole: "DOC",
      },
    ],
  },
];

function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });
    console.log(pathname, "pathname");

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }
  return acc;
}
const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
    background: "#fff",
  },
  desktopDrawer: {
    top: "56px",
    width: "250px",
    height: "calc(100% - 80px)",
    background: "#fff",
    marginTop: "21px",
    padding: "70px 20px",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  socialIcon: {
    cursor: "pointer",
    marginRight: 5,
  },
  button: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    height: "45px",
    paddingLeft: "17px",
    borderRadius: "12px",
    marginTop: "-30px",
    "&:hover": {
      color: "#F5C843",
    },
    "& svg": {
      color: "#F5C843",
      fontSize: "20px",
    },
  },
  btnBox: {
    position: "relative",
    left: "30%",
    bottom: "-250px",
  },
  logoutButton: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    borderRadius: "50px",
    // marginLeft: "11px",
    background: "transparent",
    fontWeight: "400",
    padding: "13px 20px",
    fontSize: "13px",
    color: theme.palette.text.secondary,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
    },
  },
  sideMenuBox: {
    "& .MuiCollapse-wrapperInner": {
      marginLeft: "45px",
    },
  },
  navDetail: {
    color: theme.palette.secondary.main,
    borderRadius: "15px",
    background: "linear-gradient(149deg, #5681F1 10.75%, #1354FC 94.05%)",
    padding: "15px",
    boxShadow: "1px 14px 29px -13px rgba(19,84,252,0.75)",
    "& .avtarBox": {
      gap: "10px",
    },
    "& h6": {
      color: theme.palette.secondary.main,
    },
    "& hr": {
      backgroundColor: "rgba(255, 255, 255, 0.10)",
      margin: "10px 0",
    },
  },
  dailogOpen: {
    "& .MuiPaper-rounded": {
      borderRadius: "15px",
      padding: "30px",
    },
    "& svg": {
      color: theme.palette.primary.main,
      fontSize: "70px",
    },
    "& p": {
      fontSize: "18px",
      fontWeight: 400,
      color: theme.palette.primary.light,
      marginTop: "20px",
    },
    "& h3": {
      fontSize: "30px",
      marginTop: "24px",
    },
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const location = useLocation();
  const [profileData, setProfileData] = useState({});
  const userRole = localStorage.getItem("userRole");
  let permission = auth.userData.permissions;
  let connectedExchange = auth.userData?.connectedExchange?.length;
  const history = useHistory();
  const [isLogout, setIsLogout] = useState(false);
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]); // eslint-disable-line
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  useEffect(() => {
    const getProfile = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios({
          url: ApiConfig.getProfileData,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response && response?.data?.responseCode === 200) {
          console.log(response?.data?.responseData);
          setProfileData(response?.data?.responseData);
          console.log(profileData, "profileeeee");
          //   initialValues.fullName = response?.responseData?.fullName;
          //   initialValues.email = response?.responseData?.email;
          //   initialValues.contact = response?.responseData?.contact;
        } else {
          console.log("Error response:", response);
          // toast.error(response?.data?.responseMessage);
        }

        // setIsLoading(false);
      } catch (err) {
        console.log("Error:", err);
        // toast.error(err?.response?.responseMessage || "An error occurred");
        // setIsLoading(false);
      }
    };

    getProfile();
  }, []);
  const [fullName, setFullName] = useState("--");
  // const fullUrl = `${mediaUrl}${profileData?.profile_picture}`
  useEffect(() => {
    if (profileData?.full_name) {
      let name = profileData?.full_name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setFullName(name);
    }
  }, [profileData?.full_name]);
  const content = (
    <Box height="100%" display="flex" flexDirection="column" overflow="scroll">
      {/* <PerfectScrollbar options={{ suppressScrollX: true }}> */}
      <Box className={classes.navDetail}>
        <Box className="displayStart avtarBox">
          <Avatar
            src={profileData?.profile_picture || "/static/images/avatar/1.jpg"}
          />
          {/* <img src={fullUrl} alt="profile" /> */}
          <Typography variant="h6">{fullName || "--"}</Typography>
        </Box>
        <Divider />
        <Box className="displayStart avtarBox" mt={1}>
          <img src="images/email.svg" alt="img" />
          <Typography>{profileData?.email || "--"}</Typography>
        </Box>
        <Box className="displayStart avtarBox" mt={1}>
          <img src="images/phone.svg" alt="img" />
          {/* <Typography>{`+ ${profileData.phone}`}</Typography> */}
          <Typography>{profileData?.mobile_number || "--"}</Typography>
        </Box>
      </Box>
      <Box>
        <Box className="sideMenuBox">
          {sections.map((section, i) => {
            // ****************************************
            let filteredItems;
            if (auth.userData.userType === "SUBADMIN") {
              filteredItems = section.items.filter((item) => !item.userRole);
            } else {
              filteredItems = section.items.filter(
                (item) => !item.userRole || item.userRole === userRole
              );
            }
            let item;
            let item1 = section.items.map((data, i) => {
              // eslint-disable-next-line
              if (section?.items[i]?.modules == "") {
                return section.items[i];
              }
              if (
                section?.items[i]?.modules == "dashboard" && // eslint-disable-line
                permission?.dashboard
              ) {
                return section.items[i];
              } else if (
                section?.items[i]?.modules == "exchange" && // eslint-disable-line
                permission?.exchange
              ) {
                // eslint-disable-next-line
                if (connectedExchange == 0) {
                  return section.items[i];
                } else {
                  return {
                    title: "Exchanges",
                    modules: "exchange",
                    icon: FaSquarespace,
                    // img: <img src="images/dash1.png"/>,
                    href: "/exchange",
                  };
                }
              } else if (
                section?.items[i]?.modules == "mywallet" && // eslint-disable-line
                permission?.mywallet
              ) {
                return section.items[i];
              } else if (
                section?.items[i]?.modules == "subscription" && // eslint-disable-line
                permission?.subscription
              ) {
                return section.items[i];
              } else if (
                section?.items[i]?.modules == "staticContentManagement" && // eslint-disable-line
                permission?.staticContentManagement
              ) {
                return section.items[i];
              } else if (
                section?.items[i]?.modules == "arbitrage" && // eslint-disable-line
                permission?.arbitrage
              ) {
                return section.items[i];
              } else if (
                section?.items[i]?.modules == "subscription" && // eslint-disable-line
                permission?.subscription
              ) {
                return section.items[i];
              } else {
                return false;
              }
            });
            for (let k = 1; k < item1.length + 1; k++) {
              if (!item1[k]) {
                item1.splice(k, 1);
              }
            }
            for (let l = 1; l < item1.length + 1; l++) {
              if (!item1[l]) {
                item1.splice(l, 1);
              }
            }
            for (let m = 1; m < item1.length + 1; m++) {
              if (!item1[m]) {
                item1.splice(m, 1);
              }
            }
            // eslint-disable-next-line
            if (auth.userData.userType == "SUBADMIN") {
              item = item1; // eslint-disable-line
            } else {
              item = section.items; // eslint-disable-line
            }
            // ****************************************
            return (
              <List
                key={`menu${i}`}
                // subheader={
                //   <ListSubheader disableGutters disableSticky>
                //     {section.subheader}
                //   </ListSubheader>
                // }
              >
                {renderNavItems({
                  img: section.img,
                  items: filteredItems,
                  pathname: location.pathname,
                })}
                <ListItem>
                  <Button
                    onClick={() => setIsLogout(true)}
                    className={classes.logoutButton}
                    variant="standard"
                    fullWidth
                  >
                    <AiOutlineLogout
                      style={{ marginRight: "10px", fontSize: "20px" }}
                    />
                    Logout
                  </Button>
                </ListItem>
              </List>
            );
          })}
        </Box>
      </Box>

      {isLogout && (
        <Dialog
          maxWidth="xs"
          fullWidth
          className={classes.dailogOpen}
          open={isLogout}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setIsLogout(false)}
        >
          <Box>
            <Box align="center" mb={5}>
              <FaPowerOff
              // style={{
              //   color: "#EC1F24",
              //   fontSize: "65px",
              // }}
              />
              <Typography variant="h3">Logout ?</Typography>
              <Typography variant="body2">
                Are you sure you want to logout?
              </Typography>
            </Box>
          </Box>

          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={() => {
              window.localStorage.removeItem("token");
              window.localStorage.removeItem("userRole");
              window.localStorage.removeItem("isLoggedIn");
              auth.userLogIn(false, null);
              history.push("/");
            }}
          >
            Ok
          </Button>
        </Dialog>
      )}

      {/* </PerfectScrollbar> */}
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          <Box p={2}>{content}</Box>
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Box
          anchor="left"
          // classes={{ paper: classes.desktopDrawer }}
          className={classes.desktopDrawer}
          open
          variant="persistent"
        >
          {content}
        </Box>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
