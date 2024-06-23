import {
  Box,
  Grid,
  Typography,
  makeStyles,
  TextField,
  Button,
  IconButton,
  FormControl,

} from "@material-ui/core";
import React, { useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { BiDownload } from "react-icons/bi";
import { AiFillCaretDown } from "react-icons/ai";
import Select, { components } from "react-select";

const useStyle = makeStyles(() => ({
  filtterBox: {},
}));
const cryptotoken = [
  { title: "BNB" },
  { title: "ETH" },
  { title: "UTC" },
  { title: "BNB" },
];
export default function Filtter() {
  const classes = useStyle();
  const [selectedOption, setSelectedOption] = useState(null);

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const options = [
    { value: "All", label: "All" },
    { value: "BTC", label: "BTC" },
    { value: "USDT", label: "USDT" },
  ];
  const option = [
    { value: "All Status", label: "All Status" },
    { value: "Active", label: "Active" },
    { value: "Block", label: "Block" },

  ];
  const CaretDownIcon = () => {
    return <AiFillCaretDown style={{ color: "#78819F" }} />;
  };
  
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon />
      </components.DropdownIndicator> 
    );
  };
  return (
    <Box className={classes.filtterBox}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sm={6} lg={2}>
          <Box>
            <Typography variant="body1">Coins</Typography>
          </Box>
          <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        components={{ DropdownIndicator }}
      />
        </Grid>
        <Grid item xs={12} sm={6} lg={2}>
          <Box>
            <Typography variant="body1">Order Type</Typography>
          </Box>
          <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        components={{ DropdownIndicator }}
      />
        </Grid>
        <Grid item xs={12} sm={6} lg={2}>
          <Box>
            <Typography variant="body1">Status</Typography>
          </Box>
          <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={option}
        components={{ DropdownIndicator }}
      />
        </Grid>
        <Grid item xs={12} sm={6} lg={2}>
          <Box>
            <Typography variant="body1">From Date</Typography>
          </Box>
          <FormControl  fullWidth>
          <KeyboardDatePicker
            margin="auto"
            inputVariant="outlined"
            id="date-picker-dialog"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} lg={2}>
          <Box>
            <Typography variant="body1">To Date</Typography>
          </Box>
          <FormControl  fullWidth>
          <KeyboardDatePicker
            margin="auto"
           
            inputVariant="outlined"
            id="date-picker-dialog"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          </FormControl>
         
        </Grid>
        <Grid item xs={12} sm={6} lg={2}>
          <Box className="displaySpacebetween">
            <Button style={{color:"#F2911F",marginTop:"13px"}}>Reset Filter</Button>
            <IconButton
              style={{
                "background": "#F9F9F9",
                "border": "1px solid #ECEAEA",
                "borderRadius": "5px",
                padding:"8px",
                marginTop:"5px",
              }}
            >
              <BiDownload />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
