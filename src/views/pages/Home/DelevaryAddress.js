import React from 'react'
import {
    Box,
    Grid,
    Typography,
    makeStyles,
    Button,
    TextField,
    Radio
} from "@material-ui/core";
import { MdModeEdit } from "react-icons/md"
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    muiMainBox: {
        padding: "50px 5%",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        "& h2": {
            color: "#161E29",
            fontSize: "35px",
            fontStyle: "normal",
            fontWeight: "500",
        },
        "& .titleBox": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "@media(max-width:450px)": {
                flexDirection: "column",
                gap: "15px",
                alignItems: "flex-start"
            },
            "& .filterBtn": {
                borderRadius: "10px",
                fontSize: "18px",
                padding: "10px 45px",
                height: "auto",
                "@media(max-width:599px)": {
                    fontSize: "14px",
                    width: "100%",
                    maxWidth: "185px",
                    padding: "10px 11px",
                }
            },
        },
        "& .MuiIconButton-label": {
            color: "#681E65"
        },

        "& h6": {
            color: "#161E29",
            lineHeight: "normal",
            fontWeight: "500",
        },
        "& p": {
            color: "rgba(0, 0, 0, 0.60)",
            lineHeight: "35px",
            fontWeight: "500",
        },
        "& .btn":{
            "& .filterBtn": {
                background:"#DDD",
                height: '45px',
                borderRadius: '50px',
                marginRight: '10px',
                padding:"0 40px",
               "&:hover":{
                background:"#681E65"
               }
              },
        },
        
        "& .secendGridBox": {
            display: "flex",
            flexDirection: "column",
            gap: "20px"
        },
        "& .secendGridContentBox": {
            padding: "20px",
            border: "1px solid #B8B8B8",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            "& .filterBtn": {
                borderRadius: "10px",
                fontSize: "18px",
                padding: "15px 45px",
                height: "auto",
                width:"100%",
                
                "@media(max-width:599px)":{
                    fontSize: "14px",
                },
                
            }
    
        },
        "& .secendGridMainBox": {
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "20px"
        },
    },
    
}))
const DelevaryAddress = () => {
    const classes = useStyles();
    const history = useHistory();
    const handleClick = () => {
        history.push("./addnewaddress")
    }
    return (
        <Box className={classes.muiMainBox}>
            <Box className='titleBox'>
                <Typography variant='h2'>Choose Your Delivery Addres</Typography>
                <Button variant="outlined" className="filterBtn">Back to Shopping</Button>
            </Box>
            <Grid container spacing={5}>
                <Grid item lg={8} md={8} sm={12} xs={12}>
                    <Box className='btn'>
                        <Button variant="contained" color='secondary' className="filterBtn" onClick={handleClick}>+ Add New Address</Button>
                    </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                <Box className='secendGridBox'>
                        <Box className='secendGridContentBox'>
                            <Typography variant="h6">Price Details (4 Items)</Typography>
                            <Box className='secendGridMainBox'>
                                <Typography variant="body2">Order Total Amount :</Typography>
                                <Typography variant="body2" className='text'>$ 1050</Typography>
                            </Box>
                            <Button variant="contained" className="filterBtn">Proceed to Checkout</Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

        </Box>
    )
}

export default DelevaryAddress
