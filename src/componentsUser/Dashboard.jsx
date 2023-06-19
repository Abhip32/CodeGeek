import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Axios from 'axios';
import "./Dashboard.scss";
import { jsPDF } from 'jspdf';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { SiCplusplus, SiC, SiJava, SiPython } from 'react-icons/si';
import { IoMdRibbon } from 'react-icons/io';
import certi from "../Assets/White Cute Modern Appreciation Certificate (1) (1).png"
import { Buffer } from 'buffer';

function Dashboard() {
  const name = useParams();
  console.log(name.uid);
  const [userData, setUserData] = useState({
    profileImage: '',
    email: '',
    phoneno: '',
    bio: '',
    id: '',
    c: [],
    cpp: [],
    java: [],
    python: [],
    c_Status: "",
    cpp_Status: "",
    java_Status: "",
    python_Status: "",
  });

  useEffect(() => {
    const getUserInfo = async() =>
    {
      const response =await Axios.post('http://localhost:8000/getAllUserInfo', {
        user: JSON.parse(localStorage.getItem('loginCookie')).email,
      })
        const data =await response.data;
        setUserData((prevData) => ({
          ...prevData,
          phoneno: data.phone,
          name:data.name,
          bio: data.bio,
          c: data.c_points,
          cpp: data.cpp_points,
          java: data.java_points,
          python: data.python_points,
          c_Status: data.C_certificate,
          cpp_Status: data.Cpp_certificate,
          java_Status: data.Java_certificate,
          python_Status: data.Python_certificate,
        }));
      
    }

    getUserInfo();
  }, []);

  const Approve = (lang) => {
    console.log('approve');

    const studentname = JSON.parse(localStorage.getItem('loginCookie')).username;
    console.log(studentname);
    const eventname = lang;
    const current = new Date();
    const dateevent = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const filename = studentname + '_' + eventname;
    const doc = new jsPDF('landscape', 'mm', 'a4');

    doc.addImage(
      certi,
      'JPEG',
      0,
      0,
      297,
      210,
      '',
      'FAST'
    );
    doc.setFont('times');

    doc.setFontSize(56);
    doc.text(95, 60, 'Certificate');
    doc.setFontSize(26);
    doc.text(140, 80, 'This is to certify that');
    doc.setFontSize(46);
    doc.text(150, 100, studentname);
    doc.setFontSize(26);
    doc.text(90, 120, 'has successfully cleared the assessment for the skill');
    doc.text(150, 135, eventname);
    doc.setFontSize(16);
    doc.text(230, 180, 'Date : ' + dateevent);
    doc.save(filename + '.pdf');
  };

  const { c, cpp, java, python } = userData;

  const badges = [
    { points: c, icon: <SiC size={40} />, label: 'C Programming' },
    { points: cpp, icon: <SiCplusplus size={40} />, label: 'C++ Programming' },
    { points: java, icon: <SiJava size={40} />, label: 'Java Programming' },
    { points: python, icon: <SiPython size={40} />, label: 'Python Programming' },
  ];

  const certificates = [
    { lang: 'c', label: 'C Programming', status: userData.c_Status },
    { lang: 'cpp', label: 'C++ Programming', status: userData.cpp_Status },
    { lang: 'java', label: 'Java Programming', status: userData.java_Status },
    { lang: 'python3', label: 'Python Programming', status: userData.python_Status },
  ];

  console.log(badges);
  return (
    <div className="dashboardbody" style={{ backgroundColor: '#011333', overflowX: 'hidden' }}>
      <Row>
        <Col md={4}>
          <div className="dashboard-about" style={{ height: '95%',backgroundColor: "white",padding: "20px",margin: "20px",borderRadius: "20px",boxShadow: "3px 5px 18px white" }}>
            <img
              src={`data:image/jpeg;base64,${Buffer.from(JSON.parse(localStorage.getItem('loginCookie')).pic.data).toString(
                'base64'
              )}`}

              style={{width:"115px",height:"115px",borderRadius:"20px",boxShadow:"1px 1px 20px black",margin:"20px"}}
            />
            <h2>
              <p>{JSON.parse(localStorage.getItem('loginCookie')).username}</p>
            </h2>
            <hr />
            <h3>About</h3>
            <h6>Email : </h6>
            <p>{JSON.parse(localStorage.getItem('loginCookie')).email}</p>
            <h6>Phone No : </h6>
            <p>{userData.phoneno}</p>
            <h6>Bio : </h6>
            <p>{userData.bio}</p>
          </div>
        </Col>

        <Col md={7}>
          <Row
            style={{
              backgroundColor: 'white',
              padding: '20px',
              margin: '20px',
              borderRadius: '20px',
              boxShadow: '3px 5px 6px white',
              minHeight: '40vh',
            }}
          >
            <h2>Skill Badges</h2>
            <br />
            <div className={badges.every((badge) => badge.points == 0) ? 'container' : 'd-none'}>
              <div className="content">
                <h6 className="centered-text">No Badges</h6>
              </div>
            </div>

            {badges.map((badge, index) => (
              <Col key={index} className={badge.points > 0 ? 'd-block' : 'd-none'}>
                <div
                  className={
                    badge.points > 0 && badge.points < 5
                      ? 'medal Bronze'
                      : badge.points >= 5 && badge.points < 10
                      ? 'medal Silver'
                      : badge.points >= 10
                      ? 'medal Gold'
                      : null
                  }
                >
                  {badge.icon}
                </div>
                <br />
                <h6>{badge.label}</h6>
              </Col>
            ))}
          </Row>

          <Row
            style={{
              backgroundColor: 'white',
              padding: '20px',
              margin: '20px',
              borderRadius: '20px',
              boxShadow: '3px 5px 6px white',
              minHeight: '40vh',
            }}
          >
            <h2>Skill Certificates</h2>
            <br />

            <div className={certificates.every((cert) => cert.status.length === 0 || cert.status=="pending") ? 'container' : 'd-none'}>
              <div className="content">
                <h6 className="centered-text">No Certificates</h6>
              </div>
            </div>

            {certificates.map((cert, index) => (
              <Col key={index} className={cert.status.length > 0 && cert.status != "pending" ? 'd-block' : 'd-none'}>
                <Card className="certificate-card">
                  <Card.Header>
                    <div className="header-container">
                      <IoMdRibbon className="ribbon-icon" />
                      <h5 className="certificate-title">{cert.label}</h5>
                    </div>
                  </Card.Header>
                  <Card.Body>
                  
                      <div key={index} className="certificate-item">
                        <button onClick={()=>{Approve(cert.label)}}>Download</button>
                      </div>
                    
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
