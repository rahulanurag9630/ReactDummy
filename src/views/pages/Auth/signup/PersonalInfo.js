import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
  Container,
  Paper,
  FormHelperText,
  Grid,
  FormControl,
  IconButton,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yep from "yup";
import { KeyboardDatePicker } from "@material-ui/pickers";

import { Autocomplete } from "@material-ui/lab";
import { AiFillCaretDown } from "react-icons/ai";
import Select, { components } from "react-select";
const useStyle = makeStyles((theme) => ({
  personalInfoBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: "100%",
    width: "100%",
    "& .personalInfoBox": {
      margin: "35px auto 35px",
    },
    "& h2": {
      color: "#262626",
      fontWeight:"500"
    },
    "& h6": {
      color: "#262626",
    },
    "& .paperBox": {
      padding: "40px 50px !important",
      [theme.breakpoints.down("xs")]: {
        padding: "20px 15px 50px !important",
      },
    },
    "& .buttonBox": {
      padding: "35px 0",
      display: "flex",
      justifyContent: "flex-start",
    },
    "& .backBtn": {
      position: "absolute",
      top: 30,
      left: 30,
      border: "1px solid rgba(0, 0, 0, 0.08)",
    },
    "& .datePickerField": {
      "& .MuiIconButton-root": {
        marginRight: "-16px",
      },
    },
  },
}));
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const CaretDownIcon = () => {
      return <AiFillCaretDown style={{color:"#78819F"}}/>;
    };
    
    const DropdownIndicator = props => {
      return (
        <components.DropdownIndicator {...props}>
          <CaretDownIcon />
        </components.DropdownIndicator>
      );
    };

export default function PersonalInfo() {
  const classes = useStyle();
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const nationality = [
    { value: "India", label: "India" },
    { value: "France", label: "France" },
    { value: "Uk", label: "Uk" },
    { value: "Usa", label: "Usa" },
  ];
  const maritalStatus = [
    { value: "Single", label: "Single" },
    { value: "Married", label: "Married" },
    { value: "Divoced", label: "Divoced" },
    { value: "Widow", label: "Widow" },
    { value: "Widower", label: "Widower" },
  ];
  const formInitialSchema = {
    nationality: "",
    address: "",
    maritalStatus: "",
    dob: "",
    city: "",
    postalCode: "",
  };
  const formValidationSchema = yep.object().shape({
    nationality: yep.string().required("Nationality is required."),
    address: yep
      .string()
      .max(256, "Should not exceeds 256 characters.")
      .required("Residential address is required."),
    maritalStatus: yep.string().required("Marital status is required."),
    city: yep.string().required("Please enter City."),
    postalCode: yep.string().required("Postal code is required."),
  });
  const handleFormSubmit = async (values) => {
    history.push("/dashboard");
  };

  return (
    <Box className={classes.personalInfoBox}>
      <Container maxWidth="md">
        <Box className="personalInfoBox">
          <Paper elevation={1} className="paperBox">
            <Box mt={1}>
              <Typography variant="h2">Personal Information</Typography>
            </Box>
            <Box>
              <Typography style={{ color: "#78819F" }} variant="body2">
                Enter your personal details.
              </Typography>
            </Box>
            <Box mt={2}>
              <Typography style={{ color: "#262626" }} variant="body2">
                Digvijay Singh
              </Typography>
            </Box>
            <Typography style={{ color: "#717171" }} variant="body2">
              digvijay.singh@indicchain.com
            </Typography>
            <Typography style={{ color: "#717171" }} variant="body2">
              +91 986543210
            </Typography>
            <Box my={2}>
              <Typography style={{ color: "#262626" }} variant="body2">Identity Information</Typography>
            </Box>
            <Formik
              initialValues={formInitialSchema}
              initialStatus={{
                success: false,
                successMsg: "",
              }}
              validationSchema={formValidationSchema}
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
                      <Box>
                        {/* <Autocomplete
                          freeSolo
                          options={nationality.map((option) => option.nation)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Nationality"
                              variant="outlined"
                              fullWidth
                              name="nationality"
                              error={Boolean(
                                touched.nationality && errors.nationality
                              )}
                              onBlur={handleBlur}
                            />
                          )}
                        />
                        <FormHelperText error>
                          {touched.nationality && errors.nationality}
                        </FormHelperText> */}
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={nationality}
                          components={{ DropdownIndicator }}
                          placeholder={<div className="select-placeholder-text">Nationality</div>} 
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter Residential address"
                        name="address"
                        value={values.address}
                        error={Boolean(touched.address && errors.address)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText error className={classes.helperText}>
                        {touched.address && errors.address}
                      </FormHelperText>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                    <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={maritalStatus}
                          components={{ DropdownIndicator }}
                          placeholder={<div className="select-placeholder-text">Marital Status</div>} 
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="City"
                        name="city"
                        value={values.city}
                        error={Boolean(touched.city && errors.city)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText error className={classes.helperText}>
                        {touched.city && errors.city}
                      </FormHelperText>
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
                            error={Boolean(errors.dob)}
                            onBlur={handleBlur}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                          <FormHelperText error className={classes.helperText}>
                            {errors.dob}
                          </FormHelperText>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Postal code"
                        name="postalCode"
                        value={values.postalCode}
                        error={Boolean(touched.postalCode && errors.postalCode)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText error className={classes.helperText}>
                        {touched.postalCode && errors.postalCode}
                      </FormHelperText>
                    </Grid>
                  </Grid>
                  <Box className="buttonBox">
                    <Button variant="contained" color="primary" type="submit">
                      CONTINUE
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
