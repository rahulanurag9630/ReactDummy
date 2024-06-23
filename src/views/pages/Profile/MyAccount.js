import React from "react";
import {
  Avatar,
  Box,
  Divider,
  Typography,
  makeStyles,
  Button,
  MenuItem,
  Grid,
  TextField,
  Select,
  FormControl,
  Paper,
} from "@material-ui/core";
import { GoVerified } from "react-icons/go";
import { Form, Formik } from "formik";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  MyAccountBox: {
    display: "flex",
    alignItems: "center",
    zIndex: "999",
    "& h2": {
      fontWeight: "600",
      fontSize: "30px",
      color: "#262626",
    },
    "& .imageBox": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      "& .MuiAvatar-root": {
        height: "100px",
        width: "100px",
        border: "2px solid #EC1F24",
      },
    },
    "& .buttonBox": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    "& .ProfileBox": {
      padding: "20px 200px",
    },
  },
}));

const nationality = [
  { nation: "India" },
  { nation: "France" },
  { nation: "Uk" },
  { nation: "Usa" },
];
const state = [
  { name: "Bihar" },
  { name: "UP" },
  { name: "New Delhi" },
  { name: "Punjab" },
];
const currency = [
  { currencyName: "INR" },
  { currencyName: "USD" },
  { currencyName: "BTC" },
  { currencyName: "ETC" },
];
const maritalStatus = [
  { status: "Single" },
  { status: "Married" },
  { status: "Divoced" },
  { status: "Widow" },
  { status: "Widower" },
];
const formInitialSchema = {
  nationality: "",
  country: "",
  state: "",
  maritalStatus: "",
  dob: "",
  city: "",
  postalCode: "",
  fullName: "",
  email: "",
  phoneNumber: "",
  currency: "",
};
const handleFormSubmit = async (values) => {
  console.log(values);
};

export default function MyAccount() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <Box className={classes.MyAccountBox}>
      <Paper elevation={1} style={{ padding: "30px 30px" }}>
        <Box mb={2}>
          <Typography variant="h2">My Account</Typography>
        </Box>
        <Divider style={{ height: "2px" }} />
        <Box className="ProfileBox">
          <Box className="imageBox" my={5}>
            <Avatar alt="User" src="images/topGun.png" />
            <Box mt={2} style={{ display: "flex", alignItems: "center" }}>
              <GoVerified style={{ color: "#3A8738" }} />
              <Typography variant="body2" style={{ color: "#3A8738" }}>
                {" "}
                &nbsp;KYC Approved
              </Typography>
            </Box>
          </Box>
          <Box className="PersonalDetailBox">
            <Formik
              initialValues={formInitialSchema}
              initialStatus={{
                success: false,
                successMsg: "",
              }}
              onSubmit={(values) => handleFormSubmit(values)}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values,
                setFieldValue,
              }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter full name"
                        name="fullName"
                        value={values.fullName}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Box>
                        <TextField
                          fullWidth
                          variant="outlined"
                          placeholder="Enter your mobile number"
                          name="phoneNumber"
                          value={values.phoneNumber}
                          onChange={handleChange}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Box>
                        <FormControl fullWidth>
                          <KeyboardDatePicker
                            className="datePickerField"
                            inputVariant="outlined"
                            id="date-picker-dialog"
                            format="DD/MM/YYYY"
                            name="dob"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6}>
                          <Box>
                            <Autocomplete
                              freeSolo
                              options={nationality.map(
                                (option) => option.nation
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Country"
                                  variant="outlined"
                                  fullWidth
                                  name="country"
                                />
                              )}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <Box>
                          <Autocomplete
                          freeSolo
                          options={state.map((option) => option.name)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="State"
                              variant="outlined"
                              fullWidth
                              name="state"
                            />
                          )}
                        />
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Box>
                        <Autocomplete
                          freeSolo
                          options={nationality.map((option) => option.nation)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Nationality"
                              variant="outlined"
                              fullWidth
                              name="nationality"
                            />
                          )}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6}>
                          <Box>
                            <TextField
                              fullWidth
                              variant="outlined"
                              placeholder="City"
                              name="city"
                              value={values.city}
                              onChange={handleChange}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <Box>
                            <TextField
                              fullWidth
                              variant="outlined"
                              placeholder="Postal code"
                              name="postalCode"
                              value={values.postalCode}
                              onChange={handleChange}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Box>
                        <Autocomplete
                          freeSolo
                          options={maritalStatus.map((option) => option.status)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Marital Status"
                              variant="outlined"
                              fullWidth
                              name="maritalStatus"
                            />
                          )}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Box>
                      <Autocomplete
                          freeSolo
                          options={currency.map((option) => option.currencyName)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Currency / Preference"
                              variant="outlined"
                              fullWidth
                              name="currency"
                            />
                          )}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Box className="buttonBox" mt={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      /* style={{
                            paddingLeft: "75px",
                            paddingRight: "75px",
                          }} */
                    >
                      SAVE
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
