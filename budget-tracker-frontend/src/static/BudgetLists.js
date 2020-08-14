import React, { useState, useEffect } from 'react';
import BudgetItems from './BudgetItems.js';
import getNewAccessToken from './../utils/utils.js';
import './../styles/budgetlists.css';
import Dashboard from './Dashboard.js';
import { v4 as uuid4 } from 'uuid';
import { Redirect } from 'react-router-dom';
import Header from './Header.js';

function BudgetLists() {

  const [items, setItems] = useState([])
  const [isAuthorized, setAuthorized] = useState(true)
  const [total, setTotal] = useState(0)
  const [subscriptions, setSubscriptions] = useState(0)
  const [food, setFood] = useState(0)
  const [housing, setHousing] = useState(0)
  const [entertainment, setEntertainment] = useState(0)
  const [medical, setMedical] = useState(0)
  const [other, setOther] = useState(0)
  const [greatest, setGreatest] = useState("None")

  const [inputCategory, setInputCategory] = useState('')
  const [date, setDate] = useState('')
  const [cost, setCost] = useState('')
  const [item, setItem] = useState('')

  useEffect(() => {
    getItems()
  }, [])

  async function getItems() {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', 'http://127.0.0.1:3000');

    let response = await fetch('http://127.0.0.1:5000/user/budget', {
      mode: 'cors',
      method: 'GET',
      headers: headers,
      credentials: 'include'
    })

    if (response.status === 401) {
      if (await getNewAccessToken()) {
        setAuthorized(true);
      }
      else {
        setAuthorized(false)
        return;
      }
    }

    let data = await response.json()
    setItems(data.budget_items)
    setTotal(data.total_cost)
    setSubscriptions(data.category_costs['subscriptions'])
    setFood(data.category_costs['food'])
    setHousing(data.category_costs['housing'])
    setEntertainment(data.category_costs['entertainment'])
    setMedical(data.category_costs['medical'])
    setOther(data.category_costs['other'])
    setGreatest(data.greatest_category)
  }

  function addItem(e) {
    let itemArray = items;
    const key = uuid4();
    if (item !== "" && cost !== "" && cost > 0.00 && inputCategory !== "" && date !== "") {

      itemArray.unshift({
        name: item,
        cost: cost,
        category: inputCategory,
        date: date,
        key: key
      });

      let totalCost = parseFloat(total) + parseFloat(cost);
      setItems(itemArray);
      setTotal(totalCost);
      setSubscriptions(inputCategory === "subscriptions" ? parseFloat(subscriptions) + parseFloat(cost) : subscriptions)
      setFood(inputCategory === "food" ? parseFloat(food) + parseFloat(cost) : food)
      setHousing(inputCategory === "housing" ? parseFloat(housing) + parseFloat(cost) : housing)
      setEntertainment(inputCategory === "entertainment" ? parseFloat(entertainment) + parseFloat(cost) : entertainment)
      setMedical(inputCategory === "medical" ? parseFloat(medical) + parseFloat(cost) : medical)
      setOther(inputCategory === "other" ? parseFloat(other) + parseFloat(cost) : other)
      setGreatestCategory();

      addItemToDB(key)
      setItem('');
      setCost('');
      setInputCategory('');
      setDate('')

      e.preventDefault();
    }
  }

  async function addItemToDB(key) {

    const data = {
      name: item,
      cost: cost,
      date: Date.now(),
      category: inputCategory,
      key: key
    }


    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', 'http://127.0.0.1:3000');

    let response = await fetch('http://127.0.0.1:5000/user/budget/new', {
      mode: 'cors',
      method: 'POST',
      headers: headers,
      credentials: 'include',
      body: JSON.stringify(data)
    })

    if (response.status === 401) {
      setAuthorized(false)
    }
    return response.status
  }

  function deleteItem(key, category, cost) {
    let filteredItems = items.filter(function (item) {
      return (item.key !== key);
    });
    setItems(filteredItems)
    setTotal(total - cost)
    setSubscriptions(category === "subscriptions" ? subscriptions - cost : subscriptions)
    setFood(category === "food" ? food - cost : food)
    setHousing(category === "housing" ? housing - cost : housing)
    setEntertainment(category === "entertainment" ? entertainment - cost : entertainment)
    setMedical(category === "medical" ? medical - cost : medical)
    setOther(category === "other" ? other - cost : other)
    setGreatestCategory();

    const data = {
      key: key
    };

    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', 'http://127.0.0.1:3000');

    fetch('http://127.0.0.1:5000/user/budget/delete', {
      mode: 'cors',
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: headers
    })
      .then(response => {
        if (response.status === 401) {
          setAuthorized(false)
          return Promise.reject();
        }
        else return response.json()
      })
      .then(data => console.log(data))
  }


  function setGreatestCategory() {
    let currentMax = 0;
    let maxCategory = "None";
    if (subscriptions > currentMax) {
      currentMax = subscriptions;
      maxCategory = "subscriptions";
    }
    if (food > currentMax) {
      currentMax = food;
      maxCategory = "food";
    }
    if (housing > currentMax) {
      currentMax = housing;
      maxCategory = "housing";
    }
    if (entertainment > currentMax) {
      currentMax = entertainment;
      maxCategory = "entertainment";
    }
    if (medical > currentMax) {
      currentMax = medical;
      maxCategory = "medical";
    }
    if (other > currentMax) {
      currentMax = other;
      maxCategory = "other";
    }
    setGreatest(maxCategory);
  }

  return (
    !isAuthorized
      ?
      <Redirect to={{
        pathname: '/login'
      }}
      />
      :
      <div className="wholePage">
        <Header page={"budget"} />
        <Dashboard
          total={total}
          subscriptions={subscriptions}
          greatest={greatest} />
        <div className="todoListMain">
          <div className="budgetheader">
            <form onSubmit={addItem}>
              <label>Enter budget item:  </label>
              <input
                id="itemInput"
                value={item}
                onChange={e => setItem(e.target.value)}
                placeholder="Enter Item">
              </input>
              <input
                type="number"
                step="0.01"
                value={cost}
                onChange={e => setCost(e.target.value)}
                placeholder="Enter Amount">
              </input>
              <label>Choose a Category:  </label>
              <select id="categorysel" value={inputCategory} onChange={e => setInputCategory(e.target.value)}>
                <option value="">Select</option>
                <option value="subscriptions">Subscriptions and Recurring Expenses</option>
                <option value="food">Food and Dining</option>
                <option value="housing">Housing and Utilities</option>
                <option value="entertainment">Entertainment and Recreation</option>
                <option value="medical">Medical and Healthcare</option>
                <option value="other">Other</option>
              </select>
              <label>Date: </label>
              <input id='dateInput' onChange={e => setDate(e.target.value)} type='date'></input>
              <button type="submit">Add Item</button>
            </form>
          </div>
          <BudgetItems
            items={items}
            deleteItem={deleteItem}
            subscriptions={subscriptions}
            food={food}
            housing={housing}
            entertainment={entertainment}
            medical={medical}
            other={other}
          />
        </div>
      </div>


  )
}


export default BudgetLists;