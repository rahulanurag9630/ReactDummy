import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  makeStyles,
  Button,
  Popover,
  Radio,
  RadioGroup,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { IoFilterOutline } from "react-icons/io5";
import { Pagination } from "@material-ui/lab";
import { MdChevronRight } from "react-icons/md";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { ApiConfig } from "../../../config/apiConfig";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import GoBack from "src/component/GoBack";

const useStyles = makeStyles((theme) => ({
  muiMainBox: {
    padding: "50px 5%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    gap: "30px",
    "& h2": {
      color: "#161E29",
      fontSize: "35px",
      fontStyle: "normal",
      fontWeight: "500",
    },
    "& .titleBox": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& .containerTwo": {
        display: "flex",
        justifyContent: "space-between",
      },
    },
    "& .buttonBox": {
      height: "45px",
      width: "120px",
      padding: "5px 10px",
      border: " 1px solid #681E65",
      borderRadius: "50px",
      color: "#681E65",
      fontFamily: "Outfit",
      fontSize: "20px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "normal",
      "&:hover": {
        color: "#FFF",
        background: "#681E65",
      },
    },
    "& .MuiButton-label": {
      display: "flex",
      gap: "10px",
    },
    "& .container": {
      padding: "20px",
      border: "1px solid #D9D9D9",
      borderRadius: "10px",
    },
    "& h6": {
      color: "#161E29",
      lineHeight: "4vh",
      fontWeight: "500",
      fontSize: "18px",
    },
    "& body2": {
      color: "rgba(0, 0, 0, 0.60)",
      lineHeight: "35px",
      fontWeight: "500",
    },
    "& body3": {
      color: "#3a3c3f",
      lineHeight: "26px",
      fontWeight: "400",
      fontSize: "16px",
    },
    "& .mainBox": {
      // borderTop: "1px solid #D9D9D9",
      // display: "flex",
      // justifyContent: "space-between",
    },
    "& .mainBox1": {
      borderTop: "1px solid #D9D9D9",
      // display: "flex",
      // justifyContent: "space-between",
    },
    "& .content": {
      gap: "30px",
      alignItems: "center",
      paddingBottom: "20px",
      display: "flex",
      justifyContent: "space-between",
    },
    "& .icon": {
      padding: "5px",
      width: "25px",
      height: "25px",
      display: "flex",
      borderRadius: "50px",
      background: "rgba(8, 5, 21, 0.09)",
      "&:hover": {
        color: "#FFF",
        background: "#681E65",
      },
    },

    "& .imgBox": {
      // width: "fit-content",
      maxWidth: "100px",
      padding: "10px",
      border: "1px solid #B8B8B8",
      borderRadius: "10px",
    },

    "& .contentBox": {
      display: "flex",
      gap: "22px",
      padding: "20px 0 5px 0",
    },
    "& .uploadBtn": {
      borderRadius: "50px",
      padding: "10px 15px",
      fontWeight: "500",
      color: "#681E65",
      border: "1px solid #681E65",
      width: "147px",
      height: "50px",
      marginBottom: "10px",
      fontSize: "15px",
      "&:hover": {
        background: "#681E65",
        color: "#FFF",
      },
    },
    "& .uploadBtnCancel": {
      borderRadius: "50px",
      padding: "15px 15px",
      color: "#08051599",
      border: "2px solid #08051599",
      width: "147px",
      height: "50px",
      fontWeight: "500",
      marginBottom: "10px",
      fontSize: "15px",
      "&:hover": {
        background: "#08051599",
        color: "#FFF",
      },
    },
    "& .reorderButtonBox": {
      paddingTop: "10px",
      display: "flex",
      gap: "15px",
    },
    "& .gridBox2": {
      display: "flex",
      gap: "5px",
      width: "50%",
      "@media(max-width:599px)": {
        width: "100%",
      },
    },
    "& .MuiInput-underline:before": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "none",
    },
    "& .MuiFormControl-marginNormal": {
      marginTop: "0",
      marginBottom: "0",
      background: "rgba(0, 0, 0, 0.05)",
      borderRadius: "50px",
      padding: "15px 20px",
      border: "1px solid rgba(0, 0, 0, 0.05)",
    },
    "& .filterBtn": {
      height: "45px",
      borderRadius: "50px",
      marginRight: "10px",
      padding: "0 40px",
    },
    "& .dateBox": {
      width: "40%",
      height: "18px",
      "@media(max-width:599px)": {
        width: "auto",
      },
    },
    "& .gridBox1": {
      display: "flex",
      gap: "20px",
    },
    "& .gridButtonBox": {
      display: "flex",
      justifyContent: "space-between",
      gap: "10px",
    },
    "& .pagination": {
      marginTop: "15px",
      width: "fit-content",
      "& button": {
        padding: "7px 14px",
        height: "auto",
      },
      "& .MuiPaginationItem-page.Mui-selected": {
        backgroundColor: theme.palette.primary.main,
        color: "white",
      },
    },
  },
  main: {
    marginTop: "160px",
    "& .MuiPopover-paper": {
      maxWidth: "380px !important",
      width: "100%",
      minWidth: "100px",
      "@media(max-width:500px)": {
        width: "90%",
      },
      "& .MuiIconButton-label": {
        color: "#681E65",
      },
    },
    "& .mainPopUpBox": {
      padding: "10px",
    },
    "& .popupContent": {
      display: "flex",
      justifyContent: "space-between",
      padding: "15px 0",
      "& p": {
        color: "#681E65 !important",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "normal",
        textTransform: "uppercase",
      },
    },
    "& .radioBox": {
      borderTop: "1px solid rgba(0, 0, 0, 0.10)",
      borderBottom: "1px solid rgba(0, 0, 0, 0.10)",
      marginTop: "5px",
      marginBottom: "5px",
      padding: "5px 0 5px 0",
    },
  },
}));

