import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import OwnersPage from './pages/OwnersPage';
import VehiclesPage from './pages/VehiclesPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/dashboard' element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}/>
        <Route path='/owners' element={<ProtectedRoute><OwnersPage/></ProtectedRoute>}/>
        <Route path='/vehicles' element={<ProtectedRoute><VehiclesPage/></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
