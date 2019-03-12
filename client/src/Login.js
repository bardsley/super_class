// components/Login.js

import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from './store/actions'

class Login extends Component {

  render() {
    const { errorMessage } = this.props
    if(this.props.isAuthenticated) { this.props.history.push("/"); } 
    return <div>
      <form>
        <input type='text' ref='username' className="form-control" placeholder='Username'/><br/>
        <input type='password' ref='password' className="form-control" placeholder='Password'/><br/>
        <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
          Login
        </button>

        {errorMessage && <p>{errorMessage}</p> }
      </form>
    </div>
  }

  handleClick(event) {
    event.preventDefault()
    const username = this.refs.username
    const password = this.refs.password
    const creds = { username: username.value.trim(), password: password.value.trim() }
    this.props.onLoginClick(creds)
  }
}
const mapStateToProps = state => {
    return {
      lesson: state.content.lesson,
      isAuthenticated: state.auth.isAuthenticated
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onLoginClick: (creds) => dispatch(actions.loginUser(creds))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Login)