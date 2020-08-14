import React from 'react';
import './../styles/about.css';
import Header from './Header.js';
import step3 from './../images/step3.png';
import github from './../images/GitHub-Mark.png'

function About() {

  return (
    <div>
      <Header page={"about"} />
      <div className='about-container'>
        <section>
          <img src={step3} style={{ maxWidth: '85%' }} />
        </section>
        <section id='text'>
          <h1 id='heading'>Easily track your expenses.</h1>
          <p className='paragraph'>Simplify the way you manage your subscriptions.</p> <br />
          <p className='paragraph'>Input monthly subscriptions.</p> <br />
          <p className='paragraph'>Keep track of total expenses.</p>

        </section>

      </div>
      <div id="github">
        <a href='https://github.com/henryli6/Budget-Tracker' target="_blank" rel="noopener noreferrer">
          <img id='github-logo' src={github} style={{ width: '10%' }} />
          <p className='paragraph' style={{ color: 'deepskyblue' }}>View source code on Github</p>
        </a>
      </div>
    </div>

  )
}


export default About;