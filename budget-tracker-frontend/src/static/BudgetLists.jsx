import React from 'react';
import BudgetItems from './BudgetItems';
import './../styles/budgetlists.css';
import Dashboard from './Dashboard';
import { v4 as uuid4 } from 'uuid';


class BudgetLists extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      items : [],
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

  }

  componentDidMount() {
    // return;
    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', 'http://127.0.0.1:3000');

    
    fetch('http://127.0.0.1:5000/user/budget', {
      mode : 'cors',
      method : 'GET',
      headers : headers,
      credentials : 'include'
    })
    .then(response => response.json())
    .then(data => this.setState({ //! NEED TO UPDATE THE OTHER PARTS OF STATE TOO NOT SURE HOW
      items : data.budget_items,
      totalExpenses : data.total_cost,
      subExpenses : data.category_costs['Subscriptions and Recurring Expenses'],
      foodExpenses : data.category_costs['Food and Dining'],
      housingExpenses : data.category_costs['Housing and Utilities'],
      entertainExpenses : data.category_costs['Entertainment and Recreation'],
      medicalExpenses : data.category_costs['Medical and Healthcare'],
      otherExpenses : data.category_costs['Other'],
      greatestCategory : data.greatest_category
    }));

    

  }

  addItem(e) {
    var itemArray = this.state.items;
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
        key : key
      });
      var totalCost = parseFloat(this.state.totalExpenses) + parseFloat(this._inputCost.value);
      var subCost = this._inputCategory.value === "Subscriptions and Recurring Expenses" ? parseFloat(this._inputCost.value) + parseFloat(this.state.subExpenses) : parseFloat(this.state.subExpenses);
      var foodCost = this._inputCategory.value === "Food and Dining" ? parseFloat(this._inputCost.value) + parseFloat(this.state.foodExpenses) : parseFloat(this.state.foodExpenses);
      var housingCost = this._inputCategory.value === "Housing and Utilities" ? parseFloat(this._inputCost.value) + parseFloat(this.state.housingExpenses) : parseFloat(this.state.housingExpenses);
      var entertainCost = this._inputCategory.value === "Entertainment and Recreation" ? parseFloat(this._inputCost.value) + parseFloat(this.state.entertainExpenses) : parseFloat(this.state.entertainExpenses);
      var medicalCost = this._inputCategory.value === "Medical and Healthcare" ? parseFloat(this._inputCost.value) + parseFloat(this.state.medicalExpenses) : parseFloat(this.state.medicalExpenses);
      var otherCost = this._inputCategory.value === "Other" ? parseFloat(this._inputCost.value) + parseFloat(this.state.otherExpenses) : parseFloat(this.state.otherExpenses);
      var greatestCat = totalCost === 0 ? "None" :
        (subCost >= foodCost && subCost >= housingCost && subCost >= entertainCost && subCost >= medicalCost && subCost >= otherCost ? "Subscriptions and Recurring Expenses" :
          (foodCost >= housingCost && foodCost >= entertainCost && foodCost >= medicalCost && foodCost >= otherCost ? "Food and Dining" :
            (housingCost >= entertainCost && housingCost >= medicalCost && housingCost >= otherCost ? "Housing and Utilities" :
              (entertainCost >= medicalCost && entertainCost >= otherCost ? "Entertainment and Recreation" :
                (medicalCost >= otherCost ? "Medical and Healthcare" : "Other")))));
      this.setState({
        items: itemArray,
        totalExpenses: totalCost,
        subExpenses: subCost,
        foodExpenses: foodCost,
        housingExpenses: housingCost,
        entertainExpenses: entertainCost,
        medicalExpenses: medicalCost,
        otherExpenses: otherCost,
        greatestCategory: greatestCat


      });
      console.log(Date.now())
      this.addItemToDB(key)
      this._inputItem.value = "";
      this._inputCost.value = "";
      this._inputCategory.value = "";
      this._inputDate.value = "";
      console.log(itemArray);

      e.preventDefault();

      // this.addItemToDB(key);
    }
  }

  async addItemToDB(key) {
    const data = {
      name : this._inputItem.value,
      cost : this._inputCost.value,
      date : Date.now(),
      category : this._inputCategory.value,
      key : key

    }
    console.log(Date.now())

    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', 'http://127.0.0.1:3000');

    let response = await fetch('http://127.0.0.1:5000/user/budget/new', {
      mode : 'cors',
      method : 'POST',
      headers : headers,
      credentials : 'include',
      body : JSON.stringify(data)
    })
    console.log(response.json())
    return response.status
  }

  deleteItem(key) {
    var filteredItems = this.state.items.filter(function (item) {
      return (item.key !== key);
    });
    var totalCost = filteredItems.reduce((prev, next) => prev + next.cost, 0);
    var subEntries = filteredItems.filter(item => item.category === "Subscriptions and Recurring Expenses");
    var subCost = subEntries.reduce((prev, next) => prev + next.cost, 0);
    var foodEntries = filteredItems.filter(item => item.category === "Food and Dining");
    var foodCost = foodEntries.reduce((prev, next) => prev + next.cost, 0);
    var housingEntries = filteredItems.filter(item => item.category === "Housing and Utilities");
    var housingCost = housingEntries.reduce((prev, next) => prev + next.cost, 0);
    var entertainmentEntries = filteredItems.filter(item => item.category === "Entertainment and Recreation");
    var entertainCost = entertainmentEntries.reduce((prev, next) => prev + next.cost, 0);
    var medicalEntries = filteredItems.filter(item => item.category === "Medical and Healthcare");
    var medicalCost = medicalEntries.reduce((prev, next) => prev + next.cost, 0);
    var otherEntries = filteredItems.filter(item => item.category === "Other");
    var otherCost = otherEntries.reduce((prev, next) => prev + next.cost, 0);
    var greatestCat = totalCost === 0 ? "None" :
      (subCost >= foodCost && subCost >= housingCost && subCost >= entertainCost && subCost >= medicalCost && subCost >= otherCost ? "Subscriptions and Recurring Expenses" :
        (foodCost >= housingCost && foodCost >= entertainCost && foodCost >= medicalCost && foodCost >= otherCost ? "Food and Dining" :
          (housingCost >= entertainCost && housingCost >= medicalCost && housingCost >= otherCost ? "Housing and Utilities" :
            (entertainCost >= medicalCost && entertainCost >= otherCost ? "Entertainment and Recreation" :
              (medicalCost >= otherCost ? "Medical and Healthcare" : "Other")))));

    this.setState({
      items: filteredItems,
      totalExpenses: totalCost,
      subExpenses: subCost,
      foodExpenses: foodCost,
      housingExpenses: housingCost,
      entertainExpenses: entertainCost,
      medicalExpenses: medicalCost,
      otherExpenses: otherCost,
      greatestCategory: greatestCat
    });

  }



  render() {
  
    return (
      <div className="wholePage">
        <Dashboard totalCost={this.state.totalExpenses} totalSubCost={this.state.subExpenses} greatestCategory={this.state.greatestCategory} />
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
              <input id = 'dateInput' ref = {(a) => this._inputDate = a} type = 'date'></input> {/* Only for not subscriptsion and recurring expenses */}
              <button type="submit">Add Item</button>
            </form>
          </div>
          <BudgetItems entries={this.state.items}
            delete={this.deleteItem} />
        </div>
      </div>
    )
  }
}

export default BudgetLists;