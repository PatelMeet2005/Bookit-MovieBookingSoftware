import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Utils from '../../common/UtilsPart/Utils'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = () => {
    const [movieInfromation, setMovieInfromation] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`${Utils.BaseURL5}/getmoviedata`);
                console.log(response.data.data);
                setMovieInfromation(response.data.data);
            }
            catch (error) {
                console.log(error);
            }
                
        }
        fetchdata();
    }, [])

    // Auto-slide functionality
    useEffect(() => {
        if (movieInfromation.length > 0) {
            const slideInterval = setInterval(() => {
                setCurrentSlide((prev) => {
                    const maxSlides = Math.ceil(movieInfromation.length / 3);
                    return (prev + 1) % maxSlides;
                });
            }, 4000); // Change slide every 4 seconds

            return () => clearInterval(slideInterval);
        }
    }, [movieInfromation.length]);

    const nextSlide = () => {
        const maxSlides = Math.ceil(movieInfromation.length / 3);
        setCurrentSlide((prev) => (prev + 1) % maxSlides);
    };

    const prevSlide = () => {
        const maxSlides = Math.ceil(movieInfromation.length / 3);
        setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
    };

    const goToMovies = () => {
        navigate('/movie');
    };

    // Get movies for current slide (3 movies per slide)
    const getCurrentSlideMovies = () => {
        const startIndex = currentSlide * 3;
        return movieInfromation.slice(startIndex, startIndex + 3);
    };

    const maxSlides = Math.ceil(movieInfromation.length / 3);
  return (
    <div className="home-container">
      <div className="pathMR">
        <a href="/" className="linkCR">Home</a>
      </div>
      
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to BookIt Cinema</h1>
          <p className="hero-subtitle">Book your favorite movies and enjoy the best cinema experience</p>
          <button className="hero-btn" onClick={() => navigate('/movie')}>Book Now</button>
        </div>
      </div>

      {/* Movie Stats */}
      <div className="stats-section">
        <div className="stat-item">
          <h3>{movieInfromation.length}</h3>
          <p>Movies Available</p>
        </div>
        <div className="stat-item">
          <h3>50+</h3>
          <p>Shows Daily</p>
        </div>
        <div className="stat-item">
          <h3>10k+</h3>
          <p>Happy Customers</p>
        </div>
      </div>

      <h2 className="home-title">Featured Movies</h2>
      
      {/* Movie Slider */}
      <div className="movie-slider-container">
        {movieInfromation.length > 0 && (
          <div className="movie-slider">
            <button className="slider-btn prev-btn" onClick={prevSlide}>
              &#8249;
            </button>
            
            <div className="slider-content">
              <div className="movie-slide-group">
                {getCurrentSlideMovies().map((movie, index) => (
                  <div key={index} className="movie-slide-card">
                    <img 
                      src={movie.photo} 
                      alt={movie.movieName} 
                      className="slider-banner" 
                    />
                    <div className="slide-info">
                      <h3 className="slide-movie-name">{movie.movieName}</h3>
                      <p className="slide-detail">
                        <strong>Release:</strong> {movie.releaseDate}
                      </p>
                      <p className="slide-detail">
                        <strong>Director:</strong> {movie.director}
                      </p>
                      <p className="slide-detail">
                        <strong>Cast:</strong> {movie.actors}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="slider-btn next-btn" onClick={nextSlide}>
              &#8250;
            </button>
          </div>
        )}
        
        {/* Slider Indicators */}
        <div className="slider-indicators">
          {Array.from({ length: maxSlides }).map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            >
              <span className="indicator-number">{index + 1}</span>
            </button>
          ))}
        </div>
      </div>

      {/* View All Movies Button */}
      <div className="view-all-section">
        <button className="view-all-btn" onClick={goToMovies}>
          View All Movies
        </button>
      </div>

      {/* Quick Features */}
      <div className="features-section">
        <h2>Why Choose BookIt?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Easy Booking</h3>
            <p>Book tickets in just a few clicks</p>
          </div>
          <div className="feature-card">
            <h3>Best Seats</h3>
            <p>Choose from premium seat options</p>
          </div>
          <div className="feature-card">
            <h3>Secure Payment</h3>
            <p>Safe and secure payment methods</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home