import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ComposeSalad from './components/ComposeSalad';
import ViewOrder from './components/ViewOrder';
import ViewIngredient from './components/ViewIngredient';
import './App.css';
import Salad from './Salad'
import { rule } from '../node_modules/postcss';
import { promised } from 'q';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salads: [],
      inventory: {},
    }

    this.addSalad = this.addSalad.bind(this);
    this.removeSalad = this.removeSalad.bind(this);
  }

  fetchData() {
    const urls = ['foundations', 'proteins', 'extras', 'dressings']
    const baseUrl = "http://localhost:8080/"
    return (
      Promise.all(urls.map(url => fetch(baseUrl + url).then(resp => {
        if (resp.status === 200) {
          return resp.json()
        }
      })))
    )
  }
  fetchSubData(category, index) {
    const urls = ['foundations/', 'proteins/', 'extras/', 'dressings/']
    const baseUrl = "http://localhost:8080/"
    return (
      Promise.all(category.map(item => fetch(baseUrl + urls[index] + item)
        .then(resp => {
          if (resp.status === 200) {
            return resp.json()
          }
        }))))
  }

  // jim.forsberg@stockforsa.com

  postSalads(data) {
    console.log(data)
    fetch("http://localhost:8080/orders/", {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => response.json())
      .then(res => console.log(res))
  }

  componentDidMount() {
    for (var key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let val = localStorage.getItem(key)
        val = JSON.parse(val);
        const newState = []
        val.forEach(val => newState.push(Object.assign(new Salad(),val)));
        this.setState({[key]:newState})
      }
    }
    const names = this.fetchData()
      .then(res => res.reduce((a, b) => a.concat(b), []))

    const values = this.fetchData().then(categories => categories.map((category, index) => this.fetchSubData(category, index))
    ).then(res => Promise.all(res).then(res => res.reduce((a, b) => a.concat(b), [])));
    const obj = {}
    Promise.all([names, values])
      .then(res => {
        if (res[0].length === res[1].length) {
          for (var i = 0; i < res[0].length; i++) {
            obj[res[0][i]] = res[1][i]
          }
        }
        this.setState({ inventory: obj })
      })

    /* To post salads:  
    this.postSalads('["salad1","salad2"]');
    */
  }

  addSalad(salad) {
    const salads = [...this.state.salads]
    salads.push(salad)
    localStorage.setItem('salads', JSON.stringify(salads))
    this.setState({ salads: [...this.state.salads, salad] })
  }

  removeSalad(salad) {
    console.log(this.state)
    console.log(salad)
    const salads = [...this.state.salads]
    const newSalads = salads.filter(s => s!==salad);
    console.log(newSalads);
    localStorage.setItem('salads',JSON.stringify(newSalads))
    this.setState({salads: newSalads})
  }


  render() {
    console.log(this.state)
    const composeSaladWithProps = (props) => {
      return (
        <ComposeSalad {...props} inventory={this.state.inventory} addSalad={this.addSalad} />
      )
    }
    const viewOrderWithProps = (props) => {
      return (<ViewOrder {...props} salads={this.state.salads} removeSalad = {this.removeSalad}/>)
    };

    const home = (props) => {
      return (
        <div className="jumbotron text-center" style={{ background: 'none' }}>
          Landing page
        </div>
      )
    }

    const viewIngredientProps = (props) => {
      return (<ViewIngredient {...props} ingredient={this.state.inventory[props.match.params.name]} />)
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
            <Route path='/view-ingredient/:name' render={viewIngredientProps} />
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
