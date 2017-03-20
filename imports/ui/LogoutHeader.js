import React, { PropTypes } from 'react'
import { Accounts } from 'meteor/accounts-base'

const logOut = () => {
  Accounts.logout()
}

export const LogoutHeader = ({ title }) => (
  <div>
    <h1>{title}</h1>
    <button onClick={logOut}>Logout</button>
  </div>
)

LogoutHeader.propTypes = {
  title: PropTypes.string.isRequired
}
