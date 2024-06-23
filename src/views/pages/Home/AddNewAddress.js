import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  makeStyles,
  Button,
  TextField,
  Radio,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Dialog,
  IconButton,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import { RxCross1 } from "react-icons/rx";
import { MdModeEdit } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { ApiConfig } from "src/config/apiConfig";
import axios from "axios";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getApiHandler } from "src/config/service";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { RiDeleteBin4Fill } from "react-icons/ri";
import { RiDeleteBin4Fill, RiProductHuntFill } from "react-icons/ri";
const useStyles = makeStyles((theme) => ({
  muiMainBox: {
    padding: "50px 5%",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    "& .react-tel-input": {
      width: "100% !important",
      "& input": {
        width: "100% !important",
        background: theme.palette.background.default,
        height: "49px",
        border: "1.2px solid rgba(0, 0, 0, 0.10)",
        fontFamily: "Outfit",
        "&:-webkit-autofill": {
          boxShadow: `0 0 0 1000px ${theme.palette.background.default} inset !important`,
        },
      },
    },
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
      "@media(max-width:450px)": {
        flexDirection: "column",
        gap: "15px",
        alignItems: "flex-start",
      },
      "& .filterBtn": {
        borderRadius: "10px",
        fontSize: "18px",
        padding: "10px 45px",
        height: "auto",
        "@media(max-width:599px)": {
          fontSize: "14px",
          width: "100%",
          maxWidth: "185px",
          padding: "10px 11px",
        },
      },
    },
    "& .MuiIconButton-label": {
      color: "#681E65",
    },
    "& .mainBox": {
      border: "1px solid #D9D9D9",
      padding: "20px",
      borderRadius: "10px",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "10px",
      "&:hover": {
        border: "1px solid #681E65",
      },
    },
    "& .mainBox1": {
      display: "flex",
      gap: "10px",
      alignItems: "flex-start",
    },
    "& .some": {
      display: "flex !important",
      alignItems: "center !important",
    },
    "& .mainContentBox": {
      display: "flex",
      flexDirection: "column",
      gap: "30px",
      border: "1px solid #D9D9D9",
      padding: "20px",
      borderRadius: "10px",
      "&:hover": {
        border: "1px solid #681E65",
      },
    },
    "& .gridBox": {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
    "& .gridMainBox": {
      padding: "0 20px",
      display: "flex",
      flexDirection: "column",
      gap: "30px",
      "@media(max-width:500px)": { padding: "0" },
    },
    "& .PrivateSwitchBase-root-49": {
      padding: "9px 9px 9px 0",
    },
    "& .btn": {
      color: "#000",
      border: "none",
      borderRadius: "10px",
      padding: "10px 50px",
      fontSize: "18px",
      fontWeight: "500",
      background: "#DDD",
      "@media(max-width:500px)": { fontSize: "14px", padding: "10px 30px" },
      "&:hover": {
        background: "#681E65",
        color: "#FFF",
      },
    },
    "& .button1": {
      display: "flex",
      gap: "10px",
      "@media(max-width:400px)": { flexDirection: "column" },
    },
    "& .MuiFilledInput-input": {
      padding: "15px",
    },
    "& .MuiFilledInput-root": {
      background: "rgba(0,0,0,0.06)",
      border: "1px solid rgba(0,0,0,0.10)",
      borderRadius: "10px",
    },
    "& .MuiFilledInput-underline:before": {
      borderBottom: "none",
    },
    "& .MuiFilledInput-underline:after": {
      borderBottom: "none",
    },
    "& .MuiInputLabel-filled.MuiInputLabel-shrink": {
      display: "none",
    },
    "& .MuiFilledInput-input": {
      padding: "15px",
    },
    "& .place": {
      fontSize: "16px",
      color: "rgba(0,0,0,0.5)",
    },
  },
  sub: {
    width: "100%",
    "& .dialogContainer": {
      padding: "20px",
      overflow: "scroll",
      "& .mainMedicineBox": {
        margin: "10px 0px",
        display: "flex",
        justifyContent: "space-between",
      },
      "& .medicineImg": {
        border: "1px solid #D9D9D9",
        height: "80px",
        width: "100%",
        maxWidth: "60px",
        borderRadius: "10px",
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& img": {
          position: "relative",
          top: "0px",
          backgroundSize: "cover !important",
          backgroundRepeat: "no-repeat !important",
          objectFit: "cover !important",
        },
      },
      "& .medDetails": {
        display: "flex",
        justifyContent: "start",
      },
    },
    "& .dialigContent": {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
      "& svg": {
        cursor: "pointer",
      },
    },
    "& .MuiDialog-paper": {
      width: "100%",
      maxWidth: "450px !important",
      borderRadius: "20px !important",
    },
    "& .dialogBox": {
      borderTop: "1px solid rgba(8, 5, 21, 0.20)",
      padding: "20px 0",
      display: "flex",
      justifyContent: "space-between",
      "& h6": {
        color: "#681E65",
        fontSize: "20px",
        fontWeight: "600",
        lineHeight: "normal",
      },
    },
    "& .imgBox": {
      maxWidth: "31px",
      padding: "10px",
      border: "1px solid #B8B8B8",
      borderRadius: "10px",
    },
    "& .contentBox": {
      display: "flex",
      gap: "10px",
    },
    "& h6": {
      color: "#161E29",
      lineHeight: "normal",
      fontWeight: "500",
    },
    "& .fontItem1": {
      fontSize: "20px",
      "@media(max-width:767px)": {
        fontSize: "14px",
        lineHeight: "18px",
      },
    },
    "& .fontItem": {
      fontSize: "24px",
      "@media(max-width:767px)": {
        lineHeight: "22px",
        fontSize: "16px !important",
      },
    },
    "& .fontMainItem": {
      fontSize: "24px",
      textDecoration: "underline",
    },
    "& body2": {
      color: "rgba(0, 0, 0, 0.60)",
      lineHeight: "35px",
      fontWeight: "500",
    },
    "& .dialogTitle": {
      color: "#080515)",
      fontFamily: "Outfit",
      fontSize: "32px",
      lineHeight: "noral",
      fontWeight: "600",
    },

    "& .orderDescription": {
      borderTop: "1px solid rgba(8, 5, 21, 0.20)",
      padding: "20px 0",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      "@media(max-width:767px)": {
        gap: "13px",
      },
    },
    "& .spacing": {
      display: "flex",
      justifyContent: "space-between",
      gap: "20px",
    },
    "& .dialogMainContentBox": {
      "& h6": {
        marginBottom: "16px",
      },
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
      justifyContent: "center",
    },
    "& .dialogBtn": {
      padding: "15px 30px",
    },
    "& .buttonBox": {
      display: "flex",
      justifyContent: "center",
    },
    "& .dialogBtn1": {
      maxWidth: "400px",
      width: "100%",
      marginTop: "20px",
    },
  },

  secendDialog: {
    width: "100%",
    "& .dialogContainer1": {
      padding: "50px",
      "@media(max-width:450px)": { padding: "20px" },
      "& h4": {
        fontSize: "30px",
        color: "#080515",
        paddingTop: "30px",
        textAlign: "center",
        lineHeight: "normal",
      },
      "& h6": {
        color: "rgba(0, 0, 0, 0.60)",
        paddingTop: "30px",
        textAlign: "center",
        lineHeight: "normal",
        "@media(max-width:767px)": {
          paddingTop: "20px",
        },
      },
    },
  },
}));
const data = [
  {
    imgSrc: "./images/smallBox.png",
    itemName: "Nestle Nan Pro Follow-Up Formula",
    itemCode: "DP-9457454",
    itemPrice: "$100",
  },
  {
    imgSrc: "./images/smallBox.png",
    itemName: "Nestle Nan Pro Follow-Up Formula",
    itemCode: "DP-9457454",
    itemPrice: "$100",
  },
  {
    imgSrc: "./images/smallBox.png",
    itemName: "Nestle Nan Pro Follow-Up Formula",
    itemCode: "DP-9457454",
    itemPrice: "$100",
  },
];
const AddNewAddress = () => {
  const classes = useStyles();
  const [totalPrice, setTotalPrice] = useState([]);
  console.log("totalPrice-=-=-", totalPrice);
  const [address, setAddress] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    country: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  console.log("formFa=-=-a", formData);
  const history = useHistory();
  const [state, setState] = useState([{}]);

  const [city, setCity] = useState([]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([{}]);
  const [openconfirm, setOpenconfirm] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [state_id, setstateid] = useState("");
  const [country_id, setcountryid] = useState("");
  const [editaddres, seteditaddress] = useState(false);

  // const handleChange = (event) => {
  //   setState(event.target.value);
  // };
  // const handleChange1 = (event) => {
  //   setCountry(event.target.value);
  // };
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen2 = () => {
    setOpenconfirm(true);
  };
  const handleClose2 = () => {
    setOpenconfirm(false);
    setOpen(false);
  };
  const handleClickOpenAddressForm = (item) => {
    setShowAddressForm(true);

    setFormData({
      id: item.id, // Assuming you have an id field for each address
      firstName: item.first_name,
      lastName: item.last_name,
      email: item.email,
      mobile: item.phone_number,
      country: item.country_id,
      address: item.address,
      city: item.city_id,
      state: item.state_id,
      pincode: item.pin_code,
    });
  };

  const handleCloseAddressForm = () => {
    setShowAddressForm(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      country: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });
  };

  const [isLoading, setIsLoading] = useState(true);

  const fetchAllAddress = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "GET",
        url: ApiConfig.fetchAllAddress,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.responseCode === 200) {
        setData(response?.data?.responseData);
        setIsLoading(false);
        // // toast.success(response?.data?.responseMessage);
      } else {
        console.error(response.data?.responseMessage || "Something went wrong");
        toast.error(response?.data?.responseMessage);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(
        error?.response?.data?.responseMessage || "Something went wrong"
      );
    }
  };

  const handleDeleteAddress = async (address_id) => {
    const token = localStorage.getItem("token");

    // const productId = parseInt(selectedAppointment);
    try {
      const response = await axios({
        method: "POST",
        url: ApiConfig.deleteAddress,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          id: address_id,
        },
      });
      if (response.data?.responseCode === 200) {
        // toast.success(response?.data?.responseMessage);
        fetchAllAddress();
      } else {
        toast.error(response?.data?.responseMessage);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addAddress = async (e, id) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: editaddres == false ? "POST" : "PUT", // Assuming you are using PUT for updating existing addresses
        url:
          editaddres == false
            ? `${ApiConfig.addAddress}`
            : `${ApiConfig.updateAddress}${id}/`, // Assuming this is the endpoint for updating an address
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },

        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: formData.mobile,
          address: formData.address,
          pin_code: formData.pincode,
          set_default: formData.default,
          city_id: formData.city,
        },
      });
      // if(editaddres==true)seteditaddress(false);
      if (response.data?.responseCode === 201) {
        setShowAddressForm(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          country: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
        });
        fetchAllAddress();
        toast.success(response?.data?.responseMessage);
      } else if (response.data?.responseCode === 200) {
        setShowAddressForm(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          country: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
        });
        fetchAllAddress();
        toast.success(response?.data?.responseMessage);
      } else {
        console.error(response.data?.responseMessage || "Something went wrong");
        toast.error(response?.data?.responseMessage);
      }
    } catch (error) {
      // toast.error(error?.response?.data?.responseMessage || "Something went wrong")
      console.error(
        error?.response?.data?.responseMessage || "Something went wrong"
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setOpen(true);
    console.log(formData);
    console.log("fff");
  };

  useEffect(() => {
    fetchAllAddress();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchCountry = async () => {
    const res = await getApiHandler("country");
    console.log(res, "dddddddddddddddd");
    if (!res) {
      return;
    }
    console.log(res?.data, "country");
    setCountries(res?.responseData?.length > 0 ? res?.responseData : {});
  };

  const fetchState = async (countryId) => {
    try {
      const res = await getApiHandler("state", { country_id: countryId });
      if (!res) {
        return;
      }
      console.log(res?.data, "dhwjdghwjg");
      setState(res?.responseData?.length > 0 ? res?.responseData : {});
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCity = async (stateId) => {
    try {
      const res = await getApiHandler("city", { state_id: stateId });
      if (res?.responseData) {
        console.log(res, "dhwjdghwjg");
        setCity(res?.responseData);
        console.log(city, "cityyyyyyyy");
        console.log(city, "ssdsds");
      } else {
        console.error("Error fetching cities:");
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  useEffect(() => {
    if (formData.country) {
      fetchState(formData.country);
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.state) {
      fetchCity(formData.state);
      console.log(city, "cityyyyyyyyy");
    }
  }, [formData.state]);

  // const handleEditAddress = (addressId) => {
  //   // Redirect to edit address page with addressId
  //   history.push(`/edit-address/${addressId}`);
  // };

  const handleRadioClick = async (addressId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "PUT",
        url: `${ApiConfig.setDefaultAddress}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          id: addressId,
        },
        // data: { set_default: true }, // Set the selected address as default
      });

      if (response.data?.responseCode === 200) {
        fetchAllAddress(); // Fetch all addresses to update the UI
        // // toast.success(response?.data?.responseMessage);
      } else {
        console.error(response.data?.responseMessage || "Something went wrong");
        toast.error(response?.data?.responseMessage);
      }
    } catch (error) {
      console.error(
        error?.response?.data?.responseMessage || "Something went wrong"
      );
    }
    // setData(updatedAddresses);
  };

  const fetchAllStates = async () => {
    try {
      const res = await getApiHandler("state");
      if (!res) {
        return;
      }
      setState(res?.responseData?.length > 0 ? res?.responseData : []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCountryChange = (event) => {
    const selectedCountryId = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      country: selectedCountryId,
      state: "",
      city: "",
    }));
    if (selectedCountryId === "IND") {
      fetchAllStates();
    } else {
      fetchState(selectedCountryId);
    }
  };

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setFormData({
      ...formData,
      state: selectedState,
      city: "",
    });
  };

  const handleCityChange = (event) => {
    const selectedCityId = event.target.value;
    setFormData({
      ...formData,
      city: selectedCityId,
    });
  };

  const handleContinue = () => {
    setOpen(true);
    fetchData();
  };

  const handleMyorder = () => {
    history.push("/myorder");
    return;
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "GET",
        url: `${ApiConfig.previewData}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setTotalPrice(response?.data?.responseData?.cart);

      const { default_address } = response.data.responseData;

      // setTotalPrice(cart.total_price);
      setAddress(
        `${default_address.address},${default_address.city},${default_address.state},${default_address.pin_code},${default_address.country}`
      );

      console.log(totalPrice, "total");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const orderPlace = async () => {
    setIsOrderLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "POST",
        url: `${ApiConfig.placeOrder}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Update state with response data
      setResponseData(response.data.responseData);
      // Open the confirm modal
      setOpenconfirm(true);
      setIsOrderLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsOrderLoading(false);
    }
  };

  return (
    <Box className={classes.muiMainBox}>
      {/* {data?.map((item) => (
          <Box className="mainBox">
        <Box className="mainBox1">
       
            <>
            <Radio 
  checked={item.set_default} 
  onClick={() => handleRadioClick(item.id)} 
/>
              <Box>
                <>
                  <Typography variant="body2">
                    {` ${item?.first_name} ${item?.last_name}`}
                  </Typography>
                  <Typography variant="body2">
                    {` ${item?.email},  ${item?.phone_number}`}
                  </Typography>
                  <Typography variant="body2">
                    {` ${item?.address},  ${item?.city}, ${item?.state} ,${item?.country} ,${item?.pin_code}`}
                  </Typography>
                </>
              </Box>
            </>
      
        </Box>
     
        <Button>
              <MdModeEdit />
            </Button>

      </Box>
             ))} */}

      {showAddressForm === false ? (
        <>
          <Box className="titleBox">
            <Typography variant="h2">Choose Delivery Address</Typography>
            <Button
              variant="outlined"
              className="filterBtn"
              onClick={() => history.push("/mycart")}
            >
              Back to Cart
            </Button>
          </Box>
          {isLoading ? (
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            data?.map((item) => (
              <Box className="mainBox" key={item.id}>
                <Box className="mainBox1">
                  <>
                    <Radio
                      checked={item.set_default}
                      onClick={() => handleRadioClick(item.id)}
                    />
                    <Box>
                      <>
                        <Typography variant="body2">
                          {`${item?.first_name} ${item?.last_name}`}
                        </Typography>
                        <Typography variant="body2">
                          {`${item?.email},  ${item?.phone_number}`}
                        </Typography>
                        <Typography variant="body2">
                          {`${item?.address},  ${item?.city}, ${item?.state}, ${item?.country}, ${item?.pin_code}`}
                        </Typography>
                      </>
                    </Box>
                  </>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Button className="icon">
                    <RiDeleteBin4Fill
                      color="primary"
                      onClick={() => handleDeleteAddress(item.id)}
                      style={{
                        color: "#681e65",
                        fontSize: "25px",
                        cursor: "pointer",
                      }}
                      // onClick={() => handleOpenModal(product?.product_id)}
                    />
                  </Button>

                  <Button
                    onClick={() => {
                      handleClickOpenAddressForm(item);
                      seteditaddress(true);
                    }}
                  >
                    <MdModeEdit
                      color="primary"
                      style={{ color: "#681e65", fontSize: "25px" }}
                    />
                  </Button>
                </Box>
              </Box>
            ))
          )}

          <Box style={{ display: "flex", gap: "10px" }}>
            {data.length !== 0 && (
              <Button
                // className="btn"
                variant="contained"
                color="primary"
                onClick={handleContinue}
              >
                Continue
              </Button>
            )}
            <Button
              // className="btn"
              variant="contained"
              color="secondary"
              onClick={() => {
                setShowAddressForm(true);
                seteditaddress(false);
              }}
            >
              Add New Address
            </Button>
          </Box>
        </>
      ) : (
        <Box className="mainContentBox">
          <form>
            <Box className="gridMainBox">
              <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Box className="gridBox">
                    <Typography variant="h6">First Name</Typography>
                    <TextField
                      type="text"
                      fullWidth
                      variant="outlined"
                      placeholder="Enter first name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Box className="gridBox">
                    <Typography variant="h6">Last Name</Typography>
                    <TextField
                      type="text"
                      fullWidth
                      variant="outlined"
                      placeholder="Enter last name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Box className="gridBox">
                    <Typography variant="h6">Email</Typography>
                    <TextField
                      type="email"
                      fullWidth
                      variant="outlined"
                      placeholder="Enter email address"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Box className="gridBox">
                    <Typography variant="h6">Mobile Number</Typography>
                    <PhoneInput
                      country={"in"}
                      value={formData.mobile}
                      onChange={(value) =>
                        handleInputChange({ target: { name: "mobile", value } })
                      }
                      inputProps={{
                        name: "mobile",
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Box className="gridBox">
                    <Typography variant="h6">Street Address</Typography>
                    <TextField
                      type="text"
                      fullWidth
                      variant="outlined"
                      placeholder="Enter street address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </Box>
                </Grid>

                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Box className="gridBox">
                    <Typography variant="h6">Country</Typography>
                    <FormControl
                      variant="filled"
                      className={classes.formControl}
                    >
                      <InputLabel
                        id={`demo-simple-select-filled-label`}
                        className="place"
                      >
                        select country
                      </InputLabel>
                      <Select
                        id="demo-simple-select-filled"
                        name="country"
                        value={formData.country}
                        onChange={handleCountryChange}
                      >
                        {countries.map((country) => (
                          <MenuItem key={country.id} value={country.id}>
                            {country.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Box className="gridBox">
                    <Typography variant="h6">State</Typography>
                    <FormControl
                      variant="filled"
                      className={classes.formControl}
                    >
                      <InputLabel
                        id={`demo-simple-select-filled-label`}
                        className="place"
                      >
                        select state
                      </InputLabel>
                      <Select
                        id="demo-simple-select-filled"
                        name="state"
                        value={formData.state}
                        onChange={handleStateChange}
                        disabled={formData.country === ""}
                      >
                        {state.map((state) => (
                          <MenuItem key={state.id} value={state.id}>
                            {state.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>

                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Box className="gridBox">
                    <Typography variant="h6">City</Typography>
                    <FormControl
                      variant="filled"
                      className={classes.formControl}
                    >
                      <InputLabel
                        id={`demo-simple-select-filled-label`}
                        className="place"
                      >
                        select city
                      </InputLabel>
                      <Select
                        id="demo-simple-select-filled"
                        name="city"
                        value={formData.city}
                        onChange={handleCityChange}
                        disabled={formData.state === ""}
                      >
                        {city.map((cit) => (
                          <MenuItem key={cit.id} value={cit.id}>
                            {cit.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Box className="gridBox">
                    <Typography variant="h6">Pin Code</Typography>
                    <TextField
                      type="text"
                      fullWidth
                      variant="outlined"
                      placeholder="Enter pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Box className="button1">
                <Button
                  /* className="btn" */ variant="contained"
                  color="secondary"
                  onClick={handleCloseAddressForm}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  /* className="btn" */ variant="contained"
                  color="primary"
                  onClick={(e) => {
                    let id = null;
                    if (editaddres) {
                      id = formData.id;
                    }
                    addAddress(e, id);
                  }}
                >
                  {editaddres ? "Update" : "Add"}
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      )}

      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.sub}
      >
        <Box className="dialogContainer">
          <Box className="dialigContent">
            <Typography className="dialogTitle">Order Summary</Typography>
            <RxCross1 onClick={handleClose} />
          </Box>
          <Divider />
          {totalPrice.products?.map((item) => (
            <Box className="mainMedicineBox">
              <Box className="medDetails">
                <Box className="medicineImg">
                  {/* <img src="/images/vitamin_3.png" alt="vitamin_3" /> */}

                  {item?.product_image[0] ? (
                    <img
                      src={item.product_image[0]}
                      style={{ width: "100%" }}
                      alt=""
                    />
                  ) : (
                    <img src="/images/vitamin_3.png" alt="vitamin_3" />
                  )}
                </Box>
                <Box ml={1}>
                  <Typography
                    variant="body2"
                    style={{
                      fontSize: "18px",
                      color: "#161E29",
                      marginBottom: "8px",
                    }}
                  >
                    {item?.product_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ fontSize: "16px", color: "#00000099" }}
                  >
                    {item?.product_unit}
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="body2"
                style={{
                  color: "#681E65",
                }}
              >
                ₹{item?.product_price ? item?.product_price : "0"}
              </Typography>
            </Box>
          ))}
          <Box className="orderDescription">
            <Box className="displaySpacebetween">
              <Typography
                variant="body2"
                className="fontItem1"
                style={{ color: "#08051599" }}
              >
                Order
              </Typography>
              <Typography variant="body2" className="fontItem1">
                ₹{totalPrice?.total_price}
              </Typography>
            </Box>
            <Box className="spacing">
              <Typography
                variant="body2"
                className="fontItem1"
                style={{ color: "#08051599" }}
              >
                Shipping
              </Typography>
              <Typography variant="body2" className="fontItem1">
                ₹ 0
              </Typography>
            </Box>
            <Box className="spacing">
              <Typography variant="h6" className="fontItem">
                Total
              </Typography>
              <Typography
                variant="h6"
                className="fontItem"
                style={{ color: "#681E65" }}
              >
                ₹{totalPrice?.total_price}
              </Typography>
            </Box>
          </Box>
          <Box className="orderDescription">
            <Box>
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" className="fontMainItem">
                  Address:
                </Typography>
                <Button
                  className="dialogBtn"
                  variant="contained"
                  color="secondary"
                  onClick={handleClose}
                >
                  Change
                </Button>
              </Box>
              <Box style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  style={{
                    background: "#08051566",
                    padding: "5px",
                    fontSize: "12px",
                    marginRight: "8px",
                  }}
                >
                  <CiLocationOn />
                </IconButton>
                <Typography variant="body2" style={{ color: "#08051599" }}>
                  {address}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="orderDescription">
            <Box>
              <Box className="dialogMainContentBox">
                <Typography variant="h6" className="fontMainItem">
                  Payment:
                </Typography>
                {/* <Typography variant="body2" className="contentBox">
                          {" "}
                          <img src="./images/colored.png" /> 74********53252
                </Typography> */}
                <Typography variant="body2" className="contentBox">
                  {" "}
                  Cash on Delivery
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="displayCenter">
            <Button
              className="dialogBtn1"
              variant="contained"
              color="secondary"
              onClick={orderPlace}
              disabled={isLoading}
            >
              {isOrderLoading && isOrderLoading ? (
                <Box
                  style={{
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Confirm Order{" "}
                  <CircularProgress
                    size={20}
                    style={{ color: "#fff", marginLeft: "10px" }}
                  />
                </Box>
              ) : (
                "Confirm Order"
              )}
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Dialog
        open={openconfirm}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.secendDialog}
      >
        <Box className="dialogContainer1">
          <Box style={{ textAlign: "center" }}>
            <img
              src="./images/order.png"
              style={{ width: "100%", maxWidth: "200px" }}
              alt=""
            />
          </Box>
          <Typography variant="h4">Order Placed Successfully!</Typography>
          <Typography variant="h6">
            {" "}
            Your order has been placed successfully.
          </Typography>
          <Button
            style={{ marginTop: "16px" }}
            // className="btn1"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleMyorder}
          >
            Ok
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};
export default AddNewAddress;
