import React from 'react';
import './../styles/dashboard.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalSpending: 0,
      totalSubs: 0,
      highestCat: "None"
    }

  }



  render() {






    return (

      <div id="dashboard">
        <div className="dashItem">
          Total monthly spending
      <div>${this.props.totalCost}</div>
        </div>
        <div className="dashItem">
          Subscriptions monthly total
          <div>${this.state.totalSubs}</div>
        </div>
        <div className="dashItem">
          Greatest Category
          <div>{this.state.highestCat}</div>
        </div>
      </div>
    )
  }
}

export default Dashboard;