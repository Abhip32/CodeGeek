import React from 'react'
import './ProgrammingPages.scss'
import {useLocation} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import {Button, Row, Col} from 'react-bootstrap';
import CppBanner from "../Assets/CPPBanner.png"
import Card from 'react-bootstrap/Card';
import Axios from 'axios';
import {useState, useEffect} from 'react';

function CppProgramming() {
    const [id, setid] = useState("");
    const [problemsc, setProblemsc] = useState([]);

    useEffect(() => {

        const getProblems = async () => {
            try {
                const response = await Axios.get('http://localhost:8000/getAllProblems', {
                    params: {
                        language: "cpp"
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
                <Col md={5}>
                    <img src={CppBanner}
                        alt="cover"/>

                </Col>

                <Col md={5}>
                    <div className="contentC">
                        <h3>C++ Programming Language</h3>
                        <p>C++ is a powerful general-purpose programming language. It can be used to develop operating systems, browsers, games, and so on. C++ supports different ways of programming like procedural, object-oriented, functional, and so on. This makes C++ powerful as well as flexible</p>
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
                                    origin: "/CppProgrammingProblems"
                                }
                            })
                    }>Solve</Button>
                </Card.Body>
            </Card>))
        } </div>
    </div>)
}

export default CppProgramming
