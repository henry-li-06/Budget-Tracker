import React from 'react';
import './../styles/about.css';

class About extends React.Component {
  render() {
    return (
      <div className='container'>
        <section id='graphic'>
        </section>
        <section id='text'>
          <h1 id='heading'>Never forget a subscription again.</h1>
          <p id='paragraph'>Simplify the way you manage your subscriptions.</p>
          <p>Input monthly subscriptions.</p>
          <p>Enter a budget.</p>
          <p>Display renewal dates.</p>
          <p>Keep track of monthly expenses.</p>

        </section>

      </div>
    )


  }

}


export default About;