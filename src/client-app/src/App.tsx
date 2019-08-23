import './App.css';

import React, { Component } from 'react';

import logo from './logo.svg';

class App extends Component {
  state = {
    values: []
  };

  componentDidMount() {
    this.setState({
      values: [{ id: 1, name: "Value 101" }, { id: 2, name: "Value 102" }]
    });
  }

  public render() {
    const {values} = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ul>
            {values.map((v:any)=> <li>{v.name}</li>)}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
