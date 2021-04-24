import React from 'react';
import axios from 'axios';
import {MovieCard} from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {Navbar,Nav,Form,FormControl} from 'react-bootstrap';
import { LoginView } from '../login-view/login-view';
import {RegistrationView} from '../registration-view/registration-view'
import Row from 'react-bootstrap/Row';
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
    componentDidMount(){
      axios.get('https://movie-api-db-30.herokuapp.com/movies')
        .then(response => {
          this.setState({
            movies: response.data
          });
        })
        .catch(error => {
          console.log(error);
        });
       
    }
 
     
    onLoggedIn(user) {
      this.setState({
        user
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

    render() {

    const { movies, selectedMovie,user,newRegistration } = this.state;

//if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
if (!newRegistration)
      return <RegistrationView onRegister={(newRegistration) => this.onRegister(newRegistration)} />;

 
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view-class">
     <header>
<Navbar bg="dark"
 collapseOnSelect
  fixed='top' expand="lg" variant="dark">
  <Navbar.Brand href="#Movies" >myFlix</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#Moives">Movies</Nav.Link>
      <Nav.Link href="#link">Account</Nav.Link>
      <Nav.Link href="#link">log out</Nav.Link>
       
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
</header>
<Container fluid className="container-main">
<Row className="main-view justify-content-lg-center">
{selectedMovie
      ? (
        <Col  >
          <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
        </Col>
      )
      : movies.map(movie => (
        <Col md={3}>
          <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
        </Col>
      ))
    }
      
     </Row>
      </Container></div>
    );
  }

}
