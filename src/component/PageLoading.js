import React from "react";
import { makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    justifyContent: "center",
    zIndex: 2000,
  },
  loader: {
    width: 300,
    maxWidth: "100%",
    [theme.breakpoints.down("xs")]: {
      width: 180,
    },
  },
  progressBar: {
    height: "3px",
  },
}));

export default function PageLoading() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box>
        {/* <LinearProgress height={10} /> */}
        <img
          className={classes.loader}
          src="/images/healthcare_logo.svg"
          alt="loader"
        />
      </Box>
    </div>
  );
}
