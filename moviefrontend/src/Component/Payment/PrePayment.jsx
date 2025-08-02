import React, { useContext } from 'react';
import { MovieDocContext } from '../Context/MovieDocContext';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PrePayment = () => {
    const { movieDocData } = useContext(MovieDocContext);

    // Sample data for demonstration purposes
    const movieName = movieDocData?.name || "Movie Title";
    const numberOfPersons = 2; // Example number of persons
    const ticketPrice = 10; // Example ticket price
    const taxRate = 0.1; // Example tax rate (10%)
    
    const total = numberOfPersons * ticketPrice;
    const tax = total * taxRate;
    const finalTotal = total + tax;

    return (
        <MainContent>
            <Header>
                <Link to="/movie" className="linkR">All Movies</Link>
                &nbsp; || &nbsp; Book Movie
            </Header>
            <PaymentHeader>
                Your Booking
            </PaymentHeader>

            <PaymentPart>
                <PaymentImg>
                    <img src={movieDocData.img} alt={movieName} width="600px" height="500px" />
                </PaymentImg>

                <PaymentCount>
                    <h2 style={{borderBottom:"1px solid grey"}}>{movieDocData.movieName}</h2>
                    
                    <Details>
                        <DetailItem>
                            <strong>Date:</strong>
                            <span>{movieDocData.moviedate}</span>
                        </DetailItem>
                        <DetailItem>
                            <strong>Theatre:</strong> 
                            <span>{movieDocData.selectTheatre}</span>
                        </DetailItem>
                        <DetailItem>
                            <strong>Show Time:</strong>
                            <span>{movieDocData.selectshow}</span> 
                        </DetailItem>
                        <DetailItem>
                            <strong>No of Seats:</strong> 
                            <span></span>
                        </DetailItem>
                        <DetailItem>
                            <strong>Seats:</strong> 
                            <span></span>
                        </DetailItem>



                        <DetailItem>
                            <strong>Ticket Price:</strong> 
                        </DetailItem>
                        <DetailItem>
                            <strong>Tax:</strong> 
                        </DetailItem>
                        <Total>
                            <strong>Total:</strong> 
                        </Total>
                    </Details>
                    <PayButton>Process Payment</PayButton>
                </PaymentCount>
            </PaymentPart>
        </MainContent>
    );
}

const MainContent = styled.div`
    
    
    
`;

const Header = styled.div`
    height: 40px;
    background-color: #f6f6f6;
    display: flex;
    align-items: center;
    padding-left: 75px;
    font-family: "Open Sans", sans-serif;
`;

const PaymentHeader = styled.div`
    margin: 20px 0;
    font-family: "Open Sans", sans-serif;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
`;

const PaymentPart = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const PaymentImg = styled.div`
    flex: 1;
    background-color: #ffffff;
    margin: 20px;
    padding: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        max-width: 100%;
        border-radius: 8px;
    }
`;

const PaymentCount = styled.div`
    flex: 1;
    background-color: #ffffff;
    margin: 20px;
    padding: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    
`;

const Details = styled.div
`
margin-top:10px;

    
`;

const DetailItem = styled.p`
   
    font-size: 16px;
   
`;

const Total = styled.h3`
    
    font-weight: bold;
    color: #4CAF50; /* Green */
`;

const PayButton = styled.button
`
    background-color: #4CAF50; /* Green */
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
    align-self: flex-start;

    &:hover {
        background-color: #45a049;
    }
`;

export default PrePayment;