import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import Utils from '../../../common/UtilsPart/Utils';


const AdminCustomer = () => {

  const [customerData, setCustomerData] = useState([]); 

  useEffect(() => {

    const getcustomer = async () => {
      try{

        const response = await axios.get(`${Utils.BaseURL}/getregisterdata`);
        console.log("Customer Data:",response.data.RegisterData);
        setCustomerData(response.data.RegisterData);


      }catch(error){
        console.log("Error!");

      }
    }
    getcustomer();

  },[]);


  return (
    <AdminMainContent>
      <AdminHeading>Customers</AdminHeading>
    <Table>
        <thead>
          <TableRow>
            <TableHeader>Sr. No</TableHeader>
            <TableHeader>Customer Name</TableHeader>
            <TableHeader>Phone No</TableHeader>
            <TableHeader>Email ID</TableHeader>
            <TableHeader>Gender</TableHeader>
            
          </TableRow>
        </thead>
        <tbody>
        {customerData.map((item,index) => (
          <TableRow key={index} >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.mobile}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.gender}</TableCell>
            </TableRow>

        ))}
            
        
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

export default AdminCustomer
