import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//import ListGroup from 'react-bootstrap/ListGroup';
//import './genre-view.scss';
import { Link } from 'react-router-dom';

export class GenreView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }


  render() {
    const { genre } = this.props;
    return (
      <Card className = "genre-view" style={{ width: '32rem' }}>
        <Card.Body>
          <Card.Title className = "genre-name">{Genre.Name}</Card.Title>
          <Card.Text className = "genre-description">{Genre.Description}</Card.Text>
          <Link to = {`/`}>
            <Button className="back-button">Back</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired
};