import React from "react";
import { useNavigate } from "react-router-dom";

import '../res/css/bootstrap.min.css';
import '../res/css/materialdesignicons.min.css';
import '../res/css/style.min.css';

import bg from '../res/images/bg.jpg';

export default function Landing() {
    const [email, setEmail] = React.useState(' ');
    const [password, setPassword] = React.useState(' ');

    const navigate = useNavigate();

    async function handleChange(event) {
        if (event.target.id === 'email') {
            setEmail(event.target.value);
        } else if (event.target.id === 'userpassword') {
            setPassword(event.target.value);
        }
    }

    const validateEmail = (email) => {
        if(email.indexOf('@') < 1 || email.indexOf('.') < email.indexOf('@') + 1) {
            return false;
        } else {
            return true;
        }
    }

    async function submit(event) {
        if (validateEmail(email)) {
            event.preventDefault();
            const response = await fetch('http://localhost:2003/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                credentials: 'include'
            });
            if (response.status === 200) {
                navigate('/welcomepage');
            } else {
                alert('Invalid email or password');
            }
        } else {
            alert('Invalid email');
        }
    }

    async function signup() {
        navigate('/signup');
    }

    return (
        <div className="vh-100 bg-account-pages" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="p-4">
                        <div className="card overflow-hidden mt-2">
                            <div className="text-center bg-primary position-relative">
                                <div className="position-relative pt-4 py-5 mb-1">
                                    <h5 className="text-white">Welcome!</h5>
                                <p className="text-white-50 mb-0 fs-14">Sign in to Continue...</p>
                                </div>
                            </div>
                            <div className="card-body position-relative">
                                <div className="p-4 mt-n5 bg-white card rounded pb-0">
                                    <form onSubmit={submit}>
                                        <div className="mb-3">
                                            <label className="fs-14 mb-2" htmlFor="email">Email</label>
                                            <input type="text" className="form-control" id="email" placeholder="Enter Email" onChange={handleChange}/>
                                        </div>
                                        <div className="mb-2">
                                            <label className="fs-14 mb-2" htmlFor="userpassword">Password</label>
                                            <input type="password" className="form-control" id="userpassword" placeholder="Enter Password" onChange={handleChange}/>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6"></div>
                                            <div className="col-sm-6">
                                                <div className="text-sm-end">
                                                    <a href="/forgot-password" className="text-muted fs-13"><i className="mdi mdi-lock me-1"></i> Forgot password?</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <button className="btn btn-primary w-100" type="submit">Log in</button>
                                        </div>
                                    </form>
                                </div>
                            </div>   
                        </div>
                        <div className="mt-5 text-center text-white-50" style={{display: "flex", justifyContent: "center"}}> 
                            <p>Don't have an account ? </p> &nbsp;&nbsp;
                            <p className="fw-bold text-black button" onClick={ signup }> Register</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

