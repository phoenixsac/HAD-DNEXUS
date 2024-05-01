import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/Authentication/AuthContext";

import "./App.css";
// import "./components/Navbar/Navbar.css";

import LandingPage from "./pages/LandingPage";
import LoginAs from "./pages/LoginAs";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import PLogin from "./pages/PLogin";
import PatientReport from "./pages/PatientReport"
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import Unauthorized from "./components/Unauthorized/Unauthorized";

import DoctorDashboard from "./pages/DoctorDashboard";
import PatientList from "./components/PatientList/PatientList";
import DocPatientTestDetails from "./pages/Doctor-PatientTestDetails";
import RadDashboard from "./pages/RadDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import PatientRegistration from "./pages/PatientRegistration";
import AddProfessional from "./pages/AddProfessional";
import ListProfessional from "./pages/ListProfessional";
import DetailsProfessional from "./pages/DetailsProfessional";
import AddFacility from "./pages/AddFacility";
import ListFacility from "./pages/ListFacility";
import DetailsFacility from "./pages/DetailsFacility";
import ListPatient from "./pages/ListPatient";
import DetailsPatient from "./pages/DetailsPatient";
import FacilityDashboard from "./pages/FacilityDashboard";

import TestCase from "./pages/TestCase";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactUs from "./pages/ContactUs";


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
            <Route path="/about-us" element={<AboutUs />} /> 
            <Route path="/privacy-policy" element={<PrivacyPolicy />} /> 
            <Route path="/contact-us" element={<ContactUs />} /> 
            
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute userType="admin">
                  <AdminDashboard /> 
                </ProtectedRoute>
              }
            />

            {/* for now - Admin */}
            {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}

            {/* Admin-professional */}
            <Route path="/admin/view-professional-list" element={<ListProfessional />} />
            <Route path="/admin/add-professional" element={<AddProfessional />} />
            <Route path="/admin/professional/:id" element={<DetailsProfessional />} /> 

            {/* Admin-facility */}
            <Route path="/admin/view-facility-list" element={<ListFacility />} />
            <Route path="/admin/add-facility" element={<AddFacility />} />
            <Route path="/admin/facility/:id" element={<DetailsFacility />} />

            {/* Admin-Patient */}
            <Route path="/admin/view-patient-list" element={<ListPatient />} /> 
            <Route path="/admin/patient/:patientId" element={<DetailsPatient />} />

            {/* Doctor */}
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor/patient-test-details/:patientId" element={<DocPatientTestDetails />} />
            {/* navigate to a case page path:"/doctor/patient-list/:id/:caseId" */}
            <Route path="/doctor/patient-test-details/:patientId/:consultationId" element={<TestCase />} />

            {/* Radiologist */}
            <Route path="/rad/dashboard" element={<RadDashboard />} />
            <Route path="/rad/patient-test-details/:testId" element={<TestCase />} />

            {/* Lab */}
            <Route path="/facility/dashboard" element={<FacilityDashboard />} />
            {/* <Route path="/facility/patient-test-details/:id" element={<LabPatientTestDetails />} /> */}
                   
            {/* Patient */}
            <Route path="/PLogin" element={<PLogin />} />
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/patient/registration" element={<PatientRegistration />} />
            {/* <Route path="/patient/report/:consultationId" element={<PatientReport />} /> */}
            <Route path="/patient/patient-test-details/:testId" element={<TestCase />} />


          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;





