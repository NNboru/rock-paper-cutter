import './App.css';
import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Header from './components/Header.js'
import Home from './components/Home.js'
import Auth from './components/Auth.js'

class App extends React.Component{
  render(){
    return (
      <>
        <Header />
        <Router>
          <Switch>
            <Route path={['/room/:roomid/:pass','/room/:roomid']}>
              <Auth />
            </Route>
            <Route exact path='/'>
              <Home />
            </Route>
            <Redirect to='/' />
          </Switch>
        </Router>
      </>
    )
  }

}

export default App;
