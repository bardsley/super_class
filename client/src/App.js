import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from './store/actions'

// eslint-disable-next-line
import Header from './Header'
import Menu from './Menu';
import Content from './Content';
import Login from './Login';
import './App.css';

class App extends Component {

  render() {
    let middle_bit = this.props.isAuthenticated ? <Content/> : <Login/>

    return <div className="mdl-layout mdl-js-layout">
        <Header />
        <Menu/>
        {middle_bit}
      </div>
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadStudents: () => dispatch(actions.loadStudents())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
