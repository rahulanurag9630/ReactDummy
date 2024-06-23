import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  makeStyles,
  IconButton,
  Typography,
  SvgIcon,
  Toolbar,
  AppBar,
  Hidden,
  Avatar,
  Grid,
  Box,
  Popper,
  Fade,
  Paper,
  Divider,
  Button,
  DialogActions,
  DialogContent,
  Dialog,
  Slide,
  ClickAwayListener,
} from "@material-ui/core";
import { Menu as MenuIcon } from "react-feather";
import Badge from "@material-ui/core/Badge";
import { Link, useLocation, useHistory } from "react-router-dom";
import { AuthContext } from "src/context/Auth";
import Logo from "src/component/Logo";
import { BiBell } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { IoNotifications, IoShieldCheckmarkOutline } from "react-icons/io5";
import { HiOutlineKey } from "react-icons/hi";
import { IoIosHelpCircleOutline, IoMdChatbubbles } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { AccountCircle, Notifications } from "@material-ui/icons";
import NotificationModal from "src/component/NotificationModal";
const headersData = [
  {
    label: "About Us",
    href: "/about",
    role: "PAT || DOC",
  },
  {
    label: "Search Doctors",
    href: "/doctors-page",
    role: "PAT",
  },
  {
    label: "Find Hospitals",
    href: "/hospitals-page",
    role: "PAT",
  },
  {
    label: "Life Insurance",
    href: "/insurance-policy",
    role: "PAT",
  },
  {
    label: "Laboratory",
    href: "/laboratory-listing",
    role: "PAT",
  },
  {
    label: "Medical Product",
    href: "/medical-product",
    role: "PAT",
  },
  {
    label: "Contact Us",
    href: "/contact-us",
    role: "PAT || DOC",
  },
];
const useStyles = makeStyles((theme) => ({
  toolbar: {
    padding: "7px 30px 7px 30px",

    background: theme.palette.background.header,
    [theme.breakpoints.down("sm")]: {
      padding: "0px 20px 0px 20px",
    },
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    "& + &": {
      marginLeft: theme.spacing(2),
    },
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  menuButton: {
    fontSize: "14px",
    lineHeight: "24px",
    fontWeight: "400",
    borderRadius: 0,
    minWidth: "auto",
    color: "#262626",
    padding: "0px 20px",
    textDecoration: " none",
    "@media (max-width: 1300px)": {
      fontSize: "13px",
    },
    [theme.breakpoints.down("lg")]: {
      padding: "0px 14px",
    },
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
      color: "#681E65",
      borderBottom: "2px solid #681E65",
    },
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  mainheader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    [theme.breakpoints.down("md")]: {
      flexWrap: "wrap",
    },

    "& svg": {
      // color: theme.palette.secondary.main,
      // marginRight: "10px",
    },
    "& .leftBox": {
      // width: "306px",
      // [theme.breakpoints.down("md")]: {
      //   width: "200px",
      // },
      // [theme.breakpoints.down("xs")]: {
      //   width: "150px",
      // },
      "& img": {
        width: "150px",
        [theme.breakpoints.down("xs")]: {
          width: "104px",
          paddingLeft: "0 !important",
        },
      },
    },
    "& button": {
      // padding: "10px",
    },
  },
  mainpopperBox: {
    "& .MuiPaper-root": {
      boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.25) !important",
      borderRadius: "15px",
      marginTop: "70px",
      maxWidth: "300px",
      width: "100%",
    },
    "& h6": {
      fontFamily: "Poppins",
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "21px",
      letterSpacing: "0em",
      textAlign: "center",
    },
    "& svg": {
      fontSize: "20px",
      marginRight: "10px",
      color: "#9D9D9D",
    },
  },
  mainLeafBox: {
    padding: "15px 14px",
    cursor: "pointer",
    "&:hover": {
      background: "#f5f5f5",
    },
  },
}));

