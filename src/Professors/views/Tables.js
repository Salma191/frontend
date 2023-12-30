import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table, Form, FormGroup, Label, Input } from 'reactstrap';

function Tables() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ userName: '', firstName: '', lastName: '', number: '' });
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://joyous-ocean-production.up.railway.app/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const createStudent = async () => {
    try {
      await axios.post('http://joyous-ocean-production.up.railway.app/api/students', newStudent);
      setNewStudent({ userName: '', firstName: '', lastName: '', number: '' });
      fetchStudents();
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const updateStudent = async () => {
    try {
      await axios.put(`http://joyous-ocean-production.up.railway.app/api/students/${editingStudent.id}`, editingStudent);
      setEditingStudent(null);
      fetchStudents();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://joyous-ocean-production.up.railway.app/api/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent({ ...student });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (editingStudent !== null) {
      // If in edit mode, update the editingStudent state
      setEditingStudent({
        ...editingStudent,
        [name]: value,
      });
    } else {
      // If not in edit mode, update the newStudent state
      setNewStudent({
        ...newStudent,
        [name]: value,
      });
    }
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Student Table</CardTitle>
              </CardHeader>
              <CardBody>
              <Form>
  <FormGroup>
    <Label for="userName">Username</Label>
    <Input type="text" name="userName" id="userName" value={editingStudent?.userName || newStudent.userName || ''} onChange={handleInputChange} />
  </FormGroup>
  <FormGroup>
    <Label for="firstName">First Name</Label>
    <Input type="text" name="firstName" id="firstName" value={editingStudent?.firstName || newStudent.firstName || ''} onChange={handleInputChange} />
  </FormGroup>
  <FormGroup>
    <Label for="lastName">Last Name</Label>
    <Input type="text" name="lastName" id="lastName" value={editingStudent?.lastName || newStudent.lastName || ''} onChange={handleInputChange} />
  </FormGroup>
  <FormGroup>
    <Label for="number">Number</Label>
    <Input type="text" name="number" id="number" value={editingStudent?.number || newStudent.number || ''} onChange={handleInputChange} />
  </FormGroup>
  {editingStudent ? (
    <button type="button" onClick={updateStudent}>
      Update Student
    </button>
  ) : (
    <button type="button" onClick={createStudent}>
      Add Student
    </button>
  )}
</Form>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Username</th>
                      <th>Name</th>
                      <th>Number</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td>{student.userName}</td>
                        <td>{`${student.firstName} ${student.lastName}`}</td>
                        <td>{student.number}</td>
                        <td className="text-right">
                          <button onClick={() => handleEdit(student)}>Edit</button>
                          <button onClick={() => deleteStudent(student.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            {/* Your other table */}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
