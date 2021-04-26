import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
 import { Form, Button } from 'react-bootstrap';
 import axios from 'axios';
 import { BrowserRouter as Router, Route } from "react-router-dom";
 import './login-view.scss';
 import { Link } from 'react-router-dom';
export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => { 
    e.preventDefault();
      axios.post('https://movie-api-db-30.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
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
             <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
      </Form.Group>
      <Button className="submit-button" variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
      </Form>


      <Form.Group>
 <Form.Text className="text-muted"> don't have an account?</Form.Text>
   
    <Button className="login-button" >register</Button>
    
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
