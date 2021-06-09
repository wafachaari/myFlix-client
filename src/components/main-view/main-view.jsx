import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, Form, NavbarBrand, NavItem } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import PropTypes from 'prop-types';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view'
import { ProfileView } from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import './main-view.scss';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedMovie: null,
      user: null,
      newRegistration: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (accessToken !== null) {
      this.props.setUser(user);
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://movie-api-db-30.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    this.props.setUser(authData.user.Username);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);

  }

  onRegister(newRegistration) {
    this.setState({
      newRegistration
    })
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLogOut(user) {
    this.props.setUser(user);
    localStorage.clear();
    window.open('/', '_self');
  }

  render() {
    let { movies, user } = this.props;
    return (
      <Router>
        <Container fluid className="container-main">
          <header>
            <Navbar bg="light" variant="light"
              collapseOnSelect
              fixed='top' expand="lg"  >
              <Navbar.Brand href="/" className="navbarbrand" >myFlix</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Form inline>
                  <NavItem>
                    <NavLink to="/" className="navitem" onClick={user => this.onLogOut(!user)}>Logout</NavLink >
                    <NavLink to={`/users/${localStorage.getItem('user')}`} className="naviten" >  Profile</NavLink >
                  </NavItem>
                </Form>
              </Navbar.Collapse>
            </Navbar>
          </header>
          <Row className="main-view justify-content-lg-center">
            <Route exact path="/" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              if (movies.length === 0) return <div className="main-view" />;
              return <MoviesList movies={movies} />;
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
            <Route path="/genres/:name" render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }
            } />
            <Route path="/users/:username" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              if (movies.length === 0) return <div className="main-view" />;
              return <ProfileView
                movies={movies}
                onLogOut={user => this.onLogOut(!user)}
              />
            }} />
          </Row>
        </Container>
      </Router>
    );
  }
}
const mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}
export default connect(mapStateToProps, { setMovies, setUser })(MainView);
MainView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }),
    })
  ),
  user: PropTypes.string.isRequired
};