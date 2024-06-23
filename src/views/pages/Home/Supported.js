import React from "react";
import { Grid, Box, Typography, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  supportedBox: {
    position: "relative",
    [theme.breakpoints.down("md")]: {
      padding: "89px 0px 0px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0px 0px 10px",
    },
    "& .supportCrad": {
      background: "#ffffff",
      borderRadius: "10px",
      padding: "30px 0",
      "boxShadow": "0px 0px 53px rgba(0, 0, 0, 0.1)",
    },
    "& .supportextbox": {
      "& h2": {
        color: "#fff",
        maxWidth: "492px",
      },
      "& p": {
        color: "#fff",
        maxWidth: "123px",
      },
    },
  },
}));

const supportData = [
  {
    value: "25K",
    description: "Happy Customers",
  },
  {
    value: "25K",
    description: "Year of Experience",
  },
  {
    value: "25K",
    description: "Available Country",
  },
];
export default function Support() {
  const classes = useStyles();

  return (
    <Box className={classes.supportedBox}>
      <Grid container spacing={2}>
        {supportData.map((data, i) => (
          <>
            <Grid item lg={4} md={4} sm={4} xs={6}>
              <Box align="center" className="gradientBox">
                <Box className="supportCrad">
                  <Typography variant="h6">{data.value}</Typography>
                  <Typography
                    variant="body2"
                    style={{ marginTop: "15px", maxWidth: "120px" }}
                  >
                    {data.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </>
        ))}
      </Grid>
    </Box>
  );
}
