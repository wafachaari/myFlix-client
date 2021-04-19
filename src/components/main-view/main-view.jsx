import React from 'react';
import {MovieCard} from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
// create MainView component using the generic React.Component template as its foundation.
//render ->returns the visual representation of the component(should contain only one root element)
export class MainView extends React.Component {
  //add a movies state that will hold the list of movies
  //s constructor method to create the component
  constructor() {
    super();
    this.state = {
      movies: [
        {_id: 1, Title: 'Vertigo', Description: 'Vertigo is a 1958 American film noir psychological thriller film directed and produced by Alfred Hitchcock...', ImagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Vertigomovie.jpg/155px-Vertigomovie.jpg'},
        {
          _id: 2,
          Title: 'Family Plot',
          Description: 'A phony psychic/con artist and her taxi driver/private investigator boyfriend encounter a pair of serial kidnappers while trailing a missing heir in California......',
          ImagePath: 'https://upload.wikimedia.org/wikipedia/en/3/3a/Family_plot_movie_poster.jpg',
        },
        {_id: 3, Title: 'Sunchaser', Description: 'Michael Reynolds is a rich oncologist who has a one hundred seventy-five thousand dollar sports car, a multi-million dollar house, and a new boost in his career. Brandon Blue Monroe is a dying patient who kidnaps Reynolds. They are going to a legendary Navajo healing place while a manhunt closes in. Soon the men get closer in understanding, and to the place that may save them both.....', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/2/2b/Sunchaser-Theatrical_Poster.jpg'},
      ],
      selectedMovie: null
    };
  }
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  } render() {
    const { movies, selectedMovie } = this.state;


    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

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
