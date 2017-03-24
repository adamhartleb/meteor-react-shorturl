import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import Overlay from './Overlay'

export default class EditLink extends Component {
  constructor (props) {
    super(props)
    this.state = {
      linkUrl: '',
      urlName: '',
      isModalOpen: false,
      error: ''
    }
    this.editLink = this.editLink.bind(this)
    this.handleModal = this.handleModal.bind(this)
  }
  editLink (e) {
    e.preventDefault()
    const { urlName } = this.state
    const { linkId } = this.props
    Meteor.call('Links.UpdateLink', linkId, urlName, (err, res) => {
      if (!err) this.handleModal(false)
      else this.setState({ error: err.reason })
    })
  }
  handleModal (bool) {
    this.setState({ isModalOpen: bool, linkUrl: '', urlName: '', error: '' })
  }
  render () {
    return (
      <span>
        <button className='button button--pill' onClick={() => this.handleModal(true)}>Edit</button>
        <Overlay
          display='none'
          title={'Edit'}
          createLink={this.editLink}
          handleModal={this.handleModal}
          handleUrlName={(e) => this.setState({urlName: e.target.value})}
          handleUrl={(e) => this.setState({linkUrl: e.target.value})}
          {...this.state} />
      </span>
    )
  }
}
