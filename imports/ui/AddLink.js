import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import Overlay from './Overlay'

export default class AddLink extends Component {
  constructor (props) {
    super(props)
    this.state = {
      linkUrl: '',
      urlName: '',
      isModalOpen: false,
      error: ''
    }
    this.createLink = this.createLink.bind(this)
    this.handleModal = this.handleModal.bind(this)
  }
  createLink (e) {
    e.preventDefault()
    const { linkUrl, urlName } = this.state

    Meteor.call('Links.Insert', linkUrl, urlName, (err, res) => {
      if (!err) this.handleModal(false)
      else this.setState({ error: err.reason })
    })
  }
  handleModal (bool) {
    this.setState({ isModalOpen: bool, linkUrl: '', urlName: '', error: '' })
  }
  render () {
    return (
      <div>
        <h1>Links List</h1>
        <button className='button' onClick={() => this.handleModal(true)}>+ Add Link</button>
        <Overlay
          display='initial'
          title={'Add'}
          createLink={this.createLink}
          handleModal={this.handleModal}
          handleUrlName={(e) => this.setState({urlName: e.target.value})}
          handleUrl={(e) => this.setState({linkUrl: e.target.value})}
          {...this.state} />
      </div>
    )
  }
}
