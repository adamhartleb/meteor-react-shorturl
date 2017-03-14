import React, { Component } from 'react'
import { browserHistory } from 'react-router'

export default class Links extends Component {
  render () {
    return (
      <div>
        <button onClick={() => browserHistory.push('/')}>
          Logout
        </button>
      </div>
    )
  }
}
