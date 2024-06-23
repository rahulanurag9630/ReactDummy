import {
  AppBar,
  Toolbar,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  MenuItem,
  Box,
  Container,
  Menu,
  Paper,
  Dialog,
  Badge,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Logo from "./../../component/Logo";
import { NavLink } from "react-router-dom";
import { UserContext } from "src/context/User";
import { AccountCircle, BorderBottom } from "@material-ui/icons";
import { AuthContext } from "src/context/Auth";
import AuthGuard from "src/config/AuthGuard";
import { IoNotifications } from "react-icons/io5";
import NotificationModal from "src/component/NotificationModal";

const headersData = [
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Search Doctors",
    href: "/doctors-page",
  },
  {
    label: "  Hospitals",
    href: "/hospitals-page",
  },
  {
    label: "Life Insurance",
    href: "/insurance-policy",
  },
  {
    label: "Laboratory",
    href: "/laboratory-listing",
  },
  {
    label: "Medical Product",
    href: "/medical-product",
  },
  {
    label: "Contact Us",
    href: "/contact-us",
  },
];

const useStyles = makeStyles((theme) => ({
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
  menuButton: {
    fontSize: "14px",
    lineHeight: "24px",
    fontWeight: "400",
    borderRadius: 0,
    minWidth: "auto",
    color: "#262626",
    padding: "0px 20px",
    [theme.breakpoints.down("lg")]: {
      padding: "0px 10px",
    },
    [theme.breakpoints.down("md")]: {
      padding: "0px 10px",
    },
    "@media (max-width: 1300px)": {
      fontSize: "12px",
    },
    textDecoration: " none",
    "@media (max-width: 900px)": {
      fontStyle: "normal",
      letterSpacing: "-0.6px",
      lineHeight: "24px",
      padding: "15px !important",
      height: "51px",
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    "&.active": {
      // color: theme.palette.text.primary,
      color: "#681E65",
      borderBottom: "2px solid #681E65",
    },
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
    padding: " 5px 0px",
    "& .ecoButton": {
      borderRadius: "50px",
      marginLeft: "24px",
      [theme.breakpoints.down("lg")]: {
        marginLeft: "12px",
      },
    },
  },
  maindrawer: {
    height: "100%",
    background: "#0c0731",
    width: "260px",
  },
  logoDrawer: {
    width: "140px",
  },
  drawerContainer: {
    padding: "20px 0px 20px 20px",
    height: "100%",
    background: "#ffffff",
    color: "#262626",
    width: "260px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  drawericon: {
    color: "#000",
    marginLeft: "0px !important",
    fontSize: "25px",
  },
  logoImg: {
    width: "75px",
    margin: " 14px 15px 11px 0px",
    objectFit: "contain",
    "@media (max-width: 500px)": {
      margin: " 11px 1px 3px 0px",
      width: "52px",
      width: "75px",
    },
  },
  menuMobile: {
    fontSize: "14px",
    fontWeight: "500",
    paddingLeft: "10px",
    "@media (max-width: 500px)": {
      padding: "7px 0",
      width: "100%",
    },
  },
  paper1: {
    background: "black",
    color: "white",
  },

  mainHeader: {
    justifyContent: "space-between",
    padding: "0px",
  },
  search: {
    height: "40px",
    position: "relative",
    color: "#ABABAB",
    borderRadius: "100px",
    backgroundColor: "#DAF4FF",
    border: "1px solid #fff",
    marginLeft: 20,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
    },
  },
  searchIcon: {
    fontSize: "16px",
    padding: "0px 9px",
    color: "#000000",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    fontSize: "16px",
    width: "100%",
  },
  inputInput: {
    padding: "8px 6px 8px 0px",
    fontSize: "12px",
    marginTop: "-2px",
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    color: "#000",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      "&:focus": {
        width: "100%",
      },
    },
  },
  menuButton1: {
    paddingLeft: "0",
  },
  searcBox: {
    backgroundColor: "#DAF4FF",
    borderRadius: " 50px",
  },
  menuMobile1: {
    padding: "15px 0",
    "& h4": {
      fontSize: "14px !important",
      lineHeight: " 17px",
      color: theme.palette.text.main,
      margin: "0 8px",
      fontWeight: "400",
      [theme.breakpoints.only("xs")]: {
        fontSize: "12px !important",
      },
    },
    "& svg": {
      color: theme.palette.text.main,
      "@media (max-width:767px)": {
        display: "none",
      },
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
    "& figure": {
      margin: 0,
      width: 40,
      height: 40,
      borderRadius: "50px",
      overflow: "hidden",
      display: "flex",
      justifyContent: " center",
      alignItems: "center",
      "& img": {
        width: "auto",
        height: "auto",
        maxWidth: "100%",
      },
    },
  },
  menuMobile2: {
    "& h4": {
      fontSize: "14px",
      lineHeight: " 17px",
      color: theme.palette.background.dark,
      margin: "0 5px",
      whiteSpace: "pre",
      fontWeight: "300",
      "@media (max-width:767px)": {
        display: "none",
      },
    },
    "& svg": {
      "@media (max-width:767px)": {
        display: "none",
      },
    },
    "&:hover": {
      backgroundColor: "transparent",
      color: "#ff3965",
    },
  },
  menuMobiledrawer: {
    "& h4": {
      fontSize: "16px",
      lineHeight: " 17px",
      color: "#000",

      whiteSpace: "pre",
      fontWeight: "400",
    },
  },
  searchdiaogBox: {
    "& .MuiDialogContent-root": {
      minHeight: "calc(100vh - 100px)",
      [theme.breakpoints.only("xs")]: {
        padding: "20px 0 !important",
      },
    },
    "& .MuiDialog-paperScrollPaper": {
      overflowY: "auto",
    },
  },
  dashboardIcon: {
    "& button": {
      fontSize: "16px",
    },
  },
}));

