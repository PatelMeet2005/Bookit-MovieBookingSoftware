import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Utils from '../../../common/UtilsPart/Utils';
import { Chart as ChartJs } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const AdminDashboard = () => {
  const [theatreData, setTheatreData] = useState(0);
  const [customerData, setCustomerData] = useState(0);
  const [movieData, setMovieData] = useState(0);

  useEffect(()=>{
    const getThetreData = async () => {
      try {
        const response = await axios.get(`${Utils.BaseURL3}/gettheater`);
        console.log('Data:', response.data.getData);
        setTheatreData(response.data.getData.length);
        
      } catch (error) {
        console.log('Error While Getting Data');
      }
    }

    getThetreData();

  },[]);

  useEffect(() => {

    const getcustomer = async () => {
      try{

        const response = await axios.get(`${Utils.BaseURL}/getregisterdata`);
        console.log("Customer Data:",response.data.RegisterData);
        setCustomerData(response.data.RegisterData.length);
      }catch(error){
        console.log("Error!");

      }
    }
    getcustomer();

  },[]);

  useEffect(() => {

    const getmovieData = async () => {
      try{

        const response = await axios.get(`${Utils.BaseURL5}/getmoviedata`);
        console.log("Movie Data:",response.data.data);
        setMovieData(response.data.data.length);
        
      }catch(error){
        console.log("Error!");

      }
    }
    getmovieData();

  },[]);



  return (

    <AdminMainContent>
      <AdminHeading>Admin Dashboard</AdminHeading>

      <AdminBoxContain>

        <Link to="/admintheater" style={{ textDecoration: 'none' }}>
          <TheaterBox>
            <Text>Theatre</Text>
            <Count>{theatreData}</Count>
          </TheaterBox>
        </Link>

        <Link to="/adminmovielist" style={{ textDecoration: 'none' }}>
          <MovieBox>
            <Text>Movies</Text>
            <Count>{movieData}</Count>
          </MovieBox>
        </Link>

        <Link to="/admincustomer" style={{ textDecoration: 'none' }}>
          <CustomerBox>
            <Text>Customers</Text>
            <Count>{customerData}</Count>
          </CustomerBox>
        </Link>

        <Link to="/adminbooking" style={{ textDecoration: 'none' }}>
          <BookingBox>
            <Text>Bookings</Text>
            <Count>0</Count>
          </BookingBox>
        </Link>

      </AdminBoxContain>

      <ChartContainer>
        <Bar
          data={{
            labels: ['Theatre', 'Movie', 'Customer', 'Booking'],
            datasets: [{
              label: 'Admin Dashboard',
              data: [theatreData, movieData, customerData, 0],
              backgroundColor: ['#dc3545', '#ffc107', '#28a745', '#007bff'],
            }]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </ChartContainer>
      





    </AdminMainContent>

    
  )
}

const AdminMainContent = styled.div
  `
   margin-left: 260px; 
   padding: 20px;
     margin-top:50px;

`;

const AdminHeading = styled.div
  `
font-size:32px;
font-family : system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
border-bottom : 2px solid black;
margin-bottom : 20px;
`;

const AdminBoxContain = styled.div
  `
display:flex;
justify-content: center;

`;

const TheaterBox = styled.div
  `
background-color:#dc3545 !important;
border-radius:10px;
width:260px;
height:120px;
margin-right:20px;
margin-left:10px;
`;


const MovieBox = styled.div
  `
background-color:#ffc107 !important;
border-radius:10px;
width:260px;
height:120px;
margin-right:20px;
margin-left:10px;


`;


const CustomerBox = styled.div
  `
background-color:#28a745 !important;
border-radius:10px;
width:260px;
height:120px;
margin-right:20px;
margin-left:10px;


`;


const BookingBox = styled.div
  `
background-color:#007bff !important;
border-radius:10px;
width:260px;
height:120px;
margin-right:20px;
margin-left:10px;


`;

const Text = styled.div
  `
color:white;
padding:20px;
font-size:1.5rem;
text-align:center;
`;

const Count = styled.div
  `
color:White;
font-size:1.5rem;
text-align:center;
`;

const ChartContainer = styled.div`
  width: 100%;
  max-width: 800px;
  height: 400px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 20px auto;
`;



export default AdminDashboard
