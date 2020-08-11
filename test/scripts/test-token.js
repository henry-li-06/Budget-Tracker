let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Origin', 'http://127.0.0.1:3000');

fetch('http://127.0.0.1:5000/user/expenses/all', {
    mode : 'cors',
    method : 'GET',
    credentials : 'include'
})
.then(response => response.json())
.then(data => document.write(JSON.stringify(data)))
.catch(error => document.write(error.message))
