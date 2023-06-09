import {useState, useEffect} from 'react';
import '../App.css';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

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




//var userActivityArray = [{RunID: 11, RunnerID: 13, Title: 'Post Practice 5k', Date: '2023-04-13T00:00:00.000Z', Distance: 5.15}];

export default function ViewRuns() {
    const [userActivityArray, setUserActivityArray] = useState([]);

    const navigate = useNavigate();

    function viewActivity(activity){
        console.log("does this work?");
        console.log("Test");
        console.log(activity.activity.RunID);
        navigate('/activities/'+ (activity.activity.RunID));
    }

    useEffect(() => {
        const loggedInUser = document.cookie.split('=')[1];
        console.log(loggedInUser);
        if (loggedInUser) {
            console.log("User logged in", loggedInUser);
            decodeJWT(loggedInUser);
        } else {
            navigate("/login");
        }
        console.log(loggedInUser);
    }, []);


    const decodeJWT = async (token) => {
        console.log("token: ", token)
        const tokenData = await fetch('http://localhost:5000/decodeJWT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                Token: token
            })
        })
        .then(res => res.json());

        console.log(tokenData);
        runHistory(tokenData);
    }

    const runHistory = async (token) => {
        console.log(token.RunnerID);
        const userActivity = await fetch('http://localhost:5000/runHistory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({Token: token.RunnerID})
        })
        .then(res => res.json());

        console.log(userActivity.recordset[0]);

        var activityArray = createActivityArray(userActivity);
        setUserActivityArray(activityArray);
        console.log(activityArray[1]);
        console.log(userActivityArray);
    }

    function createActivityArray(userActivity) {
        console.log("enter array creator");
        console.log(userActivity.recordset.length);
        var userActivityArray = [];
        for (let i=0; i <= userActivity.recordset.length-1; i++) {
            userActivityArray[i] = userActivity.recordset[i];
            console.log(userActivityArray[i]);
        }
        console.log(userActivityArray);

        return userActivityArray;
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
                        Recent Activity:
                    </Typography>
                    <br/>

                    <table className='activityTable'>
                        {userActivityArray.length > 0 && (
                            <>
                                {userActivityArray.map((activity, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td className='activityTable'>{index+1}.</td>
                                                <td>
                                                    <td className='activityTableTitle'><b>{activity.Title}</b></td>
                                                    <td className='activityTableDate'>{activity.Date.split('T')[0]}</td>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='activityTable'></td>
                                                <td className='activityTable'>
                                                    <td className='smalltext'>Distance</td>
                                                    
                                                    <td className='smalltext'>Time</td>

                                                    <td className='smalltext'>Pace</td>
                                                </td>
                                            </tr>
                                            <tr>
                                            <td></td>
                                                <td >
                                                    <td className='distanceTime'>{activity.Distance}km</td>
                                                    
                                                    <td className='distanceTime'>{activity.Time}</td>

                                                    <td className='distanceTime'>pace /km</td>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td><Button className='wide' onClick={() => viewActivity({activity})}>View Run</Button></td>
                                            </tr>
                                            <br/>
                                        </>
                                    )
                                })}
                            </>
                        )}
                    </table>

                    <Box>
                        
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}