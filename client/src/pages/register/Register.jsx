import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { AuthContext } from '../../context/AuthContext';
import './Register.css';

const Register = ({type}) => {
    const [ credentials, setCredentials] = useState({
        username: undefined,
        email: undefined,
        password: undefined,
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({type: "REGISTER_START"});
        try {
            const res = await axios.post('/auth/register', credentials);
            dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
            navigate('/');
        }catch(err) {
            dispatch({type: "REGISTER_FAILURE", payload: err.response.data});
        }
    }

    return (
        <>
            <Navbar />
            <div className="register">
                <div className="r-container">
                    <input 
                        type="text" 
                        placeholder="username" 
                        id="username" 
                        onChange={handleChange} 
                        className="r-input" 
                    />
                    <input 
                        type="email" 
                        placeholder="email" 
                        id="email" 
                        onChange={handleChange} 
                        className="r-input" 
                    />
                    <input 
                        type="password" 
                        placeholder="password" 
                        id="password" 
                        onChange={handleChange} 
                        className="r-input" 
                    />
                    <button disabled={loading} onClick={handleClick} className="r-button">Register</button>
                    {error && <span>{error.message}</span>}
                </div>
            </div>
        </>
    );
};

export default Register;