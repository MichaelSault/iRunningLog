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

export default function LogRun() {
    const [returnedData, setReturnedData] = useState({RunID: 0, Title: '', Date: '', Time: 0, Distance: 0, Description: "", Effort: 0});
    const [run, setRun] = useState({RunnerID: 13, Title: '', Date: '', Time: 0, Distance: 0, Description: "", Effort: 0});
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = document.cookie;
        console.log(loggedInUser);
        if (loggedInUser) {
            console.log("User logged in");
        } else {
            navigate("/login");
        }
        console.log(loggedInUser);
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            title: data.get('title'),
        });
    };

    const setInput = (e) => {
        const {name, value} = e.target;
        console.log(value);
        if (name === 'RunID' || name === 'RunnerID' || name === 'Time' || name === 'Distance' || name === 'Effort'){
            setRun(prevState => ({
            ...prevState,
            [name]: parseInt(value)
        }));
        return;
        }
        setRun(prevState => ({
        ...prevState,
        [name]: value
        }));
    }

    const logRun = async () => {
        const newData = await fetch('http://localhost:5000/logrun', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            ...run
        })
        })
        .then(res => res.json());
        console.log(newData);
        setReturnedData(newData[0]);
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
                    Log Your Run
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete="title"
                                name="Title"
                                required
                                fullWidth
                                id="Title"
                                label="Title"
                                onChange={setInput}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete="date"
                                name="Date"
                                required
                                fullWidth
                                id="Date"
                                label="Date"
                                onChange={setInput}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                autoComplete="time"
                                name="Time"
                                required
                                fullWidth
                                id="Time"
                                label="Time"
                                onChange={setInput}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                autoComplete="distance"
                                name="Distance"
                                required
                                fullWidth
                                id="Distance"
                                label="Distance"
                                onChange={setInput}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete="description"
                                name="Description"
                                required
                                fullWidth
                                id="Description"
                                label="Description"
                                onChange={setInput}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete="effort"
                                name="Effort"
                                required
                                fullWidth
                                id="Effort"
                                label="Perceived Effort (1-10)"
                                onChange={setInput}
                            />
                        </Grid>
                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => logRun()}
                    >
                    Log Run
                    </Button>
                </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}