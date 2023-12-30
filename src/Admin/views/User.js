import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const User = () => {
  const [professors, setProfessors] = useState([]);
  const [newProfessor, setNewProfessor] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    grade: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/professors');
      setProfessors(response.data);
    } catch (error) {
      console.error('Error fetching professors:', error);
      setError('Error fetching professors. Please try again.');
    }
  };

  const handleCreateProfessor = async () => {
    try {
      const response = await axios.post('http://localhost:8082/api/professors', newProfessor);
      setNewProfessor({
        firstName: '',
        lastName: '',
        userName: '',
        grade: '',
      });
      setProfessors([...professors, response.data]);
      setError('');
    } catch (error) {
      console.error('Error creating professor:', error);
      setError('Error creating professor. Please check your input and try again.');
    }
  };

  const handleDeleteProfessor = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/api/professors/${id}`);
      setProfessors(professors.filter((professor) => professor.id !== id));
      setError('');
    } catch (error) {
      console.error('Error deleting professor:', error);
      setError('Error deleting professor. Please try again.');
    }
  };

  const columns = [
    { name: 'ID', selector: 'id', sortable: true },
    { name: 'First Name', selector: 'firstName', sortable: true },
    { name: 'Last Name', selector: 'lastName', sortable: true },
    { name: 'Username', selector: 'userName', sortable: true },
    { name: 'Grade', selector: 'grade', sortable: true },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="actions" style={{ display: 'flex' }}>
          <button className="delete"
                  style={{
                    marginLeft: '0px',
                    padding: '8px',
                    fontSize: '12px',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    backgroundColor: '#e74c3c',
                  }}
                  onClick={() => handleDeleteProfessor(row.id)}>
            Delete
          </button>
          <button
              className="update"
              style={{
                marginLeft: '10px',
                padding: '8px',
                fontSize: '12px',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor: '#2ecc71',
              }}
              onClick={() => handleUpdateProfessor(row.id)}
          >
            Update
          </button>
        </div>
      ),
    },
  ];

  const handleUpdateProfessor = (id) => {
    console.log(`Update professor with ID: ${id}`);
    // Implement your update logic here
  };

  return (
    <div style={{ padding: '20px' }}>
      <br/>
      <br/>
      <style>
        {`
    .content {
      font-family: 'Roboto', sans-serif;
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    
    /* ... Styles pour le reste de votre composant ... */

    .create-professor {
      margin-bottom: 20px;
    }
    
    /* ... Autres styles ... */

    .create-button {
      background-color: #3498db;
      color: #fff;
      padding: 12px;
      font-size: 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      
    }

    /* ... Autres styles ... */

    .error-message {
      color: #e74c3c;
      margin-top: 10px;
    }
  `}
      </style>



      <div className="content">
        <div className="create-professor">
          <h3>Create New Professor</h3>
        <div className="input-group">
          <label style={{ marginRight: '20px' }}>
            First Name:
            <input
              type="text"
              value={newProfessor.firstName}
              onChange={(e) => setNewProfessor({ ...newProfessor, firstName: e.target.value })}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={newProfessor.lastName}
              onChange={(e) => setNewProfessor({ ...newProfessor, lastName: e.target.value })}
            />
          </label>
          <label style={{ marginRight: '25px' }}>
            Username:
            <input
              type="text"
              value={newProfessor.userName}
              onChange={(e) => setNewProfessor({ ...newProfessor, userName: e.target.value })}
            />
          </label>
          <label>
            Grade:
            <input
              type="text"
              value={newProfessor.grade}
              onChange={(e) => setNewProfessor({ ...newProfessor, grade: e.target.value })}
            />
          </label>
        </div>
        <button className="create-button" onClick={handleCreateProfessor}>
          Create Professor
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
      </div>

      <h3>Professor List</h3>
      <DataTable columns={columns} data={professors} pagination />
    </div>
  );
};

export default User;
