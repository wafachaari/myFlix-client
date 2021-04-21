 
import React, {useState} from 'react';
import PropTypes from 'prop-types';

export function RegistrationView(props){
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegister();
  };
 
  return (
    <form>
    <label>
      Username:
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
    </label>
    <label>
      Password:
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
    </label>
    <label>
      Email:
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
    </label>
    <label>
      Birthday:
      <input type="birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
    </label>




    <button type="submit" onClick={handleSubmit}>Submit</button>
  </form>
  );}

RegistrationView.PropTypes={
  newRegistration: PropTypes.shape({
  username:PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email:PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,}),
  newRegistration:PropTypes.func.isRequired,
};
