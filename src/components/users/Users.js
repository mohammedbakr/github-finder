import React from 'react'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types' // impt => shortcut

const Users = ({ loading, users }) => {
  if (loading) {
    return <Spinner />
  }

  return (
    <div style={userStyle}>
      {users.map(user => <UserItem id={user.id} user={user} key={user.id} />)}
    </div>
  )
}

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
}

Users.propTypes = {
  users: PropTypes.array.isRequired, // ptar => shortcut
  loading: PropTypes.bool.isRequired // ptbr => shortcut
}

export default Users
