import React, {Component} from 'react'
import Modal from 'react-modal'

export default class Overlay extends Component {
  render () {
    const { urlName
          , title
          , linkUrl
          , createLink
          , handleModal
          , handleUrlName
          , handleUrl
          , isModalOpen
          , error
          } = this.props
    return (
      <Modal
        isOpen={isModalOpen}
        contentLabel='Add link'
        onAfterOpen={() => this.refs.name.focus()}
        onRequestClose={() => handleModal(false)}
        className='boxed-view__box'
        overlayClassName='boxed-view boxed-view--overlay'>
        <h1>{title} Link</h1>
        {error
          ? <p>{error}</p>
          : null}
        <form className='boxed-view__form' onSubmit={createLink}>
          <input
            type='text'
            onChange={handleUrlName}
            value={urlName}
            placeholder='Give your link a name'
            ref='name' />
          <input
            style={{display: this.props.display}}
            type='text'
            onChange={handleUrl}
            value={linkUrl}
            placeholder='URL'
            ref='url' />
          <button className='button'>{title}</button>
          <button
            type='button'
            className='button button--secondary'
            onClick={() => handleModal(false)}>Cancel</button>
        </form>
      </Modal>
    )
  }
}
