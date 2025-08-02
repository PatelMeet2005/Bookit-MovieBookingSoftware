import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from './Component/Navbar/Navbar';
import Footer from './Component/Footer/Footer';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import Contact from './Component/Contact/Contact';
import Movies from './Component/Movies/MovieList';
import AdminDashboard from './Component/Admin/AdminDashboard/AdminDashboard';
import AdminNavbar from './Component/Admin/AdminNavbar/AdminNavbar';
import AdminTheater from './Component/Admin/AdminTheater/AdminTheater';
import AdminShow from './Component/Admin/AdminShow/AdminShow';
import AdminMovie from './Component/Admin/AdminMovies/AdminMovie';
import AdminCustomer from './Component/Admin/AdminCustomer/AdminCustomer';
import AdminBooking from './Component/Admin/AdminBooking/AdminBooking';
import AdminEnquiry from './Component/Admin/AdminEnquiry/AdminEnquiry';
import AdminMovieList from './Component/Admin/AdminMovieList/AdminMovieList';
import MovieReview from './Component/Movies/MovieReview';
import BookMovies from './Component/Movies/BookMovies';
import PrePayment from './Component/Payment/PrePayment';
import Home from './Component/Home/Home';




const App = () => {

  const selectedRole = sessionStorage.getItem('Role');

  return (
    <div>
    {selectedRole === "Admin" ? (
      <>
      <AdminNavbar/>
      <Routes>
        <Route path='/admindashboard' element={<AdminDashboard/>}/>
        <Route path='/admintheater' element={<AdminTheater/>}/>
        <Route path='/adminshow' element={<AdminShow/>}/>
        <Route path='adminmovie' element={<AdminMovie/>}/>
        <Route path='/admincustomer' element={<AdminCustomer/>}/>
        <Route path='adminbooking' element={<AdminBooking/>}/>
        <Route path='/adminenquiry' element={<AdminEnquiry/>}/>
        <Route path='/adminmovielist' element={<AdminMovieList/>}/>
        
        
      </Routes>

      </>

    ):(
      <>
      <Navbar />
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/login' element = {<Login />} />
        <Route path = '/register' element = {<Register />} />
        <Route path = '/contect' element = {<Contact />} />
        <Route path = '/movie' element = {<Movies />} />
        <Route path='/movie/moviereview' element={<MovieReview/>}/>
        <Route path = "/movie/bookmovies" element = {<BookMovies/>}/>
        <Route path='/movie/payment' element = {<PrePayment/>}/>

      </Routes>
      <Footer />
      </>

    )}
      

    </div>
  )
}

export default App