const Data = [
  {
    icon: <FaRegUser />,
    list: "My account",
    route: "/my-account",
  },
  {
    icon: <HiOutlineKey />,
    list: "Password & Security",
    route: "/security",
  },
  {
    icon: <IoShieldCheckmarkOutline />,
    list: "Privacy Policy",
    route: "/privacy",
  },
  {
    icon: <IoIosHelpCircleOutline />,
    list: "Terms & Condition",
    route: "/terms-and-conditions",
  },
  {
    icon: <IoMdChatbubbles />,
    list: "Rules & FAQ’s",
    route: "/faqs",
  },
];

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const location = useLocation();
  const auth = useContext(AuthContext);
  console.log(auth, "authhhhh");
  const history = useHistory();
  const [profileData, setProfileData] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [countNotification, setCountNotification] = useState(0);
  const [isLogout, setIsLogout] = useState(false);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClickAway = () => {
    setOpen(false);
  };
  const handleNotificationClick = () => {
    setDialogOpen(true);
  };
  const [placement, setPlacement] = React.useState();
  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  useEffect(() => {
    if (auth?.userData) {
      setProfileData({
        profilePic: auth?.userData?.profilePic,
      });
    }
  }, [auth?.userData]);

  const getMenuButtons = (activeClassName) => {
    return headersData.map(({ label, href, role }) => {
      return (
        <>
          {localStorage.getItem("userRole") === "PAT" &&
            role.includes("PAT") && (
              <NavLink
                exact
                {...{
                  key: label,
                  color: "inherit",
                  to: href,
                  className: classes.menuButton,
                  activeClassName: "active",
                }}
              >
                {label}
              </NavLink>
            )}

          {localStorage.getItem("userRole") === "DOC" &&
            role.includes("DOC") && (
              <NavLink
                exact
                {...{
                  key: label,
                  color: "inherit",
                  to: href,
                  className: classes.menuButton,
                  activeClassName: "active",
                }}
              >
                {label}
              </NavLink>
            )}
        </>
      );
    });
  };

  return (
    <AppBar
      elevation={0}
      className={clsx(classes.root)}
      color="inherit"
      style={{ boxShadow: "0px 4px 4px rgb(0 0 0 / 10%)" }}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        {/* <Hidden lgUp>
          <IconButton
            color="#00e0b0"
            onClick={onMobileNavOpen}
            style={{ padding: "0px" }}
          >
            <SvgIcon>
              <MenuIcon />
            </SvgIcon>
          </IconButton>
          &nbsp; &nbsp;
        </Hidden> */}
        <Box className={classes.mainheader}>
          <Box className="leftBox ">
            <Link to="/">
              <Logo width="125" className="displayCenter" />
            </Link>
          </Box>

          <Hidden mdDown>
            <Box className="displayEnd">
              {getMenuButtons()}
              <>
                <IconButton
                  style={{
                    marginRight: "24px",
                    marginLeft: "16px",
                    background: "#0000000D",
                    position: "relative",
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
              >
                Dashboard
              </Button>
            </Box>
          </Hidden>
        </Box>
        <Hidden lgUp>
          <>
            <IconButton
              style={{
                marginRight: "24px",
                marginLeft: "16px",
                background: "#0000000D",
                position: "relative",
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
          <IconButton
            color="#00e0b0"
            onClick={onMobileNavOpen}
            style={{ padding: "0px" }}
          >
            <SvgIcon>
              <MenuIcon />
            </SvgIcon>
          </IconButton>
          &nbsp; &nbsp;
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};
TopBar.defaultProps = {
  onMobileNavOpen: () => {},
};

export default TopBar;

export function TopBarData() {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <Hidden xsDown>
          <Box>
            <Typography variant="h5">NFT Marketplace</Typography>
            <Typography variant="body1" style={{ color: "#ffffff9c" }}>
              example@gmail.com
            </Typography>
          </Box>
        </Hidden>
        &nbsp; &nbsp;
        <Avatar
          src={
            auth?.userData?.profilePic
              ? `${auth?.userData?.profilePic}`
              : "https://picsum.photos/533/357"
          }
          className={classes.avatar}
          // onClick={() => history.push("/admin-profile")}
        />
      </Box>
    </>
  );
}
