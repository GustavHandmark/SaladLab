import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ComposeSalad from './components/ComposeSalad';
import ViewOrder from './components/ViewOrder';
import inventory from './inventory.ES6';
import ViewIngredient from './components/ViewIngredient';
import './App.css';
import { rule } from '../node_modules/postcss';

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
    const composeSaladWithProps = (props) => {
      return (
        <ComposeSalad {...props} inventory={inventory} addSalad={this.addSalad} />
      )
    }
    const viewOrderWithProps = (props) => {
      return (<ViewOrder {...props} salads={this.state.salads} />)
    };

    const home = (props) => {
      return (
        <div className="jumbotron text-center" style={{ background: 'none' }}>
          Landing page
        </div>
      )
    }

    const viewIngredientProps = (props) => {
      return (<ViewIngredient {...props} ingredient={inventory[props.match.params.name]}/>)
    }

    const page404 = () => {
      return (<div className="jumbotron text-center" style={{ background: 'none' }}>
        Page not found 404
              </div>)
    }
    return (
      <Router>
        <div>
          <div className="jumbotron text-center">
            <h1>Salad Bar</h1>
            <p>Here you can order custom-made salads!</p>
          </div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-brand">Menu</div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/compose-salad'>Compose your salad</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/view-order'> View your orders</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
            <Route path='/' exact component={home} />
            <Route path='/compose-salad' render={composeSaladWithProps} />
            <Route path='/view-order' render={viewOrderWithProps} />
            <Route path='/view-ingredient/:name' render={viewIngredientProps}/>
            <Route component={page404} />
          </Switch>
          <div className="pb-5 footer navbar-fixed-bottom" />
        </div>
      </Router>
    );
  }
}

export default App;

    /*
<div className="jumbotron text-center">
          <h1>Salad Bar</h1>
          <p>Here you can order custom-made salads!</p>
        </div>
        <ul className="nav nav-pills navbar-right">
          <li className="nav-item">
            <Link className="nav-link" to='compose-salad'>Compose your salads</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='view-order'> View your orders</Link>
          </li>
        </ul>
        */
