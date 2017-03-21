import React, { Component } from 'react'
import { Accounts } from 'meteor/accounts-base'
import { Link } from 'react-router'

export default class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: ''
    }
    this.createAccount = this.createAccount.bind(this)
  }

  createAccount (e) {
    e.preventDefault()

    const email = this.refs.email.value.trim()
    const password = this.refs.password.value.trim()

    if (password.length < 6) return this.setState({ error: 'Password must be greater than 6 characters long' })

    Accounts.createUser({ email, password }, (err) => {
      if (err) this.setState({ error: err.reason })
      else this.setState({ error: '' })
    })
  }

  render () {
    return (
      <div className='boxed-view'>
        <div className='boxed-view__box'>
          <h1>Register</h1>
          <p>
            {this.state.error ? <h3>{this.state.error}</h3> : null}
          </p>
          <form className='boxed-view__form' onSubmit={(e) => this.createAccount(e)} noValidate>
            <input type='email' name='email' placeholder='Email' ref='email' />
            <input type='password' name='password' placeholder='Password' ref='password' />
            <button className='button'>Sign Up</button>
          </form>
          <Link to='/'>Already have an account?</Link>
        </div>
      </div>
    )
  }
}
