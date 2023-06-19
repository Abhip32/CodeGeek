import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location=useLocation()

  if(location.pathname.includes("/Examination")||location.pathname.includes("/TestPage"))
  {
    return(null)
  }
  
    else{
      return (
      <footer className="footer">
      <Container>
        <Row>
          <Col md={6}>
            <p>Footer content goes here</p>
          </Col>
          <Col md={6}>
            <p>Additional footer content goes here</p>
          </Col>
        </Row>
      </Container>
    </footer>  );

    }
};

export default Footer;