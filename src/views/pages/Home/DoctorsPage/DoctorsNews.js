import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import { ApiConfig } from "src/config/apiConfig";
import { CiMail } from "react-icons/ci";
import toast from "react-hot-toast";

const useStyles = makeStyles((theme) => ({
  slideContainer: {
    position: "relative",
    backgroundImage: "url(images/HaveQue.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "396px",
    "& h2, & p": {
      color: "white",
      textAlign: "center",
    },
  },
  overlayBox: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    "& > div": {
      gap: "15px",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
    "& h5": {
      textAlign: "center",
      color: "rgba(255, 255, 255, 0.6)",
      fontWeight: 400,
      letterSpacing: "5.06px",
      lineHeight: "30px",
    },
    "& h2": {
      fontFamily: "Calistoga",
      margin: "18px 0px 41px 0px",
    },
    "& h3": {
      fontSize: "32px",
      fontWeight: 400,
      color: theme.palette.background.default,
      textAlign: "center",
      width: "70%",
    },
    "& p": {
      fontFamily: "Calistoga",
    },
    "& .customTextField": {
      width: "100%",
      maxWidth: "500px",
      "& .MuiOutlinedInput-root": {
        borderRadius: "50px",
        background: "#FFF",
      },
      "& .MuiInputBase-input": {
        fontFamily: "Outfit",
        fontSize: "16px",
      },
    },
    "& button": {
      width: "160px",
      color: theme.palette.background.default,
      fontWeight: 400,
      padding: "15px 20px",
      borderRadius: "50px",
      background: "rgba(255, 255, 255, 0.10)",
      height: "49px",
      fontFamily: "Sora",
      fontSize: "19px",
      boxShadow: "none !important",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
  },
}));

const DoctorsNews = ({ hospitalId }) => {
  console.log(hospitalId, "hospiaa");
  const classes = useStyles();
  const id = hospitalId;
  console.log(id, "idddd");
  //   const [doctorList,setDoctorList]=useState([])
  //   const getDoctorList = async () => {
  //     try {

  //       if (id === undefined) {
  //         console.error("Hospital ID is undefined");
  //         return;
  //       }
  //       const res = await axios({
  //         method: "GET",
  //         url: `${ApiConfig['hospital-doctor-list']}/${id}/doctors/`
  //       });
  //       if (res.data?.ResponseCode == 200) {
  //         console.log(res?.data,"dataaaaa")
  //         // toast.success(res.data?.ResponseMessage)
  //         setDoctorList(res?.data?.ResponseBody);
  //         console.log(res?.data?.ResponseBody,"resssssssssss")
  //         // setSpecialization(res?.data?.responseData?.specialization)
  //         // return res.data;

  //       } else {
  //         // toast.error(res.data?.responseMessage || "Something went wrong");
  //         return null;
  //       }
  //     } catch (error) {
  //       toast.error(
  //         error?.response?.data?.ResponseMessage || "Something went wrong"
  //       );
  //       return null;
  //     }
  //   }

  // useEffect(() =>{
  //   getDoctorList();
  // },[])
  return (
    <Box mt={11}>
      <div>
        <div className={classes.slideContainer}>
          <Container className={`${classes.overlayBox}`}>
            <Typography variant="h5">NEWS LETTER</Typography>
            <Typography variant="h2">Have a question?</Typography>
            <Box className="displayCenter">
              <TextField
                placeholder="Enter your email..."
                className={`customTextField `}
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CiMail fontSize="24px" color="#681E65" />
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="contained" color="primary">
                Subscribe
              </Button>
            </Box>
          </Container>
        </div>
      </div>
    </Box>
  );
};

export default DoctorsNews;
