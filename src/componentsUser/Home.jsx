import React from 'react'
import "./Home.scss";
import cover from '../Assets/a1.png';
import {BsInstagram, BsTwitter, BsFacebook, BsLinkedin} from 'react-icons/bs'

function Home() {
  return (
    <div>
      <div className='Home-Main'>
          <section className='Home-Intro'>
          <h1>Improve your coding skills.<br/><br/>
            <h4>
            The industry’s #1 website for 
            preparation of coding challenges.
            <br/>
            <br/>
            <br/>
            <BsInstagram style={{margin: '10px'}}/>
            <BsTwitter style={{margin: '10px'}}/>
            <BsFacebook style={{margin: '10px'}}/>
            <BsLinkedin style={{margin: '10px'}}/>
            </h4>
          </h1>
          <img id="launchimg" className='Home-Image' src={cover} alt="cover" width={"60%"}/>
          <br/>
          <br/>
          </section>
    </div>
    </div>
  )
}

export default Home