import {useState, useEffect} from 'react';
import '../App.css';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useParams } from 'react-router-dom';
import { BorderTop, Padding } from '@mui/icons-material';

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
    const [returnedData, setReturnedData] = useState([]);

    const navigate = useNavigate();
    let {RunID} = useParams();
    

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
        getActivity(RunID);
    }

    const cookies = new Cookies();

    const getActivity = async (RunID) => {
        console.log(RunID);
        const activityData = await fetch('http://localhost:5000/getActivity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({Token: RunID})
        })
        .then(res => res.json());

        setActivity(activityData);
        console.log(activityData);
    }

    const setActivity = async (activityData) => {
        setReturnedData(activityData.recordset[0]);
        console.log(returnedData.Title);
    }


    return (
        <ThemeProvider theme={darkTheme}>
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                <table className='activityTable' style={{width: '60%'}}>
                    <tr className='activityTable'>
                        <p>{returnedData.Date}</p>
                    </tr>
                    <tr style={{width: '100%'}}>
                        <td className='activityTable' style={{width: '100%'}}>
                            <h1>{returnedData.Title}</h1>
                        </td>
                    </tr>
                    <b>Description: </b>
                    <tr>
                        <td className='activityTable' style={{width: '100%'}}><p>{returnedData.Description}</p></td>
                    </tr>
                    <tr>
                        <td className='activityTable' style={{width: '100%'}}>
                            <td style={{width: '43%'}}><b>Distance: </b>{returnedData.Distance}</td>
                            <td style={{width: '43%'}}><b>Time: </b> {returnedData.Time}</td>
                            <td style={{width: '43%'}}><b>Effort: </b> {returnedData.Effort}</td>
                        </td>
                    </tr>
                </table>
                
                

                
                </Box>
            </Container>
        </ThemeProvider>
    );
}