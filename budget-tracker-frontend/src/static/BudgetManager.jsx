import React from 'react';
import Dashboard from './Dashboard.jsx';
import BudgetLists from './BudgetLists.jsx';


class BudgetManager extends React.Component {
  render() {
    return (
      <div>

        <BudgetLists />
      </div>
    )
  }
}

export default BudgetManager;