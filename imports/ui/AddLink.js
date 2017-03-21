import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import Modal from 'react-modal'

export default class AddLink extends Component {
  constructor (props) {
    super(props)
    this.state = {
      linkUrl: '',
      isModalOpen: false
    }
    this.createLink = this.createLink.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }
  createLink (e) {
    e.preventDefault()
    const { linkUrl } = this.state

    if (linkUrl) {
      Meteor.call('Links.Insert', linkUrl, (err, res) => {
        if (!err) this.setState({ linkUrl: '', isModalOpen: false })
      })
    }
  }
  openModal () {
    this.setState({ isModalOpen: true })
  }
  closeModal () {
    this.setState({ isModalOpen: false, linkUrl: '' })
  }
  render () {
    const { isModalOpen, linkUrl } = this.state
    return (
      <div>
        <button onClick={() => this.setState({ isModalOpen: true })}>+ Add Link</button>
        <Modal
          isOpen={isModalOpen}
          contentLabel='Add link'>
          <form onSubmit={this.createLink}>
            <input
              type='text'
              onChange={(e) => this.setState({ linkUrl: e.target.value })}
              value={linkUrl}
              placeholder='URL' />
            <button>Add</button>
          </form>
          <button onClick={this.closeModal}>Cancel</button>
        </Modal>
      </div>
    )
  }
}
