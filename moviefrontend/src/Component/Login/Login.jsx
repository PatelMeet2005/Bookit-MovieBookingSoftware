import React, { useState } from 'react'
import './Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Utils from '../../common/UtilsPart/Utils';
import { useFormik } from 'formik';

const Login = () => {
  const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState(false);
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
  const [snackbarsuccessMessage, setSnackbarSuccessMessage] = useState('');
  const [snackbarerrorMessage, setSnackbarErrorMessage] = useState('');
  const navigate = useNavigate();

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

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: (values, { setSubmitting }) => {
      console.log("Login Form Submitted!!");
      saveApplication(values);
      setSubmitting(false);
    }
  });

  const saveApplication = async () => {
    try {

      const data = {
        email: formik.values.email,
        password: formik.values.password
      }

      const response = await axios.post(`${Utils.BaseURL}/login`, data);
      console.log("Login Data:", response.data);
      sessionStorage.setItem('Name',response.data.name);
      sessionStorage.setItem('Email',formik.values.email);
      sessionStorage.setItem('Mobile',response.data.mobile);
      sessionStorage.setItem("Role",response.data.role);

      if (response.status === 200) {
        setTimeout(() => {
          if(response.data.role === 'Admin'){
            navigate("/admindashboard");
            // email:mamta@gmail.com
            // password : m@123
          }else{
            navigate("/");
          }

          window.location.reload();
        },500);
      } else {
        console.log("Error!!");
        setSnackbarErrorMessage("Error");
        setSnackbarErrorOpen(true);
      }
    } catch (error) {
      console.log("Error While Saving Data");
      setSnackbarErrorMessage(error.response.data.message);
      setSnackbarErrorOpen(true);
    }
  }

  return (
    <div>

      <div className="pathL">
        <Link to='/' className="linkL">Home</Link>
        &nbsp; ||  &nbsp;Login
      </div>

      <div className="greetL">
        <div id="line1L">Login With Us</div>
        <div id="line2L">WELCOME TO BOOK MY SHOW</div>
      </div>

      <div className="fromL">
        <form onSubmit={formik.handleSubmit}>
          <div className="buttonL">
            <input type="text"
              name='email'
              id='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your email" />
            <br />

            <input type="password"
              name='password'
              id='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your password" />
            <br />

            <button id="loginL" name='loginL' type="submit">Login</button>
          </div>
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
  )
}

export default Login
