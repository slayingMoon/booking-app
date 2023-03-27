import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
    const {user} = useContext(AuthContext);

    return (
        <div className="navbar">
            <div className="nav-container">
                <Link to="/" className="logo-link">
                    <span className="logo">Booking-app</span>
                </Link>
                {user ? `Hello, ${user.username}` : <div className="nav-items">
                    <Link to="/register">
                        <button className="nav-button">Register</button>
                    </Link>
                    <Link to="/login">
                        <button className="nav-button">Login</button>
                    </Link>
                </div>}
            </div>
        </div>
    );
}