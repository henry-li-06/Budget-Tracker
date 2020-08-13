import './../styles/home.css';
import React from 'react';
import Header from './Header.js'

function Home() {

  return (
    <div id='container'>
      <Header page={"home"} />
      <section id="main-graphic">
        <h1 className='graphics-text'>Monthly budgeting made easy</h1>
      </section>
      <p className='text'>Sign up to start budgeting for free with just an email.</p>
      <section id="feature-1">
        <h1 className='graphics-text'>Track your subscriptions</h1>
      </section>
      <p className="text">Netflix? Hulu? Spotify? Consolidate your records in one place.</p>
    </div>
  )

}

export default Home;