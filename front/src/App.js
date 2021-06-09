import './App.css';
import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Header from './components/Header.js'
import Home from './components/Home.js'
import Main from './components/Main.js'
import Loader from './components/Loader.js'
import {io} from 'socket.io-client'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      loading: true,
      error  : false
    }
  }
  
  getRoom = ()=>{
    this.socket = io()
    this.socket.emit('get room', this.roomid, room=>{
      this.room = room
      this.setState({loading:false})
    })
  }

  render(){
    return (
      <>
        <Header />
        <Router>
          <Switch>
            <Route path='/room/:id' render={prop=>{
              const roomid = prop.match.params.id
              this.roomid=roomid
              return this.state.loading? 
                <Loader error={this.state.error} /> : 
                <Main socket={this.socket} room={this.room} roomid={roomid} /> 
            }} />
            <Route exact path='/'>
              <Home />
            </Route>
            <Redirect to='/' />
          </Switch>
        </Router>
      </>
    )
  }

  componentDidMount(){
    // preloading images
    new Image().src = '/img/stone.png'
    new Image().src = '/img/paper.png'
    const img = new Image()
    img.addEventListener('load', this.getRoom )
    img.src = '/img/scissor.png'


  }

}

export default App;
