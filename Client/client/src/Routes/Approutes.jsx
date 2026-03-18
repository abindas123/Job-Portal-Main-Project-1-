import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../Components/ProtectedRoute";
import RoleRoute from "../Components/Roleroute";

import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import JobDetails from "../Pages/Jobdetails";

import MyApplications from "../Pages/Candidate/Myapplications";
import EmployerDashboard from "../Pages/Employer/Employerdashboard";
import MyJobs from "../Pages/Employer/Myjobs";
import JobForm from "../Pages/Employer/Jobform";
import Applicants from "../Pages/Employer/Applicants";

export default function AppRoutes(){
    return(
    <Routes>
        <Route path="/" element={<Home/>}/>
         <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
           <Route path="/jobs/:id" element={<JobDetails/>}/>

           <Route element={<ProtectedRoute />}>
        {/* Candidate */}
        <Route element={<RoleRoute allow={["candidate"]} />}>
          <Route path="/candidate/applications" element={<MyApplications />} />
        </Route>

        {/* Employer */}
        <Route element={<RoleRoute allow={["employer"]} />}>
          <Route path="/employer" element={<EmployerDashboard />} />
          <Route path="/employer/jobs" element={<MyJobs />} />
          <Route path="/employer/jobs/new" element={<JobForm mode="create" />} />
          <Route path="/employer/jobs/:id/edit" element={<JobForm mode="edit" />} />
          <Route path="/employer/jobs/:id/applicants" element={<Applicants />} />
        </Route>
      </Route>
        
    </Routes>
    )
}