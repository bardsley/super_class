import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from './store/actions'

// eslint-disable-next-line
import Content from './Content';
import './App.css';

class App extends Component {

  render() {
    if(!this.props.isAuthenticated) { this.props.history.push("/login") }
    return <Content/>
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
