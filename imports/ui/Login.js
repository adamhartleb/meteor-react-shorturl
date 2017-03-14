import React, { Component } from 'react'
import { Link } from 'react-router'
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
      err ? this.setState({ error: 'Wrong email or password. Try again.' }) : this.setState({ error: '' })
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
          {this.state.error ? <h3>{this.state.error}</h3> : null}
        </div>
        <Link to='/register'>Don't have an account?</Link>
      </div>
    )
  }
}
