import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/Login', { email, password })
      .then(res => {
        if (res.data.Status === "Success") {
          if (res.data.role === "admin") {
            navigate('/AdminDashboard');
          } else {
            navigate('/Home');
          }
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2> LOGIN </h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Email:</label>
          <input type='text' name='email' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} required autoComplete='off' />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Password:</label>
          <input type='password' name='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type='submit' className='submit-btn'>Login</button>
      </form>
      <p>Don't Have an Account</p>
      <Link to="/SignUp">Register</Link>
      <p>Are You A Consultant</p>
      <Link to="/ConsultantLogin">Login As A Consultant</Link>
    </div>
  );
}
