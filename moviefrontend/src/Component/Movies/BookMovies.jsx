import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useLocation,useNavigate } from "react-router-dom";
import Utils from "../../common/UtilsPart/Utils";
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { MovieDocContext } from "../Context/MovieDocContext";
import { useContext } from "react";

const rows = ["A", "B", "C", "D", "E", "F"];
const cols = [1, 2, 3, 4, 5, 6, 7, 8];

const BookMovies = () => {
    const location = useLocation();
    const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState(false);
    const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
    const [snackbarsuccessMessage, setSnackbarSuccessMessage] = useState('');
    const [snackbarerrorMessage, setSnackbarErrorMessage] = useState('');
    const { movieDocData } = useContext(MovieDocContext);
    const navigate = useNavigate();

    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSeatClick = (row, col) => {
        const seat = `${row}${col}`;
        setSelectedSeats(prevSeats =>
            prevSeats.includes(seat) ? prevSeats.filter(s => s !== seat) : [...prevSeats, seat]
        );
    };

    

    useEffect(() => {
        console.log("Show Name:", movieDocData.selectshow);
       
    }, [movieDocData]);

  

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

    const handleBooking = async (e) => {
        e.preventDefault();

        

        try {
            const data = {
                movieName: movieDocData.movieName,
                bookingDate: movieDocData.moviedate,
                theatreName: movieDocData.selectTheatre,
                showTime: movieDocData.selectshow,
                noOfSeats: selectedSeats.length,
                seatNumbers: selectedSeats
            };

            const response = await axios.post(`${Utils.BaseURL6}/book`, data);
            console.log("Book Ticket",response.data);

            if(response.status === 200){
                setSnackbarSuccessMessage(response.data.message); 
                setSnackbarSuccessOpen(true);
            
                setTimeout(() => {
                    navigate("/movie/payment");
                }, 1000);

            }else{
                setSnackbarErrorMessage("Error While Saving Data"); 
                setSnackbarErrorOpen(true);

            }
            
            
        } catch (error) {
            console.log("Error While Booking Ticket");
            console.log("Message:", error.response?.data?.message || "Unknown error occurred");
            setSnackbarErrorMessage(error.response?.data?.message || "Error While Saving Data");
            setSnackbarErrorOpen(true);
            
        }
    };

    return (
        <MainContent>
            <Header>
                <Link to="/movie" className="linkR">All Movie</Link>
                &nbsp; || &nbsp;Book Movie 
            </Header>

            <BookingContainer>
                <Title>Movie : {movieDocData.movieName}</Title>

                <SeatLegend>
                    <LegendItem className="na" /> N/A
                    <LegendItem className="selected" /> Selected
                    <LegendItem className="occupied" /> Occupied
                </SeatLegend>

                <Content>
                    {/* Seat Selection Grid */}
                    <SeatSelection>
                        <Screen>SCREEN</Screen>
                        <SeatGrid>
                            {rows.map(row => (
                                <Row key={row}>
                                    <RowLabel>{row}</RowLabel>
                                    {cols.map(col => {
                                        const seat = `${row}${col}`;
                                        return (
                                            <Seat
                                                key={seat}
                                                className={selectedSeats.includes(seat) ? "selected" : ""}
                                                onClick={() => handleSeatClick(row, col)}
                                            >
                                                {col}
                                            </Seat>
                                        );
                                    })}
                                </Row>
                            ))}
                        </SeatGrid>

                    </SeatSelection>


                    <BookingForm>
                        <Form onSubmit={handleBooking}>
                            <FormRow>
                                <Label>Booking Date</Label>
                                <Input type="text" value={movieDocData.moviedate} readOnly />
                            </FormRow>
                            <FormRow>
                                <Label>Theatre Name</Label>
                                <Input type="text" value={movieDocData.selectTheatre} readOnly />
                            </FormRow>
                            <FormRow>
                                <Label>Show Time</Label>
                                <Input type="text" value={movieDocData.selectshow} readOnly />
                            </FormRow>
                            <FormRow>
                                <Label>Number of Seats</Label>
                                <Input type="text" value={selectedSeats.length} readOnly />
                            </FormRow>
                            <FormRow>
                                <Label>Seat Numbers</Label>
                                <Input type="text" value={selectedSeats.join(", ")} readOnly />
                            </FormRow>
                            <FormRow>
                                <Label>Row A B C - 300 rs.</Label>
                            </FormRow>
                            <FormRow>
                                <Label>Row D E F - 500 rs.</Label>
                            </FormRow>
                            <BookButton type="submit" onClick={handleBooking}>Book Now</BookButton>
                        </Form>
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
                    </BookingForm>
                </Content>
            </BookingContainer>
        </MainContent>
    );
};

/* Styled Components */
const MainContent = styled.div
    `
    background-color: #242333;
    width: 100%;
    min-height: 100vh;
    padding-bottom: 20px;

`;

const Header = styled.div
    `
    height: 40px;
    background-color: #f6f6f6;
    display: flex;
    align-items: center;
    padding-left: 75px;
    font-family: "Open Sans", sans-serif;
`;

const BookingContainer = styled.div
    `
    padding: 20px;
`;

const Title = styled.h2
    `
    text-align: center;
    color: white;
    margin-bottom: 20px;
`;

const SeatLegend = styled.div
    `
    display: flex;
    justify-content: center;
    gap: 15px;
    color: white;
    margin-bottom: 20px;
`;

const LegendItem = styled.div
    `
    width: 20px;
    height: 20px;
    display: inline-block;
    border-radius: 5px;
    margin-right: 5px;

    &.na { background: grey; }
    &.selected { background: lightblue; }
    &.occupied { background: white; }
`;

const Content = styled.div
    `
    display: flex;
    gap: 50px;
    justify-content: center;
`;

const SeatSelection = styled.div
    `
    flex: 1;
    text-align: center;
    margin-top:50px;
`;

const Screen = styled.div
    `
    background: white;
    height: 40px;
    margin-bottom: 20px;
    font-weight: bold;
    
`;

const SeatGrid = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background: #3a3a3a;
    padding: 10px;
    border-radius: 10px;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const RowLabel = styled.div`
    color: white;
    font-weight: bold;
    width: 30px;
    text-align: center;
`;

const Seat = styled.div`
    width: 35px;
    height: 35px;
    background: grey;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;

    &.selected {
        background: lightblue;
        color: black;
    }
`;

const ConfirmButton = styled.button`
    background-color: red;
    color: white;
    padding: 10px 20px;
    margin-top: 20px;
    border: none;
    cursor: pointer;
`;

const BookingForm = styled.div
    `
    flex: 1;
    padding: 20px;
`;

const Form = styled.form
    `
    padding: 20px;
    border-radius: 10px;
`;

const FormRow = styled.div
    `
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
`;

const Label = styled.label
    `
    color: white;
    font-size: 16px;
    margin-bottom: 5px;
`;

const Input = styled.input
    `
    padding: 10px;
    border-radius: 5px;
    border: none;
    background: #ddd;
    text-align: center;
`;

const BookButton = styled.button
    `
    background-color: #d63447;
    color: white;
    padding: 12px;
    width: 100%;
    border: none;
    cursor: pointer;
    font-size: 16px;
`;

export default BookMovies;
