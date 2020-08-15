import React from 'react';
import './../styles/dashboard.css';

function Dashboard({ total, subscriptions, greatest }) {
  let categoriesMap = new Map()
  categoriesMap.set('subscriptions', 'Subscriptions and Recurring Expenses')
  categoriesMap.set('food', 'Food and Dining')
  categoriesMap.set('housing', 'Housing and Utilities')
  categoriesMap.set('entertainment', 'Entertainment and Recreation')
  categoriesMap.set('medical', 'Medical and Healthcare')
  categoriesMap.set('other', 'Other')
  categoriesMap.set('none', 'None')
  let category = categoriesMap.get(greatest)
  return (

    <div id="dashboard">
      <div className="dashItem">
        Total monthly spending
    <div>${total}</div>
      </div>
      <div className="dashItem">
        Subscriptions monthly total
        <div>${subscriptions}</div>
      </div>
      <div className="dashItem">
        Greatest Category
    <div id="greatestCatText">{category}</div>
      </div>
    </div>
  )


}


export default Dashboard;