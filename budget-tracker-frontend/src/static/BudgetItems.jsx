import React from 'react';
import { Redirect } from 'react-router-dom';
import './../styles/budgetitems.css';


class BudgetItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthorized: true
    }

    this.createTasks = this.createTasks.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isAuthorized
  }

  createTasks(item) {
    return (
      <div>
        <li className="ListItem" key={item.key}>
          <div><p className='itemName'>{item.name}</p></div>
          <div><p className='itemCost'>${item.cost}</p></div>
          <div id="cancel"><p className="xtocancel" onClick={() => this.delete(item.key)}>X</p></div>
        </li>
      </div>
    )
  }

  delete(key) {
    this.props.delete(key);
    // this.deleteItemFromDB(key);
  }

  async deleteItemFromDB(key) {
    console.log(key)
    const data = {
      key: key
    };

    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', 'http://127.0.0.1:3000');

    let response = await fetch('http://127.0.0.1:5000/user/budget/delete', {
      mode: 'cors',
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: headers
    })
    // console.log(response.status)
    if (response.status === 401) this.setState({ isAuthorized: false })
    return response.status
  }

  render() {
    var BudgetEntries = this.props.entries;
    var subscriptionItems = BudgetEntries.filter(item => item.category === "Subscriptions and Recurring Expenses").map(this.createTasks);
    var foodItems = BudgetEntries.filter(item => item.category === "Food and Dining").map(this.createTasks);
    var housingItems = BudgetEntries.filter(item => item.category === "Housing and Utilities").map(this.createTasks);
    var entertainmentItems = BudgetEntries.filter(item => item.category === "Entertainment and Recreation").map(this.createTasks);
    var medicalItems = BudgetEntries.filter(item => item.category === "Medical and Healthcare").map(this.createTasks);
    var otherItems = BudgetEntries.filter(item => item.category === "Other").map(this.createTasks);
    return (

      <div id="listContainer">
        <div className="categoryLine">
          <ul className="subscriptionsList theList">
            <h3>Subscriptions and Recurring Expenses</h3>
            {subscriptionItems}
          </ul>
          <ul className="foodList theList">
            <h3>Food and Dining</h3>
            {foodItems}
          </ul>
          <ul className="houseList theList">
            <h3>Housing and Utilities</h3>
            {housingItems}
          </ul>
        </div>
        <div className="categoryLine">
          <ul className="entertainList theList">
            <h3>Entertainment and Recreation</h3>
            {entertainmentItems}
          </ul>
          <ul className="medicalList theList">
            <h3>Medical and Healthcare</h3>
            {medicalItems}
          </ul>
          <ul className="otherList theList">
            <h3>Other</h3>
            {otherItems}
          </ul>
        </div>
      </div>
    )
  }
}

export default BudgetItems;