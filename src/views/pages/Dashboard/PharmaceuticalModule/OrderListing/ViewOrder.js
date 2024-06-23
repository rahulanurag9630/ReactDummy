import { Box, Divider, Grid, Typography, makeStyles } from '@material-ui/core';
import React from 'react'
import { useHistory } from 'react-router-dom';
const useStyle = makeStyles((theme) => ({
    main: {
        
        "& .detalisBg": {
            background: '#fff',
            borderRadius: '15px',
            padding: '20px',
            marginTop:'30px',
        },
        "& hr": {
            margin: '15px 0',
        },

        "& label": {
            fontSize: '18px',
            color: theme.palette.text.secondary,
            [theme.breakpoints.up('sm')]: {
                fontSize: '14px',
            },
        },
        "& h6": {
            fontWeight: 500
        },
        "& .imgBox": {
            borderRadius: '10px',
            border: '1px solid #D9D9D9'
        },
    }
}));
function ViewOrder() {
    const history = useHistory();
    const classes = useStyle();

    const items = [
        { name: 'Nestle Nan Pro Follow-Up Formula', code: 'DP-9457454', price: 100 },
        { name: 'Nestle Nan Pro Follow-Up Formula', code: 'DP-9457454', price: 100 },
        { name: 'Nestle Nan Pro Follow-Up Formula', code: 'DP-9457454', price: 100 },
    ];
    return (
        <div>
            <Grid container className={classes.main}>
                <Grid item xs={12} className="displaySpacebetween">
                    <Box className="displayStart">
                        <Typography variant="h2">View Order</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} className='detalisBg'>
                    <Typography variant='h3'>Customer Details</Typography>
                    <Divider />
                    <Grid container >
                        <Grid item xs={12} md={4}>
                            <label>Customer Name:</label>
                            <Typography variant="h5">Arvind</Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <label>Email ID:</label>
                            <Typography variant="h5">arvind@mailinator.com</Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <label>Address:</label>
                            <Typography variant="h5">D-115, Pocket D, Okhla Phase I, Delhi 110020</Typography>
                        </Grid>
                    </Grid>
                    <Box mt={5}></Box>
                    <Typography variant='h3'>Order History</Typography>
                    <Divider />
                    <Grid container >
                        <Grid item xs={12} md={4}>
                            <label>Order ID:</label>
                            <Typography variant="h5">#GHDF8976</Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <label>Ordered Date & Time:</label>
                            <Typography variant="h5">17-09-2022, 13:09</Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <label>Ordered Price:</label>
                            <Typography variant="h5">$ 2100</Typography>
                        </Grid>
                    </Grid>

                    <Box mt={5}></Box>
                    <Typography variant='h3'>Order Item</Typography>

                    {items.map((item, index) => (
                        <div key={index}>
                            <Divider />
                            <Grid container spacing={2}>
                                <Grid item xs={1} align='center'>
                                    <Box className='imgBox'>
                                        <img src='images/bigBox.png' alt="img" width={66} />
                                    </Box>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant='h6'>{item.name}</Typography>
                                    <label>{item.code}</label>
                                </Grid>
                                <Grid item xs={2} align='right'>
                                    <Typography variant='h5'>${item.price}</Typography>
                                </Grid>
                            </Grid>
                        </div>
                    ))}

                </Grid>
            </Grid>
        </div>
    )
}

export default ViewOrder