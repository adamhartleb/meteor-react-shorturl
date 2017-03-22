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
    const { _id, copied, currentCopied, hidden, name, visitedCount } = this.props
    const url = Meteor.absoluteUrl()
    return (
      <div className='link'>
        <h3>{name}</h3>
        <p>{url + _id}</p>
        <p>Time's Visited: {visitedCount}</p>
        <div className='link__buttons'>
          <div>
            <a className='button button--link button--pill' href={url + _id} target='_blank'>
              Visit
            </a>
            <button
              className='button button--pill'
              onClick={() => { copied(_id) }}
              ref='urlCopy'
              data-clipboard-text={url + _id}>
              {currentCopied === _id ? 'Copied' : 'Copy'}
            </button>
            <button
              className='button button--pill'
              onClick={() => this.changeHiddenStatus(_id, hidden)}>
              {hidden ? 'Unhide' : 'Hide'}
            </button>
          </div>
          <div>
            <button className='button button--pill'>Edit</button>
            <button className='button button--pill button--delete'>Delete</button>
          </div>
        </div>
      </div>
    )
  }
}
