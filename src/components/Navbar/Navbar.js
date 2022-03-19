import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import useStyles from './styles'
import { useDispatch } from 'react-redux';
import decode from "jwt-decode";


const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = user?.token; 

        if(token) {
            const decodedtoken = decode(token);

            if(decodedtoken.exp * 1000 < new Date().getTime()) {
                logOut();
            }
        }

      setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]);

    const logOut = () => {
        setUser(null)
        dispatch({ type: 'LOG_OUT'});
        navigate('/')
    }
    


    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
                    Memories
                </Typography>
                <img className={classes.image} src="https://media.istockphoto.com/photos/magnet-and-figures-of-people-customer-acquisition-and-retention-picture-id1336139577?b=1&k=20&m=1336139577&s=170667a&w=0&h=Bu7brRZVNhg5dy1I7S9VyZDAUlCgKFQKtCdg25ONhf0=" alt="memories" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt[0]}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logOut}>Log Out</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
//import 
//react router dom