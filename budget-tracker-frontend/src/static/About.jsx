import React from 'react';
import './../styles/about.css';
import Header from './Header';
import aboutImage from './../images/about-image.png';
import step3 from './../images/step3.png'

class About extends React.Component {
  render() {
    return (
      <div>
        <Header page={"about"} />
        <h1 id='heading'>Never forget a subscription again.</h1>


        <img src={step3} style={{ maxWidth: '1000px' }} />
        <div id='text' style={{ textAlign: "center" }} >

          <p className='paragraph'>Simplify the way you manage your subscriptions.</p>
          <p className='paragraph'>Input monthly subscriptions.</p>
          <p className='paragraph'>Keep track of total expenses.</p>

        </div>







      </div>
    )


  }

}


export default About;