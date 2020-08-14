import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import './../styles/login.css';
import Header from './Header.js';

function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isValidLogin, setValidLogin] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault();

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', 'http://127.0.0.1:3000');
    headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));

    let response = await fetch('http://127.0.0.1:5000/user/login', {
      mode: 'cors',
      method: 'POST',
      headers: headers,
      credentials: 'include'
    })

    if (response.status === 200) setValidLogin(true)
  }

  return (


    isValidLogin
      ?
      <Redirect to={{
        pathname: '/tracker'
      }}
      />
      :
      <div className="container">
        <Header page={"login"} />
        <div id="header">
          Login with existing account
        </div>
        <div>
          <form>
            <div className="loginBox">
              <label>Username </label> <br></br>
              <input className="loginInput" value={username} type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} >
              </input>
            </div>
            <div className="loginBox">
              <label>Password </label> <br></br>
              <input className="loginInput" value={password} type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} >
              </input>
            </div>
            <button type='submit' onClick={handleSubmit}>Login</button>
          </form>
        </div>
      </div>


  )
}
export default Login;