import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { CloseOutlined } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { getApiHandler } from "src/config/service";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import toast from "react-hot-toast";
import { ApiConfig } from "src/config/apiConfig";
import { Grid } from "react-feather";

const useStyles = makeStyles((theme) => ({
  CookiesPolicyContainer: {
    marginBottom: "72px",
    "& .cookiesPolicy": {
      "& h2": {
        color: theme.palette.text.primary,
        fontSize: "40px",
        fontWeight: 600,
        marginBottom: "16px",
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
  DialogBoxCookies: {
    "& .MuiDialog-paperWidthXs": {
      maxWidth: "496px",
    },
    "& svg": {
      color: "rgba(32, 33, 35, 0.51)",
      cursor: "pointer",
    },
    "& .DialogContentC": {
      padding: "10px 11px 30px 30px",
      "& h5": {
        color: "#000",
        fontWeight: 400,
        marginBottom: "20px",
      },
      "& p": {
        color: theme.palette.primary.light,
        marginBottom: "20px",
      },
      "& .btnCookieDialog": {
        gap: "14.09px",
      },
      "& .MuiButton-containedPrimary": {
        height: "58px",
        borderRadius: "50px",
        width: "50%",
        fontSize: "16px",
      },
      "& .MuiButton-outlinedPrimary": {
        border: `1.5px solid ${theme.palette.primary.main}`,
        height: "58px",
        borderRadius: "50px",
        width: "50%",
        fontSize: "16px",
        color: theme.palette.primary.main,
        "&:hover": {
          background: "transparent",
        },
      },
    },
  },
}));
const CookiesPolicy = () => {
  const [cookie, setCookie] = useState([{}]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const classes = useStyles();
  const [cookiesOpen, setCookiesOpen] = useState(true);
  const history = useHistory();

  const handleDialogClose = () => {
    setCookiesOpen(false);
  };

  const getCookiePolicy = async () => {
    setIsDataLoading(true);
    const res = await getApiHandler("Cookie-policy");
    console.log(res, "dddddddddddddddd");
    setIsDataLoading(false);
    if (!res) {
      return;
    }
    console.log(res?.data, "dhwjdghwjg");
    setCookie(res?.responseBody?.length > 0 ? res?.responseBody[0] : {});
  };

  useEffect(() => {
    getCookiePolicy();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <Container maxWidth="xlg" className={classes.CookiesPolicyContainer}>
      <Box
        sx={{ paddingX: { md: "144px", xs: "30px" } }}
        py={4}
        className="cookiesPolicy"
        mt={8}
      >
        {isDataLoading ? (
          <Grid container justifyContent="center" alignItems="center">
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <Typography variant="h2">Our Cookies Policy</Typography>
            <Typography variant="body2">
              <Box
                className="description"
                dangerouslySetInnerHTML={{
                  __html: cookie?.text ? cookie?.text : "NA",
                }}
              />
            </Typography>
          </>
        )}
      </Box>
      {/* <Typography variant="body2">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.
        </Typography>
        <Typography variant="body2">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.
        </Typography>
        <Typography variant="body2">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.It is a long established fact that a reader
          will be distracted by the readable content of a page when looking at
          its layout. The point of using Lorem Ipsum is that it has a
          more-or-less normal distribution of letters, as opposed to using
          'Content here, content here', making it look like readable English.It
          is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.
        </Typography> */}
      {/* </Box> */}

      {/* <Box className="loremIpsum">
        <Typography variant="h3">What Is Lorem Ipsum</Typography>
        <Typography variant="body2">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.
        </Typography>
        <ul>
          <li>
            <Typography variant="body2">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed like readable English.
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </Typography>
          </li>
        </ul>
      </Box> */}

      {/* <Box className="cookiesPolicy">
        <Typography variant="h3">Where does it come from?</Typography>
        <Typography variant="body2">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.It is a long established fact that a reader
          will be distracted by the readable content of a page when looking at
          its layout. The point of using Lorem Ipsum is that it has a
          more-or-less normal distribution of letters, as opposed to using
          'Content here, content here', making it look like readable English.It
          is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.
        </Typography>
        <Typography variant="body2">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.It is a long established fact that a reader
          will be distracted by the readable content of a page when looking at
          its layout. The point of using Lorem Ipsum is that it has a
          more-or-less normal distribution of letters, as opposed to using
          'Content here, content here', making it look like readable English.It
          is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.
        </Typography>
      </Box> */}
      {/* <Box className="loremIpsum">
        <Typography variant="h3">Where can I get some?</Typography>
        <Typography variant="body2">
          You as a parent/guardian expressly acknowledge and undertake that:
        </Typography>
        <ol>
          <li>
            <Typography variant="body2">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed like readable English.
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed like readable English.
            </Typography>
          </li>
        </ol>
      </Box> */}

      {/* <Dialog
        open={cookiesOpen}
        onClose={handleDialogClose}
        className={classes.DialogBoxCookies}
        maxWidth="xs"
        fullWidth
      >
        <Box className="DialogContentC">
          <Box className="displayEnd">
            <CloseOutlined onClick={handleDialogClose} />
          </Box>
          <Typography variant="h5">We value your Privacy</Typography>
          <Typography variant="body2" className="descDialog">
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used.In publishing and graphic design, Lorem ipsum is a
            placeholder text is a commonly fine to the used.Lorem ipsum is a
            placeholder text is a commonly fine to the ipsum is a placeholder
            text ipsum is a placeholder text used.
          </Typography>
          <Box className="displayStart btnCookieDialog">
            <Button
              variant="outlined"
              color="primary"
              onClick={handleDialogClose}
            >
              Deny Cookies
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDialogClose}
            >
              Allow Cookies
            </Button>
          </Box>
        </Box>
      </Dialog>  */}
    </Container>
  );
};

export default CookiesPolicy;
