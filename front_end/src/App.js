import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from  'socket.io-client'

class App extends Component {
constructor(){
  super();
  this.state = { socket:null,
  globalNumber:0 , 
  texts:[
    {username:'hell' , text:' welcome to hell '}
  ]  
}
}  
  componentDidMount(){
    const socket = io('http://localhost:8888');

    this.setState({socket:socket})

    socket.on('number:change' , (globalNumber) => {
      this.setState({globalNumber})
    })

    socket.on('message' , (username , text)=>{
      const message = {username , text}
      const texts = [ ...this.state.texts , message]
      this.setState({texts})
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
  
  handleChange = (evt) =>{
    evt.preventDefault()
    const text = evt.target.text.value
    if(!text) {return;}
    evt.target.text.value = ' ';
    const username = evt.target.username.value
    this.state.socket.emit('message' , username , text)
    
    console.log(this.state.text)
  }
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
            <input name='username' defaultValue='hellMaker'/>
            <input name='text' defaultValue='hello from hell'/>
            <button>submit</button>

        </form>


        <button onClick={this.onIncrement}>increament</button>
        <button onClick={this.onDecrement}>decrement</button>

        <div style={{width:'100%' , height:'500'}}>
          {this.state.texts.map(
            (message)=>
            <div>
              {message.username}
              {message.text}
            </div>
          )
     

                   
        }
        </div>

      </div>
    );
  }
}

export default App;
