import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/Authentication/AuthContext";

import "./App.css";
import "./components/Navbar/Navbar.css";

import LandingPage from "./pages/LandingPage";
import LoginAs from "./pages/LoginAs";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorList from "./pages/DoctorList";
import DoctorDetails from "./pages/DoctorDetails";
import PLogin from "./pages/PLogin";
import PatientReport from "./pages/PatientReport"
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import DoctorAdd from "./pages/DoctorAdd"
import SuccessPage from "./pages/SuccessPage";
import RadiologistList from "./pages/RadiologistList";
import LabList from "./pages/LabList";
import RadiologistAdd from "./pages/RadiologistAdd";
import LabAdd from "./pages/LabAdd";
import RadiologistDetails from "./pages/RadiologistDetails";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientList from "./components/PatientList/PatientList";
import DocPatientTestDetails from "./pages/Doctor-PatientTestDetails";
import DoctorCreateCase from "./pages/DoctorCreateCase";
import RadDashboard from "./pages/RadDashboard";
import RadPatientTestDetails from "./pages/Rad-PatientTestDetails";
import LabDetails from "./pages/LabDetails";
import LabDashboard from "./pages/LabDashboard";
import LabPatientTestDetails from "./pages/Lab-PatientTestDetails";
import PatientDashboard from "./pages/PatientDashboard";
import PatientRegistration from "./pages/PatientRegistration";


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<LandingPage />} />
            <Route path="/LoginAs" element={<LoginAs />} />
            <Route path="/Login" element={<Login />} /> 
            <Route path="/unauthorized" element={<Unauthorized />} /> 
            
            {/* <Route
              path="/AdminDashboard"
              element={
                <ProtectedRoute userType="admin">
                  <AdminDashboard /> 
                </ProtectedRoute>
              }
            /> */}

            {/* for now */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            {/* Admin-doctor */}
            <Route path="/admin/view-doctorlist" element={<DoctorList />} />
            <Route path="/admin/add-doctor" element={<DoctorAdd />} />
            <Route path="/admin/doctor/:id" element={<DoctorDetails />} /> 
            {/* may be replaced */}
            <Route path="/admin/success-page" element={<SuccessPage />} /> 

            {/* Admin-Rad */}
            <Route path="/admin/view-radiologistlist" element={<RadiologistList />} />
            <Route path="/admin/add-radiologist" element={<RadiologistAdd />} />
            <Route path="/admin/radiologist/:id" element={<RadiologistDetails />} />

            {/* Admin-Lab */}
            <Route path="/admin/view-lablist" element={<LabList />} />
            <Route path="/admin/add-lab" element={<LabAdd />} />
            <Route path="/admin/lab/:id" element={<LabDetails />} />

            {/* Doctor */}
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor/patient-test-details/:id" element={<DocPatientTestDetails />} />
            {/* navigate to a case page path:"/doctor/patient-list/:id/:caseId" */}
            <Route path="/doctor/patient-test-details/:id/create-case" element={<DoctorCreateCase />} />

            {/* Radiologist */}
            <Route path="/rad/dashboard" element={<RadDashboard />} />
            <Route path="/rad/patient-test-details/:id" element={<RadPatientTestDetails />} />

            {/* Lab */}
            <Route path="/lab/dashboard" element={<LabDashboard />} />
            <Route path="/lab/patient-test-details/:id" element={<LabPatientTestDetails />} />
                   
            {/* Patient */}
            <Route path="/PLogin" element={<PLogin />} />
            <Route path="/patient/registration" element={<PatientRegistration />} />
            <Route path="/patient/report" element={<PatientReport />} />
            <Route path="/patient/dashboard" element={<PatientDashboard />} />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;





