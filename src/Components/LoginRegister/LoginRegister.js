import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { pink } from '@mui/material/colors';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';
import './LoginRegister.css';

const LoginRegister = () => {
    const { handleEmailChange, handlePasswordChange, error, toggleLogin, isLogin, handleNameChange, createUserWithEmailAndPassword, signInWithEmailAndPassword, password, setError, email, auth, setUser, verifyEmail, setUserName } = useAuth();

    const navigate = useNavigate();
    const navigateRoute = () => {
        navigate('/');
    }

    const handleRegistration = e => {
        e.preventDefault();

        if (password.length < 6) {
            setError('Password Must be at least 6 characters long.')
            return;
        }
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError('Password Must contain 2 upper case letter');
            return;
        }

        if (isLogin) {
            processLogin(email, password);
            Swal.fire({
                position: 'middle',
                icon: 'success',
                title: 'Login Success',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/');
        }
        else {
            registerNewUser(email, password);
            Swal.fire({
                position: 'middle',
                icon: 'success',
                title: 'You Have Been Registered',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/');
        }

    }

    const processLogin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                setUser(user);
                setError('');
            })
            .catch(error => {
                setError(error.message);
            })

    }

    const registerNewUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                setUser(user);
                setError('');
                verifyEmail();
                setUserName();
            })
            .catch(error => {
                setError(error.message);
            })

    }

    return (
        <div className="container text-center mt-5 mb-3">
            <form className="form-design shadow-2xl" onSubmit={handleRegistration}>
                <h3 className="text-design4 fw-bolder mt-5 mb-5">Please {isLogin ? 'Login' : 'Register'}</h3>
                {!isLogin && <div className="row mb-3">
                    <label htmlFor="inputName" className="col-sm-2 col-form-label text-left">Name:</label>
                    <div className="col-sm-10">
                        <input type="text" onBlur={handleNameChange} className="form-control" id="inputName" required />
                    </div>
                </div>}
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label text-left">Email:</label>
                    <div className="col-sm-10">
                        <input onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3" required />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label text-left">Password:</label>
                    <div className="col-sm-10">
                        <input type="password" onBlur={handlePasswordChange} className="form-control" id="inputPassword3" required />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-10 offset-sm-2">
                        <div className="form-check text-left">
                            <FormGroup>
                                <FormControlLabel control={<Checkbox onChange={toggleLogin} sx={{
                                    color: pink[800],
                                    '&.Mui-checked': {
                                        color: pink[600],
                                    },
                                }} />} label="Already Registered ?" />
                            </FormGroup>
                        </div>
                    </div>
                </div>
                <div className="row mb-3 text-danger">{error}</div>
                <Button type="submit" className="btn btn-success mx-2">
                    {isLogin ? 'Login' : 'Register'}
                </Button>
            </form>
            <Button sx={{ backgroundColor: '#61dafb !important', color: 'black !important', fontWeight: 'bold', fontSize: '20px', marginLeft: '20px', marginTop: '20px' }} variant='contained' onClick={navigateRoute}>See ToDo List</Button>
        </div>
    );
};

export default LoginRegister;