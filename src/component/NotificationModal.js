import React, { useEffect, useState } from "react";
import {
  Fade,
  Modal,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  makeStyles,
} from "@material-ui/core";
// import CloseIcon from "@mui/icons-material/Close";
import CloseIcon from "@material-ui/icons/Close";
import ClearIcon from "@material-ui/icons/Clear";
import dayjs from "dayjs";
import axios from "axios";
import { Backdrop } from "@material-ui/core";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { ApiConfig } from "src/config/apiConfig";
const useStyles = makeStyles((theme) => ({
  mainNotificationBox: {},
  notificationBox: {
    "& .childBox": {
      display: "flex",
      justifyContent: "space-between",
      borderRadius: "10px",
      //   border: "1px solid #661d64",
      padding: "10px",
      background: "#80808029",
      marginBottom: "5px",
    },
    "& .messageDetail": {
      width: "100%",
      // maxWidth: "342px",
    },
  },
}));

const NotificationModal = ({ open, setOpen, setCountNotification }) => {
  const classes = useStyles();
  const [notificationList, setNotificationList] = useState([]);
  // console.log("notificationList-=-=-", notificationList);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isListUpdated, setIsListUpdated] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const getAllNotification = async () => {
    setIsDataLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "GET",
        url: `${ApiConfig.notifications}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // console.log("notifications-=-=-", response.status);
      if (response?.status === 200) {
        const notifications = response?.data?.ResponseBody?.notifications || [];
        setCountNotification(response?.data?.ResponseBody?.count);
        setNotificationList(notifications);
        setIsDataLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    getAllNotification();
  }, [isListUpdated]);

  const handleNotificationRead = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "POST",
        url: `${ApiConfig.readNotification}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          id: notificationId,
        },
      });
      // console.log("Notification marked as read:", response.status);
      setNotificationList((prevList) =>
        prevList.filter((notification) => notification.id !== notificationId)
      );

      setCountNotification(response?.data?.ResponseBody?.count - 1);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleClearAllNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "POST",
        url: `${ApiConfig.clearAllNotification}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // console.log("All notifications cleared:", response.status);

      setCountNotification(0);
      setNotificationList([]);
    } catch (error) {
      console.error("Error clearing all notifications:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          className={classes.mainNotificationBox}
          sx={{
            position: "absolute",
            top: "39%",
            left: "65%",
            transform: "translate(-50%, -50%)",
            width: "75%",
            // minWidth: 450,
            maxWidth: 450,
            bgcolor: "#fff",
            borderRadius: "10px",
            p: 2,
            maxHeight: 500,
            overflowY: "auto",

            "@media (max-width: 600px)": {
              left: "50%",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
              position: "sticky",
              top: "-17px",
              bgcolor: "#fff",
              zIndex: 1,
              borderBottom: "1px solid #ccc",
              padding: "10px",
            }}
          >
            <Typography variant="h4">Notification</Typography>
            {notificationList.length > 0 && (
              <Button
                style={{ padding: "5px 25px", height: "38px" }}
                onClick={() => {
                  if (notificationList && notificationList.length === 0) {
                    return;
                  }
                  handleClearAllNotifications();
                }}
                variant="contained"
                color="primary"
              >
                Clear All
              </Button>
            )}
          </Box>

          <List>
            {/* Notification list items */}
            {isDataLoading ? (
              <ListItem>
                <ListItemText primary="Loading..." />
              </ListItem>
            ) : notificationList.length === 0 ? (
              <ListItem>
                <ListItemText
                  primary="No notifications found."
                  style={{ textAlign: "center" }}
                />
              </ListItem>
            ) : (
              notificationList.map((data) => (
                <Box className={classes.notificationBox} key={data.id}>
                  <Box className="childBox">
                    <Box style={{ width: "100%" }}>
                      <Box className="messageDetail">
                        <Typography
                          variant="body2"
                          style={{ fontWeight: "500" }}
                        >
                          {data?.title || "NA"}
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ color: "#4a4545" }}
                        >
                          {data?.content || "NA"}
                        </Typography>
                      </Box>
                      {/* <Typography variant="body1" style={{ color: "#4a4545" }}>
                      {dayjs(data?.created_at).format("DD-MM-YYYY hh:mm")}
                    </Typography> */}
                      <Typography
                        variant="body1"
                        style={{ color: "#4a4545", textAlign: "end" }}
                      >
                        {dayjs(data?.created_at).format("DD-MM-YYYY hh:mm A")}
                      </Typography>
                    </Box>

                    <ClearIcon
                      style={{ fontSize: "15px", cursor: "pointer" }}
                      onClick={() => handleNotificationRead(data.id)}
                    />
                  </Box>
                </Box>
              ))
            )}
          </List>
        </Box>
      </Fade>
    </Modal>
  );
};

export default NotificationModal;
