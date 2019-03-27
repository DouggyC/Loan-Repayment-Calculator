import React, { Component, Fragment } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
// import LoanInputPanel from './components/LoanInputPanel';
import RepaymentsTable from './components/RepaymentsTable';
import AreaGraph from './components/AreaGraph';
// import Parent from './components/sandbox/Parent';
import { Provider, Consumer } from './context';
import PieChart from './components/PieChart';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Provider>
          <Consumer>
            {value => (
              <div className="container">
                {/* Results Row */}
                <div className="row">
                  <div
                    className="col-md-6 px-0"
                    style={{
                      height: '50vh',
                      width: 'auto',
                      overflowY: 'scroll',
                      overflowX: 'hidden'
                    }}
                  >
                    <RepaymentsTable value={value} />
                  </div>
                  <div className="col-md-6 px-0">
                    <AreaGraph className="mt-1" value={value} />

                    <PieChart class="pl-5" value={value} />
                  </div>
                </div>
                <hr />
                {/*  */}
                <section className="container fixed-bottom">
                  <footer className="card text-center">
                    By Douglas Chan {'\u00A9'} 2019
                  </footer>
                </section>
              </div>
            )}
          </Consumer>
        </Provider>
      </Fragment>
    );
  }
}

export default App;
