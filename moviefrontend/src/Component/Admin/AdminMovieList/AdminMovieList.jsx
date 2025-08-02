import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import Utils from '../../../common/UtilsPart/Utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';


const AdminMovieList = () => {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {

    const getData = async () => {
      try{
        const response = await axios.get(`${Utils.BaseURL5}/getmoviedata`);
        console.log("Data Movie",response.data.data);
        setMovieData(response.data.data);

        

      }catch(error){
        console.log("Error While Getting Data");
        
      }

    }
    getData();


  },[]);



  return (
    <AdminMainContent>
     <AdminHeading>All Movies</AdminHeading>
     <Table>
        <thead>
          <TableRow>
            <TableHeader>Sr. No</TableHeader>
            <TableHeader>Movie Name</TableHeader>
            <TableHeader>Release Date</TableHeader>
            <TableHeader>Director</TableHeader>
            <TableHeader>Actors</TableHeader>
            <TableHeader>Actress</TableHeader>
            <TableHeader>Details</TableHeader>
          </TableRow>
        </thead>
        <tbody>
        {movieData.map((item,index) => (
          <TableRow key={index} >
              <TableCell>{index + 1} </TableCell>
              <TableCell>{item.movieName} </TableCell>
              <TableCell>{item.releaseDate} </TableCell>
              <TableCell>{item.director} </TableCell>
              <TableCell>{item.actors} </TableCell>
              <TableCell>{item.actress} </TableCell>
             
              <TableCell style={{display: "flex", background:'none', border:'none'}}><ActionButton>
                  <FontAwesomeIcon icon={faEdit} style={{ color: "#007bff", cursor: "pointer", marginRight: '10px', alignItems:'center' }} />
                </ActionButton>
                <ActionButton>
                  <FontAwesomeIcon icon={faTrash} style={{ color: "#c20505", cursor: "pointer" }} />
                </ActionButton></TableCell>
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

const ActionButton = styled.span`
  margin-right: 10px;
  display: flex;
`;


const TableCell = styled.td
  `
  padding: 10px;
`;


export default AdminMovieList
