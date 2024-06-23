import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  makeStyles,
  Button,
  CircularProgress,
} from "@material-ui/core";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import toast from "react-hot-toast";
import axios from "axios";
import { ApiConfig, mediaUrl } from "src/config/apiConfig";
import GoBack from "src/component/GoBack";
const useStyles = makeStyles((theme) => ({
  muiMainBox: {
    padding: "50px 5%",
    "& .imgBox": {
      height: "135px",
      borderRadius: "10px",
      cursor: "pointer",
      border: "1px solid transparent",
      "&:hover": {
        border: "1px solid #571957",
      },
      [theme.breakpoints.down("xs")]: {
        height: "65px",
      },
    },
    "& .selected": {
      border: "1px solid #571957",
    },
    "& .imgBox1": {
      width: "100%",
      borderRadius: "15px",
      // maxHeight: "600px",
      // maxWidth: "350px",
    },
    "& .imgMainBox": {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      justifyContent: "start",
      // cursor: "pointer",
      borderRadius: "10px",
    },
    "& .contentBox": {
      // display: "flex",
      // flexDirection: "column",
      // gap: "10px",
      // alignItems: "center",
      // "@media(max-width:599px)": {
      //   flexDirection: "row",
      //   justifyContent: "space-between",
      // },
    },
    "& .secendContentBox": {
      borderRadius: "15px",
      background: "#F5F5F5",
      height: "400px",
      padding: "25px",
      display: "flex",
      justifyContent: "center",
    },
    "& .thirdContentBox": {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      paddingLeft: "70px",
      "@media(max-width:959px)": { paddingLeft: "0" },
      "& .priceBtn": {
        height: "50px",
        flexWrap: "wrap",
        gap: "10px",
        cursor: "pointer",
        marginBottom: "24px",
        "& button": {
          border: "1px solid",
          borderRadius: "25px",
          fontSize: "12px",
          fontWeight: 300,
          padding: "5px 12px",
          margin: "2px",
        },
      },
    },
    "& h3": {
      color: "#161E29",
      fontSize: "30px",
      fontWeight: "500",
      lineHeight: "normal",
    },
    "& p": {
      color: "rgba(8, 5, 21, 0.60)",
      lineHeight: "25px",
      textTransform: "capitalize",
    },
    "& .head": {
      fontSize: "24px",
    },
    "& .subContentBox": {
      display: "flex",
      gap: "5px",
    },
    "& .subContentBox1": {
      display: "flex",
      gap: "15px",
      maxWidth: "80px",
      width: "100%",
      border: "1px solid rgba(217, 217, 217, 1)",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "5px",
      padding: "7px",
    },
    "& .subtext": {
      display: "flex",
      alignItems: "end",
    },
    "& .filterBtn": {
      borderRadius: "10px",
      // height: "auto",
      // fontSize: "18px",
      // "@media(max-width:500px)": { fontSize: "15px" },
    },
    "& .outOfStock": {
      color: "white",
    },
    "& .lastBox": {
      display: "flex",
      gap: "20px",
      "@media(max-width:450px)": { gap: "15px" },
    },
  },
  selectedButton: {
    backgroundColor: "#671e65",
    color: "white",
    "&:hover": {
      backgroundColor: "#671e65",
    },
  },
  unselectedButton: {
    // backgroundColor: "white",
    // color: "black",
  },
}));
const ProductDescription = () => {
  const location = useLocation();
  const id = location.state?.id;
  const [isLoading, setIsLoading] = useState(false);
  const [hospitalData, setHospitalData] = useState([]);
  console.log("hospitalData-=-=-", hospitalData);
  const [hospitalId, setHospitalId] = useState(null);
  const [productPrice, setProductPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [selectedVariantQuantity, setSelectedVariantQuantity] = useState(1);
  const handleIncreaseQuantity = () => {
    if (quantity < selectedVariantQuantity) setQuantity(quantity + 1);
    else {
      toast.error("Max quantity reached.");
    }
  };
  const [selectedImage, setSelectedImage] = useState(0);

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };
  const handleDecreaseQuantity = () => {
    console.log("decrease");
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const classes = useStyles();
  const history = useHistory();

  const handleVariantClick = (unitSizeValue, id, maxQuantity) => {
    setSelectedVariant(unitSizeValue);
    setSelectedVariantId(id);
    setSelectedVariantQuantity(maxQuantity);
    console.log(selectedVariantId, "selected");
    setQuantity(1);
  };

  const getMedicalDetail = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You need to login First");
        history.push("/login");
        return;
      }
      const res = await axios({
        method: "GET",
        url: `${ApiConfig.getMedicalDescription}?id=${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data?.responseCode === 200) {
        // // toast.success(res.data.responseMessage);
        setHospitalData(res.data.responseData);
        setSelectedVariantQuantity(res.data.responseData.variants[0]?.quantity);
        setSelectedVariant(res.data.responseData.variants[0]?.unitSizeValue);
        setSelectedVariantId(res.data.responseData.variants[0]?.id);
        setProductPrice(res.data.responseData.product_price || "--");
        return res.data;
      } else {
        return null;
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.responseMessage || "Something went wrong"
      );
      return null;
    } finally {
      setIsLoading(false); // Set loading state to false after API call completes
    }
  };

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios({
        method: "POST",
        url: ApiConfig.createCart,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: [
          {
            // product_id: id,
            quantity: quantity,
            product_id: selectedVariantId,
          },
        ],
      });
      console.log(res, "createCart-=-=-");
      if (res.data?.responseCode === 201) {
        console.log(res.data.responseData, "dataaaaa");
        // // toast.success(res.data?.responseMessage);
        history.push("/mycart");
        // setHospitalId(res.data.responseData.id)
        console.log(res.data.responseData.id, "id");
        return res.data;
      } else {
        toast.error(res.data?.responseMessage || "Something went wrong");
      }
    } catch (error) {
      //   toast.error(
      //     error?.response?.data?.responseMessage || "Something went wrong"
      //   );
    }
  };
  useEffect(() => {
    getMedicalDetail();
  }, []);

  if (isLoading) {
    return (
      <Box className={classes.muiMainBox} style={{ textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  // const handleImage=(item) =>{
  //   setImageUrl(item)
  // }

  // if the data is not available...

  if (!hospitalData || !hospitalData.product_name) {
    return (
      <center>
        <p>No product available.</p>
      </center>
    );
  }
  return (
    <Box className={classes.muiMainBox}>
      <Box mb={2}>
        <GoBack />
      </Box>
      <Grid container spacing={3}>
        <Grid item lg={4} md={4} sm={8} xs={12}>
          <Box className="secendContentBox">
            {hospitalData?.images[selectedImage] ? (
              <img
                src={`${hospitalData?.images[selectedImage]}`}
                className="imgBox1"
                alt=""
              />
            ) : (
              "No Image Available"
            )}
          </Box>
        </Grid>
        <Grid item lg={2} md={2} sm={4} xs={12}>
          <Box className="contentBox">
            <Box className="imgMainBox">
              {hospitalData &&
                hospitalData?.images?.map((imag, index) => (
                  <img
                    key={index}
                    src={imag || "public/images/bigBox.png"}
                    alt=""
                    className={`imgBox ${
                      selectedImage === index ? "selected" : ""
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
            </Box>
          </Box>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Box className="thirdContentBox">
            <Typography variant="h3">
              {` ${hospitalData.product_name}` || "--"}
            </Typography>
            <Typography
              variant="body2"
              dangerouslySetInnerHTML={{
                __html: hospitalData.product_description || "--",
              }}
            ></Typography>
            <Box>
              {hospitalData.variants &&
                hospitalData.variants.map(
                  (variant, index) =>
                    selectedVariant === variant.unit_size_value && (
                      <Typography variant="h5" key={index}>
                        Price : &nbsp;&nbsp; ₹ {variant.price * quantity}
                      </Typography>
                    )
                )}
            </Box>
            {!selectedVariant && hospitalData.variants.length > 0 && (
              <Box>
                <Typography variant="h5">
                  Price :&nbsp;&nbsp; ₹{" "}
                  {hospitalData.variants[0].price * quantity}{" "}
                </Typography>
              </Box>
            )}
            <Box className="priceBtn">
              <>
                <Typography variant="h5">
                  variants :{" "}
                  {hospitalData.variants &&
                    hospitalData.variants.map((variant, index) => (
                      // {selectedVariantId =='' &&setSelectedVariantId(variant?.id)}
                      <Button
                        key={index}
                        onClick={() =>
                          handleVariantClick(
                            variant.unit_size_value,
                            variant?.id,
                            variant?.quantity
                          )
                        }
                        className={
                          selectedVariant === variant.unit_size_value ||
                          (!selectedVariant && index === 0)
                            ? classes.selectedButton
                            : classes.unselectedButton
                        }
                      >
                        {variant.unit === "other"
                          ? variant.unit_size_value
                          : `${variant.unit_size_value} ${variant.unit}`}
                      </Button>
                    ))}
                </Typography>
              </>
            </Box>
            {selectedVariantQuantity > 0 && (
              <Typography variant="h5">
                {" "}
                Quantity Available : &nbsp;{selectedVariantQuantity}
              </Typography>
            )}
            {selectedVariantQuantity > 0 ? (
              <Box className="lastBox">
                <Box className="subContentBox1">
                  <Typography
                    variant="body2"
                    onClick={handleDecreaseQuantity}
                    style={{ cursor: "pointer" }}
                  >
                    -
                  </Typography>
                  <Typography variant="body2">{quantity}</Typography>
                  <Typography
                    variant="body2"
                    onClick={handleIncreaseQuantity}
                    style={{ cursor: "pointer" }}
                  >
                    +
                  </Typography>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    className="filterBtn"
                    onClick={() => {
                      addToCart();
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
                {/* <Box>
                <Button variant="contained" className="filterBtn">
                  Share Health Report
                </Button>
              </Box> */}
              </Box>
            ) : (
              <Box className="lastBox">
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    className="filterBtn outOfStock"
                    disabled
                  >
                    out of stock
                  </Button>
                </Box>
                {/* <Box>
                <Button variant="contained" className="filterBtn">
                  Share Health Report
                </Button>
              </Box> */}
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDescription;
