import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [consultants, setConsultants] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/consultants')
      .then(res => {
        console.log('/consultants response', res.data); // Log the response data
        setConsultants(res.data);
      })
      .catch(err => console.error('/consultants error', err));
  }, []);

  const handleAppointmentRequest = (consultantId) => {
    console.log('handleAppointmentRequest', consultantId); // Log the consultantId
    axios.post('http://localhost:4000/appointments', { consultantId })
      .then(res => {
        console.log('/appointments response', res.data); // Log the response data
      })
      .catch(err => console.error('/appointments error', err));
  };

  return (
    <div>
      <h2>Consultants</h2>
      {consultants.map(consultant => (
        <div key={consultant._id} style={{ display: 'flex' }}>
          <p>{consultant.name}</p>
          <button onClick={() => handleAppointmentRequest(consultant._id)}>Request Appointment</button>
        </div>
      ))}
    </div>
  );
}
