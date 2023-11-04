import React from "react";
import { useNavigate } from "react-router-dom";

import '../res/css/bootstrap.min.css';
import '../res/css/materialdesignicons.min.css';
import '../res/css/style.min.css';
import home from '../res/images/home.png';
import home1 from '../res/images/home-1.png';
import home2 from '../res/images/home-2.png';

export default function WelcomePage() {
    const [username, setUsername] = React.useState(' ');

    const navigate = useNavigate();

    async function getName() {
        const response = await fetch('http://localhost:2003/user/get-details', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (response.status === 200) {
            const data = await response.json();
            setUsername(data.name)
        } 

    }

    async function logout() {
        const response = await fetch('http://localhost:2003/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (response.status === 200) {
            navigate('/');
        }
    }

    React.useState(() => {
        getName();
      }, []);

    return (
        <div data-bs-spy="scroll" data-bs-target="#" data-bs-offset="71">            

        <div className="overflow-hidden-x">
            <section className="section home home-6" id="home">
            <div className="bg-overlay"></div>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7">
                            <div className="home-heading">
                                <h1 className="mb-3 text-black">Welcome Aboard ! <br></br> <span className="text-warning">{username}</span></h1>
                            </div>
                                <p className="fs-20">We're dedicated to excellence and your satisfaction. Explore our offerings and experience the difference.</p>
                                <div className="home-btn hstack gap-2 flex-column d-sm-block">
                                    <p className="btn btn-primary me-1" onClick={logout}>Logout</p>
                                </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="mt-5 mt-lg-0" data-aos="fade-down" data-aos-duration="1800">
                                <img src={home} className="img-fluid" alt=""/>
                                <img className="img-fluid d-none d-lg-block book" src={home1} alt=""/>
                                <img className="img-fluid d-none d-lg-block drive" src={home2} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    );
}

