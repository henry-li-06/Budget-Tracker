import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import './../styles/login.css';
import Header from './Header.js';
import background from './../images/nybackground.jpg';

function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isValidLogin, setValidLogin] = useState(false)
  const [requiresFeedback, setFeedback] = useState(false)

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

    if (response.status === 200) setValidLogin(true);
    else {
      document.getElementById('feedback').style.color = 'red';
    }
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
        <img src={background} style={{ minHeight: '100%', minWidth: '100%', position: 'fixed', top: '0', left: '0', zIndex: '-1', filter: 'brightness(50%)' }} />
        <div id="header">
          Login with an existing account
        </div>
        <div>
          <form>
            <div className="loginBox">
              <label className='loginLabel'>Username </label> <br></br>
              <input className="loginInput" value={username} type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} >
              </input>
              <label className='loginLabel'>Password </label> <br></br>
              <input className="loginInput" value={password} type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} >
              </input>
            </div>
            <p id='feedback'>Invalid username / password</p>
            <button type='submit' onClick={handleSubmit}>Login</button>

          </form>
        </div>
      </div>


  )
}
export default Login;