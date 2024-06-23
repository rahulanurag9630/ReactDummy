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
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  CircularProgress,
  InputLabel,
  Dialog,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import { postApiHandler } from "../../../../config/service";
import toast from "react-hot-toast";
import { ApiConfig } from "src/config/apiConfig";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { DatePicker } from "@material-ui/pickers";
import TodayIcon from "@material-ui/icons/Today";
import { isValid } from "date-fns";
import { getApiHandler } from "src/config/service";
import { MdModeEditOutline } from "react-icons/md";

const useStyles = makeStyles((theme) => ({
  borderError: {
    "& .MuiInputBase-formControl": {
      border: "1px solid red !important",
    },
  },
  borderErrorS: {
    border: "1px solid red !important",
  },
  borderErrorM: {
    border: "1px solid red !important",
    borderRadius: "5px",
  },
  selectInput: {
    color: "rgba(133, 133, 133, 0.8)",
    fontSize: "14px",
    fontWeight: "100 !important",
  },
  childSection: {
    position: "relative",
    height: "150px",
    width: "150px",
    borderRadius: "50%",
    border: "1px dotted #681E65 !important",
    "& img": {
      position: "relative",
      top: "0px",
      height: "150px",
      width: "150px",
      borderRadius: "50%",
      backgroundSize: "cover !important",
      backgroundRepeat: "no-repeat !important",
      objectFit: "cover !important",
    },
  },
  iconBtn: {
    background: "#681E65",
    border: "1px solid #222",
    position: "absolute",
    cursor: "pointer",
    top: "62%",
    left: "121px",
    // padding: "12px 12px 7px !important",
    height: "40px",
    width: "40px",
    "& svg": {
      color: "#fff",
      fontSize: "18px",
    },
    // "&:hover": {
    //   backgroundColor: "#000", // Change this to your desired hover background color
    // },
  },
  loginMainBox: {
    fill: theme.palette.background.default,
    filter: "drop-shadow(0px 10px 40px rgba(0, 0, 0, 0.16))",
    width: "100%",
    "& .react-tel-input": {
      width: "100% !important",
      "& input": {
        width: "100% !important",
        background: theme.palette.background.default,
        height: "55px",
        border: "1.2px solid rgba(0, 0, 0, 0.10)",
        fontFamily: "Outfit",
        "&:-webkit-autofill": {
          boxShadow: `0 0 0 1000px ${theme.palette.background.default} inset !important`,
        },
      },
    },
    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "#DC0404",
    },
    "& .MuiOutlinedInput-root": {
      background: theme.palette.background.default,
      height: "55px",
      border: "1.2px solid rgba(0, 0, 0, 0.10)",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1.2px solid rgba(0, 0, 0, 0.10)",
    },
    "& .MuiOutlinedInput-root ": {
      height: "55px",
      background: "#fff",
      border: "1.2px solid rgba(0, 0, 0, 0.10)",
    },
    "& .MuiInputBase-input:-webkit-autofill": {
      boxShadow: `0 0 0 1000px ${theme.palette.background.default} inset !important`,
    },
    "& .MuiOutlinedInput-input": {
      fontFamily: "Outfit",
    },
    "& .fullSignUpBox": {
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
        color: "rgba(0, 0, 0, 0.60)",
        marginBottom: "39px",
        "& .LoginText": {
          color: theme.palette.primary.main,
          cursor: "pointer",
        },
      },
      "& .myGrid": {
        rowSpacing: theme.spacing(4),
        "& h6": {
          color: theme.palette.primary.dark,
          marginBottom: "6px",
        },
        "& .allTextFields": {},
        "& .uploadTextFields": {
          cursor: "pointer",
          "& .MuiOutlinedInput-adornedEnd": {
            paddingRight: 0,
            "& .fiuploadparent": {
              background: "rgba(0, 0, 0, 0.20)",
              height: "55px",
              width: "84px",
              cursor: "pointer",
              borderRadius: "0 9px 9px 0",
              "& svg": {
                fontSize: "24px",
                color: "rgba(0, 0, 0, 0.20)",
              },
            },
          },
        },
        "& .iconsclass1": {
          color: "#585757",
          width: "40px",
          height: "20px",
          fill: "rgba(0, 0, 0, 0.40)",
        },
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
      borderRadius: "10px",
      // color: theme.palette.background.default,
      fontSize: "18px",
      [theme.breakpoints.down("xs")]: {
        height: "auto",
      },
    },
  },
  profileImg: {
    position: "relative",
  },
  IconImg: {
    position: "absolute",
    right: "0%",
    top: "66%",
    "& button": {
      // background: "#521752",
    },
    "& svg": {
      // color: "#fff",
    },
  },
  avatar: {
    width: "150px",
    height: "150px",
  },
  input: {
    display: "none",
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
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [uploadImage, setUploadImage] = useState(null);
  // const [uploadImage, setUploadImage] = useState();
  const [hospitalList, setHospitalList] = useState([]);
  const [specialization, setSpecialization] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState("");
  const [selectedHospitalId, setSelectedHospitalId] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [countryFocused, setCountryFocused] = useState(false);
  const [stateFocused, setStateFocused] = useState(false);
  const [cityFocused, setCityFocused] = useState(false);
  const [state, setState] = useState([{}]);
  const [countries, setCountries] = useState([{}]);
  const [city, setCity] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    state: "",
  });
  const formInitialSchema = {
    fullName: "",
    email: "",
    gender: "",
    dob: null,
    mobile: "",
    countrycode: "",
    location: "",
    password: "",
    confirmPassword: "",
    selectHospital: "",
    selectSpecialization: "",
    doctorId: "",
    doctorateCertificate: "",
    proofOfWorking: "",
    termsAndConditions: false,
    country: "",
    state: "",
    city: "",
  };

  const formValidationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Full name is required.")
      .min(2, "Full name must be at least 2 characters.")
      .max(59, "Full name must not exceed 60 characters.")
      .matches(/^[a-zA-Z\s]+$/, "Full name should only contain letters.")
      .matches(
        /^(?!.* {2})[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\s]*$/,
        "Full name should not have extra spaces."
      ),
    email: Yup.string()
      .email("Please enter a valid email address.")
      .trim("Trailing spaces not allowed.")
      .required("Email address is required.")
      .matches(
        /^[a-zA-Z0-9._%+$-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address."
      )
      .min(8, "Email address must be at least 8 characters.")
      .max(49, "Email address must not exceed 50 characters."),
    // dob: Yup.date().required("Please select your Date of Birth."),
    dob: Yup.date()
      .required("Please select your date of birth.")
      .test(
        "minimum-age",
        "You must be at least 18 years old.",
        function (value) {
          const minAgeDate = new Date();
          minAgeDate.setFullYear(minAgeDate.getFullYear() - 20);
          return value <= minAgeDate;
        }
      ),
    gender: Yup.string().required("Please select your gender."),
    mobile: Yup.string()
      .min(10, "Mobile number must be atleast 10 digits.")
      .required("Mobile number is required."),
    password: Yup.string()
      .required("Password is required.")
      .trim()
      .min(6, "Password must be at least 6 characters.")
      .max(29, "Password must not exceed 30 characters.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,29}$/,
        "Password must contain an uppercase letter, a lowercase letter, a digit, and a special character."
      ),
    confirmPassword: Yup.string()
      .required("Confirmation of your password is required.")
      .oneOf([Yup.ref("password"), null], "Password must match."),
    location: Yup.string()
      .max(249, "Location must not exceed 250 characters.")
      .required("Location is required."),
    bio: Yup.string()
      .max(449, "Bio must not exceed 500 characters.")
      .required("Bio is required."),
    selectHospital: Yup.string().required("Hospital is required."),
    selectSpecialization: Yup.string().required("Specialization is required."),
    doctorId: Yup.string().required("Doctor Id is required."),
    doctorateCertificate: Yup.string().required(
      "Doctorate certificate is required."
    ),
    proofOfWorking: Yup.string().required("Proof of Working is required."),
    termsAndConditions: Yup.boolean().oneOf(
      [true],
      "You must accept the Terms & Conditions."
    ),
    country: Yup.number().required("Please select a country."),
    state: Yup.number().required("Please select a state."),
    city: Yup.number().required("Please select a city."),
  });

  const handleFormSubmit = async (values) => {
    const dob = new Date(values?.dob).toISOString().split("T")[0];
    setIsLoading(true);
    console.log("ssss");
    console.log(values, "value");
    const formData1 = new FormData();
    formData1.append("full_name", values?.fullName);
    formData1.append("email", values?.email);
    // countrycode: countryCode,
    formData1.append("countrycode", countryCode);
    formData1.append("mobile_number", values?.mobile.slice(2));
    formData1.append("dob", dob);
    formData1.append("gender", values?.gender);
    formData1.append("address", values?.location);
    formData1.append("about_doctor", values?.bio);
    formData1.append("password", values?.password);
    formData1.append("confirm_password", values?.confirmPassword);
    formData1.append("selected_hospital", values?.selectHospital);
    formData1.append("selected_specialization", values?.selectSpecialization);
    formData1.append("doctor_id_image", values?.doctorId);
    formData1.append("doctor_certificate", values?.doctorateCertificate);
    formData1.append("proof_of_working", values?.proofOfWorking);
    formData1.append("city_id", formData.city);
    formData1.append("profile_picture", uploadImage);
    try {
      const response = await postApiHandler("signupdoc", formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("signupdoc-=-=-=-", response);

      if (response && response.responseCode === 201) {
        // toast.success(response.responseMessage);
        // setOpen(true);
        // localStorage.setItem("email", response?.responseData?.email);
        history.push("/verify-otp", { email: values.email });
      } else {
        console.log("Error response:", response);
        toast.error(response?.response?.data?.responseMessage);
      }
      setIsLoading(false);
    } catch (err) {
      console.log("Error:", err);
      // toast.error(err?.response?.responseMessage || "An error occurred");
      setIsLoading(false);
    }
  };
  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    setUploadImage(file);
  };
  const defaultAvatarUrl = "/images/def_doc.png";
  const handleFileUpload = (event, setFieldValue, fieldName) => {
    const file = event.target.files[0];
    console.log("File:", file);
    console.log("FieldName:", fieldName);

    if (file) {
      // const formData = new FormData();
      // formData.append(fieldName, file);
      setFieldValue(fieldName, file);
      setUploadedFile(file);
    }
  };

  useEffect(() => {
    const fetchHospitalList = async () => {
      setIsDataLoading(true);
      try {
        const response = await axios.get(ApiConfig.doctorList);
        setIsDataLoading(false);

        if (response?.data?.responseCode === 200) {
          setHospitalList(response?.data?.responseData || []);
        }
      } catch (err) {
        console.error("Error:", err);
        // toast.error(err?.response?.ResponseMessage);
        setIsDataLoading(false);
      }
    };
    if (selectedHospitalId) {
      doctorSpecialization(selectedHospitalId);
    }
    fetchHospitalList();
  }, [selectedHospitalId]);
  const doctorSpecialization = async () => {
    setIsDataLoading(true);
    try {
      const response = await axios.get(
        `${ApiConfig.specialization}${selectedHospitalId}`
      );
      setIsDataLoading(false);

      if (response?.data?.responseCode === 200) {
        setSpecialization(response?.data?.responseData || []);
      }
    } catch (err) {
      console.error("Error:", err);
      // toast.error(err?.response?.ResponseMessage);
      setIsDataLoading(false);
    }
  };
  const [isFocused, setIsFocused] = useState(false);

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
    setCountryFocused(false);
  };

  const handleStateFocus = () => {
    setStateFocused(true);
  };

  const handleStateBlur = () => {
    setStateFocused(false);
  };

  const handleCityFocus = () => {
    setCityFocused(true);
  };

  const handleCityBlur = () => {
    setCityFocused(false);
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
        setCity(res?.responseData);
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
        <Box>
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
            setFieldValue
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
              setFieldValue,
              isValid,
            }) => (
              <Form>
                <Grid container spacing={2} className="myGrid">
                  <Grid item xs={12}>
                    <Box
                      mb={2}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="upload-profile-picture"
                        type="file"
                        onChange={handleProfilePictureUpload}
                      />
                      <Box className={classes.profileImg}>
                        {uploadImage ? (
                          <Avatar
                            src={URL.createObjectURL(uploadImage)}
                            alt="Profile"
                            className={classes.avatar}
                          />
                        ) : (
                          <Avatar
                            src={defaultAvatarUrl}
                            alt="Default Profile"
                            className={classes.avatar}
                          />
                        )}
                        <Box className={classes.IconImg}>
                          <label htmlFor="upload-profile-picture">
                            <IconButton
                              // color="primary"
                              style={{
                                background: "#681E65",
                                color: "#fff",
                                padding: "8px",
                                fontSize: "20px",
                              }}
                              aria-label="upload picture"
                              component="span"
                            >
                              <MdModeEditOutline />
                            </IconButton>
                          </label>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <Box mb={3}>
                      <Typography variant="h6">Full name</Typography>
                      <TextField
                        className="allTextFields"
                        fullWidth
                        variant="outlined"
                        placeholder="Enter full name"
                        name="fullName"
                        id="fullName"
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
                        id="email"
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
                      <Typography variant="h6">Mobile number</Typography>
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
                        }}
                      />
                      <FormHelperText error className="helperText">
                        {touched.mobile && errors.mobile}
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
                          maxDate={
                            new Date(
                              new Date().getFullYear() - 20,
                              new Date().getMonth(),
                              new Date().getDate()
                            )
                          }
                          value={values.dob}
                          className={
                            touched.dob && errors.dob ? classes.borderError : ""
                          }
                          onChange={(date) => setFieldValue("dob", date)}
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
                        {/* {!isFocused && (
                          <InputLabel
                            id="gender-label"
                            className={classes.selectInput}
                          >
                            Select gender
                          </InputLabel>
                        )} */}
                        <Select
                          labelId="gender-label"
                          id="gender"
                          name="gender"
                          value={values.gender}
                          onFocus={handleFocusSelect}
                          onBlur={handleBlurSelect}
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
                      <Typography variant="h6">Bio</Typography>
                      <TextField
                        className="allTextFields"
                        fullWidth
                        variant="outlined"
                        placeholder="Enter your bio"
                        name="bio"
                        id="bio"
                        value={values.bio}
                        error={Boolean(touched.bio && errors.bio)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText error className="helperText">
                        {touched.bio && errors.bio}
                      </FormHelperText>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box mb={3}>
                      <Typography variant="h6">Location</Typography>
                      <TextField
                        className="allTextFields"
                        fullWidth
                        variant="outlined"
                        placeholder="Enter location"
                        name="location"
                        id="location"
                        value={values.location}
                        error={Boolean(touched.location && errors.location)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{ maxLength: 250 }}
                      />
                      <FormHelperText error className="helperText">
                        {touched.location && errors.location}
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
                          onChange={(e) =>
                            handleCountryChange(e, setFieldValue)
                          }
                          onFocus={handleCountryFocus}
                          onBlur={handleCountryBlur}
                          className={classes.select}
                          error={Boolean(touched.country && errors.country)}
                        >
                          {!countryFocused && formData.country === "" && (
                            <InputLabel className={classes.select}>
                              Select country
                            </InputLabel>
                          )}
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
                          onChange={(e) => handleStateChange(e, setFieldValue)}
                          onFocus={handleStateFocus}
                          onBlur={handleStateBlur}
                          className={classes.select}
                          disabled={formData.country === ""}
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
                          onChange={(e) => handleCityChange(e, setFieldValue)}
                          onFocus={handleCityFocus}
                          onBlur={handleCityBlur}
                          className={classes.select}
                          disabled={formData.state === ""}
                          error={Boolean(touched.city && errors.city)}
                        >
                          {/* {!cityFocused && formData.city === "" && (
                            <InputLabel className={classes.select}>
                              Select city
                            </InputLabel>
                          )} */}
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
                      <Typography variant="h6">Select hospital</Typography>
                      <FormControl fullWidth>
                        <Select
                          variant="outlined"
                          value={values.selectHospital}
                          className={
                            touched.selectHospital && errors.selectHospital
                              ? classes.borderErrorS
                              : ""
                          }
                          onChange={(e) => {
                            handleChange(e);
                            // handleChange("selectHospital")(e); // Update this line
                            setSelectedHospitalId(e.target.value);
                            doctorSpecialization(e.target.value);
                          }}
                          MenuProps={{
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            getContentAnchorEl: null,
                          }}
                          name="selectHospital"
                          //   className={`${classes.select}`}
                          // IconComponent={() => <ExpandMoreIcon />}
                        >
                          <MenuItem value="">Select Hospital</MenuItem>
                          {hospitalList.map((hospital) => (
                            <MenuItem key={hospital.id} value={hospital.id}>
                              {hospital.name}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText error className="helperText">
                          {touched.selectHospital && errors.selectHospital}
                        </FormHelperText>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box mb={3}>
                      <Typography variant="h6">
                        Select specialization
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          variant="outlined"
                          value={values.selectSpecialization}
                          onChange={handleChange}
                          className={
                            touched.selectSpecialization &&
                            errors.selectSpecialization
                              ? classes.borderErrorS
                              : ""
                          }
                          MenuProps={{
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            getContentAnchorEl: null,
                          }}
                          name="selectSpecialization"
                          disabled={!values.selectHospital}
                          //   className={`${classes.select}`}
                          // IconComponent={() => <ExpandMoreIcon />}
                        >
                          {specialization.map((specializationItem) => (
                            <MenuItem
                              key={specializationItem.id}
                              value={specializationItem.id}
                            >
                              {specializationItem.name}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText error className="helperText">
                          {touched.selectSpecialization &&
                            errors.selectSpecialization}
                        </FormHelperText>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box mb={3}>
                      <Typography variant="h6">Doctor id</Typography>
                      <FormControl fullWidth>
                        <TextField
                          className="uploadTextFields"
                          fullWidth
                          variant="outlined"
                          name="doctorId"
                          value={values.doctorId?.name || ""}
                          error={Boolean(touched.doctorId && errors.doctorId)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <label htmlFor="doctorIdFileInput">
                                  <Box className="displayCenter fiuploadparent">
                                    <FiUpload />

                                    <input
                                      id="doctorIdFileInput"
                                      type="file"
                                      // accept=".pdf,.jpg,.png"
                                      accept=".pdf, .jpg, .png"
                                      style={{
                                        display: "none",
                                        cursor: "pointer",
                                      }}
                                      onChange={(e) =>
                                        handleFileUpload(
                                          e,
                                          setFieldValue,
                                          "doctorId"
                                        )
                                      }
                                    />
                                  </Box>
                                </label>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <FormHelperText error className="helperText">
                          {touched.doctorId && errors.doctorId}
                        </FormHelperText>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box mb={3}>
                      <Typography variant="h6">
                        Doctorate certificate
                      </Typography>
                      <FormControl fullWidth>
                        <TextField
                          className="uploadTextFields"
                          fullWidth
                          variant="outlined"
                          name="doctorateCertificate"
                          id="doctorateCertificate"
                          value={values.doctorateCertificate?.name || ""}
                          error={Boolean(
                            touched.doctorateCertificate &&
                              errors.doctorateCertificate
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <label htmlFor="doctorateCertificateFileInput">
                                  <Box className="displayCenter fiuploadparent">
                                    <FiUpload />

                                    <input
                                      id="doctorateCertificateFileInput"
                                      type="file"
                                      // accept=".pdf,.jpg,.png"
                                      accept=".pdf, .jpg, .png"
                                      style={{
                                        display: "none",
                                        cursor: "pointer",
                                      }}
                                      onChange={(e) =>
                                        handleFileUpload(
                                          e,
                                          setFieldValue,
                                          "doctorateCertificate"
                                        )
                                      }
                                    />
                                  </Box>
                                </label>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <FormHelperText error className="helperText">
                          {touched.doctorateCertificate &&
                            errors.doctorateCertificate}
                        </FormHelperText>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box mb={3}>
                      <Typography variant="h6">Proof of working</Typography>
                      <FormControl fullWidth>
                        <TextField
                          className="uploadTextFields"
                          fullWidth
                          variant="outlined"
                          name="proofOfWorking"
                          id="proofOfWorking"
                          value={values.proofOfWorking?.name || ""}
                          error={Boolean(
                            touched.proofOfWorking && errors.proofOfWorking
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <label htmlFor="proofOfWorkingFileInput">
                                  <Box className="displayCenter fiuploadparent">
                                    <FiUpload />

                                    <input
                                      id="proofOfWorkingFileInput"
                                      type="file"
                                      // accept=".pdf,.jpg,.png"
                                      accept=".pdf, .jpg, .png"
                                      style={{
                                        display: "none",
                                        cursor: "pointer",
                                      }}
                                      onChange={(e) =>
                                        handleFileUpload(
                                          e,
                                          setFieldValue,
                                          "proofOfWorking"
                                        )
                                      }
                                    />
                                  </Box>
                                </label>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <FormHelperText error className="helperText">
                          {touched.proofOfWorking && errors.proofOfWorking}
                        </FormHelperText>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box mb={3}>
                      <Typography variant="h6">Create password</Typography>
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
                      <Typography variant="h6">Confirm password</Typography>
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
                        inputProps={{
                          maxLength: 20,
                        }}
                        onBlur={handleBlur}
                        onChange={handleChange}
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
                      />
                      <FormHelperText error className="helperText">
                        {touched.confirmPassword && errors.confirmPassword}
                      </FormHelperText>
                    </Box>
                  </Grid>
                </Grid>
                <Box className="displayStart CheckBoxParent">
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
                  <span>
                    I agree to the &nbsp;
                    <span
                      className="termsAndPrivacy"
                      onClick={() =>
                        window.open(
                          "/terms-and-conditions",
                          "_blank",
                          "noopener noreferrer"
                        )
                      }
                    >
                      Terms & Conditions
                    </span>{" "}
                    and{" "}
                    <span
                      className="termsAndPrivacy"
                      onClick={() =>
                        window.open("/privacy", "_blank", "noopener noreferrer")
                      }
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
                <Box className="displayCenter"></Box>
                <Box mt={4} className="displayCenter">
                  <Button
                    className="submittypof"
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isLoading || !isValid}
                  >
                    Create account
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
