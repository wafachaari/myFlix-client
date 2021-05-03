import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'; 
import { Link } from 'react-router-dom';
export class DirectorView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }


  render() {
   
      const { director } = this.props;
    return (
      <Card className = "director-view" style={{ width: '32rem' }}>
       
        <Card.Body>
          <Card.Title className = "director-name">{director.Name}</Card.Title>
          <Card.Text className = "director-bio">{director.Bio}</Card.Text>
          <Card.Title className = "director-birth">{director.Birth}</Card.Title>
          <Card.Text className = "director-death">{director.Death}</Card.Text>
          
          <Link to = {`/`}>
            <Button className="back-button">Back</Button>
          </Link>
        </Card.Body>
      </Card>
    );


  }}
  DirectorView.propTypes = {
    director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string.isRequired,
    }).isRequired
  };