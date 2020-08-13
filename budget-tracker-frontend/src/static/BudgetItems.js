import React, { useState, useEffect } from 'react';
import './../styles/budgetitems.css';
import getNewAccessToken from '../utils/utils';

function BudgetItems(
  { items, deleteItem, subscriptions, food, housing, entertainment, medical, other }
) {

  const [subscriptionEntries, setSubscriptionEntries] = useState([])
  const [foodEntries, setFoodEntries] = useState([])
  const [housingEntries, setHousingEntries] = useState([])
  const [entertainmentEntries, setEntertainmentEntries] = useState([])
  const [medicalEntries, setMedicalEntries] = useState([])
  const [otherEntries, setOtherEntries] = useState([])


  function deleteEntry(key, category, cost) {
    deleteItem(key, category, cost)
  }

  useEffect(() => {
    let entries = items;
    let subBoxes = [];
    let foodBoxes = [];
    let housingBoxes = [];
    let entertainmentBoxes = [];
    let medicalBoxes = [];
    let otherBoxes = [];
    console.log(items)
    entries.forEach(item => {
      subBoxes = (item.category === "subscriptions" ? subBoxes.unshift(item) : subBoxes)
      foodBoxes = (item.category === "food" ? foodBoxes.unshift(item) : foodBoxes)
      housingBoxes = (item.category === "housing" ? housingBoxes.unshift(item) : housingBoxes)
      entertainmentBoxes = (item.category === "entertainment" ? entertainmentBoxes.unshift(item) : entertainmentBoxes)
      medicalBoxes = (item.category === "medical" ? medicalBoxes.unshift(item) : medicalBoxes)
      otherBoxes = (item.category === "other" ? otherBoxes.unshift(item) : otherBoxes)
    });
    console.log(subBoxes)
    let subItems = subBoxes == null ? [] : subBoxes.map(createTasks)
    let foodItems = foodBoxes == null ? [] : foodBoxes.map(createTasks)
    let housingItems = housingBoxes == null ? [] : housingBoxes.map(createTasks)
    let entertainmentItems = entertainmentBoxes == null ? [] : entertainmentBoxes.map(createTasks)
    let medicalItems = medicalBoxes == null ? [] : medicalBoxes.map(createTasks)
    let otherItems = otherBoxes == null ? [] : otherBoxes.map(createTasks)

    setSubscriptionEntries(subItems)
    setFoodEntries(foodItems)
    setHousingEntries(housingItems)
    setEntertainmentEntries(entertainmentItems)
    setMedicalEntries(medicalItems)
    setOtherEntries(otherItems)

  }, [])

  function createTasks(item) {
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
            <p className="xtocancel" onClick={() => deleteEntry(item.key, item.category, item.cost)}>X</p>
          </div>
        </li>
      </div>
    )
  }

  return (

    <div id="listContainer">
      <div className="categoryLine">
        <ul className="subscriptionsList theList">
          <h2>Subscriptions and Recurring Expenses<h3>Total: ${subscriptions}</h3></h2>
          {subscriptionEntries}
        </ul>
        <ul className="foodList theList">
          <h2>Food and Dining<h3>Total: ${food}</h3></h2>
          {foodEntries}
        </ul>
        <ul className="houseList theList">
          <h2>Housing and Utilities<h3>Total: ${housing}</h3></h2>
          {housingEntries}
        </ul>
      </div>
      <div className="categoryLine">
        <ul className="entertainList theList">
          <h2>Entertainment and Recreation<h3>Total: ${entertainment}</h3></h2>
          {entertainmentEntries}
        </ul>
        <ul className="medicalList theList">
          <h2>Medical and Healthcare<h3>Total: ${medical}</h3></h2>
          {medicalEntries}
        </ul>
        <ul className="otherList theList">
          <h2>Other<h3>Total: ${other}</h3></h2>
          {otherEntries}
        </ul>
      </div>
    </div>
  )

}

export default BudgetItems;