 
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import './registration-view.scss';
import Container from 'react-bootstrap/Container';
export function RegistrationView(props){
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

    /*axios.post('https://movie-api-db-30.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('error registering the user')
    });
*/
    console.log(username, password, email, birthday);
   props.onRegister();
  };
 
  return (
    <Container className="registration-view" fluid="true">
      <h1 className="myflix-title">myFlix Registration</h1>
    <Form>
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

      <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter Email'
          />
       </Form.Group>   
     <Form.Group controlId='formBasicBirthday'>
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type='date'
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            placeholder='Enter Birthday'
          />
        </Form.Group>
    
        <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button className="submit-button" variant="primary"  type="submit" onClick={handleSubmit}>Submit</Button>
 </Form>
 <Form.Group>
 <Form.Text className="text-muted"> Already have an account?</Form.Text>
    <Button className="login-button" >login</Button>
  
 </Form.Group>
 </Container>
  );}

  RegistrationView.propTypes = {
    newRegistration: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
       email:PropTypes.string.isRequired,
      birthday: PropTypes.string.isRequired,
    }),
    onRegister: PropTypes.func.isRequired, 
    
  };