import './App.css';
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <div className="container"><News pagesize= {5} country = {"us"} category ={"Entertainment"}/></div>
      </div>
    );
  }
}

export default App;

