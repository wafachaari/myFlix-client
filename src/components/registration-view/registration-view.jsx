import React, { useState } from 'react';
import './registration-view.scss'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function RegistrationView() { 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [validated, setValidated] = useState('');
  const [used, setUsed] = useState('');

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setUsed(null);
      setValidated(true);
      return;
    }
    e.preventDefault();
    console.log(name, username);
    /* Send a request to the server for authentication */
    axios.post('https://movie-api-db-30.herokuapp.com/users', {
      
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        if (response.status === 200) {
          setUsed(true);
        }
        else {
          window.open('/', '_self');
        }

      })
      .catch(e => {
        console.log(e);
      });
  };

  const setUsernameAndUsed = (e) => {
    setUsername(e.target.value);
    setUsed(null);
  }


  return (
    <Container className="registration-view" fluid="true">
      <h1 className="myflix-title">myFlix Registration</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="registration-form">
       
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" pattern="^[a-zA-Z0-9]{5,}" required value={username} onChange={e => setUsernameAndUsed(e)} />
          <Form.Control.Feedback type="invalid">
             Please choose a username that's at least 5 characters and is alphanumeric.
          </Form.Control.Feedback>
          {!used ? null
          :
          <Form.Text className="incorrect-text">
            Username is already being used.
          </Form.Text>}
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" value={password} required onChange={e => setPassword(e.target.value)} />
          <Form.Control.Feedback type="invalid">
             Please enter a password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$" value={email} required onChange={e => setEmail(e.target.value)} />
          <Form.Control.Feedback type="invalid">
             Please enter an email in the correct format.
          </Form.Control.Feedback>
        
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthdate</Form.Label>
          <Form.Control type="date"
           placeholder="Enter birthdate" min="1900-01-01" max={new Date().toISOString().split('T')[0]} 
           value={birthday} required onChange={e => setBirthday(e.target.value)} />
          <Form.Control.Feedback type="invalid">
             Please enter a birthdate.
          </Form.Control.Feedback>
        </Form.Group>
        <Button className="submit-button" variant="primary" type="submit">Submit</Button>
         
        <Form.Group className="login-group" controlId="formLogin">
          <Form.Text className="text-muted">Already have an account?</Form.Text>
          <Link to={`/`}>
            <Button className="login-link">Login here</Button>
          </Link>
        </Form.Group>
      </Form>
    </Container>
  );
}