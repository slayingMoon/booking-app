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

    const [response, setResponse] = useState({});
    const navigate = useNavigate();

    const { loading, error, dispatch } = useContext(AuthContext);

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
            if(!credentials.username || !credentials.email || !credentials.password) {
                throw Error('All fields required');
            }
            
            const res = await axios.post('/auth/register', credentials);
            dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
            setResponse(res);
            setTimeout(process, 2000);
            function process() {
                setResponse('');
                navigate('/');
            }
        }catch(err) {
            if(!err.response) {
                err.response = {
                    data: {
                        message: err.message
                    }
                };
            }
            console.log(err);
            dispatch({type: "REGISTER_FAILURE", payload: err.response.data});
        }
    }

    const isUserCreated = response.data === 'User has been created.';
    // const errorMessage = error?.status === 500 ? error.message = 'All fields are required' : error?.message;

    console.log(error);

    return (
        <>
            <Navbar />
            <div className="register">
                <div className="r-container">
                    <h1 className="r-header">Register</h1>
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
                    {error && <div className="error">{error.message}</div>}
                </div>
            </div>
            {response.data && isUserCreated && (
                <div id="snackbar" className={isUserCreated ? 'show' : ''}>{response.data}</div>
            )}
        </>
    );
};

export default Register;