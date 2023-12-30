import React, { useState, useEffect } from 'react';
import axios from 'axios';

// reactstrap components
import {Card, CardHeader, CardBody, Row, Col, CardTitle} from 'reactstrap';

function Typography() {
  const [teeth, setTeeth] = useState([]);
  const [toothFormData, setToothFormData] = useState({ id: null, name: '' });

  useEffect(() => {
    fetchTeeth();
  }, []);

  const fetchTeeth = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/teeth');
      setTeeth(response.data);
    } catch (error) {
      console.error('Error fetching teeth:', error);
    }
  };

  const createOrUpdateTooth = async () => {
    try {
      if (toothFormData.id) {
        // Update tooth
        await axios.put(`http://localhost:8082/api/teeth/${toothFormData.id}`, toothFormData);
      } else {
        // Create new tooth
        await axios.post('http://localhost:8082/api/teeth', toothFormData);
      }

      // Clear the form data
      setToothFormData({ id: null, name: '' });

      // Refresh the teeth data
      fetchTeeth();
    } catch (error) {
      console.error('Error creating/updating tooth:', error);
    }
  };

  const deleteTooth = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/api/teeth/${id}`);
      fetchTeeth();
    } catch (error) {
      console.error('Error deleting tooth:', error);
    }
  };

  const handleEdit = (tooth) => {
    // Set the form data for editing
    setToothFormData({ id: tooth.id, name: tooth.name });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setToothFormData({ ...toothFormData, [name]: value });
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Tooth Table</CardTitle>
              </CardHeader>
              <CardBody>
                <form>
                  <label>
                    Tooth Name:
                    <input
                      type="text"
                      name="name"
                      value={toothFormData.name}
                      onChange={handleInputChange}
                    />
                  </label>
                  <button type="button" onClick={createOrUpdateTooth}>
                    {toothFormData.id ? 'Update Tooth' : 'Add Tooth'}
                  </button>
                </form>
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tooth Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teeth.map((tooth) => (
                      <tr key={tooth.id}>
                        <td>{tooth.id}</td>
                        <td>{tooth.name}</td>
                        <td>
                          <button onClick={() => handleEdit(tooth)}>Edit</button>
                          <button onClick={() => deleteTooth(tooth.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Typography;
