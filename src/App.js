import React, { Component } from 'react';
import './App.css';
import { status } from './api';

const initialState = {
  status: 'no status'
  };
class App extends Component {
  
  constructor(props) {
  super(props);
  this.state = initialState
  }
  componentDidMount(){
    status((data) => this.setState({status: data}))
  }

  render() {
    return (
      <div className="App">
      <p>
        Changelly socket: {this.state.status}
      </p>
    </div>
    );
  }
}

export default App;
