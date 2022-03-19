import React, { useEffect, useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, Icon, Dialog, DialogTitle, DialogContentText } from "@mui/material";
import useStyles from "./styles"
import Input from './Input';
import { GoogleLogin } from "react-google-login";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp, signIn } from '../../actions/auth';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


function SimpleDialog(props) {
    const { onClose, open } = props;
  
    const handleClose = () => {
      onClose();
    };
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle align="center">INFO</DialogTitle>
       <DialogContentText align="center" >
           Make sure to use the same method of sign-up for sign-in <br />
           i.e If Google method was used to create an account, that should always be your sign-in method
       </DialogContentText>
      </Dialog>
    );
  }


const Auth = () => {
    const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: ""};
    
    const [open, setOpen] = React.useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [isSignUp, setIsSignUp] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      setOpen(true)
    }, [])
    

    const handleShowPassword = () => setShowPassword(!showPassword)
    const switchMode = () => {
        setIsSignUp(!isSignUp);
        setShowPassword(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignUp) {
            dispatch(signUp(formData, navigate))
        } else {
            dispatch(signIn(formData, navigate))
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: "AUTH", data: { result, token } })
            navigate('/')
        } catch (error) {
            console.log("error >", error)
        }

    }

    const googleFailure = (error) => {
        //the error should be solved by clearing cache and storage beacuse of the cookies
        console.log(error)
        console.log("Google sign in was unsuccessful, try again later")
    }



  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In" }</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignUp && (
                            <>
                               <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                               <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                    {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" handleShowPassword={handleShowPassword} />}
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignUp ? "Sign Up" : "Sign In" }
                </Button>
                <GoogleLogin 
                  clientId="854022471957-k69ahelukujh04ben1ho7blhetotrrss.apps.googleusercontent.com"
                  render={(renderProps) => (
                      <Button 
                        className={classes.googleButton} 
                        color="primary" 
                        fullWidth 
                        onClick={renderProps.onClick} 
                        disabled={renderProps.disabled} 
                        startIcon={<Icon />} 
                        variant="contained"
                        >
                            Google Sign In
                        </Button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                  cookiePolicy="single_host_origin"
                />
                <Grid container justify="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            { isSignUp ? "Already have an account?, Sign in" : "Don't have an account?, Sign up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
        <SimpleDialog
        open={open}
        onClose={() => setOpen(false)}
      />
    </Container>
  )
}

export default Auth