import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineRollback } from 'react-icons/ai';
import { Link } from 'react-router-dom';


import { ProfessorLogin, AuthContext } from 'Professors/ProfessorLogin';
import {Button, CardFooter, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row} from "reactstrap";

// const authContext = useContext(AuthContext);


const DashboardContainer = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CardBody = styled.div`
  padding: 20px;
`;

const Dashboard = ({ onLogout }) => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const response = await fetch(`http://localhost:8082/api/professors/${userId}`);
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setLoading(false);
          } else {
            // Gérer les cas d'erreur de la requête
            setLoading(false);
            console.error('Failed to fetch user data');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);




  const handleInputChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await authContext.updateUserData(updatedUser);
      console.log('User profile updated successfully!');
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
  <>
    <div className="content">
      <Row>
        <Col md="4">
          <Card className="card-user">
            <div className="image">
            </div>
            <CardBody>
              <div className="author">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img
                      alt="..."
                      className="avatar border-gray"
                      src={user.image}
                  />
                  <h5 className="title">{user.lastName}{user.firstName}</h5>
                </a>
                <p className="description">@{user.lastName}</p>
              </div>
              {/*<p className="description text-center">*/}
              {/*  "I like the way you work it <br />*/}
              {/*  No diggity <br />I wanna bag it up"*/}
              {/*</p>*/}
            </CardBody>
            <CardFooter>
              <hr />
              <div className="button-container">
                <Row>
                  <Col className="ml-auto" lg="3" md="6" xs="6">
                    <h5>
                      12 <br />
                      <small>Files</small>
                    </h5>
                  </Col>
                  <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                    <h5>
                      2GB <br />
                      <small>Used</small>
                    </h5>
                  </Col>
                  <Col className="mr-auto" lg="3">
                    <h5>
                      24,6$ <br />
                      <small>Spent</small>
                    </h5>
                  </Col>
                </Row>
              </div>
            </CardFooter>
          </Card>
        </Col>
        <Col md="8">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h5">Edit Profile</CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>Id</label>
                      <Input
                          defaultValue={user.id}
                          disabled
                          placeholder="Company"
                          type="text"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                  <Row>
                  <Col className="pr-1" md="12">
                    <FormGroup>
                      <label>Username</label>
                      <Input
                          defaultValue={user.userName}
                          placeholder="Username"
                          type="text"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>First Name</label>
                      <Input
                          defaultValue={user.firstName}
                          placeholder="Company"
                          type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>Last Name</label>
                      <Input
                          defaultValue={user.lastName}
                          placeholder="Last Name"
                          type="text"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label>Grade</label>
                      <Input
                          defaultValue={user.grade}
                          placeholder="Home Address"
                          type="text"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <div className="update ml-auto mr-auto">
                    <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                    >
                      Update Profile
                    </Button>
                  </div>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  </>
  );
};

export default Dashboard;
