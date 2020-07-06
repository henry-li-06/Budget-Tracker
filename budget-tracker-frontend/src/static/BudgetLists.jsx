import React from 'react';
import BudgetItems from './BudgetItems';
import './../styles/budgetlists.css';
import Dashboard from './Dashboard'


class BudgetLists extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      items: []
    };

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItem(e) {
    var itemArray = this.state.items;
    if (this._inputItem.value !== "" &&
      this._inputCost.value !== "" &&
      this._inputCost.value > 0 &&
      this._inputCategory.value !== "") {
      itemArray.unshift({
        name: this._inputItem.value,
        cost: this._inputCost.value,
        category: this._inputCategory.value,
        key: Date.now()
      });

      this.setState({
        items: itemArray
      });
      this._inputItem.value = "";
      this._inputCost.value = "";
      this._inputCategory.value = "";
      console.log(itemArray);

      e.preventDefault();
    }
  }

  deleteItem(key) {
    var filteredItems = this.state.items.filter(function (item) {
      return (item.key !== key);
    });

    this.setState({
      items: filteredItems
    });

  }



  render() {
    var budgetEntries = this.state.items;
    var totalCost = budgetEntries.reduce(function (prev, next) { return prev + next.cost; }, 0);
    var subEntries = budgetEntries.filter(item => item.category === "Subscriptions and Recurring Expenses");
    var totalSubCost = subEntries.reduce(function (prev, next) { return prev + next.cost; }, 0);
    var foodEntries = budgetEntries.filter(item => item.category === "Food and Dining");
    var totalFoodCost = foodEntries.reduce(function (prev, next) { return prev + next.cost; }, 0);
    var housingEntries = budgetEntries.filter(item => item.category === "Housing and Utilities");
    var totalHousingCost = housingEntries.reduce(function (prev, next) { return prev + next.cost; }, 0);
    var entertainmentEntries = budgetEntries.filter(item => item.category === "Entertainment and Recreation");
    var totalEntertainmentCost = entertainmentEntries.reduce(function (prev, next) { return prev + next.cost; }, 0);
    var medicalEntries = budgetEntries.filter(item => item.category === "Medical and Healthcare");
    var totalMedicalCost = medicalEntries.reduce(function (prev, next) { return prev + next.cost; }, 0);
    var otherEntries = budgetEntries.filter(item => item.category === "Other");
    var totalOtherCost = otherEntries.reduce(function (prev, next) { return prev + next.cost; }, 0);
    
    return (
      <div>
        <Dashboard entries={this.state.items} />
        <div className="todoListMain">
          <div className="budgetheader">
            <form onSubmit={this.addItem}>
              <label>Enter budget item:  </label>
              <input id="itemInput" ref={(a) => this._inputItem = a} placeholder="Enter Item">
              </input>
              <input type="number" ref={(a) => this._inputCost = a} placeholder="Enter Amount">
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