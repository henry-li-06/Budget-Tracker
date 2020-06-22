function createExpense() {
    event.preventDefault();

    const description = document.getElementById('description').value
    const price = document.getElementById('price').value
    const date = document.getElementById('date').value

    const data = {
        'description' : description,
        'price' : price,
        'date' : date
    }

    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', 'http://127.0.0.1:3000');

    fetch('http://127.0.0.1:5000/user/expenses/new', {
        mode : 'cors',
        method : 'POST',
        credentials : 'include',
        body : JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => document.write(error.message))
    
}

document.getElementById('expense-form').addEventListener('submit', createExpense.bind(event))