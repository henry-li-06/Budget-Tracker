import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './../styles/login.css';
import Header from './Header.js';


function Signup() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isValidNewUser, setValidNewUser] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    const data = {
      'first_name': firstName,
      'last_name': lastName,
      'username': username,
      'password': password,
      'email': email,
    }

    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', 'http://127.0.0.1:3000');

    let response = await fetch('http://127.0.0.1:5000/user/new', {
      mode: 'cors',
      method: 'POST',
      headers: headers,
      credentials: 'include',
      body: JSON.stringify(data)
    })
    // console.log(response.json())
    if (response.status === 201) setValidNewUser(true)
  }


  return (
    isValidNewUser
      ?
      <Redirect to={{
        pathname: '/tracker'
      }}
      />
      :
      <div className="container">
        <Header page={"signup"} />
        <div id="header">
          Sign up to start using the budget tracker for free!
        </div>
        <form>
          <div className="loginBox">
            <label>First name</label> <br></br>
            <input id="firstNameInput" value={firstName} type="text" placeholder="Enter First name" onChange={e => setFirstName(e.target.value)} >
            </input>
          </div>
          <div className="loginBox">
            <label>Last name</label> <br></br>
            <input id="lastNameInput" value={lastName} type="text" placeholder="Enter Last name" onChange={e => setLastName(e.target.value)} >
            </input>
          </div>
          <div className="loginBox">
            <label>Email</label> <br></br>
            <input id="emailInput" value={email} type="text" placeholder="Enter Email" onChange={e => setEmail(e.target.value)} >
            </input>
          </div>
          <div className="loginBox">
            <label>Username</label> <br></br>
            <input id="usernameInput" value={username} type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} >
            </input>
          </div>
          <div className="loginBox">
            <label>Password</label> <br></br>
            <p>Password must be at least 8 characters, and include at least 1 upper case character, 1 lower case character, and 1 symbol.</p>
            <input id="passwordInput" value={password} type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} >
            </input>
          </div>
          <button type='submit' onClick={handleSubmit}>Sign up</button>
        </form>
      </div>
  )
}



export default Signup;