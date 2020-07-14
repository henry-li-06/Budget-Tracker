function createExpense() {
    event.preventDefault();

    const title = document.getElementById('title').value
    const price = document.getElementById('price').value
    const date = document.getElementById('date').value
    const category = document.getElementById('category').value

    const data = {
        'title' : title,
        'price' : price,
        'date' : date,
        'category' : category

    }

    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', 'http://127.0.0.1:3000');

    fetch('http://127.0.0.1:5000/user/budget/new', {
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