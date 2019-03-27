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
import LoanInfo from './components/LoanInfo';

const Context = React.createContext();

// Provider
class Provider extends Component {
  state = {
    repaymentSchedule: [],
    // Principal
    loanAmount: '',
    // Term
    loanTermInYears: '',
    // Interest
    yearIntRate: '',
    // Month Counter

    months: 1,

    // Over Time Total Repayment; to date
    totalIntRepaid: 0, // total interest paid to date

    grandTotalIntRepaid: 0, // Total Loan Interest Repaid
    grandTotalLoanRepaid: 0, // loanAmount + total repaid interest
    // Charts data series
    pieSeries: [],
    areaSeries: [],
    areaSeriesDataPrin: {
      name: 'Principal',
      data: []
    },
    areaSeriesDataInt: {
      name: 'Interest',
      data: []
    }
  };

  reset = e => {
    e.preventDefault();
    this.setState({
      repaymentSchedule: [],
      loanAmount: 0,
      loanTermInYears: 0,
      yearIntRate: 0,
      months: 1,
      pieSeries: [0, 0],
      areaSeries: [0, 0],
      areaSeriesDataInt: {
        name: 'Principal',
        data: []
      },
      areaSeriesDataPrin: {
        name: 'Interest',
        data: []
      },
      grandTotalIntRepaid: 0,
      grandTotalLoanRepaid: 0
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  amortization = (principal, months, totalInt, e) => {
    e.preventDefault();

    // console.log(this.state.areaSeries[0].data);

    // State variables
    const {
      repaymentSchedule,
      yearIntRate,
      loanAmount,
      areaSeriesDataPrin,
      areaSeriesDataInt
    } = this.state;

    // Calculation variables
    const mnthIntRate = yearIntRate / 100 / 12;
    const loanTermInMonths = this.state.loanTermInYears * 12;

    // Monthly variables
    let mnthIntRepay, mnthPrinRepay;

    // Date for Area Graph Data
    let d = new Date().getDate() + 1; // 1-31
    let M = new Date().getMonth() + 1; // 1-12
    let yyyy = new Date().getFullYear(); // 2019

    // Calculate Monthly Repayment
    const mnthRepayment = parseFloat(
      (
        (mnthIntRate * this.state.loanAmount) /
        (1 - (1 + mnthIntRate) ** -loanTermInMonths)
      ).toFixed(2)
    );

    let item = {
      month: months,
      startPrin: principal,
      mnthRepay: mnthRepayment,
      mnthPrin: 0,
      mnthInt: 0,
      remainingPrin: 0,
      totIntToDate: 0
    };

    // Turns number of months into readable 1-12 date, for areaSeriesData ${m}
    function readableMonths(num) {
      let mnthNames = [
        '',
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov'
      ];
      if (num % 12 === 0) {
        return 'Dec';
      } else {
        return mnthNames[num % 12];
      }
    }

    if (months === loanTermInMonths + 1) {
      // console.log('i', principal, months, totalInt, loanAmount, 'gratz');

      areaSeriesDataPrin.data.push({
        x: `${readableMonths(M + months)}/${d}/${Math.floor(
          (M + months) / 12.1
        ) + yyyy}`,
        y: parseFloat(principal).toFixed(0)
      });
      areaSeriesDataInt.data.push({
        x: `${readableMonths(M + months)}/${d}/${Math.floor(
          (M + months) / 12.1
        ) + yyyy}`,
        y: parseFloat(totalInt).toFixed(0)
      });

      this.setState({
        repaymentSchedule: repaymentSchedule,
        pieSeries: [parseInt(loanAmount), totalInt],
        areaSeries: [areaSeriesDataPrin, areaSeriesDataInt],
        grandTotalIntRepaid: parseFloat(totalInt).toFixed(2),
        grandTotalLoanRepaid: parseFloat(
          (parseInt(loanAmount) + totalInt).toFixed(2)
        )
      });
    } else if (months === 1) {
      areaSeriesDataPrin.data.push({
        x: `${readableMonths(M)}/${d}/${Math.floor((M + months) / 12.1) +
          yyyy}`,
        y: parseFloat(principal).toFixed(0)
      });
      areaSeriesDataInt.data.push({
        x: `${readableMonths(M)}/${d}/${Math.floor((M + months) / 12.1) +
          yyyy}`,
        y: parseFloat(totalInt).toFixed(0)
      });

      months++;

      mnthIntRepay = principal * mnthIntRate;
      item.mnthInt = parseFloat(mnthIntRepay.toFixed(3));

      totalInt = parseFloat(mnthIntRepay.toFixed(3));
      item.totIntToDate = totalInt;

      mnthPrinRepay = mnthRepayment - mnthIntRepay;
      item.mnthPrin = parseFloat(mnthPrinRepay.toFixed(3));

      principal -= mnthPrinRepay;
      item.remainingPrin = parseFloat(principal.toFixed(2));

      repaymentSchedule.push(item);

      // console.log('ei', principal, repaymentSchedule, months.totalInt);
      return this.amortization(principal, months, totalInt, e);
    } else {
      // Building data
      areaSeriesDataPrin.data.push({
        x: `${readableMonths(M + months - 1)}/${d}/${Math.floor(
          (M + months - 1) / 12.1
        ) + yyyy}`,
        y: parseFloat(principal).toFixed(0)
      });
      areaSeriesDataInt.data.push({
        x: `${readableMonths(M + months - 1)}/${d}/${Math.floor(
          (M + months - 1) / 12.1
        ) + yyyy}`,
        y: parseFloat(totalInt).toFixed(0)
      });
      months++;
      item.startPrin = parseFloat(principal.toFixed(2));

      mnthIntRepay = principal * mnthIntRate;
      item.mnthInt = parseFloat(mnthIntRepay.toFixed(3));

      totalInt = parseFloat((mnthIntRepay + totalInt).toFixed(3));
      item.totIntToDate = totalInt;
      mnthPrinRepay = mnthRepayment - mnthIntRepay;
      item.mnthPrin = parseFloat(mnthPrinRepay.toFixed(3));

      principal -= mnthPrinRepay;
      item.remainingPrin = parseFloat(principal.toFixed(2));

      repaymentSchedule.push(item);

      // console.log('e', principal, repaymentSchedule, months, totalInt);
      return this.amortization(principal, months, totalInt, e);
    }
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
          onSubmit={e =>
            this.amortization(
              this.state.loanAmount,
              this.state.months,
              this.state.totalIntRepaid,
              e
            )
          }
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
                  value={parseFloat(this.state.loanAmount)}
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
                  step="0.01"
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
                className="text-white btn btn-warning fn mr-2"
              >
                Calculate
              </Button>
              <Button
                onClick={this.reset}
                className="text-white btn btn-success fn ml-2"
              >
                Reset
              </Button>
            </Col>
          </Row>
          <hr />
        </Form>
        <Row className="container mx-auto">
          <Col>
            <Consumer>{value => <LoanInfo value={value} />}</Consumer>
          </Col>
        </Row>
        <hr />
        {/*  */}
        {this.props.children}
      </Context.Provider>
    );
  }
}

// Consumer
const Consumer = Context.Consumer;

export { Provider, Consumer };
