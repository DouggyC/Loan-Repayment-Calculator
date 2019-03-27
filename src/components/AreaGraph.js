import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class AreaGraph extends Component {
  state = {
    options: {
      // Title
      title: {
        // text: ß,
        align: 'left',
        offsetX: 62,
        offsetY: 20,
        margin: 0,
        style: {
          fontSize: '1rem'
        }
      },
      subtitle: {
        // text:,
        offsetX: 92,
        margin: 0
      },

      chart: {
        fontFamily: 'Oswald'
      },
      colors: ['#ff69b4', '#0d98ba'],
      // chart: {
      //   id: 'area-bar'
      // },
      grid: {
        position: 'front',
        show: true,
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      },

      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'right',
        markers: {
          radius: 0
        }
      },

      // Loan Amount
      yaxis: {
        axisBorder: {
          show: true,
          color: '#17a2b8',
          offsetX: 0,
          offsetY: 0
        },
        title: {
          text: 'Loan Amount ($)',
          style: {
            fontSize: '1rem'
          }
        },
        offsetX: 0,
        min: 0,
        max: this.maxValue()
        // range:
      },

      // Years
      xaxis: {
        type: 'datetime',
        // tickAmount: 10,
        // tickPlacement: 'on',
        min: new Date().getTime() - 86400,
        // max: ,
        title: {
          text: 'Term (months / years)',
          offsetY: -15,
          style: {
            fontSize: '1rem'
          }
        },
        labels: {
          format: "MMM 'yy"
        },
        axisTicks: {
          show: true,
          borderType: 'solid',
          color: '#78909C',
          height: 10,
          offsetX: 0,
          offsetY: 0
        }
      },

      tooltip: {
        x: {
          format: 'dd MMM yyyy'
        }
      },
      plotOptions: {},
      noData: {
        text: 'Please enter Loan Information'
      }
    },

    // MM / D / YYYY
    series: []
  };
  //
  maxValue(max) {
    if (!this.props.value.pieSeries.length) {
      return null;
    } else if (this.props.value.pieSeries.length) {
      max = this.props.value.pieSeries.reduce((r, i) => r + i);
      console.log(max);
      return max;
    }
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.props.value.areaSeries}
        type="area"
        width="99%"
        height="auto"
      />
    );
  }
}

export default AreaGraph;
