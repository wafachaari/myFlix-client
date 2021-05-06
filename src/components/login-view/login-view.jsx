import React, { useState } from 'react';
import axios from 'axios';
import './login-view.scss'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState('');
  const [login, setLogin] = useState('');

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setLogin(null);
      setValidated(true);
      return;
    }
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://movie-api-db-30.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        if (!response.data.user) {
          setLogin(true);
        }
        else {
          props.onLoggedIn(data);
        }
      })
      .catch(e => {

      });
  };

  const setUsernameAndLogin = (e) => {
    setUsername(e.target.value);
    setLogin(null);
  }

  const setPasswordAndLogin = (e) => {
    setPassword(e.target.value);
    setLogin(null);
  }


  return (
    <Container className="login-view" fluid="true">
     
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="login-form">
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" pattern="^[a-zA-Z0-9]{5,}" required value={username} onChange={e => setUsernameAndLogin(e)} />
          <Form.Control.Feedback type="invalid">
            Username isn't at least 5 characters or alphanumeric.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" value={password} required onChange={e => setPasswordAndLogin(e)} />
          <Form.Control.Feedback type="invalid">
            Please enter a password.
          </Form.Control.Feedback>
          {!login ? null
          :
          <Form.Text className="incorrect-text">
            Incorrect username or password.
          </Form.Text>}
        </Form.Group>
        <Button className="submit-button" variant="primary" type="submit">Submit</Button>
        <Form.Group className="registration-group" controlId="formRegistration">
          <Form.Text className="text-muted">Don't have an account?</Form.Text>
          <Link to={`/register`}>
            <Button className="register-link">Register here</Button>
          </Link>
        </Form.Group>
      </Form>
    </Container>
  );
}