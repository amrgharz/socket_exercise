import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from  'socket.io-client'

class App extends Component {
constructor(){
  super();
  this.state = { socket:null , globalNumber:0 , value:''}
}

handleChange = (evt) =>{
  evt.preventDefault()
  const input_value = evt.target.input.value
  this.setState({input_value})
  console.log(this.state.input_value)
}
  
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

        <div>{this.state.onChange}</div>
        
        <form onSubmit={this.handleChange}>
            <input type='text' placeholder='type' name='input'  />
            <input type='submit'/>

        </form>


        <button onClick={this.onIncrement}>increament</button>
        <button onClick={this.onDecrement}>decrement</button>
      </div>
    );
  }
}

export default App;
