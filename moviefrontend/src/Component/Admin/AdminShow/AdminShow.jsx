import React, { useEffect, useState} from 'react'
import './AdminShow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Utils from '../../../common/UtilsPart/Utils';

const AdminShow = () => {
  const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState(false);
    const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
    const [snackbarsuccessMessage, setSnackbarSuccessMessage] = useState('');
    const [snackbarerrorMessage, setSnackbarErrorMessage] = useState('');
    const [showData, setShowData] = useState([]);

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

    const getShow = async () => {
      try{

        const response = await axios.get(`${Utils.BaseURL4}/getshow`);
        console.log("Show Data:",response.data.data);
        setShowData(response.data.data);


      }catch(error){
        console.log("Error!");
        
      }
    }

    useEffect(() => {
      getShow();

    },[]);

    const handleDeleteShow = async (id) => {
      try{

        const response = await axios.delete(`${Utils.BaseURL4}/deleteshow`,{
          data : {id},
        });

        console.log("Delete Query:",response.data);

        if(response.status === 200){
          setSnackbarSuccessMessage(response.data.message);
          setSnackbarSuccessOpen(true);
          getShow();
        }else{
          setSnackbarErrorMessage(response.data.message);
          setSnackbarErrorOpen(true);
        }

      }catch(error){
        setSnackbarErrorMessage(error.response.data.message);
          setSnackbarErrorOpen(true);

      }
    }

  const formik = useFormik ({
    initialValues:{
      showName : '',
      showTime : '',
      endTime : ''

    },

    onSubmit : (values, {setSubmitting}) => {
      console.log('Form submitted!');
      saveApplication(values);
      setSubmitting(false);
    }
  });

  const saveApplication = async (values) => {
    try{

      const data = {
        showName : formik.values.showName,
        showStartTime : formik.values.showTime,
        showEndTime : formik.values.endTime
      }

      const response = await axios.post(`${Utils.BaseURL4}/addshow`,data);
      console.log("Show Data:",response.data);

      if(response.status === 200){
        setSnackbarSuccessMessage(response.data.message);
        setSnackbarSuccessOpen(true);
        getShow();
        formik.resetForm();
      }else{
        setSnackbarErrorMessage(response.data.message);
        setSnackbarErrorOpen(true);
      }
    }catch(error){
      setSnackbarErrorMessage(error.response.data.message);
      setSnackbarErrorOpen(true);


    }
  }


  return (
   <div className="AdminMainContent">
        <div className='AdminMainTheater'>
          <div className='AdminTable1'>
            <div className='AdminTheaterHeading'>
              Shows
            </div>
            <div className='Table'>
              <table>
                <thead>
                  <tr>
                    <th>Sr No.</th>
                    <th>Show Name</th>
                    <th>Show Time</th>
                    <th>End Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {showData.map((item,index) => (
                    <tr key={index} >
                      <td>{index + 1}</td>
                      <td>{item.showName}</td>
                      <td>{item.showStartTime}</td>
                      <td>{item.showEndTime}</td>
                      <td>
                        <FontAwesomeIcon
                          onClick={()=>handleDeleteShow(item._id)}
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
            <div className='TableFormHeading'>Add Show</div>
            <form onSubmit={formik.handleSubmit}>
              <div className='theaterform'>
  
                <div className='inputform'>
  
                  <label htmlFor='tname'>Show Name : </label>
                  <input type='text'
                    id='showName'
                    name='showName'
                    value={formik.values.showName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder='Enter Show Name'
                  />
                </div>
  
                <div className='inputform'>
                  <label htmlFor='tname'>Show Time : </label>
                  <input type='time'
                    id='showTime'
                    name='showTime'
                    value={formik.values.showTime}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                   
                  />
                </div>

                <div className='inputform'>
                  <label htmlFor='tname'>End Time : </label>
                  <input type='time'
                    id='endTime'
                    name='endTime'
                    value={formik.values.endTime}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                   
                  />
                </div>
  
              </div>
              <button className='theaterbtn' type='submit'>Register Show</button>
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




export default AdminShow
