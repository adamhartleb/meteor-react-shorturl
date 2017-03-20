import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'

export default class AddLink extends Component {
  constructor (props) {
    super(props)
    this.state = {
      linkUrl: ''
    }
    this.createLink = this.createLink.bind(this)
  }
  createLink (e) {
    e.preventDefault()
    const { linkUrl } = this.state

    if (linkUrl) {
      Meteor.call('Links.Insert', linkUrl, (err, res) => {
        if (!err) this.setState({ linkUrl: '' })
      })
    }
  }
  render () {
    return (
      <div>
        <form onSubmit={this.createLink}>
          <input
            type='text'
            onChange={(e) => this.setState({ linkUrl: e.target.value })}
            value={this.state.linkUrl}
            placeholder='URL' />
          <button>Add Link</button>
        </form>
      </div>
    )
  }
}
