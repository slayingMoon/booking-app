import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
    const {user,dispatch} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
        dispatch({type: "LOGOUT"});
    };

    return (
        <div className="navbar">
            <div className="nav-container">
                <Link to="/" className="logo-link">
                    <span className="logo">Booking-app</span>
                </Link>
                {user 
                ? <div className="user-items">
                    <div>Hello, {user.username}</div>
                    <button onClick={handleLogout} className="nav-button">Logout</button>
                </div>
                : <div className="nav-items">
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