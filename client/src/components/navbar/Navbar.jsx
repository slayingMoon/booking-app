import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="nav-container">
                <Link to="/" className="logo-link">
                    <span className="logo">Booking.com</span>
                </Link>
                <div className="nav-items">
                    <button className="nav-button">Register</button>
                    <button className="nav-button">Login</button>
                </div>
            </div>
        </div>
    );
}