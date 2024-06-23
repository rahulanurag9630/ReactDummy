import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { GoPlus } from "react-icons/go";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    paddingTop: "100px",
    "& h2, & h5": {
      textAlign: "center",
      marginBottom: theme.spacing(2),
    },
    "& h2": {
      fontFamily: "Calistoga",
      color: theme.palette.primary.text,
    },
    "& > :first-child": {
      color: theme.palette.primary.main,
      fontSize: "22px",
      letterSpacing: "5.06px",
    },
    "& > :nth-child(3)": {
      color: "rgba(8, 5, 21, 0.6)",
      fontWeight: 400,
    },
    "& > div": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    "& > div > div": {
      width: "65%",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    "& .AccordionFaq": {
      "& .MuiAccordionSummary-expandIcon.Mui-expanded": {
        transform: "rotate(45deg) !important",
      },
      "& .MuiAccordionDetails-root": {
        flexDirection: "column",
        gap: "20px",
      },
      "& svg": {
        color: `${theme.palette.primary.main} !important`,
      },
      "& h6": {
        color: theme.palette.primary.dark,
      },
      "& p": {
        color: "rgba(8, 5, 21, 0.60)",
        fontSize: "16px",
        paddingLeft: "20px",
      },
    },
  },
}));
const FaqDesktop = () => {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const FaqData = [
    {
      title: "The most popular question",
      summary:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. simply so that a dummy text of the gone.",
    },
    {
      title: "The most popular question",
      summary:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. simply so that a dummy text of the gone..",
    },
    {
      title: "The most popular question",
      summary:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. simply so that a dummy text of the gone.",
    },
    {
      title: "The most popular question",
      summary:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. simply so that a dummy text of the gone.",
    },
  ];
  return (
    <Container className={classes.container}>
      <Typography variant="h5">FAQs</Typography>
      <Typography variant="h2">Have a question?</Typography>
      <Typography variant="h5">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </Typography>
      <Box mt={6}>
        <Box>
          {FaqData.map((item, index) => (
            <Accordion
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              className={`AccordionFaq ${classes.AccordionFaq}`}
              key={index}
              TransitionProps={{ timeout: 0 }}
            >
              <AccordionSummary
                expandIcon={<GoPlus />}
                aria-controls={`panel${index}bh-content`}
                id={`panel${index}bh-header`}
              >
                <Typography variant="h6">{item.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">{item.summary}</Typography>
                <Typography variant="body2">{item.summary}</Typography>
                <Typography variant="body2">{item.summary}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default FaqDesktop;
