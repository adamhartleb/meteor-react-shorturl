import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import Modal from 'react-modal'

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
    this.setState({ isModalOpen: bool, url: '', error: '' })
  }
  render () {
    const { isModalOpen, linkUrl, urlName } = this.state
    return (
      <div>
        <h1>Links List</h1>
        <button className='button' onClick={() => this.handleModal(true)}>+ Add Link</button>
        <Modal
          isOpen={isModalOpen}
          contentLabel='Add link'
          onAfterOpen={() => this.refs.name.focus()}
          onRequestClose={() => this.handleModal(false)}
          className='boxed-view__box'
          overlayClassName='boxed-view boxed-view--overlay'>
          <h1>Add Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : null}
          <form className='boxed-view__form' onSubmit={this.createLink}>
            <input
              type='text'
              onChange={(e) => this.setState({ urlName: e.target.value })}
              value={urlName}
              placeholder='Give your link a name'
              ref='name' />
            <input
              type='text'
              onChange={(e) => this.setState({ linkUrl: e.target.value })}
              value={linkUrl}
              placeholder='URL'
              ref='url' />
            <button className='button'>Add</button>
            <button type='button' className='button button--secondary' onClick={() => this.handleModal(false)}>Cancel</button>
          </form>
        </Modal>
      </div>
    )
  }
}
