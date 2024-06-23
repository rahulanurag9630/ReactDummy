import {
  Box,
  Button,
  makeStyles,
  Typography,
  IconButton,
  Container,
  FormHelperText,
  TextField,
  Grid,
  InputAdornment,
  Dialog,
  Checkbox,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { getApiHandler } from "src/config/service";

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import { IoEye, IoEyeOff } from "react-icons/io5";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
// import {ApiConfig} from "../../../../config/apiConfig";
import { postApiHandler } from "../../../../config/service";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { DatePicker } from "@material-ui/pickers";
import TodayIcon from "@material-ui/icons/Today";

const useStyles = makeStyles((theme) => ({
  borderError: {
    "& .MuiOutlinedInput-adornedEnd": {
      border: "1px solid red !important",
    },
  },
  borderErrorM: {
    border: "1px solid red !important",
    borderRadius: "5px",
  },
  select: {
    color: "rgba(133, 133, 133, 0.8) !important",
    fontFamily: "Outfit !important",
    fontSize: "14px",
    fontWeight: "100 !important",
    "& .MuiSelect-outlined": {
      paddingTop: "18.5px", // Adjust based on the height of your input field
    },
  },
  childSection: {
    position: "relative",
    height: "170px",
    width: "170px",
    borderRadius: "50%",
    border: "1px dotted #681E65 !important",
    "& img": {
      position: "relative",
      top: "0px",
      height: "170px",
      width: "170px",
      borderRadius: "50%",
      backgroundSize: "cover !important",
      backgroundRepeat: "no-repeat !important",
      objectFit: "cover !important",
    },
  },

  loginMainBox: {
    fill: theme.palette.background.default,
    filter: "drop-shadow(0px 10px 40px rgba(0, 0, 0, 0.16))",
    width: "100%",
    "& .react-tel-input": {
      width: "100% !important",
      "& input": {
        width: "100% !important",
        // background: theme.palette.background.default,
        background: "#f2f2f2",
        height: "49px",
        border: "1.2px solid rgba(0, 0, 0, 0.10)",
        fontFamily: "Outfit",
        "&:-webkit-autofill": {
          boxShadow: `0 0 0 1000px ${theme.palette.background.default} inset !important`,
        },
      },
    },
    "& .fullSignUpBox": {
      "& .infullSignUpBox": {
        borderRadius: "5px",
        background: theme.palette.background.default,
        backdropFilter: "blur(25px)",
        padding: "42px 50px 50px",
        [theme.breakpoints.down("sm")]: {
          padding: "42px 20px 50px",
        },
        "& .signUpHeading": {
          textAlign: "center",
          marginBottom: "14px",
          color: theme.palette.primary.dark,
        },
        "& .signUpsubHeading": {
          textAlign: "center",
          color: theme.palette.primary.light,
          marginBottom: "39px",
          "& .LoginText": {
            color: theme.palette.primary.main,
            cursor: "pointer",
          },
        },
        "& .myGrid": {
          "& > div:first-child": {
            paddingRight: theme.spacing(5),
            [theme.breakpoints.down("sm")]: {
              paddingRight: 0,
            },
          },
          "& h6": {
            color: theme.palette.primary.dark,
            marginBottom: "6px",
            lineHeight: "26px",
          },
          "& .allTextFields": {
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: "1.2px solid rgba(0, 0, 0, 0.10)",
              },
            "& .MuiInputBase-input:-webkit-autofill": {
              boxShadow: `0 0 0 1000px rgba(0, 0, 0, 0.02) inset !important`,
            },
            "& .MuiOutlinedInput-root ": {
              height: "55px",
              background: "rgba(0, 0, 0, 0.02)",
              border: "1.2px solid rgba(0, 0, 0, 0.10)",
            },
            "& .MuiOutlinedInput-input": {
              fontFamily: "Outfit",
            },
          },
          "& .iconsclass1": {
            color: "#585757",
            width: "40px",
            height: "20px",
            fill: "rgba(0, 0, 0, 0.40)",
          },
        },
        "& .fullCheckbox": {
          color: theme.palette.primary.main,
        },
        "& .termsAndPrivacy": {
          color: theme.palette.primary.main,
          cursor: "pointer",
        },
        "& .submittypof": {
          width: "100%",
          maxWidth: "573px",
          height: "55px",
          textTransform: "inherit",
          borderRadius: "10px",
          fontWeight: "400",
        },
      },
    },
    "& .MuiFormHelperText-root.Mui-error": {},
  },

  iconBtn: {
    background: "#681E65",
    border: "1px solid #222",
    position: "absolute",
    cursor: "pointer",
    top: "62%",
    left: "138px",
    height: "40px",
    width: "40px",
    // padding: "12px 12px 7px !important",
    "& svg": {
      color: "#fff",
      fontSize: "18px",
    },
    "&:hover": {
      backgroundColor: "#000", // Change this to your desired hover background color
    },
  },

  DialogBoxPatient: {
    "& .MuiDialog-paperFullWidth ": {
      padding: "40px !important",
    },
    "& .DialogContentP": {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      margin: "25px 0px",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        margin: "16px 0px",
      },
      "& .descDialog": {
        width: "88%",
        textAlign: "center",
        color: theme.palette.primary.light,
      },
    },
    "& .DialogImageP": {
      textAlign: "center",
    },
  },
  formContent: {
    "& h6": {
      marginBottom: "8px",
    },
  },
}));

