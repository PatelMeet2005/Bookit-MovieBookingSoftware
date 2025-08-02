import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import './Contact.css'
import MailImage from '../../assets/Images/mail.png'
import PhoneImage from '../../assets/Images/phone.png'
import AddressImage from '../../assets/Images/address.png'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Utils from '../../common/UtilsPart/Utils';



const Contact = () => {
    const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState(false);
    const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
    const [snackbarsuccessMessage, setSnackbarSuccessMessage] = useState('');
    const [snackbarerrorMessage, setSnackbarErrorMessage] = useState('');
    const selectedEmail = sessionStorage.getItem('Email');
    const selectedName = sessionStorage.getItem('Name');
    const selectedNumber = sessionStorage.getItem('Mobile');


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
            name: selectedName || '',
            subject: '',
            email: selectedEmail || '',
            phone: selectedNumber || '',
            query: '',

        },

        onSubmit: (values, { setsubmitting }) => {
            console.log("Form Submitted:");
            saveApplication(values);
            setsubmitting(false);
        }
    });

    const saveApplication = async (values) => {
        try {

            const data = {
                name: formik.values.name,
                subject: formik.values.subject,
                email: formik.values.email,
                phone: formik.values.phone,
                query: formik.values.query
            }

            const response = await axios.post(`${Utils.BaseURL2}/contact`, data);
            console.log("COntact Data:", response.data);

            if(response.status === 200) {
                setSnackbarSuccessMessage(response.data.message);
                setSnackbarSuccessOpen(true);
                formik.resetForm();
            }else{
                setSnackbarErrorMessage(response.data.message);
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
                <Link to="/" className="linkC">Home</Link>
                &nbsp; ||  &nbsp;Contact
            </div>


            <div className="greetC">
                <div id="line1C">Contact Us</div>
                <div id="line2C">LEAVE A MESSAGE</div>
                <div id="line3C">if you have a question regarding our services, feel free to contect us using from below.</div>
            </div>

            <div className="fromC">
                <form onSubmit={formik.handleSubmit}>
                    <div className="buttonC">
                        <input type="text"
                            id='name'
                            name='name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter your name *"
                        />


                        <input type="text"
                            id='subject'
                            name='subject'
                            value={formik.values.subject}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter subject"
                        />
                        <br />

                        <input type="text"
                            id='email'
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter your email *"
                        />

                        <input type="text"
                            id='phone'
                            name='phone'
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter your Phone Number *"
                        />
                        <br />

                        <textarea id="areaC"
                            name='query'
                            value={formik.values.query}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Type your query here'></textarea>
                        <br />
                        <button id="subR" type="submit" >Submit Message</button>
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

            <div className="contectC">

                <div id="box3C">

                    <img id="img1C" src={AddressImage} alt="phone icon" />

                    <div className="phoneC">
                        <p id="p1C">Address:</p>
                        <div id="p2C">
                            <p>VV Nagar,Anand,Gujrat</p>
                        </div>
                    </div>
                </div>

                <div id="box1C">

                    <img id="img1C" src={PhoneImage} alt="phone icon" />

                    <div className="phoneC">
                        <p id="p1C">Phone:</p>
                        <div id="p2C">
                            <p>9313606769</p>
                        </div>
                    </div>
                </div>

                <div id="box2C">

                    <img id="img1C" src={MailImage} alt="Mail icon" />

                    <div className="phoneC">
                        <p id="p1C">Mail:</p>
                        <div id="p2C">
                            <p>arminpatel@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Contact