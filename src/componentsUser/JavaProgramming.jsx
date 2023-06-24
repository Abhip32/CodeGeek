import React from 'react'
import './ProgrammingPages.scss'
import {useLocation} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import {Button, Row, Col,Spinner} from 'react-bootstrap';
import JavaBanner from '../Assets/JavaBanner.png';
import Card from 'react-bootstrap/Card';


import Axios from 'axios';
import {useState, useEffect} from 'react';

function JavaProgramming() {
    const [id, setid] = useState("");
    const [problemsc, setProblemsc] = useState([]);

    useEffect(() => {

        const getProblems = async () => {
            try {
                const response = await Axios.get('http://localhost:8000/getAllProblems', {
                    params: {
                        language: "java"
                    }
                });
                const data = await response.data
                console.log(data);
                setProblemsc(data);
            } catch (error) {
                console.error(error);
                // Handle any errors that occurred during the request
            }
        };


        getProblems()

    }, [])


    const location = useLocation();
    let navigate = useNavigate();;
    return (<div className="languagePage" style={{minHeight:"100vh"}}>
         {problemsc.length ==0 &&
          <center style={{height:"100vh"}}>
            <Spinner animation="border" role="status">
                 <span className="visually-hidden">Loading...</span>
            </Spinner>

          </center>
        }
        <button className="backC"
            onClick={
                () => navigate("/home", {
                    state: {
                        username: JSON.parse(localStorage.getItem('loginCookie')).username
                    }
                })
        }>Go Back</button>
        <div className="headingC">
            <Row>
                <Col md={5}>
                    <img src={JavaBanner}
                        width="768px"
                        height="256px"
                        alt="cover"/>

                </Col>
                <Col md={5}>
                    <div className="contentC">
                        <h3>Java Programming Language</h3>
                        <p>Java is a powerful general-purpose programming language. It is one of the most popular programming languages used to develop desktop and mobile applications, big data processing, embedded systems and so on.</p>
                    </div>
                </Col>
            </Row>
        </div>

        <div className="problemsC"> {
            problemsc.map((item, index) => (<Card ngfor="data in problemsC">
                <Card.Header className={
                    item.level.replace(" ", "")
                }> {
                    item.level
                }</Card.Header>
                <Card.Body>
                    <Card.Title> {
                        item.title
                    }</Card.Title>
                    <Card.Text> {
                        item.description
                    } </Card.Text>
                    {
                    item.solved.includes(JSON.parse(localStorage.getItem('loginCookie')).email) && <h6 id="status"
                        style={
                            {color: "green"}
                    }>
                        Solved
                    </h6>
                }
                    {
                    !item.solved.includes(JSON.parse(localStorage.getItem('loginCookie')).email) && <h6 id="status"
                        style={
                            {color: "red"}
                    }>
                        Unsolved
                    </h6>
                }
                    <Button variant="primary"
                        onClick={
                            () => navigate(`/problem/${
                                item.identifier
                            }`, {
                                state: {
                                    origin: "/JavaProgrammingProblems"
                                }
                            })
                    }>Solve</Button>
                </Card.Body>
            </Card>))
        } </div>
    </div>)
}

export default JavaProgramming
