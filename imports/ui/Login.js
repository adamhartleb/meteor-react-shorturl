import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { Meteor } from 'meteor/meteor'

export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: ''
    }
    this.logUserIn = this.logUserIn.bind(this)
  }

  logUserIn (e) {
    e.preventDefault()

    const email = this.refs.email.value.trim()
    const password = this.refs.password.value.trim()

    Meteor.loginWithPassword({ email }, password, (err) => {
      if (err) {
        this.setState({
          error: err.reason
        })
      } else {
        browserHistory.push('/links')
      }
    })
  }
  render () {
    return (
      <div>
        <form onSubmit={(e) => this.logUserIn(e)}>
          <input type='email' name='email' placeholder='Email' ref='email' />
          <input type='password' name='password' placeholder='Password' ref='password' />
          <button>Login</button>
        </form>
        <div>
          {this.state.error ? <div>{this.state.error}</div> : null}
        </div>
        <Link to='/register'>Don't have an account?</Link>
      </div>
    )
  }
}
