import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from  'socket.io-client'

class App extends Component {

  state = {socket:null , globalNumber:0}

  componentDidMount(){
    const socket = io('http://localhost:8888');

    this.setState({socket:socket})

    socket.on('number:change' , (globalNumber) => {
      this.setState({globalNumber})
    })
    socket.on('user:new',(username) =>{
      console.log('a user called ' + username + ' is connected')
    })

    socket.on ('user:me' , (username)=>{
      this.setState({username})
    })
  }

  onIncrement = () => this.state.socket.emit('increment')
  onDecrement = () => this.state.socket.emit('decrement')
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title" >Welcome to React</h1>
        </header>
        <h1>{this.state.globalNumber}</h1>

        <h1>{this.state.username}</h1>
        <button onClick={this.onIncrement}>increament</button>
        <button onClick={this.onDecrement}>decrement</button>
      </div>
    );
  }
}

export default App;
