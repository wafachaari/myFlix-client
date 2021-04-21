 
  //movie in const { movie } = this.props is the name of the prop used in <MovieCard … />.
  import React from 'react';
  import PropTypes from 'prop-types';

  export class MovieCard extends React.Component {
   
  render() {
    const { movie, onMovieClick } = this.props;

    return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>;
  }
  }

  
  MovieCard.propTypes = {
    movie: PropTypes.shape({
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
    onMovieClick: PropTypes.func.isRequired
  };