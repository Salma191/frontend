import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "Admin/assets/scss/paper-dashboard.scss?v=1.3.0";
import "Admin/assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "Admin/layouts/Admin.js";
import LoginPage from "LoginPage";
import ProfessorLayout from "Professors/layouts/Admin.js";
import StudentLayout from "Student/layouts/Admin";
import AdminLogin from "./Admin/AdminLogin";
import ProfessorLogin from "./Professors/ProfessorLogin";
import StudentLogin from "./Student/StudentLogin";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <Routes>
            {/* <Route path="/" element={<AdminLogin />} /> */}
            <Route path="/" element={<AdminLogin onLogin={(adminData) => console.log(adminData)} />} />
            <Route path="/professor" element={<ProfessorLogin />} />
            <Route path="/student" element={<StudentLogin onLogin={(studentData) => console.log(studentData)} />} />
            <Route path="/admin/*" element={<AdminLayout />} />
            <Route path="/professor/*" element={<ProfessorLayout />} />
            <Route path="/student/*" element={<StudentLayout />} />



            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
    </BrowserRouter>
);