import React from "react";
import { useNavigate } from "react-router-dom";

import '../res/css/bootstrap.min.css';
import '../res/css/materialdesignicons.min.css';
import '../res/css/style.min.css';
import bg from '../res/images/bg.jpg';

export default function ForgotPassword() {
    const [email, setEmail] = React.useState('');

    const navigate = useNavigate();

    async function handleChange(event) {
        setEmail(event.target.value);
    }

    async function submit(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:2003/user/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            }),
            credentials: 'include'
        });
        if (response.status === 429) {
            alert("OTP already sent");
        } else if (response.status === 404) {
            alert("Email not found");
        }

        navigate('/reset-password');
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
                                 <h5 className="text-white">Forgot your password ?</h5>
                             <p className="text-white-50 mb-0 fs-14" style={{ textAlign: "left", paddingLeft: "15px" }}>Tell us your email address, and we will get you back on track in no time.</p>
                             </div>
                         </div>
                         <div className="card-body position-relative">
                            <div className="p-4 mt-n5 bg-white card rounded pb-0">
                                <form onSubmit={submit}>
                                    <div className="mb-3">
                                        <label className="fs-14 mb-2" htmlFor="email">Email</label>
                                        <input type="text" className="form-control" id="email" placeholder="Enter Email" onChange={handleChange}/>
                                    </div>
                                    <div className="mt-4">
                                        <button className="btn btn-primary w-100" type="submit">Send OTP</button>
                                    </div>
                                </form>
                            </div>
                         </div>   
                     </div>

                    </div>
                 </div>
            </div>
        </div>

    </div>
    );
}

