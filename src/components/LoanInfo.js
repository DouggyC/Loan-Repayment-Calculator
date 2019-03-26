import React from 'react';
import { Alert, Row, Col } from 'reactstrap';

const LoanInfo = ({ value }) => {
  const {
    loanAmount,
    loanTermInYears,
    yearIntRate,
    grandTotalIntRepaid,
    grandTotalLoanRepaid
  } = value;
  return (
    <Alert>
      <h4>Loan Information</h4>
      <Row className="d-flex">
        <Col>
          <strong>Borrowed : </strong>${loanAmount}
        </Col>
        <Col>
          <strong>Term : </strong>
          {loanTermInYears} yrs / {loanTermInYears * 12} months
        </Col>
        <Col>
          <strong>Interest Rate p.a : </strong>
          {yearIntRate}%
        </Col>
        <Col>
          <strong>Total Interest : </strong>${grandTotalIntRepaid}
        </Col>
        <Col>
          <strong>Total Repayment : </strong>${grandTotalLoanRepaid}
        </Col>
      </Row>
    </Alert>
  );
};

export default LoanInfo;
