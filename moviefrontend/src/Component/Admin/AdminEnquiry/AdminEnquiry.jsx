import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import Utils from '../../../common/UtilsPart/Utils';

const AdminEnquiry = () => {
  const [queryData, setQueryData] = useState([]);

  useEffect(() => {

    const fetchqueryData = async () => {
      try {

        const response = await axios.get(`${Utils.BaseURL2}/getcontact`);
        console.log("Response Data:", response.data.getcontactdata);
        setQueryData(response.data.getcontactdata);


      } catch (error) {
        console.log("Error While Saving Data!");
      }
    }
    fetchqueryData();

  }, []);


  return (
    <AdminMainContent>
      <AdminHeading>Enquiries</AdminHeading>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Sr. No</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Phone No</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Subject</TableHeader>
            <TableHeader>Query</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {queryData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.subject}</TableCell>
              <TableCell>{item.query}</TableCell>
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


export default AdminEnquiry
