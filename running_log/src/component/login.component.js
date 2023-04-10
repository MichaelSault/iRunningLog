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
import Cookies from 'universal-cookie';

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


export default function LogIn() {
    const [returnedData, setReturnedData] = useState({RunnerID: 0, First: '', Last: '', Email: '', Display: ''});
    const [userCredentials, setUserCredentials] = useState({Email: '', Password: ''});

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
            password: data.get('Password')
        });
    };

    const setInput = (e) => {
        const {name, value} = e.target;
        console.log(value);
        if (name === 'RunnerID'){
            setUserCredentials(prevState => ({
              ...prevState,
              [name]: parseInt(value)
            }));
            return;
          }
          setUserCredentials(prevState => ({
            ...prevState,
            [name]: value
          }));
    }

    const logIn = async () => {
        const newData = await fetch('http://localhost:5000/loginUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ...userCredentials
            })
        })
        .then(res => res.json());
        console.log("does this work?", newData);
        setReturnedData(newData);
        getJWT(newData);
    }

    const cookies = new Cookies();

    async function getJWT(newData) {
        //add check to see if user and pass match
        console.log(newData);
        console.log(userCredentials);
        var JWT = "";

        if ((newData.Email = userCredentials.Email) && (newData.Password = userCredentials.Password)){
            JWT = await fetch('http://localhost:5000/JWT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    RunnerID: newData.RunnerID,
                    First: newData.First,
                    Last: newData.Last,
                    Email: newData.Email,
                    Display: newData.Display,
                    Registered: true
                })
            })
            .then(res => res.text());
            console.log(JWT);
            cookies.set("user-authentication", JWT);
            navigate("/logrun");
        } else {
            console.log("Username and Password Mismatch!");
        }
        console.log(JWT);
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
                    Log In
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
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
                        
                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => logIn()}
                    >
                    Log In
                    </Button>
                </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}