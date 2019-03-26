import React, { Component } from 'react';

export default class RepaymentsList extends Component {
  render() {
    return (
      <div>
        <h3>RepaymentsList</h3>
        <Consumer>
          {value => {
            return <Repayment value={value} />;
          }}
        </Consumer>
      </div>
    );
  }
}
