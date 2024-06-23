import {
  Box,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import BarChart from "./BarChart";
const useStyle = makeStyles(() => ({
  mainDashBox: {
    "& .dashCard": {
      background: '#fff',
      padding: '10px',
      borderRadius: '10px',
      gap: '15px'
    },
    '& h5': {
      fontSize: '22px',
    },
  },
}));
export default function Dash() {
  const classes = useStyle();
  return (
    <Box className={classes.mainDashBox}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2">Dashboard</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className="dashCard displayStart">
            <img src="images/totalPolicy.png" alt="img" />

            <Box>
              <Typography variant='h5'>Total Policy Request Recevied</Typography>
              <Typography variant='h3'>03</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className="dashCard displayStart">
            <img src="images/latestPolicy.png" alt="img" />

            <Box>
              <Typography variant='h5'>Latest Policy Request Recevied</Typography>
              <Typography variant='h3'>03</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className="dashCard">
            <Typography variant="h5">Customer Requests (per month)</Typography>
            <BarChart />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
