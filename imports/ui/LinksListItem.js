import React, { Component } from 'react'
import Clipboard from 'clipboard'
import { Meteor } from 'meteor/meteor'

export default class LinkListItem extends Component {
  componentDidMount () {
    this.clip = new Clipboard(this.refs.urlCopy)
  }
  componentWillUnmount () {
    this.clip.destroy()
  }
  changeHiddenStatus (id, hidden) {
    Meteor.call('Links.UpdateHidden', id, hidden)
  }
  render () {
    const { _id, copied, currentCopied, hidden } = this.props
    const url = Meteor.absoluteUrl()
    return (
      <div>
        <p>{url + _id}</p>
        <button
          onClick={() => { copied(_id) }}
          ref='urlCopy'
          data-clipboard-text={url + _id}>
          {currentCopied === _id ? 'Copied' : 'Copy'}
        </button>
        <button onClick={() => this.changeHiddenStatus(_id, hidden)}>
          {hidden ? 'Unhide' : 'Hide'}
        </button>
      </div>
    )
  }
}
