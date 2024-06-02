import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
export default function SignUp() {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    const navigate=useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:4000/register',{name,email,password})
        .then(res =>{
            navigate('/Login')
        }).catch(err => console.log(err))
    }
    return (
      <div>
          <h2> SignUp </h2>
              <form onSubmit={handleSubmit}>
                  <div className='form-group'>
                      <label htmlFor='name'>Name:</label>
                      <input type='text'  name='email' placeholder='Enter your Name' onChange={(e)=>setName(e.target.value)}required autoComplete='off'/>
                  </div>
                  <div className='form-group'>
                      <label htmlFor='name'>Email:</label>
                      <input type='text'  name='email' placeholder='Enter your email' onChange={(e)=>setEmail  (e.target.value)}required autoComplete='off'/>
                  </div>

                  <div className='form-group'>
                      <label htmlFor='name'>Password:</label>
                      <input type='password'  name='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)} required />
                  </div>
                  <button type='submit' className='submit-btn'>SignUp </button>
              </form>
              <p>Already Have an Account</p>
              <Link to="/Login">
                Login
              </Link>
               
          
  
      </div>
    )
  }
