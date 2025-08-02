import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Utils from '../../common/UtilsPart/Utils';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { MovieDocContext } from '../Context/MovieDocContext';

const MovieReview = () => {
    const location = useLocation();
    const { movieContent } = location.state || {};
    const [showData, setShowData] = useState([]);
    const [gettheatreData, setGetTheatreData] = useState([]);
    const [moviedate, setMoviedate] = useState("");
    const [selectTheatre, setSelectTheatre] = useState("");
    const [selectshow, setSelectShow] = useState("");
    const navigate = useNavigate();
    const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState(false);
    const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
    const [snackbarsuccessMessage, setSnackbarSuccessMessage] = useState('');
    const [snackbarerrorMessage, setSnackbarErrorMessage] = useState('');
    const Email = sessionStorage.getItem('Email');
    const { setMovieDocData } = useContext(MovieDocContext);


    const handleSuccessAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarSuccessOpen(false);
    }

    const handleErrorAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarErrorOpen(false);
    }



    useEffect(() => {

        const fetchtheatre = async () => {
            try {
                const response = await axios.get(`${Utils.BaseURL3}/gettheater`);
                console.log('Data:', response.data.getData);
                setGetTheatreData(response.data.getData);
            } catch (error) {
                console.log('Error While Getting Data');
            }
        }

        fetchtheatre();

    }, []);

    useEffect(() => {
        const getShow = async () => {
            try {

                const response = await axios.get(`${Utils.BaseURL4}/getshow`);
                console.log("Show Data:", response.data.data);
                setShowData(response.data.data);


            } catch (error) {
                console.log("Error!");

            }
        }
        getShow();

    }, []);

    const handleSubmit = () => {

        if (!moviedate) {
            setSnackbarErrorMessage("Movie Date is required!");
            setSnackbarErrorOpen(true);
            return;
        }

        if (!selectTheatre) {
            setSnackbarErrorMessage("Please Select Theatre required!");
            setSnackbarErrorOpen(true);
            return;
        }

        if (!selectshow) {
            setSnackbarErrorMessage("Please Select show required!");
            setSnackbarErrorOpen(true);
            return;
        }
        

        setMovieDocData({
            moviedate,
            selectTheatre,
            selectshow,
            movieName: movieContent.movieName,
            releaseDate: movieContent.releaseDate, 
            actor: movieContent.actors, 
            actress: movieContent.actress, 
            description: movieContent.description,
            img: movieContent.photo,
        })

         navigate("/movie/bookmovies");

    }

    return (
        <MainContent>
            <MainContent1>
                <Link to="/movie" className="linkR">All Movie</Link>
                &nbsp; ||  &nbsp;Movie Review

            </MainContent1>

            <MovieContent>

                <MovieHeading>
                    Displaying Details
                </MovieHeading>

                <HorizontalLine />


                <MovieDetails>
                    <MovieImagePart>
                        <img src={movieContent.photo} alt='eror' width="400px" height="500px" />
                    </MovieImagePart>

                    <MovieReviewPart>

                        <MovieReviewPartContent>
                            <MovieQues>
                                Movie Name
                            </MovieQues>

                            <MovieAns>
                                {movieContent.movieName}
                            </MovieAns>
                        </MovieReviewPartContent>

                        <HorizontalLine />

                        <MovieReviewPartContent>
                            <MovieQues>
                                Director
                            </MovieQues>

                            <MovieAns>
                                {movieContent.director}
                            </MovieAns>
                        </MovieReviewPartContent>

                        <HorizontalLine />


                        <MovieReviewPartContent>
                            <MovieQues>
                                Release Date
                            </MovieQues>

                            <MovieAns>
                                {movieContent.releaseDate}

                            </MovieAns>
                        </MovieReviewPartContent>

                        <HorizontalLine />


                        <MovieReviewPartContent>
                            <MovieQues>
                                Actor
                            </MovieQues>

                            <MovieAns>
                                {movieContent.actors}
                            </MovieAns>
                        </MovieReviewPartContent>

                        <HorizontalLine />


                        <MovieReviewPartContent>
                            <MovieQues>
                                Actress
                            </MovieQues>

                            <MovieAns>
                                {movieContent.actress}
                            </MovieAns>
                        </MovieReviewPartContent>

                        <HorizontalLine />


                        <MovieReviewPartContent>
                            <MovieQues>
                                Description
                            </MovieQues>

                            <MovieAns>
                                {movieContent.description}
                            </MovieAns>
                        </MovieReviewPartContent>

                        <HorizontalLine />



                        <MovieReviewPartContent>
                            <MovieQues>
                                Trailer
                            </MovieQues>

                            <MovieAns>
                                <a style={{ color: 'red', textDecoration: 'none' }} href={movieContent.trailerlink} target='_blank'>Show Trailer</a>
                            </MovieAns>
                        </MovieReviewPartContent>
                        <HorizontalLine />

                        {Email ? (

                            <>
                                <MovieReviewPartContent>
                                    <MovieQues>
                                        Choose Date
                                    </MovieQues>
                                    <MovieAns>
                                        <StyledInput type="date" id='moviedate' name='moviedate'
                                            value={moviedate}
                                            onChange={(e) => setMoviedate(e.target.value)}
                                        />
                                    </MovieAns>
                                </MovieReviewPartContent>
                                <HorizontalLine />

                                <MovieReviewPartContent>
                                    <MovieQues>
                                        Choose Theatre
                                    </MovieQues>
                                    <MovieAns>
                                        <StyledSelect id='selectTheatre' name='selectTheatre'
                                            value={selectTheatre}
                                            onChange={(e) => setSelectTheatre(e.target.value)}
                                            defaultValue="">
                                            <option value="" disabled>
                                                Choose Theatre
                                            </option>
                                            {gettheatreData.map((item) => (
                                                <option key={item._id} value={item.theaterName}>
                                                    {item.theaterName} ({item.theaterLocation})
                                                </option>
                                            ))}
                                        </StyledSelect>
                                    </MovieAns>
                                </MovieReviewPartContent>
                                <HorizontalLine />






                                <MovieReviewPartContent>
                                    <MovieQues>
                                        Choose Show
                                    </MovieQues>

                                    <MovieAns>
                                        <StyledSelect id='selectshow' name='selectshow'
                                            value={selectshow}
                                            onChange={(e) => setSelectShow(e.target.value)}
                                            defaultValue="">
                                            <option value="" disabled>
                                                Choose show
                                            </option>
                                            {showData.map((item) => (
                                                <option key={item._id} value={item.showName}>
                                                    {item.showName} ({item.showStartTime} - {item.showEndTime})
                                                </option>
                                            ))}
                                        </StyledSelect>
                                    </MovieAns>
                                </MovieReviewPartContent>

                                <Button onClick={handleSubmit}>Book Movie</Button>
                            </>):(
                                <>
                                    <p style={{marginTop:'20px', fontSize:'20px',textAlign:'center'}}>Please Login to Book Ticket.
                                     <Link style={{margin:'5px', textDecoration:'none', color:'red'}} to="/login">Login</Link> </p>
                                </>
                            )}

                    </MovieReviewPart>


                </MovieDetails>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={snackbarSuccessOpen}
                    autoHideDuration={6000}
                    onClose={handleSuccessAlert}
                >
                    <MuiAlert
                        onClose={handleSuccessAlert}
                        severity="success"
                        sx={{ width: '100%' }}
                    >
                        {snackbarsuccessMessage}
                    </MuiAlert>
                </Snackbar>

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={snackbarErrorOpen}
                    autoHideDuration={6000}
                    onClose={handleErrorAlert}
                >
                    <MuiAlert
                        onClose={handleErrorAlert}
                        severity="error"
                        sx={{ width: '100%' }}
                    >
                        {snackbarerrorMessage}
                    </MuiAlert>
                </Snackbar>

            </MovieContent>



        </MainContent>
    )
}

