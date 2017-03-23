import React, { Component } from 'react'
import Clipboard from 'clipboard'
import EditLink from './EditLink'
import { Meteor } from 'meteor/meteor'

export default class LinkListItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lastVisitTime: ''
    }
    this.calculateLastVisit = this.calculateLastVisit.bind(this)
  }
  componentDidMount () {
    this.clip = new Clipboard(this.refs.urlCopy)
    this.calculateLastVisit()
  }
  componentWillUnmount () {
    this.clip.destroy()
  }
  changeHiddenStatus (id, hidden) {
    Meteor.call('Links.UpdateHidden', id, hidden)
  }
  deleteLink (id) {
    Meteor.call('Links.DeleteLink', id)
  }
  calculateLastVisit () {
    if (!time) return this.setState({ lastVisitTime: 'Not visited yet' })
    let time = this.props.lastVisitedAt.getTime()
    let now = new Date().getTime()
    let timeDiff = now - time
    let timeDiffDays = Math.floor(timeDiff / 1000 / 60 / 60 / 24)
    let timeDiffHours = Math.floor((timeDiff / 1000 / 60 / 60) % 24)
    let timeDiffMinutes = Math.floor((timeDiff / 1000 / 60) % 60)
    if (timeDiff < 60000) this.setState({ lastVisitTime: 'Less than a minute ago' })
    else if (timeDiffDays === 0 && timeDiffHours === 0) this.setState({ lastVisitTime: `${timeDiffMinutes} minute(s) ago` })
    else if (timeDiffDays === 0) this.setState({ lastVisitTime: `${timeDiffHours} hour(s), ${timeDiffMinutes} minute(s) ago` })
    else this.setState({ lastVisitTime: `${timeDiffDays} day(s), ${timeDiffHours} hour(s), ${timeDiffMinutes} minute(s) ago` })
  }
  render () {
    const { _id, copied, currentCopied, hidden, name, visitedCount } = this.props
    const url = Meteor.absoluteUrl()
    return (
      <div className='link'>
        <h3>{name}</h3>
        <p>{url + _id}</p>
        <p>Time's visited: {visitedCount}</p>
        <p>Last time visited: {this.state.lastVisitTime}</p>
        <div className='link__buttons'>
          <div>
            <a onClick={() => this.calculateLastVisit()} className='button button--link button--pill' href={url + _id} target='_blank'>
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
            <EditLink linkId={_id} />
            <button onClick={() => this.deleteLink(_id)} className='button button--pill button--delete'>Delete</button>
          </div>
        </div>
      </div>
    )
  }
}
