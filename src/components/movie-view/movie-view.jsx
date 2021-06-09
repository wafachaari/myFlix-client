import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { setFavorite } from '../../actions/actions';
import { connect } from 'react-redux';
import axios from "axios";
import { Link } from 'react-router-dom';
import './movie-view.scss';

const mapStateToProps = state => {
  const { favorite } = state;
  return { favorite };
};
export class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fav: false
    };
  }
  addFavorite(movie) {
    const token = localStorage.getItem("token");
    const url = `https://movie-api-db-30.herokuapp.com/users/${localStorage.getItem("user")}/movies/${movie._id}`;
    axios
      .post(url, "", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Added to favorites!");
        this.setfav();
        console.log(fav);
      });
  }

  setfav() {
    this.setState({
      fav: true
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
          {this.state.fav ?
            <ListGroup.Item>
              <Button variant="secondary" disabled>Favorited</Button>
            </ListGroup.Item>
            :
            <ListGroup.Item>
              <Button onClick={() => this.addFavorite(movie)}>Add to Favorites</Button>
            </ListGroup.Item>
          }
              <Link to={`/`}>
            <Button className="back-button">Back</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}
export default connect(mapStateToProps, { setFavorite })(MovieView);