export default function Login() {
  const [uploadImage, setUploadImage] = useState();
  const [state, setState] = useState([{}]);
  const [countryid, setcountryid] = useState("");
  const [cityid, setcityid] = useState("");
  const [city, setCity] = useState([]);
  const classes = useStyles();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [countries, setCountries] = useState([{}]);
  const [countryFocused, setCountryFocused] = useState(false);
  const [stateFocused, setStateFocused] = useState(false);
  const [cityFocused, setCityFocused] = useState(false);
  const [formData, setFormData] = useState({
    country: "",

    city: "",
    state: "",
  });

  const formInitialSchema = {
    fullName: "",
    email: "",
    dob: null,
    address: "",
    gender: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    termsAndConditions: false,
    country: "",
    city: "",
    state: "",
  };

  const formValidationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Full name is required..")
      .min(2, "Full Name must be at least 2 characters.")
      .max(59, "Full Name must not exceed 60 characters.")
      .matches(/^[a-zA-Z\s]+$/, "Full name should only contain letters.")
      .matches(
        /^(?!.* {2})[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\s]*$/,
        "Full name should not have extra spaces."
      ),
    email: Yup.string()
      .email("Please enter a valid email address.")
      .trim("Trailing spaces not allowed.")
      .required("Please enter email address.")
      .matches(
        /^[a-zA-Z0-9._%+$-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address."
      )
      .min(8, "Email address must be at least 8 characters.")
      .max(49, "Email address must not exceed 50 characters."),
    dob: Yup.date().required("Please select your Date of Birth."),
    address: Yup.string()
      .required("Please enter address.")
      .min(19, "Address must be at least 20 characters.")
      .max(149, "Address must not exceed 150 characters."),
    gender: Yup.string().required("Please select your gender."),
    mobile: Yup.string()
      .min(10, "Mobile number must be atleast 10 digits.")
      .required("Please enter mobile number."),
    password: Yup.string()
      .required("Please enter password.")
      .trim()
      .min(6, "Password must be at least 6 characters.")
      .max(29, "Password must not exceed 30 characters.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,29}$/,
        "Password must contain an uppercase letter, a lowercase letter, a digit, and a special character."
      ),

    confirmPassword: Yup.string()
      .required("Confirm password is required.")
      .oneOf([Yup.ref("password"), null], "Passwords must match."),

    termsAndConditions: Yup.boolean().oneOf(
      [true],
      "Please accept the Terms & Conditions."
    ),
    country: Yup.number().required("Please select a country."),
    state: Yup.number().required("Please select a state."),
    city: Yup.number().required("Please select a city."),
  });

  const handleFormSubmit = async (values) => {
    const dob = new Date(values?.dob).toISOString().split("T")[0];
    setIsLoading(true);

    let mob = values?.mobile.slice(2);

    const payLoadToSend = {
      full_name: values?.fullName,
      mobile_number: mob,
      email: values?.email,
      countrycode: countryCode,
      confirm_password: values?.confirmPassword,
      password: values?.password,
      gender: values?.gender,
      dob: dob,
      address: values?.address,

      city_id: formData?.city,
    };

    try {
      const response = await postApiHandler("signup", payLoadToSend);

      if (response && response.responseCode === 201) {
        setOpen(true);
        console.log("Email:", response?.responseData?.email);

        localStorage.setItem("email", response?.responseData?.email);
        localStorage.setItem("gender", response?.responseData?.gender);
        history.push("/verify-otp", { email: values.email });
      } else {
        console.log("Error response:", response);
        toast.error(response?.data?.responseMessage);
      }

      setIsLoading(false);
    } catch (err) {
      console.log("Error:", err);
      // toast.error(err?.response?.responseMessage || "An error occurred");
      setIsLoading(false);
    }
  };
  const [isFocused, setIsFocused] = useState(false);
  const [touched, setTouched] = useState({
    country: false,
    state: false,
    city: false,
  });

  const handleFocusSelect = () => {
    setIsFocused(true);
  };

  const handleBlurSelect = () => {
    setIsFocused(false);
  };

  const handleCountryFocus = () => {
    setCountryFocused(true);
  };

  const handleCountryBlur = () => {
    setTouched((prevState) => ({
      ...prevState,
      country: true,
    }));
  };

  const handleStateFocus = () => {
    setStateFocused(true);
  };

  const handleStateBlur = () => {
    setTouched((prevState) => ({
      ...prevState,
      state: true,
    }));
  };

  const handleCityFocus = () => {
    setCityFocused(true);
  };

  const handleCityBlur = () => {
    setTouched((prevState) => ({
      ...prevState,
      city: true,
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

  // alert(formData.country==='')

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

  const handleCountryChange = (event, setFieldValue) => {
    const selectedCountryId = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      country: selectedCountryId,
      state: "",
      city: "",
    }));
    setFieldValue("country", selectedCountryId);
    if (selectedCountryId === "IND") {
      fetchAllStates();
    } else {
      fetchState(selectedCountryId);
    }
  };

  const handleStateChange = (event, setFieldValue) => {
    const selectedState = event.target.value;
    setFormData({
      ...formData,
      state: selectedState,
      city: "",
    });
    setFieldValue("state", selectedState);
  };

  const handleCityChange = (event, setFieldValue) => {
    const selectedCityId = event.target.value;
    setFormData({
      ...formData,
      city: selectedCityId,
    });
    setFieldValue("city", selectedCityId);
  };

  return (
    <Box className={`${classes.loginMainBox} displayCenter`}>
      <Container className="fullSignUpBox">
        <Box className="infullSignUpBox">
          <Typography variant="h3" className="signUpHeading">
            Sign Up
          </Typography>
          <Typography className="signUpsubHeading" variant="h6">
            Already have an account?&nbsp;
            <span className="LoginText" onClick={() => history.push("/login")}>
              Login
            </span>
          </Typography>
          <Formik
            initialValues={formInitialSchema}
            initialStatus={{
              success: false,
              successMsg: "",
            }}
            validationSchema={formValidationSchema}
            onSubmit={(values) => handleFormSubmit(values)}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              touched,
              values,
              isValid,
              setFieldValue,
            }) => (
              <Form className={classes.formContent}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box mb={3}>
                      <Typography variant="h6">Full Name</Typography>
                      <TextField
                        className="allTextFields"
                        fullWidth
                        variant="outlined"
                        placeholder="Enter full name"
                        name="fullName"
                        value={values.fullName}
                        error={Boolean(touched.fullName && errors.fullName)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{
                          maxLength: 70,
                        }}
                      />
                      <FormHelperText error className="helperText">
                        {touched.fullName && errors.fullName}
                      </FormHelperText>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box mb={3}>
                      <Typography variant="h6">Email</Typography>
                      <TextField
                        className="allTextFields"
                        fullWidth
                        variant="outlined"
                        placeholder="Enter email address"
                        name="email"
                        value={values.email}
                        error={Boolean(touched.email && errors.email)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                      <FormHelperText error className="helperText">
                        {touched.email && errors.email}
                      </FormHelperText>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box mb={3}>
                      <Typography variant="h6">D.O.B</Typography>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.dob && errors.dob)}
                      >
                        <DatePicker
                          inputVariant="outlined"
                          format="DD/MM/YYYY"
                          placeholder="DD/MM/YYYY"
                          disableFuture
                          value={values.dob}
                          className={
                            touched.dob && errors.dob ? classes.borderError : ""
                          }
                          onChange={(date) => {
                            console.log("dfdfdfdff==>>>", date);
                            setFieldValue("dob", new Date(date));
                          }}
                          clearable
                          InputLabelProps={{ shrink: true }}
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton style={{ padding: "6px" }}>
                                  <TodayIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <FormHelperText error className="helperText">
                          {touched.dob && errors.dob}
                        </FormHelperText>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box mb={3}>
                      <Typography variant="h6">Gender</Typography>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        error={Boolean(touched.gender && errors.gender)}
                      >
                        {!isFocused && values.gender === "" && (
                          <InputLabel
                            id="gender-label"
                            className={classes.select}
                          >
                            Select gender
                          </InputLabel>
                        )}
                        <Select
                          labelId="gender-label"
                          id="gender"
                          name="gender"
                          onFocus={handleFocusSelect}
                          onBlur={handleBlurSelect}
                          value={values.gender}
                          onChange={handleChange}
                          MenuProps={{
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            getContentAnchorEl: null,
                          }}
                        >
                          <MenuItem value="M">Male</MenuItem>
                          <MenuItem value="F">Female</MenuItem>
                          <MenuItem value="O">Other</MenuItem>
                          <MenuItem value="P">Prefer not to say</MenuItem>
                        </Select>
                        <FormHelperText
                          error
                          className="helperText"
                          style={{ margin: "0px 0px" }}
                        >
                          {touched.gender && errors.gender}
                        </FormHelperText>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box mb={3}>
                      <Typography variant="h6">Mobile Number</Typography>
                      <PhoneInput
                        style={{ width: "100%" }}
                        country={"in"}
                        value={values.mobile}
                        className={
                          touched.mobile && errors.mobile
                            ? classes.borderErrorM
                            : ""
                        }
                        onChange={(phone, cc) => {
                          setFieldValue("mobile", phone);
                          setCountryCode(cc?.dialCode);
                          handleChange("mobile")(phone);
                        }}
                        onBlur={handleBlur}
                        inputProps={{
                          name: "mobile",
                          required: true,
                        }}
                      />
                      <FormHelperText error className="helperText">
                        {touched.mobile && errors.mobile}
                      </FormHelperText>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box mb={3}>
                      <Typography variant="h6">Address</Typography>
                      <TextField
                        className="allTextFields"
                        fullWidth
                        variant="outlined"
                        placeholder="Enter location"
                        name="address"
                        id="address"
                        value={values.address}
                        error={Boolean(touched.address && errors.address)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText error className="helperText">
                        {touched.address && errors.address}
                      </FormHelperText>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <Box mb={3}>
                      <Typography variant="h6">Country</Typography>
                      <FormControl
                        variant="outlined"
                        fullWidth
                        className={classes.select}
                      >
                        {/* {!countryFocused && formData.country == "" && (
                          <InputLabel id="country-label">
                            Select country
                          </InputLabel>
                        )} */}
                        <Select
                          labelId="country-label"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={(e) => {
                            handleCountryChange(e, setFieldValue);
                          }}
                          onFocus={handleCountryFocus}
                          onBlur={handleCountryBlur}
                          className={classes.select}
                          error={Boolean(touched.country && errors.country)}
                        >
                          {countries.map((country) => (
                            <MenuItem key={country.id} value={country.id}>
                              {country.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.country && errors.country && (
                          <FormHelperText error className="helperText">
                            {errors.country}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <Box mb={3}>
                      <Typography variant="h6">State</Typography>
                      <FormControl
                        variant="outlined"
                        fullWidth
                        className={classes.select}
                      >
                        {/* {!stateFocused && formData.state == "" && (
                          <InputLabel
                            id="state-label"
                            className={classes.select}
                          >
                            Select state
                          </InputLabel>
                        )} */}
                        <Select
                          labelId="state-label"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={(e) => {
                            handleStateChange(e, setFieldValue);
                          }}
                          onFocus={handleStateFocus}
                          onBlur={handleStateBlur}
                          className={classes.select}
                          error={Boolean(touched.state && errors.state)}
                        >
                          {!stateFocused && formData.state === "" && (
                            <InputLabel className={classes.select}>
                              Select state
                            </InputLabel>
                          )}
                          {state.map((state) => (
                            <MenuItem key={state.id} value={state.id}>
                              {state.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.state && errors.state && (
                          <FormHelperText error className="helperText">
                            {errors.state}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <Box mb={3}>
                      <Typography variant="h6">City</Typography>
                      <FormControl
                        variant="outlined"
                        fullWidth
                        className={classes.select}
                      >
                        {/* {!cityFocused && formData.city == "" && (
                          <InputLabel
                            id="city-label"
                            className={classes.select}
                          >
                            Select city
                          </InputLabel>
                        )} */}
                        <Select
                          labelId="city-label"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={(e) => {
                            handleCityChange(e, setFieldValue);
                          }}
                          onFocus={handleCityFocus}
                          onBlur={handleCityBlur}
                          className={classes.select}
                          error={Boolean(touched.city && errors.city)}
                        >
                          {!cityFocused && formData.city === "" && (
                            <InputLabel className={classes.select}>
                              Select city
                            </InputLabel>
                          )}
                          {city.map((cit) => (
                            <MenuItem key={cit.id} value={cit.id}>
                              {cit.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.city && errors.city && (
                          <FormHelperText error className="helperText">
                            {errors.city}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <Box mb={3}>
                      <Typography variant="h6">Create Password</Typography>
                      <TextField
                        type={showPassword ? "text" : "password"}
                        className="allTextFields"
                        fullWidth
                        variant="outlined"
                        placeholder="Create your password"
                        name="password"
                        value={values.password}
                        error={Boolean(touched.password && errors.password)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onPaste={(e) => e.preventDefault()}
                        onCopy={(e) => e.preventDefault()}
                        inputProps={{
                          maxLength: 20,
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                <Box>
                                  {showPassword ? (
                                    <IoEye className="iconsclass1" />
                                  ) : (
                                    <IoEyeOff className="iconsclass1" />
                                  )}
                                </Box>
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <FormHelperText error className="helperText">
                        {touched.password && errors.password}
                      </FormHelperText>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <Box mb={3}>
                      <Typography variant="h6">Confirm Password</Typography>
                      <TextField
                        type={showConfirmPassword ? "text" : "password"}
                        className="allTextFields"
                        fullWidth
                        variant="outlined"
                        placeholder="Confirm your password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        error={Boolean(
                          touched.confirmPassword && errors.confirmPassword
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{
                          maxLength: 20,
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                edge="end"
                              >
                                <Box>
                                  {showConfirmPassword ? (
                                    <IoEye className="iconsclass1" />
                                  ) : (
                                    <IoEyeOff className="iconsclass1" />
                                  )}
                                </Box>
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        onPaste={(e) => e.preventDefault()}
                        onCopy={(e) => e.preventDefault()}
                      />
                      <FormHelperText error className="helperText">
                        {touched.confirmPassword && errors.confirmPassword}
                      </FormHelperText>
                    </Box>
                  </Grid>
                </Grid>
                <Box mb={5} display="flex" flexDirection="column">
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      className="fullCheckbox"
                      value={values.termsAndConditions}
                      onChange={handleChange}
                      id="termsAndConditions"
                      name="termsAndConditions"
                      error={Boolean(
                        touched.termsAndConditions && errors.termsAndConditions
                      )}
                      onBlur={handleBlur}
                    />
                    <span variant="body2">
                      I agree to the &nbsp;
                      <span
                        className="termsAndPrivacy"
                        onClick={() =>
                          window.open("/terms-and-conditions", "_blank")
                        }
                      >
                        Terms & Conditions
                      </span>{" "}
                      and{" "}
                      <span
                        className="termsAndPrivacy"
                        onClick={() => window.open("/privacy", "_blank")}
                      >
                        Privacy Policy
                      </span>
                    </span>
                  </Box>

                  <Box>
                    <FormHelperText error className="helperText">
                      {touched.termsAndConditions && errors.termsAndConditions}
                    </FormHelperText>
                  </Box>
                </Box>

                <Box className="displayCenter">
                  <Button
                    className="submittypof"
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isLoading || !isValid}
                    style={{ fontSize: "18px" }}
                  >
                    Create Account
                    {isLoading && (
                      <CircularProgress
                        size={20}
                        style={{ color: "#fff", marginLeft: "10px" }}
                      />
                    )}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        className={`${classes.DialogBoxPatient}`}
        maxWidth="xs"
        fullWidth
      >
        <Box className="DialogImageP">
          <img src="images/Frame.png" alt="tick" />
        </Box>

        <Box className="DialogContentP">
          <Typography variant="h3">Registration Confirmation!</Typography>
          <Typography variant="h6" className="descDialog">
            Thank you for choosing to join us. We're almost there. We will reach
            out to you as soon as your details have been verified.
          </Typography>
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => {
            history.push("/verify-otp");
          }}
        >
          Ok
        </Button>
      </Dialog>
    </Box>
  );
}
