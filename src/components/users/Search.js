import React, { useContext, useState } from 'react'
import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alertContext'

const Search = () => {
  const githubContext = useContext(GithubContext)
  const { searchUsers, clearUsers, users } = githubContext

  const alertContext = useContext(AlertContext)
  const { setAlert } = alertContext

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
      {users.length > 0 && <button
        className="btn btn-light btn-block"
        onClick={clearUsers}
      >Clear</button>}
    </div>
  )
}

export default Search