export default function Header() {
  const classes = useStyles();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [countNotification, setCountNotification] = useState(0);
  const handleClose4 = () => {
    setAnchorEl1(null);
  };
  const {
    menuMobile,
    menuButton,
    menuButton1,
    divstake,
    toolbar,
    drawerContainer,
    drawericon,
    logoDrawer,
    mainHeader,
  } = useStyles();
  const history = useHistory();

  console.log(history.location.pathname, "hissss");
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1220
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const [open1, setOpen1] = useState({ community: false, user: false });
  const anchorRef = { community: useRef(null), user: useRef(null) };
  const StyledMenu = withStyles({
    paper: {
      marginTop: "2px",
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));
  const displayDesktop = () => {
    const patientDashboard = () => {
      const userRole = localStorage.getItem("userRole");
      if (userRole === "PAT") {
        history.push("/patient-dashboard");
      } else if (userRole === "DOC") {
        history.push("/doctor-appoinment");
      }
    };
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    // const isLoggedIn = auth?.userLoggedIn;
    // console.log(isLoggedIn, "islogged");
    return (
      <Toolbar className={toolbar}>
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          {femmecubatorLogo}
        </Box>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          {getMenuButtons()}
          {isLoggedIn ? (
            // If the user is logged in, show profile, create NFT, and disconnect
            <>
              <Box className={classes.dashboardIcon}>
                <>
                  <IconButton
                    style={{
                      marginRight: "24px",
                      marginLeft: "16px",
                      background: "#0000000D",
                    }}
                    onClick={handleNotificationClick}
                  >
                    <Badge badgeContent={countNotification} color="error">
                      <IoNotifications
                        style={{
                          color: "#080515BF",
                          fontSize: "26px",
                        }}
                      />
                    </Badge>
                  </IconButton>
                  <NotificationModal
                    setCountNotification={setCountNotification}
                    open={dialogOpen}
                    setOpen={setDialogOpen}
                  />
                </>

                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AccountCircle style={{ fontSize: "30px" }} />}
                  onClick={patientDashboard}
                >
                  Dashboard
                </Button>
              </Box>

              {/* <Button
              variant="outlined"
              className="btn-15"
              to="/profile"
              color="primary"
              component={Link}
              style={{
                whiteSpace: "pre",
                padding: "0px !important",
                "& .MuiButton-containedSecondary": {
                  padding: "0px !important",
                },
              }}
            >
              Profile
            </Button>
            <Button
              variant="outlined"
              className="btn-15"
              to="/create"
              color="primary"
              component={Link}
              style={{
                whiteSpace: "pre",
                padding: "0px !important",
                "& .MuiButton-containedSecondary": {
                  padding: "0px !important",
                },
              }}
            >
              Create NFT
            </Button>
            <Button
              variant="outlined"
              className={divstake}
              onClick={() => {
                user.logoutHandler();
                setAnchorEl1();
              }}
            >
              Disconnect
            </Button> */}
            </>
          ) : (
            // If the user is not logged in, show login and sign up buttons
            <>
              <Button
                variant="contained"
                className="ecoButton"
                to="/login"
                color="primary"
                component={Link}
                style={{ marginRight: "16px", whiteSpace: "pre" }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                // className="btn-15"
                to="/select-user-type"
                color="secondary"
                component={Link}
                // style={{
                //   whiteSpace: "pre",
                //   padding: "0px !important",
                //   "& .MuiButton-containedSecondary": {
                //     padding: "0px !important",
                //   },
                // }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
      // {/* </Container> */}
    );
  };
  const displayMobile = () => {
    const patientDashboard = () => {
      const userRole = localStorage.getItem("userRole");
      if (userRole === "PAT") {
        history.push("/patient-dashboard");
      } else if (userRole === "DOC") {
        history.push("/doctor-appoinment");
      }
    };
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    //mobile
    return (
      <Toolbar className={mainHeader}>
        <Box display="flex" justifyContent="space-between">
          {femmecubatorLogo}
        </Box>

        <Box display={"flex"}>
          <>
            <IconButton
              style={{
                marginRight: "24px",
                marginLeft: "16px",
                background: "#0000000D",
              }}
              onClick={handleNotificationClick}
            >
              <Badge badgeContent={countNotification} color="error">
                <IoNotifications
                  style={{
                    color: "#080515BF",
                    fontSize: "26px",
                  }}
                />
              </Badge>
            </IconButton>
            <NotificationModal
              setCountNotification={setCountNotification}
              open={dialogOpen}
              setOpen={setDialogOpen}
            />
          </>
          <Drawer
            {...{
              anchor: "right",
              open: drawerOpen,
              onClose: handleDrawerClose,
            }}
          >
            <div className={drawerContainer}>
              <Box mb={1}>
                <img
                  className={logoDrawer}
                  src="images/healthcare_logo.png"
                  alt="healthcare_logo"
                />
              </Box>

              {getDrawerChoices()}

              {isLoggedIn ? (
                // If the user is logged in, show profile, create NFT, and disconnect
                <>
                  <Box className={classes.dashboardIcon}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AccountCircle style={{ fontSize: "30px" }} />}
                      onClick={patientDashboard}
                    >
                      Dashboard
                    </Button>
                  </Box>

                  {/* <Button
              variant="outlined"
              className="btn-15"
              to="/profile"
              color="primary"
              component={Link}
              style={{
                whiteSpace: "pre",
                padding: "0px !important",
                "& .MuiButton-containedSecondary": {
                  padding: "0px !important",
                },
              }}
            >
              Profile
            </Button>
            <Button
              variant="outlined"
              className="btn-15"
              to="/create"
              color="primary"
              component={Link}
              style={{
                whiteSpace: "pre",
                padding: "0px !important",
                "& .MuiButton-containedSecondary": {
                  padding: "0px !important",
                },
              }}
            >
              Create NFT
            </Button>
            <Button
              variant="outlined"
              className={divstake}
              onClick={() => {
                user.logoutHandler();
                setAnchorEl1();
              }}
            >
              Disconnect
            </Button> */}
                </>
              ) : (
                // If the user is not logged in, show login and sign up buttons
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Button
                    variant="contained"
                    // className="ecoButton"
                    to="/login"
                    color="primary"
                    component={Link}
                    style={{ marginRight: "16px", whiteSpace: "pre" }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    // className="btn-15"
                    to="/select-user-type"
                    color="secondary"
                    component={Link}
                    // style={{
                    //   whiteSpace: "pre",
                    //   padding: "0px !important",
                    //   "& .MuiButton-containedSecondary": {
                    //     padding: "0px !important",
                    //   },
                    // }}
                  >
                    Sign Up
                  </Button>
                </Box>
              )}
            </div>
          </Drawer>

          <Box display="flex" alignItems="center">
            <IconButton
              className={drawericon}
              {...{
                edge: "start",
                // color: "inherit",
                "aria-label": "menu",
                "aria-haspopup": "true",
                onClick: handleDrawerOpen,
              }}
            >
              <MenuIcon
                width="60px"
                height="60px"
                style={{ color: "#681E65", fontSize: "26px" }}
              />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    );
  };
  const handleNotificationClick = () => {
    setDialogOpen(true);
  };
  //mobile end
  const getDrawerChoices = () => {
    let data = getMenuButtonsforDrawer();
    return data.map(({ label, href }) => {
      return (
        <>
          <Button
            {...{
              key: label,
              color: "inherit",   
              to: href,
              component: Link,
              className: menuButton1,
            }}
          >
            <MenuItem className={menuMobile}>{label}</MenuItem>
          </Button>
        </>
      );
    });
  };

  const femmecubatorLogo = (
    <Box>
      <Link to="/">
        <Logo className="logoImg" />
      </Link>
    </Box>
  );

  const getMenuButtons = (activeClassName) => {
    const filteredMenuItems = headersData.filter((item) => {
      const isLoggedIn = auth?.userLoggedIn;

      if (isLoggedIn) {
        const userRole = localStorage.getItem("userRole");
        console.log(userRole, "dddddddddddddddddddddddddddddddddddddd");
        if (userRole === "PAT") {
          return item.label;
        } else if (userRole === "DOC") {
          return item.label === "About Us" || item.label === "Contact Us";
        }
      }

      return true;
    });
    console.log("tester is hererere isiiiiiiii", filteredMenuItems);
    return filteredMenuItems.map(({ label, href }) => {
      return (
        <>
          {/* <AuthGuard> */}

          <NavLink
            exact
            // to={`${href}`}
            {...{
              key: label,
              color: "inherit",
              to: href,
              // component: Link,
              className: menuButton,
              activeClassName: "active",
            }}
          >
            {" "}
            {label}
          </NavLink>
          {/* </AuthGuard> */}
        </>
      );
    });
  };

  const getMenuButtonsforDrawer = () => {
    const filteredMenuItems = headersData.filter((item) => {
      const isLoggedIn = auth?.userLoggedIn;

      if (isLoggedIn) {
        const userRole = localStorage.getItem("userRole");
        console.log(userRole, "dddddddddddddddddddddddddddddddddddddd");
        if (userRole === "PAT") {
          return item.label;
        } else if (userRole === "DOC") {
          return item.label === "About Us" || item.label === "Contact Us";
        }
      }

      return true;
    });
    console.log("tester is hererere isiiiiiiii", filteredMenuItems);
    return filteredMenuItems;
    // filteredMenuItems.map(({ label, href }) => {
    //   return (
    //     <>
    //       {/* <AuthGuard> */}

    //       <NavLink
    //         exact
    //         // to={`${href}`}
    //         {...{
    //           key: label,
    //           color: "inherit",
    //           to: href,
    //           // component: Link,
    //           className: menuButton,
    //           activeClassName: "active",
    //         }}
    //       >
    //         {" "}
    //         {label}
    //       </NavLink>
    //       {/* </AuthGuard> */}
    //     </>
    //   );
    // });
  };

  return (
    <>
      <AppBar
        position={history.location.pathname !== "/" ? "relative" : "absolute"}
        elevation={0}
        style={{ backgroundColor: "#ffffff", border: "none" }}
      >
        <Box className={classes.spacingContainer}>
          {mobileView ? displayMobile() : displayDesktop()}
        </Box>
      </AppBar>
      {/* {dialogOpen && (
        <Paper>
          <Dialog
            fullWidth
            maxWidth="lg"
            className={classes.searchdiaogBox}
            style={{
              position: "absolute",
              top: "10%",
              // minHeight: "695px",
            }}
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
          >
            <IconButton
              className="closeButton"
              onClick={() => setDialogOpen(false)}
            >
              <CloseIcon style={{ color: "#AAAAAA" }} />
            </IconButton>

            <Box className="dialogBoxHeight">
              <CloseIcon style={{ color: "#AAAAAA" }} />
            </Box>
          </Dialog>
        </Paper>
      )} */}
    </>
  );
}

