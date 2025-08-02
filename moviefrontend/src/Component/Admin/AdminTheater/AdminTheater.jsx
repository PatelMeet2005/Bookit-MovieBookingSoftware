import React, { useEffect, useState } from 'react'
import './AdminTheater.css';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Utils from '../../../common/UtilsPart/Utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';



const AdminTheater = () => {
  const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState(false);
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
  const [snackbarsuccessMessage, setSnackbarSuccessMessage] = useState('');
  const [snackbarerrorMessage, setSnackbarErrorMessage] = useState('');
  const [gettheatreData, setGetTheatreData] = useState([]);

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

  const fetchtheatre = async () => {
    try {
      const response = await axios.get(`${Utils.BaseURL3}/gettheater`);
      console.log('Data:', response.data.getData);
      setGetTheatreData(response.data.getData);
    } catch (error) {
      console.log('Error While Getting Data');
    }
  };

  useEffect(() => {
    fetchtheatre();
  }, []);

  const handledeleteTheatre = async (id) => {
    try {
      const response = await axios.delete(`${Utils.BaseURL3}/deletetheater`, {
        data: { id }, 
      });
  
      console.log("Deleted theater Data:", response.data);
  
      if (response.status === 200) {
        setSnackbarSuccessMessage(response.data.message);
        setSnackbarSuccessOpen(true);
        fetchtheatre(); 
      } else {
        setSnackbarErrorMessage("Failed to delete theater.");
        setSnackbarErrorOpen(true);
      }
    } catch (error) {
      console.log("Error While Deleting Data:", error);
      setSnackbarErrorMessage(error.response?.data?.message || "Error while deleting data.");
      setSnackbarErrorOpen(true);
    }
  };
  

  const formik = useFormik({
    initialValues: {
      tname: '',
      tlocation: ''

    },

    onSubmit: (values, { setSubmitting }) => {
      console.log('Form Submitted!');
      saveApplication(values);
      setSubmitting(false);
    }
  });

  const saveApplication = async (values) => {
    try {

      const data = {
        theaterName: formik.values.tname,
        theaterLocation: formik.values.tlocation,
      }

      const response = await axios.post(`${Utils.BaseURL3}/addtheater`, data);
      console.log("Theater Data:", response.data);

      if (response.status === 200) {
        setSnackbarSuccessMessage(response.data.message);
        setSnackbarSuccessOpen(true);
        fetchtheatre();

      } else {
        setSnackbarErrorMessage(response.data.message);
        setSnackbarErrorOpen(true);

      }




    } catch (error) {
      console.log("Error while Saving Data");
      setSnackbarErrorMessage(error.response.data.message);
      setSnackbarErrorOpen(true);

    }
  }




  return (
    <div className="AdminMainContent">
      <div className='AdminMainTheater'>
        <div className='AdminTable1'>
          <div className='AdminTheaterHeading'>
            Theatres
          </div>
          <div className='Table'>
            <table>
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>Theater Name</th>
                  <th>Theater Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {gettheatreData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.theaterName}</td>
                    <td>{item.theaterLocation}</td>
                    <td>
                      <FontAwesomeIcon
                        onClick={() => handledeleteTheatre(item._id)}
                        icon={faTrash}
                        style={{ color: "#c20505", cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                ))}


              </tbody>
            </table>
          </div>
        </div>

        <div className='TableForm'>
          <div className='TableFormHeading'>Add New Theatre</div>
          <form onSubmit={formik.handleSubmit}>
            <div className='theaterform'>

              <div className='inputform'>

                <label htmlFor='tname'>Theatre Name : </label>
                <input type='text'
                  id='tname'
                  name='tname'
                  value={formik.values.tname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Enter Theatre Name'
                />
              </div>

              <div className='inputform'>
                <label htmlFor='tname'>Theatre Location : </label>
                <input type='text'
                  id='tlocation'
                  name='tlocation'
                  value={formik.values.tlocation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Enter Theatre Location'
                />
              </div>

            </div>
            <button className='theaterbtn' type='submit'>Save Theatre</button>
          </form>
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
        </div>
      </div>
    </div>

  )
}

export default AdminTheater
