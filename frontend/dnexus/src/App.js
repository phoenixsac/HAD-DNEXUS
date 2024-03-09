import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/Authentication/AuthContext";

import "./App.css";
import "./components/Navbar/Navbar.css";

import Dashboard from "./pages/Dashboard";
import LoginAs from "./pages/LoginAs";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorList from "./pages/DoctorList";
import DoctorDetails from "./pages/DoctorDetails";
import PLogin from "./pages/PLogin";
import PRegistration from "./pages/PRegistration";
import PatientDash from "./pages/PatientDash";
import PatientReport from "./pages/PatientReport"
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import Unauthorized from "./components/Unauthorized/Unauthorized";


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/LoginAs" element={<LoginAs />} />

            <Route path="/Login" element={<Login />} /> 


            <Route path="/unauthorized" element={<Unauthorized />} /> 
            

            <Route
              path="/AdminDashboard"
              element={
                <ProtectedRoute userType="admin">
                  <AdminDashboard /> {/* Child route for authorized users */}
                </ProtectedRoute>
              }
            />

            <Route path="/view-doctors" element={<ProtectedRoute />} />
            <Route path="/doctors/:id" element={<DoctorDetails />} />
            <Route path="/PLogin" element={<PLogin />} />
            <Route path="/PRegistration" element={<PRegistration />} />
            <Route path="/PatientReport" element={<PatientReport />} />
            <Route path="/PatientDash" element={<PatientDash />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;






// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";
// import "./components/Navbar/Navbar.css";

// import Dashboard from "./pages/Dashboard";
// import LoginAs from "./pages/LoginAs";
// import Login from "./pages/Login";
// import AdminDashboard from "./pages/AdminDashboard";
// import DoctorList from "./pages/DoctorList";
// import DoctorDetails from "./pages/DoctorDetails";
// import PLogin from "./pages/PLogin";
// import PRegistration from "./pages/PRegistration";
// import PatientDash from "./pages/PatientDash";
// import PatientReport from "./pages/PatientReport"

// const threads = [
//   { threadId: 1, threadName: 'Thread 1', isCompleted: false },
//   { threadId: 2, threadName: 'Thread 2', isCompleted: true },
//   { threadId: 3, threadName: 'Thread 3', isCompleted: true },
// ];

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/LoginAs" element={<LoginAs />} />
//           <Route path="/Login" element={<Login />} />
//           <Route path="/AdminDashboard" element={<AdminDashboard />} />
//           <Route path="/view-doctors" element={<DoctorList />} />
//           <Route path="/doctors/:id" element={<DoctorDetails />} />
//           <Route path="/PLogin" element={<PLogin />} />
//           <Route path="/PRegistration" element={<PRegistration />} />
//           <Route path="/PatientDash" element={<PatientDash threads={threads}></PatientDash>} />
//           <Route path="/PatientReport" element={<PatientReport />} />
          
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
