import React from "react";
import { useNavigate } from "react-router-dom";

import '../res/css/bootstrap.min.css';
import '../res/css/materialdesignicons.min.css';
import '../res/css/style.min.css';
import bg from '../res/images/bg.jpg';

export default function Signup() {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    const navigate = useNavigate();


    async function handleChange(event) {
        if (event.target.id === "username") {
            setUsername(event.target.value);
        } else if (event.target.id === "email") {
            setEmail(event.target.value);
        } else if (event.target.id === "password") {
            setPassword(event.target.value);
        }
    }

    async function submit(event) {
        event.preventDefault();
        await fetch('http://localhost:2003/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: username,
                email: email,
                password: password
            }),
            credentials: 'include'
        });
        
    }

    async function signin() {
        navigate('/');
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
                             <p className="text-white-50 mb-0 fs-14">Sign up For a New Account.</p>
                             </div>
                         </div>
                         <div className="card-body position-relative">
                            <div className="p-4 mt-n5 bg-white card rounded pb-0">
                                <form onSubmit={submit}>
                                    <div className="mb-3">
                                        <label className="fs-14 mb-2" htmlFor="username">User Name</label>
                                        <input type="text" className="form-control" id="username" placeholder="User Name" onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="fs-14 mb-2" htmlFor="email">Email</label>
                                        <input type="text" className="form-control" id="email" placeholder="Enter Email" onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="fs-14 mb-2" htmlFor="password">Password</label>
                                        <input type="password" className="form-control" id="password" placeholder="Enter Password" onChange={handleChange}/>
                                    </div>
                                    <div className="mt-4">
                                        <button className="btn btn-primary w-100" type="submit">Sign up</button>
                                    </div>
                                </form>
                            </div>
                         </div>   
                     </div>
                     <div className="mt-5 text-center text-white-50" style={{display: "flex", justifyContent: "center"}}> 
                            <p>Have account already ? </p> &nbsp;&nbsp;
                            <p className="fw-bold text-black button" onClick={ signin }> Sign in</p>
                        </div>
                    </div>
                 </div>
            </div>
        </div>

    </div>
    );
}

