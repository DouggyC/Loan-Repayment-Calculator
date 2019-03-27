import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class PieChart extends Component {
  state = {
    repay: 0,
    // Data - totalLoanRepayment = totalPrin + totalInt
    series: [],
    options: {
      grid: {
        padding: {
          left: 30
        }
      },
      chart: {
        fontFamily: 'Oswald'
      },
      // Legend labesl
      labels: ['Principal', 'Interest'],
      legend: {
        position: 'left'
      },
      title: {
        // text: ,
        offsetX: 62,
        offsetY: 10,
        style: {
          fontSize: '1rem'
        }
      },
      subtitle: {
        // text:,
        offsetX: 102
      },
      dataLabels: {
        style: {
          fontSize: '3vh'
        }
      },
      noData: {
        text: 'Please enter Loan Information',
        verticalAlign: 'top'
      }
    }
  };

  render() {
    // console.log(Chart.updateSeries());

    // console.log(this.props.value);

    return (
      <Chart
        options={this.state.options}
        series={this.props.value.pieSeries}
        type="pie"
        width="400"
        height="auto"
      />
    );
  }
}

export default PieChart;
