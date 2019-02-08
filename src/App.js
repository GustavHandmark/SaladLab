import React, { Component } from 'react';
import ComposeSalad from './components/ComposeSalad';
import ViewOrder from './components/ViewOrder';
import inventory from './inventory.ES6';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salads: [],
    }

    this.addSalad = this.addSalad.bind(this);
  }

  addSalad(salad) {
    this.setState({ salads: [...this.state.salads, salad] })
  }


  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1>Salad Bar</h1>
          <p>Here you can order custom-made salads!</p>
        </div>
        <div>
          <ComposeSalad inventory = {inventory} addSalad={this.addSalad} />
        </div>
        <br />
        <div className="container">
          <h3> Your orders </h3>
          <ViewOrder salads={this.state.salads} />
        </div>
      </div>
    );
  }
}

export default App;
