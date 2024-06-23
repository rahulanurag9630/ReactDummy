import { Box, Button, Grid, IconButton, MenuItem, Select, TextField, Typography, makeStyles } from '@material-ui/core'
import { DropzoneArea } from 'material-ui-dropzone';
import React, { useState } from 'react'
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
            "& h6":{
                marginBottom:'5px'
            },
            "& button": {
                borderRadius: '50px',
                marginRight: '15px'
            },
        },
        "& .multiline": {
            "& .MuiOutlinedInput-root": {
                height: '100px'
            }
        },
        
        "& .dropzone":{
            gap:'15px',
            "& button": {
                borderRadius: '50px',
                marginLeft: '0px !important'
            },
        },
        "& .MuiDropzoneArea-root":{
            border:'1px solid',
        },
    }
}))

function AddProduct() {
    const history = useHistory();
    const classes = useStyle();
    const [productImageFirst, setProductImageFirst] = useState('');
    const handleImageSelect = (event) => {
        const file = event[0];

        setProductImageFirst(file);
    };
    const handleDeleteFirst = () => {
        setProductImageFirst("");
    };
    const CustomeDropzoneIcon = () => {
        return (
            <div className='displayColumnCenter dropzone'>
                <img src="images/downloadIcon.svg" alt='custome icon' />
                <Typography variant='h5'>Drag and Drop here </Typography>
                <Typography variant='body2'>Or</Typography>
                <Button variant='outlined' color='primary'>Upload</Button>
            </div>
        );
    };

    return (
        <div>
            <Grid container className={classes.main}>
                <Grid item xs={12} className="displaySpacebetween">
                    <Box className="displayStart">
                        <IconButton onClick={() => { history.goBack() }}>
                            <img src="images/back.svg" alt='img' />
                        </IconButton>
                        <Typography variant="h3">Add Product</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} className='form'>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant='h6'>Category</Typography>
                            <Select fullWidth value='' variant='outlined'>
                                <MenuItem value=''>-Select Category-</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant='h6'>Sub-Category</Typography>
                            <Select fullWidth value='' variant='outlined'>
                                <MenuItem value=''>-Select Sub-Category-</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant='h6'>Product Name</Typography>
                            <TextField fullWidth variant='outlined' placeholder='Enter product name' />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant='h6'>Product Quantity</Typography>
                            <TextField fullWidth variant='outlined' placeholder='Enter product quantitye' />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant='h6'>Product Price ( ) per quantity</Typography>
                            <TextField fullWidth variant='outlined' placeholder='Enter product price per quantity' />

                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant='h6'>Product Unit</Typography>
                            <Select fullWidth value='' variant='outlined'>
                                <MenuItem value=''>-Select Unit-</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} >
                            <Typography variant='h6'>Product Description</Typography>
                            <TextField fullWidth variant='outlined' multiline rows={5} maxRows={5} className='multiline' placeholder='Type here....' />
                        </Grid>

                        <Grid item xs={8} >
                            <DropzoneArea
                                maxFileSize="40000000"
                                filesLimit="1"
                                style={{
                                    marginTop: "48px",
                                    marginLeft: "20px",
                                }}
                                acceptedFiles={["image/*"]}
                                onChange={(e) => handleImageSelect(e)}
                                onDelete={handleDeleteFirst}
                                Icon={CustomeDropzoneIcon}
                                dropzoneText=""
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <Button variant='contained' color='primary'>Add</Button>
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

export default AddProduct