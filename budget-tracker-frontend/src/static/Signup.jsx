import React from 'react';
import { Redirect } from 'react-router-dom';
import './../styles/login.css'

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      isValidNewUser: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    if (this.state.isValidNewUser) {
      return (
        <Redirect to={{
          pathname: '/tracker'
        }}
        />
      )
    }

    return (
      <div className="container">
        <div id="header">
          Sign up to start using the budget tracker for free!
        </div>
        <form className = 'loginContainer'>

            <label>First name</label> 
            <input className = 'signupInput' id="firstNameInput" ref={(a) => this._inputFirstName = a} type="text" placeholder="Enter First name" onChange={this.handleChange} >
            </input>

            <label>Last name</label> 
            <input className = 'signupInput' id="lastNameInput" ref={(a) => this._inputLastName = a} type="text" placeholder="Enter Last name" onChange={this.handleChange} >
            </input>

            <label>Email</label> 
            <input className = 'signupInput' id="emailInput" ref={(a) => this._inputEmail = a} type="text" placeholder="Enter Email" onChange={this.handleChange} >
            </input>

            <label>Username</label> 
            <input className = 'signupInput' id="usernameInput" ref={(a) => this._inputUsername = a} type="text" placeholder="Enter Username" onChange={this.handleChange} >
            </input>
 
            <label>Password</label> 
            <input className = 'signupInput' id="passwordInput" ref={(a) => this._inputPassword = a} type="password" placeholder="Enter Password" onChange={this.handleChange} >
            </input>

            <label>Confirm Password</label>
            <input className = 'signupInput' id = 'confirmPasswordInput' ref = {(a) => this._inputConfirmPassword} type = 'password' placeholder = 'Confirm Password' onChange = {this.handleChange} />
          <button type='submit' onClick={this.handleSubmit}>Sign up</button>
        </form>
      </div>
    )
  }

  handleChange() {
    this.setState({
      firstName: this._inputFirstName.value,
      lastName: this._inputLastName.value,
      username: this._inputUsername.value,
      password: this._inputPassword.value,
      email: this._inputEmail.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault();

    const data = {
      'first_name': this.state.firstName,
      'last_name': this.state.lastName,
      'username': this.state.username,
      'password': this.state.password,
      'email': this.state.email,
    }

    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', 'http://127.0.0.1:3000');

    var httpStatus;
    let response = await fetch('http://127.0.0.1:5000/user/new', {
        mode : 'cors',
        method : 'POST',
        headers: headers,
        credentials : 'include',
        body : JSON.stringify(data)
    })
    console.log(response.json())
    if(response.status === 201) this.setState({ isValidNewUser : true })

  }
}

export default Signup;