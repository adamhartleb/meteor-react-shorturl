import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'

export default class AddLink extends Component {
  constructor (props) {
    super(props)
    this.createLink = this.createLink.bind(this)
  }
  createLink (e) {
    e.preventDefault()
    const url = this.refs.linkUrl.value.trim()

    if (url) {
      Meteor.call('Links.Insert', url)
      this.refs.linkUrl.value = ''
    }
  }
  render () {
    return (
      <div>
        <form onSubmit={this.createLink}>
          <input type='text' ref='linkUrl' placeholder='URL' />
          <button>Add Link</button>
        </form>
      </div>
    )
  }
}
