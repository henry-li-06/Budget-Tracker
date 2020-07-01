import React from 'react';
import './../styles/about.css';

class About extends React.Component {
  render() {
    return (
      <div>
        <h1 id='heading'>Never forget a subscription again.</h1>
        <div className='container'>
          <section id='graphic'>
          </section>
          <section id='text'>

            <p className='paragraph'>Simplify the way you manage your subscriptions.</p>
            <p className='paragraph'>Input monthly subscriptions.</p>
            <p className='paragraph'>Enter a budget.</p>
            <p className='paragraph'>Display renewal dates.</p>
            <p className='paragraph'>Keep track of monthly expenses.</p>

          </section>
        </div>
      </div>
    )


  }

}


export default About;