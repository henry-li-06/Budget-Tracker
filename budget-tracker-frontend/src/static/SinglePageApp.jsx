import React from 'react';
import Home from './Home.jsx';
import './../styles/App.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import About from "./About.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx"
import BudgetLists from './BudgetLists.jsx';

class SinglePageApp extends React.Component {

  render() {
    return (
      <HashRouter>
        <div className="App">
          <header className="header">
            <div className="container">
              <section id="navbar">
                <ul id="list">
                  <li id="heading">Budget Tracker</li>
                  <li className="link"><NavLink exact to='/'>Home</NavLink></li>
                  <li className="link"><NavLink to='/about'>About</NavLink></li>
                  <li className="link"><NavLink to='/login'>Log in</NavLink></li>
                  <li className="link"><NavLink to='/signup'>Sign up</NavLink></li>
                </ul>
              </section>
            </div>
          </header>
          <div className="content">
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path='/tracker' component={BudgetLists}></Route>

          </div>

        </div>
      </HashRouter>
    );
  }
}
export default SinglePageApp;