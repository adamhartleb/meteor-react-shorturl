import React from 'react'
import { Link } from 'react-router'

const FourOhFour = () => {
  return (
    <div className='boxed-view'>
      <div className='boxed-view__box'>
        <h1>Page Not Found</h1>
        <Link to='/' className='button--link'>Take me home</Link>
      </div>
    </div>
  )
}

export default FourOhFour
