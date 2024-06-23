import {
  Box,
  Button,
  Grid,
  Typography,
  makeStyles,
  CircularProgress,
  useMediaQuery,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Pagination } from "@material-ui/lab";
import axios from "axios";
import { ApiConfig } from "src/config/apiConfig";
import toast from "react-hot-toast";
import { mediaUrl } from "src/config/apiConfig";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import TruncatedDescription from "src/component/truncatedDescription";

const useStyles = makeStyles((theme) => ({
  productContainer: {
    "& h2": {
      marginBottom: "41px",
      fontSize: "32px",
      color: theme.palette.primary.dark,
      fontWeight: 600,
    },
    "& > div": {
      "& .innerBox": {
        border: "1px solid rgba(8, 5, 21, 0.20)",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "18px",
        height: "100%",
        "& img": {
          width: "100%",
          height: "261px",
          borderRadius: "18px",
          position: "relative",
          top: "0px",
          backgroundSize: "cover !important",
          backgroundRepeat: "no-repeat !important",
          // objectFit: "cover !important",
        },
        "& > div": {
          padding: "12px 10px 22px 16px",
          "& h6": {
            color: theme.palette.primary.dark,
            fontWeight: 500,
            marginBottom: "9.53px",
          },
          "& h4": {
            fontSize: "22px",
          },
          "& p": {
            // color: theme.palette.text.secondary,
            color: "rgb(8 5 21 / 44%)",
            height: "82px",
            overflow: "hidden",
            fontSize: "13px",
            margin: "0px",
          },
          "& .bottomProduct": {
            "& button": {
              // padding: "15px 20px",
              height: "42px",
              // borderRadius: "30px",
              // border: " 2px solid var(--Linear, #4D164F)",
              // fontSize: "18px",
              // color: theme.palette.primary.main,
              // fontWeight: 400,
            },
          },
        },
      },
    },
  },
  pagination: {
    marginTop: "15px",
    width: "fit-content",
    "& button": {
      padding: "7px 14px",
      height: "auto",
      color: "gray",
    },
    "& .MuiPaginationItem-page.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
}));
// const allData = [
//   {
//     image: <img src="images/HP1.png" alt="" />,
//     title: "Skyblue Creator",
//     desc: "D-115, Pocket D, Okhla Phase I, Okhla Industrial Estate, New  Delhi, Delhi 110020 D-115, Pocket D, Okhla Phase I, Okhla Industrial Estate, New Delhi, Delhi 110020",
//   },
//   {
//     image: <img src="images/HP2.png" alt="" />,
//     title: "Skyblue Creator",
//     desc: "D-115, Pocket D, Okhla Phase I, Okhla Industrial Estate, New  Delhi, Delhi 110020 D-115, Pocket D, Okhla Phase I, Okhla Industrial Estate, New Delhi, Delhi 110020",
//   },
//   {
//     image: <img src="images/HP3.png" alt="" />,
//     title: "Skyblue Creator",
//     desc: "D-115, Pocket D, Okhla Phase I, Okhla Industrial Estate, New  Delhi, Delhi 110020 D-115, Pocket D, Okhla Phase I, Okhla Industrial Estate, New Delhi, Delhi 110020",
//   },
//   {
//     image: <img src="images/HP4.png" alt="" />,
//     title: "Skyblue Creator",
//     desc: "D-115, Pocket D, Okhla Phase I, Okhla Industrial Estate, New  Delhi, Delhi 110020 D-115, Pocket D, Okhla Phase I, Okhla Industrial Estate, New Delhi, Delhi 110020",
//   },
//   {
//     image: <img src="images/HP5.png" alt="" />,
//     title: "Skyblue Creator",
//     desc: "D-115, Pocket D, Okhla Phase I, Okhla Industrial Estate, New  Delhi, Delhi 110020 D-115, Pocket D, Okhla Phase I, Okhla Industrial Estate, New Delhi, Delhi 110020",
//   },
//   {
//     image: <img src="images/HP6.png" alt="" />,
//     title: "Skyblue Creator",
//     desc: "D-115, Pocket D, Okhla Phase I, Okhla Industrial Estate, New  Delhi, Delhi 110020 D-115, Pocket D, Okhla Phase I, Okhla Industrial Estate, New Delhi, Delhi 110020",
//   },
//   {
//     image: <img src="images/HP7.png" alt="" />,
//     title: "Skyblue Creator",
//     desc: "D-115, Pocket D, Okhla Phase I, Okhla Industrial Estate, New  Delhi, Delhi 110020 D-115, Pocket D, Okhla Phase I, Okhla Industrial Estate, New Delhi, Delhi 110020",
//   },
//   {
//     image: <img src="images/HP8.png" alt="" />,
//     title: "Skyblue Creator",
//     desc: "D-115, Pocket D, Okhla Phase I, Okhla Industrial Estate, New  Delhi, Delhi 110020 D-115, Pocket D, Okhla Phase I, Okhla Industrial Estate, New Delhi, Delhi 110020",
//   },
//   {
//     image: <img src="images/HP9.png" alt="" />,
//     title: "Skyblue Creator",
//     desc: "D-115, Pocket D, Okhla Phase I, Okhla Industrial Estate, New  Delhi, Delhi 110020 D-115, Pocket D, Okhla Phase I, Okhla Industrial Estate, New Delhi, Delhi 110020",
//   },
//   {
//     image: <img src="images/HP10.png" alt="" />,
//     title: "Skyblue Creator",
//     desc: "D-115, Pocket D, Okhla Phase I, Okhla Industrial Estate, New  Delhi, Delhi 110020 D-115, Pocket D, Okhla Phase I, Okhla Industrial Estate, New Delhi, Delhi 110020",
//   },
//   {
//     image: <img src="images/HP11.png" alt="" />,
//     title: "Skyblue Creator",
//     desc: "D-115, Pocket D, Okhla Phase I, Okhla Industrial Estate, New  Delhi, Delhi 110020 D-115, Pocket D, Okhla Phase I, Okhla Industrial Estate, New Delhi, Delhi 110020",
//   },
//   {
//     image: <img src="images/HP12.png" alt="" />,
//     title: "Skyblue Creator",
//     desc: "D-115, Pocket D, Okhla Phase I, Okhla Industrial Estate, New  Delhi, Delhi 110020 D-115, Pocket D, Okhla Phase I, Okhla Industrial Estate, New Delhi, Delhi 110020",
//   },
// ];
const MedicalProduct = ({
  selectedCategoryId,
  selectedSubcategoryId,
  productName,
}) => {
  const history = useHistory();
  const [categoryList, setCategoryList] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [paginationData, setPaginationData] = useState({
    page: 1,
    size: 10,
  });
  const [totalPages, setTotalPages] = useState(0);

  const product = async () => {
    setIsDataLoading(true);

    try {
      const response = await axios({
        url: productName
          ? `${ApiConfig["product-list"]}?product_name=${productName}`
          : selectedCategoryId
          ? `${ApiConfig["product-list"]}?category_id=${selectedCategoryId}&subcategory_id=${selectedSubcategoryId}&product_name=${productName}`
          : ApiConfig["product-list"],
        method: "GET",
      });
      setIsDataLoading(true);
      console.log(response, "ressssssssssssss");
      if (response?.data?.responseCode === 200) {
        // // toast.success(response.responseMessage || "Data Found Successfully");
        console.log(response?.data?.responseData);
        setCategoryList(response?.data?.responseData);
        setIsDataLoading(false);
        setTotalPages(response?.data?.TotalPages);
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error(err?.response?.responseMessage);
      setIsDataLoading(false);
    }
  };
  const handlePaginationChange = (event, value) => {
    setPaginationData((prevData) => ({
      ...prevData,
      page: value,
    }));
  };

  useEffect(() => {
    product();
  }, [
    selectedCategoryId,
    paginationData.page,
    paginationData.size,
    selectedSubcategoryId,
    productName,
  ]);

  const classes = useStyles();
  const handleAddToCart = (id) => {
    history.push({
      pathname: "/productdescription",
      state: { id: id },
    });
  };
  return (
    <Box className={classes.productContainer}>
      <Typography variant="h2">Product</Typography>

      <Box>
        {isDataLoading ? (
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {categoryList.map((item, i) => (
              <Grid
                item
                key={i}
                xs={12}
                sm={6}
                md={6}
                lg={4}
                onClick={() => handleAddToCart(item?.id)}
              >
                <Box className="innerBox">
                  <img
                    src={
                      item.images && item.images.length > 0
                        ? item?.images[0]
                        : "images/productImg.png"
                    }
                    alt="img"
                  />
                  <Box>
                    <Typography variant="h6" className="whiteSpace">
                      {item.product_name}
                    </Typography>

                    <Typography
                      variant="body1"
                      dangerouslySetInnerHTML={{
                        __html: item.product_description,
                      }}
                      key={item.key}
                    ></Typography>
                  </Box>
                  <Box mt={2} className="displaySpacebetween bottomProduct">
                    <Typography variant="h4">{`₹${
                      item?.variants[0]?.price ? item?.variants[0]?.price : "0"
                    }`}</Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleAddToCart(item?.id)}
                    >
                      Go to Cart
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
            {categoryList.length === 0 && (
              <Grid item xs={12}>
                {/* <Typography variant="body1">
                  No data found for the selected category.
                </Typography> */}
                <Box mx={5} className="displayCenter">
                  <img src="images/no_data.png" alt="no_data" />
                </Box>
              </Grid>
            )}
          </Grid>
        )}
      </Box>
      <Box
        mt={7}
        mb={15}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        {categoryList.length > 0 && totalPages > 1 && (
          <Pagination
            count={totalPages}
            shape="rounded"
            size="small"
            className={classes.pagination}
            page={paginationData.page}
            onChange={handlePaginationChange}
          />
        )}
      </Box>
    </Box>
  );
};

export default MedicalProduct;
