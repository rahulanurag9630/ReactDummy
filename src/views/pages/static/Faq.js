import {
  Box,
  makeStyles,
  Typography,
  IconButton,
  Paper,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Grid,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdExpandMore } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { ApiConfig } from "src/config/apiConfig";
import toast from "react-hot-toast";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  FaqBox: {
    marginBottom: "72px",
    marginTop: "64px",
    zIndex: "999",
    "& h4": {
      fontFamily: "Clash Display",
      fontWeight: "500",
      fontSize: "30px",
      color: "#262626",
      marginLeft: "20px",
    },
    "& h5": {
      fontFmily: "Clash Display",
      fontWeight: "400",
      fontSize: "24px",
      color: "#262626",
    },
    "& h6": {
      fontWeight: "400",
    },
    "& .backBtn": {
      border: "1px solid rgba(0, 0, 0, 0.08)",
    },
    "& .paperBox": {
      "& .FaqTopHeading": {
        fontFamily: "Calistoga",
        color: theme.palette.text.primary,
      },
    },

    "& .MuiAccordionSummary-root": {
      background: theme.palette.background.default,
    },
    "& .MuiPaper-elevation1": {
      padding: "5px",
    },
  },
  AccordionFaq: {
    "& .MuiAccordionSummary-expandIcon.Mui-expanded": {
      transform: "rotate(45deg) !important",
    },
    "& .MuiAccordionSummary-root": {
      paddingLeft: "0px !important",
    },
    "& svg": {
      color: `${theme.palette.primary.main} !important`,
    },
    "& .MuiAccordionSummary-root.Mui-expanded": {
      minHeight: "0 !important",
    },
    "& .FaqTitle": {
      color: theme.palette.primary.dark,
    },
    "& .FaqDescription": {
      color: "rgba(8, 5, 21, 0.60)",
      fontSize: "16px",
    },
    "& .MuiAccordionSummary-root": {
      padding: "0px",
    },
  },
}));

export default function Faq() {
  const classes = useStyles();
  const history = useHistory();
  const [faqData, setFaqData] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [isDataLoading, setIsDataLoading] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const FaqData = [
    {
      title: "The most popular question",
      summary:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    },
    {
      title: "The most popular question",
      summary:
        "Another example of a frequently asked question with a detailed answer. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      title: "The most popular question",
      summary:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    },
    {
      title: "The most popular question",
      summary:
        "Another example of a frequently asked question with a detailed answer. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      title: "The most popular question",
      summary:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    },
    {
      title: "The most popular question",
      summary:
        "Another example of a frequently asked question with a detailed answer. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      title: "The most popular question",
      summary:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    },
    {
      title: "The most popular question",
      summary:
        "Another example of a frequently asked question with a detailed answer. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ];

  const getFaq = async () => {
    setIsDataLoading(true);
    try {
      const response = await axios({
        url: ApiConfig["Faq"],
        method: "GET",
      });
      setIsDataLoading(false);
      console.log(response, "ressssssssssssss");
      if (response?.data?.ResponseCode === 200) {
        toast.success(
          response?.data?.ResponseMessage || "Data Found Successfully"
        );
        setFaqData(response?.data?.ResponseBody);
        console.log(response?.data?.ResponseBody, "faqs");
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error(err?.response?.ResponseMessage);
      setIsDataLoading(false);
    }
  };
  useEffect(() => {
    getFaq();
  }, []);

  return (
    <Container maxWidth="xlg" className={classes.FaqBox}>
      <Box
        sx={{ paddingX: { md: "144px", xs: "30px" } }}
        py={4}
        className="paperBox"
      >
        <Box mb={3}>
          <Typography variant="h2" className="FaqTopHeading">
            Have a question?
          </Typography>
        </Box>

        <Divider style={{ height: "2px" }} />

        <Box>
          {faqData.length > 0 ? (
            faqData.map((item, index) => (
              <Accordion
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                className={classes.AccordionFaq}
                key={index}
              >
                <AccordionSummary
                  expandIcon={<GoPlus />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography variant="h6" className="FaqTitle">
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" className="FaqDescription">
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Grid item xs={12} style={{ textAlign: "center" }}>
              {/* <Typography variant="body1">No data found</Typography> */}
              <Box mx={5} className="displayCenter">
                <img src="images/no_data.png" alt="no_data" />
              </Box>
            </Grid>
          )}
        </Box>
      </Box>
    </Container>
  );
}
