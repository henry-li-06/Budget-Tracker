import React from 'react';
import './../styles/dashboard.css';

function Dashboard({ total, subscriptions, greatest }) {

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
    <div id="greatestCatText">{greatest}</div>
      </div>
    </div>
  )


}


export default Dashboard;