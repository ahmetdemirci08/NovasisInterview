import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AdminDashboard from './pages/AdminDashboard';
import LoginAsConsultant from './pages/LoginAsConsultant';
import SingUpAsConsultant from './pages/SingUpAsConsultant';
import ConsultantDashboard from './pages/ConsultantDashboard';

function App() {
  return (
    <div className="App">
      
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/ConsultantDashboard' element={<ConsultantDashboard />} />
          <Route path='/AdminDashboard' element={<AdminDashboard />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/ConsultantLogin' element={<LoginAsConsultant />} />
          <Route path='/SingUpAsConsultant' element={<SingUpAsConsultant />} />
          <Route path='/Home' element={<Home />} />
        </Routes>
       
    </div>
  );
}

export default App;
