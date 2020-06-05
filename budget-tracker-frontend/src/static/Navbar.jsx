import React from 'react';
import './../styles/navbar.css';


class Navbar extends React.Component {
  render() {
    return (
      <section id="navbar">
        <ul>
          <li id="heading">Budget Tracker V1</li>
          <li className="link">Home</li>
          <li className="link">About</li>
          <li className="link">Log in</li>
          <li className="link">Sign up</li>

        </ul>
      </section>
    )


  }

}


export default Navbar;