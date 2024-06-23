import { Box, Button, Dialog, DialogContent, Divider, Grid, IconButton, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, makeStyles } from '@material-ui/core'
import { Close, CloseOutlined, FilterList, Search, Visibility } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import { KeyboardDatePicker } from '@material-ui/pickers';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlineUpload } from "react-icons/ai";

const useStyle = makeStyles((theme) => ({
    main: {
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
        "& .table": {
            marginTop: '30px',
            borderRadius: '10px',
            background: theme.palette.secondary.main,
            padding: '10px',
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
        "& .filterIcon": {
            padding: '10px',
            height: 'auto',
            marginLeft: '10px',
            border: '2px solid',
            borderRadius: '10px',
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
        },
        "& .pagination": {
            marginTop: '15px',
            width: 'fit-content',
            "& button": {
                padding: '7px 14px',
                height: 'auto',
            },
            "& .MuiPaginationItem-page.Mui-selected": {
                backgroundColor: theme.palette.primary.main,
                color: 'white',

            },
        },

    },
    dialog: {
        "& .MuiDialog-paper": {
            maxWidth: '500px !important',
            width: '100%'
        },
        "& h2": {
            width: 'fit-content'
        },
        "& .datePicker": {
            width: "100%",
            "& .MuiFormControl-root": {
                borderRadius: "10px !important",
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
            "& .MuiIconButton-root": {
                color: theme.palette.primary.main,
            },
            "& button": {
                padding: '0px',
                height: 'auto '
            },
        },
        "& hr": {
            margin: '10px 0'
        },
    },
   
}))
function PatientList() {
    const history = useHistory();
    const classes = useStyle();
    const [openFilter, setOpenFilter] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleClose = () => {
        setOpenFilter(false)
    }
    const data = [
        {SrNo:'1', PatientName:'Mr. Sanjay', PhoneNo:'+91 78965-56787',Location:'NH-19,  Delhi 110076' },
        {SrNo:'1', PatientName:'Mr. Sanjay', PhoneNo:'+91 78965-56787',Location:'NH-19,  Delhi 110076' },
        {SrNo:'1', PatientName:'Mr. Sanjay', PhoneNo:'+91 78965-56787',Location:'NH-19,  Delhi 110076' },
        {SrNo:'1', PatientName:'Mr. Sanjay', PhoneNo:'+91 78965-56787',Location:'NH-19,  Delhi 110076' },
        {SrNo:'1', PatientName:'Mr. Sanjay', PhoneNo:'+91 78965-56787',Location:'NH-19,  Delhi 110076' },
        {SrNo:'1', PatientName:'Mr. Sanjay', PhoneNo:'+91 78965-56787',Location:'NH-19,  Delhi 110076' },
        {SrNo:'1', PatientName:'Mr. Sanjay', PhoneNo:'+91 78965-56787',Location:'NH-19,  Delhi 110076' },
        {SrNo:'1', PatientName:'Mr. Sanjay', PhoneNo:'+91 78965-56787',Location:'NH-19,  Delhi 110076' },
        {SrNo:'1', PatientName:'Mr. Sanjay', PhoneNo:'+91 78965-56787',Location:'NH-19,  Delhi 110076' },
        {SrNo:'1', PatientName:'Mr. Sanjay', PhoneNo:'+91 78965-56787',Location:'NH-19,  Delhi 110076' },
        {SrNo:'1', PatientName:'Mr. Sanjay', PhoneNo:'+91 78965-56787',Location:'NH-19,  Delhi 110076' },
    ];

    return (
        <div>
            <Grid container className={classes.main}>
                <Grid item xs={12} className="displaySpacebetween">
                    <Box className="displayStart">

                        <Typography variant="h3">Patient List</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} className="table">
                    <Grid container className="filter " spacing={1}>
                        <Grid item md={6} sm={6} xs={12} className="displayStart">
                            <TextField
                                fullWidth
                                placeholder="Search by doctor name"
                                variant="outlined" />
                            <IconButton className="searchBtn">
                                <Search />
                            </IconButton>
                        </Grid>
                        <Grid item md={6} sm={6} xs={12} align='right'>
                            <Button variant="outlined" className="filterBtn" >Download CSV</Button>
                            <IconButton className="filterIcon" onClick={() => { setOpenFilter(true) }}>
                                <FilterList />
                            </IconButton>
                        </Grid>

                    </Grid>

                    <TableContainer >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell >Sr. No.</TableCell>
                                    <TableCell >Patient Name</TableCell>
                                    <TableCell >Phone No.</TableCell>
                                    <TableCell >Location</TableCell>
                                    <TableCell align="center">Action</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.SrNo}</TableCell>
                                        <TableCell>{item.PatientName}</TableCell>
                                        <TableCell>{item.PhoneNo}</TableCell>
                                        <TableCell>{item.Location}</TableCell>
                                        <TableCell>
                                            <Box className="displayCenter actionBtn" >
                                                <IconButton ><Visibility /></IconButton>
                                                <IconButton  ><AiOutlineUpload /></IconButton>
                                                
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
                <Dialog open={openFilter} onClose={() => handleClose()} className={classes.dialog}>
                    <DialogContent>
                        <Box className="displaySpacebetween">
                            <Typography variant='h2'>
                                Filter
                            </Typography>
                            <Close onClick={() => handleClose()} />
                        </Box>
                        <Divider />
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6} className='datePicker'>
                                <Typography variant='h6'>From</Typography>
                                <KeyboardDatePicker
                                    format="DD/MM/YYYY"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} className='datePicker'>
                                <Typography variant='h6'>To</Typography>
                                <KeyboardDatePicker
                                    format="DD/MM/YYYY"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                />
                            </Grid>
                            <Grid item xs={12} className='datePicker'>
                                <Box mt={2} />
                            </Grid>
                            <Grid item xs={12} sm={6} align='center'>
                                <Button variant='outlined' fullWidth color='primary' onClick={() => handleClose()} >Cancel </Button>
                            </Grid>
                            <Grid item xs={12} sm={6} align='center'>
                                <Button variant='outlined' fullWidth color='primary'>Apply </Button>
                            </Grid>
                        </Grid>

                    </DialogContent>
                </Dialog>
            </Grid>
        </div>
    )
}

export default PatientList