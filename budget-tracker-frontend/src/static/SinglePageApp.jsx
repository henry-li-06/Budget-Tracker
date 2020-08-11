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
import img from './../images/budgettrackerimage.png';
import Header from './Header.jsx';

class SinglePageApp extends React.Component {

  render() {
    return (
      <HashRouter>
        <div className="App">
          <div className="content">
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/tracker" component={BudgetLists}></Route>

          </div>

        </div>
      </HashRouter>
    );
  }
}
export default SinglePageApp;