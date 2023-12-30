import React, { useState } from 'react';
import AdminLogin from './Admin/AdminLogin';
import ProfessorLogin from './Professors/ProfessorLogin';
import StudentLogin from './Student/StudentLogin'; // Import the StudentLogin component

const LoginPage = () => {
    const [userType, setUserType] = useState('admin'); // Default to admin login

    const handleUserTypeChange = (type) => {
        setUserType(type);
    };

    return (
        <div>
            <h2>Login Page</h2>
            <div>
                <button onClick={() => handleUserTypeChange('admin')}>Admin Login</button>
                <button onClick={() => handleUserTypeChange('professor')}>Professor Login</button>
                <button onClick={() => handleUserTypeChange('student')}>Student Login</button>
            </div>
            {userType === 'admin' ? (
                <AdminLogin onLogin={(adminData) => console.log(adminData)} />
            ) : userType === 'professor' ? (
                <ProfessorLogin onLogin={(professorData) => console.log(professorData)} />
            ) : (
                <StudentLogin onLogin={(studentData) => console.log(studentData)} />
            )}
        </div>
    );
};

export default LoginPage;