import React, { Component } from 'react';
// eslint-disable-next-line
import logo from './logo.svg';
import Header from './Header'
import Menu from './Menu';
import Content from './Content';
import './App.css';

class App extends Component {

  render() {
    return <div className="mdl-layout mdl-js-layout">
      <Header />
      <Menu/>
      <Content/>
    </div>
  }
}

export default App;
