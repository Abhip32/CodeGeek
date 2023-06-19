import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageNotFound from '../Assets/sadface.gif';

const NotFoundPage = () => {
  return (
    <Container>
      <Row className="align-items-center justify-content-center">
        <Col xs={12} md={6} className="text-center">
          <img src={PageNotFound} alt="Page Not Found"style={{width:"100%",height:"100%"}}/>
        </Col>
        <Col xs={12} md={6} className="text-center mb-4 mt-md-0">
          <h2>
            Page Not Found <br />
            <Link to="/">Go to Home</Link>
          </h2>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
