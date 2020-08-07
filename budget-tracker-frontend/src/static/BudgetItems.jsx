import React from 'react';
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
          <div style={{ paddingRight: '30px' }}>
            <p className='itemName'>{item.name}</p>
          </div>
          <div style={{ paddingRight: '30px' }}>
            <p className='itemCost'>${item.cost}</p>
          </div>
          <div id="cancel">
            <p className="xtocancel" onClick={() => this.delete(item.key, item.category, item.cost)}>X</p>
          </div>
        </li>
      </div>
    )
  }

  delete(key, category, cost) {
    console.log(cost)
    this.props.delete(key, category, cost);
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
    let budgetEntries = this.props.entries;
    let subscriptionEntries = [];
    let foodEntries = [];
    let housingEntries = [];
    let entertainmentEntries = [];
    let medicalEntries = [];
    let otherEntries = [];
    budgetEntries.forEach(item => {
      if (item.category === "Subscriptions and Recurring Expenses") {
        subscriptionEntries.unshift(item);
      } else if (item.category === "Food and Dining") {
        foodEntries.unshift(item);
      } else if (item.category === "Housing and Utilities") {
        housingEntries.unshift(item);
      } else if (item.category === "Entertainment and Recreation") {
        entertainmentEntries.unshift(item);
      } else if (item.category === "Medical and Healthcare") {
        medicalEntries.unshift(item);
      } else if (item.category === "Other") {
        otherEntries.unshift(item);
      }
    });

    let subscriptionItems = subscriptionEntries.map(this.createTasks);
    let foodItems = foodEntries.map(this.createTasks);
    let housingItems = housingEntries.map(this.createTasks);
    let entertainmentItems = entertainmentEntries.map(this.createTasks);
    let medicalItems = medicalEntries.map(this.createTasks);
    let otherItems = otherEntries.map(this.createTasks);

    return (

      <div id="listContainer">
        <div className="categoryLine">
          <ul className="subscriptionsList theList">
            <h2>Subscriptions and Recurring Expenses<h3>Total: ${this.props.subscriptions}</h3></h2>
            {subscriptionItems}
          </ul>
          <ul className="foodList theList">
            <h2>Food and Dining<h3>Total: ${this.props.food}</h3></h2>
            {foodItems}
          </ul>
          <ul className="houseList theList">
            <h2>Housing and Utilities<h3>Total: ${this.props.housing}</h3></h2>
            {housingItems}
          </ul>
        </div>
        <div className="categoryLine">
          <ul className="entertainList theList">
            <h2>Entertainment and Recreation<h3>Total: ${this.props.entertainment}</h3></h2>
            {entertainmentItems}
          </ul>
          <ul className="medicalList theList">
            <h2>Medical and Healthcare<h3>Total: ${this.props.medical}</h3></h2>
            {medicalItems}
          </ul>
          <ul className="otherList theList">
            <h2>Other<h3>Total: ${this.props.other}</h3></h2>
            {otherItems}
          </ul>
        </div>
      </div>
    )
  }
}

export default BudgetItems;