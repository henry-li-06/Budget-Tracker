import React from 'react';
import { Redirect } from "react-router-dom";
import './../styles/login.css';
import Header from './Header'

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isValidLogin: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  render() {
    if (this.state.isValidLogin) {
      return (
        <Redirect to={{
          pathname: '/tracker'
        }}
        />
      )
    }

    return (

      <div className="container">
        <Header page={"login"} />
        <div id="header">
          Login with existing account
        </div>
        <div>
          <form>
            <div className="loginBox">
              <label>Username </label> <br></br>
              <input className="loginInput" ref={(a) => this._inputUsername = a} type="text" placeholder="Enter Username" onChange={this.handleChange} >
              </input>
            </div>
            <div className="loginBox">
              <label>Password </label> <br></br>
              <input className="loginInput" ref={(a) => this._inputPassword = a} type="password" placeholder="Enter Password" onChange={this.handleChange} >
              </input>
            </div>
            <button type='submit' onClick={this.handleSubmit}>Login</button>
          </form>
        </div>
      </div>

    )
  }

  async handleSubmit(event) {
    event.preventDefault();

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', 'http://127.0.0.1:3000');
    headers.append('Authorization', 'Basic ' + btoa(this.state.username + ':' + this.state.password));

    let response = await fetch('http://127.0.0.1:5000/user/login', {
      mode: 'cors',
      method: 'POST',
      headers: headers,
      credentials: 'include'
    })
    if (response.status === 200) this.setState({ isValidLogin: true })

  }

  handleChange() {
    this.setState({
      username: this._inputUsername.value,
      password: this._inputPassword.value
    });

  }
}

export default Login;