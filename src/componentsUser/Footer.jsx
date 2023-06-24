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
        <footer className="footer bg-dark text-white p-5">
        <Container>
          <Row>
            <Col md={8}>
              <a href="/" style={{textDecoration:"none"}}><h3 className='WebsiteHeading m-2'><em style={{color: '#2196f3'}}>CODE</em><em style={{color: 'white'}}>GEEK</em></h3></a>
            </Col>
            <Col md={4} className='mt-3'>
            <h5>Made with React</h5>
            </Col>
          </Row>
        </Container>
      </footer>
     );

    }
};

export default Footer;