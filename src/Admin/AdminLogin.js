import React, { useState } from 'react';
import axios from 'axios';

import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';

import dentalImage from 'd1.jpeg';
export const AuthContext = React.createContext();

const AdminLogin = ({ onLogin }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [user, setUser] = useState(null);

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (userData) => {
    setUser(userData);
    setLoginSuccess(true);
    localStorage.setItem('adminId', userData.id);
  };

  const getUserData = async () => {
    const userId = localStorage.getItem('adminId');

    if (userId) {
      const response = await axios.get(`http://localhost:8082/api/admins/${userId}`);
      return response.data;
    }

    return null;
  };

  const updateUserData = async (updatedData) => {
    setUser(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8082/api/admins/login/${userName}`);

      if (response.status === 200) {
        // Login successful
        const adminData = response.data;
        onLogin(adminData);
        setLoginSuccess(true);
        await handleLogin(adminData);
      }
    } catch (error) {
      // Login failed, handle the error
      console.error('Login failed', error.response?.data);
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  if (loginSuccess) {
    // Redirect to another page upon successful login
    // You can replace '/dashboard' with the desired URL
    window.location.href = '/admin/profile';
  }

  return (
      <AuthContext.Provider value={{ getUserData, updateUserData }}>
        <MDBContainer className="my-5">
          <MDBCard>
            <MDBRow className="g-0">
              <MDBCol md="6">
                <MDBCardImage src={dentalImage} alt="Dental Logo" className="rounded-start w-100" />
              </MDBCol>
              <MDBCol md="6">
                <MDBCardBody className="d-flex flex-column">

                  <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                    Sign into your account
                  </h5>
                  <MDBInput
                      wrapperClass="mb-4"
                      label="Username"
                      id="formControlLg"
                      type="text"
                      size="lg"
                      value={userName}
                      onChange={handleUsernameChange}
                  />
                  <MDBInput
                      wrapperClass="mb-4"
                      label="Password"
                      id="formControlLg"
                      type="password"
                      size="lg"
                      value={password}
                      onChange={handlePasswordChange}
                  />
                  <MDBBtn className="mb-4 px-5" color="dark" size="lg" onClick={handleSubmit}>
                    Login
                  </MDBBtn>



                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
      </AuthContext.Provider>
  );
};

export default AdminLogin;
