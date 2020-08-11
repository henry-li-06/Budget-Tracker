import React, {useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import img from './../images/budgettrackerimage.png';

const Header = () => {

    const [isLoggedIn, setLoggedIn] = useState(false)
    const [name, setName] = useState(null)

    useEffect(() => {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', 'http://127.0.0.1:3000');

        fetch('http://127.0.0.1:5000/user/login/session', {
            mode : 'cors',
            method : 'GET',
            credentials : 'include',
            headers : headers
        })
        .then(response => response.json())
        .then(data => {
            setLoggedIn(data.isLoggedIn);
            setName(data.name)
        })
        .catch(error => console.log('ERROR'))
    }, [])

    function handleClick() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', 'http://127.0.0.1:3000');

        fetch('http://127.0.0.1:5000/user/login/logout', {
            mode : 'cors',
            method : 'DELETE',
            credentials : 'include',
            headers : headers
        })
        .then(response => response.json())
        .then(data => {
            setLoggedIn(false)
            // console.log(data)
        })
    }

    if(!isLoggedIn) {
        return (
            <ul id = 'list'>
                <li id="heading"><img src={img} alt='Budget Tracker' style={{ height: '40px' }} /> Budget Tracker</li>
                <li className="link"><NavLink exact to='/'>Home</NavLink></li>
                <li className="link"><NavLink to='/about'>About</NavLink></li>
                <li className="link"><NavLink to='/login'>Log in</NavLink></li>
                <li className="link"><NavLink to='/signup'>Sign up</NavLink></li>
            </ul>
        )
    }
    else {
        return (
            <ul id = 'list'>
                <li id="heading"><img src={img} alt='Budget Tracker' style={{ height: '40px' }} /> Budget Tracker</li>
                <li>Hi, { name }</li>
                <li><button id = 'logout' onClick = { handleClick }>Log Out</button></li>
            </ul>
        );
    }
}

export default Header;