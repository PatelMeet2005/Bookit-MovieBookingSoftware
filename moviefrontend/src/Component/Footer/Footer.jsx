import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css';
import FooterImage from '../../assets/Images/book-ticketsfigma.png';



const Footer = () => {
    return (
        <div>
            <footer>
                <div className="contectus">
                    <div className="bottom1">
                        <div className="logo">
                            <img src={FooterImage} alt="booking" />
                            <p>Bookit</p>
                        </div>
                        <div className="quick">
                            <p id="l2">Quick links</p><br />
                            <Link to="/" id="l1">Home</Link><br /><br />
                            <Link to="/movie" id="l1">Movies</Link><br /><br />
                            <Link to="./Contect" id="l1">Contact</Link><br /><br />
                            <Link to="./Login" id="l1">Login</Link><br /><br />
                        </div>
                        <div className="information">
                            <p id="l2">Information</p><br />
                            <p id="l2">🍿 Premium movie experience</p><br />
                            <p id="l2">🎬 Book tickets online easily</p><br />
                            <p id="l2">📧 Email: info@bookit.com</p><br />
                            <p id="l2">📞 Phone: +1 (555) 123-4567</p><br />
                            <p id="l2">"Your gateway to cinematic adventures"</p><br />
                        </div>
                    </div>
                    <div className="bottom">
                        <p>c booking.com 2025</p>
                    </div>
                </div>
            </footer>


        </div>
    )
}

export default Footer
