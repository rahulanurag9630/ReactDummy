import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  makeStyles,
  Button,
  Dialog,
  DialogContent,
  CircularProgress,
} from "@material-ui/core";
import { CiLocationOn } from "react-icons/ci";
import axios from "axios";
import { ApiConfig, mediaUrl } from "src/config/apiConfig";
import toast from "react-hot-toast";
import {
  useLocation,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles((theme) => ({
  customDialog: {
    borderRadius: "50px",
    "& .continueButton": {
      width: "280px",
      height: "52px",
      borderRadius: "50px",
      padding: "10px 40px",

      border: "2px solid #681E65",
      margin: "10px",
      fontSize: "15px",
      marginBottom: "25px",
    },

    "& .confirmCancel": {
      width: "280px",
      height: "52px",
      padding: "10px 40px",
      gap: "12.35px",
      margin: "10px",
      marginBottom: "25px",
      fontSize: "15px",
    },
  },

  muiMainBox: {
    padding: "50px 5%",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    "& h2": {
      color: "#161E29",
      fontSize: "35px",
      fontStyle: "normal",
      fontWeight: "500",
    },
    "& primaryHeading": {
      display: "flex",
      justifyContent: "spaceBetween",
      alignItems: "center",
      // borderBottom:  "1px solid rgba(0, 0, 0, 0.10)",
    },
    "& .container": {
      padding: "20px",
      border: "1px solid #D9D9D9",
      borderRadius: "10px",
    },

    "& .fontMainItem": {
      fontSize: "24px",
      textDecoration: "underline",
    },
    "& h6": {
      color: "#161E29",
      lineHeight: "normal",
      fontWeight: "500",
    },
    "& body2": {
      color: "rgba(0, 0, 0, 0.60)",
      lineHeight: "35px",
      fontWeight: "500",
    },
    "& .fontMainItem1": {
      fontSize: "20px",
    },
    "& .position": {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    "& .imgBox": {
      maxWidth: "100px",
      padding: "10px",
      border: "1px solid #B8B8B8",
      borderRadius: "10px",
    },
    "& .contentBox": {
      display: "flex",
      gap: "22px",
      padding: "20px 0",
    },
    "& .content": {
      display: "flex",
      gap: "30px",
      alignItems: "center",
      paddingBottom: "20px",
    },
    "& .filterBtn": {
      borderRadius: "50px",
      padding: "10px 40px",
      color: "#681E65",
      border: "1px solid #681E65",
      margin: "10px",
      fontSize: "15px",
      width: "281px",
      "&:hover": {
        background: "#681E65",
        color: "#FFF",
      },
    },
    "& .mainBox": {
      borderBottom: "1px solid rgba(0, 0, 0, 0.10)",
      paddingBottom: "10px",
      display: "flex",
      justifyContent: "space-between",
      "@media(max-width:400px)": {
        flexDirection: "column",
      },
    },
    "& .reorderButtonBox": {
      display: "flex",
      justifyContent: "end",
    },
    "& .icon": {
      padding: "5px",
      borderRadius: "50px",
      background: "rgba(0,0,0,0.10)",
      width: "18px",
      height: "18px",
      display: "flex",
      alignItems: "center",
      marginRight: "5px",
      float: "left",
    },
    "& .addressBox": {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      margin: "30px 0 15px 0",
      color: "rgba(8, 5, 21, 0.6)",
    },
  },
}));
const OrderDetail = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [orderDetail, setOrderDetail] = useState({});
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const id = location.state?.order_id;
  const status = location.state?.order_status;
  const [isloading, setIsLoading] = useState(true);
  console.log(status);
  const orderDetails = async (id) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios({
        method: "POST",
        url: ApiConfig.orderDetailById,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          order_id: id,
        },
      });
      console.log(res, "ressss");
      if (res.data?.responseCode === 200) {
        console.log(res.data.responseData, "dataaaaa");
        // toast.success(res.data?.responseMessage);
        setIsLoading(false);
        setOrderDetail(res?.data?.responseData);
        console.log(res.data.responseData.id, "id");
        return res.data;
      } else {
        setIsLoading(false);
        toast.error(res.data?.responseMessage || "Something went wrong");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(
        error?.response?.data?.responseMessage || "Something went wrong"
      );
    }
  };
  const cancelOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios({
        method: "POST",
        url: ApiConfig.cancelOrder,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          order_id: id,
        },
      });
      // console.log(res, "ressss");
      if (res?.data?.responseCode === 200) {
        history.goBack();
        // toast.success(res.data?.responseMessage);
      } else {
        toast.error(res.data?.responseMessage);
      }
    } catch (error) {
      toast.error(error?.response?.data?.responseMessage);
    }
  };

  const reOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios({
        method: "POST",
        url: ApiConfig.reOrder,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          order_id: id,
        },
      });
      // console.log(res, "ressss");
      if (res?.data?.responseCode === 200) {
        toast.success(res.data?.responseMessage);
        // location.goBack()

        history.goBack();
      } else {
        toast.error(res.data?.responseMessage);
      }
    } catch (error) {
      toast.error(error?.response?.data?.responseMessage);
    }
  };

  const handleCancelOrder = () => {
    setCancelDialogOpen(true);
  };

  // const handleConfirmCancelOrder = () => {
  //   cancelOrder(orderDetail.id);
  //   setCancelDialogOpen(false);
  // };
  const handleConfirmCancelOrder = async () => {
    try {
      await cancelOrder(orderDetail.id);
      setCancelDialogOpen(false);
      // Update orderDetail state to reflect the change
      setOrderDetail((prevState) => ({
        ...prevState,
        status: "cancelled", // Assuming the status key is "status" in orderDetail object
      }));
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel order. Please try again.");
    }
  };

  const getStatusImage = (status) => {
    switch (status) {
      case "pending":
        return "./images/orderInprocess.png";
      case "completed":
        return "./images/delivered.png";
      case "cancelled":
        return "./images/orderCancall.png";
      case "confirmed":
        return "./images/yellowOrder.png";
      default:
        return "";
    }
  };

  useEffect(() => {
    orderDetails(id);
  }, [id]);

  // const handleCancelOrder = () => {
  //   if (window.confirm("Are you sure you want to cancel this order?")) {
  //     cancelOrder(orderDetail.id);
  //   }
  // };

  return (
    <Box className={classes.muiMainBox}>
      <Typography variant="h2">Order Details</Typography>
      {isloading ? (
        <Box className="displayCenter">
          <CircularProgress />
        </Box>
      ) : (
        <Box className="container">
          <Box className="mainBox">
            <Box style={{ display: "contents" }} className="primaryHeading">
              <Box style={{ display: "flex" }}>
                <Box>
                  <img src={getStatusImage(orderDetail.status)} />
                </Box>
                <Box style={{ marginLeft: "10px" }}>
                  <Typography
                    variant="h6"
                    className="fontMainItem1"
                    style={{
                      color:
                        orderDetail.status === "Pending"
                          ? "purple"
                          : orderDetail.status === "Confirmed"
                          ? "#cb9e00"
                          : orderDetail.status === "Cancelled"
                          ? "red"
                          : orderDetail.tatus === "Completed"
                          ? "green"
                          : orderDetail.status === "Placed"
                          ? "#42a5f5"
                          : orderDetail.status === "Dispatched"
                          ? "#ff9800"
                          : "inherit",
                    }}
                  >
                    {`${orderDetail.status}`}
                  </Typography>
                  <Typography
                    variant="h7"
                    style={{ color: "grey", fontSize: "14px" }}
                  >
                    {" "}
                    {`${orderDetail.created_at}`}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography
                  style={{
                    fontSize: "20px",
                    color: "rgba(0, 0, 0, 0.6)",
                    fontWeight: "400px",
                  }}
                >
                  {` Order Id: ${orderDetail.id}`}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="mainBox">
            <Box className="contentBox">
              {orderDetail &&
                orderDetail?.products?.map((item, index) => (
                  <React.Fragment key={index}>
                    <Box className="imgBox">
                      {/* {item.product_images.length > 0 && (
            <img
              src={item.product_images[0]} 
              style={{ width: "100%" }}
              alt={`Product ${index + 1} image 1`} 
            />
          )} */}
                      {orderDetail.products.map((product, index) => (
                        <img
                          key={index}
                          src={
                            item.product_images.length > 0
                              ? item.product_images[0]
                              : "./images/defaultmedicine.jpg"
                          }
                          alt={`Product ${index + 1} image 1`}
                          style={{
                            width: "100%",
                            height: "auto",
                            maxWidth: "100%",
                          }}
                        />
                      ))}
                    </Box>
                    <Box>
                      <Typography variant="h6">
                        {`${item?.product_name} ,${item?.product_quantity} ${item?.product_unit}`}
                      </Typography>
                      <Typography
                        style={{
                          color: "grey",
                          fontSize: "14px",
                          margin: "5px 0 8px 0",
                        }}
                      >
                        {`Id: ${orderDetail.id}`}
                      </Typography>
                      <Typography variant="h6">{`₹${orderDetail?.total_price}`}</Typography>
                    </Box>
                  </React.Fragment>
                ))}
            </Box>
          </Box>
          <Box className="addressBox">
            <Typography variant="h6" className="fontMainItem">
              Address:
            </Typography>
            <Typography variant="body2" className="position">
              {" "}
              <span className="icon">
                <CiLocationOn />
              </span>{" "}
              {orderDetail.active_address && (
                <>
                  {orderDetail.active_address.address},{" "}
                  {orderDetail.active_address.city},{" "}
                  {orderDetail.active_address.pin_code},{" "}
                  {orderDetail.active_address.country}
                </>
              )}
            </Typography>
          </Box>
          <Box className="reorderButtonBox">
            {status !== "Cancelled" && (
              <Button
                variant="outlined"
                className="filterBtn"
                onClick={handleCancelOrder}
              >
                Cancel Order
              </Button>
            )}
            <Button
              variant="outlined"
              className="filterBtn"
              disabled={orderDetail.status === "Cancelled"}
              onClick={reOrder}
            >
              Re-Order
            </Button>
          </Box>
        </Box>
      )}
      <Dialog
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
        className={classes.customDialog}
      >
        <DialogContent>
          <Box textAlign="center">
            <img src="./images/Cancelorder.png" alt="Are you sure?" />
            <h2>Cancel Order!</h2>
            <Typography
              variant="h6"
              style={{
                color: "rgba(0, 0, 0, 0.6)",
                marginBottom: "40px",
              }}
            >
              Are you sure you want to cancel this order?
            </Typography>
            <Box /* className="displaySpaceBetween" */>
              <Button
                // style={{ marginRight: "10px" }}
                variant="contained"
                color="secondary"
                className="confirmCancel"
                onClick={() => setCancelDialogOpen(false)}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleConfirmCancelOrder}
                className="continueButton"
              >
                Continue
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default OrderDetail;