const MainContent = styled.div
    `
`;

const MainContent1 = styled.div
    `
    height: 40px;
    background-color: #f6f6f6;
    display: flex;
    align-items: center;
    padding-left: 75px;
    font-family: "Open Sans", sans-serif;

`;

const MovieContent = styled.div
    `


margin: 20px 60px 20px 60px;
padding:10px;
border-radius:10px;
`

const MovieHeading = styled.div
    `
margin-top:20px;
text-align:center;
font-size:24px;
color:#0C0F0A;
font-weight: bold;
 font-family: "Open Sans", sans-serif;
 margin-bottom:20px;
 
`;

const MovieDetails = styled.div
    `
width:100%;
display:flex;
`;

const MovieImagePart = styled.div
    `
width:40%;
//background-color:red;
margin:0 60px 10px 80px;
padding: 0 10px 0 90px;
border-radius:10px;
align-item:center;

`;

const MovieReviewPart = styled.div
    `
width:60%;
`;

const MovieReviewPartContent = styled.div
    `
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    width: 100%;
`;

const MovieQues = styled.div
    `
    font-size: 16px;
    font-family: "Open Sans", sans-serif;
    font-weight: bold;
    width: 200px; 
`;

const MovieAns = styled.div
    `
    font-size: 16px;
    font-family: "Open Sans", sans-serif;
    
    flex: 1; 
    text-align: left; 
    padding-left: 20px; 
`;


const HorizontalLine = styled.hr
    `
border-bottom : 1px solid grey;
margin-bottom:15px;
`;

const Input = styled.input
    `
border-radius:3px;
padding:0 30px 0 30px;
`;

const StyledInput = styled.input
    `
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  transition: 0.3s ease-in-out;
  
  &:focus {
    border-color: #ff5733;
    box-shadow: 0px 0px 5px rgba(255, 87, 51, 0.5);
  }
`;

const StyledSelect = styled.select
    `
   width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background-color: #fff;
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  margin: 0;
  padding-left: 10px; 

  &:focus {
    border-color: #ff5733;
    box-shadow: 0px 0px 5px rgba(255, 87, 51, 0.5);
  }

  option {
    font-size: 16px;
    background: #fff;
  }
`;

const Button = styled.button
    `
margin-top:20px;
background-color:#28a745;
border-color:#28a745;
`


export default MovieReview
