import React, { useState, useEffect } from 'react';
import './../styles/budgetitems.css';
import getNewAccessToken from '../utils/utils';

function BudgetItems(
  { items, deleteItem, subscriptions, food, housing, entertainment, medical, other }
) {

  function deleteEntry(key, category, cost) {
    deleteItem(key, category, cost)
  }

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

  let entries = items;
  let subBoxes = [];
  let foodBoxes = [];
  let housingBoxes = [];
  let entertainmentBoxes = [];
  let medicalBoxes = [];
  let otherBoxes = [];

  entries.forEach(item => {
    if (item.category === "subscriptions") {
      subBoxes.unshift(item);
    } else if (item.category === "food") {
      foodBoxes.unshift(item);
    } else if (item.category === "housing") {
      housingBoxes.unshift(item);
    } else if (item.category === "entertainment") {
      entertainmentBoxes.unshift(item);
    } else if (item.category === "medical") {
      medicalBoxes.unshift(item);
    } else if (item.category === "other") {
      otherBoxes.unshift(item);
    }
  });

  let subItems = subBoxes.map(createTasks)
  let foodItems = foodBoxes.map(createTasks)
  let housingItems = housingBoxes.map(createTasks)
  let entertainmentItems = entertainmentBoxes.map(createTasks)
  let medicalItems = medicalBoxes.map(createTasks)
  let otherItems = otherBoxes.map(createTasks)

  return (

    <div id="listContainer">

      <div className="categoryLine">
        <ul className="subscriptionsList theList">
          <h2>Subscriptions and Recurring Expenses<h3>Total: ${subscriptions}</h3></h2>
          {subItems}
        </ul>
        <ul className="foodList theList">
          <h2>Food and Dining<h3>Total: ${food}</h3></h2>
          {foodItems}
        </ul>
        <ul className="houseList theList">
          <h2>Housing and Utilities<h3>Total: ${housing}</h3></h2>
          {housingItems}
        </ul>
      </div>
      <div className="categoryLine">
        <ul className="entertainList theList">
          <h2>Entertainment and Recreation<h3>Total: ${entertainment}</h3></h2>
          {entertainmentItems}
        </ul>
        <ul className="medicalList theList">
          <h2>Medical and Healthcare<h3>Total: ${medical}</h3></h2>
          {medicalItems}
        </ul>
        <ul className="otherList theList">
          <h2>Other<h3>Total: ${other}</h3></h2>
          {otherItems}
        </ul>
      </div>
    </div>
  )
}

export default BudgetItems;