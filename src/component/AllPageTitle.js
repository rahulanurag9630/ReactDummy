import GoBack from "src/component/GoBack";
import { Box, Container, Typography, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  topheader: {
    "& h5": {
      textAlign: "center",
      marginBottom: "16px",
      color: theme.palette.primary.main,
      letterSpacing: "5.06px",
      fontSize: "22px",
    },
  },
  CategoryContainer: {
    padding: "45px 0px 0px",
    "& .categoryTitles": {
      "& h5": {
        textAlign: "center",
        marginBottom: "16px",
        color: theme.palette.primary.main,
        letterSpacing: "5.06px",
        fontSize: "22px",
      },
      "& h2": {
        textAlign: "center",
        marginBottom: "18px",
        fontFamily: "Calistoga",
        color: theme.palette.text.primary,
      },
      "& h6": {
        textAlign: "center",
        marginBottom: "39px",
        color: "rgba(8, 5, 21, 0.60)",
        width: "100%",
      },
    },
  },
}));
const AllPageTitle = ({ top }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="xlg" className={`${classes.CategoryContainer} `}>
      <> 
        <Box  style={{display:"flex",justifyContent:"space-between",alignItems:"end"}} className={classes.topheader}>
          <GoBack />
          <Typography variant="h5">{top.name}</Typography>
          <div></div>
        </Box>
      </>
      <Box className="categoryTitles displayColumnCenter">
        <Typography variant="h2">{top.title}</Typography>
        {/* <Container>
          <Typography variant="h6">{top.desc}</Typography>
        </Container> */}
      </Box>
    </Container>
  );
};

export default AllPageTitle;