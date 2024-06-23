import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import { Box } from "@material-ui/core";
import { IoIosArrowBack } from "react-icons/io";

const useStyles = makeStyles((theme) => ({
  gobackStyle: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    display: "flex",
    alignItems: "center",
    "& button": {
      background: "#000",
      color: "#fff",
      "&:hover": {
        // color: "#fff",
        backgroundColor: "#000",
      },
    },
    iconButton: {
      fontSize: "2rem",
    },
  },
}));

const GoBack = () => {
  const classes = useStyles();
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <Box>
      <Box className={classes.gobackStyle}>
        <IconButton onClick={goBack} className={classes.iconButton}>
          <IoIosArrowBack />
        </IconButton>
      </Box>
    </Box>
  );
};

export default GoBack;
