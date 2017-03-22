import React, { PropTypes } from 'react'
import { Accounts } from 'meteor/accounts-base'

const logOut = () => {
  Accounts.logout()
}

export const LogoutHeader = ({ title }) => (
  <div className='header'>
    <div className='header__logout'>
      <h1 className='header__title'>{title}</h1>
      <button className='button button--logout' onClick={logOut}>Logout</button>
    </div>
  </div>
)

LogoutHeader.propTypes = {
  title: PropTypes.string.isRequired
}
