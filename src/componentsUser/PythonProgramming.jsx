import React from 'react'
import './ProgrammingPages.scss'
import {useLocation} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import {Button, Row, Col, Card} from 'react-bootstrap';
import PythonBanner from "../Assets/PythonBanner.png"

import Axios from 'axios';
import {useState, useEffect} from 'react';

function PythonProgramming() {
    const [id, setid] = useState("");
    const [problemsc, setProblemsc] = useState([]);

    useEffect(() => {

        const getProblems = async () => {
            try {
                const response = await Axios.get('http://localhost:8000/getAllProblems', {
                    params: {
                        language: "python3"
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
    return (<div className="languagePage">
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
                <Col md={6}><img src={PythonBanner}
                        width="768px"
                        height="256px"
                        alt="cover"/>
                </Col>
                <Col md={6}>
                    <div className="contentC">
                        <h3>Python Programming Language</h3>
                        <p>Python is a popular general-purpose programming language. It is used in machine learning, web development, desktop applications, and many other fields. Fortunately for beginners, Python has a simple, easy-to-use syntax. This makes Python a great language to learn for beginners.</p>
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
                                    origin: "/PythonProgrammingProblems"
                                }
                            })
                    }>Solve</Button>
                </Card.Body>
            </Card>))
        } </div>
    </div>)
}

export default PythonProgramming
