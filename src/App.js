import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import ForbiddenPage from './pages/ForbiddenPage';
import AdminDashboard from './pages/AdminDashboard';
import SuccessLogin from './pages/SuccessLogin.jsx';
import { useAuthContext } from '@asgardeo/auth-react';
import DetailDashboard from './pages/DetailDashboard.jsx';
import CustomerPage from './pages/CustomerPage.jsx';
import CustomerAdd from './pages/CustomerAdd.jsx';
import CustomerUpload from './pages/CustomerUpload.jsx';
import SalesInfoPage from './pages/SalesInfoPage.jsx';
import SalesInfoAdd from './pages/SalesInfoAdd.jsx';
import SalesTargetPage from './pages/SalesTargetPage.jsx';
import SalesTargetAdd from './pages/SalesTargetAdd.jsx';



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
              <Route exact path="/dashboard/detail" element={<DetailDashboard />} />

              <Route exact path="/customer" element={<CustomerPage />} />
              <Route exact path="/customer/add" element={<CustomerAdd />} />
              <Route exact path="/customer/edit" element={<CustomerAdd />} />
              <Route exact path="/customer/upload" element={<CustomerUpload />} />

              <Route exact path="/sales" element={<SalesInfoPage />} />
              <Route exact path="/sales/add" element={<SalesInfoAdd />} />
              <Route exact path="/sales/edit" element={<SalesInfoAdd />} />
              
              <Route exact path="/sales-target" element={<SalesTargetPage />} />
              <Route exact path="/sales-target/add" element={<SalesTargetAdd />} />
              <Route exact path="/sales-target/edit" element={<SalesTargetAdd />} />

              <Route exact path="/login" element={<SuccessLogin />} />
            </>
            : <Route exact path="/" element={<LoginPage />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
