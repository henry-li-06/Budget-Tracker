import React from 'react';
import './styles/navbar.css';


class Navbar extends React.Component {
  render() {
    return (
      <section id="navbar">
        <ul>
          <li id="heading">Budget Tracker V1</li>
          <li>Home</li>
          <li>About</li>
          <li className="right">Log in</li>
          <li className="right">Sign up</li>

        </ul>
      </section>
    )


  }

}


export default Navbar;