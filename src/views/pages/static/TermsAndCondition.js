import { getApiHandler } from "../../../config/service";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  makeStyles,
  Grid,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ApiConfig } from "src/config/apiConfig";

const useStyles = makeStyles((theme) => ({
  TermsAndConditionContainer: {
    marginBottom: "72px",
    "& .cookiesPolicy": {
      "& h2": {
        color: theme.palette.text.primary,
        fontSize: "40px",
        fontWeight: 600,
        marginTop: "24px",
        marginBottom: "26px",
      },
      "& h3": {
        color: theme.palette.text.primary,
        marginBottom: "18px",
      },
      "& p": {
        color: theme.palette.primary.light,
        marginBottom: "22px",
      },
    },
    "& .loremIpsum": {
      color: theme.palette.primary.dark,
      "& h3": {
        fontWeight: 600,
        marginBottom: "20px",
      },
      "& p": {
        marginBottom: "27px",
      },
      "& ul, & ol": {
        paddingInlineStart: "17px",
        "& li": {
          "& p": {
            color: theme.palette.primary.light,
            marginBottom: "16px",
          },
        },
      },
    },
    "& .description": {
      fontWeight: 400,
      marginBottom: "15px",
      fontFamily: "Outfit",
      fontSize: " 16px",
      lineHeight: "24px",
      letterSpacing: " 0em",
      textAlign: "justify",
      color: "#00000099",
    },
  },
}));
const TermsAndCondition = () => {
  const classes = useStyles();
  const [termsCondition, setTermsCondition] = useState([{}]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    getTermsAndCondition();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getTermsAndCondition = async () => {
    setIsDataLoading(true);
    const res = await getApiHandler("Tearms-And-Conditions");
    setIsDataLoading(false);
    if (!res) {
      return;
    }
    setTermsCondition(
      res?.responseBody?.length > 0 ? res?.responseBody[0] : {}
    );
  };
  // const getTermsAndCondition = async () => {
  //   setIsDataLoading(true);
  //   try {
  //     const response = await axios({
  //       url: ApiConfig["Tearms-And-Conditions"],
  //       method: "GET",
  //     });
  //     setIsDataLoading(false);
  //     console.log(response, "ressssssssssssss");
  //     if (response?.data?.ResponseCode == 200) {
  //       // // toast.success(response.responseMessage || "Data Found Successfully");
  //       console.log(response?.data?.ResponseBody);
  //       setTermsCondition(response?.data?.ResponseBody);
  //     }
  //   } catch (err) {
  //     console.log("Error:", err);
  //     // toast.error(err?.response?.responseMessage);
  //     setIsDataLoading(false);
  //   }
  // };

  return (
    <Container maxWidth="xlg" className={classes.TermsAndConditionContainer}>
      <Box
        sx={{ paddingX: { md: "144px" /* xs: "30px" */ } }}
        py={4}
        className="cookiesPolicy"
      >
        <Typography variant="h2">Terms & Conditions</Typography>
        {isDataLoading ? (
          <Grid container justifyContent="center" alignItems="center">
            <CircularProgress />
          </Grid>
        ) : (
          <Typography variant="body2">
            <Box
              className="description"
              dangerouslySetInnerHTML={{
                __html: termsCondition.text ? termsCondition.text : "NA",
              }}
            />
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default TermsAndCondition;
