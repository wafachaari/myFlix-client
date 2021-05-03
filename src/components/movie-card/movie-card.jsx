 
  //movie in const { movie } = this.props is the name of the prop used in <MovieCard … />.
  import React from 'react';
  import PropTypes from 'prop-types';
  import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';
import { Link } from 'react-router-dom';

  export class MovieCard extends React.Component {
   
  render() {
    const { movie } = this.props;
return(
  <Card className="card"  style={{ width:'200'}}>
    
    <Card.Img variant="top" src={movie.ImagePath} />
     <Card.Body>
  <Card.Title className="movie-title">{movie.Title}</Card.Title>
  <Card.Text>{movie.Description}</Card.Text> 
  <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
</Card.Body>
  </Card>

    );
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
/*onMovieClick: PropTypes.func.isRequired*/
  };