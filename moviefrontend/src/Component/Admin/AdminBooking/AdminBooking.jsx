import React from 'react'
import styled from 'styled-components';


const AdminBooking = () => {
  return (
    <AdminMainContent>
     <AdminHeading>Bookings</AdminHeading>
    <Table>
        <thead>
          <TableRow>
            <TableHeader>Sr. No</TableHeader>
            <TableHeader>Booking ID</TableHeader>
            <TableHeader>Movie ID</TableHeader>
            <TableHeader>Theater ID</TableHeader>
            <TableHeader>Seats</TableHeader>
            <TableHeader>Seats Number</TableHeader>

            <TableHeader>Amount</TableHeader>
            <TableHeader>Booking Date</TableHeader>


            
          </TableRow>
        </thead>
        <tbody>
       
          <TableRow  >
              <TableCell> </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>

      
            
        
        </tbody>
      </Table>

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

const Table = styled.table
  `
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr
  `
  border-bottom: 1px solid #ddd;
`;

const TableHeader = styled.th
  `
  background-color: #ed969e;
  padding: 10px;
  text-align: left;
`;

const TableCell = styled.td
  `
  padding: 10px;
`;


export default AdminBooking
