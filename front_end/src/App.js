import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from  'socket.io-client'

class App extends Component {

  state = {socket:null , globalNumber:0}

  componentDidMount(){
    const socket = io('http://localhost:8888');

    this.setState({socket})

    socket.on('number:change' , (globalNumber) => {
      this.setState({globalNumber})
    })
  }

  onIncrement = () => this.state.socket.emit('increment')
  onDecrement = () => this.state.socket.emit('decrement')
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
