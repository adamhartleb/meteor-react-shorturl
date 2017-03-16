import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Link } from '../api/links'

export default class LinksList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      linkList: []
    }
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
  render () {
    return (
      <div>
        <h3>Links List</h3>
        <ul>
          {this.state.linkList.map(link => {
            return <li key={link._id}><a href={'localhost:3000/' + link._id}>{link.url}</a></li>
          })}
        </ul>
      </div>
    )
  }
}
