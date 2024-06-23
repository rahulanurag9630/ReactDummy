import {
  Box,
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { BlockOutlined, Edit, Search, Visibility } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import { KeyboardDatePicker } from "@material-ui/pickers";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
const useStyle = makeStyles((theme) => ({
  main: {
    "& img":{
      cursor:'pointer',
      paddingRight:'10px'
    },
    "& button": {
      height: '55px',
      padding: '5px 40px',
    },
    "& .table": {
      marginTop: '30px',
      borderRadius: '10px',
      background: theme.palette.secondary.main,
      padding: '10px',
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: '50px'
    },
    "& .searchBtn": {
      padding: '10px',
      height: 'auto',
      marginLeft: '10px',
      border: '2px solid',
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
    },
    "& .filter": {
      marginBottom: '10px',
      "& .datePicker": {
        width: "100%",
        "& .MuiFormControl-root": {
          borderRadius: "50px !important",
          width: "100%",
          background: 'rgba(0, 0, 0, 0.05)'
        },
        "& .MuiInputBase-root": {
          padding: '16px 10px',
        },
        '& .MuiInput-underline:before': {
          borderBottom: '0px'
        },
        '& .MuiInput-underline:after': {
          borderBottom: '0px'
        },
        "& button": {
          padding: '0px',
          height: 'auto '
        },
      },
      "& .filterBtn": {
        height: '45px',
        borderRadius: '50px',
        marginRight: '10px'
      },
      "& .downloadBtn": {
        background: ''
      },
    },
    "& .actionBtn": {
      gap: '5px',
      "& button": {
        padding: '10px',
        borderRadius: '5px',
        height: 'auto',
        border: '1px solid',
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
      },
    },
    "& .pagination": {
      marginTop:'15px',
      width:'fit-content',
      "& button": {
        padding: '7px 14px',
        height: 'auto',
      },
      "& .MuiPaginationItem-page.Mui-selected": {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        
      },
    }
  }
}));
function PolicyListing() {
  const history = useHistory();
  const classes = useStyle();
  const [selectedDate, setSelectedDate] = useState();
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const data = [
    { id: 1, plan: 'Zero Cost Plan', date: '14th Dec 2023, 13:30 PM' },
    { id: 1, plan: 'Zero Cost Plan', date: '14th Dec 2023, 13:30 PM' },
    { id: 1, plan: 'Zero Cost Plan', date: '14th Dec 2023, 13:30 PM' },
    { id: 1, plan: 'Zero Cost Plan', date: '14th Dec 2023, 13:30 PM' },
    { id: 1, plan: 'Zero Cost Plan', date: '14th Dec 2023, 13:30 PM' },
    { id: 1, plan: 'Zero Cost Plan', date: '14th Dec 2023, 13:30 PM' },
    { id: 1, plan: 'Zero Cost Plan', date: '14th Dec 2023, 13:30 PM' },
    { id: 1, plan: 'Zero Cost Plan', date: '14th Dec 2023, 13:30 PM' },
  ];
  return (
    <div >
      <Grid container className={classes.main}>
        <Grid item xs={12} className="displaySpacebetween">
          <Box className="displayStart">
            
              <img src="images/back.svg" alt='img' onClick={()=>{history.goBack()}}/>
            
            <Typography variant="h3">Policy List</Typography>
          </Box>
          <Button variant="outlined" color="primary" onClick={()=>{history.push('/add-policy')}}>Add Policy</Button>
        </Grid>
        <Grid item xs={12} className="table">
          <Grid container className="filter " justifyContent="space-between" spacing={1}>
            <Grid item lg={4} md={4} sm={6} xs={12} className="displayStart">
              <TextField
                fullWidth
                placeholder="Search by doctor name"
                variant="outlined" />
              <IconButton className="searchBtn">
                <Search />
              </IconButton>
            </Grid>
            {/* <Grid item lg={3} md={2} sm={6} xs={12} className="datePicker">
              <KeyboardDatePicker
               minDate={new Date(2010, 12, 31)}
               disableFuture
                format="DD/MM/YYYY"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12} align='right'>
              <Button variant="contained" className="filterBtn">Apply</Button>
              <Button variant="contained" color='secondary' className="filterBtn">Clear</Button>
            </Grid>
            <Grid item lg={2} md={2} sm={6} xs={12} >
              <Button variant="outlined" className="filterBtn" fullWidth>Download CSV</Button>
            </Grid> */}
          </Grid>

          <TableContainer >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell >Sr. No.</TableCell>
                  <TableCell >Plan Type</TableCell>
                  <TableCell >Created Date & Time</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.plan}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      <Box className="displayCenter actionBtn" >
                        <IconButton  onClick={()=>{history.push('/view-policy')}}><Visibility /></IconButton>
                        <IconButton  onClick={()=>{history.push('/edit-policy')}}><Edit /></IconButton>
                        <IconButton><BlockOutlined /></IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} align='right'>
          <Pagination count={10} shape="rounded" size="small" className="pagination" />
        </Grid>

      </Grid>
    </div>
  )
}

export default PolicyListing