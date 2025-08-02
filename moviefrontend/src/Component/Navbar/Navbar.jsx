import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
import Utils from '../../common/UtilsPart/Utils';
import axios from 'axios';
import ConfirmationModel from '../../common/Models/ConfirmationModel';
import { useNavigate } from 'react-router-dom'; 




const Navbar = () => {
  const selectedEmail = sessionStorage.getItem('Email');
  const selectedName = sessionStorage.getItem('Name');
  const [model, setModel] = useState(false);
  const navigate = useNavigate();

  const handlelogout = async () => {
    try{

      const response = await axios.post(`${Utils.BaseURL}/logout`);
      console.log("Logout Data:",response.data);
      sessionStorage.clear();
      navigate('/');
      window.location.reload();

    }catch(error){
      console.log("Error While logging out!!");
    }
  }

  return (
    <div>
      <header>
        <div className="navbaar">
          <div id="div1">
            <Link to = "/" className="navbaar-a">Bookit</Link>
            </div>
          <Link to="/" className='nav-a' id='Home-a'>Home</Link>
          <Link to="/movie" className='nav-a'>All Movies</Link>
          <Link to="/contect" className='nav-a'>Contact</Link>

          {selectedEmail ? (
            <>
            <Link to="/logout" className='nav-a' onClick={() => setModel(true)}>LogOut</Link>
            <Link to="#" className='nav-a'>Welcome! {selectedName}</Link>

            </>
          ):(
            <>
            <Link to="/login" className='nav-a'>Login</Link>
            <Link to="/register" className='nav-a'>Register</Link>
            </>
          )}
        </div>

      </header>
      {model && (
        <ConfirmationModel
          message="Confirm Logout"
          description="Are you sure you want to log out?"
          onConfirm={handlelogout}
          onCancel={() => setModel(false)}
        />
      )}
    </div>
  )
}

export default Navbar

//http://localhost:5173/register