import { getApiHandler } from "../../../config/service";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  PrivacyPolicyContainer: {
    marginBottom: "72px",
    padding: "20px",
    "& .cookiesPolicy": {
      "& h2": {
        color: theme.palette.text.primary,
        fontSize: "40px",
        fontWeight: 600,
        marginBottom: "26px",
        marginTop: "24px",
      },
      "& h3": {
        color: theme.palette.text.primary,
        marginBottom: "18px",
      },
      "& p": {
        color: theme.palette.primary.light,
        // marginBottom: "22px",
      },
    },
    "& .loremIpsum": {
      color: theme.palette.primary.dark,
      "& h3": {
        fontWeight: 600,
        marginBottom: "20px",
      },
      "& p": {
        // marginBottom: "27px",
      },
      "& ul, & ol": {
        paddingInlineStart: "17px",
        "& li": {
          "& p": {
            color: theme.palette.primary.light,
            // marginBottom: "16px",
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
      "& p:first-of-type": {
        fontWeight: 600,
        color: "#080515",
        fontSize: "18px",
      },
    },
  },
}));
const PrivacyPolicy = () => {
  const classes = useStyles();
  const [privacyPolicy, setPrivacyPolicy] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    getPrivacyPolicy();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getPrivacyPolicy = async () => {
    setIsDataLoading(true);
    const res = await getApiHandler("Privacy-Policy");
    console.log(res, "dddddddddddddddd");
    setIsDataLoading(false);
    if (!res) {
      return;
    }
    console.log(res?.data, "dhwjdghwjg");
    setPrivacyPolicy(res?.responseBody?.length > 0 ? res?.responseBody[0] : {});
  };

  return (
    <Container maxWidth="xlg" className={classes.PrivacyPolicyContainer}>
      <Box
        sx={{ paddingX: { md: "144px" /* xs: "30px" */ } }}
        py={4}
        className="cookiesPolicy"
      >
        {isDataLoading ? (
          <Grid container justifyContent="center" alignItems="center">
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <Typography variant="h2">Privacy Policy</Typography>
            <Typography variant="body2">
              <Box
                className="description"
                dangerouslySetInnerHTML={{
                  __html: privacyPolicy?.text ? privacyPolicy?.text : "NA",
                }}
              />
            </Typography>
          </>
        )}
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
