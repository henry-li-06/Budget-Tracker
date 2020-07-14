import React from 'react';
import './../styles/dashboard.css';

class Dashboard extends React.Component {
  render() {

    return (

      <div id="dashboard">
        <div className="dashItem">
          Total monthly spending
      <div>${this.props.totalCost}</div>
        </div>
        <div className="dashItem">
          Subscriptions monthly total
          <div>${this.props.totalSubCost}</div>
        </div>
        <div className="dashItem">
          Greatest Category
      <div id="greatestCatText">{this.props.greatestCategory}</div>
        </div>
      </div>
    )
  }
}

export default Dashboard;