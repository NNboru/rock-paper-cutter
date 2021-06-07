import './App.css';
import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Header from './components/Header.js'
import Home from './components/Home.js'
import Main from './components/Main.js'
import Loader from './components/Loader.js'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      loading: true,
      error  : false
    }
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
                <Main players={this.players} roomid={roomid} /> 
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
    fetch(`/room/${this.roomid}/players`).then(v=>{
      if(v.ok)
        return v.json();
      v.text().then(e=>document.body.innerHTML=e)
      throw new Error('Error '+v.status + ': '+v.statusText)
    }).then(players=>{
      this.players = players;
      this.setState({loading:false})
    }).catch(e=>{
      this.setState({error:e.message})
    })
  }
}

export default App;
