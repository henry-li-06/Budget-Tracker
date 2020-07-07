import React from 'react';
import BudgetItems from './BudgetItems';
import './../styles/budgetlists.css';
import Dashboard from './Dashboard'


class BudgetLists extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
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
      var totalCost = this.state.totalExpenses + parseInt(this._inputCost.value);
      var subCost = this._inputCategory.value === "Subscriptions and Recurring Expenses" ? parseInt(this._inputCost.value) + parseInt(this.state.subExpenses) : parseInt(this.state.subExpenses);
      var foodCost = this._inputCategory.value === "Food and Dining" ? parseInt(this._inputCost.value) + parseInt(this.state.foodExpenses) : parseInt(this.state.foodExpenses);
      var housingCost = this._inputCategory.value === "Housing and Utilities" ? parseInt(this._inputCost.value) + parseInt(this.state.housingExpenses) : parseInt(this.state.housingExpenses);
      var entertainCost = this._inputCategory.value === "Entertainment and Recreation" ? parseInt(this._inputCost.value) + parseInt(this.state.entertainExpenses) : parseInt(this.state.entertainExpenses);
      var medicalCost = this._inputCategory.value === "Medical and Healthcare" ? parseInt(this._inputCost.value) + parseInt(this.state.medicalExpenses) : parseInt(this.state.medicalExpenses);
      var otherCost = this._inputCategory.value === "Other" ? parseInt(this._inputCost.value) + parseInt(this.state.otherExpenses) : parseInt(this.state.otherExpenses);
      var greatestCat =
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

    return (
      <div>
        <Dashboard totalCost={this.state.totalExpenses} totalSubCost={this.state.subExpenses} greatestCategory={this.state.greatestCategory} />
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