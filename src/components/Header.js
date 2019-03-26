import React, { Component } from 'react';
import { Card, CardHeader, CardTitle } from 'reactstrap';
import logo from '../logo.svg';

class Header extends Component {
  render() {
    return (
      <Card color="info" className="border border-primary">
        <CardHeader
          className="container d-flex align-items-center"
          style={{ background: 'inherit' }}
        >
          <img src={logo} alt="store" className="navbar-brand" />

          <CardTitle
            className="display-3 text-center text-light mx-auto"
            style={{ fontSize: 'calc(0.9vw + 2em + 20%)', fontWeight: '400' }}
          >
            Loan Interest and Principal Repayment Calculator
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }
}

export default Header;
