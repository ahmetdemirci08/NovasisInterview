import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
export default function LoginAsConsultant() {
const navigate = useNavigate();
  
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
 
    axios.defaults.withCredentials =true;

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:4000/ConsultantLogin',{email,password})
        .then(res =>{
           if (res.data.Status === "Success") {
            if (res.data.role ==="Consultant") {
                navigate('/ConsultantDashboard')
            }
            else{navigate('/')}
           }
        }).catch(err => console.log(err))
    }
    return (
      <div>
          <h2> LOGIN as Consultant </h2>
              <form onSubmit={handleSubmit}>
 
                  <div className='form-group'>
                      <label htmlFor='name'>Email:</label>
                      <input type='text'  name='email' placeholder='Enter your email' onChange={(e)=>setEmail  (e.target.value)}required autoComplete='off'/>
                  </div>

                  <div className='form-group'>
                      <label htmlFor='name'>Password:</label>
                      <input type='password'  name='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)} required />
                  </div>
                  <button type='submit' className='submit-btn'>Login </button>
              </form>
              <p>DONT Have an Account</p>
              <Link to="/SingUpAsConsultant">
               Register As A Consultant
              </Link>
               
          
  
      </div>
    )
  }
