import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  makeStyles,
  Button,
  TextField,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { RiDeleteBin4Fill, RiProductHuntFill } from "react-icons/ri";
import axios from "axios";
import { ApiConfig } from "../../../config/apiConfig";
import toast from "react-hot-toast";
import { Pagination } from "@material-ui/lab";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import GoBack from "src/component/GoBack";
const useStyles = makeStyles((theme) => ({
  muiMainBox: {
    padding: "50px 5%",
    "& h2": {
      color: "#161E29",
      fontSize: "35px",
      fontStyle: "normal",
      fontWeight: "500",
    },
    "& .filterBtn": {
      borderRadius: "10px",
      fontSize: "18px",
      padding: "10px 45px",
      height: "auto",
      "@media(max-width:599px)": {
        fontSize: "14px",
        padding: "10px 30px",
      },
    },
    "& .filterBtn1": {
      borderRadius: "10px",
      fontSize: "18px",
      padding: "10px 15px",
      height: "auto",
      "@media(max-width:599px)": {
        fontSize: "14px",
        padding: "10px 10px",
      },
    },
    // "& ..MuiDialogActions-root":{
    //   justifyContent:'center !important'
    // },
    "& .titleBox": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
    },
    "& .items": {
      display: "flex",
      justifyContent: "space-between",
      fontFamily: "Outfit",
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "26px",
      letterSpacing: "0em",
      textAlign: "left",
      color: "#00000099",
      marginTop: "10px",
    },
    "& .totalAmount": {
      borderTop: "1px solid #7c7e80",
      marginTop: "25px",
      paddingTop: "12px",
    },
    "& .gridMainBox": {
      // border: "1px solid #B8B8B8",
      borderRadius: "10px",
      padding: "20px 20px 0 20px",
      "& .noDataFoundImg": {
        marginLeft: "475px",
        [theme.breakpoints.down("sm")]: {
          marginLeft: "0px",
        },
      },
    },
    "& .main": {
      borderBottom: "1px solid #B8B8B8",
      marginBottom: "20px",
    },
    "& .imgBox": {
      height: "45px",
      width: "100%",
      maxWidth: "35px",
      padding: "10px",
      border: "1px solid #B8B8B8",
      borderRadius: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& .contentBox": {
      display: "flex",
      gap: "10px",
      padding: "0 20px 20px 0",
    },
    "& h6": {
      color: "#161E29",
      lineHeight: "normal",
      fontWeight: "500",
      "@media(max-width:500px)": { fontSize: "15px" },
    },
    "& body2": {
      color: "rgba(0, 0, 0, 0.60)",
      lineHeight: "35px",
      fontWeight: "500",
      "@media(max-width:500px)": { fontSize: "14px", lineHeight: "30px" },
    },
    "& .subContentBox1": {
      display: "flex",
      gap: "15px",
      maxWidth: "80px",
      width: "100%",
      border: "1px solid rgba(217, 217, 217, 1)",
      padding: "10px",
      height: "21px",
      borderRadius: "5px",
      justifyContent: "space-around",
      alignItems: "center",
      cursor: "pointer",
    },
    "& .icon": {
      width: "20px",
      height: "20px",
      textAlign: "center",
      borderRadius: "5px",
      padding: "5px",
      background: "rgba(217, 217, 217, 1)",
      color: "#681E65",
    },
    "& .gridContent": {
      display: "flex",
      justifyContent: "space-between",
      padding: "0 0 20px 20px",
    },
    "& .secendGridBox": {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    "& .secendGridContentBox": {
      padding: "20px",
      border: "1px solid #B8B8B8",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      "& .filterBtn": {
        borderRadius: "10px",
        fontSize: "18px",
        padding: "15px 45px",
        height: "auto",
        width: "100%",
        "@media(max-width:1050px)": {
          padding: "15px 30px",
        },
        "@media(max-width:599px)": {
          fontSize: "14px",
        },
      },
    },
    "& .text": {
      color: "#080515",
    },
    "& .secendGridMainBox": {
      // display: "flex",
      // justifyContent: "space-between",
      paddingTop: "20px",
      "& .textField": {
        width: "75%",
        [theme.breakpoints.down("md")]: {
          width: "65%",
        },
        [theme.breakpoints.down("sm")]: {
          width: "75%",
        },
      },
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
}));
const MyCart = () => {
  const classes = useStyles();
  const history = useHistory();
  const [cartDetails, setCartDetails] = useState({});
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [totalPage, setTotalPage] = useState();
  console.log(">>>cartDetails", cartDetails);
  const [isLoading, setIsLoading] = useState(true);
  const [quantityProd, setQuantity] = useState([]);
  const [paginationData, setPaginationData] = useState({
    page: 1,
    size: 10,
  });
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState();

  const handleOpenModal = (id) => {
    setSelectedAppointment(id);
    setOpen(true);
  };
  const handleDeleteAppointment = async () => {
    const token = localStorage.getItem("token");
    if (!selectedAppointment) {
      toast.error("ID is empty");
      setOpen(false);
      return;
    }
    const productId = parseInt(selectedAppointment);
    try {
      const response = await axios({
        method: "DELETE",
        url: ApiConfig.deleteCartItem,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          product_id: productId,
        },
      });
      if (response.data?.responseCode === 200) {
        // toast.success(response?.data?.responseMessage);
        fetchData();
      } else {
        toast.error(response?.data?.responseMessage);
      }
    } catch {}
    setOpen(false);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handlePaginationChange = (event, value) => {
    setPaginationData((prevData) => ({
      ...prevData,
      page: value,
    }));
  };

  // const fetchData = async (page, size) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get(ApiConfig["viewCart"], {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       params: {
  //         page,
  //         size,
  //       },
  //     });
  //     setIsLoading(true);
  //     if (response.data?.responseCode === 200) {
  //       const responseData = response.data.responseData;
  //       const updatedCartDetails = responseData.products.map(product => ({
  //         ...product,
  //         quantity: product.quantity
  //       }));
  //       setCartDetails({
  //         ...responseData,
  //         products: updatedCartDetails
  //       });
  //       setQuantity(responseData.products.reduce((total, product) => total + product.quantity, 0));
  //       setPaginationData(prevData => ({
  //         ...prevData,
  //         page,
  //       }));
  //       setTotalPage(responseData.totalPages);
  //       setIsLoading(false);
  //       // toast.success(response.data.responseMessage);
  //     } else {
  //       console.error(response.data?.responseMessage || "Something went wrong");
  //       toast.error(response.data.responseMessage);
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.error(error?.response?.data?.responseMessage || "Something went wrong");
  //   }
  // };
  const fetchData = async (page, size) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(ApiConfig["viewCart"], {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          size,
        },
      });
      setIsLoading(true);
      if (response.data?.responseCode === 200) {
        const responseData = response.data.responseData;
        const updatedCartDetails = responseData.products.map((product) => ({
          ...product,
          quantity: product.quantity,
        }));
        setCartDetails({
          ...responseData,
          products: updatedCartDetails,
        });
        // Calculate total quantity for all products separately
        const totalQuantity = responseData.products.reduce(
          (total, product) => total + product.quantity,
          0
        );
        setQuantity(totalQuantity);
        setPaginationData((prevData) => ({
          ...prevData,
          page,
        }));
        setTotalPage(responseData.totalPages);
        setIsLoading(false);
        // // toast.success(response.data.responseMessage);
      } else {
        console.error(response.data?.responseMessage || "Something went wrong");
        toast.error(response.data.responseMessage);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(
        error?.response?.data?.responseMessage || "Something went wrong"
      );
    }
  };

  const handleQuantity = async (productId, action) => {
    const token = localStorage.getItem("token");
    try {
      const productToUpdate = cartDetails.products.find(
        (product) => product.product_id === productId
      );
      if (!productToUpdate) {
        console.error("Product not found in cart.");
        return;
      }

      let newQuantity = productToUpdate.quantity;

      if (action === "increment") {
        newQuantity++;
      } else if (action === "decrement" && newQuantity > 0) {
        console.log(action);
        newQuantity--;
      } else {
        return;
      }

      const response = await axios({
        method: "PUT",
        url: ApiConfig.updateCartItem,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          product_id: productId,
          quantity: newQuantity,
        },
      });

      if (response.data?.responseCode === 200) {
        fetchData();
        // Update the quantity in cartDetails state
        const updatedProducts = cartDetails.products.map((product) => {
          if (product.product_id === productId) {
            return {
              ...product,
              quantity: newQuantity,
            };
          }
          return product;
        });
        setCartDetails({
          ...cartDetails,
          products: updatedProducts,
        });

        // Update the quantityProd state to reflect the selected product's quantity
        setQuantity(newQuantity);
        const totalPrice = updatedProducts.reduce((total, product) => {
          return total + product.price * product.quantity;
        }, 0);

        // Update the price state immediately
        setPrice(totalPrice);
        // Update the price if necessary
        // setPrice(response?.data?.updated_cart_item?.total_price);

        // Optionally, display a success message
        // // toast.success(response?.data?.responseMessage);
      } else {
        // Optionally, display an error message
        toast.error(
          response?.data?.responseMessage || "Failed to update quantity."
        );
        console.error(
          response?.data?.responseMessage || "Failed to update quantity."
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.responseMessage || "Failed to update quantity."
      );
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData(paginationData.page, paginationData.size);
  }, [paginationData.page, paginationData.size]);

  // useEffect(() => {
  //   console.log(price, "priceeee");
  // }, [price]);
  return (
    <Box className={classes.muiMainBox}>
      <Box className="titleBox">
        <Box className="displayStart">
          <GoBack />
          <Typography style={{ marginLeft: "10px" }} variant="h2">
            My Cart
          </Typography>
        </Box>

        <Button
          variant="outlined"
          className="filterBtn"
          onClick={() => history.push("medical-product")}
        >
          Back to Shopping
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <Box className="gridMainBox">
            {cartDetails &&
            cartDetails.products &&
            cartDetails.products.length > 0 ? (
              cartDetails.products.map((product, index) => (
                <Grid container className="main" key={index}>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box className="contentBox">
                      <Box className="imgBox">
                        {product?.product_image[0] ? (
                          <img
                            src={product.product_image[0]}
                            style={{ width: "100%" }}
                            alt=""
                          />
                        ) : (
                          <RiProductHuntFill style={{ width: "100%" }} />
                        )}
                      </Box>
                      <Box>
                        <Typography variant="h6">
                          {product?.product_name}
                        </Typography>
                        <Typography variant="body2">
                          {" "}
                          {product?.product_id}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box className="gridContent">
                      <Typography variant="h6">
                        {product?.total_price !== undefined
                          ? product?.total_price
                          : price}
                      </Typography>
                      <Box className="subContentBox1">
                        <Typography
                          variant="body2"
                          onClick={() =>
                            handleQuantity(product?.product_id, "decrement")
                          }
                        >
                          -
                        </Typography>
                        <Typography variant="body2">
                          {product?.quantity}
                        </Typography>
                        <Typography
                          variant="body2"
                          onClick={() =>
                            handleQuantity(product?.product_id, "increment")
                          }
                        >
                          +
                        </Typography>
                      </Box>
                      <Box className="icon">
                        <RiDeleteBin4Fill
                          style={{ cursor: "pointer" }}
                          onClick={() => handleOpenModal(product?.product_id)}
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              ))
            ) : (
              <Grid container justifyContent="center" alignItems="center">
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <Box>
                    {/* <img src="images/noData.jpg" alt="" /> */}
                    {/* <Typography variant="outlined" color="primary">
                      No Data Found
                    </Typography> */}
                    <Box mx={5} className="displayCenter noDataFoundImg">
                      <img src="images/no_data.png" alt="no_data" />
                    </Box>
                  </Box>
                )}
              </Grid>
            )}
          </Box>
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          {cartDetails && cartDetails?.products?.length > 0 ? (
            <Box className="secendGridBox">
              <Box className="secendGridContentBox">
                <Typography variant="h6">Order Summary</Typography>
                <Box className="secendGridMainBox">
                  <Typography variant="body2" className="items">
                    Total Items <span>{cartDetails.products.length}</span>
                  </Typography>
                  <Typography variant="body2" className="items">
                    Items VAT <span>{cartDetails.products.vat || 0}</span>
                  </Typography>
                  <Typography variant="body2" className="items">
                    Shipping <span>{cartDetails.products.shipping || 0}</span>
                  </Typography>
                  <Typography variant="body2" className="items totalAmount">
                    Total Amount{" "}
                    <span className="text">
                      ₹{cartDetails.total_price || 0}
                    </span>
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  className="filterBtn"
                  onClick={() => history.push("/addnewaddress")}
                >
                  Proceed to Checkout
                </Button>
              </Box>
            </Box>
          ) : null}
        </Grid>
      </Grid>
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
      <Dialog
        open={open}
        onClose={handleCloseModal}
        style={{ padding: "20px" }}
      >
        <DialogTitle style={{ textAlign: "center" }}>
          <Typography variant="h3">Delete Product</Typography>
        </DialogTitle>
        <DialogContent style={{ marginBottom: "16px" }}>
          <Typography variant="body2">
            Are you sure you want to delete this Product?
          </Typography>
        </DialogContent>
        <DialogActions
          style={{ justifyContent: "center", marginBottom: "16px" }}
        >
          <Button
            onClick={handleCloseModal}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAppointment}
            variant="contained"
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyCart;
