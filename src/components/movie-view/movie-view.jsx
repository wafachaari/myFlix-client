import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { Form, Button, CardDeck } from 'react-bootstrap';
import { setFavorite } from '../../actions/actions';
import { connect } from 'react-redux';
import axios from "axios";
const mapStateToProps = state => {
  const { favorite } = state;
  console(state);
  return { favorite };
};

export class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://movie-api-db-30.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/movies/" +
      movie._id;

    console.log(token);

    axios
      .post(url, "", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        console.log("Added to favorites!");
        console.log(this.props);
        props.setFavorite(true);

        console.log(this.props);

      });
  }


  render() {

    const { movie, favorite } = this.props;

    if (!movie) return null;

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
          <ListGroup.Item>




            {favorite ?
              <ListGroup.Item>
                <Button variant="secondary" disabled>Favorited</Button>
              </ListGroup.Item>
              :
              <ListGroup.Item>
                <Button onClick={() => this.addFavorite(movie)}>Add to Favorites</Button>
              </ListGroup.Item>
            }


          </ListGroup.Item>

        </Card.Body>
      </Card>
    );
  }
}

export default connect(mapStateToProps, { setFavorite })(MovieView);
