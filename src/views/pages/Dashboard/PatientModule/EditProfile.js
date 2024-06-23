import React, { useEffect, useState } from "react";
import { props } from "react";
import {
  Box,
  Grid,
  Typography,
  makeStyles,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  FormControl,
  InputAdornment,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import { IoIosCloudUpload } from "react-icons/io";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { mediaUrl, url } from "../../../../config/apiConfig";
import { useHistory } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ApiConfig } from "../../../../config/apiConfig";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import {
  BsFillPenFill,
  BsPencil,
  BsUpload,
  BsFillPencilFill,
  BsPencilFill,
} from "react-icons/bs";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import { DatePicker } from "@material-ui/pickers";
import TodayIcon from "@material-ui/icons/Today";
import GoBack from "src/component/GoBack";
const useStyles = makeStyles((theme) => ({
  mainAppBox: {
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    "& .react-tel-input": {
      width: "100%",
      "& input": {
        width: "100% !important",
        background: "#f2f2f2",
        height: "48px",
        border: "1.2px solid rgba(0, 0, 0, 0.10)",
        fontFamily: "Outfit",
        "&:-webkit-autofill": {
          boxShadow: `0 0 0 1000px ${theme.palette.background.default} inset !important`,
        },
      },
    },
    "& h2": {
      color: "#161E29",
      fontFamily: "Calistoga",
      fontStyle: "normal",
      fontWeight: "500",
      display: "flex",
      gap: "10px",
    },
    "& .subBox": {
      background: "#FFF",
      borderRadius: "15px",
      width: "100%",
      padding: "40px 0",
      "@media(max-width:599px)": {
        padding: "20px 0px",
      },
    },
    "& .gridBox": {
      "& h6": {
        color: "#080515",
        // fontSize: "18px",
        fontStyle: "normal",
        marginBottom: "5px",
      },
    },
    "& .gridBoxImage": {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      alignItems: "center",
    },
    "& .formBox": {
      padding: "0 30px",
      display: "flex",
      flexDirection: "column",
      gap: "25px",
      "@media(max-width:599px)": {
        padding: "0 20px",
        gap: "15px",
      },
    },
    "& .inputBox": {
      // maxWidth: "700px",
      width: "100%",
    },
    " & .updateContent": {
      maxWidth: "700px",
      border: "1px solid rgba(0, 0, 0, 0.10)",
      borderRadius: "10px",
      backdropFilter: "blur(3.240802526473999px)",
      padding: "50px 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    "& .dropzone": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
    },
    "& .icon": {
      width: "35px",
      background: "#681E65",
      color: "#FFF",
      fontSize: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "35px",
      borderRadius: "10px",
    },
    "& .imgBox": {
      "@media(max-width:767px)": {
        height: "28px",
        width: "28px",
      },
    },
    "& .text": {
      color: "#161E29",
      textAlign: "center",
      fontFamily: "Outfit",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "normal",
    },
    "& .filterBtn": {
      height: "45px",
      borderRadius: "50px",
      marginRight: "10px",
      padding: "0 40px",
    },
    "& .button1": {
      display: "flex",
      gap: "10px",
      // padding: "0 20px",
    },
  },
  childSection: {
    position: "relative",
    height: "200px",
    width: "200px",
    borderRadius: "50%",
    border: "1px dotted #681E65 !important",
    "& img": {
      position: "relative",
      top: "0px",
      height: "200px",
      width: "200px",
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
    left: "157px",
    padding: "12px 12px 7px !important",
    "& svg": {
      color: "#fff",
    },
    "&:hover": {
      backgroundColor: "#000",
    },
  },
}));

const EditProfile = () => {
  const [name, setName] = useState("");
  const classes = useStyles();
  const history = useHistory();
  const [uploadImage, setUploadImage] = useState();
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noClick: true,
    noKeyboard: true,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  useEffect(() => {
    const getProfile = async () => {
      const token = localStorage.getItem("token");
      setIsLoading(true);

      try {
        const response = await axios({
          url: ApiConfig.getProfileData,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response && response?.data?.responseCode === 200) {
          console.log(response, "responseeeeee=-=-=");
          setProfileData(response?.data?.responseData);
          setUploadImage(response?.data?.responseData?.profile_picture);
          console.log(profileData, "profileeeee");
          //   initialValues.fullName = response?.responseData?.fullName;
          //   initialValues.email = response?.responseData?.email;
          //   initialValues.contact = response?.responseData?.contact;
        } else {
          console.log("Error response:", response);
          toast.error(response?.data?.responseMessage);
        }

        setIsLoading(false);
      } catch (err) {
        console.log("Error:", err);
        toast.error(err?.response?.responseMessage || "An error occurred");
        setIsLoading(false);
      }
    };

    getProfile();
  }, []);

  const handleImageUpload = async (e) => {
    console.log(e.target.files[0], "fffffffffffffff");
    const file = e.target?.files[0];
    const token = localStorage.getItem("token");

    const formData = new FormData();
    const id = toast.loading("Upload Media");
    formData.append("profile_picture", file);
    try {
      const response = await axios({
        url: ApiConfig.uploadImge,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      if (response && response?.data?.responseCode === 200) {
        console.log(response?.responseData);
        toast.dismiss(id);
        setUploadImage(response?.data?.responseData?.profile_picture);
        console.log(profileData, "profileeeee");
      } else {
        toast.error(
          response?.data?.responseMessage || "Unable to upload media",
          { id: id }
        );
        console.log("Error response:", response);
      }
      setIsLoading(false);
    } catch (err) {
      console.log("Error:", err);
      toast.error(
        err?.response?.responseMessage || "An error occurred during upload"
      );
      setIsLoading(false);
    }
  };
  // const id = toast.loading("Upload Media");

  const handleSubmit1 = async (values) => {
    const token = localStorage.getItem("token");
    let mob = values?.mobile.slice(2);
    setIsLoading(true);
    // const actualMobileNumber = values.mobile.split(" ")[1];
    const dob = new Date(values?.dob).toISOString().split("T")[0];
    try {
      const formData = new FormData();
      formData.append("profile_picture", values.profile_picture);
      formData.append("full_name", values.fullName);
      formData.append("email", values.email);
      formData.append("mobile_number", mob);
      console.log(values.mobile, "values.mobile-==-");
      formData.append("countrycode", countryCode);
      formData.append("dob", dob);
      formData.append("gender", values.gender);
      const response = await axios({
        url: ApiConfig.updateProfileData,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      if (response && response?.data?.responseCode === 200) {
        toast.success(response?.data?.responseMessage);
      } else {
        console.log("Error response:", response);
        toast.error(response?.data?.responseMessage);
      }

      setIsLoading(false);
    } catch (err) {
      console.log("Error:", err);
      toast.error(err?.response?.data?.responseMessage || "An error occurred");
      setIsLoading(false);
    }
  };

  const validationSchema = yup.object().shape({
    fullName: yup
      .string()
      .matches(/^[A-Za-z0-9\s]+$/, "Enter a valid name")
      .max(250, "Full name must not exceed 250 characters")
      .required("Full name is required"),

    email: yup
      .string()
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Enter a valid email"),
    dob: yup.date().required("Please select your Date of Birth."),
    gender: yup.string().required("Please select your gender."),

    mobile: yup.string(),
    // .matches(
    //   /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
    //   "Enter a valid contact no."
    // ),

    profile_picture: yup.string(),
  });

  return (
    <Box className={classes.mainAppBox}>
      <Typography variant="h2">
        <GoBack /> Edit Profile
      </Typography>
      <Box className="subBox">
        <Formik
          onSubmit={(values) => handleSubmit1(values)}
          initialValues={{
            fullName: profileData?.full_name || "",
            gender: profileData?.gender || "",
            dob: profileData?.dob || "",
            email: profileData?.email || "",
            mobile: profileData?.mobile_number || "",
            profile_picture: profileData?.profile_picture || "",
          }}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
            setFieldValue,
          }) => (
            <Form action="" style={{ width: "100%" }} onSubmit={handleSubmit}>
              <Box className="formBox">
                <Box className={classes.childSection}>
                  <Avatar
                    src={`${uploadImage || "/static/images/avatar/1.jpg"} `}
                    style={{
                      height: "200px",
                      width: "200px",
                    }}
                  />
                  <IconButton className={classes.iconBtn}>
                    <label htmlFor="raised-button-file-crop1">
                      <BsPencilFill />
                    </label>
                  </IconButton>
                </Box>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file-crop1"
                  type="file"
                  onChange={(e) => handleImageUpload(e)}
                  // onChange={(e) =>
                  //   setProfileImg(URL.createObjectURL(e.target.files[0]))
                  // }
                />

                <Grid container>
                  <Grid item sm={7} xs={12}>
                    <Grid item sm={12} xs={12}>
                      <Box mb={2} className="gridBox">
                        {console.log(profileData, "ddd")}
                        <Typography variant="h6">Full Name</Typography>

                        <TextField
                          fullWidth
                          type="text"
                          name="fullName"
                          variant="outlined"
                          placeholder="Enter full name"
                          value={values.fullName}
                          className="inputBox"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={Boolean(touched.fullName && errors.fullName)}
                        />

                        <Typography style={{ color: "red" }}>
                          {touched.fullName && errors.fullName}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                      <Box mb={2} className="gridBox">
                        <Typography variant="h6">Gender</Typography>
                        <FormControl
                          fullWidth
                          variant="outlined"
                          error={Boolean(touched.gender && errors.gender)}
                        >
                          <Select
                            fullWidth
                            labelId="gender-label"
                            id="gender"
                            name="gender"
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
                    <Grid item sm={12} xs={12}>
                      <Box mb={2} className="gridBox">
                        <Typography variant="h6">D.O.B</Typography>
                        <FormControl
                          fullWidth
                          error={Boolean(touched.dob && errors.dob)}
                        >
                          <DatePicker
                            inputVariant="outlined"
                            format="DD/MM/YY"
                            placeholder="DD/MM/YY"
                            disableFuture
                            value={values.dob}
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
                                  <IconButton style={{ padding: "0px" }}>
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
                    <Grid item sm={12} xs={12}>
                      <Box mb={2} className="gridBox">
                        <Typography variant="h6">Email</Typography>
                        <TextField
                          type="email"
                          name="email"
                          variant="outlined"
                          placeholder="Enter email address"
                          value={values.email}
                          className="inputBox"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={Boolean(touched.email && errors.email)}
                        />
                        <Typography style={{ color: "red" }}>
                          {touched.email && errors.email}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                      <Box mb={2} className="gridBox">
                        <Typography variant="h6">Mobile Number</Typography>
                        <FormControl fullWidth>
                          <PhoneInput
                            country={"in"}
                            value={values.mobile}
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
                        </FormControl>

                        <Typography style={{ color: "red" }}>
                          {touched.mobile && errors.mobile}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

                {/* <Box className="gridBox">
                  <Typography variant="h6">Phone Number</Typography>
                  <TextField
                    type="text"
                    name="mobile"
                    variant="outlined"
                    placeholder="Enter phone number"
                    className="inputBox"
                    onBlur={handleBlur}
                    value={values.mobile}
                    onChange={handleChange}
                    error={Boolean(touched.mobile && errors.mobile)}
                  />
                  <Typography style={{ color: "red" }}>
                    {touched.mobile && errors.mobile}
                  </Typography>
                </Box> */}

                {/* <Box className="gridBox">
                  <Box className="updateContent">
                    <Box className="dropzone">
                      <Box className="icon">
                        <IoIosCloudUpload />
                      </Box>
                      <input
                        {...getInputProps()}
                        name="upload"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.profile_picture}
                        error={Boolean(
                          touched.profile_picture && errors.profile_picture
                        )}
                      />
                    
                      <Button
                        variant="outlined"
                        className="filterBtn"
                        onClick={open}
                      >
                        Upload
                      </Button>
                    </Box>
                    <aside>
                      <ul>{files}</ul>
                    </aside>
                  </Box>
                </Box> */}
                <Typography style={{ color: "red" }}>
                  {touched.profile_picture && errors.profile_picture}
                </Typography>
                <Box className="button1">
                  <Button
                    variant="contained"
                    color="primary"
                    className="filterBtn"
                    disabled={isLoading}
                    type="submit"
                  >
                    Update
                    {isLoading && (
                      <CircularProgress
                        size={20}
                        style={{ color: "#fff", marginLeft: "10px" }}
                      />
                    )}
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="filterBtn"
                    onClick={() => history.push("/patient-dashboard")}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default EditProfile;
