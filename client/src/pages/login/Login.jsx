import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { AuthContext } from '../../context/AuthContext';
import './Login.css';

const Login = ({type}) => {
    const [ credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        console.log(e.target.id);
        setCredentials(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({type: "LOGIN_START"});
        try {
            const res = await axios.post('/auth/login', credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            navigate('/');
        }catch(err) {
            dispatch({type: "LOGIN_FAILURE", payload: err.response.data});
        }
    }

    return (
        <>
            <Navbar />
            <div className="login">
                <div className="l-container">
                    <input 
                        type="text" 
                        placeholder="username" 
                        id="username" 
                        onChange={handleChange} 
                        className="l-input" 
                    />
                    <input 
                        type="password" 
                        placeholder="password" 
                        id="password" 
                        onChange={handleChange} 
                        className="l-input" 
                    />
                    <button disabled={loading} onClick={handleClick} className="l-button">Login</button>
                    {error && <span>{error.message}</span>}
                </div>
            </div>
        </>
    );
};

export default Login;