function newUser() {
    // console.log('hello world')
    event.preventDefault();
    first_name = document.getElementById('first_name').value
    last_name = document.getElementById('last_name').value
    username = document.getElementById('username').value
    password = document.getElementById('password').value
    email = document.getElementById('email').value

    data = {
        'first_name' : first_name,
        'last_name' : last_name,
        'username' : username,
        'password' : password,
        'email' : email
    }

    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', 'http://127.0.0.1:3000');
    // headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));

    fetch('http://127.0.0.1:5000/user/new', {
        mode : 'cors',
        method : 'POST',
        headers: headers,
        body : JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log('Error: ' + error.message))
}

document.getElementById('new-user-form').addEventListener('submit', newUser.bind(event))