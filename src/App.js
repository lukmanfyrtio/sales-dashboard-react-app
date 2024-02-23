import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import ForbiddenPage from './pages/ForbiddenPage';
import AdminDashboard from './pages/AdminDashboard';
import SuccessLogin from './pages/SuccessLogin.jsx';
import { useAuthContext } from '@asgardeo/auth-react';



function App() {
  const {
    state,
  } = useAuthContext();


  return (
    <div className="main">

      <Router>
        <Routes>
          <Route exact path="/403" element={<ForbiddenPage />} />
          {state.isAuthenticated ?
            <>
              <Route exact path="/" element={<AdminDashboard />} />
              <Route exact path="/dashboard" element={<AdminDashboard />} />
              <Route exact path="/login" element={<SuccessLogin />} />
            </>
            : <Route exact path="/" element={<LoginPage />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
