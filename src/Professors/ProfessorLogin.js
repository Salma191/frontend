import React, { useState } from 'react';
import axios from 'axios';

import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import dentalImage from 'd1.jpeg';


export const AuthContext = React.createContext();

const ProfessorLogin = ({ children }) => {
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
    localStorage.setItem('userId', userData.id);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const getUserData = async () => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      const response = await axios.get(`http://joyous-ocean-production.up.railway.app/api/professors/${userId}`);
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
      const response = await axios.get(`http://joyous-ocean-production.up.railway.app/api/professors/login/${userName}`);

      if (response.status === 200) {
        const adminData = response.data;
        await handleLogin(adminData);
      }
    } catch (error) {
      console.error('Login failed', error.response?.data);
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  if (loginSuccess) {
    window.location.href = '/professor/dashboard';
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

export default ProfessorLogin;



// CSS styles directly in the component
const styles = `
.admin-login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 50px;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.input-container {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
`;

// Inject the styles into the head of the document
const styleElement = document.createElement('style');
styleElement.appendChild(document.createTextNode(styles));
document.head.appendChild(styleElement);