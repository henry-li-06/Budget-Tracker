import React from 'react';
import BudgetItems from './BudgetItems';
import getNewAccessToken from './../utils/utils.js';
import './../styles/budgetlists.css';
import Dashboard from './Dashboard';
import { v4 as uuid4 } from 'uuid';
import { Redirect } from 'react-router-dom';


class BudgetLists extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      isAuthorized: true,
      totalExpenses: 0,
      subExpenses: 0,
      foodExpenses: 0,
      housingExpenses: 0,
      entertainExpenses: 0,
      medicalExpenses: 0,
      otherExpenses: 0,
      greatestCategory: "None"
    };

    this.addItem = this.addItem.bind(this);
    this.addItemToDB = this.addItemToDB.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setGreatestCategory = this.setGreatestCategory.bind(this);

  }

  componentDidMount() {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', 'http://127.0.0.1:3000');

    let currentComponent = this;
    fetch('http://127.0.0.1:5000/user/budget', {
      mode: 'cors',
      method: 'GET',
      headers: headers,
      credentials: 'include'
    })

      .then(response => {
        if (response.status === 401) {
          if (getNewAccessToken()) {
            currentComponent.forceUpdate()
          }
          else {
            currentComponent.setState({ isAuthorized: false });
          }
          return Promise.reject()
        }
        else return response.json()
      })
      .then(data => this.setState({
        items: data.budget_items,
        totalExpenses: data.total_cost,
        subExpenses: data.category_costs['Subscriptions and Recurring Expenses'],
        foodExpenses: data.category_costs['Food and Dining'],
        housingExpenses: data.category_costs['Housing and Utilities'],
        entertainExpenses: data.category_costs['Entertainment and Recreation'],
        medicalExpenses: data.category_costs['Medical and Healthcare'],
        otherExpenses: data.category_costs['Other'],
        greatestCategory: data.greatest_category
      })
      );

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', 'http://127.0.0.1:3000');

    let currentComponent = this;
    fetch('http://127.0.0.1:5000/user/budget', {
      mode: 'cors',
      method: 'GET',
      headers: headers,
      credentials: 'include'
    })
      .then(response => {
        if (response.status === 401) {
          if (getNewAccessToken()) {
            currentComponent.forceUpdate();

          }
          else {
            currentComponent.setState({ isAuthorized: false })

          }
          return Promise.reject()
        }
        return response.json()
      })
      .then(data => {
        this.setState({
          items: data.budget_items,
          totalExpenses: data.total_cost,
          subExpenses: data.category_costs['Subscriptions and Recurring Expenses'],
          foodExpenses: data.category_costs['Food and Dining'],
          housingExpenses: data.category_costs['Housing and Utilities'],
          entertainExpenses: data.category_costs['Entertainment and Recreation'],
          medicalExpenses: data.category_costs['Medical and Healthcare'],
          otherExpenses: data.category_costs['Other'],
          greatestCategory: data.greatest_category
        })
      }
      );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.items !== this.state.items) return true;
    return false;
  }

  setGreatestCategory() {
    let currentMax = 0;
    let maxCategory = "None";
    if (this.state.subExpenses > currentMax) {
      currentMax = this.state.subExpenses;
      maxCategory = "Subscriptions and Recurring Expenses";
    }
    if (this.state.foodExpenses > currentMax) {
      currentMax = this.state.foodExpenses;
      maxCategory = "Food and Dining";
    }
    if (this.state.housingExpenses > currentMax) {
      currentMax = this.state.housingExpenses;
      maxCategory = "Housing and Utilities";
    }
    if (this.state.entertainExpenses > currentMax) {
      currentMax = this.state.entertainExpenses;
      maxCategory = "Entertainment and Recreation";
    }
    if (this.state.medicalExpenses > currentMax) {
      currentMax = this.state.medicalExpenses;
      maxCategory = "Medical and Healthcare";
    }
    if (this.state.otherExpenses > currentMax) {
      currentMax = this.state.ptherExpenses;
      maxCategory = "Other";
    }
    this.setState({
      greatestCategory: maxCategory
    })
  }

  addItem(e) {
    let itemArray = this.state.items;
    const key = uuid4();
    if (this._inputItem.value !== "" &&
      this._inputCost.value !== "" &&
      this._inputCost.value > 0.00 &&
      this._inputCategory.value !== "" &&
      this._inputDate.value !== "") {
      itemArray.unshift({
        name: this._inputItem.value,
        cost: this._inputCost.value,
        category: this._inputCategory.value,
        date: this._inputDate.value,
        key: key
      });
      let totalCost = parseFloat(this.state.totalExpenses) + parseFloat(this._inputCost.value);
      if (this._inputCategory.value === "Subscriptions and Recurring Expenses") {
        this.setState({
          items: itemArray,
          totalExpenses: totalCost,
          subExpenses: this.state.subExpenses + parseFloat(this._inputCost.value),
        })
      } else if (this._inputCategory.value === "Food and Dining") {
        this.setState({
          items: itemArray,
          totalExpenses: totalCost,
          foodExpenses: this.state.foodExpenses + parseFloat(this._inputCost.value),
        })
      } else if (this._inputCategory.value === "Housing and Utilities") {
        this.setState({
          items: itemArray,
          totalExpenses: totalCost,
          housingExpenses: this.state.housingExpenses + parseFloat(this._inputCost.value),
        })
      } else if (this._inputCategory.value === "Entertainment and Recreation") {
        this.setState({
          items: itemArray,
          totalExpenses: totalCost,
          entertainExpenses: this.state.entertainExpenses + parseFloat(this._inputCost.value),

        })
      } else if (this._inputCategory.value === "Medical and Healthcare") {
        this.setState({
          items: itemArray,
          totalExpenses: totalCost,
          medicalExpenses: this.state.medicalExpenses + parseFloat(this._inputCost.value),

        })
      } else if (this._inputCategory.value === "Other") {
        this.setState({
          items: itemArray,
          totalExpenses: totalCost,
          otherExpenses: this.state.otherExpenses + parseFloat(this._inputCost.value),
        })
      }

      this.setGreatestCategory();

      // });
      // console.log(Date.now())
      this.addItemToDB(key)
      this._inputItem.value = "";
      this._inputCost.value = "";
      this._inputCategory.value = "";
      this._inputDate.value = "";
      // console.log(itemArray);

      e.preventDefault();

      // this.addItemToDB(key);
    }
  }

  async addItemToDB(key) {
    const data = {
      name: this._inputItem.value,
      cost: this._inputCost.value,
      date: Date.now(),
      category: this._inputCategory.value,
      key: key

    }
    // console.log(Date.now())

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
    // console.log(response.json())
    if (response.status === 401) {
      this.setState({ isAuthorized: false })
    }
    return response.status
  }

  deleteItem(key, category, cost) {
    let filteredItems = this.state.items.filter(function (item) {
      return (item.key !== key);
    });

    this.setState({
      items: filteredItems,
      totalExpenses: this.state.totalExpenses - cost,
      subExpenses: category === "Subscriptions and Recurring Expenses" ? this.state.subExpenses - cost : this.state.subExpenses,
      foodExpenses: category === "Food and Dining" ? this.state.foodExpenses - cost : this.state.foodExpenses,
      housingExpenses: category === "Housing and Utilities" ? this.state.housingExpenses - cost : this.state.housingExpenses,
      entertainExpenses: category === "Entertainment and Recreation" ? this.state.entertainExpenses - cost : this.state.entertainExpenses,
      medicalExpenses: category === "Medical and Healthcare" ? this.state.medicalExpenses - cost : this.state.medicalExpenses,
      otherExpenses: category === "Other" ? this.state.otherExpenses - cost : this.state.otherExpenses
    });

    this.setGreatestCategory();

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
          this.setState({ isAuthorized: false })
          return Promise.reject();
        }
        else return response.json()
      })
      .then(data => console.log(data))


  }



  render() {
    if (!this.state.isAuthorized) {
      return (
        <Redirect to={{
          pathname: '/login'
        }}
        />
      )
    } else
      return (
        <div className="wholePage">
          <Dashboard
            totalCost={this.state.totalExpenses}
            totalSubCost={this.state.subExpenses}
            greatestCategory={this.state.greatestCategory} />
          <div className="todoListMain">
            <div className="budgetheader">
              <form onSubmit={this.addItem}>
                <label>Enter budget item:  </label>
                <input id="itemInput" ref={(a) => this._inputItem = a} placeholder="Enter Item">
                </input>
                <input type="number" step="0.01" ref={(a) => this._inputCost = a} placeholder="Enter Amount">
                </input>
                <label>Choose a Category:  </label>
                <select id="categorysel" ref={(a) => this._inputCategory = a}>
                  <option value="Subscriptions and Recurring Expenses">Subscriptions and Recurring Expenses</option>
                  <option value="Food and Dining">Food and Dining</option>
                  <option value="Housing and Utilities">Housing and Utilities</option>
                  <option value="Entertainment and Recreation">Entertainment and Recreation</option>
                  <option value="Medical and Healthcare">Medical and Healthcare</option>
                  <option value="Other">Other</option>
                </select>
                <label>Date: </label>
                <input id='dateInput' ref={(a) => this._inputDate = a} type='date'></input> {/* Only for not subscriptsion and recurring expenses */}
                <button type="submit">Add Item</button>
              </form>
            </div>
            <BudgetItems
              entries={this.state.items}
              delete={this.deleteItem}
              subscriptions={this.state.subExpenses}
              food={this.state.foodExpenses}
              housing={this.state.housingExpenses}
              entertainment={this.state.entertainExpenses}
              medical={this.state.medicalExpenses}
              other={this.state.otherExpenses}
            />
          </div>
        </div>
      )
  }
}

export default BudgetLists;