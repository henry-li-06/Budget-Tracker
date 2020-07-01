function login() {
    event.preventDefault();
    username = document.getElementById('username').value
    password = document.getElementById('password').value

    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', 'http://127.0.0.1:3000');
    headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));

    fetch('http://127.0.0.1:5000/user/login', {
        mode : 'cors',
        method : 'POST',
        headers: headers,
        credentials : 'include'
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error.message))
}

document.getElementById('login-form').addEventListener('submit', login.bind(event))