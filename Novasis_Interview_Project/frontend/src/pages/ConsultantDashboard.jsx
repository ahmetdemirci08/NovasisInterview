import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ConsultantDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/admin/dashboard')
      .then(res => setAppointments(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleApprove = (appointmentId) => {
    axios.post(`http://localhost:4000/appointments/${appointmentId}/approve`)
      .then(res => {
        console.log(res.data);
        setAppointments(appointments.map(app => app._id === appointmentId ? { ...app, status: 'Approved' } : app));
      })
      .catch(err => console.error(err));
  };

  const handleReject = (appointmentId) => {
    axios.post(`http://localhost:4000/appointments/${appointmentId}/reject`)
      .then(res => {
        console.log(res.data);
        setAppointments(appointments.map(app => app._id === appointmentId ? { ...app, status: 'Rejected' } : app));
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Consultant Dashboard</h2>
      {appointments.map(app => (
        <div key={app._id} style={{display:'flex', alignItems:'center',justifyContent:'center', margin:5}}>
         {console.log(app.consultant._id)}
          
          <p>User: {app.user ? app.user.name : 'Unknown'}</p>
          <p style={{marginLeft:5}}>Consultant: {app.consultant ? app.consultant.name : 'Unknown'}</p>
          <p style={{marginLeft:5}}> Status: {app.status}</p>
          {app.status === 'Pending' && (
            <div style={{marginLeft:5}}>
              <button onClick={() => handleApprove(app._id)}>Approve</button>
              <button onClick={() => handleReject(app._id)}>Reject</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}