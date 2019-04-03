import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Feed from './components/feed/Feed'
import ContentDetails from './components/content/ContentDetails'
import SignIn from './components/auth/signIn'
import SignUp from './components/auth/signUp'
import AddContent from './components/content/AddContent'

class App extends Component {
  render() {
    // const AddContentComponent = <AddContent divType="container"/>
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <header className="App-header">
            <div className="container">
              <img src={logo} className="App-logo" alt="logo" width="75" height="75" />
            </div>
          </header>
          <Switch>
            <Route exact path='/'component={Feed} />
            <Route path='/content/:id' component={ContentDetails} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/add' component={AddContent}/>
          </Switch>
        </div>
      </ BrowserRouter>
    );
  }
}

export default App;
