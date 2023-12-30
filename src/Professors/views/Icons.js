import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from 'reactstrap';
import '../assets/css/Icon.css';

const Icons = () => {
  const [groupes, setGroupes] = useState([]);
  const [nouveauCode, setNouveauCode] = useState('');
  const [nouveauYear, setNouveauYear] = useState('');

  const chargerGroupes = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/groupes');
      setGroupes(response.data);
    } catch (error) {
      console.error('Error fetching groupes:', error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await chargerGroupes();
    };

    fetchData();
  }, [chargerGroupes]);

  const creerGroupe = async () => {
    try {
      const response = await axios.post('http://localhost:8082/api/groupes', {
        code: nouveauCode,
        year: nouveauYear,
      });
      setGroupes([...groupes, response.data]);
      // Réinitialiser les champs après la création
      setNouveauCode('');
      setNouveauYear('');
    } catch (error) {
      console.error('Erreur lors de la création du groupe', error);
    }
  };

  const supprimerGroupe = async (id) => {
    try {
      await axios.delete(`/api/groupes/${id}`);
      setGroupes(groupes.filter((groupe) => groupe.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du groupe', error);
    }
  };

  // Columns for react-table
  const columns = useMemo(
    () => [
      {
        Header: 'Code',
        accessor: 'code', // Update to the appropriate property in your data
      },
      {
        Header: 'Year',
        accessor: 'year', // Update to the appropriate property in your data
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <button onClick={() => supprimerGroupe(row.original.id)}>
            Supprimer
          </button>
        ),
      },
    ],
    []
  );

  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedData = useMemo(() => groupes, [groupes]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: memoizedColumns,
    data: memoizedData,
  });

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Group Table</CardTitle>
              </CardHeader>
              <CardBody className="all-icons">
                <div id="icons-wrapper">
                  <section>
                    <div>
                      <label>
                        Code :
                      <input
                        type="text"
                        value={nouveauCode}
                        onChange={(e) => setNouveauCode(e.target.value)}
                        placeholder="Code du groupe"
                      />
                      </label>
                      <label>
                        Year :
                      <input
                        type="text"
                        value={nouveauYear}
                        onChange={(e) => setNouveauYear(e.target.value)}
                        placeholder="Année du groupe"
                      />
                      </label>
                      <button onClick={creerGroupe}>Add Group</button>
                      <br/>
                    </div>
                  </section>
                  <section>
                    <br/>
                    <table {...getTableProps()} className="table">
                      <thead>
                        {headerGroups.map((headerGroup) => (
                          <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                          prepareRow(row);
                          return (
                            <tr {...row.getRowProps()}>
                              {row.cells.map((cell) => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </section>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Icons;
