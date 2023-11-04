import { 
  BrowserRouter as Router, 
  Routes, 
  Route,
  useNavigate
} from "react-router-dom";
import React from 'react';

import Landing from './pages/landing.page.jsx';
import Signup from './pages/signup.page.jsx';
import ForgotPassword from './pages/forgotPass.page.jsx';
import ResetPassword from './pages/resetPass.page.jsx';
import WelcomePage from "./pages/welcomeUser.page.jsx";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={ <Landing navigate={useNavigate}/> }/>
          <Route path="/signup" element={ <Signup navigate={useNavigate}/> }/>
          <Route path="/forgot-password" element={ <ForgotPassword navigate={useNavigate}/> }/>
          <Route path="/reset-password" element={ <ResetPassword navigate={useNavigate}/> }/>
          <Route path="/welcomepage" element={ <WelcomePage navigate={useNavigate}/> }/>
        </Routes>
    </Router>
  );
}


export default App;