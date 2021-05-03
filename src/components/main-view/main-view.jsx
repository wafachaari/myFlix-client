import React from 'react';
import axios from 'axios';
import {MovieCard} from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { ProfileView } from '../profile-view/profile-view';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import {Navbar,Nav,Form,FormControl} from 'react-bootstrap';
import { LoginView } from '../login-view/login-view';
import {RegistrationView} from '../registration-view/registration-view'
import Row from 'react-bootstrap/Row';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import './main-view.scss';
// create MainView component using the generic React.Component template as its foundation.
//render ->returns the visual representation of the component(should contain only one root element)
export class MainView extends React.Component {
  //add a movies state that will hold the list of movies
  //s constructor method to create the component
  constructor() {
    super();
   this.state = {
      movies: [ ],
      selectedMovie: null,
      user: null,
      newRegistration:null,
    }; }
    componentDidMount() {
      let accessToken = localStorage.getItem('token');
  if (accessToken !== null) {
    this.setState({
      user: localStorage.getItem('user')
    });
    this.getMovies(accessToken);
  }
    }
   
    onLoggedIn(authData) {console.log("dd");
      console.log(authData);
      this.setState({
        user: authData.user.Username
      });
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);
      this.getMovies(authData.token);
    } 
    //
//The moment a user logs in, a GET request is made to the “movies” 
//endpoint by passing the bearer authorization in the header of the HTTP request (the getMovies method is called)
    
    getMovies(token) {
      axios.get('https://movie-api-db-30.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }


  onRegister(newRegistration)
  {
    this.setState({
newRegistration
    })
  }
    
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }
    render() {

    const { movies, selectedMovie,user,newRegistration,button } = this.state;
    return (
      <Router>
        
<Container fluid className="container-main">
     <header>
<Navbar bg="dark"
 collapseOnSelect
  fixed='top' expand="lg" variant="dark">
  <Navbar.Brand href="/" >myFlix</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
    <Button variant="outline-success">Search</Button>
           </Nav>
    <Form inline>
     
      <Link to={`/`}>  
       <Button variant="outline-success" onClick={() => { this.onLoggedOut() }}>Logout</Button>
       </Link>
      <Link to={`/users/${localStorage.getItem('user')}`}>
                <Button variant="outline-success"  >Your Profile</Button>
              </Link>
    </Form>
  </Navbar.Collapse>
</Navbar>
</header>
 
<Row className="main-view justify-content-lg-center">
<Route exact path="/" render={() => {
           if (!user)  return  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            
           if (movies.length === 0) return <div className="main-view" />;
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
 <Route path="/register" render={() => <RegistrationView />} />
 
 <Route path="/movies/:movieId" render={({ match }) => {
            return <Col md={8}>
               <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                  </Col>
          }} />
  <Route path="/directors/:name" render={({ match, history }) => {
           if (movies.length === 0) return <div className="main-view" />;
          return <Col md={8}>
          <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
          </Col>
}
} />



 
          <Route
              path="/genres/:name"
              render={({ match }) => {
                if (!movies) return <div className="main-view" />;
                return (
                  <GenreView
                    genre={movies.find(
                      (m) => m.Genre.Name === match.params.name
                    )}
                    movies={movies}
                  />
                );
              }}
            />
<Route path="/users/:username" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              if (movies.length === 0) return <div className="main-view" />;
              return <ProfileView onLogOut={user => this.onLogOut(!user)} />
            }} />
     </Row>
      </Container>
      </Router>
 
    );
  }

}
/*
MainView.propTypes = {
  movies: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name:PropTypes.string.isRequired,
      Description:PropTypes.string.isRequired,

    }),
    Director:PropTypes.shape({
      Name:PropTypes.string.isRequired,

    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string,
  }),

  }).isRequired,
/*onMovieClick: PropTypes.func.isRequired*/


