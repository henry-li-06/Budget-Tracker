let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Origin', 'http://127.0.0.1:3000');

fetch('http://127.0.0.1:5000/user/login/refresh', {
    mode : 'cors',
    method : 'GET',
    credentials : 'include'
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => document.write(error.message))