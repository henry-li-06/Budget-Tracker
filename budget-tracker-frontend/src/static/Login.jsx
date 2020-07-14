import React from 'react';
import './../styles/login.css';

class Login extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <form>
            <input id="itemInput" ref={(a) => this._inputItem = a} placeholder="Enter Item">
            </input>
            <input type="number" ref={(a) => this._inputCost = a} placeholder="Enter Amount">
            </input>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;