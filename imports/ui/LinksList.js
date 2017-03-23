import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Link } from '../api/links'
import FlipMove from 'react-flip-move'
import LinkListItem from './LinksListItem'

export default class LinksList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      linkList: [],
      currentCopied: '',
      showHidden: false
    }
    this.copied = this.copied.bind(this)
  }
  componentDidMount () {
    this.linkTracker = Tracker.autorun(() => {
      Meteor.subscribe('links')
      this.setState({
        linkList: Link.find().fetch()
      })
    })
  }
  componentWillUnmount () {
    this.linkTracker.stop()
  }
  copied (id) {
    if (this.state.currentCopied === '') this.setState({ currentCopied: id })
    if (this.state.currentCopied.id !== id) this.setState({ currentCopied: id })
  }
  render () {
    let { linkList, currentCopied, showHidden } = this.state
    return (
      <div>
        <div className='checkbox'>
          <input id='hidden' type='checkbox' onChange={() => this.setState({ showHidden: !showHidden })} />
          <label htmlFor='hidden'> Show Hidden</label>
        </div>
        {linkList.filter(link => link.hidden === showHidden).map(link => {
          return (
            <LinkListItem
              currentCopied={currentCopied}
              copied={this.copied} key={link._id} {...link} />
          )
        })}
      </div>
    )
  }
}
