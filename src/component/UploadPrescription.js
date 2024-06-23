import React, { useState } from "react";
import {
  TextField,
  IconButton,
  Button,
  Grid,
  Typography,
  Paper,
  Box,
  TextareaAutosize,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import { Add as AddIcon, Remove as RemoveIcon } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import GoBack from "src/component/GoBack";
const useStyle = makeStyles((theme) => ({
  testTextField: {
    width: "40%",
    [theme.breakpoints.down("md")]: {
      width: "92%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "85%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "82%",
    },
  },
}));

const UploadPrescription = () => {
  const classes = useStyle();
  const [tests, setTests] = useState([""]);

  const [medicines, setMedicines] = useState([
    { name: "", dose: "", duration: "" },
  ]);
  const medicineOptions = ["Medicine1", "Medicine2", "Medicine3"];

  const handleAddTest = () => {
    setTests([...tests, ""]);
  };

  const handleRemoveTest = (index) => {
    const newTests = tests.filter((_, i) => i !== index);
    setTests(newTests);
  };

  const handleTestChange = (index, event) => {
    const newTests = [...tests];
    newTests[index] = event.target.value;
    setTests(newTests);
  };

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: "", dose: "", duration: "" }]);
  };

  const handleRemoveMedicine = (index) => {
    const newMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(newMedicines);
  };

  const handleMedicineChange = (index, value) => {
    const newMedicines = [...medicines];
    newMedicines[index].name = value;
    setMedicines(newMedicines);
  };

  const handleDoseChange = (index, event) => {
    const newMedicines = [...medicines];
    newMedicines[index].dose = event.target.value;
    setMedicines(newMedicines);
  };

  const handleDurationChange = (index, event) => {
    const newMedicines = [...medicines];
    newMedicines[index].duration = event.target.value;
    setMedicines(newMedicines);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log({ tests, medicines });
  };

  return (
    <Paper elevation={2}>
      <form>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Box mb={4}>
              <Typography variant="h4">Prescription</Typography>
            </Box>
          </Grid>

          {tests.map((test, index) => (
            <Grid container spacing={1} alignItems="center" key={index}>
              <Grid item xs={12}>
                <Box mb={2}>
                  <Typography style={{ marginBottom: "5px" }} variant="body2">
                    Test Name
                  </Typography>

                  <TextField
                    variant="outlined"
                    value={test}
                    onChange={(e) => handleTestChange(index, e)}
                    className={classes.testTextField}
                  />
                  {index !== 0 && (
                    <IconButton
                      style={{
                        color: "#fff",
                        background: "#712171",
                        marginLeft: "5px",
                        padding: "5px",
                      }}
                      onClick={() => handleRemoveTest(index)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  )}
                  <IconButton
                    onClick={handleAddTest}
                    style={{
                      color: "#fff",
                      background: "#712171",
                      marginLeft: "5px",
                      padding: "5px",
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          ))}

          {medicines.map((medicine, index) => (
            <Grid
              container
              spacing={1}
              alignItems="center"
              key={index}
              style={{ marginBottom: "16px" }}
            >
              <Grid item xs={12} sm={12} md={5}>
                <Box style={{ marginBottom: "16px" }}>
                  <Typography variant="body2" style={{ marginBottom: "5px" }}>
                    Prescribed Medicine
                  </Typography>
                  <Autocomplete
                    options={medicineOptions}
                    value={medicine.name}
                    onChange={(e, value) => handleMedicineChange(index, value)}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                    fullWidth
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <Box style={{ marginBottom: "16px" }}>
                  <Typography style={{ marginBottom: "5px" }} variant="body2">
                    Dose
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={medicine.dose}
                    onChange={(e) => handleDoseChange(index, e)}
                    fullWidth
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <Box style={{ marginBottom: "16px" }}>
                  <Typography style={{ marginBottom: "5px" }} variant="body2">
                    Duration
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={medicine.duration}
                    onChange={(e) => handleDurationChange(index, e)}
                    fullWidth
                  />
                </Box>
              </Grid>
              {index !== 0 && (
                <IconButton
                  onClick={() => handleRemoveMedicine(index)}
                  style={{
                    color: "#fff",
                    background: "#712171",
                    marginLeft: "5px",
                    padding: "5px",
                  }}
                >
                  <RemoveIcon />
                </IconButton>
              )}
              <IconButton
                onClick={handleAddMedicine}
                style={{
                  color: "#fff",
                  background: "#712171",
                  marginLeft: "5px",
                  padding: "5px",
                }}
              >
                <AddIcon />
              </IconButton>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Box style={{ marginBottom: "16px" }}>
              <Typography style={{ marginBottom: "5px" }} variant="body2">
                Instructions
              </Typography>
              <TextareaAutosize
                minRows={6}
                placeholder="Instructions"
                style={{
                  width: "100%",
                  padding: "10px 0px 10px 10px",
                  marginTop: "5px",
                  borderRadius: "7px",
                  background: "rgba(0, 0, 0, 0.05)",
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit Prescription
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default UploadPrescription;
