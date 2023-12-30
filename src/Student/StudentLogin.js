import React, { useState } from 'react';
import axios from 'axios';

export const AuthContext = React.createContext();

const StudentLogin = ({ onLogin }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [user, setUser] = useState(null);

    const handleUserNameChange = (e) => {
      setUserName(e.target.value);
    };

    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    const handleLogin = async (userData) => {
        setUser(userData);
        setLoginSuccess(true);
        localStorage.setItem('studentId', userData.id);
    };

    const getUserData = async () => {
        const user = localStorage.getItem('studentId');

        if (user) {
            const response = await axios.get(`http://localhost:8082/api/students/${user}`);
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
        const response = await axios.post('http://localhost:8082/api/students/login', {
          userName: userName,
          password: password,
        });

        if (response.status === 200) {
          // Login successful
          const studentData = response.data;
          onLogin(studentData);
          setLoginSuccess(true);
          await handleLogin(studentData)
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
    window.location.href = '/student/dashboard';
  }

  return (
      <AuthContext.Provider value={{ getUserData, updateUserData }}>
    <div className="student-login-container">
      <h2>Student Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>
            UserName:
            <input type="text" value={userName} onChange={handleUserNameChange} />
          </label>
        </div>
        <div className="input-container">
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
      </AuthContext.Provider>
  );
};

export default StudentLogin;

// CSS styles directly in the component
const styles = `
.student-login-container {
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
