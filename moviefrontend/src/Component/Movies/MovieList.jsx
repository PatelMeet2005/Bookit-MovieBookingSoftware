import React, { useEffect, useState } from 'react'
import './MovieList.css'
import { Link } from 'react-router-dom';
import Jurrasic from '../../assets/Images/j1.webp'
import Stuart from '../../assets/Images/sl.jpg'
import Iron from '../../assets/Images/im.webp'
import Terminator from '../../assets/Images/tm.jpg'
import Utils from '../../common/UtilsPart/Utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const MovielList = () => {
  const [storeMovie, setStoreMovie] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getMovieData = async () => {
      try{

        const response = await axios.get(`${Utils.BaseURL5}/getmoviedata`);
        console.log("Data Movie",response.data.data);
        setStoreMovie(response.data.data);

      }catch(error){
        console.log("Error While Getting the Data");
        
      }
    }
    getMovieData();

  },[]);

  const handleview = async (item) => {
    navigate("/movie/moviereview",{
      state : {
        movieContent : item
      }
    });
  }


  return (
    <div>
      <div className="pathMR">
        <Link to="/" className="linkCR">Home</Link>
        &nbsp; ||  &nbsp;All Movies
      </div>

      <div className="movieboxR">
        {storeMovie.length > 0 ? (
          storeMovie.map((item, index) => (
            <div className="Mbox1R" key={index}>
              <div className="img1">
                <img id="i1" src={item.photo} alt={item.movieName} />
              </div>
              <div className="name1">{item.movieName}</div>
              <div className="detail1">
                <button onClick={()=>handleview(item)}>View Details</button>
              </div>
            </div>
          ))
        ) : (
          <p className="noData">No movies available</p>
        )}
      </div>
    </div>
  )
}

export default MovielList