const MyOrder = () => {
  const classes = useStyles();
  const history = useHistory();
  const [anchor, setAnchor] = useState(null);
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [product, setProduct] = useState([{}]);
  const [statusFilter, setStatusFilter] = useState();
  const [totalPage, setTotalPage] = useState();

  const [paginationData, setPaginationData] = useState({
    page: 1,
    size: 10,
  });

  const handlePaginationChange = (event, value) => {
    setPaginationData((prevData) => ({
      ...prevData,
      page: value,
    }));
  };

  const openPopover = (event) => {
    setAnchor(event.currentTarget);
  };
  const [selectedValue, setSelectedValue] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const [selectedDateValue, setSelectedDateValue] = useState("");
  const handleChange1 = (event) => {
    setSelectedDateValue(event.target.value);
  };
  const handleFromDateChange = (date) => {
    setSelectedFromDate(date);
  };

  const handleToDateChange = (date) => {
    setSelectedToDate(date);
  };
  const [filterData, setFilterData] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  console.log(">>>Details", orderDetails);

  const fetchData = async (page, size) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(ApiConfig["myOrder"], {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          date_filter: selectedDateValue,
          status: selectedValue,
          page,
          size,
        },
      });
      console.log("fdsfsfsfsd", response);

      if (response?.data?.responseCode === 200) {
        setOrderDetails(response?.data);
        setFilterData(response?.data?.date_filter_options);
        setPaginationData((prevData) => ({
          ...prevData,
          page,
        }));
        setIsLoading(false);
        setTotalPage(response?.data?.totalPages);
      } else {
        setIsLoading(false);
        console.error(
          response?.data?.responseMessage || "Something went wrong"
        );
      }
    } catch (error) {
      console.error(
        error?.response?.data?.responseMessage || "Something went wrong"
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(paginationData.page, paginationData.size);
  }, [
    selectedValue,
    paginationData.page,
    paginationData.size,
    selectedDateValue,
  ]);

  const handleFilterClick = async () => {
    const token = localStorage.getItem("token");
    if (
      selectedFromDate &&
      selectedToDate &&
      selectedToDate < selectedFromDate
    ) {
      toast.error("End date cannot be earlier than start date");
      return;
    }

    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.myOrder,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          date_from: selectedFromDate
            ? selectedFromDate.toISOString().split("T")[0]
            : null,
          date_to: selectedToDate
            ? selectedToDate.toISOString().split("T")[0]
            : null,
        },
      });

      if (res.data?.responseCode === 200) {
        console.log(res?.data.responseData, "Filtered data");
        // toast.success(res.data?.responseMessage);
        fetchData(res?.data?.responseData);
      } else {
        toast.error(res.data?.responseMessage || "Something went wrong");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.responseMessage || "Something went wrong"
      );
    }
  };
  const handlePageChange = (event, page) => {
    fetchData(page);
  };
  const handleClearFilters = () => {
    setSelectedFromDate(null);
    setSelectedToDate(null);
    setSelectedValue("");
    fetchData();
  };
  const handleDetail = (id) => {
    console.log(id, "swdsds");
    history.push({
      pathname: "/orderdetail",
      state: {
        order_id: id,
      },
    });
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

  const groupedOrders = orderDetails?.responseData?.reduce((groups, order) => {
    const status = order.status;
    if (!groups[status]) {
      groups[status] = [];
    }
    groups[status].push(order);
    return groups;
  }, {});

  const handleReorder = (orderId, status) => {
    history.push({
      pathname: "/orderdetail",
      state: {
        order_id: orderId,
        order_status: status,
      },
    });
  };

  return (
    <Box className={classes.muiMainBox}>
      <Box className="titleBox">
        <Grid container className="containerTwo">
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Box className="displayStart">
              <GoBack />
              <Typography style={{ marginLeft: "10px" }} variant="h2">
                My Order
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3} sm={4} md={2} lg={3} style={{ textAlign: "right" }}>
            <Button className="buttonBox" onClick={openPopover}>
              <IoFilterOutline />
              Filter
            </Button>
          </Grid>
        </Grid>
        <Popover
          open={Boolean(anchor)}
          anchorEl={anchor}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          className={classes.main}
        >
          <Box className="mainPopUpBox">
            <Box className="popupContent">
              <Typography variant="body2">FILTER BY ORDER TYPE</Typography>
              <RxCross1
                style={{ cursor: "pointer" }}
                onClick={() => setAnchor(null)}
              />
            </Box>
            <RadioGroup value={selectedValue} onChange={handleChange}>
              <Box>
                <Radio value="completed" /> Order Delivered
              </Box>
              <Box>
                <Radio value="pending" />
                Order Placed
              </Box>
              <Box>
                <Radio value="cancelled" />
                Order Cancelled
              </Box>
              <Box>
                <Radio value="confirmed" />
                Order Confirmed
              </Box>
            </RadioGroup>

            <Box className="popupContent">
              <Typography variant="body2">FILTER BY ORDER Date</Typography>
            </Box>
            <RadioGroup value={selectedDateValue} onChange={handleChange1}>
              {filterData.length > 0 &&
                filterData.map((item, index) => (
                  <Box className="radioBox" key={index}>
                    <Radio value={item} />
                    {item}
                  </Box>
                ))}
            </RadioGroup>
          </Box>
        </Popover>
      </Box>

      {isloading ? (
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        groupedOrders &&
        Object.entries(groupedOrders).map(([status, orders]) => (
          <Box key={status} className="mainBox">
            <Box className="container">
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                }}
              >
                <Box style={{ display: "flex" }}>
                  <Box>
                    <img src={getStatusImage(status)} />
                  </Box>
                  <Box style={{ marginLeft: "10px" }}>
                    <Typography
                      variant="h6"
                      style={{
                        color:
                          status === "Pending"
                            ? "purple"
                            : status === "Confirmed"
                            ? "#cb9e00"
                            : status === "Cancelled"
                            ? "red"
                            : status === "Completed"
                            ? "green"
                            : status === "Placed"
                            ? "#42a5f5"
                            : status === "Dispatched"
                            ? "#ff9800"
                            : "inherit",
                      }}
                    >
                      {status}
                    </Typography>
                    {orders[0].created_at && (
                      <Typography style={{ color: "grey" }}>
                        {orders[0].created_at}
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box className="icon">
                  <MdChevronRight
                    style={{
                      width: "auto",
                      height: "auto",
                      color: "rgba(22, 30, 41, 0.6)",
                    }}
                  />
                </Box>
              </Box>

              {/* Grouped Orders */}
              {/* <Box className="container"> */}
              {orders.map((order, index) => (
                <Box key={index} className="mainBox1">
                  <Box className="mainBox">
                    <Box className="contentBox">
                      <Box className="imgBox">
                        {/* <img src="./images/smallBox.png" style={{ width: "100%" }} alt="" /> */}

                        {order.products.map((product, index) => (
                          <img
                            key={index}
                            src={
                              product.product_images.length > 0
                                ? product.product_images[0]
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

                        {/* {order.products.map((product, index) => (
  <div key={index}>
    {product.product_images.map((image, imgIndex) => (
      <img key={imgIndex} src={image} alt={`Product ${index + 1} image ${imgIndex + 1}`} />
    ))}
  </div> 
))} */}
                      </Box>
                      <Box>
                        {/* Products, order ID, total price */}
                        {order.products.map((product, index) => (
                          <Typography key={index} variant="h6">
                            {product.product_name}
                          </Typography>
                        ))}
                        <Typography style={{ color: "grey" }}>
                          {order.id}
                        </Typography>
                        <Typography variant="body2">
                          ₹ {order.total_price}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="reorderButtonBox">
                    {/* Buttons */}
                    {order.status === "pending" ? (
                      // Render two buttons for pending status
                      <>
                        <Button variant="outlined" className="uploadBtnCancel">
                          Cancel
                        </Button>
                        <Button variant="outlined" className="uploadBtn">
                          Track Order
                        </Button>
                      </>
                    ) : (
                      // Render single reorder button for other statuses
                      //   <Button
                      //   variant="outlined"
                      //   className="uploadBtn"
                      //   onClick={() => handleReorder(order.productId)}
                      // >
                      //   Re-Order
                      // </Button>

                      //       <Button variant="outlined" className="uploadBtn">
                      //       {order.reorderButtonLabel}
                      //       Re-Order
                      // </Button>

                      <Button
                        variant="outlined"
                        className="uploadBtn"
                        onClick={() => handleReorder(order.id, order.status)} // Pass order ID to handleReorder function
                      >
                        {order.reorderButtonLabel} Re-Order
                      </Button>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ))
      )}
      <Grid item xs={12} align="right">
        {totalPage > 1 && (
          <Pagination
            count={totalPage}
            shape="rounded"
            size="small"
            className="pagination"
            page={paginationData.page}
            onChange={handlePaginationChange}
          />
        )}
      </Grid>
    </Box>
  );
};

export default MyOrder;
