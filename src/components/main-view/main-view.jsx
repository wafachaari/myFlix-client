import React from 'react';
import axios from 'axios';
import {MovieCard} from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import {RegistrationView} from '../registration-view/registration-view'
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
 
      setSelectedMovie(movie) {
      this.setState({
        selectedMovie: movie
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
    
    
    render() {
    const { movies, selectedMovie,user,newRegistration } = this.state;

/*if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
if (!newRegistration)
      return <RegistrationView onRegister={(newRegistration) => this.onRegister(newRegistration)} />;


*/
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
          ))
        }
      </div>
    );
  }

}
