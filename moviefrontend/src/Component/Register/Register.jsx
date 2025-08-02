import React, {useState} from 'react'
import './Register.css'
import MailImage from '../../assets/Images/mail.png'
import PhoneImage from '../../assets/Images/phone.png'
import { Link } from 'react-router-dom'
import Utils from '../../common/UtilsPart/Utils';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Register = () => {
    const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState(false);
    const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
    const [snackbarsuccessMessage, setSnackbarSuccessMessage] = useState('');
    const [snackbarerrorMessage, setSnackbarErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSuccessAlert = (event,reason) => {
        if(reason === 'clickaway'){
          return;
        }
        setSnackbarSuccessOpen(false);
      }
    
      const handleErrorAlert = (event,reason) => {
        if(reason === 'clickaway'){
          return;
        }
        setSnackbarErrorOpen(false);
      }

    const Gender = ["Male", "Female", "Others"];

    const formik = useFormik({
        initialValues: {
            name: "",
            gender: "",
            email: "",
            mobile: "",
            createPassword: "",
            confirmPassword: ""
        },

        onSubmit: (values, { setSubmitting }) => {
            console.log("Form Submitted!!");
            saveApplication(values);
            setSubmitting(false);
        }

    });


    const saveApplication = async () => {

        try {

            const data = {
                name: formik.values.name,
                gender: formik.values.gender,
                email: formik.values.email,
                mobile: formik.values.mobile,
                createPassword: formik.values.createPassword,
                confirmPassword: formik.values.confirmPassword,

            }

            const response = await axios.post(`${Utils.BaseURL}/register`, data);
            console.log("response in register:", response.data);

            if(response.status === 200){
                setSnackbarSuccessMessage(response.data.message); 
                setSnackbarSuccessOpen(true);
            
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else {
                console.log("Error While Saving Data");
                setSnackbarErrorMessage("Error While Saving Data"); 
                setSnackbarErrorOpen(true);
            }
            
        } catch (error) {
            console.log("Error!!");
            console.log("Message:", error.response?.data?.message || "Unknown error occurred");
            setSnackbarErrorMessage(error.response?.data?.message || "Error While Saving Data");
            setSnackbarErrorOpen(true);

        }
    }
    return (
        <div>
            <div className="mainR">

                <div className="pathL">
                    <Link to="/" className="linkR">Home</Link>
                    &nbsp; ||  &nbsp;Register
                </div>

                <div className="greetR">
                    <div id="line1R">Register With Us</div>
                    <div id="line2R">ENJOY THE LIFE OF MOVIES</div>
                </div>

                <div className="fromR">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="buttonR">
                            <input type="text"
                                id='name'
                                name='name'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleChange}
                                placeholder="Enter your name"
                            />

                            {/* <input type="text" placeholder="Gender" />
                            <br /> */}

                            <select id="gender" name='gender' value={formik.values.gender}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}>
                                <option value="" disabled>Select Gender</option>
                                {Gender.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                            <br />

                            <input type="text"
                                id='email'
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleChange}
                                placeholder="Enter your email" />

                            <input type="text"
                                id='mobile'
                                name='mobile'
                                value={formik.values.mobile}
                                onChange={formik.handleChange}
                                onBlur={formik.handleChange}
                                placeholder="Enter your mobile no." />
                            <br />

                            <input type="password"
                                id='createPassword'
                                name='createPassword'
                                value={formik.values.createPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleChange}
                                placeholder="Enter your password" />

                            <input type="password"
                                id='confirmPassword'
                                name='confirmPassword'
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleChange}
                                placeholder="Confirm your password" />
                            <br />
                        </div>
                        <button id="subRR" name='subRR' type="submit" >Register</button>
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

                <div className="contectR">
                    <div id="box1R">

                        <img id="img1R" src={PhoneImage} alt="phone icon" />

                        <div className="phoneR">
                            <p id="p1R">Phone:</p>
                            <div id="p2R">
                                <p>9313606769</p>
                                <p>7862056323</p>
                            </div>
                        </div>


                    </div>
                    <div id="box2R">

                        <img id="img1R" src={MailImage} alt="Mail icon" />

                        <div className="phoneR">
                            <p id="p1R">Mail:</p>
                            <div id="p2R">
                                <p>arminpatel@gmail.com</p>
                                <p>movie@ticket.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
