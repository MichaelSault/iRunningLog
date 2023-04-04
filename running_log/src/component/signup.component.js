import {useState, useEffect} from 'react';
import '../App.css';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: "#282c34"
        },
        secondary: {
            main: '#9370DB',
        },
    }
});


export default function SignUp() {
    const [returnedData, setReturnedData] = useState({RunnerID: 0, First: '', Last: '', Email: 0, Display: 0, Password: ""});
    const [newUser, setNewUser] = useState({RunnerID: 0, First: '', Last: '', Email: 0, Display: 0, Password: ""});
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = document.cookie;
        console.log(loggedInUser);
        if (loggedInUser) {
            navigate("/logrun");
        } else {
            console.log("No user logged in");
        }
        console.log(loggedInUser);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('Email'),
        });
    };

    const setInput = (e) => {
        const {name, value} = e.target;
        console.log(value);
        if (name === 'RunID' || name === 'Time' || name === 'Distance' || name === 'Effort'){
            setNewUser(prevState => ({
            ...prevState,
            [name]: parseInt(value)
        }));
        return;
        }
        setNewUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const signUp = async () => {
        const newData = await fetch('http://localhost:5000/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ...newUser
            })
        })
        .then(res => res.json())
        .then(navigate("/login"));
        //setReturnedData(newData[0]);
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Avatar sx={{ m: 1, bgcolor: 'RebeccaPurple', color: 'white', fontSize: 'large' }}>
                    <DirectionsRunRoundedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create An Account
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete="username"
                                name="Username"
                                required
                                fullWidth
                                id="Username"
                                label="Username"
                                onChange={setInput}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                autoComplete="firstName"
                                name="First"
                                required
                                fullWidth
                                id="First"
                                label="First Name"
                                onChange={setInput}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                autoComplete="lastName"
                                name="Last"
                                required
                                fullWidth
                                id="Last"
                                label="Last Name"
                                onChange={setInput}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete="email"
                                name="Email"
                                required
                                fullWidth
                                id="Email"
                                label="Email"
                                onChange={setInput}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="Password"
                                required
                                fullWidth
                                id="Password"
                                label="Password"
                                onChange={setInput}
                                type="password"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="ConfirmPassword"
                                required
                                fullWidth
                                id="ConfirmPassword"
                                label="ConfirmPassword"
                                onChange={setInput}
                                type="password"
                            />
                        </Grid>
                        
                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => signUp()}
                    >
                    Sign Up
                    </Button>
                </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}