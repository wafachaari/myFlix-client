import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import './profile-view.scss'
export class ProfileView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      validated: null,
      Password: "",
      userinfo: null,
      email: "",
      birthday: "",
      favoriteMovies: [],
      favorite: [],
      movies: "",
      onLogOut: null,
    };
  }

  formatDate(date) {
    if (date) date = date.substring(0, 10);
    return date;
  }

  componentDidMount() {
    this.getUserInfo(localStorage.getItem('user'), localStorage.getItem('token'));
  }

  getUserInfo(user, token) {
    let url =
      "https://movie-api-db-30.herokuapp.com/users/" +
      localStorage.getItem("user");
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: this.formatDate(response.data.Birthday),
          favoriteMovies: response.data.FavoriteMovies,
        });
      });
  }

  updateUser(e, username, password, email, birthday) {
    console.log(birthday);
    e.preventDefault();
    axios({
      method: 'put',
      url: `https://movie-api-db-30.herokuapp.com/users/${localStorage.getItem('user')}`,
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      data: {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      }
    })
      .then((response) => {
        localStorage.setItem("user", response.data.Username);
        alert("Your profile was updated successfully");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeFavorite(movie) {
    axios({
      method: 'delete',
      url: `https://movie-api-db-30.herokuapp.com/users/${localStorage.getItem('user')}/movies/${movie}`,
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        this.getUserInfo(localStorage.getItem('user'), localStorage.getItem('token'));
      })
      .catch(e => {
        console.error(e);
      });
  }

  deregisterUser(e) {
    e.preventDefault();
    axios({
      method: 'delete',
      url: `https://movie-api-db-30.herokuapp.com/users/${localStorage.getItem('user')}`,
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => {
        alert(" account deleted");
        this.props.onLogOut(true);

      })
      .catch(error => {
        console.error(error);
      })
  }

  setUsername(input) {
    this.state.username = input;
  }

  setPassword(input) {
    this.state.password = input;
  }

  setEmail(input) {
    this.state.email = input;
  }
  setBirthday(input) {
    console.log(this.state.birthday);
    this.state.birthday = input;
  }
  render() {

    const { movies, user, movie, validated } = this.props;
    const favoriteMovieList = movies.filter((movie) => {
      return this.state.favoriteMovies.includes(movie._id);
    });
    return (
      <Container className="profile-view" fluid="true">
        <h1 className="myflix-title">Update-UserInformation</h1>
        <Form noValidate validated={validated} onSubmit={(e) => this.updateUser(e, this.state.username, this.state.password, this.state.email, this.state.birthday)} className="profile-form">
          <Form.Group controlId="formBasicText"  >
            <Form.Label>username</Form.Label>
            <Form.Control type='text' readOnly
              defaultValue={this.state.username}
              onChange={e => this.setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"
              placeholder="Password"
              defaultValue=""
              required
              placeholder="Enter a new password"
              onChange={e => this.setPassword(e.target.value)} />
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$" required
              defaultValue={this.state.email}
              onChange={e => this.setEmail(e.target.value)}
              placeholder='Enter Email'
            />   <Form.Control.Feedback type="invalid">
              Please enter an email in the correct format.
          </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId='formBasicBirthday'>
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type='date'
              defaultValue={this.state.birthday}
              onChange={(e) => this.setBirthday(e.target.value)}
              placeholder='Enter Birthday'
            />
          </Form.Group>

          <Button className="update-button" variant="primary" type="submit">
            update</Button>
          <Button className="deregister-button" variant="primary" type="submit" onClick={(e) => this.deregisterUser(e)} > deregister </Button>
        </Form>
        <Container className="profile-view" fluid="true">
          <h1 className="myflix-title">Favorite Movies</h1>
          <ListGroup className="favorites-groups" variant="flush">
            {favoriteMovieList.length === 0 && <ListGroup.Item>You have no favorite movies.</ListGroup.Item>}
            {favoriteMovieList.map((movie) => {
              return (
                // <div key={movie._id}>
                <ListGroup.Item key={movie.title} className="favorite-movies">
                  <div>
                    {movie.Title}
                  </div>
                  <div className="delete-div">
                    <Button onClick={() => this.removeFavorite(movie._id)}>
                      Remove
                      </Button>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Container>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
      })
    ),
    Username: PropTypes.string.isRequired,
    // Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired
  }),
  movies: PropTypes.array.isRequired,
  favoriteMovies: PropTypes.array,
}