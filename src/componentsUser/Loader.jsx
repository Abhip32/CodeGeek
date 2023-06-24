
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Spinner from 'react-bootstrap/Spinner';
  
export default function Loader() {
  return (
    <div style={{ display: 'flex', minwidth:"100vw" , padding: 30, alignItems:"center",justifyContent:"center",minHeight:"100vh" }}>
      <Spinner animation="border" variant="primary" /> <br/>
    </div>
  );
}