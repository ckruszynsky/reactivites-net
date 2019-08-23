import './App.css';

import axios from 'axios';
import React, { Component } from 'react';

import logo from './logo.svg';

class App extends Component {
  state = {
    values: []
  };

  componentDidMount() {
    axios.get("http://localhost:5000/api/values").then(response => {
      this.setState({
        values: response.data
      });
    });
  }

  public render() {
    const { values } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ul>
            {values.map((v: any) => (
              <li key={v.id}>{v.name}</li>
            ))}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
