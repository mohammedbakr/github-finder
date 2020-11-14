import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Search = ({ showClear, clearUsers, setAlert, searchUsers }) => {
  const [text, setText] = useState('')

  const onChangeHandler = e => setText(e.target.value)

  const onSubmitHandler = e => {
    e.preventDefault()
    if (!text.trim()) {
      setAlert('Please enter something', 'light') 
    } else {
      searchUsers(text)
      setText('')
    }
  }

  return (
    <div>
      <form
        className="form"
        onSubmit={onSubmitHandler}
      >
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          value={text}
          onChange={onChangeHandler}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {showClear && <button
        className="btn btn-light btn-block"
        onClick={clearUsers}
      >Clear</button>}
    </div>
  )
}

Search.prototypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
}

export default Search
