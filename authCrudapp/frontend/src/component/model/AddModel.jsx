import { React } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, Grid, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    //   border: '2px solid #000',
    boxShadow: 24,
    padding: '0 15px'
};

const btnSty = {
    display: 'flex',
    justifyContent: 'right',
    padding: ' 30px 0'
}
const modalbtn={
    height: '30px', 
    margin: '0 0 0 30px ',
    background:'rgb(0,62,60)',
    color:'#fff',
    '&:hover': { background: 'rgb(0,62,60)'},
}

export default function AssModel(props) {
    const {setUserid,setValues,handleFileChange, category, handleChange, handleSubmit, handleBlur, values ,isToggled,closeSlider,openSlider,} = props
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const handleClick = ()=>{
        if (!token) {
            navigate('/signin')
        } else {
            setUserid()
            openSlider()
        }
    }
    const closeBtn=()=>{
        setValues({user:""})
        closeSlider()
    }
    
    
    return (
        <>
            <Button onClick={handleClick}  variant="contained">{category}</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isToggled}
                onClose={closeSlider}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}>
                <Fade in={isToggled}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ padding: '5px 0' }}>
                            Create Category
                        </Typography>
                        <Divider />
                        <Typography id="transition-modal-description" variant='div' sx={{ mt: 2, pb: 4 }}>
                            <form  onSubmit={ handleSubmit}>
                            <Grid item xs={12} md={12} xl={12} >
                                    <Typography variant='p' component='p' sx={{ p: 1 }}>user</Typography>
                                    <TextField type='number' disabled id='user' name='user' rows={5} value={values.user || ""}    onChange={handleChange} onBlur={handleBlur} fullWidth placeholder='Enter a user'  />
                                    
                                </Grid>
                                <Grid item xs={12} md={12} xl={12} >
                                    <Typography variant='p' component='p' sx={{ p: 1 }}>Name</Typography>
                                    <TextField type='file' id='photo' name='photo' accept="image/*" onChange={(e)=>handleFileChange(e)} onBlur={handleBlur} fullWidth placeholder=' upload a photo' />
                                    
                                </Grid>
                                <Grid item xs={12} md={12} xl={12} >
                                    <Typography variant='p' component='p' sx={{ p: 1 }}>Description</Typography>
                                    <TextField type='text' id='text' name='text' rows={5} value={values.text || ""}    onChange={handleChange} onBlur={handleBlur} fullWidth placeholder='description' multiline />
                                    
                                </Grid>

                                <Stack direction="row" sx={{ ...btnSty }}>
                                    <Button variant="outlined" onClick={closeBtn}>
                                        Close
                                    </Button>
                                    <Button variant="contained"  type='submit' sx={{ mx: 1 }} endIcon={<SendIcon />}>
                                        Submit
                                    </Button>
                                </Stack>
                            </form>

                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}
