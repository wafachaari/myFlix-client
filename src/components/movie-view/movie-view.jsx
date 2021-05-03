import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { Form, Button, CardDeck } from 'react-bootstrap';
 
export class MovieView extends React.Component {
  

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }
  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }
  render() {
    const { movie, onBackClick } = this.props;

    return (


      <Card className="movie-view" style={{ width: '32rem' }}>
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Text className="movie-title">{movie.Title}</Card.Text>
        <Card.Text className="movie-description">{movie.Description}</Card.Text>
        <ListGroup  >
            <ListGroup.Item>Genre: {movie.Genre.Name}</ListGroup.Item>
            <ListGroup.Item>Director: {movie.Director.Name}</ListGroup.Item>
            
        </ListGroup>
      </Card.Body>
      </Card>
      /*<div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>

        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <Link to={`/directors/${movie.Director.Name}`}>
  <Button variant="link">Director</Button>
</Link>

<Link to={`/genres/${movie.Genre.Name}`}>
  <Button variant="link">Genre</Button>
</Link>
        <button onClick={() => { onBackClick(null); }}>Back</button>

      </div>*/
    );
  }
}

MovieView.propTypes = {
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
 // onMovieClick: PropTypes.func.isRequired
};