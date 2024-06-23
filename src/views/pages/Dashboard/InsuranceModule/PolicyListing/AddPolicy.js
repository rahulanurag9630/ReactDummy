import { Box, Button, Grid, IconButton, MenuItem, Select, TextField, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const useStyle = makeStyles((theme) => ({
    main: {
        "& .MuiIconButton-root":{
            padding:'0 10px 10px 0'
        },
        "& .form": {
            background: '#fff',
            borderRadius: '15px',
            padding: '20px',
            "& button": {
                borderRadius: '50px',
                marginRight: '15px'
            },
            "& h6":{
                marginBottom:'5px'
            },
        },
        "& .multiline": {
            "& .MuiOutlinedInput-root": {
                height: '100px'
            },
            
        },
    }
}))
function AddPolicy() {
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
                        <Typography variant="h3">Add Policy</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} className='form'>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant='h6'>Plan Type</Typography>
                            <Select fullWidth value='' displayEmpty variant='outlined'>
                                <MenuItem value=''><em>-Select Plan Type-</em></MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant='h6'>Payable Mode</Typography>
                            <Select fullWidth value='' variant='outlined'>
                                <MenuItem value=''>-Select Plan Type-</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant='h6'>Payable Mode</Typography>
                            <TextField fullWidth variant='outlined' placeholder='Enter amount' />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant='h6'>Claim Settled</Typography>
                            <TextField fullWidth variant='outlined' placeholder='Enter claim settled perentage' />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant='h6'>Coverage Till</Typography>
                            <Select fullWidth value='' variant='outlined'>
                                <MenuItem value=''>-Select Coverage Till-</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant='h6'>Life Cover</Typography>
                            <Select fullWidth value='' variant='outlined'>
                                <MenuItem value=''>-Select Life Cover-</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} >
                            <Typography variant='h6'>About</Typography>
                            <TextField fullWidth variant='outlined' multiline rows={5} maxRows={5} className='multiline' placeholder='Type here....' />
                        </Grid>
                        <Grid item xs={12} >
                            <Button variant='contained' color='primary'>Add Policy</Button>
                            <Button
                                variant='contained'
                                color='secondary'
                                onClick={() => { history.goBack() }}>Cancel</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default AddPolicy