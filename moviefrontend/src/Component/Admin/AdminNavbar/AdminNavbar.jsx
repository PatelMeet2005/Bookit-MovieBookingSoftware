import React from 'react';
import './AdminNavbar.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Utils from '../../../common/UtilsPart/Utils';
import movieIcon from '../../../assets/Images/movie_icon.png';
import movieIcon1 from '../../../assets/Images/movielist.png'
import movieIcon2 from '../../../assets/Images/cinema.png'
import movieIcon3 from '../../../assets/Images/show.png'
import movieIcon4 from '../../../assets/Images/customer.png'
import movieIcon5 from '../../../assets/Images/booking.png'
import movieIcon6 from '../../../assets/Images/enquiry.png'
import movieIcon7 from '../../../assets/Images/logout.png'
import{ useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ConfirmationModel from '../../../common/Models/ConfirmationModel';

const AdminNavbar = () => {
  const navigate = useNavigate();
    const [model, setModel] = useState(false);
  

  const handlelogout = async () => {
    try{

      const response = await axios.post(`${Utils.BaseURL}/logout`);
      console.log("Logout Data:",response.data);
      sessionStorage.clear();
      navigate('/');
      window.location.reload();


    }catch(error){
      console.log("Error While Saving this data");
    }
  }


  return (
    <>
      <div className='AdminContainer'>
        <div className='AdminContain'>
          <p>Welcome! Administrator</p>
        </div>
      </div>
      <div className='AdminSidebar'>
        <Link to="/admindashboard" style={{ textDecoration: 'none' }}> 
        <p className='AdminDashboardTitle'>Admin Dashboard</p></Link>
        <div className='AdminNavLink'>
          <ul className='AdminMenu'>
          <Link to='/adminmovie'>
              <li>
                <img src={movieIcon} alt="Movies" className="menu-icon" /> Movies
              </li>
            </Link>
          
            <Link to='/adminmovielist'><li><img src={movieIcon1} alt="Movies" className="menu-icon" />Movie List</li></Link>
            <Link to='/admintheater'><li><img src={movieIcon2} alt="Movies" className="menu-icon" />Theaters</li></Link>
            <Link to='/adminshow'><li><img src={movieIcon3} alt="Movies" className="menu-icon" />Shows</li></Link>
            <Link to='/admincustomer'><li><img src={movieIcon4} alt="Movies" className="menu-icon" />Customers</li></Link>
            <Link to='/adminbooking'><li><img src={movieIcon5} alt="Movies" className="menu-icon" />Bookings</li></Link>
            <Link to='/adminenquiry'><li><img src={movieIcon6} alt="Movies" className="menu-icon" />Enquiry</li></Link>
            <Link to='/adminlogout' onClick={() => setModel(true)}><li><img src={movieIcon7} alt="Movies" className="menu-icon" /> Logout</li></Link>
          </ul>

          {model && (
        <ConfirmationModel
          message="Confirm Logout"
          description="Are you sure you want to log out?"
          onConfirm={handlelogout}
          onCancel={() => setModel(false)}
        />
      )}
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
