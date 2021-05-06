import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import { Form, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom'
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Spinner from 'react-bootstrap/Spinner';
export class ProfileView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      password: "",
      userinfo: null,
      email: "",
      birthday: "",
      favoriteMovies: [],
      favorite: [],
      movies: "",
    };
  }

  formatDate(date) {
    if (date) date = date.substring(0, 10);
    return date;
  }
  componentDidMount() {
    console.log(localStorage.getItem('user'));
    console.log(localStorage.getItem('user'));
    this.getUserInfo(localStorage.getItem('user'), localStorage.getItem('token'));
  }

  getUserInfo(user, token) {
    console.log(localStorage.getItem("user"));
    let url =
      "https://movie-api-db-30.herokuapp.com/users/" +
      localStorage.getItem("user");
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data.FavoriteMovies),
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
    e.preventDefault();
    const url =
      "https://movie-api-db-30.herokuapp.com/users/" +
      localStorage.getItem("user");
    axios
      .put(
        url,
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
          
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        localStorage.setItem("user", response.data.Username);
        // props.setUsername(data.Username);
        alert("Your profile was updated successfully");
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log(e);
        //   alert("Username contains non alphanumeric characters - not allowed");
      });
  }


  removeFavorite(movie) {

    let URL = "https://movie-api-db-30.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/movies/" +
      movie;
    axios({
      method: 'delete',
      url: URL,
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        console.log(response);
        //  this.componentDidMount();
        this.getUserInfo(localStorage.getItem('user'), localStorage.getItem('token'));
      })
      .catch(e => {
        console.error(e);
      });
  }
  deregisterUser(e) {
    e.preventDefault();
    const url =
      "https://movie-api-db-30.herokuapp.com/users/" +
      localStorage.getItem("user");
    axios({
      method: 'delete',
      url: url,
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => {
        alert(" has been deleted");
        window.location.pathname = "/";
      })
      .catch(error => {
        console.error(error);
      })

  }
  setUsername(input) {
    this.username = input;

  }
  setPassword(input) {
    this.password = input;
  }

  setEmail(input) {
    this.email = input;
  }
  setBirthday(input) {
    this.birthday = input;
  }
  render() {

    const { movies, user, movie } = this.props;
    /* const favoriteMovieList = this.state.favoriteMovies.filter(movie =>  movie.id != id) 
     //this.setState({favoriteMovies:favoriteMovieList});
       */
   
    console.log(this.state.favoriteMovies);


    return (
      <Container className="profile-view" fluid="true">
        <h1 className="myflix-title">Update-UserInformation</h1>
        <Form>
          <Form.Group controlId="formBasicText">
            <Form.Label>username</Form.Label>
            <Form.Control type='text'
              defaultValue={this.state.username}
              onChange={e => this.setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"
              placeholder="Password"
              // defaultValue={this.state.password}

              onChange={e => this.setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              defaultValue={this.state.email}
              onChange={e => this.setEmail(e.target.value)}
              placeholder='Enter Email'
            />
          </Form.Group>
          <Form.Group controlId='formBasicBirthday'>
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type='date'
              defaultValue={this.state.birthday}
              onChange={(e) => setBirthday(e.target.value)}
              placeholder='Enter Birthday'
            />
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button className="update-button" variant="primary" type="submit" onClick={(e) => this.updateUser(e, this.username, this.password, this.email, this.birthday)} >
            update</Button>
          <Button className="deregister-button" variant="primary" type="submit" onClick={(e) => this.deregisterUser(e)} > deregister </Button>

        </Form>

       
        <div
          className="favoriteMovies"
          style={{
            float: "right",
            textAlign: "center",
            width: "24rem",
          }}
        >
          <h1>Favorite Movies</h1>
          {this.state.favoriteMovies.map((movie) => {
            return (
              <div key={movie._id}>
                <Card>
                  {movie}
                </Card>
                <Button onClick={() => this.removeFavorite(movie)}>
                  Remove
                      </Button>
              </div>
            );
          })}
        </div>
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
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired
  })
}
