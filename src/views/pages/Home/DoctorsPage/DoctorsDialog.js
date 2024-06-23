/* eslint-disable no-undef */
import { Box, Button, Dialog, Grid, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

const DoctorsDialog = ({
  appointOpen,
  setAppointOpen,
  value,
  handleRatingChange,
}) => {
  return (
    <Dialog
      open={appointOpen}
      onClose={() => {
        setAppointOpen(false);
      }}
      className={`${classes.DialogParent} `}
      maxWidth="sm"
      fullWidth
    >
      <Box className={classes.appointmentBoxService}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Box className="insideappointmentBox">
              <Grid container>
                <Grid item xs={12} sm={4}>
                  <Box className="imageServiceBox">
                    <img src="images/appointDoctor1.png" alt="" />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Box className="insideappointmentBoxRight">
                    <Box className="insideappointBoxRightTop">
                      <Typography variant="h4">name</Typography>
                      <InfoOutlinedIcon />
                    </Box>
                    <Typography variant="body2" className="professionTypo">
                      profession
                    </Typography>
                    <Box className="serviceRatings">
                      <span>
                        <Rating
                          name="simple-controlled"
                          value={value}
                          onChange={handleRatingChange}
                        />
                      </span>
                      <Typography variant="body2">{value}</Typography>
                    </Box>
                    <Box className="serviceAddress">
                      <Box className="serviceAddressIn displayStart">
                        <img src="images/phonecall.svg" alt="call" />
                        <Typography variant="body1">
                          +91 8709 7230 28
                        </Typography>
                      </Box>
                      <Box className="serviceAddressIn displayStart">
                        <img src="images/gps.svg" alt="gps" />
                        <Typography variant="body1">
                          D-115, Pocket D, Okhla Phase I, Okhla Industrial
                          Estate, New Delhi, Delhi 110020
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography variant="h5">About</Typography>
                  <Typography variant="body2">
                    In publishing and graphic design, Lorem ipsum is a
                    placeholder text commonly used to demonstrate the visual
                    form of a document or a typeface without relying on
                    meaningful content. Lorem ipsum may be used as a placeholder
                    before final copy is available.In publishing and graphic
                    design, Lorem ipsum is a placeholder text commonly used to
                    demonstrate the visual form of a document or a typeface
                    without relying on meaningful content. Lorem ipsum may be
                    used as a placeholder before final copy is available.
                  </Typography>
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <Button variant="outlined" fullWidth>
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button variant="outlined" fullWidth>
                        Book An Appointment
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default DoctorsDialog;
