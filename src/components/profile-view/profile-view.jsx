import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import { Form, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';
import ListGroup from 'react-bootstrap/ListGroup';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Spinner from 'react-bootstrap/Spinner';
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
   /* if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
        show: null
      })
      return;
    }*/
    console.log("ss");

    e.preventDefault();
    //  const url =`https://movie-api-db-30.herokuapp.com/users/${localStorage.getItem("user")}`
    console.log(email);
    console.log(localStorage.getItem('user'));

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
        console.log("ll");
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

    const { movies, user, movie,validated } = this.props;
    //  const favoriteMovieList = this.state.favoriteMovies.filter(movie =>  movie._id != id) 
    //this.setState({favoriteMovies:favoriteMovieList});
    const favoriteMovieList = movies.filter((movie) => {
      return this.state.favoriteMovies.includes(movie._id);
    });

    console.log(this.state.favoriteMovies);


    return (

      <Container className="profile-view" fluid="true">
        <h1 className="myflix-title">Update-UserInformation</h1>

        <Form noValidate validated={validated} onSubmit={(e) => this.updateUser(e, this.username, this.password, this.email, this.birthday)} className="profile-form">

          <Form.Group controlId="formBasicText">
            <Form.Label>username</Form.Label>
            <Form.Control type='text'
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
              onChange={(e) => setBirthday(e.target.value)}
              placeholder='Enter Birthday'
            />
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
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
                <div key={movie._id}>
                  <div>
                    {movie.Title}
                  </div>
                  <div className="delete-div">
                    <Button onClick={() => this.removeFavorite(movie._id)}>
                      Remove
                      </Button>
                  </div>
                </div>
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