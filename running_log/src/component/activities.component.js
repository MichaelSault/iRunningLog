import {useState, useEffect} from 'react';
import '../App.css';
import Button from '@mui/material/Button';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { generatePath, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useParams } from 'react-router-dom';
import { BorderTop, Padding, WidthFull } from '@mui/icons-material';
import { TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import Typography from '@mui/material/Typography';

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
    const [comment, setComment] = useState({RunID: 0, RunnerID: 0, Date: '', Comment: ''});

    const [commentHistoryArray, setCommentHistoryArray] = useState([]);


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
        console.log(RunID);
        commentHistory(RunID);
    }

    const setActivity = async (activityData) => {
        setReturnedData(activityData.recordset[0]);
        console.log(returnedData.Title);
    }

    const setInput = (e) => {
        const {name, value} = e.target;
        console.log(value);
        if (name === 'RunID' || name === 'RunnerID' || name === 'Effort'){
            setComment(prevState => ({
            ...prevState,
            [name]: parseInt(value)
        }));
        return;
        }
        setComment(prevState => ({ //should move the other vars to another function that doesn't run every time
            ...prevState,
            RunID: returnedData.RunID,
            RunnerID: returnedData.RunnerID,
            Date: returnedData.Date,
            [name]: value
        }));
    }

    const leaveComment = async () => {
        //await generateComment(RunID);
        console.log(comment);
        const newData = await fetch('http://localhost:5000/setComment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            ...comment
        })
        })
        .then(res => res.json());
        console.log(newData);
        setReturnedData(newData[0]);

        console.log(comment);
    }

    const commentHistory = async (token) => {
        console.log(token);
        const comments = await fetch('http://localhost:5000/commentHistory', {
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

        console.log(comments.recordset[0]);

        var commentArray = createCommentArray(comments);
        createCommentArray(comments);
        console.log(comments[1]);
        console.log(commentArray);
    }

    function createCommentArray(commentArray) {
        console.log("enter array creator");
        console.log(commentArray.recordset.length);
        var commentHistoryArray = [];
        for (let i=0; i <= commentArray.recordset.length-1; i++) {
            commentHistoryArray[i] = commentArray.recordset[i];
            console.log(commentHistoryArray[i]);
        }
        console.log(commentHistoryArray);

        return commentHistoryArray;
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
                
                <Avatar sx={{ m: 1, bgcolor: 'RebeccaPurple', color: 'white', fontSize: 'large' }}>
                    <DirectionsRunRoundedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {returnedData.Title}
                </Typography>

                <table className='activityTable' style={{width: '60%'}}>
                    <tr className='activityTable'>
                        <p>{returnedData.Date}</p>
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
                <br/>
                <div style={{width: '60%'}}>
                    <TextField
                        name='Comment'
                        id="outlined-multiline-flexible"
                        label="Comment on this activity?"
                        multiline
                        rows={3}
                        fullWidth
                        onChange={setInput}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => leaveComment()}
                        >
                        Comment
                    </Button>
                </div>

                <table className='activityTable'>
                    {commentHistoryArray.length > 0 && (
                        <>
                            {commentHistoryArray.map((comment, index) => {
                                return (
                                    <>
                                        <tr>
                                            <td className='activityTable'>{index+1}.</td>
                                            <td>
                                                <td className='activityTableTitle'><b>{comment.Title}</b></td>
                                                <td className='activityTableDate'>{comment.Date.split('T')[0]}</td>
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
                                                <td className='distanceTime'>{comment.Distance}km</td>
                                                
                                                <td className='distanceTime'>{comment.Time}</td>

                                                <td className='distanceTime'>pace /km</td>
                                            </td>
                                        </tr>
                                        <br/>
                                    </>
                                )
                            })}
                        </>
                    )}
                </table>

                
                </Box>
            </Container>
        </ThemeProvider>
    );
}