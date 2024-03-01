import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import ForbiddenPage from './pages/ForbiddenPage';
import AdminDashboard from './pages/AdminDashboard';
import SuccessLogin from './pages/SuccessLogin.jsx';
import { useAuthContext } from '@asgardeo/auth-react';
import DetailDashboard from './pages/DetailDashboard.jsx';
import SalesLeadsPage from './pages/SalesLeadsPage.jsx';
import SalesRevenuePage from './pages/SalesRevenuePage.jsx';
import CompanyTargetPage from './pages/CompanyTargetPage.jsx';
import SalesLeadsForm from './pages/SalesLeadsForm.jsx';
import SalesRevenueForm from './pages/SalesRevenueForm.jsx';
import CompanyTargetForm from './pages/CompanyTargetForm.jsx';
import SalesLeadsUploadForm from './pages/SalesLeadsUploadForm.jsx';
import DepartmentPage from './pages/DepartmentPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import DepartmentForm from './pages/DepartmentForm.jsx';
import ProductForm from './pages/ProductForm.jsx';



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

              <Route exact path="/sales-lead" element={<SalesLeadsPage />} />
              <Route exact path="/sales-lead/add" element={<SalesLeadsForm />} />
              <Route exact path="/sales-lead/edit" element={<SalesLeadsForm />} />
              
              <Route exact path="/sales-lead/upload" element={<SalesLeadsUploadForm />} />

              <Route exact path="/sales-revenue" element={<SalesRevenuePage />} />
              <Route exact path="/sales-revenue/add" element={<SalesRevenueForm />} />
              <Route exact path="/sales-revenue/edit" element={<SalesRevenueForm />} />
              
              <Route exact path="/company-target" element={<CompanyTargetPage />} />
              <Route exact path="/company-target/add" element={<CompanyTargetForm />} />
              <Route exact path="/company-target/edit" element={<CompanyTargetForm />} />


              <Route exact path="/department" element={<DepartmentPage />} />
              <Route exact path="/department/edit" element={<DepartmentForm />} />
              <Route exact path="/department/add" element={<DepartmentForm />} />

              <Route exact path="/product" element={<ProductPage />} />
              <Route exact path="/product/edit" element={<ProductForm />} />
              <Route exact path="/product/add" element={<ProductForm />} />

              <Route exact path="/login" element={<SuccessLogin />} />
            </>
            : <>
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/403" replace />} />
            </>}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
