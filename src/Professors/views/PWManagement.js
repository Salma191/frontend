import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';
import DataTable from 'react-data-table-component';

function PWManagement() {
  const [pws, setPWs] = useState([]);
  const [groups, setGroups] = useState([]);
  const [formData, setFormData] = useState({ id: null, name: '', groupIds: [] });
  const [groupedPWs, setGroupedPWs] = useState({});
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedPWId, setSelectedPWId] = useState(null);
  const [toothOptions, setToothOptions] = useState([]);
  const [formDataT, setFormDataT] = useState({ name: '' });
  const [groupOptions, setGroupOptions] = useState([]);
  const [formDataG, setFormDataG] = useState({ name: '' });

  useEffect(() => {
    fetchPWs();
    fetchGroups();
  }, []);

  const fetchPWs = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/pws');
      setPWs(response.data);

      // Update groupedPWs
      const updatedGroupedPWs = {};
      response.data.forEach(pw => {
        if (pw.groupIds) {
          pw.groupIds.forEach(groupId => {
            if (!updatedGroupedPWs[groupId]) {
              updatedGroupedPWs[groupId] = [];
            }
            updatedGroupedPWs[groupId].push(pw);
          });
        }
      });
      setGroupedPWs(updatedGroupedPWs);
    } catch (error) {
      console.error('Error fetching PWs:', error);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/groupes');
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  useEffect(() => {
    // Récupérer les données des dents depuis la base de données
    axios.get('http://localhost:8082/api/teeth')
        .then(response => {
          // Mettre à jour les options de la liste déroulante avec les données reçues
          setToothOptions(response.data); // Assurez-vous que response.data contient les données des dents
        })
        .catch(error => {
          // Gérer les erreurs de requête
          console.error('Error fetching tooth data:', error);
        });
  }, []);

  const createOrUpdatePW = async () => {
    try {
      const toothId = toothOptions.find(tooth => tooth.name === formDataT.name)?.id;

      // Utilise l'ID de la dent dans les données à envoyer au backend
      const pwData = {
        id: formData.id,
        name: formData.name,
        groupIds: formData.groupIds,
        toothId: toothId, // Ajoute l'ID de la dent à envoyer avec le mot de passe
      };

      // Si l'ID de la dent est trouvé, utilise-le dans les données à envoyer
      if (toothId) {
        pwData.toothId = toothId;
      }

      if (formData.id) {
        // Update PW
        await axios.put(`http://localhost:8082/api/pws/${formData.id}`, pwData);
      } else {
        // Create new PW
        const response = await axios.post('http://localhost:8082/api/pws', pwData);

        // Update groupedPWs
        const updatedGroupedPWs = { ...groupedPWs };
        formData.groupIds.forEach(groupId => {
          if (!updatedGroupedPWs[groupId]) {
            updatedGroupedPWs[groupId] = [];
          }
          updatedGroupedPWs[groupId].push(response.data);
        });
        setGroupedPWs(updatedGroupedPWs);
      }

      // Clear the form data
      setFormData({ id: null, name: '', groupIds: [] });

      // Refresh the PW data
      fetchPWs();
    } catch (error) {
      console.error('Error creating/updating PW:', error);
    }
  };


  const deletePW = async (id) => {
    try {
      await axios.delete('http://localhost:8082/api/pws/${id}');
      fetchPWs();
    } catch (error) {
      console.error('Error deleting PW:', error);
    }
  };

  const handleEdit = (pw) => {
    // Set the form data for editing
    const groupIds = pw.groupIds ? pw.groupIds.map(group => group.id) : [];
    setFormData({ id: pw.id, name: pw.name, groupIds });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputChangeTooth = (e) => {
    setFormDataT({ ...formDataT, [e.target.name]: e.target.value });
  };

  const handleGroupCheckboxChange = (groupId) => {
    const updatedGroupIds = (formData.groupIds || []).includes(groupId)
        ? (formData.groupIds || []).filter(id => id !== groupId)
        : [...(formData.groupIds || []), groupId];

    setFormData({ ...formData, groupIds: updatedGroupIds });
  };

  const handlePWCheckboxChange = (pwId) => {
    const updatedPWIds = (formData.pwIds || []).includes(pwId)
        ? (formData.pwIds || []).filter(id => id !== pwId)
        : [...(formData.pwIds || []), pwId];
    setFormData({ ...formData, pwIds: updatedPWIds });
  };

  const columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },{
      name: 'Tooth', // Nom de la colonne
      selector: 'toothName', // Nom du champ dans vos données
      sortable: true,
    },
    {
      name: 'Edit',
      cell: (row) => (
          <button onClick={() => handleEdit(row)}>Edit</button>
      ),
      button: true,
    },
    {
      name: 'Delete',
      cell: (row) => (
          <button onClick={() => deletePW(row.id)}>Delete</button>
      ),
      button: true,
    },
  ];

  const handleGroupSelectionChange = (groupId) => {
    setSelectedGroupId(groupId);
  };

  const handlePWSelectionChange = (pwId) => {
    setSelectedPWId(pwId);
  };

  const addPWToGroup = async () => {
    try {
      // Vérifiez que les ID sont sélectionnés
      if (!selectedGroupId || !selectedPWId) {
        console.error('Both group and password must be selected');
        return;
      }

      // Effectuez l'appel HTTP pour ajouter le pw au groupe
      await axios.post('http://localhost:8082/api/groupes/${selectedGroupId}/add-pw/${selectedPWId}');

      // Mettez à jour les données après l'ajout
      fetchPWs(); // Mettez à jour la liste des mots de passe
      fetchGroups(); // Mettez à jour la liste des groupes
    } catch (error) {
      console.error('Error adding password to group:', error);
    }
  };

  const removePWFromGroup = async () => {
    try {
      // Vérifiez que les ID sont sélectionnés
      if (!selectedGroupId || !selectedPWId) {
        console.error('Both group and password must be selected');
        return;
      }

      // Effectuez l'appel HTTP pour supprimer le pw du groupe
      await axios.delete('http://localhost:8082/api/groupes/${selectedGroupId}/remove-pw/${selectedPWId}');

      // Mettez à jour les données après la suppression
      fetchPWs(); // Mettez à jour la liste des mots de passe
      fetchGroups(); // Mettez à jour la liste des groupes
    } catch (error) {
      console.error('Error removing password from group:', error);
    }
  };



  return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>PW Management</CardHeader>
                <CardBody>
                  <form>
                    <label>
                      PW Name:
                      <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                      />
                    </label>
                    <label>
                      Tooth Name:
                      <br/>
                      <select
                          id="toothName"
                          name="toothName"
                          value={formDataT.name}
                          onChange={handleInputChangeTooth}
                      >
                        <option value="">Select a tooth</option>
                        {toothOptions.map(tooth => (
                            <option key={tooth.id} value={tooth.name}>
                              {tooth.name}
                            </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Group Name:
                      <br/>
                      <select
                          id="groupName"
                          name="groupName"
                          value={formDataG.name}
                          // onChange={handleInputChangeGroup}
                      >
                        <option value="">Select a group</option>
                        {groups.map(group => (
                            <option key={group.id} value={group.name}>
                              {group.code}
                            </option>
                        ))}
                      </select>
                    </label>
                    {/*<div>*/}
                    {/*  Assign to Groups:*/}
                    {/*  {groups.map(group => (*/}
                    {/*      <label key={group.id}>*/}
                    {/*        <input*/}
                    {/*            type="checkbox"*/}
                    {/*            value={group.id}*/}
                    {/*            checked={formData.groupIds.includes(group.id)}*/}
                    {/*            onChange={() => handleGroupCheckboxChange(group.id)}*/}
                    {/*        />*/}
                    {/*        {group.code}*/}
                    {/*      </label>*/}
                    {/*  ))}*/}
                    {/*</div>*/}
                    <button type="button" onClick={createOrUpdatePW}>
                      {formData.id ? 'Update PW' : 'Add PW'}
                    </button>
                  </form>

                  <DataTable

                      title="PWs"
                      columns={columns}
                      data={pws}
                      pagination
                      highlightOnHover
                      className="table table-striped table-bordered"
                  />

                  <div>
                    <h4>Assign Passwords to Groups:</h4>


                    <div className="mb-2">
                      <label className="me-2">Select Group:</label>
                      <select
                          className="form-select"
                          value={selectedGroupId || ''}
                          onChange={(e) => handleGroupSelectionChange(e.target.value)}
                      >
                        <option value={null}>Select Group</option>
                        {groups.map(g => (
                            <option key={g.id} value={g.id}>{g.code}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2">
                      <label className="me-2">Select PW:</label>
                      <select
                          className="form-select"
                          value={selectedPWId || ''}
                          onChange={(e) => handlePWSelectionChange(e.target.value)}
                      >
                        <option value={null}>Select Password</option>
                        {pws.map(pw => (
                            <option key={pw.id} value={pw.id}>{pw.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <button
                          type="button"
                          className="btn btn-primary me-2"
                          onClick={() => {
                            createOrUpdatePW(); // Create or update PW
                            addPWToGroup(); // Assign password to group
                          }}
                      >
                        Add Password
                      </button>

                    </div>
                  </div>
                  <div>
                    <h4>Assigned PWs to Groups:</h4>
                    {groups.map(group => (
                        <div key={group.id} className="mb-3">
                          <h5>{group.code}:</h5>
                          {groupedPWs[group.id] && groupedPWs[group.id].length > 0 ? (
                              <ul>
                                {groupedPWs[group.id].map(pw => (
                                    <li key={pw.id}>{pw.name}</li>
                                ))}
                              </ul>
                          ) : (
                              <p>None</p>
                          )}
                        </div>
                    ))}
                  </div>


                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
  );
}

export default PWManagement;