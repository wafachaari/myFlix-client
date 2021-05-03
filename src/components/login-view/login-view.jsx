import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
 import { Form, Button } from 'react-bootstrap';
 import axios from 'axios';
 import { BrowserRouter as Router, Route } from "react-router-dom";
 import './login-view.scss';
 
import { RegistrationView } from '../registration-view/registration-view';
 import { Link } from 'react-router-dom';
export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
// a POST request is made to the login endpoint of the myFlix API using Axios.
//the backend sends back the token and username
// update the user state so that the main view is rendered again and, 
// save authentication data in localStorage 
  const handleSubmit = (e) => { 
    e.preventDefault();
    console.log('topM');
      axios.post('https://movie-api-db-30.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      console.log(data,'typeData');
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };
   

  return (
    <Container className="login-view" fluid="true">
      <Form  >
        <Form.Group controlId="formBasicText">
         <Form.Label>username</Form.Label>
         <Form.Control type='text' 
         placeholder="Enter username"       
         value={username} 
         onChange={e => setUsername(e.target.value)} />
         
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
             <Form.Label>Password</Form.Label>
             <Form.Control type="password" placeholder="Password" value={password}  onChange={e => setPassword(e.target.value)}/>
      </Form.Group>
      <Button className="submit-button" variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
      </Form>


      <Form.Group className="registration-group" controlId="formRegistration">
          <Form.Text className="text-muted">Don't have an account?</Form.Text>
          <Link to={`/register`}>
            <Button className="register-link">Register here</Button>
          </Link>
        </Form.Group>
    </Container>
     
  );
}

LoginView.prototype={
  user: PropTypes.shape({
    username:PropTypes.string.isRequired,
     password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
 };
