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

class LoanInputPanel extends Component {
  state = {};

  render() {
    return (
      <Form
        className="container mt-1"
        onSubmit={e => {
          e.preventDefault();
          this.props.value.amortization();
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
                // value={this.props.value.loanAmount}
                // onChange={this.props.value.handleChange}
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
                // value={this.props.value.loanTermInYears}
                // onChange={this.props.value.handleChange}
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
                name="interestRateYearly"
                // value={this.props.value.interestRateYearly}
                // onChange={this.props.value.handleChange}
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
    );
  }
}

export default LoanInputPanel;
