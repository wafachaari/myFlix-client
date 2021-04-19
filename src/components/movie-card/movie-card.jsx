 
  //movie in const { movie } = this.props is the name of the prop used in <MovieCard … />.
  import React from 'react';

  export class MovieCard extends React.Component {
   
  render() {
    const { movie, onMovieClick } = this.props;

    return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>;
  }
  }
