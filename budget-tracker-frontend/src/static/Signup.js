import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './../styles/login.css';
import Header from './Header.js';
import background from './../images/sfbackground.jpg';

function Signup() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isValidNewUser, setValidNewUser] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    document.getElementById('firstNameInput').style.borderColor = firstName === '' ? 'red' : 'gray';
    document.getElementById('lastNameInput').style.borderColor = lastName === '' ? 'red' : 'gray';
    document.getElementById('emailInput').style.borderColor = !(emailRegex.test(email)) ? 'red' : 'gray';
    document.getElementById('passwordInput').style.borderColor = !(passwordRegex.test(password)) ? 'red' : 'gray';

    if (firstName === '' || lastName === '' || !(emailRegex.test(email)) || !(passwordRegex.test(password))) return;



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
    else {
      let data = await response.json();
      document.getElementById('usernameInput').style.borderColor = data.invalidUsername ? 'red' : 'gray';
    }
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
        <img src={background} style={{ minHeight: '100%', minWidth: '100%', position: 'fixed', top: '0', left: '0', zIndex: '-1', filter: 'brightness(50%)' }} />
        <div id="header">
          Sign up to start using the budget tracker for free!
        </div>
        <form style={{ marginBottom: '2%' }}>
          <div className="loginBox">
            <label className='loginLabel'>First name</label> <br></br>
            <input className="loginInput" id="firstNameInput" value={firstName} type="text" placeholder="Enter First name" onChange={e => setFirstName(e.target.value)} >
            </input>

            <label className='loginLabel'>Last name</label> <br></br>
            <input className="loginInput" id="lastNameInput" value={lastName} type="text" placeholder="Enter Last name" onChange={e => setLastName(e.target.value)} >
            </input>

            <label className='loginLabel'>Email</label> <br></br>
            <input className="loginInput" id="emailInput" value={email} type="text" placeholder="Enter Email" onChange={e => setEmail(e.target.value)} >
            </input>

            <label className='loginLabel'>Username</label> <br></br>
            <input className="loginInput" id="usernameInput" value={username} type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} >
            </input>

            <label className='loginLabel'>Password</label> <br></br>
            <input className="loginInput" id="passwordInput" value={password} type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} >
            </input>
            <p style={{ color: 'orangered', fontSize: '12px', marginTop: '1%' }}>Password must be at least 8 characters, and include an upper case character, a lower case character, and a special character.</p>


          </div>
          <button type='submit' onClick={handleSubmit}>Sign up</button>
        </form>
      </div>
  )
}



export default Signup;