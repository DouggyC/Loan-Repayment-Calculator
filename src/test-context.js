import React, { Component } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Button
} from 'reactstrap';

const Context = React.createContext();

// Provider
class Provider extends Component {
  state = {
    repaymentSchedule: [],
    // Principal
    loanAmount: 30000,
    // Term
    loanTermInYears: 6,
    // Interest
    yearIntRate: 8.4,
    // Month Counter
    month: 0,

    // Total Repayment
    totalIntRepaid: 0, // total interest paid to date
    totalPrinRepaid: 0 // total principal paid to date
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  amortization = principal => {
    let {
      loanAmount,
      loanTermInYears,
      yearIntRate,
      repaymentSchedule,
      month
    } = this.state;

    let mnthIntRepaid,
      mnthPrinRepaid,
      totalIntRepaid = 0;

    // Formatting Variables
    principal = loanAmount;
    const mnthIntRate = yearIntRate / 100 / 12;
    const loanTermInMonths = 12 * loanTermInYears;

    // Calculate Monthly Repayment
    const mnthRepayment = (
      (mnthIntRate * loanAmount) /
      (1 - (1 + mnthIntRate) ** -loanTermInMonths)
    ).toFixed(2);

    // Magic
    if (this.state.month === 2 || principal === 0) {
      console.log(
        this.state.month,
        ' Congratulations you have repaid the loan!'
      );
    }
    // Starting zero month
    else if (month === 0) {
      // Calculate Monthly Interest Repayment
      mnthIntRepaid = (loanAmount * mnthIntRate).toFixed(2);
      // Calculate Monthly Principal Repayment
      mnthPrinRepaid = (mnthRepayment - mnthIntRepaid).toFixed(2);

      // // Set Total Interest
      // totalIntRepaid = parseFloat(mnthIntRepaid);

      // // Data: Add repayment interval
      // let payment = {
      //   month: `${month} / ${loanTermInMonths}`,
      //   starting_amount: `${loanAmount}`,
      //   monthly_Repayment: `${mnthRepayment}`,
      //   monthly_Principal: `${mnthPrinRepaid} (P)`,
      //   monthly_Interest: `${mnthIntRepaid} (I)`,
      //   remaining_amount: `${loanAmount - mnthPrinRepaid}`
      // };
      // repaymentSchedule.push(payment);

      // // Increment month

      // // 1st stack
      // console.log('1st stack');
      // console.log(
      //   `Month: ${month} - Repayment: `,
      //   this.state.repaymentSchedule
      // );

      // Service Loan: Subtract monthly principal repayment from loan amount
      parseFloat((principal -= mnthPrinRepaid)).toFixed(2);
      console.log(principal, month);

      // console.log(parseFloat((loanAmount -= mnthPrinRepaid)).toFixed(2));

      this.setState({ month: month + 1 });
      return this.amortization.bind(this, principal);
    } else {
      // Calculate Monthly Interest Repayment
      this.setState({ month: month + 1 });

      mnthIntRepaid = (principal * mnthIntRate).toFixed(2);
      console.log(month, mnthIntRepaid, principal);
      // // Calculate Monthly Principal Repayment
      // mnthPrinRepaid = (mnthRepayment - mnthIntRepaid).toFixed(2);
      // // Calculate Accumalating Interest Repayment Amount
      // totalIntRepaid = parseFloat(totalIntRepaid) + parseFloat(mnthIntRepaid);
      // console.log(`Int: ${totalIntRepaid} / 207.75`);
      // totalIntRepaid = totalIntRepaid.toFixed(2);
      // // Data interval
      // let payment = {
      //   month: `${month} / ${loanTermInMonths}`,
      //   starting_amount: `${loanAmount}`,
      //   monthly_Repayment: `${mnthRepayment}`,
      //   monthly_Principal: `${mnthPrinRepaid} (P)`,
      //   monthly_Interest: `${mnthIntRepaid} (I)`,
      //   remaining_amount: `${loanAmount - mnthPrinRepaid}`
      // };
      // repaymentSchedule.push(payment);
      // this.setState({ month: month + 1 });
      // loanAmount -= mnthPrinRepaid;
      // // return this.amortization(principal);
    }

    // this.setState({
    //   repaymentSchedule: repaymentSchedule
    // });
  };

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          amortization: this.amortization
        }}
      >
        {/*  */}
        <Form
          className="container mt-1"
          onSubmit={e => {
            e.preventDefault();
            this.amortization(this.state.loanAmount);
          }}
        >
          <Row>
            <Col>
              <FormGroup>
                <Label>Loan Amount</Label>
                <Input
                  type="number"
                  placeholder="$"
                  min="0"
                  step="0.01"
                  name="loanAmount"
                  value={this.state.loanAmount}
                  onChange={this.handleChange}
                />
                <FormFeedback>Invalid Number</FormFeedback>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Loan Term</Label>
                <Input
                  type="number"
                  placeholder="year/s"
                  min="0"
                  step="1"
                  name="loanTermInYears"
                  value={this.state.loanTermInYears}
                  onChange={this.handleChange}
                />
                <FormFeedback>Invalid Number</FormFeedback>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Interest rate %</Label>
                <Input
                  type="number"
                  placeholder="% p.a."
                  min="0"
                  step="0.1"
                  name="yearIntRate"
                  value={this.state.yearIntRate}
                  onChange={this.handleChange}
                />
                <FormFeedback>Invalid Number</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <Button
                type="submit"
                color="warning"
                className="text-white btn btn-warning fn"
              >
                Calculate
              </Button>
            </Col>
          </Row>
          <hr />
        </Form>
        {/*  */}
        {this.props.children}
      </Context.Provider>
    );
  }
}

// Consumer
const Consumer = Context.Consumer;

export { Provider, Consumer };
