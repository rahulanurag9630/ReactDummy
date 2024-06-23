import React, { useEffect, useState } from "react";
import { props } from "react";
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {
  Box,
  Grid,
  Typography,
  makeStyles,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  FormHelperText,
  FormControl,
  Tooltip,
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
} from "react-icons/bs";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import GoBack from "src/component/GoBack";
import { FiUpload } from "react-icons/fi";
import { FaArrowUp, FaEye } from "react-icons/fa";
const useStyles = makeStyles((theme) => ({
  mainAppBox: {
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    "& .react-tel-input": {
      // width: "73% !important",
      "& input": {
        width: "100% !important",
        background: "#f2f2f2",
        height: "50px",
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
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      marginBottom: "16px",
      "& h6": {
        color: "#080515",
        fontSize: "18px",
        fontStyle: "normal",
        // marginBottom: "10px",
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
    "& .MuiOutlinedInput-adornedEnd": {
      paddingRight: 0,
      "& .fiuploadparent": {
        background: "rgba(0, 0, 0, 0.20)",
        height: "48px",
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
  childSection: {
    position: "relative",
  },
  iconBtn: {
    background: "#681E65",
    border: "1px solid #222",
    position: "absolute",
    cursor: "pointer",
    top: "78%",
    left: "143px",
    height: "40px",
    width: "40px",
    // padding: "12px 12px 7px !important",
    "& svg": {
      color: "#fff",
      fontSize: "18px",
    },
    "&:hover": {
      backgroundColor: "#681E65", // Change this to your desired hover background color
    },
  },
}));

const EditDoctorProfile = () => {
  const [doctorid, setdoctorid] = useState();
  const [doctorcerti, setdoctorcerti] = useState();
  const [proof, setproof] = useState();
  const [name, setName] = useState("");
  const classes = useStyles();
  const history = useHistory();
  const [uploadImage, setUploadImage] = useState();
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
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
          url: ApiConfig.getProfileDoctor,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response && response?.data?.responseCode === 200) {
          // toast.success(response?.data?.responseMessage);
          console.log(response?.responseData);
          setProfileData(response?.data?.responseData);
          setUploadImage(response?.data?.responseData?.profile_picture);
          setdoctorid(response?.data?.responseData?.doctor_id_image);
          setdoctorcerti(response?.data?.responseData?.doctor_certificate);
          setproof(response?.data?.responseData?.proof_of_working);
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
    setIsLoading(true);
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
      toast.success("Media uploaded successfully", { id: id });
      if (response && response?.data?.responseCode === 200) {
        // toast.success(response?.data?.responseMessage);
        console.log(response?.responseData);

        setUploadImage(response?.data?.responseData?.profile_picture);
        console.log(profileData, "profileeeee");
      } else {
        // Display appropriate message when file upload fails
        toast.error(
          response?.data?.responseMessage || "Unable to upload media",
          { id: id }
        );
        console.log("Error response:", response);
      }
      setIsLoading(false);
    } catch (err) {
      console.log("Error:", err);
      // Display error message when an error occurs during upload
      toast.error(
        err?.response?.responseMessage || "An error occurred during upload"
      );
      setIsLoading(false);
    }
  };

  const handleSubmit1 = async (values) => {
    console.log("valuessssssssssssss", values);
    const token = localStorage.getItem("token");
    let mob = values?.mobile.slice(3);
    setIsLoading(true);

    try {
      const formData = new FormData();
      // formData.append("profile_picture", values.profile_picture);
      formData.append("full_name", values.fullName);
      formData.append("email", values.email);
      formData.append("mobile_number", mob);
      formData.append("country_code", countryCode);
      formData.append("doctor_id_image", values.doctorId);
      formData.append("doctor_certificate", values.doctorateCertificate);
      formData.append("proof_of_working", values.proofOfWorking);

      const response = await axios({
        url: ApiConfig.updateDocProfile,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      console.log("Authorization-=-=-=-", response);
      if (response && response?.data?.responseCode === 200) {
        console.log("Profile updated successfully");
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
  const handleFileUploadproof = (event, setFieldValue, fieldName) => {
    const file = event.target.files[0];
    console.log("File:", file);
    console.log("FieldName:", fieldName);

    if (file) {
      // const formData = new FormData();
      // formData.append(fieldName, file);
      setFieldValue(fieldName, file);
      setUploadedFile(file);
      setproof(URL.createObjectURL(file));
    }
  };
  const handleFileUploadid = (event, setFieldValue, fieldName) => {
    const file = event.target.files[0];
    console.log("File:", file);
    console.log("FieldName:", fieldName);

    if (file) {
      // const formData = new FormData();
      // formData.append(fieldName, file);
      setFieldValue(fieldName, file);
      setUploadedFile(file);
      setdoctorid(URL.createObjectURL(file));
    }
  };
  const handleFileUploadcerti = (event, setFieldValue, fieldName) => {
    const file = event.target.files[0];
    console.log("File:", file);
    console.log("FieldName:", fieldName);

    if (file) {
      // const formData = new FormData();
      // formData.append(fieldName, file);
      setFieldValue(fieldName, file);
      setUploadedFile(file);
      setdoctorcerti(URL.createObjectURL(file));
    }
  };

  const validationSchema = yup.object().shape({
    fullName: yup
      .string()
      .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, "Enter a valid name"),

    email: yup
      .string()
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Enter a valid email"),

    mobile: yup.string(),
    // doctorId: yup.string().required("Doctor Id is required."),
    // doctorateCertificate: yup
    //   .string()
    //   .required("Doctorate certificate is required."),
    // proofOfWorking: yup.string().required("Proof of Working is required."),
    // .matches(
    //   /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
    //   "Enter a valid contact no."
    // ),

    profile_picture: yup.string(),
  });

  return (
    <Box className={classes.mainAppBox}>
      <Typography variant="h2">
        {" "}
        <GoBack /> Edit Profile
      </Typography>
      <Box className="subBox">
        <Formik
          onSubmit={(values) => handleSubmit1(values)}
          initialValues={{
            fullName: profileData?.full_name || "",
            email: profileData?.email || "",
            mobile: profileData?.mobile_number || "",
            profile_picture: profileData?.profile_picture || "",
            doctorId: profileData?.doctorId || "",
            doctorateCertificate: profileData?.doctorateCertificate || "",
            proofOfWorking: profileData?.proofOfWorking || "",
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
                      <BsFillPencilFill style={{ cursor: "pointer" }} />
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
                <Grid sm={12} md={6}>
                  <Box className="gridBox">
                    {console.log(profileData, "ddd")}
                    <Typography variant="h6">Full Name</Typography>
                    <TextField
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
                  <Box className="gridBox">
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
                  <Box className="gridBox">
                    <Typography variant="h6">Mobile Number</Typography>
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
                    <Typography style={{ color: "red" }}>
                      {touched.mobile && errors.mobile}
                    </Typography>
                  </Box>

                  <Typography style={{ color: "red" }}>
                    {touched.profile_picture && errors.profile_picture}
                  </Typography>

                  <Box className="gridBox">
                    <Typography variant="h6">Doctor id</Typography>
                    <Box sx={{ display: "flex" }}>
                      <FormControl fullWidth>
                        <TextField
                          className="uploadTextFields"
                          fullWidth
                          variant="outlined"
                          name="doctorId"
                          value={values.doctorId.name || "doctor_id"}
                          error={Boolean(touched.doctorId && errors.doctorId)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <label htmlFor="doctorIdFileInput">
                                  <Box className="displayCenter fiuploadparent">
                                    <FiUpload />

                                    <input
                                      id="doctorIdFileInput"
                                      type="file"
                                      accept=".pdf, .doc, .docx, .jpg, .png"
                                      style={{
                                        display: "none",
                                        cursor: "pointer",
                                      }}
                                      onChange={(e) =>
                                        handleFileUploadid(
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

                      <a
                        href={doctorid}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        target="_blank"
                      >
                        <div
                          style={{
                            marginLeft: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "22px",
                            color: "black",
                          }}
                          name="up"
                        >
                          <Tooltip title="View Image" arrow>
                            <div>
                              <FaEye />
                            </div>
                          </Tooltip>
                        </div>
                      </a>
                    </Box>
                  </Box>

                  <Box className="gridBox">
                    <Typography variant="h6">Doctorate certificate</Typography>
                    <div style={{ display: "flex" }}>
                      <FormControl fullWidth>
                        <TextField
                          className="uploadTextFields"
                          fullWidth
                          variant="outlined"
                          name="doctorateCertificate"
                          id="doctorateCertificate"
                          value={
                            values.doctorateCertificate.name ||
                            "doctor_certificate"
                          }
                          error={Boolean(
                            touched.doctorateCertificate &&
                              errors.doctorateCertificate
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <label htmlFor="doctorateCertificateFileInput">
                                  <Box className="displayCenter fiuploadparent">
                                    <FiUpload />

                                    <input
                                      id="doctorateCertificateFileInput"
                                      type="file"
                                      accept=".pdf, .doc, .docx,.jpg, .png"
                                      style={{
                                        display: "none",
                                        cursor: "pointer",
                                      }}
                                      onChange={(e) =>
                                        handleFileUploadcerti(
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
                      <a
                        href={doctorcerti}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        target="_blank"
                      >
                        <div
                          style={{
                            marginLeft: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "22px",
                            color: "black",
                          }}
                        >
                          <Tooltip title="View Image" arrow>
                            <div>
                              <FaEye />
                            </div>
                          </Tooltip>
                        </div>
                      </a>
                    </div>
                  </Box>

                  <Box className="gridBox">
                    <Typography variant="h6">Proof of working</Typography>
                    <div style={{ display: "flex" }}>
                      <FormControl fullWidth>
                        <TextField
                          className="uploadTextFields"
                          fullWidth
                          variant="outlined"
                          name="proofOfWorking"
                          id="proofOfWorking"
                          value={
                            values.proofOfWorking.name || "proof_of_working"
                          }
                          error={Boolean(
                            touched.proofOfWorking && errors.proofOfWorking
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <label htmlFor="proofOfWorkingFileInput">
                                  <Box className="displayCenter fiuploadparent">
                                    <FiUpload />

                                    <input
                                      id="proofOfWorkingFileInput"
                                      type="file"
                                      accept=".pdf, .doc, .docx,.jpg, .png"
                                      style={{
                                        display: "none",
                                        cursor: "pointer",
                                      }}
                                      onChange={(e) =>
                                        handleFileUploadproof(
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
                      <a
                        href={proof}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        target="_blank"
                      >
                        {" "}
                        <div
                          style={{
                            marginLeft: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "22px",
                            color: "black",
                          }}
                          name="up"
                        >
                          <Tooltip title="View Image" arrow>
                            <div>
                              <FaEye />
                            </div>
                          </Tooltip>
                        </div>
                      </a>
                    </div>
                  </Box>
                </Grid>

                <Box className="button1">
                  <Button
                    variant="contained"
                    className="filterBtn"
                    type="submit"
                    disabled={isLoading}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="filterBtn"
                    onClick={() => history.goBack()}
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

export default EditDoctorProfile;
