
import { Box, Button, Divider, Grid, IconButton, Typography, makeStyles } from '@material-ui/core';
import React from 'react'
import { useHistory } from 'react-router-dom';
const useStyle = makeStyles((theme) => ({
    main: {
        "& .MuiIconButton-root":{
            padding:'0 10px 10px 0'
        },
        "& .detalisBg":{
            background: '#fff',
            borderRadius: '15px',
            padding: '20px',
        },
        "& .detailsBox": {
            marginBottom:'40px',
            alignItems: 'flex-start',
            [theme.breakpoints.down('xs')]: {
                flexDirection:'column',
                alignItems: 'center',

            }
        },
        "& .ImgBox": {
            background: 'rgba(0, 0, 0, 0.03)',
            borderRadius: '15px',
            padding: '20px',
        },
        "& .details": {
            padding: '10px 10px 10px 40px'
        },
        "& label": {
            fontSize: '18px',
            color: theme.palette.text.secondary,
            [theme.breakpoints.up('sm')]: {
                fontSize: '14px',
            },
        },
        "& hr": {
            margin: '15px 0',
        },
        "& p":{
            color: theme.palette.text.secondary,
            fontSize: '18px',
            lineHeight:'25px',
        }
    }
}));
function ViewPolicy() {
    const history = useHistory();
    const classes = useStyle();
    return (
        <div>
            <Grid container className={classes.main}>
                <Grid item xs={12} className="displaySpacebetween">
                    <Box className="displayStart">
                        <IconButton onClick={() => { history.goBack() }}>
                            <img src="images/back.svg" alt='img' />
                        </IconButton>
                        <Typography variant="h3">View Policy</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} className='detalisBg'>
                    <Box className="displayStart detailsBox">
                        <Box className='ImgBox'>
                            <img src='images/policyImg.png' alt='img' />
                        </Box>
                        <Grid container className='details'>
                            <Grid item md={6} sm={6} xs={12}>
                                <label >Plan Type:</label>
                                <Typography variant='h5'>Zero Cost Plan</Typography>
                            </Grid>
                            <Grid item md={6} sm={6} xs={12}>
                                <label >Payable Mode:</label>
                                <Typography variant='h5'>Monthly</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>

                            <Grid item md={3} sm={6} xs={12}>
                                <label >Claim Settled</label>
                                <Typography variant='h5'>Zero Cost Plan</Typography>
                            </Grid>
                            <Grid item md={3} sm={6} xs={12}>
                                <label >Claim Settled</label>
                                <Typography variant='h5'>60 Yrs</Typography>
                            </Grid>
                            <Grid item md={3} sm={6} xs={12}>
                                <label >Life Cover</label>
                                <Typography variant='h5'>Zero Cost Plan</Typography>
                            </Grid>
                            <Grid item md={3} sm={6} xs={12}>
                                <label >Payable  Amount</label>
                                <Typography variant='h5'>$1200</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Typography variant='h5'>About</Typography>
                    <Typography >In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available</Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default ViewPolicy