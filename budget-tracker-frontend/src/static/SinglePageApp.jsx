import React from 'react';
import Home from './Home.js';
import './../styles/App.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import About from "./About.js";
import Login from "./Login.js";
import Signup from "./Signup.js"
import BudgetLists from './BudgetLists.js';



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